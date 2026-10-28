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

  return (
    <header className="sticky top-0 z-40 border-b border-tailor bg-linen/90 backdrop-blur supports-[backdrop-filter]:bg-linen/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          aria-label={t.brand}
          className="flex shrink-0 items-center rounded-md"
        >
          <BrandMark locale={locale} brand={t.brand} emblemClassName="size-9" />
        </Link>
        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <MainNav
            isAuthed={Boolean(user)}
            signOutSlot={
              user ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full rounded-md px-3 py-2 text-start text-sm font-medium text-ink-soft hover:bg-champagne-soft hover:text-ink lg:w-auto"
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
