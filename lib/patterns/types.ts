import type { MeasurementKey, Measurements } from '@/lib/content/measurements'

export type PatternPoint = { id: string; x: number; y: number }

export type Line = [x1: number, y1: number, x2: number, y2: number]

export type PatternPiece = {
  id: string
  name: string
  cut: string
  bbox: { x: number; y: number; w: number; h: number }
  path: string
  points: PatternPoint[]
  grain: Line
  fold?: Line
  marks?: { d: string; label?: string }[]
}

export type ComputedValue = {
  key: string
  label: string
  formula: string
  value: number
}

export type PatternResult = {
  values: ComputedValue[]
  pieces: PatternPiece[]
  fabricCm: number
}

export type PatternStep = {
  title: string
  body: (v: Record<string, number>) => string
  tip?: string
}

export type PatternDef = {
  slug: string
  name: string
  tagline: string
  level: 'Débutant' | 'Intermédiaire'
  description: string
  fabrics: string
  requiredMeasurements: MeasurementKey[]
  compute: (m: Measurements) => PatternResult
  steps: PatternStep[]
}

export function fmt(n: number) {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })
}

export function cm(n: number) {
  return `${fmt(n)} cm`
}

export function r1(n: number) {
  return Math.round(n * 10) / 10
}

export function valuesToRecord(values: ComputedValue[]) {
  return Object.fromEntries(values.map((v) => [v.key, v.value]))
}

export function bodyPath(opts: {
  neckWidth: number
  neckDepth: number
  shoulderX: number
  slope: number
  chestX: number
  armholeY: number
  hemX: number
  length: number
}) {
  const { neckWidth: ne, neckDepth: nd, shoulderX: sx, slope, chestX: w, armholeY: p, hemX: h, length: l } = opts
  return [
    `M 0 ${nd}`,
    `C ${ne * 0.6} ${nd} ${ne} ${nd * 0.5} ${ne} 0`,
    `L ${sx} ${slope}`,
    `C ${sx - 1.5} ${p * 0.55} ${sx + (w - sx) * 0.15} ${p} ${w} ${p}`,
    `L ${h} ${l - 1.5}`,
    `Q ${h * 0.5} ${l} 0 ${l}`,
    'Z',
  ].join(' ')
}

export function sleevePath(width: number, capHeight: number, wrist: number, length: number) {
  const s = width
  const t = capHeight
  const inset = (s - wrist) / 2
  return [
    `M 0 ${t}`,
    `C ${s * 0.25} ${t} ${s * 0.35} 0 ${s / 2} 0`,
    `C ${s * 0.65} 0 ${s * 0.75} ${t} ${s} ${t}`,
    `L ${s - inset} ${length}`,
    `L ${inset} ${length}`,
    'Z',
  ].join(' ')
}
