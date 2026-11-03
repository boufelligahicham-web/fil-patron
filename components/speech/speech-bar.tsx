'use client'

import { AudioLines, Pause, Play, Square } from 'lucide-react'
import { useTranslations } from '@/components/locale-provider'
import { estimateMinutes, useSpeech } from '@/components/speech/speech-provider'
import { cn } from '@/lib/utils'

function clock(seconds: number) {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/**
 * Barre « Guide vocal » : lecture du carnet à voix haute, avec égaliseur,
 * minuteur et arrêt. Le texte vient de la page, la lecture est partagée avec
 * le bouton d'écoute de l'en-tête.
 */
export function SpeechBar({ text, className }: { text: string; className?: string }) {
  const t = useTranslations()
  const { status, progress, elapsed, voiceName, toggle, stop, title } = useSpeech()

  if (status === 'unsupported') {
    return (
      <p className={cn('rounded-xl border border-dashed border-border bg-card/60 p-3 text-xs text-muted-foreground', className)}>
        {t.audio.unsupported}
      </p>
    )
  }

  const speaking = status === 'speaking'
  const paused = status === 'paused'
  const active = speaking || paused
  const stateLabel = speaking ? t.audio.speaking : paused ? t.audio.paused : t.audio.ready
  const playLabel = speaking ? t.audio.pause : paused ? t.audio.resume : t.audio.play
  const minutes = estimateMinutes(text)

  return (
    <section
      aria-label={t.audio.badge}
      className={cn('glass relative overflow-hidden rounded-2xl p-3 shadow-soft', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playLabel}
            title={playLabel}
            className="glow grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95"
          >
            {speaking ? (
              <Pause className="size-5" aria-hidden="true" />
            ) : (
              <Play className="ms-0.5 size-5" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-foreground">{t.audio.badge}</span>
              <span
                className={cn(
                  'rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide',
                  active
                    ? 'border-primary/40 bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-muted-foreground',
                )}
              >
                {stateLabel}
              </span>
            </div>
            <p className="line-clamp-1 text-[11px] text-muted-foreground">
              {title ?? t.audio.hint}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={cn('flex h-5 items-end gap-[3px] text-primary', speaking && 'eq-playing')}
          >
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
          </span>
          <button
            type="button"
            onClick={stop}
            disabled={!active}
            aria-label={t.audio.stop}
            title={t.audio.stop}
            className="grid size-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40"
          >
            <Square className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-border/70 pt-2 text-[11px] text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <AudioLines className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{voiceName ?? t.audio.voice}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 tabular-nums">
          <span className="font-semibold text-primary">{clock(elapsed)}</span>
          <span aria-hidden="true">/</span>
          <span>{t.audio.estimate(minutes)}</span>
        </span>
      </div>

      <div
        className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={t.audio.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </section>
  )
}
