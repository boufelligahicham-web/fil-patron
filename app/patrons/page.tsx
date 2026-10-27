import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { PatternDiagram } from '@/components/pattern-diagram'
import { DEFAULT_MEASUREMENTS } from '@/lib/content/measurements'
import { getUserContext } from '@/lib/data'
import { getDictionary, patternText } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { PATTERNS, stepSlug } from '@/lib/patterns'
import { patternDescription, patternPieces } from '@/lib/patterns/localized'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const meta = getDictionary(locale).meta.pages.patrons
  return { title: meta.title, description: meta.description }
}

export default async function PatronsPage() {
  const [{ user, completed }, locale] = await Promise.all([getUserContext(), getLocale()])
  const t = getDictionary(locale)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
      <PageHeader eyebrow={t.pages.patrons.eyebrow} title={t.pages.patrons.title}>
        {t.pages.patrons.intro}
      </PageHeader>
      <ul className="grid gap-6 md:grid-cols-2">
        {PATTERNS.map((p) => {
          const result = p.compute(DEFAULT_MEASUREMENTS)
          const label = patternText(t, p.slug)
          const pieces = patternPieces(locale, p, result.pieces)
          const done = p.steps.filter((_, i) => completed.has(stepSlug(p.slug, i))).length
          return (
            <li key={p.slug} className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
              <PatternDiagram
                pieces={pieces}
                title={t.pages.patrons.previewTitle(label.name)}
                description={t.pages.patrons.previewDescription(
                  pieces.map((x) => x.name).join(locale === 'ar' ? '، ' : ', '),
                )}
                labels={t.ui.diagram}
                locale={locale}
              />
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">{label.name}</h2>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {t.levels[p.level]}
                </span>
              </div>
              <p className="leading-relaxed text-muted-foreground">{patternDescription(locale, p)}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  {user
                    ? t.pages.patrons.doneSteps(done, p.steps.length)
                    : t.pages.patrons.stepsTotal(p.steps.length)}
                </p>
                <Link
                  href={`/patrons/${p.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {t.pages.patrons.open}
                  <span className="sr-only">{` ${label.name}`}</span>
                  <ArrowRight className="dir-icon size-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
