'use client'

import { useId } from 'react'
import type { Locale } from '@/lib/i18n'
import { cmUnit, formatNumber, pointLabel } from '@/lib/patterns/localized'
import type { PatternPiece } from '@/lib/patterns/types'

type DiagramLabels = {
  grain: string
  fold: string
  point: string
  grid: string
  foldLabel: string
}

const GAP = 10
const PAD = 8

export function PatternDiagram({
  pieces,
  title,
  description,
  labels,
  locale,
}: {
  pieces: PatternPiece[]
  title: string
  description: string
  labels: DiagramLabels
  locale: Locale
}) {
  const id = useId()
  const offsets: number[] = []
  let cursor = PAD
  for (const p of pieces) {
    offsets.push(cursor)
    cursor += p.bbox.w + GAP
  }
  const totalW = cursor - GAP + PAD
  const minY = Math.min(...pieces.map((p) => p.bbox.y))
  const maxY = Math.max(...pieces.map((p) => p.bbox.y + p.bbox.h))
  const top = minY - PAD - 6
  const totalH = maxY - top + PAD
  const fs = Math.max(totalW, totalH) / 48

  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <svg
        viewBox={`0 ${top} ${totalW} ${totalH}`}
        role="img"
        aria-labelledby={`${id}-t ${id}-d`}
        className="h-auto max-h-[70vh] w-full"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <title id={`${id}-t`}>{title}</title>
        <desc id={`${id}-d`}>{description}</desc>
        <defs>
          <pattern id={`${id}-grid`} width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="var(--border)" strokeWidth={0.15} />
          </pattern>
          <marker
            id={`${id}-arrow`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-foreground)" />
          </marker>
        </defs>
        <rect x={0} y={top} width={totalW} height={totalH} fill={`url(#${id}-grid)`} />
        {pieces.map((piece, i) => {
          const ox = offsets[i]
          const [gx1, gy1, gx2, gy2] = piece.grain
          return (
            <g key={piece.id} transform={`translate(${ox} 0)`}>
              <text
                x={0}
                y={piece.bbox.y - fs * 1.2}
                fontSize={fs * 1.1}
                fontWeight={600}
                fill="var(--foreground)"
              >
                {piece.name}
              </text>
              <path
                d={piece.path}
                fill="color-mix(in oklch, var(--primary) 10%, transparent)"
                stroke="var(--foreground)"
                strokeWidth={0.45}
                strokeLinejoin="round"
              />
              {piece.fold && (
                <g>
                  <line
                    x1={piece.fold[0]}
                    y1={piece.fold[1]}
                    x2={piece.fold[2]}
                    y2={piece.fold[3]}
                    stroke="var(--primary)"
                    strokeWidth={0.9}
                    strokeDasharray="2.5 1.5"
                  />
                  <text
                    x={piece.fold[0] + fs * 0.5}
                    y={(piece.fold[1] + piece.fold[3]) / 2}
                    fontSize={fs * 0.8}
                    fill="var(--primary)"
                    fontWeight={600}
                    transform={`rotate(90 ${piece.fold[0] + fs * 0.5} ${(piece.fold[1] + piece.fold[3]) / 2})`}
                    textAnchor="middle"
                  >
                    {labels.foldLabel}
                  </text>
                </g>
              )}
              {piece.marks?.map((m, mi) => (
                <path
                  key={mi}
                  d={m.d}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeWidth={0.3}
                  strokeDasharray="1.2 0.8"
                />
              ))}
              <line
                x1={gx1}
                y1={gy1}
                x2={gx2}
                y2={gy2}
                stroke="var(--accent-foreground)"
                strokeWidth={0.5}
                markerStart={`url(#${id}-arrow)`}
                markerEnd={`url(#${id}-arrow)`}
              />
              {piece.points.map((pt) => (
                <g key={pt.id}>
                  <circle cx={pt.x} cy={pt.y} r={fs * 0.22} fill="var(--accent-foreground)" />
                  <text
                    x={pt.x + fs * 0.35}
                    y={pt.y - fs * 0.35}
                    fontSize={fs * 0.85}
                    fontWeight={600}
                    fill="var(--foreground)"
                  >
                    {pointLabel(locale, pt.id)}
                  </text>
                </g>
              ))}
              <text
                x={0}
                y={piece.bbox.y + piece.bbox.h + fs * 1.4}
                fontSize={fs * 0.8}
                fill="var(--muted-foreground)"
              >
                {`${piece.cut} · ${formatNumber(piece.bbox.w, locale)} × ${formatNumber(piece.bbox.h, locale)} ${cmUnit(locale)}`}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="flex flex-wrap gap-x-5 gap-y-2 border-t px-4 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 bg-accent-foreground" />
          {labels.grain}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0 w-6 border-t-2 border-dashed border-primary" />
          {labels.fold}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent-foreground" />
          {labels.point}
        </span>
        <span>{labels.grid}</span>
      </figcaption>
    </figure>
  )
}
