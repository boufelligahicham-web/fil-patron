import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { hasSupabaseEnv, supabaseEnv } from './env'

const PROTECTED_PREFIXES = ['/tableau-de-bord']

export async function updateSession(request: NextRequest) {
  // Sans Supabase configuré, on laisse passer : le site fonctionne en mode invité.
  if (!hasSupabaseEnv()) {
    return NextResponse.next({ request })
  }

  const { url, key } = supabaseEnv()
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(url, key, {
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // Must run directly after client creation to keep sessions in sync.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtected = PROTECTED_PREFIXES.some((p) => request.nextUrl.pathname.startsWith(p))
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/connexion'
    url.searchParams.set('suite', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
