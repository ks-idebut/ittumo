"use client";

import { use } from "react";
import Link from "next/link";
import { ALL_ITEMS } from "@/data/items";

export default function SimulatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = ALL_ITEMS.find((i) => i.id === id);

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

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-warm-gray border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-foreground/50 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">
              TOP
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-primary">
              アイテム一覧
            </Link>
            <span>/</span>
            <Link href={`/items/${id}`} className="hover:text-primary">
              {item.name}
            </Link>
            <span>/</span>
            <span className="text-foreground/70">シミュレーター</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {item.name} シミュレーター
            </h1>
            <p className="text-primary font-bold text-xl mb-1">
              ¥{item.price.toLocaleString()}
              <span className="text-sm font-normal text-foreground/50 ml-1">
                〜（税込）
              </span>
            </p>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mt-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="animate-spin-slow"
              >
                <path
                  d="M8 1V4M8 12V15M1 8H4M12 8H15M2.93 2.93L5.05 5.05M10.95 10.95L13.07 13.07M2.93 13.07L5.05 10.95M10.95 5.05L13.07 2.93"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              シミュレーター準備中
            </div>
          </div>

          {/* Main simulator layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left column: Upload + Frame selection */}
            <div className="space-y-6">
              {/* Photo upload area */}
              <div>
                <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  写真をアップロード
                </h2>
                <div className="border-2 border-dashed border-foreground/20 rounded-2xl p-8 md:p-12 text-center bg-warm-gray/50 relative cursor-not-allowed">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16 6V20M16 6L11 11M16 6L21 11"
                        stroke="#e8a87c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 20V24C4 25.1 4.9 26 6 26H26C27.1 26 28 25.1 28 24V20"
                        stroke="#e8a87c"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-foreground/60 mb-1">
                    ここに写真をドラッグ＆ドロップ
                  </p>
                  <p className="text-sm text-foreground/40 mb-4">
                    または
                  </p>
                  <button
                    disabled
                    className="bg-primary/20 text-primary px-6 py-2.5 rounded-full text-sm font-medium cursor-not-allowed"
                  >
                    ファイルを選択（準備中）
                  </button>
                  <p className="text-xs text-foreground/30 mt-4">
                    JPG / PNG / HEIC 対応 ・ 最大10MB
                  </p>
                </div>
              </div>

              {/* Frame selection area */}
              <div>
                <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  フレームを選ぶ
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {/* Dummy frame 1 */}
                  <button
                    disabled
                    className="aspect-square rounded-xl border-2 border-foreground/10 bg-warm-gray flex flex-col items-center justify-center p-3 cursor-not-allowed hover:border-foreground/10"
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center mb-2 relative overflow-hidden">
                      <div className="absolute inset-1 border-2 border-dashed border-pink-300/50 rounded" />
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-40">
                        <path d="M4 16L8 10L11 14L13 11L16 16H4Z" fill="#e8a87c" />
                        <circle cx="13" cy="7" r="2" fill="#e8a87c" />
                      </svg>
                    </div>
                    <span className="text-xs text-foreground/40 mt-1">シンプル</span>
                  </button>
                  {/* Dummy frame 2 */}
                  <button
                    disabled
                    className="aspect-square rounded-xl border-2 border-foreground/10 bg-warm-gray flex flex-col items-center justify-center p-3 cursor-not-allowed"
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center mb-2 relative overflow-hidden">
                      <div className="absolute inset-1 border-2 border-dashed border-green-300/50 rounded" />
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-40">
                        <path d="M4 16L8 10L11 14L13 11L16 16H4Z" fill="#e8a87c" />
                        <circle cx="13" cy="7" r="2" fill="#e8a87c" />
                      </svg>
                    </div>
                    <span className="text-xs text-foreground/40 mt-1">ナチュラル</span>
                  </button>
                  {/* Dummy frame 3 */}
                  <button
                    disabled
                    className="aspect-square rounded-xl border-2 border-foreground/10 bg-warm-gray flex flex-col items-center justify-center p-3 cursor-not-allowed"
                  >
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-2 relative overflow-hidden">
                      <div className="absolute inset-1 border-2 border-dashed border-purple-300/50 rounded" />
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-40">
                        <path d="M4 16L8 10L11 14L13 11L16 16H4Z" fill="#e8a87c" />
                        <circle cx="13" cy="7" r="2" fill="#e8a87c" />
                      </svg>
                    </div>
                    <span className="text-xs text-foreground/40 mt-1">エレガント</span>
                  </button>
                </div>
                <p className="text-xs text-foreground/30 mt-2 text-center">
                  季節やテーマごとのフレームが追加予定
                </p>
              </div>
            </div>

            {/* Right column: Preview + Actions */}
            <div className="space-y-6">
              {/* Preview area */}
              <div>
                <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  プレビュー
                </h2>
                <div className="aspect-square rounded-2xl bg-warm-gray border border-foreground/10 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <rect
                        x="5"
                        y="8"
                        width="30"
                        height="24"
                        rx="3"
                        stroke="#d1d1d1"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 28L14 20L18 25L22 19L32 28"
                        stroke="#d1d1d1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="27" cy="15" r="3" stroke="#d1d1d1" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-foreground/30 text-sm font-medium">
                    仕上がりプレビュー
                  </p>
                  <p className="text-foreground/20 text-xs mt-1">
                    写真とフレームを選ぶとここに表示されます
                  </p>
                </div>
              </div>

              {/* Order button (disabled) */}
              <button
                disabled
                className="w-full bg-accent/40 text-white py-4 rounded-full text-lg font-bold cursor-not-allowed"
              >
                この画像で注文する
              </button>
              <p className="text-xs text-foreground/40 text-center -mt-3">
                写真アップロード・フレーム選択後に有効になります
              </p>

              {/* Switch to omakase link */}
              <div className="bg-warm-gray rounded-xl p-5 text-center">
                <p className="text-sm text-foreground/60 mb-3">
                  シミュレーターの完成を待たずに注文できます
                </p>
                <Link
                  href={`/order/${id}`}
                  className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors text-sm"
                >
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
                  おまかせ注文に切り替える
                </Link>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-5 md:p-6 text-center">
            <p className="text-sm font-bold text-primary mb-1">
              シミュレーター機能について
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              現在、写真合成シミュレーターを開発中です。
              FabColleの画像合成システム完成後、本格実装予定です。
              <br className="hidden md:block" />
              それまでは「おまかせ注文」をご利用ください。スタッフが丁寧にデザインいたします。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
