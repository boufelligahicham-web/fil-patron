import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return { title: getDictionary(locale).notFound.title }
}

export default async function NotFound() {
  const locale = await getLocale()
  const t = getDictionary(locale).notFound

  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-4 px-4 py-16">
      <p className="font-serif text-5xl font-semibold text-primary" aria-hidden="true">
        404
      </p>
      <h1 className="text-3xl font-semibold">{t.title}</h1>
      <p className="leading-relaxed text-muted-foreground">{t.text}</p>
      <Link href="/" className="font-medium text-primary underline underline-offset-4">
        {t.back}
      </Link>
    </div>
  )
}
