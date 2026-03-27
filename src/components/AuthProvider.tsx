'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type Customer = {
  id: string
  auth_user_id: string
  email: string
  display_name: string | null
}

type AuthContextType = {
  user: User | null
  customer: Customer | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string) => Promise<{ error?: string; success?: boolean }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCustomer = useCallback(async (authUserId: string, email: string) => {
    try {
      // API経由で取得（RLS回避 + 初回自動作成）
      const res = await fetch('/api/auth/ensure-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth_user_id: authUserId, email }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.customer_id) {
          setCustomer({ id: data.customer_id, auth_user_id: authUserId, email, display_name: null })
        }
      }
    } catch {
      // エラーでもクラッシュさせない
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    // 初期セッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchCustomer(currentUser.id, currentUser.email || '')
      }
      setIsLoading(false)
    })

    // セッション変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchCustomer(currentUser.id, currentUser.email || '')
      } else {
        setCustomer(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchCustomer])

  const login = useCallback(async (email: string) => {
    if (!supabase) return { error: '接続エラー' }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) return { error: 'メールの送信に失敗しました' }
    return { success: true }
  }, [])

  const logout = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setCustomer(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      user: null,
      customer: null,
      isLoggedIn: false,
      isLoading: false,
      login: async () => ({ error: 'AuthProvider not found' }),
      logout: async () => {},
    } as AuthContextType
  }
  return context
}
