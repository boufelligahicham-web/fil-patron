import type { Metadata } from 'next'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export const metadata: Metadata = { title: 'Vérifiez votre e-mail' }

export default async function InscriptionReussiePage() {
  const locale = await getLocale()
  const t = getDictionary(locale).pages.auth

  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-4 px-4 py-16">
      <MailCheck className="size-10 text-primary" aria-hidden="true" />
      <h1 className="text-3xl font-semibold">{t.successTitle}</h1>
      <p className="leading-relaxed text-muted-foreground">{t.successText}</p>
      <Link href="/auth/connexion" className="font-medium text-primary underline underline-offset-4">
        {t.goToLogin}
      </Link>
    </div>
  )
}
