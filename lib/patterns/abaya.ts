import { bodyPath, cm, r1, sleevePath, type PatternDef } from './types'

export const abaya: PatternDef = {
  slug: 'abaya',
  name: 'Abaya de base',
  tagline: 'Robe longue et fluide, coupe droite légèrement évasée',
  level: 'Débutant',
  description:
    'Le patron idéal pour débuter : un dos et un devant coupés au pli, des manches montées à tête basse et un léger évasement vers le bas. Aucune pince, l’aisance fait tout le travail.',
  fabrics: 'Crêpe, nidha, viscose, lin léger. Laize 140 cm conseillée.',
  requiredMeasurements: [
    'tourPoitrine',
    'tourCou',
    'longueurEpaule',
    'longueurTotale',
    'tourBras',
    'tourPoignet',
    'longueurManche',
  ],
  compute(m) {
    const W = r1(m.tourPoitrine / 4 + 4)
    const L = r1(m.longueurTotale - 2)
    const ne = r1(m.tourCou / 6 + 0.5)
    const ndB = 2
    const ndF = r1(m.tourCou / 6 + 2)
    const slope = 3.5
    const sx = r1(ne + m.longueurEpaule)
    const P = r1(m.tourPoitrine / 8 + 12)
    const H = r1(W + 10)
    const S = r1(m.tourBras + 14)
    const Wp = r1(m.tourPoignet + 14)
    const T = r1(P / 3)
    const Lm = m.longueurManche

    const body = (nd: number) =>
      bodyPath({ neckWidth: ne, neckDepth: nd, shoulderX: sx, slope, chestX: W, armholeY: P, hemX: H, length: L })

    const bodyPoints = (nd: number) => [
      { id: 'A', x: 0, y: nd },
      { id: 'B', x: ne, y: 0 },
      { id: 'C', x: sx, y: slope },
      { id: 'D', x: W, y: P },
      { id: 'E', x: H, y: L - 1.5 },
      { id: 'F', x: 0, y: L },
    ]

    return {
      fabricCm: Math.ceil(2 * (L + 6) + Lm + 10),
      values: [
        { key: 'W', label: 'Largeur poitrine (¼)', formula: 'TP ÷ 4 + 4', value: W },
        { key: 'L', label: 'Longueur totale', formula: 'LNS − 2', value: L },
        { key: 'ne', label: 'Largeur d’encolure', formula: 'TC ÷ 6 + 0,5', value: ne },
        { key: 'ndB', label: 'Profondeur encolure dos', formula: 'fixe', value: ndB },
        { key: 'ndF', label: 'Profondeur encolure devant', formula: 'TC ÷ 6 + 2', value: ndF },
        { key: 'sx', label: 'Point d’épaule (depuis le milieu)', formula: 'encolure + LE', value: sx },
        { key: 'slope', label: 'Pente d’épaule', formula: 'fixe', value: slope },
        { key: 'P', label: 'Profondeur d’emmanchure', formula: 'TP ÷ 8 + 12', value: P },
        { key: 'H', label: 'Largeur au bas (¼)', formula: 'W + 10', value: H },
        { key: 'S', label: 'Largeur haut de manche', formula: 'TBr + 14', value: S },
        { key: 'T', label: 'Hauteur tête de manche', formula: 'P ÷ 3', value: T },
        { key: 'Wp', label: 'Largeur bas de manche', formula: 'TPo + 14', value: Wp },
        { key: 'Lm', label: 'Longueur de manche', formula: 'LM', value: Lm },
      ],
      pieces: [
        {
          id: 'dos',
          name: 'Dos',
          cut: '1 × au pli',
          bbox: { x: 0, y: 0, w: H, h: L },
          path: body(ndB),
          points: bodyPoints(ndB),
          grain: [W / 2, P + 15, W / 2, P + 55],
          fold: [0, ndB + 4, 0, L - 4],
        },
        {
          id: 'devant',
          name: 'Devant',
          cut: '1 × au pli',
          bbox: { x: 0, y: 0, w: H, h: L },
          path: body(ndF),
          points: bodyPoints(ndF),
          grain: [W / 2, P + 15, W / 2, P + 55],
          fold: [0, ndF + 4, 0, L - 4],
        },
        {
          id: 'manche',
          name: 'Manche',
          cut: '2 × (en vis-à-vis)',
          bbox: { x: 0, y: 0, w: S, h: Lm },
          path: sleevePath(S, T, Wp, Lm),
          points: [
            { id: 'G', x: S / 2, y: 0 },
            { id: 'H', x: 0, y: T },
            { id: 'I', x: S, y: T },
            { id: 'J', x: (S - Wp) / 2, y: Lm },
            { id: 'K', x: S - (S - Wp) / 2, y: Lm },
          ],
          grain: [S / 2, T + 8, S / 2, T + 35],
        },
      ],
    }
  },
  steps: [
    {
      title: 'Préparer le cadre de construction',
      body: (v) =>
        `Sur votre papier, tracez une verticale : c’est le milieu dos (qui sera au pli). En haut, placez le point A. Tracez un rectangle de ${cm(v.H)} de large sur ${cm(v.L)} de haut. Tous les points se construisent à l’intérieur de ce cadre.`,
      tip: 'Travaillez au crayon à papier : vous pourrez gommer les lignes de construction à la fin.',
    },
    {
      title: 'Tracer l’encolure',
      body: (v) =>
        `Depuis le haut du milieu, reportez ${cm(v.ne)} vers la droite : c’est le point B (base du cou). Descendez de ${cm(v.ndB)} sur le milieu pour le dos (${cm(v.ndF)} pour le devant) : c’est le point A. Reliez A à B par une courbe douce, perpendiculaire au milieu sur les premiers centimètres.`,
      tip: 'Une encolure qui arrive en angle au milieu fera une pointe une fois dépliée. Gardez un angle droit au point A.',
    },
    {
      title: 'Placer l’épaule',
      body: (v) =>
        `Le point C se trouve à ${cm(v.sx)} du milieu et ${cm(v.slope)} plus bas que B. Reliez B à C par une droite : c’est la couture d’épaule.`,
    },
    {
      title: 'Dessiner l’emmanchure',
      body: (v) =>
        `Descendez de ${cm(v.P)} depuis le haut et reportez ${cm(v.W)} depuis le milieu : c’est le point D, sous le bras. Reliez C à D par une courbe qui se creuse légèrement vers l’intérieur puis arrive à l’horizontale en D.`,
      tip: 'Utilisez un pistolet de couturière pour une courbe régulière.',
    },
    {
      title: 'Tracer le côté et le bas',
      body: (v) =>
        `Au bas du cadre, reportez ${cm(v.H)} depuis le milieu et remontez de 1,5 cm : c’est le point E. Reliez D à E (couture de côté). Arrondissez le bas de E jusqu’au point F au milieu, pour que la courbe arrive perpendiculaire aux deux lignes.`,
      tip: 'Remonter de 1,5 cm compense l’évasement : sans cela, le bas fera une pointe sur les côtés.',
    },
    {
      title: 'Construire la manche',
      body: (v) =>
        `Tracez une horizontale de ${cm(v.S)}. Au milieu, montez de ${cm(v.T)} : c’est le sommet G. Dessinez la tête de manche de H à I en passant par G. Descendez la longueur de ${cm(v.Lm)} et centrez le bas de manche de ${cm(v.Wp)} (points J et K).`,
    },
    {
      title: 'Vérifier et ajouter les marges',
      body: () =>
        'Mesurez la courbe d’emmanchure devant + dos et comparez-la à la tête de manche : l’écart ne doit pas dépasser 1 cm. Ajoutez ensuite 1 cm de marge partout, 4 cm au bas, et notez le droit-fil, le pli et le nom de chaque pièce.',
      tip: 'Placez un cran au sommet G : il correspondra à la couture d’épaule au montage.',
    },
  ],
}
