"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_ITEMS, CATEGORIES, TOTAL_ITEM_COUNT, type ItemCategory } from "@/data/items";

export default function ItemsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = ALL_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      item.name.includes(searchQuery) ||
      item.description.includes(searchQuery) ||
      item.tags.some((tag) => tag.includes(searchQuery));
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="bg-warm-gray py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">アイテム一覧</h1>
          <p className="text-foreground/60">
            全{TOTAL_ITEM_COUNT}アイテム以上 / すべて1個から注文OK
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="アイテムを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-2.5 rounded-full border border-warm-gray-dark focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-accent text-white"
                  : "bg-warm-gray text-foreground/60 hover:bg-warm-gray-dark"
              }`}
            >
              すべて ({ALL_ITEMS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = ALL_ITEMS.filter((item) => item.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-accent text-white"
                      : "bg-warm-gray text-foreground/60 hover:bg-warm-gray-dark"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <p className="text-sm text-foreground/50 mb-4">{filteredItems.length}件のアイテム</p>

          {/* Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/items/${item.id}`}
                className="bg-white border border-warm-gray-dark rounded-2xl p-5 hover:shadow-lg transition-shadow group block"
              >
                {/* Placeholder for item image */}
                <div className="w-full aspect-square bg-warm-gray rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-foreground/20 text-sm">PHOTO</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.isFeatured && (
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                      ONLY HERE
                    </span>
                  )}
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-warm-gray text-foreground/60 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-xs text-foreground/50 mb-2 line-clamp-2">{item.description}</p>
                <p className="text-primary font-bold">&yen;{item.price.toLocaleString()}〜</p>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-foreground/40">
              <p className="text-lg mb-2">該当するアイテムが見つかりませんでした</p>
              <p className="text-sm">検索条件を変更してみてください</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12 py-8 bg-warm-gray rounded-2xl">
            <p className="font-bold mb-2">お探しのアイテムが見つからない？</p>
            <p className="text-sm text-foreground/60 mb-4">自社工場だから、ご要望に合わせて新しいアイテムも作れます。</p>
            <Link
              href="/customize"
              className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
