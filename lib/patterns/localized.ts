import type { Locale } from '@/lib/i18n'
import { PATTERNS_AR } from './ar'
import { fmt, type ComputedValue, type PatternDef, type PatternPiece } from './types'

/** Unité de longueur affichée selon la langue. */
export function cmUnit(locale: Locale) {
  return locale === 'ar' ? 'سم' : 'cm'
}

/** Unité de métrage affichée selon la langue. */
export function meterUnit(locale: Locale) {
  return locale === 'ar' ? 'م' : 'm'
}

/** Nombre formaté avec le séparateur décimal de la langue. */
export function formatNumber(n: number, locale: Locale) {
  const value = fmt(n)
  return locale === 'ar' ? value.replace(',', '٫') : value
}

/** Nombre à deux décimales, pour les valeurs de contrôle (23,85 / 0,41). */
export function formatNumber2(n: number, locale: Locale) {
  const value = n.toFixed(2).replace('.', ',')
  return locale === 'ar' ? value.replace(',', '٫') : value
}

/** Nombre + unité, par exemple « 12,5 cm » ou « 12٫5 سم ». */
export function formatLength(n: number, locale: Locale) {
  return `${formatNumber(n, locale)} ${cmUnit(locale)}`
}

export function patternDescription(locale: Locale, pattern: PatternDef) {
  if (locale !== 'ar') return pattern.description
  return PATTERNS_AR[pattern.slug]?.description ?? pattern.description
}

export function patternFabrics(locale: Locale, pattern: PatternDef) {
  if (locale !== 'ar') return pattern.fabrics
  return PATTERNS_AR[pattern.slug]?.fabrics ?? pattern.fabrics
}

export function patternValues(locale: Locale, pattern: PatternDef, values: ComputedValue[]) {
  if (locale !== 'ar') return values
  const translated = PATTERNS_AR[pattern.slug]?.values
  if (!translated) return values
  return values.map((value) => ({ ...value, ...translated[value.key] }))
}

export function patternPieces(locale: Locale, pattern: PatternDef, pieces: PatternPiece[]) {
  if (locale !== 'ar') return pieces
  const translated = PATTERNS_AR[pattern.slug]?.pieces
  if (!translated) return pieces
  return pieces.map((piece) => ({ ...piece, ...translated[piece.id] }))
}

/** Étapes de construction traduites (les fonctions gardent accès aux valeurs). */
export function patternSteps(locale: Locale, pattern: PatternDef) {
  if (locale === 'ar') {
    const translated = PATTERNS_AR[pattern.slug]?.steps
    if (translated) return translated
  }
  return pattern.steps
}

const ARABIC_POINTS: Record<string, string> = {
  A: 'أ',
  B: 'ب',
  C: 'ج',
  D: 'د',
  E: 'هـ',
  F: 'و',
  G: 'ز',
  H: 'ح',
  I: 'ط',
  J: 'ي',
  K: 'ك',
  L: 'ل',
}

/** Lettres des points du schéma : A, B, C… deviennent أ، ب، ج… en arabe. */
export function pointLabel(locale: Locale, id: string) {
  if (locale !== 'ar') return id
  const letter = /^([A-Z])(′?)$/.exec(id)
  if (letter) return `${ARABIC_POINTS[letter[1]] ?? letter[1]}${letter[2]}`
  const gousset = /^G(\d)$/.exec(id)
  if (gousset) return `ز${'٠١٢٣٤٥٦٧٨٩'[Number(gousset[1])] ?? gousset[1]}`
  return id
}
