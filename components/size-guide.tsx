'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  Circle,
  Globe,
  Hourglass,
  MoveVertical,
  Ruler,
  Sparkles,
} from 'lucide-react'
import { useLocale, useTranslations } from '@/components/locale-provider'
import { SIZE_ROWS, cupLabel, findSize, sizeLabel, type SizeKey } from '@/lib/content/sizes'
import { cmUnit, formatNumber } from '@/lib/patterns/localized'
import { cn } from '@/lib/utils'

const MORPHO_ICONS = [Accessibility, Hourglass, Circle, MoveVertical]

/**
 * Guide des tailles FR 34-60 : un sélecteur de taille, les trois tours clés,
 * les correspondances internationales, puis les repères de morphologie.
 *
 * `compact` sert au carnet : on garde le sélecteur et les cotes, on renvoie
 * vers la grille complète. `table` affiche la grille entière, ligne par ligne,
 * sur la page dédiée aux tailles.
 */
export function SizeGuide({
  id = 'tailles',
  compact = false,
  table = false,
  defaultSize = 'M',
  className,
}: {
  id?: string
  compact?: boolean
  table?: boolean
  defaultSize?: SizeKey
  className?: string
}) {
  const t = useTranslations()
  const s = t.sizes
  const locale = useLocale()
  const uid = useId()
  const [active, setActive] = useState<SizeKey>(defaultSize)

  const row = findSize(active)
  const unit = cmUnit(locale)
  const n = (value: number) => formatNumber(value, locale)
  const range = ([from, to]: [number, number]) => `${n(from)} – ${n(to)} ${unit}`

  const cells = [
    { label: s.chest, abbr: s.chestShort, value: row.tp },
    { label: s.waist, abbr: s.waistShort, value: row.tt },
    { label: s.hips, abbr: s.hipsShort, value: row.tb },
  ]

  return (
    <section
      id={id}
      aria-labelledby={`${uid}-title`}
      className={cn(
        'scroll-mt-24 rounded-2xl border border-border bg-card shadow-soft',
        compact ? 'p-4' : 'p-4 sm:p-6',
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <Ruler className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id={`${uid}-title`} className={cn('font-semibold', compact ? 'text-sm' : 'text-lg')}>
                {compact ? s.compactTitle : table ? s.fullTitle : s.title}
              </h2>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {s.badge}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {compact ? s.compactText : table ? s.fullText : s.intro}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {s.choose}
          </span>
          <span aria-live="polite" className="text-xs font-semibold text-primary">
            {s.selected(sizeLabel(locale, row))}
          </span>
        </div>

        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SIZE_ROWS.map((item) => {
            const selected = item.key === active
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                aria-pressed={selected}
                className={cn(
                  'shrink-0 rounded-lg border px-2.5 py-2 text-xs font-medium whitespace-nowrap transition-colors',
                  selected
                    ? 'glow border-primary bg-primary font-semibold text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50 hover:text-primary',
                )}
              >
                {sizeLabel(locale, item)}
              </button>
            )
          })}
        </div>

        <div
          aria-live="polite"
          className="rounded-xl border border-border bg-muted/50 p-3"
        >
          <div className="grid grid-cols-3 gap-2">
            {cells.map((cell) => (
              <div
                key={cell.abbr}
                className="rounded-lg border border-border bg-card p-2 text-center shadow-soft"
              >
                <span className="block text-[10px] leading-4 font-medium tracking-wide text-muted-foreground uppercase">
                  {cell.label}
                </span>
                <span className="mt-0.5 block text-sm leading-tight font-semibold tabular-nums text-foreground">
                  {range(cell.value)}
                </span>
                <abbr
                  title={cell.label}
                  className="mt-1 inline-block rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground no-underline"
                >
                  {cell.abbr}
                </abbr>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex flex-col gap-1.5 border-t border-border pt-2.5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <abbr title={s.intlTitle} className="no-underline">
                {s.intl.fr} {row.fr} · {s.intl.it} {row.it} · {s.intl.uk} {row.uk} · {s.intl.us} {row.us}
              </abbr>
            </span>
            <span className="flex items-center gap-1.5 text-primary">
              <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
              {s.cups} : {cupLabel(locale, row.cups)}
            </span>
          </div>
        </div>

        {table && (
          <div className="mt-1 flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xs font-semibold text-foreground">{s.tableTitle}</h3>
              <span id={`${uid}-hint`} className="text-[11px] text-muted-foreground">
                {s.tableHint}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table
                aria-describedby={`${uid}-hint`}
                className="w-full min-w-[660px] border-collapse text-xs"
              >
                <caption className="sr-only">{s.tableCaption}</caption>
                <thead className="bg-muted/60 text-[10px] tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      {s.tableColumns.size}
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      <abbr title={s.chest} className="no-underline">
                        {s.chestShort}
                      </abbr>
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      <abbr title={s.waist} className="no-underline">
                        {s.waistShort}
                      </abbr>
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      <abbr title={s.hips} className="no-underline">
                        {s.hipsShort}
                      </abbr>
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      {s.tableColumns.intl}
                    </th>
                    <th scope="col" className="px-3 py-2 text-start font-medium">
                      {s.tableColumns.cups}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SIZE_ROWS.map((item) => {
                    const selected = item.key === active
                    return (
                      <tr
                        key={item.key}
                        onClick={() => setActive(item.key)}
                        className={cn(
                          'cursor-pointer transition-colors',
                          selected ? 'bg-primary/10' : 'hover:bg-muted/50',
                        )}
                      >
                        <th scope="row" className="px-3 py-2 text-start font-semibold whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setActive(item.key)}
                            aria-pressed={selected}
                            className={cn(
                              'rounded-md px-1 py-0.5 text-start transition-colors',
                              selected ? 'text-primary' : 'text-foreground hover:text-primary',
                            )}
                          >
                            {sizeLabel(locale, item)}
                          </button>
                        </th>
                        <td className="px-3 py-2 tabular-nums whitespace-nowrap">{range(item.tp)}</td>
                        <td className="px-3 py-2 tabular-nums whitespace-nowrap">{range(item.tt)}</td>
                        <td className="px-3 py-2 tabular-nums whitespace-nowrap">{range(item.tb)}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                          <span>{s.intl.fr} {item.fr}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{s.intl.it} {item.it}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{s.intl.uk} {item.uk}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{s.intl.us} {item.us}</span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{cupLabel(locale, item.cups)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] leading-5 text-muted-foreground">{s.tableNote}</p>
          </div>
        )}

        {!compact && (
          <>
            <div className="mt-1 flex flex-col gap-2">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
                {s.morphologyTitle}
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {s.morphology.map((item, index) => {
                  const Icon = MORPHO_ICONS[index] ?? Circle
                  return (
                    <li
                      key={item.title}
                      className="flex gap-2.5 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground">{item.title}</p>
                        <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{item.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex gap-2.5 rounded-xl border border-primary/25 bg-accent/70 p-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold text-accent-foreground">{s.ruleTitle}</p>
                <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{s.ruleText}</p>
              </div>
            </div>
          </>
        )}

        {!table && (
          <Link
            href="/tailles#grille"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            {s.openFull}
            <ArrowRight className="dir-icon size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  )
}
