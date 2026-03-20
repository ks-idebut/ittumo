# ittumo 全体構成案

## Context
ittumoはペット写真を使ったオリジナルグッズEC。WIXから自社EC（Next.js + Stripe + Supabase）に移行。FabColleの画像合成エンジンを転用し、「クリエイター向け」→「一般顧客向け」に変換する。現在はLP＋アイテム一覧ページ（245アイテム）まで完成。

---

## ページ構成

### 公開ページ（お客様向け）
| ルート | 内容 | 優先度 |
|---|---|---|
| `/` | トップページ（LP）**済** | - |
| `/items` | アイテム一覧（検索・フィルター）**済** | - |
| `/items/[id]` | アイテム詳細（テンプレート画像、サイズ・カラー、価格） | Phase 1 |
| `/order` | 注文フロー（写真アップ→アイテム選択→プレビュー→カート） | Phase 1 |
| `/order/preview` | 画像合成プレビュー（FabColleのInlineSimulator転用） | Phase 1 |
| `/cart` | カート確認 | Phase 1 |
| `/checkout` | Stripe Checkout（決済） | Phase 1 |
| `/checkout/success` | 注文完了ページ | Phase 1 |
| `/frames` | 今月のフレーム一覧 | Phase 2 |
| `/about` | ittumoとは（ブランドストーリー） | Phase 2 |
| `/guide` | ご利用ガイド（注文の流れ・納期・送料） | Phase 2 |
| `/legal/privacy` | プライバシーポリシー | Phase 2 |
| `/legal/tokushoho` | 特定商取引法に基づく表記 | Phase 2 |
| `/account` | マイページ（注文履歴） | Phase 3 |
| `/account/orders/[id]` | 注文詳細 | Phase 3 |

### 管理画面（運営向け）
| ルート | 内容 | 優先度 |
|---|---|---|
| `/admin` | ダッシュボード（新規注文数・売上サマリ） | Phase 1 |
| `/admin/orders` | 注文管理（ステータス管理・検索） | Phase 1 |
| `/admin/orders/[id]` | 注文詳細（合成画像・顧客情報・ステータス変更） | Phase 1 |
| `/admin/items` | アイテム管理（テンプレート画像・マスク・価格）FabColle転用 | Phase 1 |
| `/admin/frames` | フレーム管理（月次フレームの追加・編集） | Phase 2 |
| `/admin/sales` | 売上レポート（月別・アイテム別集計） | Phase 3 |

---

## 注文フロー（お客様視点）

```
1. 写真アップロード
   └→ ペット写真を1枚選択（切り抜き・加工はおまかせ or 自動切り抜き）

2. アイテム選択
   └→ カテゴリ別にアイテムを選ぶ（複数選択可）

3. カスタマイズ
   └→ アイテムごとにサイズ・カラー選択
   └→ フレーム選択（月替わりフレーム or フレームなし）
   └→ FabColle InlineSimulator でリアルタイムプレビュー
   └→ 柄サイズ調整（総柄の場合）

4. カート
   └→ 複数アイテムまとめて確認
   └→ 数量変更・削除

5. お客様情報入力
   └→ 名前・住所・メール（会員登録なしでも注文可＝ゲスト購入）

6. 決済（Stripe Checkout）
   └→ クレカ / Apple Pay / Google Pay

7. 注文完了
   └→ 確認メール送信（Resend）
   └→ 管理画面に注文表示
```

---

## DB設計（Supabaseテーブル）

