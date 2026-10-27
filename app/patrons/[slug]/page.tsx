import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calculator, Info } from 'lucide-react'
import { PatternDiagram } from '@/components/pattern-diagram'
import { StepChecklist } from '@/components/step-checklist'
import { ValuesTable } from '@/components/values-table'
import { getUserContext } from '@/lib/data'
import { getDictionary, patternText } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { getPattern, PATTERNS, stepSlug } from '@/lib/patterns'
import {
  cmUnit,
  formatLength,
  formatNumber,
  patternDescription,
  patternFabrics,
  patternPieces,
  patternSteps,
  patternValues,
} from '@/lib/patterns/localized'
import { valuesToRecord } from '@/lib/patterns/types'

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()])
  const pattern = getPattern(slug)
  if (!pattern) return {}
  const t = getDictionary(locale)
  return { title: patternText(t, slug).name, description: patternDescription(locale, pattern) }
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pattern = getPattern(slug)
  if (!pattern) notFound()

  const [{ user, completed, measurements, hasSavedMeasurements }, locale] = await Promise.all([
    getUserContext(),
    getLocale(),
  ])
  const t = getDictionary(locale)
  const p = t.pages.pattern
  const label = patternText(t, pattern.slug)

  const result = pattern.compute(measurements)
  const v = valuesToRecord(result.values)
  const values = patternValues(locale, pattern, result.values)
  const pieces = patternPieces(locale, pattern, result.pieces)
  const steps = patternSteps(locale, pattern).map((s, i) => ({
    slug: stepSlug(pattern.slug, i),
    title: s.title,
    body: s.body(v),
    tip: s.tip,
  }))

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
      <nav aria-label={t.a11y.breadcrumb}>
        <Link
          href="/patrons"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="dir-icon size-4" aria-hidden="true" />
          {p.breadcrumb}
        </Link>
      </nav>

      <header className="flex flex-col gap-4 border-b pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {t.levels[pattern.level]}
          </span>
          <span className="text-sm text-muted-foreground">{patternFabrics(locale, pattern)}</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{label.name}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {patternDescription(locale, pattern)}
        </p>
      </header>

      <div
        className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
        role="note"
      >
        <p className="flex gap-3 text-sm leading-relaxed">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <span>{hasSavedMeasurements ? p.savedMeasurements : p.sampleMeasurements}</span>
        </p>
        <Link
          href="/calculateur"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-muted"
        >
          <Calculator className="size-4" aria-hidden="true" />
          {hasSavedMeasurements ? p.editMeasures : p.enterMeasures}
        </Link>
      </div>

      <section aria-labelledby="schema" className="flex flex-col gap-4">
        <h2 id="schema" className="text-2xl font-semibold">
          {p.schema}
        </h2>
        <PatternDiagram
          pieces={pieces}
          title={p.schemaTitle(label.name)}
          description={p.schemaDescription(
            pieces
              .map(
                (piece) =>
                  `${piece.name} (${piece.cut}${locale === 'ar' ? '،' : ','} ${formatNumber(
                    piece.bbox.w,
                    locale,
                  )} × ${formatNumber(piece.bbox.h, locale)} ${cmUnit(locale)})`,
              )
              .join(locale === 'ar' ? ' ؛ ' : ' ; '),
          )}
          labels={t.ui.diagram}
          locale={locale}
        />
      </section>

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="etapes" className="flex flex-col gap-4">
          <h2 id="etapes" className="text-2xl font-semibold">
            {p.steps}
          </h2>
          <StepChecklist
            steps={steps}
            initialCompleted={steps.filter((s) => completed.has(s.slug)).map((s) => s.slug)}
            isAuthed={Boolean(user)}
          />
        </section>

        <aside aria-labelledby="valeurs" className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex flex-col gap-3">
            <h2 id="valeurs" className="text-xl font-semibold">
              {p.values}
            </h2>
            <ValuesTable
              values={values}
              caption={p.valuesCaption(label.name)}
              headings={t.ui.valuesTable}
              locale={locale}
            />
            <p className="text-sm text-muted-foreground">
              {p.fabric(formatNumber(result.fabricCm / 100, locale))}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4">
            <h3 className="font-semibold">{p.usedMeasurements}</h3>
            <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
              {pattern.requiredMeasurements.map((k) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground">{t.measurements[k]}</dt>
                  <dd className="text-end font-medium tabular-nums" dir="ltr">
                    {formatLength(measurements[k], locale)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
