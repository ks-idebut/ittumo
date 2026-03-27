"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ALL_ITEMS } from "@/data/items";

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = ALL_ITEMS.find((i) => i.id === id);

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-foreground/50">アイテムが見つかりません</p>
        <Link href="/items" className="text-primary mt-4 inline-block">
          アイテム一覧に戻る
        </Link>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5));
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // TODO: 写真をSupabase Storageにアップロード（環境変数設定後）
      const photoUrls = photos.map((p) => p.preview); // 仮: プレビューURL

      const res = await fetch("/api/omakase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: id,
          petName,
          petType,
          customerEmail,
          notes,
          photoUrls,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M12 20L18 26L28 14"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">ご依頼ありがとうございます！</h1>
        <p className="text-foreground/60 mb-2">
          <strong>{item.name}</strong>
          のデザイン依頼を受け付けました。
        </p>
        <p className="text-foreground/50 text-sm mb-8">
          スタッフがデザインを作成し、メールで仕上がりイメージをお送りします。
          <br />
          通常2〜3営業日以内にご連絡いたします。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/items"
            className="border-2 border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            他のアイテムも見る
          </Link>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            TOPに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-warm-gray border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-foreground/50 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">
              TOP
            </Link>
            <span>/</span>
            <Link href={`/items/${id}`} className="hover:text-primary">
              {item.name}
            </Link>
            <span>/</span>
            <span className="text-foreground/70">デザインをおまかせ</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L8 10M8 10L5 7M8 10L11 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11V13C2 13.6 2.4 14 3 14H13C13.6 14 14 13.6 14 13V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              デザインおまかせ注文
            </div>
            <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
            <p className="text-primary font-bold text-xl">
              ¥{item.price.toLocaleString()}〜
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo upload */}
            <div>
              <label className="block font-bold text-sm mb-2">
                ペットの写真
                <span className="text-red-400 ml-1">*</span>
              </label>
              <p className="text-xs text-foreground/50 mb-3">
                最大5枚まで。正面からの明るい写真がベストです。
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden bg-foreground/5"
                  >
                    <Image
                      src={photo.preview}
                      alt={`写真 ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-foreground/20 flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-foreground/30"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-xs text-foreground/30 mt-1">追加</span>
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Pet name */}
            <div>
              <label className="block font-bold text-sm mb-2">
                ペットのお名前
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="例: コロ"
                required
                className="w-full border border-foreground/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Pet type */}
            <div>
              <label className="block font-bold text-sm mb-2">
                ペットの種類
              </label>
              <input
                type="text"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                placeholder="例: 柴犬 / トイプードル / ミックス"
                className="w-full border border-foreground/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-bold text-sm mb-2">
                メールアドレス
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full border border-foreground/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-foreground/40 mt-1">
                仕上がりイメージの送付先になります
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-bold text-sm mb-2">
                ご要望・備考
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="デザインのご要望があればお書きください（例: 名前を大きく入れたい、桜のフレームが良い、など）"
                rows={4}
                className="w-full border border-foreground/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Info box */}
            <div className="bg-warm-gray rounded-xl p-4">
              <h3 className="font-bold text-sm mb-2">この後の流れ</h3>
              <ol className="text-sm text-foreground/60 space-y-1">
                <li>1. スタッフがデザインを作成（2〜3営業日）</li>
                <li>2. メールで仕上がりイメージをお送り</li>
                <li>3. 確認OKなら決済リンクをお送り</li>
                <li>4. ご入金確認後14営業日以内に発送</li>
              </ol>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={photos.length === 0 || !petName || !customerEmail || submitting}
              className="w-full bg-accent text-white py-4 rounded-full text-lg font-bold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "送信中..." : "デザインを依頼する"}
            </button>
            <p className="text-xs text-foreground/40 text-center">
              この時点では料金は発生しません
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
