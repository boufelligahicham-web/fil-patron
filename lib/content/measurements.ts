export type MeasurementKey =
  | 'tourPoitrine'
  | 'tourTaille'
  | 'tourBassin'
  | 'tourCou'
  | 'tourBras'
  | 'tourPoignet'
  | 'tourCheville'
  | 'tourVisage'
  | 'carrureDos'
  | 'longueurEpaule'
  | 'longueurManche'
  | 'longueurTotale'
  | 'hauteurMontant'
  | 'longueurCote'

export type Measurements = Record<MeasurementKey, number>

export type MeasurementGroup = 'tours' | 'hauteurs'

export type MeasurementDef = {
  key: MeasurementKey
  label: string
  abbr: string
  group: MeasurementGroup
  howTo: string
  tip?: string
  defaultValue: number
  min: number
  max: number
}

export const MEASUREMENTS: MeasurementDef[] = [
  {
    key: 'tourPoitrine',
    label: 'Tour de poitrine',
    abbr: 'TP',
    group: 'tours',
    howTo:
      'Passez le mètre ruban horizontalement à l’endroit le plus fort de la poitrine, sous les bras et sur les omoplates.',
    tip: 'Le ruban doit rester parallèle au sol, dans le dos comme devant.',
    defaultValue: 92,
    min: 60,
    max: 160,
  },
  {
    key: 'tourTaille',
    label: 'Tour de taille',
    abbr: 'TT',
    group: 'tours',
    howTo:
      'Mesurez à l’endroit le plus creux du buste, généralement juste au-dessus du nombril.',
    tip: 'Nouez un élastique fin à la taille : il marque le repère pour les autres mesures.',
    defaultValue: 74,
    min: 50,
    max: 160,
  },
  {
    key: 'tourBassin',
    label: 'Tour de bassin (hanches)',
    abbr: 'TB',
    group: 'tours',
    howTo:
      'Mesurez à l’endroit le plus fort des fesses, environ 18 à 22 cm sous la taille, pieds joints.',
    defaultValue: 100,
    min: 70,
    max: 170,
  },
  {
    key: 'tourCou',
    label: 'Tour de cou',
    abbr: 'TC',
    group: 'tours',
    howTo:
      'Mesurez à la base du cou en passant sur la petite bosse de la nuque (7e vertèbre) et au creux de la clavicule.',
    tip: 'Glissez un doigt sous le ruban pour ne pas serrer.',
    defaultValue: 37,
    min: 28,
    max: 55,
  },
  {
    key: 'tourBras',
    label: 'Tour de bras',
    abbr: 'TBr',
    group: 'tours',
    howTo: 'Bras détendu, mesurez à l’endroit le plus fort du haut du bras.',
    defaultValue: 28,
    min: 18,
    max: 55,
  },
  {
    key: 'tourPoignet',
    label: 'Tour de poignet',
    abbr: 'TPo',
    group: 'tours',
    howTo: 'Mesurez juste au-dessus de l’os du poignet.',
    defaultValue: 16,
    min: 12,
    max: 26,
  },
  {
    key: 'tourCheville',
    label: 'Tour de cheville',
    abbr: 'TCh',
    group: 'tours',
    howTo: 'Mesurez juste au-dessus de l’os de la cheville.',
    defaultValue: 24,
    min: 17,
    max: 40,
  },
  {
    key: 'tourVisage',
    label: 'Tour de visage',
    abbr: 'TV',
    group: 'tours',
    howTo:
      'Partez du sommet du front, passez devant les oreilles et sous le menton, puis revenez au point de départ.',
    tip: 'Utile pour l’ouverture du jilbeb : elle doit encadrer le visage sans serrer.',
    defaultValue: 58,
    min: 45,
    max: 75,
  },
  {
    key: 'carrureDos',
    label: 'Carrure dos',
    abbr: 'CD',
    group: 'hauteurs',
    howTo:
      'Mesurez horizontalement dans le dos, d’un pli de bras à l’autre, environ 10 cm sous la nuque.',
    defaultValue: 36,
    min: 28,
    max: 55,
  },
  {
    key: 'longueurEpaule',
    label: 'Longueur d’épaule',
    abbr: 'LE',
    group: 'hauteurs',
    howTo: 'Mesurez de la base du cou jusqu’à l’os de l’épaule (acromion).',
    defaultValue: 12.5,
    min: 9,
    max: 20,
  },
  {
    key: 'longueurManche',
    label: 'Longueur de manche',
    abbr: 'LM',
    group: 'hauteurs',
    howTo:
      'Bras légèrement plié, mesurez de l’os de l’épaule au poignet en passant par le coude.',
    defaultValue: 60,
    min: 40,
    max: 80,
  },
  {
    key: 'longueurTotale',
    label: 'Longueur nuque-sol',
    abbr: 'LNS',
    group: 'hauteurs',
    howTo:
      'Debout, pieds nus, mesurez de la 7e vertèbre (nuque) jusqu’au sol, en suivant le dos sans tirer.',
    tip: 'Portez les chaussures habituelles si vous voulez ajuster la longueur finale.',
    defaultValue: 140,
    min: 100,
    max: 180,
  },
  {
    key: 'hauteurMontant',
    label: 'Hauteur de montant (fourche)',
    abbr: 'HM',
    group: 'hauteurs',
    howTo:
      'Assis bien droit sur une chaise dure, mesurez sur le côté de la taille jusqu’à l’assise.',
    tip: 'C’est la mesure clé du sarouel : elle détermine la profondeur de la fourche.',
    defaultValue: 27,
    min: 18,
    max: 40,
  },
  {
    key: 'longueurCote',
    label: 'Longueur côté (taille-sol)',
    abbr: 'LC',
    group: 'hauteurs',
    howTo: 'Mesurez sur le côté, de la taille jusqu’à la cheville.',
    defaultValue: 100,
    min: 70,
    max: 130,
  },
]

