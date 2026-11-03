'use client'

import { useEffect, useState } from 'react'
import { Leaf, Snowflake } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { THEMES, type Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const ONE_YEAR = 60 * 60 * 24 * 365

const ICONS: Record<Theme, typeof Leaf> = {
  atelier: Leaf,
  glacier: Snowflake,
}

/**
 * Bascule « Atelier » (beige & rose) / « Glacier » (nuit polaire).
 *
 * Le curseur glisse d'un segment à l'autre, ce qui rend l'état actif lisible
 * d'un coup d'œil. Le cookie `theme` est lu par le serveur au prochain
 * chargement : aucune page ne clignote, y compris en navigation directe.
 */
export function ThemeSwitcher({ theme, compact = false }: { theme: Theme; compact?: boolean }) {
  const t = useTranslations()
  const [current, setCurrent] = useState<Theme>(theme)

  useEffect(() => {
    setCurrent(theme)
  }, [theme])

  function choose(next: Theme) {
    if (next === current) return
    setCurrent(next)

    const dark = next === 'glacier'
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.cookie = `theme=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', dark ? '#0a0e1a' : '#faf6f0')
  }

  return (
    <div
      role="group"
      aria-label={t.theme.label}
      className="relative grid shrink-0 grid-cols-2 items-center rounded-full border border-border/80 bg-card/70 p-0.5 shadow-sm"
    >
      <span
        aria-hidden="true"
        style={{ insetInlineStart: current === 'atelier' ? '2px' : '50%' }}
        className="pointer-events-none absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-primary shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none"
      />
      {THEMES.map((value) => {
        const active = value === current
        const Icon = ICONS[value]
        const label = value === 'atelier' ? t.theme.atelier : t.theme.glacier
        return (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            aria-pressed={active}
            title={label}
            aria-label={label}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1 rounded-full text-[11px] font-semibold transition-colors',
              compact ? 'size-8' : 'px-2.5 py-1',
              active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span className={compact ? 'sr-only' : 'hidden sm:inline'}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
