import { cm, r1, type PatternDef } from './types'

export const sarouel: PatternDef = {
  slug: 'sarouel',
  name: 'Sarouel',
  tagline: 'Pantalon ample à fourche abaissée et gousset en losange',
  level: 'Intermédiaire',
  description:
    'Le sarouel vous apprend à maîtriser la fourche : sa profondeur, son abaissement volontaire et l’insertion d’un gousset qui libère le mouvement. Taille coulissée, chevilles resserrées.',
  fabrics: 'Coton, lin, viscose lourde, popeline. Laize 140 cm.',
  requiredMeasurements: ['tourBassin', 'tourTaille', 'hauteurMontant', 'longueurCote', 'tourCheville'],
  compute(m) {
    const Q = r1(m.tourBassin / 4 + 5)
    const drop = 8
    const M = r1(m.hauteurMontant + drop)
    const fD = r1(m.tourBassin / 20)
    const fB = r1(m.tourBassin / 12)
    const Lc = m.longueurCote
    const C = r1((m.tourCheville + 16) / 2)
    const g = r1(m.tourBassin / 10 + 4)
    const d = r1(g * Math.SQRT2)
    const cw = r1((m.tourBassin + 4) / 2)
    const ch = 9
    const el = r1(m.tourTaille - 6)

    const leg = (ext: number, rise: number) => {
      const xc = (Q + ext) / 2
      const aL = r1(xc - C / 2)
      const aR = r1(xc + C / 2)
      const topX = rise ? Q + 1 : Q
      return {
        aL,
        aR,
        path: [
          'M 0 0',
          `L ${topX} ${-rise}`,
          `L ${Q} ${M - ext}`,
          `Q ${Q} ${M} ${Q + ext} ${M}`,
          `L ${aR} ${Lc}`,
          `L ${aL} ${Lc}`,
          `L 0 ${M}`,
          'Z',
        ].join(' '),
      }
    }

    const front = leg(fD, 0)
    const back = leg(fB, 3)

    return {
      fabricCm: Math.ceil(2 * (Lc + 13) + 20),
      values: [
        { key: 'Q', label: 'Largeur bassin (¼)', formula: 'TB ÷ 4 + 5', value: Q },
        { key: 'drop', label: 'Abaissement de fourche', formula: 'au choix (8 cm)', value: drop },
        { key: 'M', label: 'Ligne de fourche', formula: 'HM + abaissement', value: M },
        { key: 'fD', label: 'Fourche devant', formula: 'TB ÷ 20', value: fD },
        { key: 'fB', label: 'Fourche dos', formula: 'TB ÷ 12', value: fB },
        { key: 'Lc', label: 'Longueur côté', formula: 'LC', value: Lc },
        { key: 'C', label: 'Largeur cheville (par pièce)', formula: '(TCh + 16) ÷ 2', value: C },
        { key: 'g', label: 'Côté du gousset', formula: 'TB ÷ 10 + 4', value: g },
        { key: 'cw', label: 'Longueur de ceinture (½)', formula: '(TB + 4) ÷ 2', value: cw },
        { key: 'el', label: 'Longueur d’élastique', formula: 'TT − 6', value: el },
      ],
      pieces: [
        {
          id: 'devant',
          name: 'Devant',
          cut: '2 × (en vis-à-vis)',
          bbox: { x: 0, y: 0, w: Q + fD, h: Lc },
          path: front.path,
          points: [
            { id: 'A', x: 0, y: 0 },
            { id: 'B', x: Q, y: 0 },
            { id: 'C', x: Q + fD, y: M },
            { id: 'D', x: front.aR, y: Lc },
            { id: 'E', x: front.aL, y: Lc },
          ],
          grain: [Q / 2, M + 10, Q / 2, M + 40],
          marks: [{ d: `M 0 ${M} L ${Q + fD} ${M}`, label: 'ligne de fourche' }],
        },
        {
          id: 'dos',
          name: 'Dos',
          cut: '2 × (en vis-à-vis)',
          bbox: { x: 0, y: -3, w: Q + fB, h: Lc + 3 },
          path: back.path,
          points: [
            { id: 'A′', x: 0, y: 0 },
            { id: 'B′', x: Q + 1, y: -3 },
            { id: 'C′', x: Q + fB, y: M },
            { id: 'D′', x: back.aR, y: Lc },
            { id: 'E′', x: back.aL, y: Lc },
          ],
          grain: [Q / 2, M + 10, Q / 2, M + 40],
          marks: [{ d: `M 0 ${M} L ${Q + fB} ${M}` }],
        },
        {
          id: 'gousset',
          name: 'Gousset',
          cut: '1 × (biais au porter)',
          bbox: { x: 0, y: 0, w: d, h: d },
          path: `M ${d / 2} 0 L ${d} ${d / 2} L ${d / 2} ${d} L 0 ${d / 2} Z`,
          points: [
            { id: 'G1', x: d / 2, y: 0 },
            { id: 'G2', x: d, y: d / 2 },
            { id: 'G3', x: d / 2, y: d },
            { id: 'G4', x: 0, y: d / 2 },
          ],
          grain: [d * 0.32, d * 0.32, d * 0.68, d * 0.68],
        },
        {
          id: 'ceinture',
          name: 'Ceinture coulisse',
          cut: '2 ×',
          bbox: { x: 0, y: 0, w: cw, h: ch },
          path: `M 0 0 L ${cw} 0 L ${cw} ${ch} L 0 ${ch} Z`,
          points: [],
          grain: [cw * 0.3, ch * 0.25, cw * 0.7, ch * 0.25],
          marks: [{ d: `M 0 ${ch / 2} L ${cw} ${ch / 2}`, label: 'pliure' }],
        },
      ],
    }
  },
  steps: [
    {
      title: 'Tracer les lignes horizontales',
      body: (v) =>
        `Tracez la ligne de taille. Descendez de ${cm(v.M)} pour la ligne de fourche : c’est votre hauteur de montant + ${cm(v.drop)} d’abaissement. Enfin, descendez jusqu’à ${cm(v.Lc)} pour la ligne de cheville.`,
      tip: 'L’abaissement donne au sarouel son allure. 5 cm : discret ; 8 cm : classique ; 15 cm et plus : très marqué (gousset indispensable).',
    },
    {
      title: 'Placer la largeur de bassin',
      body: (v) =>
        `Sur la taille, reportez ${cm(v.Q)} depuis le côté (A) jusqu’au milieu devant (B). Descendez verticalement depuis B jusqu’à la ligne de fourche.`,
    },
    {
      title: 'Dessiner la fourche devant',
      body: (v) =>
        `Sur la ligne de fourche, prolongez de ${cm(v.fD)} au-delà du milieu : c’est la pointe de fourche C. Reliez le milieu à C par une courbe qui commence ${cm(v.fD)} au-dessus de la ligne de fourche.`,
      tip: 'La fourche devant est plus courte que la fourche dos : le bassin est plus volumineux à l’arrière.',
    },
    {
      title: 'Construire le dos',
      body: (v) =>
        `Reprenez le même cadre. Au milieu dos, remontez la taille de 3 cm et décalez-la de 1 cm vers l’extérieur (B′). La fourche dos s’allonge à ${cm(v.fB)} (point C′).`,
      tip: 'Cette remontée évite que le sarouel ne descende dans le dos en position assise.',
    },
    {
      title: 'Former la jambe',
      body: (v) =>
        `Centrez la cheville sous la jambe : ${cm(v.C)} de largeur (points D et E). Reliez la pointe de fourche à D (entrejambe) et le côté à E.`,
    },
    {
      title: 'Construire le gousset',
      body: (v) =>
        `Tracez un carré de ${cm(v.g)} de côté, droit-fil parallèle à un côté. Placé en losange à l’entrejambe, il travaille dans le biais et libère le mouvement. Ses quatre pointes rejoignent les deux coutures d’entrejambe et les deux fourches.`,
      tip: 'Cousez le gousset en dernier, point par point, en pivotant aiguille piquée à chaque angle.',
    },
    {
      title: 'Préparer la ceinture coulissée',
      body: (v) =>
        `Coupez deux bandes de ${cm(v.cw)} × 9 cm, pliées en deux dans la longueur. Prévoyez un élastique de ${cm(v.el)} (tour de taille − 6 cm) et 2 cm de marge à la cheville pour une coulisse élastique.`,
    },
  ],
}
