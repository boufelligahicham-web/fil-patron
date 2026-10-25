'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { LOCALE_COOKIE, LOCALES, dirFor, type Locale } from '@/lib/i18n'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const ONE_YEAR = 60 * 60 * 24 * 365

/**
 * Bascule FR / AR toujours visible dans l'en-tête.
 * - écrit le cookie `lang` (lu par le serveur),
 * - applique immédiatement `lang` et `dir` sur <html> pour un rendu instantané,
 * - rafraîchit les composants serveur pour traduire le contenu.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const t = useTranslations()
  const router = useRouter()
  const [current, setCurrent] = useState<Locale>(locale)
  const [pending, startTransition] = useTransition()

  // Le cookie fait foi ; on resynchronise après chaque rendu serveur.
  useEffect(() => {
    setCurrent(locale)
  }, [locale])

  function choose(next: Locale) {
    if (next === current) return
    setCurrent(next)
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    document.documentElement.lang = next
    document.documentElement.dir = dirFor(next)
    startTransition(() => router.refresh())
  }

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={cn(
        'flex shrink-0 items-center gap-0.5 rounded-full border border-primary/25 bg-primary/5 p-1 shadow-sm transition-opacity',
        pending && 'opacity-70',
      )}
    >
      <Languages className="ms-1.5 me-0.5 size-4 text-primary" aria-hidden="true" />
      {LOCALES.map((value) => {
        const active = value === current
        const short = value === 'fr' ? t.language.frShort : t.language.arShort
        const name = value === 'fr' ? t.language.fr : t.language.ar
        return (
          <button
            key={value}
            type="button"
            lang={value}
            onClick={() => choose(value)}
            aria-pressed={active}
            title={name}
            className={cn(
              'min-w-8 rounded-full px-2 py-1 text-xs leading-5 font-bold tracking-wide transition-colors',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-primary hover:bg-primary/10',
            )}
          >
            <span aria-hidden="true">{short}</span>
            <span className="sr-only">{name}</span>
          </button>
        )
      })}
    </div>
  )
}
