// ittumo アイテムマスター（ItemBankベース）
// カテゴリ: ペット直接 / ペア（飼い主+ペット）/ 飼い主向け / ギフト / インテリア

export type ItemCategory =
  | "featured"    // トップ5 ここにしかない
  | "pet"         // ペット用品
  | "pair"        // ペア・おそろい
  | "owner"       // 飼い主向け
  | "gift"        // ギフト・お菓子
  | "home"        // ホーム・インテリア
  | "photo"       // フォトグッズ
  | "accessories" // 小物・アクセサリー
  | "bag"         // バッグ類
  | "stationery"; // 文房具

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;         // 税込最安値
  description: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;  // トップ5
}

// ========================================
// トップ5: 他にはないユニークアイテム
// ========================================
const FEATURED: Item[] = [
  {
    id: "uchinokocha",
    name: "うちの子紅茶",
    category: "featured",
    price: 2090,
    description: "ペットの写真入りパッケージの紅茶ギフト（5個入）。専門店オリジナルブレンド。個包装だからプチギフトにも。",
    tags: ["人気No.1", "ギフト"],
    isFeatured: true,
  },
  {
    id: "pet-tag-bone",
    name: "オリジナル迷子札（骨型）",
    category: "featured",
    price: 1200,
    description: "ペットの顔写真＋名前＋電話番号入り。実用的でかわいい、世界に1つの迷子札。",
    tags: ["実用的", "1個からOK"],
    isFeatured: true,
  },
  {
    id: "osanpo-set",
    name: "オリジナルお散歩セット",
    category: "featured",
    price: 4500,
    description: "リード＋マナーポーチ＋お散歩トート＋バンダナの4点セット。全部おそろいデザインでお散歩が特別な時間に。",
    tags: ["セット", "お散歩"],
    isFeatured: true,
  },
  {
    id: "bousai-set",
    name: "ペット防災セット",
    category: "featured",
    price: 5500,
    description: "キャリーバッグ＋迷子札＋フードボウル＋ブランケット＋飼い主情報カード。いざという時もうちの子を守る。",
    tags: ["防災", "安心"],
    isFeatured: true,
  },
  {
    id: "pair-tshirt-set",
    name: "ペアルックセット（飼い主+犬服）",
    category: "featured",
    price: 3800,
    description: "飼い主用Tシャツと犬服のおそろいセット。お散歩がもっと楽しくなる。",
    tags: ["おそろい", "SNS映え"],
    isFeatured: true,
  },
];

