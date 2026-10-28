/**
 * Schémas de la leçon d'emmanchure.
 *
 * Géométrie réelle du gabarit TP 92, projetée à l'échelle du papier.
 * Aucune figure humaine : uniquement le patron, les cotes et les repères.
 * Tous les libellés sont fournis par le contenu bilingue.
 */

import type { ReactNode } from 'react'
import type { FigureText } from '@/lib/content/armhole'
import { formatNumber, formatNumber2, pointLabel } from '@/lib/patterns/localized'
import type { Locale } from '@/lib/i18n'
import { Arrow, Dashed, Label, ACCENT, SOFT, INK, FILL, FILL_SOFT } from './parts'

const CHAMPAGNE = 'var(--champagne)'
const PAPER = 'var(--card)'

/**
 * En arabe, la page est en `dir="rtl"` : `start` et `end` s'inversent, et une
 * étiquette prévue à droite du repère sortirait du cadre. On garde donc le
 * sens naturel du texte (RTL, lecture correcte des nombres mêlés) tout en
 * conservant la place prévue pour chaque étiquette.
 */
function anchorFor(locale: Locale) {
  return (a: 'start' | 'end' | 'middle'): 'start' | 'end' | 'middle' =>
    locale === 'ar' && a !== 'middle' ? (a === 'start' ? 'end' : 'start') : a
}

function Sheet({ children, viewBox = '0 0 220 210' }: { children: ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} role="presentation" aria-hidden="true" className="block h-auto w-full">
      {children}
    </svg>
  )
}

function Point({
  x,
  y,
  label,
  dx = 0,
  dy = 0,
  anchor = 'middle',
}: {
  x: number
  y: number
  label: string
  dx?: number
  dy?: number
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={2.1} fill={PAPER} stroke={INK} strokeWidth={1.1} />
      <circle cx={x} cy={y} r={0.7} fill={INK} />
      <Label x={x + dx} y={y + dy} anchor={anchor} color={INK} size={8} weight={700}>
        {label}
      </Label>
    </g>
  )
}

