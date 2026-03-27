import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_ITEMS, CATEGORIES } from "@/data/items";
import ItemOrderButtons from "@/components/ItemOrderButtons";

export function generateStaticParams() {
  return ALL_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (!item) return { title: "アイテムが見つかりません" };
  return {
    title: `${item.name} | ittumo`,
    description: item.description,
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (!item) notFound();

  const category = CATEGORIES.find((c) => c.id === item.category);

  // 同カテゴリの関連アイテム（自分を除く、最大4件）
  const related = ALL_ITEMS.filter(
    (i) => i.category === item.category && i.id !== item.id
  ).slice(0, 4);

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
            {category && (
              <>
                <Link
                  href={`/items?category=${item.category}`}
                  className="hover:text-primary"
                >
                  {category.label}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground/70">{item.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Image placeholder */}
            <div className="bg-warm-gray rounded-2xl aspect-square flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-4xl">📷</span>
              </div>
              <p className="text-foreground/40 text-sm">商品イメージ準備中</p>
              <p className="text-foreground/30 text-xs mt-1">
                実際はお客様の写真で作成します
              </p>
            </div>

            {/* Right: Item info + order buttons */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary-dark px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {item.isNew && (
                  <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {item.isFeatured && (
                  <span className="text-xs bg-accent text-white px-3 py-1 rounded-full">
                    ONLY AT ITTUMO
                  </span>
                )}
              </div>

              {/* Name & Price */}
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {item.name}
              </h1>
              <p className="text-2xl font-bold text-primary mb-6">
                ¥{item.price.toLocaleString()}
                <span className="text-sm font-normal text-foreground/50 ml-1">
                  〜（税込）
                </span>
              </p>

              {/* Description */}
              <p className="text-foreground/70 leading-relaxed mb-8">
                {item.description}
              </p>

              {/* 2 order buttons */}
              <ItemOrderButtons itemId={item.id} itemName={item.name} />

              {/* Specs */}
              <div className="mt-8 border-t border-foreground/10 pt-6">
                <h3 className="font-bold text-sm mb-3 text-foreground/60">
                  ご注文について
                </h3>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    1個から注文OK（自社工場製造）
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    写真の切り抜き・色補正はスタッフが対応
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    仕上がりイメージ確認後の注文確定
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    ご入金確認後14営業日以内に発送
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related items */}
      {related.length > 0 && (
        <section className="bg-warm-gray py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6">
              同じカテゴリのアイテム
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/items/${r.id}`}
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="bg-foreground/5 rounded-lg aspect-square flex items-center justify-center mb-3">
                    <span className="text-xs text-foreground/30">PHOTO</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">
                    {r.name}
                  </h3>
                  <p className="text-primary font-bold text-sm">
                    ¥{r.price.toLocaleString()}〜
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
