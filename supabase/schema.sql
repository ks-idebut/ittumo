-- ============================================
-- ittumo DB Schema
-- ペットパーソナライズECサービス
-- Supabase SQL Editor で実行してください
-- ============================================

-- ============================================
-- 1. it_customers - 顧客マスター
-- ============================================
CREATE TABLE IF NOT EXISTS it_customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_customers ENABLE ROW LEVEL SECURITY;

-- 自分のレコードのみ閲覧可能
CREATE POLICY "Customers can view own record"
  ON it_customers FOR SELECT
  USING (auth.uid() = auth_user_id);

-- 自分のレコードのみ更新可能
CREATE POLICY "Customers can update own record"
  ON it_customers FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- 新規登録（認証済みユーザー）
CREATE POLICY "Authenticated users can insert own customer"
  ON it_customers FOR INSERT
  WITH CHECK (auth.uid() = auth_user_id);

-- 管理者は全件閲覧可能
CREATE POLICY "Service role can manage all customers"
  ON it_customers FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 2. it_customer_addresses - 配送先住所
-- ============================================
CREATE TABLE IF NOT EXISTS it_customer_addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES it_customers(id) ON DELETE CASCADE,
  label TEXT,
  name TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_customer_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can manage own addresses"
  ON it_customer_addresses FOR ALL
  USING (
    customer_id IN (
      SELECT id FROM it_customers WHERE auth_user_id = auth.uid()
    )
  );

-- ============================================
-- 3. it_items - 商品マスター
-- ============================================
CREATE TABLE IF NOT EXISTS it_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  canvas_cm REAL,
  default_scale_cm REAL,
  template_url TEXT,
  mask_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_items ENABLE ROW LEVEL SECURITY;

-- 誰でもアクティブ商品を閲覧可能
CREATE POLICY "Anyone can view active items"
  ON it_items FOR SELECT
  USING (is_active = true);

-- 管理者のみ編集可能
CREATE POLICY "Authenticated users can manage items"
  ON it_items FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. it_pet_photos - ペット写真
-- ============================================
CREATE TABLE IF NOT EXISTS it_pet_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES it_customers(id) ON DELETE SET NULL,
  original_url TEXT NOT NULL,
  cropped_url TEXT,
  pet_name TEXT,
  pet_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_pet_photos ENABLE ROW LEVEL SECURITY;

-- 誰でもアップロード可能（ゲスト注文対応）
CREATE POLICY "Anyone can insert pet photos"
  ON it_pet_photos FOR INSERT
  WITH CHECK (true);

-- 自分の写真のみ閲覧可能
CREATE POLICY "Customers can view own photos"
  ON it_pet_photos FOR SELECT
  USING (
    customer_id IS NULL
    OR customer_id IN (
      SELECT id FROM it_customers WHERE auth_user_id = auth.uid()
    )
  );

-- 管理者は全件操作可能
CREATE POLICY "Authenticated users can manage all photos"
  ON it_pet_photos FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 5. it_omakase_orders - おまかせ注文
-- ============================================
CREATE TABLE IF NOT EXISTS it_omakase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  item_id TEXT REFERENCES it_items(id),
  pet_photo_id UUID REFERENCES it_pet_photos(id),
  pet_name TEXT NOT NULL,
  pet_type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN (
      'pending', 'designing', 'preview_sent',
      'approved', 'paid', 'producing', 'shipped'
    )),
  design_preview_url TEXT,
  stripe_session_id TEXT,
  total_amount INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_omakase_orders ENABLE ROW LEVEL SECURITY;

-- 誰でも注文可能（ゲスト対応）
CREATE POLICY "Anyone can insert omakase orders"
  ON it_omakase_orders FOR INSERT
  WITH CHECK (true);

-- 管理者は全件操作可能
CREATE POLICY "Authenticated users can manage omakase orders"
  ON it_omakase_orders FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 6. it_simulator_orders - シミュレーター注文
