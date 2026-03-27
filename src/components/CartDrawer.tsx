'use client'

import { useCart } from './CartProvider'

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, cartCount, subtotal, checkout, isLoading, stockError } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* ドロワー */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">
            カート
            {cartCount > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">({cartCount}点)</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl"
          >
            ×
          </button>
        </div>

        {/* アイテム一覧 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>カートは空です</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => {
                const optionText = [item.size, item.color]
                  .filter(Boolean)
                  .join(' / ')

                return (
                  <div key={item.cartId} className="flex gap-4 py-3 border-b border-gray-100">
                    {/* 画像 */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                          🛒
                        </div>
                      )}
                    </div>

                    {/* 情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.productTitle}
                      </h3>
                      {optionText && (
                        <p className="text-xs text-gray-500 mt-0.5">{optionText}</p>
                      )}
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {/* 数量変更 */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          disabled={isLoading}
                          className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 text-xs disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-xs text-gray-600 w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 text-xs disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 削除 */}
                    <button
                      onClick={() => removeItem(item.cartId)}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-red-500 transition self-start p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* フッター */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">小計</span>
              <span className="text-lg font-bold text-gray-900">
                ¥{subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-400">送料・税金はチェックアウト時に計算されます</p>
            {stockError && (
              <p className="text-xs text-red-500 font-medium">{stockError}</p>
            )}
            <button
              onClick={checkout}
              disabled={isLoading}
              className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium text-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '処理中...' : 'お支払いへ進む'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
