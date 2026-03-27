import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, petName, petType, notes, customerEmail, photoUrls } = body;

    if (!itemId || !petName || !customerEmail) {
      return NextResponse.json(
        { error: "itemId, petName, customerEmail は必須です" },
        { status: 400 }
      );
    }

    // 写真をit_pet_photosに保存
    let petPhotoId: string | null = null;
    if (photoUrls && photoUrls.length > 0) {
      const { data: photoData, error: photoError } = await supabaseAdmin
        .from("it_pet_photos")
        .insert({
          original_url: photoUrls[0],
          pet_name: petName,
          pet_type: petType || null,
        })
        .select("id")
        .single();

      if (photoError) {
        console.error("Pet photo insert error:", photoError);
      } else {
        petPhotoId = photoData.id;
      }
    }

    // おまかせ注文を作成
    const { data: order, error: orderError } = await supabaseAdmin
      .from("it_omakase_orders")
      .insert({
        customer_email: customerEmail,
        item_id: itemId,
        pet_photo_id: petPhotoId,
        pet_name: petName,
        pet_type: petType || null,
        notes: notes || null,
        status: "pending",
      })
      .select("id, status, created_at")
      .single();

    if (orderError) {
      console.error("Omakase order insert error:", orderError);
      return NextResponse.json(
        { error: "注文の保存に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      message: "おまかせ注文を受け付けました",
    });
  } catch (error) {
    console.error("Omakase API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
