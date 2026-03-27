import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ご利用ガイド | ittumo",
  description: "ittumoのご注文方法・納期・送料・よくある質問をご確認いただけます。",
};

const STEPS = [
  {
    num: "01",
    title: "アイテムを選ぶ",
    desc: "マグカップ、Tシャツ、スマホケースなど、245種類以上のアイテムから選んでください。",
  },
  {
    num: "02",
    title: "ペットの写真を送る",
    desc: "正面から撮った明るい写真がベストです。スマホ写真でもOK！切り抜き・色補正はスタッフが行います。",
  },
  {
    num: "03",
    title: "仕上がりイメージを確認",
    desc: "2〜3営業日でスタッフがデザインを作成し、メールでイメージ画像をお送りします。",
  },
  {
    num: "04",
    title: "注文確定・お支払い",
    desc: "デザインに満足いただけたら決済リンクからお支払いください。クレカ・Apple Pay対応。",
  },
  {
    num: "05",
    title: "お届け",
    desc: "ご入金確認後、14営業日以内に発送します。自社工場製造だからスピード対応。",
  },
];

const FAQS = [
  {
    q: "どんな写真が適していますか？",
    a: "正面からのお顔がはっきり写っている写真が最適です。顔が影になっているものや遠くて小さいものは仕上がりに影響することがあります。複数枚送っていただければスタッフが最適な写真を選びます。",
  },
  {
    q: "注文確定前にデザインを確認できますか？",
    a: "はい、全てのご注文でデザイン確認後に注文確定となります。イメージと異なる場合は無料で修正いたします。",
  },
  {
    q: "修正はできますか？",
    a: "はい、お支払い前であれば何度でも修正対応いたします。文字の変更、レイアウト調整等、お気軽にお申し付けください。",
  },
  {
    q: "複数のアイテムをまとめて注文できますか？",
    a: "はい、複数アイテムのご注文も承ります。同じ写真で種類の異なるアイテムのご注文も可能です。",
  },
  {
    q: "送料はいくらですか？",
    a: "全国一律550円（税込）です。複数アイテムをまとめてご注文の場合も同額です。",
  },
  {
    q: "領収書は発行できますか？",
    a: "はい、ご希望の方にはPDF形式での領収書発行が可能です。ご注文時にお申し付けください。",
  },
  {
    q: "返品・交換はできますか？",
    a: "オリジナル商品の性質上、お客様都合による返品・交換はお受けできません。商品の破損・品質不良の場合は、お届け後7日以内にご連絡ください。",
  },
];

export default function GuidePage() {
  return (
    <>
      <div className="bg-warm-gray border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-foreground/50 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">TOP</Link>
            <span>/</span>
            <span className="text-foreground/70">ご利用ガイド</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-warm-gray py-12 text-center">
        <h1 className="text-3xl font-bold mb-3">ご利用ガイド</h1>
        <p className="text-foreground/60">ittumoのご注文方法から発送まで、わかりやすくご説明します。</p>
      </section>

      {/* Steps */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-8 text-center">注文の流れ</h2>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{step.num}</span>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Specs */}
      <section className="bg-warm-gray py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-8 text-center">納期・送料</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📦", title: "デザイン制作", desc: "ご依頼から\n2〜3営業日" },
              { icon: "🚚", title: "発送", desc: "ご入金確認後\n14営業日以内" },
              { icon: "💳", title: "送料", desc: "全国一律\n550円（税込）" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-foreground/60 whitespace-pre-line">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-8 text-center">よくある質問</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-foreground/10 rounded-xl overflow-hidden">
                <div className="bg-warm-gray px-5 py-4">
                  <p className="font-bold text-sm">
                    <span className="text-primary mr-2">Q.</span>{faq.q}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    <span className="text-accent font-bold mr-2">A.</span>{faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-12 text-center">
        <h2 className="text-xl font-bold mb-4">さっそく注文してみよう</h2>
        <p className="text-foreground/60 mb-6 text-sm">デザイン確認後に注文確定。安心してお試しください。</p>
        <Link
          href="/items"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
        >
          アイテムを選ぶ
        </Link>
      </section>
    </>
  );
}