-- ============================================
CREATE TABLE IF NOT EXISTS it_simulator_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES it_customers(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  item_id TEXT REFERENCES it_items(id),
  composed_image_url TEXT NOT NULL,
  pet_name TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN (
      'pending', 'paid', 'producing', 'shipped'
    )),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  total_amount INTEGER,
  quantity INTEGER DEFAULT 1,
  size TEXT,
  shipping_name TEXT,
  shipping_postal_code TEXT,
  shipping_state TEXT,
  shipping_city TEXT,
  shipping_line1 TEXT,
  shipping_line2 TEXT,
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_simulator_orders ENABLE ROW LEVEL SECURITY;

-- 誰でも注文可能（ゲスト対応）
CREATE POLICY "Anyone can insert simulator orders"
  ON it_simulator_orders FOR INSERT
  WITH CHECK (true);

-- 自分の注文のみ閲覧可能
CREATE POLICY "Customers can view own simulator orders"
  ON it_simulator_orders FOR SELECT
  USING (
    customer_id IS NULL
    OR customer_id IN (
      SELECT id FROM it_customers WHERE auth_user_id = auth.uid()
    )
  );

-- 管理者は全件操作可能
CREATE POLICY "Authenticated users can manage simulator orders"
  ON it_simulator_orders FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 7. it_frames - シミュレーター用フレーム
-- ============================================
CREATE TABLE IF NOT EXISTS it_frames (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('seasonal', 'event', 'basic')),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE it_frames ENABLE ROW LEVEL SECURITY;

-- 誰でもアクティブフレームを閲覧可能
CREATE POLICY "Anyone can view active frames"
  ON it_frames FOR SELECT
  USING (is_active = true);

-- 管理者のみ編集可能
CREATE POLICY "Authenticated users can manage frames"
  ON it_frames FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- updated_at 自動更新トリガー
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_it_customers_updated_at
  BEFORE UPDATE ON it_customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_it_customer_addresses_updated_at
  BEFORE UPDATE ON it_customer_addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_it_items_updated_at
  BEFORE UPDATE ON it_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_it_omakase_orders_updated_at
  BEFORE UPDATE ON it_omakase_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_it_simulator_orders_updated_at
  BEFORE UPDATE ON it_simulator_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- インデックス
-- ============================================
CREATE INDEX idx_it_customers_auth_user_id ON it_customers(auth_user_id);
CREATE INDEX idx_it_customers_email ON it_customers(email);
CREATE INDEX idx_it_customer_addresses_customer_id ON it_customer_addresses(customer_id);
CREATE INDEX idx_it_items_category ON it_items(category);
CREATE INDEX idx_it_items_is_active ON it_items(is_active);
CREATE INDEX idx_it_pet_photos_customer_id ON it_pet_photos(customer_id);
CREATE INDEX idx_it_omakase_orders_status ON it_omakase_orders(status);
CREATE INDEX idx_it_omakase_orders_customer_email ON it_omakase_orders(customer_email);
CREATE INDEX idx_it_simulator_orders_status ON it_simulator_orders(status);
CREATE INDEX idx_it_simulator_orders_customer_id ON it_simulator_orders(customer_id);
CREATE INDEX idx_it_simulator_orders_customer_email ON it_simulator_orders(customer_email);
CREATE INDEX idx_it_frames_category ON it_frames(category);
CREATE INDEX idx_it_frames_is_active ON it_frames(is_active);

-- ============================================
-- Storage バケット（Supabaseダッシュボードで作成）
-- ============================================
-- 1. 「pet-photos」バケット: Public = false, Max 10MB, image/jpeg, image/png, image/webp
-- 2. 「design-previews」バケット: Public = true, Max 5MB, image/jpeg, image/png
-- 3. 「composed-images」バケット: Public = false, Max 10MB, image/png
-- 4. 「frames」バケット: Public = true, Max 2MB, image/png, image/webp
-- 5. 「item-templates」バケット: Public = true, Max 5MB, image/png, image/webp