// ========================================
// ペット用品
// ========================================
const PET: Item[] = [
  { id: "dog-tshirt", name: "犬服 Tシャツ", category: "pet", price: 1500, description: "通気性の良いドライ素材。総柄プリントで全身かわいく。", tags: ["犬服"] },
  { id: "dog-tanktop", name: "犬服 タンクトップ", category: "pet", price: 1300, description: "夏にぴったりの涼しいタンクトップ。", tags: ["犬服", "夏"] },
  { id: "dog-hoodie", name: "犬服 パーカー", category: "pet", price: 2000, description: "秋冬のお散歩に。フード付きで防寒もおしゃれも。", tags: ["犬服", "秋冬"] },
  { id: "food-bowl", name: "フードボウル", category: "pet", price: 1800, description: "ペットの名前＋写真入りオリジナルフードボウル。", tags: ["食器"] },
  { id: "retractable-lead", name: "伸縮リード", category: "pet", price: 2500, description: "オリジナルデザインの伸縮リード。お散歩が特別に。", tags: ["お散歩"] },
  { id: "pet-tag-circle", name: "迷子札（円形）", category: "pet", price: 1000, description: "シンプルな円形の迷子札。名前と電話番号入り。", tags: ["実用的"] },
  { id: "pet-bed", name: "ペットベッド", category: "pet", price: 4500, description: "オリジナルデザインのペットベッド。", tags: ["インテリア"] },
  { id: "pet-carrier", name: "ペットキャリーバッグ", category: "pet", price: 5000, description: "お出かけ用のオリジナルキャリー。", tags: ["お出かけ", "防災"] },
  { id: "pet-bandana", name: "ペットバンダナ", category: "pet", price: 800, description: "首に巻くだけでおしゃれに。写真映え抜群。", tags: ["アクセサリー", "SNS映え"] },
  // お散歩グッズ
  { id: "manner-pouch", name: "マナーポーチ", category: "pet", price: 1500, description: "お散歩の必需品。消臭機能付きオリジナルデザイン。", tags: ["お散歩", "実用的"] },
  { id: "treat-pouch", name: "おやつポーチ", category: "pet", price: 1200, description: "腰に付けられるおやつ入れ。トレーニングにも。", tags: ["お散歩"] },
  { id: "water-bottle-pet", name: "ペット用ウォーターボトル", category: "pet", price: 1800, description: "お散歩中の水分補給に。ボウル一体型。", tags: ["お散歩", "実用的"] },
  { id: "poop-bag-case", name: "うんち袋ケース", category: "pet", price: 900, description: "リードに取付可能。オリジナルデザインで実用的。", tags: ["お散歩", "実用的"] },
  { id: "harness", name: "ハーネス", category: "pet", price: 3000, description: "体への負担が少ないハーネス。オリジナルプリント。", tags: ["お散歩"] },
  // 防災グッズ
  { id: "pet-id-card", name: "飼い主情報カード", category: "pet", price: 500, description: "ペットの情報＋飼い主連絡先＋かかりつけ医を記載。ラミネート加工で防水。", tags: ["防災", "実用的"] },
  { id: "pet-blanket-compact", name: "コンパクトブランケット（ペット用）", category: "pet", price: 2000, description: "折りたたんで持ち運べるペット用ブランケット。避難時にも。", tags: ["防災", "お出かけ"] },
  { id: "pet-first-aid-pouch", name: "ペット救急ポーチ", category: "pet", price: 1800, description: "ペットの薬や応急セットを入れるオリジナルポーチ。中身が見えるクリア窓付き。", tags: ["防災", "実用的"] },
  { id: "reflective-bandana", name: "反射バンダナ", category: "pet", price: 1200, description: "夜間のお散歩や災害時に。反射素材付きで安全。", tags: ["お散歩", "防災", "安全"] },
];

// ========================================
// ペア・おそろいアイテム
// ========================================
const PAIR: Item[] = [
  { id: "pair-mug", name: "ペアマグカップ", category: "pair", price: 2200, description: "飼い主用＋ペット柄のおそろいマグ2個セット。", tags: ["おそろい", "ギフト"] },
  { id: "pair-tshirt-owner", name: "おそろいTシャツ（飼い主用）", category: "pair", price: 2000, description: "ペットの写真入りTシャツ。犬服とセットでペアルック。", tags: ["おそろい"] },
  { id: "pair-hoodie-set", name: "ペアパーカーセット", category: "pair", price: 5500, description: "飼い主パーカー＋犬服パーカーのおそろいセット。", tags: ["おそろい", "秋冬"] },
  { id: "pair-bandana-scarf", name: "おそろいバンダナ+スカーフ", category: "pair", price: 2000, description: "ペット用バンダナと飼い主用スカーフのセット。", tags: ["おそろい", "お散歩"] },
  { id: "pair-tote", name: "おそろいお散歩トート", category: "pair", price: 1800, description: "ペット柄のトートバッグ。お散歩グッズを入れて。", tags: ["おそろい", "お散歩"] },
];

// ========================================
// 飼い主向けウェア
// ========================================
const OWNER: Item[] = [
  { id: "tshirt-standard", name: "Tシャツ（定番）", category: "owner", price: 1500, description: "5.6ozヘビーウェイト。普段使いに最適。", tags: ["ウェア"] },
  { id: "tshirt-dry", name: "ドライTシャツ", category: "owner", price: 1300, description: "吸汗速乾。お散歩やスポーツに。", tags: ["ウェア", "夏"] },
  { id: "tshirt-oversize", name: "オーバーサイズTシャツ", category: "owner", price: 1800, description: "ゆったりシルエットでトレンド感。", tags: ["ウェア", "トレンド"] },
  { id: "longsleeve", name: "長袖Tシャツ", category: "owner", price: 1800, description: "秋〜春のお散歩に。", tags: ["ウェア", "秋冬"] },
  { id: "hoodie-pullover", name: "プルオーバーパーカー", category: "owner", price: 3000, description: "裏起毛で暖かい。ペット写真をプリント。", tags: ["ウェア", "秋冬"] },
  { id: "hoodie-zip", name: "ジップパーカー", category: "owner", price: 3200, description: "前開きで脱ぎ着しやすい。", tags: ["ウェア", "秋冬"] },
  { id: "sweatshirt", name: "トレーナー", category: "owner", price: 2800, description: "シンプルなクルーネック。", tags: ["ウェア", "秋冬"] },
  { id: "apron", name: "エプロン", category: "owner", price: 2000, description: "キッチンでもうちの子と一緒。", tags: ["キッチン"] },
  { id: "aloha-shirt", name: "アロハシャツ", category: "owner", price: 3500, description: "ペット柄の総柄アロハ。夏のお出かけに。", tags: ["ウェア", "夏", "トレンド"] },
];

