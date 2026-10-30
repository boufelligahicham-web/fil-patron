'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, LayoutDashboard, Ruler, Scissors, User } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/tableau-de-bord', key: 'atelier', icon: LayoutDashboard },
  { href: '/cours/mesures', key: 'mesures', icon: Ruler },
  { href: '/patrons', key: 'patrons', icon: Scissors },
  { href: '/calculateur', key: 'calculateur', icon: Calculator },
  { href: '/auth/connexion', key: 'profil', icon: User },
] as const

/** Dock mobile « Glacier » : verre dépoli, cinq entrées, point de givre actif. */
export function MobileDock() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <nav
      aria-label={t.a11y.mainNav}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-card/80 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {ITEMS.map(({ href, key, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] transition-colors',
                  active ? 'font-semibold text-primary' : 'font-medium text-ink-soft hover:text-ink',
                )}
              >
                <Icon
                  className={cn('size-[18px]', active && 'drop-shadow-[0_0_6px_rgba(125,211,252,0.7)]')}
                  aria-hidden="true"
                />
                <span className="tracking-tight">{t.nav[key]}</span>
                {active ? (
                  <span
                    className="absolute -bottom-0.5 size-1 rounded-full bg-primary shadow-[0_0_6px_#7dd3fc]"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
