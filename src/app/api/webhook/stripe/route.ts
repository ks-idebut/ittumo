import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { sendOrderConfirmation } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  // Webhook Secretが未設定の場合はシグネチャ検証をスキップ（開発用）
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // 注文をDBに記録
      const itemsJson = session.metadata?.items_json
      const items = itemsJson ? JSON.parse(itemsJson) : []

      // 配送先情報: metadataから取得（住所確認済み）またはcollected_informationから取得（Stripeフォーム）
      let shipping: { name?: string; address?: { postal_code?: string; state?: string; city?: string; line1?: string; line2?: string } } | undefined

      if (session.metadata?.shipping_name) {
        // metadataから配送先取得
        shipping = {
          name: session.metadata.shipping_name,
          address: {
            postal_code: session.metadata.shipping_postal_code,
            state: session.metadata.shipping_state,
            city: session.metadata.shipping_city,
            line1: session.metadata.shipping_line1,
            line2: session.metadata.shipping_line2,
          },
        }
      } else {
        // collected_informationから取得
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collected = (session as any).collected_information as {
          shipping_details?: {
            name?: string
            address?: {
              postal_code?: string
              state?: string
              city?: string
              line1?: string
              line2?: string
            }
          }
        } | undefined
        shipping = collected?.shipping_details
      }

      const shippingAddress = shipping?.address
        ? [
            shipping.address.postal_code,
            shipping.address.state,
            shipping.address.city,
            shipping.address.line1,
            shipping.address.line2,
          ]
            .filter(Boolean)
            .join(' ')
        : null

      // it_simulator_orders テーブルに挿入
      const { data: order, error: orderError } = await supabaseAdmin
        .from('it_simulator_orders')
        .insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: session.customer_details?.email,
          customer_name: shipping?.name || session.customer_details?.name,
          total_amount: session.amount_total,
          currency: session.currency,
          status: 'paid',
          shipping_name: shipping?.name || null,
          shipping_address: shippingAddress,
          shipping_postal_code: shipping?.address?.postal_code || null,
          shipping_state: shipping?.address?.state || null,
          shipping_city: shipping?.address?.city || null,
          shipping_line1: shipping?.address?.line1 || null,
          shipping_line2: shipping?.address?.line2 || null,
          items_json: itemsJson || '[]',
        })
        .select('id')
        .single()

      if (orderError) {
        console.error('Order insert error:', orderError)
        return NextResponse.json({ error: 'Order save failed' }, { status: 500 })
      }

      console.log(`Order created: ${order?.id} (Stripe: ${session.id})`)

      // メール通知（失敗してもWebhookは成功扱い）
      try {
        await sendOrderConfirmation(
          session,
          { id: order.id },
          shipping ? {
            name: shipping.name || null,
            postal_code: shipping.address?.postal_code || null,
            state: shipping.address?.state || null,
            city: shipping.address?.city || null,
            line1: shipping.address?.line1 || null,
            line2: shipping.address?.line2 || null,
          } : null
        )
        console.log(`Order confirmation email sent for order: ${order.id}`)
      } catch (emailError) {
        console.error('Order confirmation email failed:', emailError)
      }
    } catch (error) {
      console.error('Webhook processing error:', error)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