// ========================================
// ギフト（食品不可のため非食品のみ）
// ========================================
const GIFT: Item[] = [
  { id: "steel-can", name: "スチール缶", category: "gift", price: 1760, description: "おやつ入れや小物入れに。多用途なオリジナル缶。", tags: ["ギフト", "定番"] },
  { id: "candle", name: "オリジナルキャンドル", category: "gift", price: 1500, description: "ペット写真入りラベルのアロマキャンドル。", tags: ["ギフト", "癒し"] },
  { id: "gift-box-set", name: "ギフトボックスセット", category: "gift", price: 3500, description: "マグカップ＋コースター＋ハンドタオルの3点セット。ギフトBOX入り。", tags: ["ギフト", "プレゼント"] },
  { id: "memorial-frame", name: "メモリアルフォトフレーム", category: "gift", price: 2500, description: "ペットの写真と名前・誕生日を刻んだフォトフレーム。虹の橋の子にも。", tags: ["ギフト", "メモリアル"] },
];

// ========================================
// ホーム・インテリア
// ========================================
const HOME: Item[] = [
  { id: "mug", name: "マグカップ", category: "home", price: 1200, description: "毎日のコーヒータイムにうちの子を。", tags: ["定番", "日本最安値"] },
  { id: "color-mug", name: "カラーマグカップ", category: "home", price: 1400, description: "内側カラー付き。6色から選べる。", tags: ["定番"] },
  { id: "yunomi", name: "湯のみ", category: "home", price: 1200, description: "和テイストの湯のみ。", tags: ["和風"] },
  { id: "tumbler-stainless", name: "ステンレスタンブラー", category: "home", price: 2200, description: "保温保冷。通勤やお出かけのお供に。", tags: ["実用的"] },
  { id: "tumbler-double", name: "ダブルウォールタンブラー", category: "home", price: 2500, description: "二重構造で結露しない。", tags: ["実用的"] },
  { id: "bottle-stainless", name: "ステンレスボトル", category: "home", price: 2800, description: "お散歩のお供に。水筒としても。", tags: ["お散歩", "実用的"] },
  { id: "bottle-clear", name: "クリアボトル", category: "home", price: 1500, description: "透明ボトルにペットの写真。", tags: ["夏"] },
  { id: "cushion", name: "クッション", category: "home", price: 2000, description: "お部屋にうちの子を。45cm角。", tags: ["インテリア"] },
  { id: "dakimakura", name: "抱き枕", category: "home", price: 3500, description: "大きめサイズでぎゅっと抱きしめて。", tags: ["インテリア"] },
  { id: "blanket", name: "ブランケット", category: "home", price: 3000, description: "フリース素材。ソファでもベッドでも。", tags: ["インテリア", "秋冬"] },
  { id: "coaster-cork", name: "コルクコースター", category: "home", price: 600, description: "天然コルクにペット写真。", tags: ["キッチン"] },
  { id: "coaster-keisoudo", name: "珪藻土コースター", category: "home", price: 800, description: "吸水性抜群の珪藻土。", tags: ["キッチン"] },
  { id: "canvas-board", name: "キャンバスボード", category: "home", price: 2500, description: "絵画のような仕上がり。壁掛けインテリアに。", tags: ["インテリア", "アート"] },
  { id: "acrylic-panel", name: "アクリルパネル", category: "home", price: 3000, description: "透明感のあるアクリル素材に高精細プリント。", tags: ["インテリア", "アート"] },
  { id: "fabric-panel", name: "ファブリックパネル", category: "home", price: 2800, description: "布に印刷して木枠に張ったアートパネル。", tags: ["インテリア", "アート"] },
  { id: "wall-clock", name: "オリジナル時計", category: "home", price: 3000, description: "文字盤にペット写真。毎日見るたびに癒される。", tags: ["インテリア", "実用的"] },
  { id: "doormat", name: "玄関マット", category: "home", price: 3500, description: "お帰りの瞬間からうちの子がお出迎え。", tags: ["インテリア"] },
  { id: "bath-mat", name: "バスマット", category: "home", price: 2800, description: "お風呂上がりにうちの子。", tags: ["インテリア"] },
  { id: "pillow-cover", name: "枕カバー", category: "home", price: 1800, description: "寝室にもうちの子を。", tags: ["インテリア"] },
  { id: "glass-taper", name: "テーパーグラス", category: "home", price: 1500, description: "おしゃれなテーパー型。", tags: ["キッチン"] },
  { id: "glass-rock", name: "ロックグラス", category: "home", price: 1800, description: "晩酌のお供に。", tags: ["キッチン"] },
  { id: "beer-jockey", name: "ビールジョッキ", category: "home", price: 2000, description: "ビール好きの飼い主さんに。", tags: ["キッチン", "ギフト"] },
  { id: "lunch-box", name: "ランチボックス", category: "home", price: 1800, description: "オリジナルのお弁当箱。", tags: ["キッチン", "実用的"] },
  { id: "cutting-board", name: "カッティングボード", category: "home", price: 2000, description: "まな板としてもプレートとしても。", tags: ["キッチン"] },
  { id: "chopsticks", name: "オリジナル箸", category: "home", price: 1200, description: "マイ箸にペットの名前入り。", tags: ["キッチン", "和風"] },
  { id: "luncheon-mat", name: "ランチョンマット", category: "home", price: 800, description: "食卓を彩るオリジナルマット。", tags: ["キッチン"] },
];

