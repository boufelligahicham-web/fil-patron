'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { useTranslations } from '@/components/locale-provider'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'

function describeError(
  t: Dictionary['pages']['auth']['errors'],
  code: string | undefined,
  status: number | undefined,
  mode: 'login' | 'signup',
) {
  if (code === 'email_not_confirmed') return t.emailNotConfirmed
  if (code === 'weak_password') return t.weakPassword
  if (status === 429 || code?.includes('rate_limit')) return t.rateLimit
  if (code === 'email_address_invalid') return t.invalidEmail
  if (mode === 'login' && (code === 'invalid_credentials' || status === 400)) return t.invalidCredentials
  return t.generic
}

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const t = useTranslations().pages.auth
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (mode === 'signup') {
      if (password.length < 8) return setError(t.errors.passwordShort)
      if (password !== confirm) return setError(t.errors.passwordMismatch)
    }
    setLoading(true)
    try {
      const supabase = createClient()
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/tableau-de-bord')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        router.push('/auth/inscription-reussie')
      }
    } catch (err) {
      const e = err as { code?: string; status?: number }
      setError(describeError(t.errors, e.code, e.status, mode))
    } finally {
      setLoading(false)
    }
  }

  const isLogin = mode === 'login'

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{isLogin ? t.loginTitle : t.signupTitle}</h1>
        <p className="text-muted-foreground">{isLogin ? t.loginIntro : t.signupIntro}</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border bg-card p-6" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg border border-input bg-background px-3 text-base"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            {t.password}
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={isLogin ? undefined : 'pw-hint'}
            className="h-11 rounded-lg border border-input bg-background px-3 text-base"
          />
          {!isLogin && (
            <p id="pw-hint" className="text-xs text-muted-foreground">
              {t.passwordHint}
            </p>
          )}
        </div>
        {!isLogin && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-sm font-medium">
              {t.confirmPassword}
            </label>
            <input
              id="confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 text-base"
            />
          </div>
        )}
        <div role="alert" aria-live="assertive" className="text-sm text-destructive empty:hidden">
          {error}
        </div>
        <Button type="submit" size="lg" className="h-11" disabled={loading}>
          {loading ? t.pending : isLogin ? t.submitLogin : t.submitSignup}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? t.noAccount : t.hasAccount}
        <Link
          href={isLogin ? '/auth/inscription' : '/auth/connexion'}
          className="font-medium text-primary underline underline-offset-4"
        >
          {isLogin ? t.submitSignup : t.submitLogin}
        </Link>
      </p>
    </div>
  )
}
