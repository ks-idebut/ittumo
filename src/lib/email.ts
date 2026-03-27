import { resend } from './resend'

interface OrderItem {
  item_id: string
  variant_id?: string
  quantity: number
  size?: string
  price: number
  name?: string
}

interface OrderData {
  orderId: string
  customerEmail: string
  customerName: string
  items: OrderItem[]
  totalAmount: number // cents
  currency: string
  shippingName: string | null
  shippingPostalCode: string | null
  shippingState: string | null
  shippingCity: string | null
  shippingLine1: string | null
  shippingLine2: string | null
}

function formatCurrency(amount: number, currency: string): string {
  const value = amount / 100
  if (currency === 'jpy') {
    return `¥${value.toLocaleString('ja-JP')}`
  }
  return `${currency.toUpperCase()} ${value.toFixed(2)}`
}

function buildShippingAddress(data: OrderData): string {
  const parts = [
    data.shippingPostalCode ? `〒${data.shippingPostalCode}` : null,
    data.shippingState,
    data.shippingCity,
    data.shippingLine1,
    data.shippingLine2,
  ].filter(Boolean)
  return parts.join(' ')
}

function buildItemsHtml(items: OrderItem[], currency: string): string {
  return items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">
          ${item.name || item.item_id}${item.size ? ` (${item.size})` : ''}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: right;">
          ${formatCurrency(item.price * item.quantity, currency)}
        </td>
      </tr>`
    )
    .join('')
}

function buildItemsText(items: OrderItem[], currency: string): string {
  return items
    .map(
      (item) =>
        `  - ${item.name || item.item_id}${item.size ? ` (${item.size})` : ''} x${item.quantity}  ${formatCurrency(item.price * item.quantity, currency)}`
    )
    .join('\n')
}

function buildCustomerHtml(data: OrderData): string {
  const shippingAddress = buildShippingAddress(data)
  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    <!-- Header -->
    <div style="background: #4a90d9; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">ittumo</h1>
    </div>

    <!-- Body -->
    <div style="padding: 32px 24px;">
      <h2 style="color: #333; font-size: 18px; margin: 0 0 16px;">ご注文ありがとうございます</h2>
      <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
        ${data.customerName} 様<br>
        ご注文を承りました。商品の準備が整い次第、発送いたします。
      </p>

      <!-- Order Number -->
      <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #888; font-size: 12px;">注文番号</p>
        <p style="margin: 4px 0 0; color: #333; font-size: 16px; font-weight: bold;">${data.orderId}</p>
      </div>

      <!-- Items -->
      <h3 style="color: #333; font-size: 14px; margin: 0 0 12px; border-bottom: 2px solid #4a90d9; padding-bottom: 8px;">ご注文内容</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
        <thead>
          <tr>
            <th style="padding: 8px 12px; text-align: left; border-bottom: 1px solid #ddd; color: #888; font-weight: normal; font-size: 12px;">商品</th>
            <th style="padding: 8px 12px; text-align: center; border-bottom: 1px solid #ddd; color: #888; font-weight: normal; font-size: 12px;">数量</th>
            <th style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #ddd; color: #888; font-weight: normal; font-size: 12px;">金額</th>
          </tr>
        </thead>
        <tbody>
          ${buildItemsHtml(data.items, data.currency)}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; font-size: 15px;">合計</td>
            <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 15px;">${formatCurrency(data.totalAmount, data.currency)}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Shipping -->
      ${shippingAddress ? `
      <h3 style="color: #333; font-size: 14px; margin: 24px 0 12px; border-bottom: 2px solid #4a90d9; padding-bottom: 8px;">配送先</h3>
      <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0;">
        ${data.shippingName || data.customerName} 様<br>
        ${shippingAddress}
      </p>
      ` : ''}
    </div>

    <!-- Footer -->
    <div style="background: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px; margin: 0 0 8px;">
        ご不明点がございましたら、下記までお問い合わせください。
      </p>
      <p style="color: #999; font-size: 12px; margin: 0;">
        <a href="mailto:info@ittumo.net" style="color: #666;">info@ittumo.net</a>
      </p>
      <p style="color: #ccc; font-size: 11px; margin: 16px 0 0;">
        &copy; ittumo
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildAdminHtml(data: OrderData): string {
  const shippingAddress = buildShippingAddress(data)
  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #333; margin: 0 0 16px;">新規注文通知</h2>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333; margin-bottom: 16px;">
      <tr><td style="padding: 6px 0; color: #888; width: 120px;">注文番号</td><td style="padding: 6px 0; font-weight: bold;">${data.orderId}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">顧客名</td><td style="padding: 6px 0;">${data.customerName}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">メール</td><td style="padding: 6px 0;">${data.customerEmail}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">合計金額</td><td style="padding: 6px 0; font-weight: bold;">${formatCurrency(data.totalAmount, data.currency)}</td></tr>
      ${shippingAddress ? `<tr><td style="padding: 6px 0; color: #888;">配送先</td><td style="padding: 6px 0;">${data.shippingName || data.customerName}<br>${shippingAddress}</td></tr>` : ''}
    </table>

    <h3 style="color: #333; font-size: 14px; margin: 0 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">注文商品</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
      ${buildItemsHtml(data.items, data.currency)}
    </table>

    <p style="margin: 24px 0 0; font-size: 13px; color: #888;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ittumo.net'}/admin/orders" style="color: #0066cc;">管理画面で確認</a>
    </p>
  </div>
</body>
</html>`
}