// ========================================
// フォトグッズ
// ========================================
const PHOTO: Item[] = [
  { id: "photo-book", name: "フォトブック", category: "photo", price: 2500, description: "ペットの写真を1冊の本に。", tags: ["思い出"] },
  { id: "poster", name: "ポスター", category: "photo", price: 1200, description: "A3〜B1サイズ。お部屋に飾って。", tags: ["インテリア"] },
  { id: "postcard", name: "ポストカード", category: "photo", price: 300, description: "年賀状やお礼状にも。", tags: ["ギフト"] },
  { id: "mini-polaroid", name: "ミニポラロイド風カード", category: "photo", price: 500, description: "推し活風のチェキカード。", tags: ["トレンド", "推し活"] },
  { id: "calendar", name: "オリジナルカレンダー", category: "photo", price: 1800, description: "12ヶ月分のペット写真カレンダー。", tags: ["インテリア", "実用的"] },
  { id: "tapestry", name: "タペストリー", category: "photo", price: 2500, description: "大きく飾れるタペストリー。", tags: ["インテリア"] },
];

// ========================================
// バッグ類
// ========================================
const BAG: Item[] = [
  { id: "tote-standard", name: "トートバッグ", category: "bag", price: 1300, description: "コットン素材。お買い物にも。", tags: ["定番", "日本最安値"] },
  { id: "tote-canvas", name: "キャンバストート", category: "bag", price: 1800, description: "厚手のキャンバス地。丈夫で長持ち。", tags: ["定番"] },
  { id: "tote-gusset", name: "トートバッグ（マチあり）", category: "bag", price: 1600, description: "マチ付きで収納力アップ。", tags: ["実用的"] },
  { id: "eco-bag", name: "エコバッグ", category: "bag", price: 900, description: "折りたためるエコバッグ。", tags: ["エコ", "実用的"] },
  { id: "sacoche", name: "サコッシュ", category: "bag", price: 1500, description: "お散歩にぴったりの軽量バッグ。", tags: ["お散歩", "トレンド"] },
  { id: "shoulder-bag", name: "ショルダーバッグ", category: "bag", price: 2200, description: "斜めがけできるショルダー。", tags: ["お出かけ"] },
  { id: "lunch-tote", name: "ランチトート", category: "bag", price: 1200, description: "お弁当バッグにも。", tags: ["実用的"] },
  { id: "napsack", name: "ナップサック", category: "bag", price: 1500, description: "背負える巾着型バッグ。", tags: ["キッズ"] },
  { id: "kinchaku", name: "巾着", category: "bag", price: 800, description: "バッグインバッグにも。多用途に使える。", tags: ["定番"] },
  { id: "pouch", name: "ポーチ", category: "bag", price: 1200, description: "化粧品や小物入れに。", tags: ["実用的"] },
  { id: "clear-pouch", name: "クリアポーチ", category: "bag", price: 1000, description: "中身が見えるクリア素材。", tags: ["トレンド"] },
  { id: "pen-case", name: "ペンケース", category: "bag", price: 1200, description: "学校やオフィスで。", tags: ["文房具"] },
];

