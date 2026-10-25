'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { setLessonProgress } from '@/app/actions'
import { useTranslations } from '@/components/locale-provider'
import { Button } from '@/components/ui/button'

export function LessonComplete({
  slug,
  initialDone,
  isAuthed,
}: {
  slug: string
  initialDone: boolean
  isAuthed: boolean
}) {
  const t = useTranslations().ui.lessonComplete
  const [done, setDone] = useState(initialDone)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  if (!isAuthed) {
    return (
      <p className="text-sm text-muted-foreground">
        <Link href="/auth/connexion" className="font-medium text-primary underline underline-offset-4">
          {t.loginPrefix}
        </Link>
        {t.loginSuffix}
      </p>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        size="lg"
        variant={done ? 'outline' : 'default'}
        aria-pressed={done}
        disabled={pending}
        className="h-11 px-4"
        onClick={() =>
          startTransition(async () => {
            setError('')
            const res = await setLessonProgress(slug, !done)
            if (res.ok) setDone(!done)
            else setError(res.error)
          })
        }
      >
        <CheckCircle2 aria-hidden="true" />
        {done ? t.done : t.mark}
      </Button>
      <p role="status" aria-live="polite" className="text-sm text-destructive">
        {error}
      </p>
    </div>
  )
}
