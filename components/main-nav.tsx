'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/cours/mesures', key: 'mesures' },
  { href: '/tailles', key: 'tailles' },
  { href: '/cours/glossaire', key: 'glossaire' },
  { href: '/cours/emmanchure', key: 'emmanchure' },
  { href: '/patrons', key: 'patrons' },
  { href: '/calculateur', key: 'calculateur' },
] as const

function linkClass(pathname: string, href: string, active: string) {
  return cn(
    'rounded-full px-2 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm',
    pathname.startsWith(href)
      ? `${active} bg-primary text-primary-foreground shadow-sm`
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )
}

/** Liens de navigation, en ligne sur grand écran. */
export function NavLinks({ className }: { className?: string }) {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <ul className={cn('items-center gap-0.5 xl:gap-1', className)}>
      {LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(linkClass(pathname, link.href, 'glow'), 'block whitespace-nowrap')}
            aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
          >
            {t.nav[link.key]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * Tiroir mobile : les cinq entrées du parcours, l'accès au compte, puis les
 * réglages (ambiance et langue) qui n'ont pas leur place dans la barre étroite.
 */
export function MobileMenu({
  isAuthed,
  signOutSlot,
  extras,
}: {
  isAuthed: boolean
  signOutSlot: ReactNode
  extras?: ReactNode
}) {
  const t = useTranslations()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? t.a11y.closeMenu : t.a11y.openMenu}</span>
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="glass absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-x-0 border-t-0 p-4 shadow-lift lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(linkClass(pathname, link.href, 'glow'), 'block')}
                aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
              >
                {t.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-col gap-1 border-t border-border/80 pt-2">
          {isAuthed ? (
            <>
              <Link
                href="/tableau-de-bord"
                className={cn(linkClass(pathname, '/tableau-de-bord', 'glow'), 'block')}
                aria-current={pathname.startsWith('/tableau-de-bord') ? 'page' : undefined}
              >
                {t.nav.dashboard}
              </Link>
              {signOutSlot}
            </>
          ) : (
            <>
              <Link href="/auth/connexion" className={cn(linkClass(pathname, '/auth/connexion', 'glow'), 'block')}>
                {t.nav.signIn}
              </Link>
              <Link
                href="/auth/inscription"
                className="glow mt-1 block rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {t.nav.signUp}
              </Link>
            </>
          )}
        </div>

        {extras ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-3">
            {extras}
          </div>
        ) : null}
      </div>
    </>
  )
}