// ========================================
// アクセサリー・小物
// ========================================
const ACCESSORIES: Item[] = [
  { id: "acrylic-keychain", name: "アクリルキーホルダー", category: "accessories", price: 800, description: "透明感のあるアクリル素材。", tags: ["定番", "推し活"] },
  { id: "acrylic-stand", name: "アクリルスタンド", category: "accessories", price: 1200, description: "デスクに飾れるアクスタ。推し活にも。", tags: ["推し活", "トレンド"] },
  { id: "acrylic-block", name: "アクリルブロック", category: "accessories", price: 1500, description: "高級感のあるブロック型。", tags: ["インテリア"] },
  { id: "led-acrylic-stand", name: "LEDアクリルスタンド", category: "accessories", price: 2500, description: "LEDで光るアクリルスタンド。幻想的。", tags: ["インテリア", "ギフト"] },
  { id: "can-badge", name: "缶バッジ", category: "accessories", price: 400, description: "バッグやリュックに。", tags: ["推し活"] },
  { id: "rubber-keychain", name: "ラバーキーホルダー", category: "accessories", price: 900, description: "柔らか素材のキーホルダー。", tags: [] },
  { id: "compact-mirror", name: "コンパクトミラー", category: "accessories", price: 1200, description: "持ち歩きミラーにペット写真。", tags: ["実用的"] },
  { id: "smartphone-ring", name: "スマホリング", category: "accessories", price: 1000, description: "落下防止のスマホリング。", tags: ["スマホ"] },
  { id: "mobile-battery", name: "モバイルバッテリー", category: "accessories", price: 2800, description: "ペット写真入りモバイルバッテリー。", tags: ["スマホ", "実用的"] },
  { id: "pin-badge", name: "ピンズ", category: "accessories", price: 800, description: "金属製のオリジナルピンズ。", tags: [] },
  { id: "uchiwa", name: "オリジナルうちわ", category: "accessories", price: 600, description: "夏のイベントやお散歩に。", tags: ["夏", "推し活"] },
  { id: "sensu", name: "扇子", category: "accessories", price: 1500, description: "和テイストの扇子。", tags: ["夏", "和風"] },
  { id: "umbrella", name: "オリジナル傘", category: "accessories", price: 3000, description: "雨の日もうちの子と一緒。", tags: ["実用的"] },
  { id: "socks", name: "オリジナル靴下", category: "accessories", price: 900, description: "ペット柄のオリジナルソックス。", tags: ["ウェア"] },
  { id: "slippers", name: "スリッパ", category: "accessories", price: 1500, description: "ルームスリッパにペット写真。", tags: ["インテリア"] },
  { id: "neck-warmer", name: "ネックウォーマー", category: "accessories", price: 1800, description: "冬のお散歩にぴったり。", tags: ["秋冬", "お散歩"] },
];

// ========================================
// スマホケース
// ========================================
const PHONE: Item[] = [
  { id: "phone-hard", name: "スマホケース（ハード）", category: "accessories", price: 1500, description: "軽量ハードケース。鮮やかなプリント。", tags: ["スマホ", "定番"] },
  { id: "phone-soft", name: "スマホケース（ソフト）", category: "accessories", price: 1500, description: "TPU素材で衝撃吸収。", tags: ["スマホ"] },
  { id: "phone-notebook", name: "スマホケース（手帳型）", category: "accessories", price: 2200, description: "カード収納付き手帳型。", tags: ["スマホ", "実用的"] },
  { id: "phone-clear", name: "スマホケース（クリア）", category: "accessories", price: 1300, description: "透明ケースにワンポイント。", tags: ["スマホ", "トレンド"] },
];

