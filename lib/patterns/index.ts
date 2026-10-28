import { abaya } from './abaya'
import { jilbeb } from './jilbeb'
import { qamis } from './qamis'
import { sarouel } from './sarouel'
import type { PatternDef } from './types'

export const PATTERNS: PatternDef[] = [abaya, jilbeb, sarouel, qamis]

export function getPattern(slug: string) {
  return PATTERNS.find((p) => p.slug === slug)
}

export const COURSE_LESSONS = [
  { slug: 'cours/mesures', title: 'Guide de prise de mesures', href: '/cours/mesures' },
  { slug: 'cours/glossaire', title: 'Glossaire technique', href: '/cours/glossaire' },
  { slug: 'cours/emmanchure', title: 'Leçon d’emmanchure', href: '/cours/emmanchure' },
]

export function stepSlug(patternSlug: string, index: number) {
  return `${patternSlug}/etape-${index + 1}`
}

export const ALL_LESSON_SLUGS = new Set<string>([
  ...COURSE_LESSONS.map((l) => l.slug),
  ...PATTERNS.flatMap((p) => p.steps.map((_, i) => stepSlug(p.slug, i))),
])
