import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CircleAlert, Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { LessonComplete } from '@/components/lesson-complete'
import { EASE_TABLE, MEASUREMENTS, type MeasurementGroup } from '@/lib/content/measurements'
import { getUserContext } from '@/lib/data'
import { getDictionary } from '@/lib/i18n'
import { getLocale } from '@/lib/locale'

export const metadata: Metadata = {
  title: 'Guide de prise de mesures',
  description: 'Apprenez à prendre les tours, hauteurs et longueurs, et à choisir les bonnes valeurs d’aisance.',
}

export default async function MesuresPage() {
  const [{ user, completed }, locale] = await Promise.all([getUserContext(), getLocale()])
  const t = getDictionary(locale)
  const p = t.pages.mesures

  const groups: { id: MeasurementGroup; title: string; intro: string }[] = [
    { id: 'tours', title: p.toursTitle, intro: p.toursIntro },
    { id: 'hauteurs', title: p.hauteursTitle, intro: p.hauteursIntro },
  ]

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6">
      <PageHeader eyebrow={p.eyebrow} title={p.title}>
        {p.intro}
      </PageHeader>

      <section aria-labelledby="regles" className="grid items-start gap-8 md:grid-cols-5">
        <div className="flex flex-col gap-5 md:col-span-3">
          <h2 id="regles" className="text-2xl font-semibold">
            {p.beforeTitle}
          </h2>
          <ul className="flex flex-col gap-3">
            {p.rules.map((r) => (
              <li key={r} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
          <p className="flex gap-3 rounded-xl border bg-card p-4 text-sm leading-relaxed">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <span>{p.note}</span>
          </p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border md:col-span-2">
          <Image
            src="/images/prise-mesures.png"
            alt={t.pages.mesures.imageAlt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.id} aria-labelledby={`g-${g.id}`} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 id={`g-${g.id}`} className="text-2xl font-semibold">
              {g.title}
            </h2>
            <p className="text-muted-foreground">{g.intro}</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {MEASUREMENTS.filter((m) => m.group === g.id).map((m) => (
              <li key={m.key} id={m.key} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{t.measurements[m.key]}</h3>
                  <abbr
                    title={t.measurements[m.key]}
                    className="rounded bg-secondary px-2 py-0.5 font-mono text-xs no-underline text-secondary-foreground"
                  >
                    {m.abbr}
                  </abbr>
                </div>
                <p className="leading-relaxed">{m.howTo}</p>
                {m.tip && (
                  <p className="flex gap-2 text-sm text-muted-foreground">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden="true" />
                    {m.tip}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section aria-labelledby="aisance" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="aisance" className="text-2xl font-semibold">
            {p.easeTitle}
          </h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">{p.easeIntro}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-start text-sm">
            <caption className="sr-only">{p.easeCaption}</caption>
            <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  {p.easeColumns.garment}
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  {p.easeColumns.zone}
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  {p.easeColumns.total}
                </th>
                <th scope="col" className="px-4 py-3 text-start font-medium">
                  {p.easeColumns.why}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {EASE_TABLE.map((row) => (
                <tr key={row.garment}>
                  <th scope="row" className="px-4 py-3 text-start font-medium">
                    {row.garment}
                  </th>
                  <td className="px-4 py-3">{row.zone}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums text-primary">{row.value}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">{p.easeNote}</p>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{p.finishedTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {p.finishedBefore}
            <Link href="/calculateur" className="font-medium text-primary underline underline-offset-4">
              {p.finishedLink}
            </Link>
            {p.finishedAfter}
          </p>
        </div>
        <LessonComplete slug="cours/mesures" initialDone={completed.has('cours/mesures')} isAuthed={Boolean(user)} />
      </section>
    </div>
  )
}
