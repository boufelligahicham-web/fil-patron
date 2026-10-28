import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  GraduationCap,
  Lightbulb,
  PencilRuler,
  Shirt,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import { LessonComplete } from '@/components/lesson-complete'
import { ArmholeFigure } from '@/components/illustrations/armhole'
import { getUserContext } from '@/lib/data'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'
import { getArmholeLesson, type Block, type FigureText } from '@/lib/content/armhole'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const meta = getDictionary(locale).meta.pages.emmanchure
  return { title: meta.title, description: meta.description }
}

const TONE = {
  note: {
    icon: Lightbulb,
    box: 'border-atelier/20 bg-atelier-soft',
    title: 'text-atelier',
    iconColor: 'text-atelier',
  },
  warn: {
    icon: TriangleAlert,
    box: 'border-champagne/40 bg-champagne-soft',
    title: 'text-ink',
    iconColor: 'text-champagne',
  },
  tip: {
    icon: Sparkles,
    box: 'border-tailor bg-linen',
    title: 'text-ink',
    iconColor: 'text-champagne',
  },
} as const

function renderBlock(block: Block, key: number, locale: Locale, figures: FigureText) {
  switch (block.kind) {
    case 'lead':
      return (
        <p key={key} className="text-lg leading-relaxed text-ink-soft text-pretty">
          {block.text}
        </p>
      )

    case 'p':
      return (
        <p key={key} className="text-[15px] leading-7 text-pretty">
          {block.text}
        </p>
      )

    case 'list':
      return block.ordered ? (
        <ol key={key} className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 text-[15px] leading-7">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-atelier text-[11px] font-semibold text-primary-foreground"
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul key={key} className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-7">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-champagne" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div key={key} className="overflow-x-auto rounded-xl border border-tailor bg-card">
          <table className="w-full min-w-[520px] text-start text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-champagne-soft text-[11px] tracking-[0.08em] text-ink-soft uppercase">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-start font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-tailor">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="align-top hover:bg-linen">
                  {row.map((cell, ci) => {
                    const numeric = block.numeric?.includes(ci)
                    const Tag = ci === 0 ? 'th' : 'td'
                    return (
                      <Tag
                        key={ci}
                        scope={ci === 0 ? 'row' : undefined}
                        className={
                          ci === 0
                            ? 'px-4 py-3 text-start font-medium text-ink'
                            : numeric
                              ? 'px-4 py-3 font-semibold tabular-nums whitespace-nowrap text-atelier'
                              : 'px-4 py-3 text-ink-soft'
                        }
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'formula':
      return (
        <figure
          key={key}
          className="overflow-hidden rounded-xl border border-atelier/30 bg-atelier-deep p-5 text-[#fbf9f5]"
        >
          {block.caption && (
            <figcaption className="mb-3 text-[11px] tracking-[0.08em] text-[#c5a059] uppercase">
              {block.caption}
            </figcaption>
          )}
          <p
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className={
              locale === 'ar'
                ? 'text-base leading-8 font-medium'
                : 'overflow-x-auto font-mono text-sm leading-7'
            }
          >
            {block.expression}
          </p>
        </figure>
      )

    case 'note': {
      const tone = TONE[block.tone]
      const Icon = tone.icon
      return (
        <div key={key} className={`flex gap-3 rounded-xl border p-4 sm:p-5 ${tone.box}`}>
          <Icon className={`mt-0.5 size-5 shrink-0 ${tone.iconColor}`} aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className={`text-sm font-semibold ${tone.title}`}>{block.title}</p>
            <p className="text-sm leading-6 text-ink-soft">{block.text}</p>
          </div>
        </div>
      )
    }

    case 'gesture':
      return (
        <div key={key} className="flex gap-3 rounded-r-xl border-s-2 border-champagne bg-champagne-soft/60 p-4 sm:p-5">
          <PencilRuler className="mt-0.5 size-5 shrink-0 text-champagne" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-ink-soft uppercase">{block.title}</p>
            <p className="text-sm leading-6 text-ink">{block.text}</p>
          </div>
        </div>
      )

    case 'figure':
      return (
        <figure key={key} className="rounded-2xl border border-tailor bg-linen p-3 sm:p-6">
          <ArmholeFigure id={block.id} locale={locale} text={figures} />
          <figcaption className="mt-3 text-center text-xs leading-5 text-ink-soft">{block.caption}</figcaption>
        </figure>
      )

    case 'cards':
      return (
        <ul key={key} className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 rounded-xl border border-tailor bg-card p-4">
              {item.meta && (
                <p className="text-[10px] font-semibold tracking-[0.08em] text-champagne uppercase">{item.meta}</p>
              )}
              <h3 className="text-base font-semibold text-atelier">{item.title}</h3>
              <p className="text-sm leading-6 text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      )

    case 'steps':
      return (
        <ol key={key} className="flex flex-col gap-6">
          {block.items.map((step) => (
            <li key={step.n} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-champagne/50 bg-champagne-soft font-serif text-base font-semibold text-champagne"
              >
                {step.n}
              </span>
              <div className="flex min-w-0 flex-col gap-2 border-b border-tailor pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-[15px] leading-7 text-ink-soft">{step.text}</p>
                {step.gesture && (
                  <p className="flex gap-2 rounded-lg bg-linen px-3 py-2 text-sm leading-6 text-ink">
                    <PencilRuler className="mt-1 size-4 shrink-0 text-champagne" aria-hidden="true" />
                    <span>{step.gesture}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )

    case 'checks':
      return (
        <div key={key} className="overflow-hidden rounded-xl border border-tailor bg-card">
          <table className="w-full text-sm">
            <caption className="sr-only">{block.head.join(' · ')}</caption>
            <thead className="bg-atelier text-[11px] tracking-[0.08em] text-primary-foreground uppercase">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-start font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-tailor">
              {block.rows.map((row) => (
                <tr key={row.label} className="hover:bg-linen">
                  <th scope="row" className="px-4 py-3 text-start font-medium text-ink">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 font-semibold tabular-nums whitespace-nowrap text-atelier">{row.value}</td>
                  <td className="px-4 py-3 text-ink-soft">{row.tolerance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return null
  }
}

export default async function EmmanchurePage() {
  const [{ user, completed }, locale] = await Promise.all([getUserContext(), getLocale()])
  const t = getDictionary(locale)
  const p = t.pages.emmanchure
  const lesson = getArmholeLesson(locale)

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label={t.a11y.breadcrumb}>
        <Link
          href="/cours/mesures"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-ink-soft hover:text-atelier"
        >
          <ArrowLeft className="dir-icon size-4" aria-hidden="true" />
          {p.back}
        </Link>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* Hero : carnet d'atelier                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="relative overflow-hidden rounded-3xl bg-atelier-deep text-[#fbf9f5] shadow-[0_24px_60px_-30px_rgba(8,47,40,0.65)]">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-[#c5a059]/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-6 p-6 sm:p-10 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#eadbce] uppercase">
              {lesson.eyebrow}
            </span>
            <span className="font-serif text-4xl leading-none text-[#c5a059] sm:text-5xl" aria-hidden="true">
              01
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-[#fbf9f5] sm:text-5xl lg:text-6xl">
              {lesson.title}
            </h1>
            <p className="max-w-2xl font-serif text-lg leading-8 text-[#eadbce] italic sm:text-xl">
              {lesson.subtitle}
            </p>
          </div>

          <p className="max-w-3xl text-sm leading-7 text-[#fbf9f5]/80 sm:text-base">{lesson.intro}</p>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { icon: Clock, value: lesson.meta.reading },
              { icon: GraduationCap, value: lesson.meta.level },
              { icon: Shirt, value: lesson.meta.garment },
            ].map(({ icon: Icon, value }) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-[#eadbce]"
              >
                <Icon className="size-3.5 text-[#c5a059]" aria-hidden="true" />
                {value}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <a
              href="#donnees"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#fbf9f5] px-5 text-sm font-semibold text-[#0d4037] transition-colors hover:bg-[#f7f2e7]"
            >
              {p.start}
              <ArrowRight className="dir-icon size-4" aria-hidden="true" />
            </a>
            <Link
              href="/patrons/abaya"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-medium text-[#fbf9f5] transition-colors hover:bg-white/10"
            >
              {t.patterns.abaya.name}
            </Link>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* -------------------------------------------------------------- */}
        {/* Sommaire + repères                                             */}
        {/* -------------------------------------------------------------- */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
          <nav aria-labelledby="sommaire" className="rounded-2xl border border-tailor bg-card p-4">
            <h2 id="sommaire" className="text-[11px] font-semibold tracking-[0.08em] text-ink-soft uppercase">
              {lesson.tocTitle}
            </h2>
            <p className="mt-1 text-xs leading-5 text-ink-soft">{lesson.tocHint}</p>
            <ol className="mt-3 flex flex-col">
              {lesson.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex gap-2 rounded-md py-1.5 text-sm text-ink-soft transition-colors hover:text-atelier"
                  >
                    <span className="w-5 shrink-0 font-serif text-xs tabular-nums text-champagne">
                      {section.number}
                    </span>
                    <span className="leading-5 group-hover:underline group-hover:underline-offset-4">
                      {section.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="rounded-2xl border border-champagne/30 bg-champagne-soft p-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-champagne uppercase">{p.memo}</p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{p.memoText}</p>
          </div>
        </aside>

        {/* -------------------------------------------------------------- */}
        {/* Corps de la leçon                                              */}
        {/* -------------------------------------------------------------- */}
        <article className="flex min-w-0 flex-col gap-12">
          {lesson.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`t-${section.id}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 border-b border-tailor pb-4">
                <span className="font-serif text-2xl tabular-nums text-champagne" aria-hidden="true">
                  {section.number}
                </span>
                <h2 id={`t-${section.id}`} className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {section.title}
                </h2>
              </div>
              <div className="mt-5 flex flex-col gap-5">
                {section.lead && (
                  <p className="text-lg leading-relaxed text-ink-soft text-pretty">{section.lead}</p>
                )}
                {section.blocks.map((block, i) => renderBlock(block, i, locale, lesson.figures))}
              </div>
            </section>
          ))}

          {/* À retenir */}
          <section className="relative overflow-hidden rounded-3xl bg-atelier-deep p-6 text-[#fbf9f5] sm:p-8">
            <div className="paper-grid pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden="true" />
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl font-semibold text-[#fbf9f5] sm:text-3xl">
                  {lesson.closing.title}
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-[#c5a059]/70 to-transparent" aria-hidden="true" />
              </div>
              <ol className="flex flex-col gap-3">
                {lesson.closing.items.map((item, i) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#fbf9f5]/85">
                    <span className="font-serif text-base text-[#c5a059]" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Suite du parcours */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-tailor bg-card p-5">
              <h2 className="font-serif text-xl font-semibold text-ink">{lesson.cta.title}</h2>
              <p className="text-sm leading-6 text-ink-soft">{lesson.cta.text}</p>
              <Link
                href="/patrons/abaya"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-atelier px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {lesson.cta.label}
                <ArrowRight className="dir-icon size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-3 rounded-2xl border border-tailor bg-linen p-5">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-ink-soft uppercase">{p.progress}</p>
              <LessonComplete slug="cours/emmanchure" initialDone={completed.has('cours/emmanchure')} isAuthed={Boolean(user)} />
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}