// ========================================
// タオル類
// ========================================
const TOWEL: Item[] = [
  { id: "towel-face", name: "フェイスタオル", category: "home", price: 1200, description: "毎日使うタオルにうちの子を。", tags: ["実用的"] },
  { id: "towel-hand", name: "ハンドタオル", category: "home", price: 800, description: "ハンカチ代わりにも。", tags: ["実用的"] },
  { id: "towel-bath", name: "バスタオル", category: "home", price: 2500, description: "大判バスタオル。", tags: ["実用的"] },
  { id: "towel-sports", name: "スポーツタオル", category: "home", price: 1500, description: "お散歩や運動後に。", tags: ["お散歩"] },
  { id: "towel-muffler", name: "マフラータオル", category: "home", price: 1500, description: "首にかけられるサイズ。", tags: ["実用的"] },
];

// ========================================
// 文房具
// ========================================
const STATIONERY: Item[] = [
  { id: "clear-file", name: "クリアファイル", category: "stationery", price: 400, description: "A4クリアファイル。学校や職場で。", tags: ["文房具"] },
  { id: "notebook", name: "ノート", category: "stationery", price: 800, description: "表紙にペット写真。", tags: ["文房具"] },
  { id: "masking-tape", name: "マスキングテープ", category: "stationery", price: 600, description: "オリジナル柄のマステ。", tags: ["文房具", "ギフト"] },
  { id: "sticker", name: "ステッカー", category: "stationery", price: 500, description: "スマホやPCに貼れるステッカー。", tags: ["推し活"] },
  { id: "hologram-sticker", name: "ホログラムステッカー", category: "stationery", price: 700, description: "キラキラ光るホログラム仕様。", tags: ["推し活", "トレンド"] },
  { id: "magnet", name: "マグネットシート", category: "stationery", price: 600, description: "冷蔵庫やホワイトボードに。", tags: ["実用的"] },
  { id: "book-cover", name: "ブックカバー", category: "stationery", price: 1500, description: "文庫本サイズ。キャンバスまたは合皮。", tags: ["実用的"] },
];

// ========================================
// キッズ・ベビー
// ========================================
const KIDS: Item[] = [
  { id: "baby-romper", name: "ベビーロンパース", category: "owner", price: 2000, description: "赤ちゃんとペットのおそろいに。", tags: ["キッズ", "おそろい"] },
  { id: "baby-bib", name: "スタイ（よだれかけ）", category: "owner", price: 1200, description: "ペット柄のかわいいスタイ。", tags: ["キッズ"] },
  { id: "kids-tshirt", name: "キッズTシャツ", category: "owner", price: 1300, description: "お子様用サイズのペット柄Tシャツ。", tags: ["キッズ"] },
];

// ========================================
// 全アイテム統合
// ========================================
export const ALL_ITEMS: Item[] = [
  ...FEATURED,
  ...PET,
  ...PAIR,
  ...OWNER,
  ...GIFT,
  ...HOME,
  ...PHOTO,
  ...BAG,
  ...ACCESSORIES,
  ...PHONE,
  ...TOWEL,
  ...STATIONERY,
  ...KIDS,
];

// カテゴリ定義
export const CATEGORIES: { id: ItemCategory; name: string; description: string }[] = [
  { id: "featured", name: "ここにしかない", description: "ittumoだけのユニークアイテム" },
  { id: "pet", name: "ペット用品", description: "犬服・お散歩・防災・迷子札など" },
  { id: "pair", name: "ペア・おそろい", description: "飼い主とペットでおそろい" },
  { id: "owner", name: "ウェア", description: "Tシャツ・パーカー・キッズ" },
  { id: "gift", name: "ギフト", description: "スチール缶・キャンドル・メモリアル" },
  { id: "home", name: "ホーム・キッチン", description: "マグ・タンブラー・インテリア" },
  { id: "photo", name: "フォトグッズ", description: "ポスター・カレンダー・フォトブック" },
  { id: "bag", name: "バッグ・ポーチ", description: "トート・サコッシュ・巾着" },
  { id: "accessories", name: "アクセサリー", description: "スマホケース・キーホルダー・推し活" },
  { id: "stationery", name: "文房具", description: "クリアファイル・ステッカー" },
];

export const TOTAL_ITEM_COUNT = ALL_ITEMS.length;
