import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

interface CartItem {
  item_id: string
  name: string
  image_url?: string
  price: number       // 販売価格（税込）
  quantity: number
  size?: string
  variant_id?: string
}

export async function POST(request: NextRequest) {
  try {
    const { items, customer_email, shipping_address } = (await request.json()) as {
      items: CartItem[]
      customer_email?: string
      shipping_address?: {
        name: string
        postal_code: string
        state: string
        city: string
        line1: string
        line2: string | null
      }
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'カートが空です' }, { status: 400 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get('origin') || 'https://ittumo.net'

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name + (item.size ? ` (${item.size})` : ''),
          ...(item.image_url ? { images: [item.image_url] } : {}),
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    // 送料計算: 2万円以上で送料無料、北海道・沖縄は+1,320円
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping_options = subtotal >= 20000
      ? [
          { shipping_rate_data: { type: 'fixed_amount' as const, fixed_amount: { amount: 0, currency: 'jpy' }, display_name: '送料無料（本州・四国・九州）' } },
          { shipping_rate_data: { type: 'fixed_amount' as const, fixed_amount: { amount: 1320, currency: 'jpy' }, display_name: '北海道・沖縄（追加送料）' } },
        ]
      : [
          { shipping_rate_data: { type: 'fixed_amount' as const, fixed_amount: { amount: 880, currency: 'jpy' }, display_name: '送料（本州・四国・九州）' } },
          { shipping_rate_data: { type: 'fixed_amount' as const, fixed_amount: { amount: 2200, currency: 'jpy' }, display_name: '送料（北海道・沖縄）' } },
        ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionParams: any = {
      mode: 'payment',
      payment_method_types: ['card', 'link'],
      allow_promotion_codes: true,
      line_items,
      shipping_options,
      metadata: {
        items_json: JSON.stringify(
          items.map((i) => ({
            item_id: i.item_id,
            variant_id: i.variant_id,
            quantity: i.quantity,
            size: i.size,
            price: i.price,
          }))
        ),
      },
      ...(customer_email ? { customer_email } : {}),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    }

    if (shipping_address) {
      // 住所確認済み: Stripeの住所入力を省略
      sessionParams.payment_intent_data = {
        shipping: {
          name: shipping_address.name,
          address: {
            country: 'JP',
            postal_code: shipping_address.postal_code || '',
            state: shipping_address.state || '',
            city: shipping_address.city || '',
            line1: shipping_address.line1 || '',
            line2: shipping_address.line2 || '',
          },
        },
      }
      // 配送先情報をmetadataにも保存（webhook用）
      sessionParams.metadata = {
        ...sessionParams.metadata,
        shipping_name: shipping_address.name,
        shipping_postal_code: shipping_address.postal_code,
        shipping_state: shipping_address.state,
        shipping_city: shipping_address.city,
        shipping_line1: shipping_address.line1,
        shipping_line2: shipping_address.line2 || '',
      }
    } else {
      // 住所未入力: Stripeの住所入力フォームを表示
      sessionParams.shipping_address_collection = {
        allowed_countries: ['JP'],
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Checkout error:', errMsg)
    return NextResponse.json(
      { error: '決済セッションの作成に失敗しました', detail: errMsg },
      { status: 500 }
    )
  }
}
