'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useLocale, useTranslations } from '@/components/locale-provider'
import { GLOSSARY_CATEGORIES, getGlossary, type GlossaryCategory } from '@/lib/content/glossary'
import { cn } from '@/lib/utils'

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export function GlossaryExplorer() {
  const locale = useLocale()
  const t = useTranslations().ui.glossary
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all')
  const [open, setOpen] = useState<Set<string>>(new Set())

  const terms = useMemo(() => getGlossary(locale), [locale])
  const termById = useMemo(() => Object.fromEntries(terms.map((term) => [term.id, term])), [terms])

  const categories: { id: GlossaryCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.all },
    ...GLOSSARY_CATEGORIES.map((c) => ({
      id: c.id as GlossaryCategory | 'all',
      label: t.categories[c.id] ?? c.label,
    })),
  ]

  const results = useMemo(() => {
    const q = normalize(query.trim())
    return terms
      .filter(
        (term) =>
          (category === 'all' || term.category === category) &&
          (!q || normalize(`${term.term} ${term.short} ${term.detail}`).includes(q)),
      )
      .sort((a, b) => a.term.localeCompare(b.term, locale === 'ar' ? 'ar' : 'fr'))
  }, [terms, query, category, locale])

  function setTermOpen(id: string, value: boolean) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (value) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function jumpTo(id: string) {
    setQuery('')
    setCategory('all')
    setTermOpen(id, true)
    requestAnimationFrame(() => {
      const el = document.getElementById(`terme-${id}`)
      el?.scrollIntoView({ block: 'start' })
      el?.querySelector('summary')?.focus()
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label htmlFor="glossary-search" className="sr-only">
            {t.search}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 start-3 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="h-12 w-full rounded-lg border border-input bg-card pe-4 ps-10 text-base placeholder:text-muted-foreground"
          />
        </div>
        <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
                category === c.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-muted',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {results.length === 0 ? t.noResults : t.count(results.length)}
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {results.map((term) => {
          const isOpen = open.has(term.id)
          const cat = GLOSSARY_CATEGORIES.find((c) => c.id === term.category)
          return (
            <li key={term.id} id={`terme-${term.id}`}>
              <details
                open={isOpen}
                onToggle={(e) => setTermOpen(term.id, (e.currentTarget as HTMLDetailsElement).open)}
                className="group rounded-xl border bg-card open:border-primary/40"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 rounded-xl p-5 [&::-webkit-details-marker]:hidden">
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-lg font-semibold">{term.term}</span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                        {cat ? t.categories[cat.id] : null}
                      </span>
                    </span>
                    <span className="text-sm text-muted-foreground">{term.short}</span>
                  </div>
                  <ChevronDown
                    className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="flex flex-col gap-4 border-t px-5 py-4">
                  <p className="leading-relaxed">{term.detail}</p>
                  {term.example && (
                    <p className="rounded-lg bg-accent p-3 text-sm text-accent-foreground">
                      <span className="font-semibold">{t.example}</span>
                      {term.example}
                    </p>
                  )}
                  {term.related && term.related.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{t.related}</span>
                      {term.related
                        .filter((id) => termById[id])
                        .map((id) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => jumpTo(id)}
                            className="rounded-md px-1.5 py-0.5 font-medium text-primary underline underline-offset-4 hover:bg-muted"
                          >
                            {termById[id].term}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