/** Quadrillage léger du papier de patron (5 cm). */
function Grid({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const cols = Array.from({ length: 6 }, (_, i) => x + ((i + 1) * w) / 6)
  const rows = Array.from({ length: 5 }, (_, i) => y + ((i + 1) * h) / 5)
  return (
    <g stroke={SOFT} strokeWidth={0.35} strokeOpacity={0.28}>
      {cols.map((cx) => (
        <line key={`c${cx}`} x1={cx} y1={y} x2={cx} y2={y + h} />
      ))}
      {rows.map((ry) => (
        <line key={`r${ry}`} x1={x} y1={ry} x2={x + w} y2={ry} />
      ))}
    </g>
  )
}

function Break({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const step = (x2 - x1) / 6
  const d = `M ${x1} ${y} l ${step / 2} -4 l ${step} 8 l ${step} -8 l ${step} 8 l ${step} -8 l ${step} 8 l ${step / 2} -4`
  return <path d={d} fill="none" stroke={SOFT} strokeWidth={1} />
}

/** Schéma 1 — le cadre, les points A à F et les cotes principales. */
export function ArmholeFrame({ locale, text }: { locale: Locale; text: FigureText }) {
  const n = (v: number) => formatNumber(v, locale)
  const p = (id: string) => pointLabel(locale, id)
  const an = anchorFor(locale)
  const x0 = 30
  const y0 = 20
  const sx = 5.2
  const sy = 5.6
  const X = (v: number) => x0 + v * sx
  const Y = (v: number) => y0 + v * sy

  // Points réels du gabarit.
  const A = [X(0), Y(2)]
  const B = [X(6.7), Y(0)]
  const C = [X(19.2), Y(3.5)]
  const D = [X(27), Y(23.5)]
  const F = [X(0), 185]
  const P1 = [X(17.7), Y(12.925)]
  const P2 = [X(20.37), Y(23.5)]
  const hollow = [X(18.794), Y(8.653)]

  const right = X(27)
  const chest = Y(23.5)
  const breakY = 185

  return (
    <Sheet>
      {/* Papier */}
      <rect x={8} y={8} width={204} height={196} rx={6} fill={PAPER} stroke="var(--tailor)" strokeWidth={0.8} />
      <Grid x={x0} y={y0} w={right - x0} h={breakY - y0} />

      {/* Cadre de construction */}
      <line x1={x0} y1={y0} x2={right} y2={y0} stroke={INK} strokeWidth={0.9} strokeDasharray="4 3" />
      <line x1={x0} y1={y0} x2={x0} y2={breakY} stroke={INK} strokeWidth={1.2} />
      <line x1={x0} y1={chest} x2={right} y2={chest} stroke={SOFT} strokeWidth={0.9} strokeDasharray="4 3" />
      <line x1={right} y1={y0} x2={right} y2={chest} stroke={SOFT} strokeWidth={0.8} strokeDasharray="3 3" />

      {/* Encolure, épaule, emmanchure, côté */}
      <path
        d={`M ${A[0]} ${A[1]} C ${X(4.02)} ${A[1]} ${B[0]} ${Y(1)} ${B[0]} ${B[1]}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
      <path
        d={`M ${C[0]} ${C[1]} C ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${D[0]} ${D[1]}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.1}
        strokeLinecap="round"
      />
      <line x1={D[0]} y1={D[1]} x2={174} y2={breakY} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <Break x1={x0} x2={176} y={breakY} />

      {/* Fond du patron (rappel) */}
      <Label x={x0 + 2} y={breakY - 16} anchor={an('start')} color={SOFT} size={6.2}>
        {text.breakLine}
      </Label>

      {/* Tangente en C */}
      <Dashed x1={C[0] - 1.4} y1={C[1] - 13} x2={C[0] - 4.6} y2={C[1] + 28} color={CHAMPAGNE} width={0.9} />
      <Label x={C[0] - 10} y={C[1] + 19} anchor={an('end')} color={CHAMPAGNE} size={5.8}>
        {text.tangent}
      </Label>

      {/* Cote largeur */}
      <Arrow x1={x0} y1={11} x2={right} y2={11} double color={SOFT} width={0.9} head={3.5} />
      <rect x={(x0 + right) / 2 - 11} y={6} width={22} height={10} rx={2} fill={PAPER} />
      <Label x={(x0 + right) / 2} y={13.5} color={INK} size={7} weight={700}>
        {`${n(27)} ${locale === 'ar' ? 'سم' : 'cm'}`}
      </Label>

      {/* Cote profondeur */}
      <Arrow x1={right + 15} y1={y0} x2={right + 15} y2={chest} double color={SOFT} width={0.9} head={3.5} />
      <g transform={`translate(${right + 21} ${(y0 + chest) / 2}) rotate(-90)`}>
        <rect x={-12} y={-5} width={24} height={10} rx={2} fill={PAPER} />
        <Label x={0} y={2.4} color={INK} size={7} weight={700}>
          {`${n(23.5)}`}
        </Label>
      </g>

      {/* Cote encolure */}
      <Arrow x1={x0} y1={Y(0) + 12} x2={B[0]} y2={Y(0) + 12} double color={SOFT} width={0.8} head={3} />
      <Label x={(x0 + B[0]) / 2} y={Y(0) + 20} color={SOFT} size={6.2}>
        {`${n(6.7)}`}
      </Label>

      {/* Repères nommés */}
      <Label x={x0 + 5} y={chest - 8} anchor={an('start')} color={SOFT} size={6.2}>
        {text.chestLine}
      </Label>
      <g transform={`translate(${x0 - 8} ${(y0 + breakY) / 2}) rotate(-90)`}>
        <Label x={0} y={0} color={SOFT} size={6.4}>
          {text.centerBack}
        </Label>
      </g>
      <Label x={118} y={47} anchor={an('end')} color={SOFT} size={6}>
        {text.shoulderSeam}
      </Label>
      <Label x={160} y={169} anchor={an('end')} color={SOFT} size={6}>
        {text.sideSeam}
      </Label>
      <Label x={hollow[0] - 8} y={hollow[1] + 18} anchor={an('end')} color={ACCENT} size={6.4} weight={700}>
        {text.armhole}
      </Label>
      <Dashed x1={hollow[0] - 7} y1={hollow[1] + 15} x2={hollow[0] - 1} y2={hollow[1] + 3} color={ACCENT} width={0.8} />

      {/* Points */}
      <Point x={A[0]} y={A[1]} label={p('A')} dx={-6} dy={4} anchor={an('end')} />
      <Point x={B[0]} y={B[1]} label={p('B')} dx={2} dy={-6} anchor={an('start')} />
      <Point x={C[0]} y={C[1]} label={p('C')} dx={5} dy={-4} anchor={an('start')} />
      <Point x={D[0]} y={D[1]} label={p('D')} dx={7} dy={-6} anchor={an('start')} />
      <Point x={174} y={breakY} label={p('E')} dx={4} dy={8} anchor={an('start')} />
      <Point x={F[0]} y={breakY} label={p('F')} dx={-5} dy={10} anchor={an('end')} />

      <Label x={110} y={201} color={SOFT} size={5.6}>
        {text.scaleNote}
      </Label>
    </Sheet>
  )
}

/** Schéma 2 — la courbe C–D et ses points de contrôle. */
export function ArmholeCurve({ locale, text }: { locale: Locale; text: FigureText }) {
  const n2 = (v: number) => formatNumber2(v, locale)
  const p = (id: string) => pointLabel(locale, id)
  const an = anchorFor(locale)
  const x0 = 42
  const y0 = 32
  const sx = 5
  const sy = 5.2
  const X = (v: number) => x0 + v * sx
  const Y = (v: number) => y0 + v * sy

  const C = [X(19.2), Y(3.5)]
  const D = [X(27), Y(23.5)]
  const P1 = [X(17.7), Y(12.925)]
  const P2 = [X(20.37), Y(23.5)]
  const hollow = [X(18.794), Y(8.653)]

  return (
    <Sheet>
      <rect x={8} y={8} width={204} height={196} rx={6} fill={PAPER} stroke="var(--tailor)" strokeWidth={0.8} />

      {/* Corde et poignées */}
      <Dashed x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} color={SOFT} width={0.9} />
      <Dashed x1={C[0]} y1={C[1]} x2={P1[0]} y2={P1[1]} color={CHAMPAGNE} width={0.9} />
      <Dashed x1={P2[0]} y1={P2[1]} x2={D[0]} y2={D[1]} color={CHAMPAGNE} width={0.9} />
      <line x1={P1[0]} y1={P1[1]} x2={P2[0]} y2={P2[1]} stroke={CHAMPAGNE} strokeWidth={0.6} strokeDasharray="2 3" strokeOpacity={0.7} />

      {/* Courbe */}
      <path
        d={`M ${C[0]} ${C[1]} C ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${D[0]} ${D[1]}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.6}
        strokeLinecap="round"
      />

      {/* Creux */}
      <circle cx={hollow[0]} cy={hollow[1]} r={2.4} fill={PAPER} stroke={CHAMPAGNE} strokeWidth={1.3} />
      <Dashed x1={hollow[0]} y1={hollow[1]} x2={hollow[0] - 26} y2={hollow[1]} color={CHAMPAGNE} width={0.7} />
      <Label x={hollow[0] - 28} y={hollow[1] + 2.4} anchor={an('end')} color={CHAMPAGNE} size={6.4} weight={700}>
        {`${text.hollow} · ${n2(0.41)}`}
      </Label>

      {/* Points de contrôle */}
      <circle cx={P1[0]} cy={P1[1]} r={1.9} fill={CHAMPAGNE} />
      <circle cx={P2[0]} cy={P2[1]} r={1.9} fill={CHAMPAGNE} />
      <Label x={P1[0] - 10} y={P1[1] + 2} anchor={an('end')} color={CHAMPAGNE} size={6.2} weight={700}>
        {text.control1}
      </Label>
      <Label x={P2[0] - 4} y={P2[1] + 14} anchor={an('end')} color={CHAMPAGNE} size={6.2} weight={700}>
        {text.control2}
      </Label>

      {/* Corde */}
      <Label x={112} y={140} anchor={an('end')} color={SOFT} size={6}>
        {text.chord}
      </Label>

      {/* Longueur d'arc */}
      <path
        d={`M ${C[0] + 10} ${C[1] - 9} Q ${X(24.5)} ${Y(9)} ${D[0] + 12} ${D[1] - 6}`}
        fill="none"
        stroke={CHAMPAGNE}
        strokeWidth={0.9}
        strokeDasharray="3 2.4"
      />
      <Label x={152} y={34} anchor={an('start')} color={CHAMPAGNE} size={7} weight={700}>
        {`${n2(23.85)} ${locale === 'ar' ? 'سم' : 'cm'}`}
      </Label>

      <Point x={C[0]} y={C[1]} label={p('C')} dx={0} dy={-6} />
      <Point x={D[0]} y={D[1]} label={p('D')} dx={0} dy={15} />
      <Label x={110} y={201} color={SOFT} size={5.6}>
        {text.scaleNote}
      </Label>
    </Sheet>
  )
}

/** Schéma 3 — les deux angles critiques. */
export function ArmholeAngles({ locale, text }: { locale: Locale; text: FigureText }) {
  const n = (v: number) => formatNumber(v, locale)
  const p = (id: string) => pointLabel(locale, id)
  const an = anchorFor(locale)

  return (
    <Sheet viewBox="0 0 260 130">
      <rect x={6} y={6} width={248} height={118} rx={6} fill={PAPER} stroke="var(--tailor)" strokeWidth={0.8} />
      <line x1={130} y1={16} x2={130} y2={114} stroke="var(--tailor)" strokeWidth={0.8} strokeDasharray="3 3" />

      {/* Panneau C */}
      <Label x={66} y={20} color={INK} size={7.5} weight={700}>
        {text.angleC}
      </Label>
      <line x1={30} y1={38} x2={82} y2={62} stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M 82 62 C 76 84 80 100 96 112" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <Dashed x1={82} y1={62} x2={94} y2={110} color={CHAMPAGNE} width={1} />
      <path d="M 62 77 A 26 26 0 0 0 88 88" fill="none" stroke={CHAMPAGNE} strokeWidth={0.9} />
      <Label x={58} y={101} color={CHAMPAGNE} size={7} weight={700}>
        {`${n(83.4)}°`}
      </Label>
      <Label x={22} y={32} anchor={an('start')} color={SOFT} size={5.8}>
        {text.shoulderSeam}
      </Label>
      <Point x={82} y={62} label={p('C')} dx={5} dy={-4} anchor={an('start')} />

      {/* Panneau D */}
      <Label x={196} y={20} color={INK} size={7.5} weight={700}>
        {text.angleD}
      </Label>
      <line x1={148} y1={78} x2={214} y2={78} stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
      <line x1={214} y1={78} x2={221} y2={116} stroke={INK} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M 186 78 A 28 28 0 0 1 214 106" fill="none" stroke={CHAMPAGNE} strokeWidth={0.9} />
      <Label x={176} y={100} color={CHAMPAGNE} size={7} weight={700}>
        {`${n(84.9)}°`}
      </Label>
      <Label x={148} y={70} anchor={an('start')} color={SOFT} size={5.8}>
        {text.tangent}
      </Label>
      <Label x={196} y={116} anchor="middle" color={SOFT} size={5.8}>
        {text.sideSeam}
      </Label>
      <Point x={214} y={78} label={p('D')} dx={-3} dy={-6} anchor={an('end')} />
    </Sheet>
  )
}

/** Schéma 4 — tête de manche contre emmanchure. */
export function SleeveCap({ locale, text }: { locale: Locale; text: FigureText }) {
  const n = (v: number) => formatNumber(v, locale)
  const an = anchorFor(locale)
  const unit = locale === 'ar' ? 'سم' : 'cm'

  // Barres proportionnelles : 1 cm = 2,75 px.
  const k = 2.75
  const cap = 45.5 * k
  const armhole = 47.7 * k
  const barX = 86

  return (
    <Sheet viewBox="0 0 260 212">
      <rect x={6} y={6} width={248} height={200} rx={6} fill={PAPER} stroke="var(--tailor)" strokeWidth={0.8} />

      {/* Manche */}
      <path
        d="M 66 76 C 94 76 108 48 130 48 C 152 48 166 76 194 76 L 178 140 L 82 140 Z"
        fill={FILL_SOFT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M 66 76 C 94 76 108 48 130 48 C 152 48 166 76 194 76" fill="none" stroke={ACCENT} strokeWidth={2.1} />
      <Dashed x1={66} y1={76} x2={194} y2={76} color={SOFT} width={0.8} />
      <line x1={66} y1={76} x2={66} y2={102} stroke={SOFT} strokeWidth={0.7} />
      <line x1={194} y1={76} x2={194} y2={102} stroke={SOFT} strokeWidth={0.7} />
      <Label x={130} y={38} color={ACCENT} size={6.8} weight={700}>
        {text.cap}
      </Label>
      <Label x={130} y={88} color={SOFT} size={6}>
        {`${n(7.8)} ${unit}`}
      </Label>

      {/* Barre : tête de manche */}
      <Label x={barX - 4} y={164} anchor={an('end')} color={SOFT} size={6.4}>
        {text.capLength}
      </Label>
      <rect x={barX} y={156} width={cap} height={9} rx={2.5} fill={FILL} stroke={ACCENT} strokeWidth={0.7} />
      <Label x={barX + cap / 2} y={163} color={ACCENT} size={6.4} weight={700}>
        {`${n(45.5)} ${unit}`}
      </Label>

      {/* Barre : emmanchure */}
      <Label x={barX - 4} y={184} anchor={an('end')} color={SOFT} size={6.4}>
        {text.armholeLength}
      </Label>
      <rect x={barX} y={176} width={armhole} height={9} rx={2.5} fill="none" stroke={INK} strokeWidth={0.8} />
      <Label x={barX + armhole / 2} y={183} color={INK} size={6.4} weight={700}>
        {`${n(47.7)} ${unit}`}
      </Label>

      {/* Écart */}
      <line x1={barX + cap} y1={158} x2={barX + armhole} y2={174} stroke={CHAMPAGNE} strokeWidth={0.9} strokeDasharray="2 2" />
      <Label x={130} y={202} anchor="middle" color={CHAMPAGNE} size={6.6} weight={700}>
        {`${text.difference} ${n(2.2)} ${unit}`}
      </Label>
    </Sheet>
  )
}

/** Schéma 5 — montage à plat : buste ouvert et manche posée. */
export function MontageFlat({ locale, text }: { locale: Locale; text: FigureText }) {
  const an = anchorFor(locale)
  return (
    <Sheet viewBox="0 0 260 180">
      <rect x={6} y={6} width={248} height={168} rx={6} fill={PAPER} stroke="var(--tailor)" strokeWidth={0.8} />

      {/* Buste ouvert */}
      <path
        d="M 40 30 L 92 30 L 112 44 C 104 74 108 100 124 120 L 124 152 L 40 152 Z"
        fill={FILL_SOFT}
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path d="M 112 44 C 104 74 108 100 124 120" fill="none" stroke={ACCENT} strokeWidth={2} />
      <Label x={76} y={168} color={SOFT} size={6.4}>
        {text.body}
      </Label>

      {/* Manche */}
      <path
        d="M 190 52 C 176 52 170 70 156 70 L 148 148 L 214 148 L 206 70 C 196 70 200 52 190 52 Z"
        fill="none"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
        strokeDasharray="3 2"
      />
      <Label x={182} y={168} color={SOFT} size={6.4}>
        {text.sleeve}
      </Label>

      {/* Alignement */}
      <Dashed x1={124} y1={120} x2={156} y2={70} color={CHAMPAGNE} width={0.9} />
      <Dashed x1={112} y1={44} x2={190} y2={52} color={CHAMPAGNE} width={0.9} />

      {/* Épingles */}
      <circle cx={112} cy={44} r={2} fill={PAPER} stroke={CHAMPAGNE} strokeWidth={1.1} />
      <circle cx={124} cy={120} r={2} fill={PAPER} stroke={CHAMPAGNE} strokeWidth={1.1} />
      <Label x={116} y={40} anchor={an('start')} color={CHAMPAGNE} size={6} weight={700}>
        {text.pins}
      </Label>

      {/* Sens de piqûre */}
      <Arrow x1={131} y1={111} x2={116} y2={55} color={ACCENT} width={1} head={4} />
      <Label x={150} y={30} anchor={an('start')} color={ACCENT} size={6}>
        {text.direction}
      </Label>
    </Sheet>
  )
}

export function ArmholeFigure({ id, locale, text }: { id: string; locale: Locale; text: FigureText }) {
  switch (id) {
    case 'frame':
      return <ArmholeFrame locale={locale} text={text} />
    case 'curve':
      return <ArmholeCurve locale={locale} text={text} />
    case 'angles':
      return <ArmholeAngles locale={locale} text={text} />
    case 'sleeve':
      return <SleeveCap locale={locale} text={text} />
    case 'montage':
      return <MontageFlat locale={locale} text={text} />
    default:
      return null
  }
}