### customers（顧客）
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### orders（注文）
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,  -- ITT-20260320-001 形式
  customer_id UUID REFERENCES customers(id),
  -- ゲスト購入用（customer_id NULLの場合）
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  guest_address JSONB,  -- { zip, pref, city, line1, line2 }
  subtotal INTEGER NOT NULL,          -- 小計（税込）
  shipping_fee INTEGER DEFAULT 0,     -- 送料
  total INTEGER NOT NULL,             -- 合計
  status TEXT DEFAULT 'pending',      -- pending → confirmed → producing → shipped → delivered
  stripe_payment_id TEXT,
  note TEXT,                          -- お客様からの備考
  admin_note TEXT,                    -- 管理者メモ
  shipped_at TIMESTAMPTZ,
  tracking_number TEXT,               -- 追跡番号
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### order_items（注文明細）
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,              -- items.tsのid参照
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price INTEGER NOT NULL,
  size TEXT,
  color TEXT,
  frame_id UUID REFERENCES frames(id),
  -- 合成画像
  original_photo_url TEXT,            -- アップロードされたペット写真
  mockup_wearing_url TEXT,            -- 合成済み着用イメージ
  mockup_product_url TEXT,            -- 合成済み商品画像
  mockup_zoom_url TEXT,               -- ズーム画像
  -- 柄設定（FabColleのcreator_items相当）
  pattern_scale_cm REAL,
  onepoint_x REAL,
  onepoint_y REAL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### frames（月次フレーム）
```sql
CREATE TABLE frames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                 -- 「2026年4月 桜フレーム」
  month TEXT NOT NULL,                -- '2026-04'
  theme TEXT,                         -- 桜, ひまわり, ハロウィン等
  frame_image_url TEXT NOT NULL,      -- フレーム画像
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### items（アイテムマスター）
```sql
-- FabColleのitemsテーブルをベースに簡略化
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,          -- items.tsのidと対応
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_price INTEGER NOT NULL,
  description TEXT,
  sizes TEXT[],                       -- ['S','M','L','XL']
  colors JSONB,                       -- [{ name, hex }]
  -- テンプレート画像（FabColleと同じ構造）
  template_wearing_url TEXT,
  template_product_url TEXT,
  template_mask_wearing_url TEXT,
  template_mask_product_url TEXT,
  canvas_cm REAL DEFAULT 80,
  default_scale_cm REAL DEFAULT 10,
  image1_type TEXT DEFAULT 'pattern',
  image2_type TEXT,
  blend_strength INTEGER DEFAULT 80,
  mask_config JSONB,
  shared_images TEXT[],
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## FabColleからの転用マップ

| FabColle | ittumo | 変更点 |
|---|---|---|
| `lib/compose-utils.ts` | `lib/compose-utils.ts` | **そのまま転用** |
| `components/InlineSimulator.tsx` | `components/ItemPreview.tsx` | UIラベル変更のみ |
| `app/admin/items/` | `app/admin/items/` | **ほぼそのまま転用** |
| `lib/supabase.ts` | `lib/supabase.ts` | **そのまま転用** |
| `app/catalog/` (1300行) | `app/order/` | クリエイター→顧客向けに大幅簡略化 |
| `components/CartProvider.tsx` | `components/CartProvider.tsx` | Shopify→Stripe変更 |
| `components/CartDrawer.tsx` | `components/CartDrawer.tsx` | UI微調整のみ |
| `lib/shopify*.ts` | 削除 | Stripe に置き換え |
| `app/creator/[slug]` | 削除 | 不要 |
| `app/apply/` | 削除 | 不要 |
| `api/shopify/*` | `api/checkout/` | Stripe Checkout API |

---

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16 + React 19 |
| DB・ストレージ | Supabase (PostgreSQL + Storage) |
| 決済 | Stripe Checkout |
| メール | Resend |
| 画像合成 | Canvas API（FabColle転用） |
| ホスティング | Vercel + ittumo.net |
| CSS | Tailwind CSS 4 |

---

## フェーズ分け

### Phase 1: 注文できる状態にする（MVP）
1. Supabase設定・テーブル作成
2. アイテム詳細ページ `/items/[id]`
3. 注文フロー `/order`（写真アップ→プレビュー→カート）
4. 画像合成エンジン移植（FabColleから）
5. カート機能（ローカルストレージ）
6. Stripe Checkout 決済
7. 注文完了メール（Resend）
8. 管理画面 `/admin`（注文管理・アイテムテンプレート管理）
9. GitHub + Vercelデプロイ + DNS設定

