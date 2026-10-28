import Link from 'next/link'
import { Scissors } from 'lucide-react'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function SiteFooter() {
  const locale = await getLocale()
  const t = getDictionary(locale)

  return (
    <footer className="mt-20 border-t border-tailor bg-champagne-soft/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-atelier text-primary-foreground">
              <Scissors className="size-4" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-semibold text-ink">{t.brand}</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink-soft">{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.a11y.footerNav} className="border-t border-tailor/80 pt-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <li>
              <Link href="/cours/mesures" className="text-ink-soft underline-offset-4 hover:text-atelier hover:underline">
                {t.footer.mesures}
              </Link>
            </li>
            <li>
              <Link href="/cours/glossaire" className="text-ink-soft underline-offset-4 hover:text-atelier hover:underline">
                {t.nav.glossaire}
              </Link>
            </li>
            <li>
              <Link
                href="/cours/emmanchure"
                className="font-medium text-atelier underline-offset-4 hover:underline"
              >
                {t.footer.emmanchure}
              </Link>
            </li>
            <li>
              <Link href="/patrons" className="text-ink-soft underline-offset-4 hover:text-atelier hover:underline">
                {t.footer.patrons}
              </Link>
            </li>
            <li>
              <Link href="/calculateur" className="text-ink-soft underline-offset-4 hover:text-atelier hover:underline">
                {t.footer.calculateur}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
