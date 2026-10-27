import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { GlossaryExplorer } from '@/components/glossary-explorer'
import { LessonComplete } from '@/components/lesson-complete'
import { getUserContext } from '@/lib/data'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const meta = getDictionary(locale).meta.pages.glossaire
  return { title: meta.title, description: meta.description }
}

export default async function GlossairePage() {
  const [{ user, completed }, locale] = await Promise.all([getUserContext(), getLocale()])
  const t = getDictionary(locale)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12 sm:px-6">
      <PageHeader eyebrow={t.pages.glossaire.eyebrow} title={t.pages.glossaire.title}>
        {t.pages.glossaire.intro}
      </PageHeader>
      <GlossaryExplorer />
      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{t.pages.glossaire.doneTitle}</h2>
        <LessonComplete slug="cours/glossaire" initialDone={completed.has('cours/glossaire')} isAuthed={Boolean(user)} />
      </section>
    </div>
  )
}
