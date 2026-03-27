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
            <Link href={`/items/${id}`} className="hover:text-primary">
              {item.name}
            </Link>
            <span>/</span>
            <span className="text-foreground/70">シミュレーター</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Placeholder simulator area */}
          <div className="bg-warm-gray rounded-3xl p-8 md:p-16 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="10"
                  width="36"
                  height="28"
                  rx="3"
                  stroke="#e8a87c"
                  strokeWidth="2.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="8"
                  stroke="#e8a87c"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L24 24L28 20"
                  stroke="#e8a87c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <rect
                  x="19"
                  y="4"
                  width="10"
                  height="6"
                  rx="2"
                  fill="#e8a87c"
                  opacity="0.3"
                />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {item.name} シミュレーター
            </h1>
            <p className="text-foreground/60 mb-2">
              写真をアップロードして、フレームを選んで、仕上がりをプレビュー
            </p>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mt-4">
              準備中 — まもなく公開予定
            </div>

            {/* Mock simulator UI */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">1</span>
                </div>
                <p className="font-bold text-sm">写真を選ぶ</p>
                <p className="text-xs text-foreground/40 mt-1">
                  ペットの写真をアップロード
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">2</span>
                </div>
                <p className="font-bold text-sm">フレームを選ぶ</p>
                <p className="text-xs text-foreground/40 mt-1">
                  季節やテーマで選べる
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">3</span>
                </div>
                <p className="font-bold text-sm">プレビュー&注文</p>
                <p className="text-xs text-foreground/40 mt-1">
                  仕上がりを確認してから注文
                </p>
              </div>
            </div>
          </div>

          {/* Alternative: go to omakase */}
          <p className="text-foreground/50 mb-4">
            シミュレーター公開前でも「おまかせ」でご注文いただけます
          </p>
          <Link
            href={`/order/${id}`}
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent/90 transition-colors"
          >
            デザインをおまかせする
          </Link>
        </div>
      </section>
    </>
  );
}
