import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileDock } from '@/components/mobile-dock'
import { LocaleProvider } from '@/components/locale-provider'
import { dirFor, getDictionary, htmlLang } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = getDictionary(locale)

  return {
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0e1a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const t = getDictionary(locale)

  return (
    <html
      lang={htmlLang(locale)}
      dir={dirFor(locale)}
      className={`dark ${inter.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-svh flex-col pb-16 antialiased sm:pb-0">
        <LocaleProvider locale={locale}>
          <a
            href="#contenu"
            className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
          >
            {t.a11y.skip}
          </a>
          <SiteHeader />
          <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileDock />
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
