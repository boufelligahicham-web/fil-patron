'use client'

import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import { RotateCcw, Save } from 'lucide-react'
import { saveMeasurements } from '@/app/actions'
import { useLocale, useTranslations } from '@/components/locale-provider'
import { Button } from '@/components/ui/button'
import { ValuesTable } from '@/components/values-table'
import {
  DEFAULT_MEASUREMENTS,
  MEASUREMENTS,
  type MeasurementKey,
  type Measurements,
} from '@/lib/content/measurements'
import { dateLocale, patternText } from '@/lib/i18n'
import { PATTERNS } from '@/lib/patterns'
import { cmUnit, formatNumber, patternValues } from '@/lib/patterns/localized'
import { cn } from '@/lib/utils'

type Draft = Record<MeasurementKey, string>

const toDraft = (m: Measurements) =>
  Object.fromEntries(Object.entries(m).map(([k, v]) => [k, String(v)])) as Draft

export function MeasurementCalculator({
  initial,
  isAuthed,
  updatedAt,
}: {
  initial: Measurements
  isAuthed: boolean
  updatedAt: string | null
}) {
  const locale = useLocale()
  const dictionary = useTranslations()
  const t = dictionary.ui.calculator
  const [draft, setDraft] = useState<Draft>(() => toDraft(initial))
  const [activePattern, setActivePattern] = useState(PATTERNS[0].slug)
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  const errors = useMemo(() => {
    const e: Partial<Record<MeasurementKey, string>> = {}
    for (const def of MEASUREMENTS) {
      const raw = draft[def.key].replace(',', '.').trim()
      const n = Number(raw)
      if (raw === '' || !Number.isFinite(n)) e[def.key] = t.numberError
      else if (n < def.min || n > def.max) e[def.key] = t.rangeError(def.min, def.max)
    }
    return e
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, locale])

  const hasErrors = Object.keys(errors).length > 0

  const measurements = useMemo(() => {
    const m = { ...DEFAULT_MEASUREMENTS }
    for (const def of MEASUREMENTS) {
      if (!errors[def.key]) m[def.key] = Number(draft[def.key].replace(',', '.'))
    }
    return m
  }, [draft, errors])

  const pattern = PATTERNS.find((p) => p.slug === activePattern) ?? PATTERNS[0]
  const result = useMemo(() => pattern.compute(measurements), [pattern, measurements])

  function onSave() {
    setStatus(null)
    if (hasErrors) {
      setStatus({ kind: 'error', text: t.fixFields })
      return
    }
    startTransition(async () => {
      const res = await saveMeasurements(measurements)
      setStatus(res.ok ? { kind: 'ok', text: t.saved } : { kind: 'error', text: res.error })
    })
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <form
        className="flex flex-col gap-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onSave()
        }}
        aria-describedby="calc-help"
      >
        <p id="calc-help" className="text-sm text-muted-foreground">
          {t.helpBefore}
          <Link href="/cours/mesures" className="font-medium text-primary underline underline-offset-4">
            {t.helpLink}
          </Link>
          {t.helpAfter}
        </p>
        {(['tours', 'hauteurs'] as const).map((group) => (
          <fieldset key={group} className="flex flex-col gap-4">
            <legend className="mb-2 text-xl font-semibold">{t.groups[group]}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {MEASUREMENTS.filter((m) => m.group === group).map((def) => {
                const id = `m-${def.key}`
                const err = errors[def.key]
                return (
                  <div key={def.key} className="flex flex-col gap-1.5">
                    <label htmlFor={id} className="text-sm font-medium">
                      {dictionary.measurements[def.key] ?? def.label}
                    </label>
                    <div className="relative" dir="ltr">
                      <input
                        id={id}
                        name={def.key}
                        inputMode="decimal"
                        autoComplete="off"
                        value={draft[def.key]}
                        onChange={(e) => setDraft((d) => ({ ...d, [def.key]: e.target.value }))}
                        aria-invalid={Boolean(err)}
                        aria-describedby={err ? `${id}-err` : undefined}
                        className={cn(
                          'h-11 w-full rounded-lg border border-input bg-card pe-12 ps-3 text-base tabular-nums',
                          err && 'border-destructive',
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 end-3 -translate-y-1/2 text-sm text-muted-foreground"
                      >
                        {cmUnit(locale)}
                      </span>
                    </div>
                    {err && (
                      <p id={`${id}-err`} className="text-sm text-destructive">
                        {err}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
          {isAuthed ? (
            <div className="flex flex-wrap gap-3">
              <Button type="submit" size="lg" className="h-11 px-4" disabled={pending}>
                <Save aria-hidden="true" />
                {pending ? t.saving : t.save}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 px-4"
                onClick={() => setDraft(toDraft(DEFAULT_MEASUREMENTS))}
              >
                <RotateCcw aria-hidden="true" />
                {t.sample}
              </Button>
            </div>
          ) : (
            <p className="text-sm">
              <Link href="/auth/connexion" className="font-medium text-primary underline underline-offset-4">
                {t.loginPrefix}
              </Link>
              {t.loginSuffix}
            </p>
          )}
          {updatedAt && isAuthed && (
            <p className="text-xs text-muted-foreground">
              {t.lastSaved(
                new Date(updatedAt).toLocaleDateString(dateLocale(locale), { dateStyle: 'long' }),
              )}
            </p>
          )}
          <p
            role="status"
            aria-live="polite"
            className={cn('text-sm', status?.kind === 'error' ? 'text-destructive' : 'text-primary')}
          >
            {status?.text}
          </p>
        </div>
      </form>

      <section aria-labelledby="resultats" className="flex flex-col gap-4 lg:sticky lg:top-24">
        <h2 id="resultats" className="text-xl font-semibold">
          {t.results}
        </h2>
        <div role="group" aria-label={t.choosePattern} className="flex flex-wrap gap-2">
          {PATTERNS.map((p) => (
            <button
              key={p.slug}
              type="button"
              aria-pressed={p.slug === activePattern}
              onClick={() => setActivePattern(p.slug)}
              className={cn(
                'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
                p.slug === activePattern
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-muted',
              )}
            >
              {patternText(dictionary, p.slug).name}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="flex flex-col gap-3">
          <ValuesTable
            values={patternValues(locale, pattern, result.values)}
            caption={t.valuesCaption(patternText(dictionary, pattern.slug).name)}
            headings={dictionary.ui.valuesTable}
            locale={locale}
          />
          <p className="text-sm text-muted-foreground">
            {t.fabric(formatNumber(result.fabricCm / 100, locale))}
          </p>
        </div>
        {hasErrors && <p className="text-sm text-muted-foreground">{t.invalidUsesSample}</p>}
        <Link
          href={`/patrons/${pattern.slug}`}
          className="inline-flex h-11 w-fit items-center rounded-lg border bg-card px-4 text-sm font-medium hover:bg-muted"
        >
          {t.viewPattern(patternText(dictionary, pattern.slug).name)}
        </Link>
      </section>
    </div>
  )
}
