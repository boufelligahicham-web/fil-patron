'use client'

import Link from 'next/link'
import { useOptimistic, useState, useTransition } from 'react'
import { Check, Lightbulb } from 'lucide-react'
import { setLessonProgress } from '@/app/actions'
import { useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

type Step = { slug: string; title: string; body: string; tip?: string }

export function StepChecklist({
  steps,
  initialCompleted,
  isAuthed,
}: {
  steps: Step[]
  initialCompleted: string[]
  isAuthed: boolean
}) {
  const t = useTranslations().ui.stepChecklist
  const [completed, setCompleted] = useState(() => new Set(initialCompleted))
  const [optimistic, setOptimistic] = useOptimistic(
    completed,
    (state, { slug, done }: { slug: string; done: boolean }) => {
      const next = new Set(state)
      if (done) next.add(slug)
      else next.delete(slug)
      return next
    },
  )
  const [, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const doneCount = steps.filter((s) => optimistic.has(s.slug)).length

  function toggle(slug: string, done: boolean, title: string) {
    startTransition(async () => {
      setOptimistic({ slug, done })
      const res = await setLessonProgress(slug, done)
      if (res.ok) {
        setCompleted((prev) => {
          const next = new Set(prev)
          if (done) next.add(slug)
          else next.delete(slug)
          return next
        })
        setMessage(done ? t.doneMessage(title) : t.undoneMessage(title))
      } else {
        setMessage(res.error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {isAuthed ? (
            <>
              <span className="font-semibold text-foreground">{`${doneCount} / ${steps.length}`}</span>
              {t.doneCountSuffix}
            </>
          ) : (
            <>
              <Link href="/auth/connexion" className="font-medium text-primary underline underline-offset-4">
                {t.loginPrefix}
              </Link>
              {t.loginSuffix}
            </>
          )}
        </p>
        {isAuthed && (
          <div
            className="h-2 w-40 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label={t.progress}
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={doneCount}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(doneCount / steps.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>

      <ol className="flex flex-col gap-4">
        {steps.map((step, i) => {
          const done = optimistic.has(step.slug)
          const inputId = `step-${step.slug.replace(/\W/g, '-')}`
          return (
            <li
              key={step.slug}
              className={cn(
                'rounded-xl border bg-card p-5 transition-colors',
                done && 'border-primary/40 bg-primary/5',
              )}
            >
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full border font-serif font-semibold',
                    done ? 'border-primary bg-primary text-primary-foreground' : 'bg-background',
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="text-lg font-semibold">
                    <span className="sr-only">{t.step(i + 1)}</span>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-pretty">{step.body}</p>
                  {step.tip && (
                    <p className="flex gap-2 rounded-lg bg-accent p-3 text-sm text-accent-foreground">
                      <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="font-semibold">{t.tip}</span>
                        {step.tip}
                      </span>
                    </p>
                  )}
                  {isAuthed && (
                    <div className="flex items-center gap-2">
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={done}
                        onChange={(e) => toggle(step.slug, e.target.checked, step.title)}
                        className="size-5 accent-[var(--primary)]"
                      />
                      <label htmlFor={inputId} className="text-sm font-medium">
                        {t.checkbox}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
