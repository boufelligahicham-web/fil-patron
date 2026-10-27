import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return { title: getDictionary(locale).meta.pages.authError.title }
}

export default async function AuthErreurPage() {
  const locale = await getLocale()
  const t = getDictionary(locale).pages.auth

  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-4 px-4 py-16">
      <h1 className="text-3xl font-semibold">{t.errorTitle}</h1>
      <p className="leading-relaxed text-muted-foreground">{t.errorText}</p>
      <Link href="/auth/connexion" className="font-medium text-primary underline underline-offset-4">
        {t.backToLogin}
      </Link>
    </div>
  )
}
