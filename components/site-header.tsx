import Link from 'next/link'
import { getCurrentUser } from '@/lib/supabase/server'
import { signOut } from '@/app/actions'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import type { Theme } from '@/lib/theme'
import { BrandMark } from './brand-logo'
import { LanguageSwitcher } from './language-switcher'
import { MobileMenu, NavLinks } from './main-nav'
import { SpeechButton } from './speech/speech-button'
import { ThemeSwitcher } from './theme-switcher'

export async function SiteHeader({ theme }: { theme: Theme }) {
  const [user, locale] = await Promise.all([getCurrentUser(), getLocale()])
  const t = getDictionary(locale)
  const initial = user?.email?.trim().charAt(0).toUpperCase()

  return (
    <header className="glass-bar sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center rounded-lg">
          <BrandMark locale={locale} brand={t.brand} emblemClassName="size-9" />
        </Link>

        <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
          <NavLinks className="me-1 hidden lg:flex" />

          <SpeechButton />

          <ThemeSwitcher theme={theme} compact />

          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>

          {initial ? (
            <Link
              href="/tableau-de-bord"
              aria-label={t.nav.dashboard}
              className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary sm:flex"
            >
              <span aria-hidden="true">{initial}</span>
            </Link>
          ) : null}

          <MobileMenu
            isAuthed={Boolean(user)}
            signOutSlot={
              user ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full rounded-full px-3 py-2 text-start text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t.nav.signOut}
                  </button>
                </form>
              ) : null
            }
            extras={
              <>
                <ThemeSwitcher theme={theme} />
                <LanguageSwitcher locale={locale} />
              </>
            }
          />
        </div>
      </div>
    </header>
  )
}
