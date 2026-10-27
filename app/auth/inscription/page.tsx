import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return { title: getDictionary(locale).meta.pages.signup.title }
}

export default function InscriptionPage() {
  return <AuthForm mode="signup" />
}
