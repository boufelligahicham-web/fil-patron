import { bodyPath, cm, r1, sleevePath, type PatternDef } from './types'

export const qamis: PatternDef = {
  slug: 'qamis',
  name: 'Qamis',
  tagline: 'Tunique longue à col officier et patte de boutonnage',
  level: 'Intermédiaire',
  description:
    'Le qamis réunit deux finitions précises de la chemiserie : le col officier, légèrement cintré, et la patte de boutonnage posée dans une fente au milieu devant. Fentes de côté au bas.',
  fabrics: 'Coton, polycoton, lin, gabardine légère. Laize 150 cm.',
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
    const W = r1(m.tourPoitrine / 4 + 5)
    const L = r1(m.longueurTotale - 8)
    const ne = r1(m.tourCou / 6 + 0.5)
    const ndB = 2
    const ndF = r1(m.tourCou / 6 + 1.5)
    const slope = 4
    const sx = r1(ne + m.longueurEpaule)
    const P = r1(m.tourPoitrine / 8 + 10)
    const H = r1(W + 6)
    const slit = 20
    const po = 26
    const pw = 8
    const pl = po + 3
    const cl = r1((m.tourCou + 2) / 2 + 1.5)
    const chh = 3.5
    const rise = 1.2
    const S = r1(m.tourBras + 10)
    const Wp = r1(m.tourPoignet + 8)
    const T = r1(P / 3 + 1)
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

    const slitY = L - 1.5 - slit
    const slitX = W + ((H - W) * (slitY - P)) / (L - 1.5 - P)
    const slitMark = { d: `M ${slitX - 2.5} ${slitY} L ${slitX + 1} ${slitY}`, label: 'fente' }

    return {
      fabricCm: Math.ceil(2 * (L + 5) + Lm + 20),
      values: [
        { key: 'W', label: 'Largeur poitrine (¼)', formula: 'TP ÷ 4 + 5', value: W },
        { key: 'L', label: 'Longueur totale', formula: 'LNS − 8', value: L },
        { key: 'ne', label: 'Largeur d’encolure', formula: 'TC ÷ 6 + 0,5', value: ne },
        { key: 'ndF', label: 'Profondeur encolure devant', formula: 'TC ÷ 6 + 1,5', value: ndF },
        { key: 'sx', label: 'Point d’épaule', formula: 'encolure + LE', value: sx },
        { key: 'P', label: 'Profondeur d’emmanchure', formula: 'TP ÷ 8 + 10', value: P },
        { key: 'H', label: 'Largeur au bas (¼)', formula: 'W + 6', value: H },
        { key: 'slit', label: 'Fente de côté', formula: 'fixe', value: slit },
        { key: 'po', label: 'Ouverture de patte', formula: 'fixe', value: po },
        { key: 'pw', label: 'Largeur de patte coupée', formula: '3 × 2 + 2', value: pw },
        { key: 'pl', label: 'Longueur de patte', formula: 'ouverture + 3', value: pl },
        { key: 'cl', label: 'Longueur de col (½)', formula: '(TC + 2) ÷ 2 + 1,5', value: cl },
        { key: 'chh', label: 'Hauteur de col', formula: 'fixe', value: chh },
        { key: 'rise', label: 'Relèvement du col', formula: 'fixe', value: rise },
        { key: 'S', label: 'Largeur haut de manche', formula: 'TBr + 10', value: S },
        { key: 'T', label: 'Hauteur tête de manche', formula: 'P ÷ 3 + 1', value: T },
        { key: 'Wp', label: 'Largeur bas de manche', formula: 'TPo + 8', value: Wp },
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
          marks: [slitMark],
        },
        {
          id: 'devant',
          name: 'Devant',
          cut: '1 × au pli',
          bbox: { x: 0, y: 0, w: H, h: L },
          path: body(ndF),
          points: bodyPoints(ndF),
          grain: [W / 2, P + 15, W / 2, P + 55],
          fold: [0, ndF + po + 4, 0, L - 4],
          marks: [
            { d: `M 1.5 ${ndF} L 1.5 ${ndF + po} L 0 ${ndF + po}`, label: 'patte' },
            slitMark,
          ],
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
          ],
          grain: [S / 2, T + 8, S / 2, T + 35],
        },
        {
          id: 'col',
          name: 'Col officier',
          cut: '2 × au pli + entoilage',
          bbox: { x: 0, y: -1, w: cl, h: chh + 1 },
          path: `M 0 ${chh} Q ${cl * 0.6} ${chh} ${cl} ${chh - rise} Q ${cl} ${-0.6} ${cl - 0.8} ${-0.9} Q ${cl * 0.55} 0 0 0 Z`,
          points: [
            { id: 'K', x: 0, y: chh },
            { id: 'L', x: cl, y: chh - rise },
          ],
          grain: [cl * 0.3, chh * 0.5, cl * 0.6, chh * 0.5],
          fold: [0, 0.3, 0, chh - 0.3],
        },
        {
          id: 'patte',
          name: 'Patte',
          cut: '2 × + entoilage',
          bbox: { x: 0, y: 0, w: pw, h: pl },
          path: `M 0 0 L ${pw} 0 L ${pw} ${pl} L 0 ${pl} Z`,
          points: [],
          grain: [pw / 2 + 1.5, pl * 0.3, pw / 2 + 1.5, pl * 0.7],
          marks: [{ d: `M ${pw / 2} 0 L ${pw / 2} ${pl}` }],
        },
      ],
    }
  },
  steps: [
    {
      title: 'Tracer le corps du qamis',
      body: (v) =>
        `Construisez le dos comme pour l’abaya : largeur ${cm(v.W)}, longueur ${cm(v.L)}, encolure ${cm(v.ne)}, emmanchure à ${cm(v.P)}. Le bas s’évase à ${cm(v.H)}. Pour le devant, l’encolure descend à ${cm(v.ndF)}.`,
      tip: 'L’aisance de 20 cm du qamis laisse toute liberté pour les mouvements de la prière.',
    },
    {
      title: 'Marquer la fente de patte',
      body: (v) =>
        `Au milieu devant, depuis le point A, tracez une fente de ${cm(v.po)} de long. Marquez 1,5 cm de chaque côté du milieu : c’est la moitié de la largeur finie de la patte (3 cm).`,
    },
    {
      title: 'Couper la patte de boutonnage',
      body: (v) =>
        `Chaque patte est un rectangle de ${cm(v.pw)} × ${cm(v.pl)} : deux fois la largeur finie (3 cm) plus 2 cm de marges. Entoilez la moitié qui portera les boutonnières, puis pliez au milieu.`,
      tip: 'La patte de dessus (boutonnières) est à droite pour un homme, à gauche pour une femme.',
    },
    {
      title: 'Construire le col officier',
      body: (v) =>
        `Mesurez votre encolure sur le patron (dos + devant) : elle doit faire environ ${cm(v.cl - 1.5)}. Tracez une base de ${cm(v.cl)} (avec 1,5 cm pour rejoindre le milieu de la patte). Au bout, remontez de ${cm(v.rise)} et reliez par une courbe douce. Tracez la hauteur de ${cm(v.chh)} parallèlement, puis arrondissez l’angle avant.`,
      tip: 'Le relèvement fait « tenir » le col contre le cou. Sans lui, le col s’écarte vers l’avant.',
    },
    {
      title: 'Ajouter les fentes de côté',
      body: (v) =>
        `Sur la couture de côté, marquez un cran ${cm(v.slit)} au-dessus du bas : la couture s’arrête là. Prévoyez 2 cm de marge sur la fente pour une finition propre.`,
    },
    {
      title: 'Construire la manche',
      body: (v) =>
        `Largeur ${cm(v.S)}, tête de manche de ${cm(v.T)}, bas de manche de ${cm(v.Wp)}. Vérifiez que la tête de manche correspond à l’emmanchure à 1 cm près.`,
    },
    {
      title: 'Ordre de montage',
      body: () =>
        'Posez la patte, puis assemblez les épaules. Montez le col en prenant l’encolure entre col et parementure de col. Montez les manches à plat, fermez côtés et dessous de bras d’un seul geste, puis terminez par les fentes et l’ourlet.',
      tip: 'Repassez chaque couture avant de la croiser par une autre : c’est le secret d’un qamis net.',
    },
  ],
}