### Phase 2: コンテンツ充実
1. フレーム管理機能（月次フレーム追加・管理）
2. `/about`、`/guide`、`/legal/*` ページ作成
3. SNS連携（Instagram埋め込み、OGP最適化）
4. 送料計算ロジック
5. セット商品の注文対応（お散歩セット、防災セット等）

### Phase 3: 成長機能
1. 会員登録・ログイン（Supabase Auth）
2. マイページ（注文履歴・リピート注文）
3. コンビニ払い・PayPay追加（KOMOJU）
4. 売上レポート・CSV出力
5. SEO最適化・構造化データ

---

## ディレクトリ構成（最終形）

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # トップページ（済）
│   ├── items/
│   │   ├── page.tsx                # アイテム一覧（済）
│   │   └── [id]/page.tsx           # アイテム詳細
│   ├── order/
│   │   ├── page.tsx                # 注文フロー（写真アップ→選択→プレビュー）
│   │   └── preview/page.tsx        # 合成プレビュー
│   ├── cart/page.tsx               # カート確認
│   ├── checkout/
│   │   ├── page.tsx                # 情報入力→Stripe決済
│   │   └── success/page.tsx        # 注文完了
│   ├── frames/page.tsx             # 今月のフレーム
│   ├── about/page.tsx
│   ├── guide/page.tsx
│   ├── legal/
│   │   ├── privacy/page.tsx
│   │   └── tokushoho/page.tsx
│   ├── account/                    # Phase 3
│   │   ├── page.tsx
│   │   └── orders/[id]/page.tsx
│   ├── admin/
│   │   ├── page.tsx                # ダッシュボード
│   │   ├── orders/
│   │   │   ├── page.tsx            # 注文一覧
│   │   │   └── [id]/page.tsx       # 注文詳細
│   │   ├── items/page.tsx          # アイテム管理（FabColle転用）
│   │   ├── frames/page.tsx         # フレーム管理
│   │   └── sales/page.tsx          # 売上レポート
│   └── api/
│       ├── order/route.ts          # 注文作成
│       ├── upload/route.ts         # 写真アップロード
│       ├── compose/route.ts        # 合成画像アップロード（FabColle転用）
│       ├── checkout/route.ts       # Stripe Checkout Session作成
│       ├── webhook/route.ts        # Stripe Webhook（決済完了通知）
│       ├── items/route.ts          # アイテムCRUD
│       └── frames/route.ts         # フレームCRUD
├── components/
│   ├── Header.tsx                  # 済
│   ├── Footer.tsx                  # 済
│   ├── RandomItemCarousel.tsx      # 済
│   ├── ItemPreview.tsx             # FabColle InlineSimulator転用
│   ├── CartProvider.tsx            # カート状態管理
│   ├── CartDrawer.tsx              # カートドロワーUI
│   ├── PhotoUploader.tsx           # 写真アップロードUI
│   └── AdminNav.tsx                # 管理画面ナビ
├── lib/
│   ├── supabase.ts                 # Supabaseクライアント
│   ├── stripe.ts                   # Stripeクライアント
│   ├── compose-utils.ts            # 画像合成エンジン（FabColle転用）
│   └── resend.ts                   # メール送信
└── data/
    └── items.ts                    # アイテムマスター（済）
```

---

## 検証方法
1. `npm run dev` (port 3006) でローカル確認
2. 注文フロー: 写真アップ → プレビュー表示 → カート → Stripe テストモード決済
3. 管理画面: 注文ステータス変更 → メール通知
4. Vercelプレビューデプロイで本番前確認
5. Stripe Webhook のテスト（`stripe listen --forward-to localhost:3006/api/webhook`）

---

## LP Factory への記録
`D:/Claude Projects/sales-team/lp-factory/` 内に `ittumo.md` を新規作成し、以下を記録:
- プロジェクト概要（ペットパーソナライズEC）
- URL: ittumo.net
- 技術スタック: Next.js + Supabase + Stripe
- ページ構成一覧
- アイテム数: 245+
- トップ5アイテム
- フェーズ分け・進捗状況
- FabColleからの転用マップ
