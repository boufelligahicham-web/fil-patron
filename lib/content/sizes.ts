import type { Locale } from '@/lib/i18n'

/**
 * Grille des tailles de l'atelier.
 *
 * Les tours sont donnés en centimètres, du plus petit au plus grand du
 * gabarit : ce sont les valeurs du corps, pas celles du vêtement. Les
 * correspondances internationales restent indicatives — un patronage sur
 * mesure se règle toujours au ruban.
 */

export type SizeKey = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL' | '5XL' | '6XL'

export type SizeRow = {
  key: SizeKey
  /** Plage française, affichée telle quelle. */
  fr: string
  it: string
  uk: string
  us: string
  /** Tours de poitrine, taille, bassin (cm). */
  tp: [number, number]
  tt: [number, number]
  tb: [number, number]
  /** Indices de bonnets dans `CUPS` (début, fin). */
  cups: [number, number]
}

export const SIZE_ROWS: SizeRow[] = [
  { key: 'XS', fr: '34-36', it: '38/40', uk: '6/8', us: '2/4', tp: [80, 84], tt: [62, 66], tb: [88, 92], cups: [0, 1] },
  { key: 'S', fr: '38', it: '42', uk: '10', us: '6', tp: [85, 89], tt: [67, 71], tb: [93, 97], cups: [1, 1] },
  { key: 'M', fr: '40', it: '44', uk: '12', us: '8', tp: [90, 94], tt: [72, 76], tb: [98, 102], cups: [1, 2] },
  { key: 'L', fr: '42-44', it: '46/48', uk: '14/16', us: '10/12', tp: [95, 101], tt: [77, 83], tb: [103, 109], cups: [2, 3] },
  { key: 'XL', fr: '46-48', it: '50/52', uk: '18/20', us: '14/16', tp: [102, 108], tt: [84, 90], tb: [110, 116], cups: [3, 4] },
  { key: '2XL', fr: '50-52', it: '54/56', uk: '22/24', us: '18/20', tp: [109, 116], tt: [91, 98], tb: [117, 124], cups: [4, 5] },
  { key: '3XL', fr: '54', it: '58', uk: '26', us: '22', tp: [117, 124], tt: [99, 106], tb: [125, 132], cups: [4, 6] },
  { key: '4XL', fr: '56', it: '60', uk: '28', us: '24', tp: [125, 132], tt: [107, 114], tb: [133, 140], cups: [5, 6] },
  { key: '5XL', fr: '58', it: '62', uk: '30', us: '26', tp: [133, 140], tt: [115, 122], tb: [141, 148], cups: [6, 7] },
  { key: '6XL', fr: '60', it: '64', uk: '32', us: '28', tp: [141, 148], tt: [123, 130], tb: [149, 156], cups: [6, 7] },
]

/**
 * Bonnets : les lettres latines n'ont pas cours en arabe. On décrit donc le
 * volume (du plus petit au plus large) plutôt que d'afficher « B - C ».
 */
const CUPS: Record<Locale, string[]> = {
  fr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ar: ['صغير', 'متوسط', 'كبير نسبيًا', 'كبير', 'كبير جدًا', 'ممتلئ', 'ممتلئ جدًا', 'واسع'],
}

export function sizeLabel(locale: Locale, row: SizeRow) {
  return locale === 'ar' ? row.fr : `${row.key} (${row.fr})`
}

export function cupLabel(locale: Locale, [from, to]: [number, number]) {
  const values = CUPS[locale]
  const start = values[from]
  const end = values[to]
  if (from === to) return start
  return locale === 'ar' ? `${start} إلى ${end}` : `${start} – ${end}`
}

export function findSize(key: SizeKey) {
  return SIZE_ROWS.find((row) => row.key === key) ?? SIZE_ROWS[2]
}
