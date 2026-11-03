import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, Calculator, GraduationCap, MonitorPlay, Ruler, Scissors } from 'lucide-react'
import { AtelierFilm } from '@/components/atelier-film'
import type { CarnetItem } from '@/components/carnet-filters'
import { CarnetFilters } from '@/components/carnet-filters'
import { SizeGuide } from '@/components/size-guide'
import { PageNarration } from '@/components/speech/narration'
import { SpeechBar } from '@/components/speech/speech-bar'
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
  const measuresValue = hasSavedMeasurements ? c.measuresOk : c.measuresNone
  const measuresDate =
    hasSavedMeasurements && measurementsUpdatedAt
      ? new Intl.DateTimeFormat(dateLocale(locale), { day: 'numeric', month: 'short' }).format(
          new Date(measurementsUpdatedAt),
        )
      : null
  const displayName = user?.email?.split('@')[0]

  const metrics = [
    {
      key: 'patterns',
      icon: Scissors,
      value: n(activePatterns),
      label: c.patternsActive,
    },
    {
      key: 'measures',
      icon: Ruler,
      value: measuresDate ?? measuresValue,
      label: measuresDate ? c.measuresOk : c.lastMeasures,
    },
    {
      key: 'practice',
      icon: GraduationCap,
      value: `${n(progress)}%`,
      label: c.practice,
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 pt-6 pb-4 sm:px-6">
      <PageNarration title={c.title} text={c.narration} />
      <div className="halo pointer-events-none absolute inset-x-0 -top-24 h-64" aria-hidden="true" />

      {/* 1. Accueil d'atelier */}
      <section className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/70 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-success" aria-hidden="true" />
            {c.status}
          </span>
        </div>
        <h1 className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {c.title}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground italic">
          {c.motto} — {displayName ? c.welcome(displayName) : c.welcomeGuest}
        </p>
      </section>

      {/* 2. Guide vocal du carnet */}
      <SpeechBar text={c.narration} className="relative mt-4" />

      {/* 3. Chiffres de l'atelier */}
      <section className="mt-4 grid grid-cols-3 gap-2.5" aria-label={c.title}>
        {metrics.map(({ key, icon: Icon, value, label }) => (
          <div key={key} className="glass flex flex-col justify-between rounded-xl p-3 shadow-soft">
            <span className="mb-2 flex size-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Icon className="size-[17px]" aria-hidden="true" />
            </span>
            <span className="block text-lg leading-tight font-bold text-foreground">{value}</span>
            <span className="mt-1.5 block text-[11px] leading-4 font-medium text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* 3 bis. Raccourcis : sauter directement au bon atelier */}
      <nav
        aria-label={c.jump.label}
        className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[
          { href: '#demonstration', icon: MonitorPlay, label: c.jump.demo },
          { href: '#tailles', icon: Ruler, label: c.jump.sizes },
          { href: '#travaux', icon: Scissors, label: c.jump.works },
          { href: '/calculateur', icon: Calculator, label: c.jump.meter },
        ].map(({ href, icon: Icon, label }) =>
          href.startsWith('#') ? (
            <a
              key={href}
              href={href}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon className="size-3.5 text-primary" aria-hidden="true" />
              {label}
            </a>
          ) : (
            <Link
              key={href}
              href={href}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon className="size-3.5 text-primary" aria-hidden="true" />
              {label}
            </Link>
          ),
        )}
      </nav>
      <section
        aria-labelledby="featured-title"
        className="relative mt-5 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-accent via-card to-card p-4 shadow-soft sm:p-5"
      >
        <div
          className="pointer-events-none absolute -end-8 -top-8 size-36 rounded-full bg-primary/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            {c.featured}
          </span>
          <span className="font-serif text-lg leading-none font-bold text-primary/80 italic">01</span>
        </div>
        <h2
          id="featured-title"
          className="relative mt-2 font-serif text-lg leading-snug font-bold text-foreground"
        >
          {t.home.masterclass.title}
        </h2>
        <p className="relative mt-1 line-clamp-2 text-xs leading-6 text-muted-foreground">
          {t.home.masterclass.text}
        </p>
        <div className="relative mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-secondary-foreground">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            {`${c.featuredMeta} · ${c.minutes(18)}`}
          </span>
          <Link
            href="/cours/emmanchure"
            className="glow inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {c.featuredCta}
          </Link>
        </div>
      </section>

      {/* 5. Démonstration animée */}
      <div id="demonstration" className="mt-3 scroll-mt-24">
        <AtelierFilm compact />
      </div>

      {/* 6. Travaux sur la table */}
      <section id="travaux" className="mt-6 scroll-mt-24" aria-labelledby="travaux-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="travaux-title" className="text-base font-bold text-foreground">
            {c.works}
          </h2>
          <span className="rounded-full border border-border bg-card/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {c.projects(items.length)}
          </span>
        </div>
        <div className="mt-3">
          <CarnetFilters items={items} />
        </div>
      </section>

      {/* 7. Guide des tailles */}
      <SizeGuide compact className="mt-6" />

      {/* 8. Raccourci calculateur */}
      <section className="glass mt-3 flex items-center justify-between gap-3 rounded-xl p-3.5 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-foreground">{c.quickTitle}</h2>
            <p className="text-xs text-muted-foreground">{c.quickText}</p>
          </div>
        </div>
        <Link
          href="/calculateur"
          aria-label={c.quickTitle}
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowRight className="dir-icon size-[18px]" aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
