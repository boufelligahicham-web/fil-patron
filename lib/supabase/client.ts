import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { hasSupabaseEnv, supabaseEnv } from './env'

let client: SupabaseClient | undefined

export function createClient() {
  if (!hasSupabaseEnv()) {
    throw new Error(
      'Supabase n’est pas configuré : la création de compte et la connexion sont désactivées.',
    )
  }

  if (!client) {
    const { url, key } = supabaseEnv()
    client = createBrowserClient(url, key, {
      cookieOptions: { secure: process.env.NODE_ENV === 'production' },
    })
  }
  return client
}