export const MEASUREMENT_BY_KEY = Object.fromEntries(
  MEASUREMENTS.map((m) => [m.key, m]),
) as Record<MeasurementKey, MeasurementDef>

export const DEFAULT_MEASUREMENTS = Object.fromEntries(
  MEASUREMENTS.map((m) => [m.key, m.defaultValue]),
) as Measurements

export function sanitizeMeasurements(input: unknown): Measurements {
  const result = { ...DEFAULT_MEASUREMENTS }
  if (!input || typeof input !== 'object') return result
  for (const def of MEASUREMENTS) {
    const raw = (input as Record<string, unknown>)[def.key]
    const value = typeof raw === 'number' ? raw : Number(raw)
    if (Number.isFinite(value) && value >= def.min && value <= def.max) {
      result[def.key] = Math.round(value * 10) / 10
    }
  }
  return result
}

export const EASE_TABLE = [
  {
    garment: 'Abaya de base',
    zone: 'Poitrine',
    value: '+16 cm',
    why: 'Vêtement ample porté par-dessus : il doit tomber sans marquer la silhouette.',
  },
  {
    garment: 'Qamis',
    zone: 'Poitrine',
    value: '+20 cm',
    why: 'Liberté pour la prière et les gestes du quotidien (lever les bras, s’asseoir).',
  },
  {
    garment: 'Sarouel',
    zone: 'Bassin',
    value: '+20 cm',
    why: 'Coupe large et fourche basse : l’ampleur est le caractère du modèle.',
  },
  {
    garment: 'Jilbeb',
    zone: 'Encolure',
    value: '+6 cm',
    why: 'L’encolure doit passer par-dessus la tête et rester confortable.',
  },
  {
    garment: 'Manches',
    zone: 'Tour de bras',
    value: '+10 à +14 cm',
    why: 'Permet de plier le coude et de porter un vêtement en dessous.',
  },
]
