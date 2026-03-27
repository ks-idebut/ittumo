import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// クライアントサイド用（公開キー）
let supabaseClient: SupabaseClient<any, any, any> | null = null
try {
  if (isValidUrl(supabaseUrl) && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, { db: { schema: 'ittumo' } })
  }
} catch (e) {
  console.error('Supabase client init error:', e)
}
export const supabase = supabaseClient as SupabaseClient

// サーバーサイド用（サービスロールキー - APIルートのみで使用）
let supabaseAdminClient: SupabaseClient<any, any, any> | null = null
try {
  if (isValidUrl(supabaseUrl) && supabaseServiceKey) {
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey, { db: { schema: 'ittumo' } })
  }
} catch (e) {
  console.error('Supabase admin init error:', e)
}
export const supabaseAdmin = supabaseAdminClient as SupabaseClient
