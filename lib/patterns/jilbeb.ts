import { cm, r1, type PatternDef } from './types'

export const jilbeb: PatternDef = {
  slug: 'jilbeb',
  name: 'Jilbeb de base',
  tagline: 'Cape en cercle avec capuche encadrant le visage',
  level: 'Débutant',
  description:
    'Le jilbeb de base se compose d’une cape en cercle complet et d’une capuche en deux pièces. On y découvre la construction au compas : un exercice précieux pour comprendre les rayons et les circonférences.',
  fabrics: 'Nidha, crêpe fluide, mousseline épaisse. Laize 150 cm idéale.',
  requiredMeasurements: ['tourCou', 'tourVisage', 'longueurManche'],
  compute(m) {
    const enc = r1(m.tourCou + 6)
    const r = r1(enc / (2 * Math.PI))
    const lc = r1(m.longueurManche)
    const R = r1(r + lc)
    const b = r1(enc / 2)
    const h = r1(m.tourVisage / 2 + 2)
    const t = r1(m.tourVisage / 4 + 8)

    return {
      fabricCm: Math.ceil(2 * R + h + 15),
      values: [
        { key: 'enc', label: 'Encolure finie', formula: 'TC + 6', value: enc },
        { key: 'r', label: 'Rayon d’encolure', formula: 'encolure ÷ (2 × π)', value: r },
        { key: 'lc', label: 'Longueur de cape', formula: 'LM', value: lc },
        { key: 'R', label: 'Rayon extérieur', formula: 'r + longueur de cape', value: R },
        { key: 'h', label: 'Hauteur de capuche', formula: 'TV ÷ 2 + 2', value: h },
        { key: 't', label: 'Profondeur de capuche', formula: 'TV ÷ 4 + 8', value: t },
        { key: 'b', label: 'Base de capuche', formula: 'encolure ÷ 2', value: b },
      ],
      pieces: [
        {
          id: 'cape',
          name: 'Cape (¼ de cercle)',
          cut: '2 × au pli',
          bbox: { x: 0, y: 0, w: R, h: R },
          path: `M ${r} 0 L ${R} 0 A ${R} ${R} 0 0 1 0 ${R} L 0 ${r} A ${r} ${r} 0 0 0 ${r} 0 Z`,
          points: [
            { id: 'A', x: r, y: 0 },
            { id: 'B', x: R, y: 0 },
            { id: 'C', x: 0, y: R },
            { id: 'D', x: 0, y: r },
          ],
          grain: [R * 0.28, R * 0.35, R * 0.28, R * 0.7],
          fold: [0, r + 4, 0, R - 4],
        },
        {
          id: 'capuche',
          name: 'Capuche',
          cut: '2 × (en vis-à-vis)',
          bbox: { x: 0, y: 0, w: Math.max(t, b), h },
          path: `M 0 0 L ${t - 6} 0 Q ${t} 0 ${t} 6 L ${b} ${h} L 0 ${h} Z`,
          points: [
            { id: 'E', x: 0, y: 0 },
            { id: 'F', x: t, y: 6 },
            { id: 'G', x: b, y: h },
            { id: 'H', x: 0, y: h },
          ],
          grain: [Math.min(t, b) / 2, h * 0.25, Math.min(t, b) / 2, h * 0.75],
          marks: [{ d: `M 3 0 L 3 ${h}`, label: 'parementure' }],
        },
      ],
    }
  },
  steps: [
    {
      title: 'Calculer le rayon d’encolure',
      body: (v) =>
        `L’encolure finie mesure ${cm(v.enc)} (tour de cou + 6 cm d’aisance). Comme la cape forme un cercle complet, le rayon vaut encolure ÷ (2 × π), soit ${cm(v.r)}.`,
      tip: 'C’est la même formule que pour une jupe soleil : seule la mesure de départ change.',
    },
    {
      title: 'Tracer le quart de cercle',
      body: (v) =>
        `Dans l’angle de votre papier, piquez une punaise. Avec un fil ou un mètre ruban, tracez un arc de rayon ${cm(v.r)} (points A et D), puis un second arc de rayon ${cm(v.R)} (points B et C).`,
      tip: 'Marquez plusieurs points au crayon tous les 5 cm, puis reliez-les pour un arc régulier.',
    },
    {
      title: 'Identifier pli et couture',
      body: () =>
        'Le bord vertical (D–C) se place au pli du tissu : il deviendra le milieu devant. Le bord horizontal (A–B) sera la couture d’épaule-milieu dos. Coupez deux fois au pli pour obtenir un cercle complet.',
    },
    {
      title: 'Construire la capuche',
      body: (v) =>
        `Tracez la ligne du visage E–H de ${cm(v.h)}. En haut, reportez ${cm(v.t)} pour la profondeur, en arrondissant l’angle arrière sur 6 cm (point F). En bas, la base G–H mesure ${cm(v.b)} : elle sera cousue à la moitié de l’encolure de la cape.`,
    },
    {
      title: 'Prévoir la parementure du visage',
      body: () =>
        'Le long du bord E–H, ajoutez 3 cm de parementure (repli intérieur). Vous pourrez y glisser un élastique fin ou un cordon pour ajuster l’ouverture autour du visage.',
      tip: 'Testez l’ouverture sur une toile avant de couper dans le tissu définitif.',
    },
    {
      title: 'Ajouter les marges',
      body: () =>
        'Ajoutez 1 cm sur l’encolure, la couture A–B et la couture de capuche, puis 1,5 cm d’ourlet roulotté au bas de la cape. Laissez reposer la cape coupée 24 h suspendue avant l’ourlet : le biais se détend.',
      tip: 'Sur les zones en biais, le tissu s’allonge au porter. Recoupez le bas après repos.',
    },
  ],
}
