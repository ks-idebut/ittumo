import Link from "next/link";

const STATS = [
  { label: "おまかせ注文", value: 24, href: "/admin/orders" },
  { label: "シミュレーター注文", value: 8, href: "/admin/simulator-orders" },
  { label: "本日の注文", value: 3, href: "/admin/orders" },
];

const RECENT_ORDERS = [
  {
    id: "OMK-20260328-001",
    date: "2026-03-28 14:30",
    item: "マグカップ",
    petName: "コロ",
    status: "pending",
    email: "yamada@example.com",
  },
  {
    id: "OMK-20260328-002",
    date: "2026-03-28 12:15",
    item: "Tシャツ",
    petName: "モモ",
    status: "designing",
    email: "tanaka@example.com",
  },
  {
    id: "OMK-20260327-003",
    date: "2026-03-27 18:00",
    item: "スマホケース",
    petName: "チョコ",
    status: "preview_sent",
    email: "suzuki@example.com",
  },
  {
    id: "SIM-20260327-001",
    date: "2026-03-27 10:45",
    item: "エコバッグ",
    petName: "ポチ",
    status: "approved",
    email: "sato@example.com",
  },
  {
    id: "OMK-20260326-004",
    date: "2026-03-26 09:20",
    item: "缶バッジ",
    petName: "ミケ",
    status: "shipped",
    email: "ito@example.com",
  },
];

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "受付", className: "bg-yellow-100 text-yellow-800" },
  designing: { label: "デザイン中", className: "bg-blue-100 text-blue-800" },
  preview_sent: { label: "プレビュー送付済", className: "bg-purple-100 text-purple-800" },
  approved: { label: "承認済", className: "bg-green-100 text-green-800" },
  paid: { label: "入金済", className: "bg-green-200 text-green-900" },
  producing: { label: "製作中", className: "bg-orange-100 text-orange-800" },
  shipped: { label: "発送済", className: "bg-gray-100 text-gray-800" },
};

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">最近の注文</h3>
          <Link
            href="/admin/orders"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            すべて見る →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">注文ID</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">日時</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">アイテム</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">ペット名</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => {
                const statusInfo = STATUS_LABELS[order.status] || {
                  label: order.status,
                  className: "bg-gray-100 text-gray-800",
                };
                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{order.date}</td>
                    <td className="px-6 py-3 text-gray-900">{order.item}</td>
                    <td className="px-6 py-3 text-gray-900">{order.petName}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
