import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function SiteFooter() {
  const locale = await getLocale()
  const t = getDictionary(locale)

  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{t.footer.tagline}</p>
        <nav aria-label={t.a11y.footerNav}>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/cours/mesures" className="underline-offset-4 hover:underline">
                {t.footer.mesures}
              </Link>
            </li>
            <li>
              <Link href="/patrons" className="underline-offset-4 hover:underline">
                {t.footer.patrons}
              </Link>
            </li>
            <li>
              <Link href="/calculateur" className="underline-offset-4 hover:underline">
                {t.footer.calculateur}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
