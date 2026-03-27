import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ittumo",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-warm-gray border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-foreground/50 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">TOP</Link>
            <span>/</span>
            <span className="text-foreground/70">プライバシーポリシー</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">1. 個人情報の取得について</h2>
              <p>
                ittumo（以下「当サービス」）は、ご注文・お問い合わせの際に、お名前、メールアドレス、
                お届け先住所、電話番号等の個人情報をご提供いただく場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">2. 個人情報の利用目的</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>ご注文の受付・商品の発送・お届け状況のご連絡</li>
                <li>仕上がりデザインイメージのご送付</li>
                <li>ご注文内容・お支払いに関するご連絡</li>
                <li>アフターサービス・お問い合わせへの対応</li>
                <li>サービス改善・新商品・キャンペーンのご案内（ご同意いただいた場合）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">3. 個人情報の第三者提供</h2>
              <p>
                当サービスは、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>お客様の同意がある場合</li>
                <li>商品の発送のために配送業者に提供する場合</li>
                <li>法令に基づき開示が必要な場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">4. ペット写真の取り扱い</h2>
              <p>
                当サービスは完全受注生産のため、ご注文時にアップロードいただいたペット写真は
                お客様ごとのオリジナルグッズ制作のみに使用します。
                制作・発送完了後は、お客様のご要望に応じて速やかに削除いたします。
                写真を第三者に提供したり、広告・宣伝目的で無断使用することはありません
                （SNS等への掲載はお客様の明示的な同意を得た場合のみ）。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">5. 決済情報について</h2>
              <p>
                クレジットカード等の決済情報は、Stripe Inc.が安全に管理します。
                当サービスはカード番号等の決済情報を直接保持しません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">6. Cookieの使用</h2>
              <p>
                当サービスでは、サービス向上のためCookieを使用する場合があります。
                ブラウザの設定によりCookieを無効にすることができますが、
                一部機能が利用できなくなる場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">7. 個人情報の管理</h2>
              <p>
                当サービスは、個人情報の漏洩・滅失・毀損を防止するため、
                適切なセキュリティ対策を実施します。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">8. 個人情報の開示・訂正・削除</h2>
              <p>
                お客様ご自身の個人情報の開示・訂正・削除をご希望の場合は、
                下記お問い合わせ先までご連絡ください。ご本人確認の上、対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">9. お問い合わせ</h2>
              <p>
                個人情報の取り扱いに関するお問い合わせは、以下よりご連絡ください。<br />
                運営責任者：関根健太郎<br />
                メール：<a href="mailto:info@ittumo.net" className="text-primary hover:underline">info@ittumo.net</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">10. プライバシーポリシーの変更</h2>
              <p>
                本ポリシーは、必要に応じて予告なく変更する場合があります。
                変更後のポリシーは当ページに掲載した時点で効力を生じます。
              </p>
            </section>

            <p className="text-sm text-foreground/50 mt-8">制定日：2026年3月28日</p>
          </div>
        </div>
      </section>
    </>
  );
}
