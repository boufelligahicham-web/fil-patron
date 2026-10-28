'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Calculator, GraduationCap, Ruler, Scissors } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/cours/mesures', key: 'mesures', icon: Ruler },
  { href: '/cours/glossaire', key: 'glossaire', icon: BookOpen },
  { href: '/cours/emmanchure', key: 'emmanchure', icon: GraduationCap },
  { href: '/patrons', key: 'patrons', icon: Scissors },
  { href: '/calculateur', key: 'calculateur', icon: Calculator },
] as const

/** Dock mobile du carnet d'atelier (le design de référence). */
export function MobileDock() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <nav
      aria-label={t.a11y.mainNav}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-tailor bg-linen/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_25px_rgba(42,48,45,0.06)] backdrop-blur-md sm:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {ITEMS.map(({ href, key, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors',
                  active ? 'text-atelier' : 'text-ink-soft hover:text-atelier',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full transition-colors',
                    active ? 'bg-atelier-soft text-atelier' : 'text-ink-soft',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="tracking-tight">{t.nav[key]}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
