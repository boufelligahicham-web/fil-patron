'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { useLocale, useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/patterns/localized'

export type CarnetItem = {
  id: string
  kind: 'lesson' | 'pattern'
  title: string
  subtitle: string
  href: string
  steps: number
  done: number
}

type FilterKey = 'all' | 'active' | 'done' | 'courses'

/** Recherche + filtres + cartes « Travaux sur la Table ». */
export function CarnetFilters({ items }: { items: CarnetItem[] }) {
  const t = useTranslations()
  const locale = useLocale()
  const c = t.pages.dashboard.carnet
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterKey>('all')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter((item) => {
      if (filter === 'courses' && item.kind !== 'lesson') return false
      if (filter === 'active' && (item.done === 0 || item.done >= item.steps)) return false
      if (filter === 'done' && item.done < item.steps) return false
      if (!needle) return true
      return `${item.title} ${item.subtitle}`.toLowerCase().includes(needle)
    })
  }, [items, query, filter])

  const filters: { key: FilterKey; label: string; count?: number }[] = [
    { key: 'all', label: c.filters.all, count: items.length },
    {
      key: 'active',
      label: c.filters.active,
      count: items.filter((i) => i.done > 0 && i.done < i.steps).length,
    },
    { key: 'done', label: c.filters.done, count: items.filter((i) => i.done >= i.steps).length },
    { key: 'courses', label: c.filters.courses },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute start-3.5 size-[18px] text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={c.search}
          aria-label={c.search}
          className="w-full rounded-lg border border-border bg-background py-2.5 pe-10 ps-10 text-xs text-foreground shadow-soft transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label={c.clear}
            title={c.clear}
            className="absolute end-2 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors',
                active
                  ? 'glow bg-primary font-semibold text-primary-foreground'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {f.label}
              {typeof f.count === 'number' ? ` (${f.count})` : ''}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-xs text-muted-foreground">
          {c.empty}
        </p>
      ) : (
        <>
          <p aria-live="polite" className="-mt-1 text-[11px] font-medium text-muted-foreground">
            {c.results(visible.length)}
          </p>
          <ul className="flex flex-col gap-3">
            {visible.map((item) => {
              const pct = item.steps ? Math.round((item.done / item.steps) * 100) : 0
              const complete = item.done >= item.steps
              return (
                <li key={item.id}>
                  <article className="glass group rounded-xl p-3.5 shadow-soft transition-colors hover:border-primary/35">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {item.kind === 'lesson' ? c.lesson : c.pattern}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {item.kind === 'lesson'
                          ? complete
                            ? t.pages.dashboard.done
                            : t.pages.dashboard.todo
                          : c.stepOf(Math.min(item.done + 1, item.steps), item.steps)}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</p>
                    <div className="mt-3 border-t border-border pt-2">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{c.progress}</span>
                        <span className={cn('font-bold', complete ? 'text-success' : 'text-primary')}>
                          {`${formatNumber(pct, locale)}%`}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
                        role="progressbar"
                        aria-label={`${c.progress} ${item.title}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                      >
                        <div
                          className={cn(
                            'h-full rounded-full',
                            complete ? 'bg-success' : 'glow bg-primary',
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={item.href}
                      className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-muted"
                    >
                      <span>{complete ? c.review : c.open}</span>
                      <ArrowRight className="dir-icon size-3.5" aria-hidden="true" />
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
