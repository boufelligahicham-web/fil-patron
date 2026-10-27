/**
 * Primitives SVG des illustrations pédagogiques.
 *
 * Aucune figure humaine ni animale : uniquement des objets de couture
 * (tissu, patron, mètre ruban, traits de construction).
 * Les couleurs passent par les variables CSS du thème (clair / sombre).
 */

import type { ReactNode } from 'react'

export const INK = 'var(--foreground)'
export const ACCENT = 'var(--primary)'
export const SOFT = 'var(--muted-foreground)'
export const FILL = 'color-mix(in oklch, var(--primary) 12%, transparent)'
export const FILL_SOFT = 'color-mix(in oklch, var(--muted-foreground) 10%, transparent)'

const RAD = Math.PI / 180

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  double = false,
  color = ACCENT,
  width = 1.5,
  head = 4.5,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  double?: boolean
  color?: string
  width?: number
  head?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const tip = (x: number, y: number, a: number) => {
    const left = `${x - head * Math.cos(a - 0.5)} ${y - head * Math.sin(a - 0.5)}`
    const right = `${x - head * Math.cos(a + 0.5)} ${y - head * Math.sin(a + 0.5)}`
    return `${left} ${x} ${y} ${right}`
  }
  return (
    <g stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polyline points={tip(x2, y2, angle)} />
      {double && <polyline points={tip(x1, y1, angle + Math.PI)} />}
    </g>
  )
}

/** Mètre ruban : bande souple + graduations. */
export function Tape({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth={4} strokeOpacity={0.16} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth={1.3} strokeDasharray="3 2.2" />
    </g>
  )
}

/** Circonférence mesurée : ellipse en pointillés + flèche de sens. */
export function Ring({
  cx,
  cy,
  rx,
  ry,
  color = ACCENT,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
  color?: string
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={1.4} strokeDasharray="3.5 2.5" />
      <polyline
        points={`${cx + rx - 3} ${cy + 3.5} ${cx + rx} ${cy} ${cx + rx + 1.5} ${cy - 4}`}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

/** Pièce de tissu avec quelques lignes de chaîne. */
export function Cloth({
  x = 30,
  y = 24,
  w = 100,
  h = 72,
  grain = 0,
}: {
  x?: number
  y?: number
  w?: number
  h?: number
  grain?: number
}) {
  const lines = Array.from({ length: grain }, (_, i) => x + ((i + 1) * w) / (grain + 1))
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
      {lines.map((lx) => (
        <line key={lx} x1={lx} y1={y + 4} x2={lx} y2={y + h - 4} stroke={SOFT} strokeWidth={0.7} strokeOpacity={0.6} />
      ))}
    </g>
  )
}

export function Dashed({
  x1,
  y1,
  x2,
  y2,
  color = SOFT,
  width = 1.2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray="3.5 2.5" />
}

export function Label({
  x,
  y,
  children,
  anchor = 'middle',
  color = SOFT,
  size = 8,
  weight = 600,
}: {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
  color?: string
  size?: number
  weight?: number
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} fontFamily="inherit">
      {children}
    </text>
  )
}

/** Bouton vu de face. */
export function Button({ cx, cy, r = 3 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={FILL} stroke={INK} strokeWidth={1.1} />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={0.35} fill={SOFT} />
      <circle cx={cx + r * 0.3} cy={cy + r * 0.3} r={0.35} fill={SOFT} />
    </g>
  )
}

export function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 160 120" role="presentation" aria-hidden="true" className="block h-auto w-full">
      {children}
    </svg>
  )
}

/** Repère d'angle droit. */
export function Corner({ x, y, size = 6 }: { x: number; y: number; size?: number }) {
  return (
    <path
      d={`M ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${y + size}`}
      fill="none"
      stroke={SOFT}
      strokeWidth={1.1}
    />
  )
}

export { RAD }
