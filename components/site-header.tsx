import Link from 'next/link'
import { getCurrentUser } from '@/lib/supabase/server'
import { signOut } from '@/app/actions'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { BrandMark } from './brand-logo'
import { LanguageSwitcher } from './language-switcher'
import { MainNav } from './main-nav'

export async function SiteHeader() {
  const [user, locale] = await Promise.all([getCurrentUser(), getLocale()])
  const t = getDictionary(locale)
  const initial = user?.email?.trim().charAt(0).toUpperCase()

  return (
    <header className="glass-bar sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link href="/" aria-label={t.brand} className="flex shrink-0 items-center rounded-md">
          <BrandMark locale={locale} brand={t.brand} emblemClassName="size-9" />
        </Link>

        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          {initial ? (
            <Link
              href="/tableau-de-bord"
              aria-label={t.nav.dashboard}
              className="hidden size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-xs font-bold text-primary shadow-[0_0_12px_rgba(125,211,252,0.25)] sm:flex"
            >
              <span aria-hidden="true">{initial}</span>
            </Link>
          ) : null}
          <MainNav
            isAuthed={Boolean(user)}
            signOutSlot={
              user ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full rounded-full px-3 py-2 text-start text-sm font-medium text-ink-soft transition-colors hover:bg-primary/10 hover:text-ink lg:w-auto"
                  >
                    {t.nav.signOut}
                  </button>
                </form>
              ) : null
            }
          />
        </div>
      </div>
    </header>
  )
}