export async function sendOrderConfirmation(
  session: {
    id: string
    customer_details?: { email?: string | null; name?: string | null } | null
    amount_total?: number | null
    currency?: string | null
    metadata?: Record<string, string> | null
  },
  order: { id: string },
  shippingInfo: {
    name?: string | null
    postal_code?: string | null
    state?: string | null
    city?: string | null
    line1?: string | null
    line2?: string | null
  } | null
) {
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not set, skipping order confirmation email')
    return
  }

  const itemsJson = session.metadata?.items_json
  const items: OrderItem[] = itemsJson ? JSON.parse(itemsJson) : []

  const orderData: OrderData = {
    orderId: order.id,
    customerEmail: session.customer_details?.email || '',
    customerName: session.customer_details?.name || shippingInfo?.name || 'お客様',
    items,
    totalAmount: session.amount_total || 0,
    currency: session.currency || 'jpy',
    shippingName: shippingInfo?.name || null,
    shippingPostalCode: shippingInfo?.postal_code || null,
    shippingState: shippingInfo?.state || null,
    shippingCity: shippingInfo?.city || null,
    shippingLine1: shippingInfo?.line1 || null,
    shippingLine2: shippingInfo?.line2 || null,
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@ittumo.net'
  const adminEmails = ['info@ittumo.net', 'keijirock@gmail.com']

  // Send customer email and admin email in parallel
  const promises: Promise<unknown>[] = []

  // Customer email
  if (orderData.customerEmail) {
    promises.push(
      resend.emails.send({
        from: `ittumo <${fromEmail}>`,
        to: [orderData.customerEmail],
        subject: '【ittumo】ご注文ありがとうございます',
        html: buildCustomerHtml(orderData),
        text: `${orderData.customerName} 様

ご注文ありがとうございます。
ご注文を承りました。商品の準備が整い次第、発送いたします。

━━━━━━━━━━━━━━━━━━
注文番号: ${orderData.orderId}
━━━━━━━━━━━━━━━━━━

【ご注文内容】
${buildItemsText(items, orderData.currency)}

合計: ${formatCurrency(orderData.totalAmount, orderData.currency)}

${shippingInfo ? `【配送先】
${shippingInfo.name || orderData.customerName} 様
${buildShippingAddress(orderData)}` : ''}

━━━━━━━━━━━━━━━━━━
ご不明点がございましたら info@ittumo.net までお問い合わせください。
ittumo`,
      })
    )
  }

  // Admin email
  promises.push(
    resend.emails.send({
      from: `ittumo システム <${fromEmail}>`,
      to: adminEmails,
      subject: `【ittumo】新規注文 ${orderData.orderId} (${formatCurrency(orderData.totalAmount, orderData.currency)})`,
      html: buildAdminHtml(orderData),
    })
  )

  await Promise.allSettled(promises)
}
