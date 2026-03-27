"use client";

import Link from "next/link";

interface Props {
  itemId: string;
  itemName: string;
}

export default function ItemOrderButtons({ itemId, itemName }: Props) {
  return (
    <div className="space-y-4">
      {/* シミュレーター注文 */}
      <Link
        href={`/simulator/${itemId}`}
        className="flex items-center gap-4 w-full bg-primary text-white rounded-2xl p-5 hover:bg-primary-dark transition-colors group"
      >
        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="5"
              width="22"
              height="18"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="14" cy="14" r="4" stroke="white" strokeWidth="2" />
            <path
              d="M8 10L10 8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M20 10L18 8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect x="11" y="2" width="6" height="3" rx="1" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-lg">デザインをシミュレートする</p>
          <p className="text-white/70 text-sm">
            自分で写真・フレームを選んでプレビュー
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 group-hover:translate-x-1 transition-transform"
        >
          <path
            d="M7 4L13 10L7 16"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* おまかせ注文 */}
      <Link
        href={`/order/${itemId}`}
        className="flex items-center gap-4 w-full bg-white border-2 border-accent text-accent rounded-2xl p-5 hover:bg-accent/5 transition-colors group"
      >
        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 4L14 16M14 16L9 11M14 16L19 11"
              stroke="#6c5b7b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18V22C4 23.1 4.9 24 6 24H22C23.1 24 24 23.1 24 22V18"
              stroke="#6c5b7b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-lg text-foreground">
            デザインをおまかせする
          </p>
          <p className="text-foreground/50 text-sm">
            写真を送るだけ！スタッフがデザイン
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 group-hover:translate-x-1 transition-transform"
        >
          <path
            d="M7 4L13 10L7 16"
            stroke="#6c5b7b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* 補足 */}
      <p className="text-xs text-foreground/40 text-center">
        どちらも仕上がりイメージ確認後に注文確定。安心してお試しください。
      </p>
    </div>
  );
}
