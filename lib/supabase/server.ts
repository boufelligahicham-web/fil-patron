import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { hasSupabaseEnv, supabaseEnv } from './env'

export async function createClient() {
  const cookieStore = await cookies()
  const { url, key } = supabaseEnv()

  return createServerClient(url, key, {
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Called from a Server Component: the proxy refreshes sessions instead.
        }
      },
    },
  })
}

/**
 * Renvoie l'utilisateur connecté, ou `null` si Supabase n'est pas encore
 * configuré (le site reste alors consultable en mode invité).
 */
export async function getCurrentUser() {
  if (!hasSupabaseEnv()) return null

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('getCurrentUser error:', error)
    return null
  }
}
