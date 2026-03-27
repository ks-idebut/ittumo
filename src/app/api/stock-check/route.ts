import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// カート追加・数量変更時の在庫チェック用API
export async function POST(request: NextRequest) {
  try {
    const { variant_id, quantity } = (await request.json()) as {
      variant_id: string
      quantity: number
    }

    if (!variant_id) {
      return NextResponse.json({ ok: true }) // バリアントなし = 受注生産
    }

    const { data: variant, error } = await supabaseAdmin
      .from('it_item_variants')
      .select('id, label, stock, is_unlimited')
      .eq('id', variant_id)
      .single()

    if (error || !variant) {
      return NextResponse.json({ ok: true }) // バリアント見つからない場合は通す
    }

    if (variant.is_unlimited) {
      return NextResponse.json({ ok: true, stock: null, isUnlimited: true })
    }

    if (variant.stock < quantity) {
      return NextResponse.json({
        ok: false,
        stock: variant.stock,
        isUnlimited: false,
        error: variant.stock === 0
          ? `「${variant.label}」は在庫切れです`
          : `「${variant.label}」の在庫が不足しています（残り${variant.stock}点）`,
      })
    }

    return NextResponse.json({ ok: true, stock: variant.stock, isUnlimited: false })
  } catch (error) {
    console.error('Stock check error:', error)
    return NextResponse.json({ ok: true }) // エラー時は通す（決済時に再チェック）
  }
}
