import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calculator, Ruler } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { SizeGuide } from '@/components/size-guide'
import { PageNarration } from '@/components/speech/narration'
import { SpeechBar } from '@/components/speech/speech-bar'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const meta = getDictionary(locale).meta.pages.sizes
  return { title: meta.title, description: meta.description }
}

export default async function TaillesPage() {
  const locale = await getLocale()
  const t = getDictionary(locale)
  const s = t.sizes

  const narration = [
    s.title,
    s.intro,
    ...s.how.map((item) => `${item.title}. ${item.text}`),
    s.ruleTitle,
    s.ruleText,
  ].join(' ')

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6">
      <PageNarration title={s.title} text={narration} />

      <PageHeader eyebrow={s.eyebrow} title={s.title}>
        {s.intro}
      </PageHeader>

      <SpeechBar text={narration} />

      <SizeGuide id="grille" table />

      <section aria-labelledby="choisir-taille" className="flex flex-col gap-5">
        <h2 id="choisir-taille" className="text-2xl font-semibold">
          {s.howTitle}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {s.how.map((item, index) => (
            <li key={item.title} className="glass flex flex-col gap-2 rounded-xl p-4 shadow-soft">
              <span className="font-serif text-2xl text-primary/70" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs leading-6 text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Ruler className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">{s.measuresCta}</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{s.ruleText}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/cours/mesures"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t.nav.mesures}
            <ArrowRight className="dir-icon size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/calculateur"
            className="glow inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Calculator className="size-4" aria-hidden="true" />
            {s.calculatorCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
