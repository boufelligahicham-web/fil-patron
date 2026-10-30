import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { BrandMark } from './brand-logo'

export async function SiteFooter() {
  const locale = await getLocale()
  const t = getDictionary(locale)

  const links = [
    { href: '/cours/mesures', label: t.footer.mesures },
    { href: '/cours/glossaire', label: t.nav.glossaire },
    { href: '/cours/emmanchure', label: t.footer.emmanchure, featured: true },
    { href: '/patrons', label: t.footer.patrons },
    { href: '/calculateur', label: t.footer.calculateur },
  ]

  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-4 pb-6 sm:px-6">
      <div className="glass rounded-2xl p-5 shadow-ice sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <BrandMark locale={locale} brand={t.brand} size="lg" emblemClassName="size-11" />
            <p className="max-w-md text-xs leading-6 text-ink-soft">{t.footer.tagline}</p>
          </div>
        </div>
        <nav
          aria-label={t.a11y.footerNav}
          className="mt-5 border-t border-white/[0.08] pt-4"
        >
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.featured
                      ? 'font-semibold text-primary underline-offset-4 hover:underline'
                      : 'text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
