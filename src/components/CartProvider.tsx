'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useAuth } from './AuthProvider'

// ローカルカートアイテム型（Stripe対応）
export type CartItem = {
  cartId: string           // ユニークキー（itemId + size + color）
  itemId: string
  productTitle: string
  size: string | null
  color: string | null
  price: number            // 販売価格（円）
  quantity: number
  imageUrl: string | null
  creatorId?: string
  designId?: string
  variantId?: string       // item_variants.id
}

type CartContextType = {
  items: CartItem[]
  cartCount: number
  subtotal: number
  isCartOpen: boolean
  isLoading: boolean
  stockError: string | null
  openCart: () => void
  closeCart: () => void
  addToCart: (item: Omit<CartItem, 'quantity' | 'cartId'>, quantity?: number) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  checkout: () => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const CART_KEY = 'ittumo_cart'

function generateCartId(item: { itemId: string; size: string | null; color: string | null }): string {
  return `${item.itemId}_${item.size || 'none'}_${item.color || 'none'}`
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, customer } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stockError, setStockError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      saveCart(items)
    }
  }, [items, mounted])

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addToCart = useCallback(async (newItem: Omit<CartItem, 'quantity' | 'cartId'>, quantity = 1) => {
    setStockError(null)
    const cartId = generateCartId(newItem)

    // variantIdがある場合は在庫チェック
    if (newItem.variantId) {
      // 既存カート内の同じアイテムの数量を加算して確認
      const existing = items.find(item => item.cartId === cartId)
      const totalQuantity = (existing?.quantity || 0) + quantity
      try {
        const res = await fetch('/api/stock-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variant_id: newItem.variantId, quantity: totalQuantity }),
        })
        const data = await res.json()
        if (!data.ok) {
          setStockError(data.error)
          setIsCartOpen(true)
          return
        }
      } catch {
        // ネットワークエラー時は通す（決済時に再チェック）
      }
    }

    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartId === cartId)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }
      return [...prev, { ...newItem, cartId, quantity }]
    })
    setIsCartOpen(true)
  }, [items])

  const removeItem = useCallback((cartId: string) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId))
  }, [])

  const updateQuantity = useCallback(async (cartId: string, quantity: number) => {
    setStockError(null)
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.cartId !== cartId))
      return
    }

    // variantIdがある場合は在庫チェック
    const targetItem = items.find(item => item.cartId === cartId)
    if (targetItem?.variantId && quantity > (targetItem?.quantity || 0)) {
      try {
        const res = await fetch('/api/stock-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variant_id: targetItem.variantId, quantity }),
        })
        const data = await res.json()
        if (!data.ok) {
          setStockError(data.error)
          return
        }
      } catch {
        // ネットワークエラー時は通す
      }
    }

    setItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    )
  }, [items])

  const checkout = useCallback(async () => {
    if (items.length === 0) return

    // ログインユーザーは住所確認ページへ
    if (customer?.id) {
      setIsCartOpen(false)
      window.location.href = '/checkout/address'
      return
    }

    // 未ログインは従来通りStripe直行
    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            item_id: item.itemId,
            name: item.productTitle,
            image_url: item.imageUrl,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            variant_id: item.variantId,
          })),
          ...(user?.email ? { customer_email: user.email } : {}),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || '決済の開始に失敗しました')
      }
    } catch {
      alert('ネットワークエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }, [items, user, customer])

  const clearCart = useCallback(() => {
    setItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_KEY)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        isCartOpen,
        isLoading,
        stockError,
        openCart,
        closeCart,
        addToCart,
        removeItem,
        updateQuantity,
        checkout,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    // Return no-op defaults when outside CartProvider (e.g. SSR)
    return {
      items: [],
      cartCount: 0,
      subtotal: 0,
      isCartOpen: false,
      isLoading: false,
      stockError: null,
      openCart: () => {},
      closeCart: () => {},
      addToCart: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      checkout: async () => {},
      clearCart: () => {},
    } as CartContextType
  }
  return context
}
