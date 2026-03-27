import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | ittumo",
};

const ITEMS = [
  { label: "販売業者", value: "ittumo" },
  { label: "運営責任者", value: "（代表者名）" },
  { label: "所在地", value: "お問い合わせいただいた場合に遅滞なく開示いたします" },
  { label: "電話番号", value: "お問い合わせいただいた場合に遅滞なく開示いたします" },
  { label: "メールアドレス", value: "info@ittumo.net" },
  { label: "販売URL", value: "https://ittumo.net" },
  { label: "商品の販売価格", value: "各商品ページに記載（税込）" },
  {
    label: "商品代金以外の必要料金",
    value: "送料：全国一律550円（税込）\n決済手数料：無料",
  },
  { label: "お支払い方法", value: "クレジットカード（Visa / Mastercard / JCB / American Express）\nApple Pay / Google Pay" },
  { label: "お支払い時期", value: "ご注文確定時にお支払いいただきます" },
  {
    label: "商品の引渡し時期",
    value: "ご入金確認後、仕上がりデザインの承認をいただいた上で14営業日以内に発送いたします",
  },
  {
    label: "返品・交換について",
    value: "オリジナル商品の性質上、お客様都合による返品・交換はお受けできません。\n商品の破損・品質不良・誤送等の場合は、到着後7日以内にご連絡ください。\n対応についてはご相談の上、交換または返金にて対応いたします。",
  },
  {
    label: "キャンセルについて",
    value: "仕上がりデザインの承認前であれば、キャンセルを承ります。\nデザイン承認後・製作開始後のキャンセルはお受けできません。",
  },
  { label: "動作環境", value: "最新バージョンのGoogle Chrome / Safari / Firefox / Edge（スマートフォン可）" },
];

export default function TokushohoPage() {
  return (
    <>
      <div className="bg-warm-gray border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-foreground/50 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">TOP</Link>
            <span>/</span>
            <span className="text-foreground/70">特定商取引法に基づく表記</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">特定商取引法に基づく表記</h1>
          <p className="text-sm text-foreground/50 mb-8">
            特定商取引法第11条に基づき、以下の通り表記いたします。
          </p>

          <div className="border border-foreground/10 rounded-2xl overflow-hidden">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row ${i !== ITEMS.length - 1 ? "border-b border-foreground/10" : ""}`}
              >
                <dt className="w-full sm:w-48 shrink-0 bg-warm-gray px-5 py-4 text-sm font-bold text-foreground/70">
                  {item.label}
                </dt>
                <dd className="flex-1 px-5 py-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {item.value}
                </dd>
              </div>
            ))}
          </div>

          <p className="text-sm text-foreground/50 mt-8">最終更新日：2026年3月28日</p>
        </div>
      </section>
    </>
  );
}
