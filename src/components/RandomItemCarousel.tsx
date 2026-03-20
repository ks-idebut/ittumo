"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_ITEMS, type Item } from "@/data/items";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ItemCard({ item }: { item: Item }) {
  return (
    <Link
      href="/items"
      className="flex-shrink-0 w-56 bg-white rounded-2xl p-5 hover:shadow-lg transition-shadow group"
    >
      <div className="w-full aspect-square bg-warm-gray rounded-xl mb-3 flex items-center justify-center">
        <span className="text-foreground/20 text-xs">PHOTO</span>
      </div>
      <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors truncate">
        {item.name}
      </h3>
      <p className="text-xs text-foreground/50 mb-2 line-clamp-1">{item.description}</p>
      <p className="text-primary font-bold">&yen;{item.price.toLocaleString()}〜</p>
    </Link>
  );
}

export default function RandomItemCarousel() {
  const [topRow, setTopRow] = useState<Item[]>([]);
  const [bottomRow, setBottomRow] = useState<Item[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(ALL_ITEMS);
    const half = Math.ceil(shuffled.length / 2);
    // 無限スクロール用に3倍に複製
    const top = shuffled.slice(0, half);
    const bottom = shuffled.slice(half);
    setTopRow([...top, ...top, ...top]);
    setBottomRow([...bottom, ...bottom, ...bottom]);
  }, []);

  if (topRow.length === 0) return null;

  return (
    <div className="space-y-4 overflow-hidden">
      {/* 上段: 左に流れる */}
      <div className="relative">
        <div className="flex gap-4 animate-scroll-left">
          {topRow.map((item, i) => (
            <ItemCard key={`top-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* 下段: 右に流れる */}
      <div className="relative">
        <div className="flex gap-4 animate-scroll-right">
          {bottomRow.map((item, i) => (
            <ItemCard key={`bottom-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
