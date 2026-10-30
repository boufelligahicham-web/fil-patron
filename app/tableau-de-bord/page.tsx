import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, Calculator, GraduationCap, Ruler, Scissors } from 'lucide-react'
import type { CarnetItem } from '@/components/carnet-filters'
import { CarnetFilters } from '@/components/carnet-filters'
import { getUserContext } from '@/lib/data'
import { dateLocale, getDictionary, patternText } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { COURSE_LESSONS, PATTERNS, stepSlug } from '@/lib/patterns'
import { formatNumber, patternSteps } from '@/lib/patterns/localized'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return { title: getDictionary(locale).meta.pages.dashboard.title }
}

export default async function DashboardPage() {
  const [{ user, completed, hasSavedMeasurements, measurementsUpdatedAt }, locale] = await Promise.all([
    getUserContext(),
    getLocale(),
  ])
  if (!user) redirect('/auth/connexion')

  const t = getDictionary(locale)
  const c = t.pages.dashboard.carnet
  const n = (value: number) => formatNumber(value, locale)

  const lessonTitle = (slug: string) => {
    if (slug === 'cours/glossaire') return t.pages.glossaire.title
    if (slug === 'cours/emmanchure') return t.pages.emmanchure.title
    return t.pages.mesures.title
  }
  const lessonText = (slug: string) => {
    if (slug === 'cours/glossaire') return t.meta.pages.glossaire.description
    if (slug === 'cours/emmanchure') return t.meta.pages.emmanchure.description
    return t.meta.pages.mesures.description
  }

  const total = COURSE_LESSONS.length + PATTERNS.reduce((sum, p) => sum + p.steps.length, 0)
  const done = completed.size
  const progress = total ? Math.round((done / total) * 100) : 0

  const items: CarnetItem[] = [
    ...PATTERNS.map((p) => {
      const doneSteps = p.steps.filter((_, index) => completed.has(stepSlug(p.slug, index))).length
      const steps = patternSteps(locale, p)
      const nextStep = steps[Math.min(doneSteps, steps.length - 1)]
      return {
        id: p.slug,
        kind: 'pattern' as const,
        title: patternText(t, p.slug).name,
        subtitle: doneSteps > 0 && nextStep ? nextStep.title : patternText(t, p.slug).tagline,
        href: `/patrons/${p.slug}`,
        steps: p.steps.length,
        done: doneSteps,
      }
    }),
    ...COURSE_LESSONS.map((lesson) => ({
      id: lesson.slug,
      kind: 'lesson' as const,
      title: lessonTitle(lesson.slug),
      subtitle: lessonText(lesson.slug),
      href: lesson.href,
      steps: 1,
      done: completed.has(lesson.slug) ? 1 : 0,
    })),
  ]

  const activePatterns = PATTERNS.filter((p) =>
    p.steps.some((_, index) => completed.has(stepSlug(p.slug, index))),
  ).length
  const measuresValue = hasSavedMeasurements
    ? c.measuresOk
    : c.measuresNone
  const measuresDate =
    hasSavedMeasurements && measurementsUpdatedAt
      ? new Intl.DateTimeFormat(dateLocale(locale), { day: 'numeric', month: 'short' }).format(
          new Date(measurementsUpdatedAt),
        )
      : null
  const displayName = user?.email?.split('@')[0]

  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 pt-6 pb-2 sm:px-6">
      <div className="ice-halo pointer-events-none absolute inset-x-0 -top-28 h-72" aria-hidden="true" />

      {/* 1. Accueil d'atelier */}
      <section className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-ink-soft">
            <span
              className="inline-block size-1.5 rounded-full bg-success shadow-[0_0_6px_#34d399]"
              aria-hidden="true"
            />
            {c.status}
          </span>
        </div>
        <h1 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {c.title}
        </h1>
        <p className="mt-1 text-xs text-ink-soft italic">
          {c.motto} — {displayName ? c.welcome(displayName) : c.welcomeGuest}
        </p>
      </section>

      {/* 2. Chiffres de l'atelier */}
      <section className="mt-5 grid grid-cols-3 gap-2.5" aria-label={c.title}>
        <div className="glass flex flex-col justify-between rounded-xl p-3 shadow-ice">
          <span className="mb-2 flex size-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Scissors className="size-[17px]" aria-hidden="true" />
          </span>
          <span className="block text-xl leading-none font-bold text-foreground">{n(activePatterns)}</span>
          <span className="mt-1.5 block text-[11px] font-medium text-ink-soft">{c.patternsActive}</span>
        </div>
        <div className="glass flex flex-col justify-between rounded-xl p-3 shadow-ice">
          <span className="mb-2 flex size-7 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/40 text-secondary-foreground">
            <Ruler className="size-[17px]" aria-hidden="true" />
          </span>
          <span className="block text-base leading-none font-bold text-foreground">
            {measuresDate ?? measuresValue}
          </span>
          <span className="mt-1.5 block text-[11px] font-medium text-ink-soft">
            {measuresDate ? c.measuresOk : c.lastMeasures}
          </span>
        </div>
        <div className="glass flex flex-col justify-between rounded-xl p-3 shadow-ice">
          <span className="mb-2 flex size-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <GraduationCap className="size-[17px]" aria-hidden="true" />
          </span>
          <span className="block text-xl leading-none font-bold text-foreground">{`${n(progress)}%`}</span>
          <span className="mt-1.5 block text-[11px] font-medium text-ink-soft">{c.practice}</span>
        </div>
      </section>

      {/* 3. Leçon de maître en avant */}
      <section className="relative mt-5 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-atelier-deep/80 via-card to-card p-4 shadow-[0_8px_32px_rgba(14,77,110,0.35)] sm:p-5">
        <div
          className="pointer-events-none absolute -end-8 -top-8 size-36 rounded-full bg-primary/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            {c.featured}
          </span>
          <span className="font-serif text-lg leading-none font-bold text-primary/80 italic">01</span>
        </div>
        <h2 className="relative mt-2 font-serif text-lg leading-snug font-bold text-foreground">
          {t.home.masterclass.title}
        </h2>
        <p className="relative mt-1 line-clamp-2 text-xs leading-6 text-ink-soft">
          {t.home.masterclass.text}
        </p>
        <div className="relative mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-secondary-foreground">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            {`${c.featuredMeta} · ${c.minutes(18)}`}
          </span>
          <Link
            href="/cours/emmanchure"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-[0_0_15px_rgba(125,211,252,0.4)] transition-opacity hover:opacity-90"
          >
            {c.featuredCta}
          </Link>
        </div>
      </section>

      {/* 4. Travaux sur la table */}
      <section className="mt-6" aria-labelledby="travaux">
        <div className="flex items-center justify-between gap-3">
          <h2 id="travaux" className="text-base font-bold text-foreground">
            {c.works}
          </h2>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
            {c.projects(items.length)}
          </span>
        </div>
        <div className="mt-3">
          <CarnetFilters items={items} />
        </div>
      </section>

      {/* 5. Raccourci calculateur */}
      <section className="glass mt-6 flex items-center justify-between gap-3 rounded-xl p-3.5 shadow-ice">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">{c.quickTitle}</h2>
            <p className="text-xs text-ink-soft">{c.quickText}</p>
          </div>
        </div>
        <Link
          href="/calculateur"
          aria-label={c.quickTitle}
          className="rounded-lg bg-primary p-2 text-primary-foreground shadow-[0_0_12px_rgba(125,211,252,0.3)] transition-opacity hover:opacity-90"
        >
          <ArrowRight className="dir-icon size-[18px]" aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
