import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { MeasurementCalculator } from '@/components/measurement-calculator'
import { getUserContext } from '@/lib/data'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const meta = getDictionary(locale).meta.pages.calculateur
  return { title: meta.title, description: meta.description }
}

export default async function CalculateurPage() {
  const [{ user, measurements, measurementsUpdatedAt }, locale] = await Promise.all([
    getUserContext(),
    getLocale(),
  ])
  const t = getDictionary(locale)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
      <PageHeader eyebrow={t.pages.calculateur.eyebrow} title={t.pages.calculateur.title}>
        {t.pages.calculateur.intro}
      </PageHeader>
      <MeasurementCalculator
        initial={measurements}
        isAuthed={Boolean(user)}
        updatedAt={measurementsUpdatedAt}
      />
    </div>
  )
}
