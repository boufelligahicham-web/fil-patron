'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  Captions,
  CaptionsOff,
  CornerDownLeft,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react'
import { useLocale, useTranslations } from '@/components/locale-provider'
import { cn } from '@/lib/utils'

const CHAPTER_SECONDS = 18
const SPEEDS = [1, 1.25, 1.5, 2] as const

function clock(seconds: number) {
  const safe = Math.max(0, Math.round(seconds))
  const min = Math.floor(safe / 60)
  const sec = safe % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/* ------------------------------------------------------------------ */
/* Le schéma : un patron qui se trace, sans image ni être vivant.      */
/* ------------------------------------------------------------------ */

function FilmScene({ time }: { time: number }) {
  const uid = useId()
  const pathRef = useRef<SVGPathElement>(null)
  const penRef = useRef<SVGGElement>(null)

  // La courbe se dessine entre 2 s et 36 s, puis les contrôles apparaissent.
  const draw = clamp((time - 2) / 34, 0, 1)
  const gridId = `${uid}-grid`
  const glowId = `${uid}-glow`

  useEffect(() => {
    const path = pathRef.current
    const pen = penRef.current
    if (!path || !pen) return
    const point = path.getPointAtLength(path.getTotalLength() * draw)
    pen.setAttribute('transform', `translate(${point.x} ${point.y})`)
  }, [draw])

  return (
    <svg
      viewBox="0 0 640 360"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" className="fill-none stroke-border/60" strokeWidth="0.6" />
        </pattern>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="640" height="360" className="fill-card" />
      <rect width="640" height="360" fill={`url(#${gridId})`} />
      <circle cx="330" cy="160" r="150" fill={`url(#${glowId})`} className="text-primary" />

      {/* Le bloc de patron : ligne de milieu, épaule, côté, ourlet. */}
      <g className="stroke-border" strokeWidth="1.6" fill="none">
        <path d="M170 60 L250 60 C262 60 268 72 276 82" strokeDasharray="5 5" />
        <path d="M170 60 L170 318" strokeDasharray="6 6" />
        <path d="M276 82 L330 92" className="stroke-foreground/70" />
        <path d="M262 246 L262 318" className="stroke-foreground/70" />
        <path d="M170 318 L262 318" className="stroke-foreground/70" />
      </g>

      {/* Ligne de poitrine et construction de l'emmanchure. */}
      <g
        className="stroke-champagne/70 transition-opacity duration-500"
        strokeWidth="1"
        strokeDasharray="4 5"
        fill="none"
        opacity={time >= 6 ? 1 : 0}
      >
        <path d="M170 246 L330 246" />
        <path d="M330 92 L330 246" />
      </g>

      {/* La courbe d'emmanchure, tracée par la plume. */}
      <path
        ref={pathRef}
        d="M330 92 C 344 128 336 160 306 190 C 285 212 270 228 262 246"
        pathLength={1}
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset={1 - draw}
        className="stroke-primary"
      />

      {/* Repère d'aisselle : encoche. */}
      <g
        className="fill-champagne transition-opacity duration-500"
        opacity={time >= 14 ? 1 : 0}
      >
        <path d="M262 246 L254 236 L270 236 Z" />
      </g>

      {/* Contrôle de tombée à 45°. */}
      <g
        className="stroke-champagne/80 transition-opacity duration-500"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        fill="none"
        opacity={time >= 36 ? 1 : 0}
      >
        <path d="M262 246 L306 202" />
        <path d="M284 216 A 34 34 0 0 0 284 216" />
        <path d="M262 224 A 22 22 0 0 1 284 246" />
      </g>

      {/* Ruban de vérification, posé sur la couture. */}
      <g
        className="stroke-secondary-foreground transition-opacity duration-500"
        strokeWidth="2"
        strokeDasharray="2 4"
        fill="none"
        opacity={time >= 54 ? 1 : 0}
      >
        <path d="M342 98 C 364 142 350 194 306 220" />
      </g>

      {/* Flèche de droit-fil. */}
      <g className="stroke-foreground/40" strokeWidth="1.2" fill="none">
        <path d="M204 108 L204 212" />
        <path d="M204 108 L199 118 M204 108 L209 118" />
        <path d="M204 212 L199 202 M204 212 L209 202" />
      </g>

      {/* Plume de tracé. */}
      <g ref={penRef} className="text-primary" transform="translate(330 92)">
        <circle r="14" fill={`url(#${glowId})`} />
        <circle r="4.5" className="fill-primary pen-dot" />
        <circle r="7.5" className="fill-none stroke-primary/40" strokeWidth="1" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* La démonstration : carte de lancement + lecteur modal.             */
/* ------------------------------------------------------------------ */

export function AtelierFilm({
  compact = false,
  className,
}: {
  compact?: boolean
  className?: string
}) {
  const t = useTranslations()
  const locale = useLocale()
  const chapters = t.film.chapters
  const duration = chapters.length * CHAPTER_SECONDS

  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [speed, setSpeed] = useState<number>(1)
  const [captions, setCaptions] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const chapterIndex = clamp(Math.floor(time / CHAPTER_SECONDS), 0, chapters.length - 1)
  const chapter = chapters[chapterIndex]

  /* Lecture : une horloge unique, mise à l'échelle par la vitesse. */
  useEffect(() => {
    if (!open || !playing) return
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = (now - last) / 1000
      last = now
      setTime((value) => clamp(value + delta * speed, 0, duration))
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [open, playing, speed, duration])

  useEffect(() => {
    if (time >= duration) setPlaying(false)
  }, [time, duration])

  const openFilm = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      triggerRef.current = event.currentTarget
      setOpen(true)
      setTime(0)
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setPlaying(!reduced)
      window.setTimeout(() => closeRef.current?.focus(), 30)
    },
    [],
  )

  const close = useCallback(() => {
    setOpen(false)
    setPlaying(false)
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
    triggerRef.current?.focus()
  }, [])

  const seek = useCallback(
    (value: number) => {
      setTime(clamp(value, 0, duration))
    },
    [duration],
  )

  /* Plein écran. */
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await dialogRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      /* Le navigateur peut refuser : la démonstration reste lisible. */
    }
  }, [])

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  /* Verrouille le fond et gère le clavier tant que le lecteur est ouvert. */
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const inField =
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName)

      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!nodes?.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }

      if (inField) return

      if (event.key === ' ' || event.key === 'k') {
        event.preventDefault()
        setPlaying((value) => !value)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setTime((value) => clamp(value - 5, 0, duration))
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setTime((value) => clamp(value + 5, 0, duration))
      } else if (event.key === 'c') {
        setCaptions((value) => !value)
      } else if (event.key === 'f') {
        void toggleFullscreen()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close, duration, toggleFullscreen])

  const nextSpeed = () => {
    const index = SPEEDS.indexOf(speed as (typeof SPEEDS)[number])
    setSpeed(SPEEDS[(index + 1) % SPEEDS.length])
  }

  const speedLabel =
    locale === 'ar' ? String(speed).replace('.', '٫') : String(speed).replace('.', ',')

  return (
    <section
      className={cn(
        'rounded-2xl border border-border bg-card shadow-soft',
        className,
      )}
      aria-labelledby={titleId}
    >
      <div className="grid overflow-hidden rounded-2xl md:grid-cols-[1.2fr_1fr]">
        <button
          type="button"
          onClick={openFilm}
          className="group relative block aspect-video w-full overflow-hidden border-b border-border bg-muted text-start md:border-e md:border-b-0"
          aria-label={t.film.open}
        >
          <FilmScene time={52} />
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-12 place-items-center rounded-full bg-card/90 text-primary shadow-lift backdrop-blur transition-transform group-hover:scale-110">
              <Play className="ms-0.5 size-5" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute start-2.5 top-2.5 inline-flex items-center gap-1 rounded border border-white/20 bg-[rgba(0,0,0,0.62)] px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            <Sparkles className="size-3" aria-hidden="true" />
            {t.film.live}
          </span>
          <span className="absolute end-2.5 bottom-2.5 rounded bg-[rgba(0,0,0,0.7)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
            {clock(duration)}
          </span>
        </button>

        <div className="flex flex-col gap-2 p-4">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-primary uppercase">
            <Sparkles className="size-3" aria-hidden="true" />
            {t.film.title}
          </p>
          <h2 id={titleId} className={cn('font-semibold', compact ? 'text-sm' : 'text-lg')}>
            {compact ? t.film.title : t.home.masterclass.title}
          </h2>
          {!compact && (
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
              {t.home.masterclass.text}
            </p>
          )}

          <ol className="mt-1 flex flex-col gap-0.5">
            {chapters.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget
                    setOpen(true)
                    setTime(index * CHAPTER_SECONDS)
                    setPlaying(true)
                    window.setTimeout(() => closeRef.current?.focus(), 30)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-start text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="font-mono text-[10px] tabular-nums text-primary">
                    {clock(index * CHAPTER_SECONDS)}
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={openFilm}
            className="glow mt-auto inline-flex h-9 w-fit items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Play className="size-3.5" aria-hidden="true" />
            {t.film.open}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.film.title}
            className={cn(
              'flex w-full flex-col overflow-hidden border border-border bg-card text-foreground shadow-lift',
              isFullscreen
                ? 'h-full max-w-none rounded-none'
                : 'max-w-3xl rounded-2xl',
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="size-2 shrink-0 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                <p className="truncate font-serif text-sm font-semibold">{t.film.title}</p>
                <span className="hidden shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground sm:inline">
                  {t.film.chapter(chapterIndex + 1, chapters.length)}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={t.film.close}
                title={t.film.close}
                className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-muted">
              <div className="aspect-video w-full">
                <FilmScene time={time} />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center p-3">
                {captions ? (
                  <p
                    key={chapter.title}
                    className="max-w-xl rounded-lg border border-white/15 bg-[rgba(0,0,0,0.8)] px-3 py-1.5 text-center text-xs leading-5 text-white backdrop-blur-sm sm:text-sm"
                  >
                    {chapter.caption}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border px-3 py-2.5 sm:px-4">
              <div className="flex items-center gap-2.5">
                <span className="w-10 shrink-0 text-end font-mono text-[11px] tabular-nums text-muted-foreground">
                  {clock(time)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={time}
                  onChange={(event) => seek(Number(event.target.value))}
                  aria-label={t.film.timeline}
                  aria-valuetext={`${clock(time)} / ${clock(duration)}`}
                  className="h-1.5 w-full cursor-pointer accent-primary"
                />
                <span className="w-10 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {clock(duration)}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPlaying((value) => !value)}
                    aria-label={playing ? t.film.pause : t.film.play}
                    title={playing ? t.film.pause : t.film.play}
                    className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {playing ? (
                      <Pause className="size-4" aria-hidden="true" />
                    ) : (
                      <Play className="ms-0.5 size-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTime(0)
                      setPlaying(false)
                    }}
                    aria-label={t.film.restart}
                    title={t.film.restart}
                    className="grid size-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                  </button>
                  <span className="hidden rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground sm:inline">
                    {t.film.chapter(chapterIndex + 1, chapters.length)} · {chapter.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={nextSpeed}
                    aria-label={`${t.film.speed} : ${speedLabel}×`}
                    title={t.film.speed}
                    className="rounded-md border border-border bg-card px-2 py-1 font-mono text-[11px] font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {speedLabel}×
                  </button>
                  <button
                    type="button"
                    onClick={() => setCaptions((value) => !value)}
                    aria-pressed={captions}
                    aria-label={t.film.captions}
                    title={captions ? t.film.captionsOn : t.film.captionsOff}
                    className={cn(
                      'grid size-8 place-items-center rounded-lg border transition-colors',
                      captions
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {captions ? (
                      <Captions className="size-4" aria-hidden="true" />
                    ) : (
                      <CaptionsOff className="size-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => void toggleFullscreen()}
                    aria-label={isFullscreen ? t.film.exitFullscreen : t.film.fullscreen}
                    title={isFullscreen ? t.film.exitFullscreen : t.film.fullscreen}
                    className="grid size-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="size-4" aria-hidden="true" />
                    ) : (
                      <Maximize2 className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <p className="flex items-center gap-1.5 border-t border-border pt-2 text-[10px] leading-4 text-muted-foreground">
                <CornerDownLeft className="size-3 shrink-0" aria-hidden="true" />
                {t.film.hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
