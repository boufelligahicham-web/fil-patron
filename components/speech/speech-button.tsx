'use client'

import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { useSpeech } from '@/components/speech/speech-provider'
import { cn } from '@/lib/utils'

/**
 * Bouton d'écoute présent dans l'en-tête, sur toutes les pages.
 *
 * Il lit la narration déposée par la page, ou à défaut le contenu principal.
 * Le libellé reste visible dès `sm` : l'action est identifiable sans survol,
 * ce qui compte sur un site où l'audio est le mode de lecture principal.
 */
export function SpeechButton({ className }: { className?: string }) {
  const t = useTranslations()
  const { status, toggle } = useSpeech()

  if (status === 'unsupported') {
    return (
      <span
        title={t.audio.unsupported}
        className={cn(
          'grid size-9 place-items-center rounded-full border border-border/70 text-muted-foreground/60',
          className,
        )}
      >
        <VolumeX className="size-4" aria-hidden="true" />
        <span className="sr-only">{t.audio.unsupported}</span>
      </span>
    )
  }

  const speaking = status === 'speaking'
  const paused = status === 'paused'
  const label = speaking ? t.audio.pause : paused ? t.audio.resume : t.audio.listen

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      aria-label={label}
      title={label}
      className={cn(
        'group flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold transition-colors',
        speaking || paused
          ? 'border-primary/50 bg-primary text-primary-foreground'
          : 'border-border/80 bg-card/70 text-foreground hover:border-primary/50 hover:text-primary',
        className,
      )}
    >
      {speaking ? (
        <Pause className="size-4 shrink-0" aria-hidden="true" />
      ) : paused ? (
        <Play className="size-4 shrink-0" aria-hidden="true" />
      ) : (
        <Volume2 className="size-4 shrink-0" aria-hidden="true" />
      )}
      <span className="hidden whitespace-nowrap sm:inline">
        {speaking ? t.audio.speaking : paused ? t.audio.paused : t.audio.quick}
      </span>
      {speaking ? (
        <span aria-hidden="true" className="eq-playing flex h-3.5 items-end gap-[2px]">
          <span className="eq-bar !w-[2px]" />
          <span className="eq-bar !w-[2px]" />
          <span className="eq-bar !w-[2px]" />
        </span>
      ) : null}
    </button>
  )
}
