import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { uploadToR2 } from '@/lib/r2'

// クライアントサイドで合成した画像をアップロードして保存するAPI
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const orderId = formData.get('orderId') as string
    const itemId = formData.get('itemId') as string
    const imageType = formData.get('imageType') as string // 'wearing', 'product', 'zoom', 'image1', 'image2'
    const file = formData.get('file') as File | null

    if (!orderId || !itemId || !imageType || !file) {
      return NextResponse.json({ error: '必須パラメータが不足しています' }, { status: 400 })
    }

    if (!['wearing', 'product', 'zoom', 'image1', 'image2'].includes(imageType)) {
      return NextResponse.json({ error: '無効な画像タイプです' }, { status: 400 })
    }

    // R2にアップロード
    const key = `compositions/${orderId}/${itemId}/${imageType}-${Date.now()}.png`

    const buffer = Buffer.from(await file.arrayBuffer())
    const publicUrl = await uploadToR2(key, buffer, 'image/png')

    // it_simulator_orders の合成画像URLを更新
    // composition_urls JSONBカラムに画像URLを追加
    const { data: order } = await supabaseAdmin
      .from('it_simulator_orders')
      .select('composition_urls')
      .eq('id', orderId)
      .single()

    const compositionUrls = (order?.composition_urls as Record<string, string>) || {}
    compositionUrls[`${itemId}_${imageType}`] = publicUrl

    const { error: updateError } = await supabaseAdmin
      .from('it_simulator_orders')
      .update({
        composition_urls: compositionUrls,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('DB update error:', updateError)
      return NextResponse.json({ error: 'データベースの更新に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Compose upload error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 注文に紐づく合成データを取得
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')

  if (!orderId) {
    return NextResponse.json({ error: 'orderIdが必要です' }, { status: 400 })
  }

  try {
    const { data: order } = await supabaseAdmin
      .from('it_simulator_orders')
      .select('id, items_json, composition_urls, status')
      .eq('id', orderId)
      .single()

    if (!order) {
      return NextResponse.json({ error: '注文が見つかりません' }, { status: 404 })
    }

    return NextResponse.json({
      order,
    })
  } catch (error) {
    console.error('Compose data error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
