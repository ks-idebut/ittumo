"use client";

import { useState } from "react";

type OrderStatus =
  | "pending"
  | "designing"
  | "preview_sent"
  | "approved"
  | "paid"
  | "producing"
  | "shipped";

interface Order {
  id: string;
  createdAt: string;
  itemName: string;
  petName: string;
  status: OrderStatus;
  email: string;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: { label: "受付", className: "bg-yellow-100 text-yellow-800" },
  designing: { label: "デザイン中", className: "bg-blue-100 text-blue-800" },
  preview_sent: {
    label: "プレビュー送付済",
    className: "bg-purple-100 text-purple-800",
  },
  approved: { label: "承認済", className: "bg-green-100 text-green-800" },
  paid: { label: "入金済", className: "bg-green-200 text-green-900" },
  producing: { label: "製作中", className: "bg-orange-100 text-orange-800" },
  shipped: { label: "発送済", className: "bg-gray-100 text-gray-800" },
};

// TODO: Supabase接続後に実データ取得に切り替え
const DUMMY_ORDERS: Order[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    createdAt: "2026-03-28T14:30:00",
    itemName: "マグカップ",
    petName: "コロ",
    status: "pending",
    email: "yamada@example.com",
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    createdAt: "2026-03-28T12:15:00",
    itemName: "Tシャツ",
    petName: "モモ",
    status: "designing",
    email: "tanaka@example.com",
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    createdAt: "2026-03-27T18:00:00",
    itemName: "スマホケース",
    petName: "チョコ",
    status: "preview_sent",
    email: "suzuki@example.com",
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    createdAt: "2026-03-26T09:20:00",
    itemName: "エコバッグ",
    petName: "ポチ",
    status: "approved",
    email: "sato@example.com",
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    createdAt: "2026-03-25T16:45:00",
    itemName: "缶バッジ",
    petName: "ミケ",
    status: "shipped",
    email: "ito@example.com",
  },
];

function shortId(id: string): string {
  return id.slice(0, 8);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const filteredOrders =
    filterStatus === "all"
      ? DUMMY_ORDERS
      : DUMMY_ORDERS.filter((o) => o.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">おまかせ注文一覧</h2>
        <span className="text-sm text-gray-500">
          {filteredOrders.length}件
        </span>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "all"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          すべて
        </button>
        {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((status) => {
          const config = STATUS_CONFIG[status];
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? "bg-gray-900 text-white"
                  : `bg-white text-gray-600 border border-gray-200 hover:bg-gray-50`
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  注文ID
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  日時
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  アイテム
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  ペット名
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  ステータス
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">
                  メールアドレス
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    該当する注文がありません
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo = STATUS_CONFIG[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        {shortId(order.id)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {order.itemName}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.petName}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {order.email}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info note */}
      <p className="text-xs text-gray-400 mt-4">
        ※ 現在はダミーデータを表示しています。Supabase接続後に実データに切り替わります。
      </p>
    </div>
  );
}
