import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calculator, Ruler, Shirt } from 'lucide-react'
import { PATTERNS } from '@/lib/patterns'
import { getDictionary, patternText } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

const MODULES = [
  { href: '/cours/mesures', icon: Ruler },
  { href: '/cours/glossaire', icon: BookOpen },
  { href: '/patrons', icon: Shirt },
  { href: '/calculateur', icon: Calculator },
]

export default async function HomePage() {
  const locale = await getLocale()
  const t = getDictionary(locale)
  const modules = t.home.modules.map((m, i) => ({ ...m, ...MODULES[i] }))

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 md:py-16">
      <section aria-labelledby="hero-title" className="grid items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="w-fit rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {t.home.badge}
          </p>
          <h1 id="hero-title" className="text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
            {t.home.title}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            {t.home.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cours/mesures"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t.home.ctaStart}
              <ArrowRight className="dir-icon size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/patrons"
              className="inline-flex h-12 items-center rounded-lg border bg-card px-5 font-medium hover:bg-muted"
            >
              {t.home.ctaPatterns}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <Image
            src="/images/atelier.png"
            alt={t.home.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section aria-labelledby="modules-title" className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 id="modules-title" className="text-3xl font-semibold">
            {t.home.modulesTitle}
          </h2>
          <p className="text-muted-foreground">{t.home.modulesIntro}</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex h-full flex-col gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <m.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-2xl text-muted-foreground" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="patrons-title" className="flex flex-col gap-8">
        <h2 id="patrons-title" className="text-3xl font-semibold">
          {t.home.patternsTitle}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {PATTERNS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/patrons/${p.slug}`}
                className="flex h-full flex-col gap-2 rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{patternText(t, p.slug).name}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {t.levels[p.level]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{patternText(t, p.slug).tagline}</p>
                <p className="mt-auto pt-2 text-sm font-medium text-primary">
                  {t.home.stepsCount(p.steps.length)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
        <h2 className="text-3xl font-semibold">{t.home.dashboardTitle}</h2>
        <p className="max-w-2xl leading-relaxed opacity-90">{t.home.dashboardText}</p>
        <Link
          href="/auth/inscription"
          className="inline-flex h-12 items-center rounded-lg bg-background px-5 font-medium text-foreground hover:bg-background/90"
        >
          {t.home.dashboardCta}
        </Link>
      </section>
    </div>
  )
}
