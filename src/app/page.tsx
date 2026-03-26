import Link from "next/link";
import { ALL_ITEMS, CATEGORIES, TOTAL_ITEM_COUNT } from "@/data/items";
import RandomItemCarousel from "@/components/RandomItemCarousel";
import BeforeAfter from "@/components/BeforeAfter";
import PhotoGuide from "@/components/PhotoGuide";
import HeroSlider from "@/components/HeroSlider";

const FEATURED_ITEMS = ALL_ITEMS.filter((item) => item.isFeatured);

const STEPS = [
  {
    step: "01",
    title: "写真を送る",
    description: "お気に入りの1枚をアップロード。切り抜き・色補正などの加工はすべておまかせ。",
  },
  {
    step: "02",
    title: "アイテムを選ぶ",
    description: `${TOTAL_ITEM_COUNT}種類以上のラインナップから好きなアイテムを。`,
  },
  {
    step: "03",
    title: "仕上がり確認",
    description: "合成イメージを確認してからご注文。納得いくまで調整OK。",
  },
  {
    step: "04",
    title: "お届け",
    description: "自社工場で丁寧に製作。ご入金確認後14営業日以内に発送。",
  },
];

const CATEGORY_PREVIEW = CATEGORIES.filter((c) => c.id !== "featured").slice(0, 9);

export default function Home() {
  return (
    <>
      {/* Hero - full bleed image slider */}
      <section className="relative">
        <HeroSlider />
      </section>

      {/* CTA buttons */}
      <section className="bg-warm-gray py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-accent mb-8">
            全{TOTAL_ITEM_COUNT}アイテム以上
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customize"
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-dark transition-colors shadow-lg"
            >
              グッズをつくる
            </Link>
            <Link
              href="/items"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-colors"
            >
              全アイテムを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Flowing Item Carousel - 毎回ランダム表示 */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">こんなグッズが作れます</h2>
          <p className="text-center text-foreground/50 text-sm">アクセスするたびに違うアイテムが表示されます</p>
        </div>
        <RandomItemCarousel />
      </section>

      {/* Before → After */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-primary-dark text-sm tracking-widest mb-2">BEFORE → AFTER</p>
          <h2 className="text-3xl font-bold text-center mb-4">写真がグッズに変わる瞬間</h2>
          <p className="text-center text-foreground/60 mb-12">お客様の写真1枚が、世界にひとつのアイテムに</p>
          <BeforeAfter />
          <p className="text-center text-foreground/40 text-xs mt-8">
            ※実際の商品写真は準備中です。写真の切り抜き・色補正・フレーム合成はすべてスタッフが対応します。
          </p>
        </div>
      </section>

      {/* 3 Features */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-accent">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">1個から注文OK</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                自社工場で1つずつ丁寧に製作。<br />
                小ロットでも気軽にご注文いただけます。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-primary">&#165;</span>
              </div>
              <h3 className="text-lg font-bold mb-2">日本最安値に挑戦</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                中間マージンなしの自社工場直販。<br />
                マグカップ1,200円〜、缶バッジ400円〜。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">&#x2728;</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{TOTAL_ITEM_COUNT}種類以上</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                ペット用品からインテリア、ギフトまで。<br />
                写真加工もプロにおまかせ。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 - ここにしかない */}
      <section className="py-16 md:py-24 bg-accent text-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-white/60 text-sm tracking-widest mb-2">ONLY AT ITTUMO</p>
          <h2 className="text-3xl font-bold text-center mb-4">ここにしかない、トップ5</h2>
          <p className="text-center text-white/60 mb-12">他のペットグッズサービスでは手に入らないアイテムたち</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {FEATURED_ITEMS.map((item, i) => (
              <Link
                key={item.id}
                href="/items"
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold mb-2 text-lg">{item.name}</h3>
                <p className="text-sm text-white/70 mb-3 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-primary text-xl font-bold">&yen;{item.price.toLocaleString()}〜</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">全{TOTAL_ITEM_COUNT}アイテム以上</h2>
          <p className="text-center text-foreground/60 mb-12">あらゆるシーンに、あらゆるアイテムを</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORY_PREVIEW.map((cat) => {
              const itemCount = ALL_ITEMS.filter((item) => item.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/items?category=${cat.id}`}
                  className="bg-warm-gray rounded-2xl p-6 hover:bg-warm-gray-dark transition-colors group"
                >
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-foreground/50 mb-2">{cat.description}</p>
                  <p className="text-xs text-primary font-medium">{itemCount}アイテム</p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/items"
              className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
            >
              全アイテムを見る
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">かんたん4ステップ</h2>
          <p className="text-center text-foreground/60 mb-12">写真1枚あればOK</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Guide */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-primary-dark text-sm tracking-widest mb-2">PHOTO GUIDE</p>
          <h2 className="text-3xl font-bold text-center mb-4">きれいに仕上がる写真のコツ</h2>
          <p className="text-center text-foreground/60 mb-12">仕上がりの品質は写真で決まります</p>
          <PhotoGuide />
          <p className="text-center text-foreground/40 text-xs mt-6">
            ※写真の切り抜き・色補正はスタッフが無料で対応します。迷ったらそのままお送りください。
          </p>
        </div>
      </section>

      {/* Monthly Frame */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-dark text-sm tracking-widest mb-4">MONTHLY FRAME</p>
          <h2 className="text-3xl font-bold mb-4">毎月届く、季節のフレーム</h2>
          <p className="text-foreground/60 mb-8 leading-relaxed max-w-lg mx-auto">
            桜、ひまわり、ハロウィン、クリスマス…。<br />
            季節に合わせたオリジナルフレームで、<br />
            うちの子をもっとかわいく。
          </p>
          <Link
            href="/customize"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            今月のフレームを見る
          </Link>
        </div>
      </section>

      {/* Pair Items */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">ペアでおそろい</h2>
          <p className="text-center text-foreground/60 mb-12">飼い主さんとペットでお揃いのグッズ</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALL_ITEMS.filter((item) => item.category === "pair").slice(0, 3).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 text-center">
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-sm text-foreground/50 mb-3">{item.description}</p>
                <p className="text-primary font-bold text-lg">&yen;{item.price.toLocaleString()}〜</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/items?category=pair"
              className="inline-block border-2 border-accent text-accent px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-colors"
            >
              ペアアイテムをもっと見る
            </Link>
          </div>
        </div>
      </section>

      {/* Price Appeal */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">自社工場だから、この価格。</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: "缶バッジ", price: "400" },
              { name: "ステッカー", price: "500" },
              { name: "巾着", price: "800" },
              { name: "キーホルダー", price: "800" },
              { name: "エコバッグ", price: "900" },
              { name: "マグカップ", price: "1,200" },
              { name: "Tシャツ", price: "1,300" },
              { name: "スマホケース", price: "1,300" },
            ].map((item) => (
              <div key={item.name} className="bg-warm-gray rounded-xl p-4">
                <p className="text-sm text-foreground/60 mb-1">{item.name}</p>
                <p className="text-primary font-bold text-xl">&yen;{item.price}〜</p>
              </div>
            ))}
          </div>
          <p className="text-foreground/50 text-sm">※すべて税込価格。1個からご注文いただけます。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            さっそく、つくってみませんか？
          </h2>
          <p className="text-white/80 mb-8">
            写真1枚で、全{TOTAL_ITEM_COUNT}アイテム以上から選べます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customize"
              className="bg-white text-primary px-10 py-5 rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
            >
              グッズをつくる
            </Link>
            <Link
              href="/items"
              className="border-2 border-white text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
            >
              アイテム一覧
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
