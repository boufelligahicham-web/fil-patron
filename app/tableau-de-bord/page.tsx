import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, Circle } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { getUserContext } from '@/lib/data'
import { getDictionary, patternText } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { COURSE_LESSONS, PATTERNS, stepSlug } from '@/lib/patterns'

export const metadata: Metadata = { title: 'Ma progression' }

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="h-full rounded-full bg-primary" style={{ width: `${max ? (value / max) * 100 : 0}%` }} />
    </div>
  )
}

export default async function DashboardPage() {
  const [{ user, completed, hasSavedMeasurements }, locale] = await Promise.all([
    getUserContext(),
    getLocale(),
  ])
  if (!user) redirect('/auth/connexion')

  const t = getDictionary(locale)
  const d = t.pages.dashboard
  const lessonTitle = (slug: string) =>
    slug === 'cours/glossaire' ? t.pages.glossaire.title : t.pages.mesures.title

  const total = COURSE_LESSONS.length + PATTERNS.reduce((n, p) => n + p.steps.length, 0)
  const done = [...completed].length
  const next =
    COURSE_LESSONS.find((l) => !completed.has(l.slug)) ??
    PATTERNS.map((p) => {
      const i = p.steps.findIndex((_, idx) => !completed.has(stepSlug(p.slug, idx)))
      return i >= 0
        ? {
            title: `${patternText(t, p.slug).name} — ${p.steps[i].title}`,
            href: `/patrons/${p.slug}`,
          }
        : null
    }).find(Boolean)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12 sm:px-6">
      <PageHeader eyebrow={d.eyebrow} title={d.title}>
        {d.intro}
      </PageHeader>

      <section aria-labelledby="global" className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="global" className="text-xl font-semibold">
            {d.global}
          </h2>
          <p className="font-serif text-3xl font-semibold tabular-nums">{`${Math.round((done / total) * 100)} %`}</p>
        </div>
        <Bar value={done} max={total} label={d.globalLabel} />
        <p className="text-sm text-muted-foreground">{d.doneOf(done, total)}</p>
        {next ? (
          <p className="text-sm">
            {d.next}
            <Link href={next.href} className="font-medium text-primary underline underline-offset-4">
              {next.title}
            </Link>
          </p>
        ) : (
          <p className="text-sm font-medium text-primary">{d.allDone}</p>
        )}
        {!hasSavedMeasurements && (
          <p className="rounded-lg bg-accent p-3 text-sm text-accent-foreground">
            {d.noMeasures}
            <Link href="/calculateur" className="font-medium underline underline-offset-4">
              {d.openCalculator}
            </Link>
          </p>
        )}
      </section>

      <section aria-labelledby="cours" className="flex flex-col gap-4">
        <h2 id="cours" className="text-2xl font-semibold">
          {d.courses}
        </h2>
        <ul className="flex flex-col gap-2">
          {COURSE_LESSONS.map((l) => {
            const isDone = completed.has(l.slug)
            return (
              <li key={l.slug}>
                <Link
                  href={l.href}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-primary/50"
                >
                  {isDone ? (
                    <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                  ) : (
                    <Circle className="size-5 text-muted-foreground" aria-hidden="true" />
                  )}
                  <span className="font-medium">{lessonTitle(l.slug)}</span>
                  <span className="ms-auto text-sm text-muted-foreground">{isDone ? d.done : d.todo}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="patrons" className="flex flex-col gap-4">
        <h2 id="patrons" className="text-2xl font-semibold">
          {d.patterns}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {PATTERNS.map((p) => {
            const stepCount = p.steps.filter((_, i) => completed.has(stepSlug(p.slug, i))).length
            return (
              <li key={p.slug}>
                <Link
                  href={`/patrons/${p.slug}`}
                  className="flex h-full flex-col gap-3 rounded-xl border bg-card p-5 hover:border-primary/50"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{patternText(t, p.slug).name}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">{`${stepCount} / ${p.steps.length}`}</span>
                  </span>
                  <Bar value={stepCount} max={p.steps.length} label={d.progressLabel(patternText(t, p.slug).name)} />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
