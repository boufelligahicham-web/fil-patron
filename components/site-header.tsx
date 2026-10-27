import Link from 'next/link'
import { Scissors } from 'lucide-react'
import { getCurrentUser } from '@/lib/supabase/server'
import { signOut } from '@/app/actions'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { LanguageSwitcher } from './language-switcher'
import { MainNav } from './main-nav'

export async function SiteHeader() {
  const [user, locale] = await Promise.all([getCurrentUser(), getLocale()])
  const t = getDictionary(locale)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md font-serif text-base font-semibold sm:text-lg"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scissors className="size-4" aria-hidden="true" />
          </span>
          {t.brand}
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
                    className="w-full rounded-md px-3 py-2 text-start text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground lg:w-auto"
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
