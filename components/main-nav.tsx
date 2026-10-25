'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/cours/mesures', key: 'mesures' },
  { href: '/cours/glossaire', key: 'glossaire' },
  { href: '/patrons', key: 'patrons' },
  { href: '/calculateur', key: 'calculateur' },
] as const

export function MainNav({ isAuthed, signOutSlot }: { isAuthed: boolean; signOutSlot: ReactNode }) {
  const t = useTranslations()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const linkClass = (href: string) =>
    cn(
      'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground',
      pathname.startsWith(href) ? 'bg-muted text-foreground' : 'text-muted-foreground',
    )

  const items = (
    <>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={cn(linkClass(l.href), 'block')}
              aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
            >
              {t.nav[l.key]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1 border-t pt-2 lg:flex-row lg:items-center lg:border-t-0 lg:border-s lg:pt-0 lg:ps-3">
        {isAuthed ? (
          <>
            <Link
              href="/tableau-de-bord"
              className={cn(linkClass('/tableau-de-bord'), 'block')}
              aria-current={pathname.startsWith('/tableau-de-bord') ? 'page' : undefined}
            >
              {t.nav.dashboard}
            </Link>
            {signOutSlot}
          </>
        ) : (
          <>
            <Link href="/auth/connexion" className={cn(linkClass('/auth/connexion'), 'block')}>
              {t.nav.signIn}
            </Link>
            <Link
              href="/auth/inscription"
              className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t.nav.signUp}
            </Link>
          </>
        )}
      </div>
    </>
  )

  return (
    <nav aria-label={t.a11y.mainNav}>
      <div className="hidden items-center gap-2 lg:flex">{items}</div>
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-md hover:bg-muted lg:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? t.a11y.closeMenu : t.a11y.openMenu}</span>
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b bg-background p-4 shadow-sm lg:hidden"
      >
        <div className="flex flex-col gap-2">{items}</div>
      </div>
    </nav>
  )
}
