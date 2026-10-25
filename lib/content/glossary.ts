export type GlossaryCategory = 'tissu' | 'construction' | 'couture' | 'mesures'

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: string }[] = [
  { id: 'tissu', label: 'Tissu' },
  { id: 'construction', label: 'Construction' },
  { id: 'couture', label: 'Couture' },
  { id: 'mesures', label: 'Mesures' },
]

export type GlossaryTerm = {
  id: string
  term: string
  category: GlossaryCategory
  short: string
  detail: string
  example?: string
  related?: string[]
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'droit-fil',
    term: 'Droit-fil',
    category: 'tissu',
    short: 'Direction des fils de chaîne, parallèle à la lisière du tissu.',
    detail:
      'Le droit-fil est la direction la plus stable du tissu : il ne se déforme presque pas. Sur un patron, une flèche indique comment placer la pièce : la flèche doit être parfaitement parallèle à la lisière. Un vêtement coupé hors droit-fil vrille au porter.',
    example:
      'Mesurez la distance entre chaque extrémité de la flèche et la lisière : les deux valeurs doivent être identiques.',
    related: ['lisiere', 'biais', 'pli'],
  },
  {
    id: 'lisiere',
    term: 'Lisière',
    category: 'tissu',
    short: 'Bord fini du tissu, tissé plus serré, qui ne s’effiloche pas.',
    detail:
      'Les lisières bordent le tissu sur toute sa longueur. Elles servent de référence pour placer le droit-fil. On évite de les intégrer au vêtement car elles rétrécissent parfois différemment au lavage.',
    related: ['droit-fil', 'laize'],
  },
  {
    id: 'biais',
    term: 'Biais',
    category: 'tissu',
    short: 'Direction à 45° par rapport au droit-fil, la plus souple du tissu.',
    detail:
      'Coupé dans le biais, un tissu devient élastique et épouse les courbes. On l’utilise pour les finitions d’encolure (bandes de biais) ou pour des pièces qui doivent accompagner le mouvement, comme le gousset du sarouel.',
    related: ['droit-fil', 'gousset'],
  },
  {
    id: 'laize',
    term: 'Laize',
    category: 'tissu',
    short: 'Largeur du tissu, d’une lisière à l’autre (souvent 140 ou 150 cm).',
    detail:
      'La laize détermine le métrage nécessaire. Une pièce plus large que la moitié de la laize ne peut pas être coupée au pli : il faudra prévoir une couture ou une laize plus grande.',
    related: ['lisiere', 'pli'],
  },
  {
    id: 'pli',
    term: 'Au pli',
    category: 'tissu',
    short: 'La pièce est posée contre la pliure du tissu pour être coupée en un seul morceau symétrique.',
    detail:
      'Le patron ne représente que la moitié de la pièce. On plie le tissu en deux (endroit contre endroit, lisières ensemble), on place le bord marqué « pli » exactement sur la pliure et on ne coupe pas ce bord.',
    example: 'Le dos de l’abaya est coupé au pli : une seule pièce, sans couture au milieu.',
    related: ['droit-fil', 'milieu'],
  },
  {
    id: 'marge',
    term: 'Marge de couture',
    category: 'couture',
    short: 'Surplus de tissu ajouté autour du patron pour pouvoir assembler les pièces.',
    detail:
      'Les patrons de cette application sont tracés sans marges. Ajoutez 1 cm sur les coutures d’assemblage, 1,5 cm sur les côtés (pour pouvoir élargir) et 3 à 4 cm pour les ourlets. Tracez les marges à la craie, parallèlement au contour.',
    example: 'Marge standard : 1 cm. Ourlet de bas d’abaya : 4 cm.',
    related: ['ourlet', 'cran'],
  },
  {
    id: 'pince',
    term: 'Pince (dart)',
    category: 'construction',
    short: 'Pli triangulaire cousu pour retirer de l’ampleur et donner du volume.',
    detail:
      'La pince transforme un tissu plat en une forme 3D qui épouse une rondeur (poitrine, omoplates, taille). Les vêtements traditionnels amples comme l’abaya ou le qamis de base n’en ont généralement pas : l’aisance remplace la pince. On l’ajoute pour une version plus ajustée.',
    example: 'Une pince poitrine part du côté et pointe vers le sommet de la poitrine, en s’arrêtant 2 cm avant.',
    related: ['aisance'],
  },
  {
    id: 'aisance',
    term: 'Aisance',
    category: 'mesures',
    short: 'Centimètres ajoutés à une mesure du corps pour le confort et le style.',
    detail:
      'Un vêtement n’a jamais exactement la mesure du corps : il faut pouvoir respirer, bouger, s’asseoir. L’aisance de confort est d’environ 4 à 8 cm ; l’aisance de style, bien plus grande, donne au vêtement son caractère ample.',
    example: 'Tour de poitrine 92 cm + aisance 16 cm = 108 cm de tour fini pour l’abaya.',
    related: ['pince', 'mesure'],
  },
  {
    id: 'mesure',
    term: 'Mesure de base',
    category: 'mesures',
    short: 'Mesure prise directement sur le corps, sans aisance.',
    detail:
      'Les mesures de base (tours, hauteurs, longueurs) sont la matière première du patron. Prenez-les sur des sous-vêtements fins, sans serrer le ruban, et notez-les toujours avec la date.',
    related: ['aisance'],
  },
  {
    id: 'milieu',
    term: 'Milieu devant / milieu dos',
    category: 'construction',
    short: 'Lignes verticales qui divisent le corps en deux moitiés symétriques.',
    detail:
      'Le patronnage se construit le plus souvent sur une moitié du corps. Le milieu devant et le milieu dos sont les lignes de départ de la construction ; ils sont souvent placés au pli.',
    related: ['pli'],
  },
  {
    id: 'emmanchure',
    term: 'Emmanchure',
    category: 'construction',
    short: 'Ouverture courbe du corps dans laquelle on monte la manche.',
    detail:
      'La longueur de la courbe d’emmanchure (devant + dos) doit correspondre à la longueur de la tête de manche, à 1 cm près. Mesurez les courbes avec un mètre ruban posé sur la tranche.',
    related: ['tete-manche', 'cran'],
  },
  {
    id: 'tete-manche',
    term: 'Tête de manche',
    category: 'construction',
    short: 'Partie haute et arrondie de la manche, cousue dans l’emmanchure.',
    detail:
      'Plus la tête de manche est haute, plus la manche est ajustée. Pour les vêtements amples traditionnels, on utilise une tête basse qui laisse le bras libre.',
    related: ['emmanchure'],
  },
  {
    id: 'fourche',
    term: 'Fourche',
    category: 'construction',
    short: 'Courbe à l’entrejambe où se rejoignent les deux jambes d’un pantalon.',
    detail:
      'La fourche relie le milieu devant (ou dos) à l’entrejambe. Sa profondeur dépend de la hauteur de montant. Dans un sarouel, on « abaisse » volontairement la fourche pour créer l’ampleur caractéristique, et on peut ajouter un gousset pour la mobilité.',
    example: 'Hauteur de montant 27 cm + abaissement 8 cm = fourche à 35 cm sous la taille.',
    related: ['gousset', 'montant'],
  },
  {
    id: 'montant',
    term: 'Montant',
    category: 'mesures',
    short: 'Distance verticale entre la taille et l’entrejambe.',
    detail:
      'Se mesure assis, sur le côté, de la taille à l’assise de la chaise. Un montant trop court tire à l’entrejambe ; trop long, il crée des plis.',
    related: ['fourche'],
  },
  {
    id: 'gousset',
    term: 'Gousset',
    category: 'construction',
    short: 'Petite pièce (losange ou triangle) insérée à l’entrejambe ou sous le bras.',
    detail:
      'Le gousset ajoute de l’espace là où plusieurs coutures se croisent. Il soulage les tensions et évite que le tissu ne craque. Il est souvent placé dans le biais pour être plus souple.',
    related: ['fourche', 'biais'],
  },
  {
    id: 'col-officier',
    term: 'Col officier',
    category: 'construction',
    short: 'Col droit, sans pied séparé, qui se tient debout autour du cou.',
    detail:
      'Aussi appelé col mao. C’est un rectangle légèrement cintré : son bord inférieur remonte de 1 à 1,5 cm vers le devant pour épouser l’inclinaison du cou. Il est toujours entoilé pour rester rigide.',
    related: ['entoilage', 'patte'],
  },
  {
    id: 'patte',
    term: 'Patte de boutonnage',
    category: 'construction',
    short: 'Bande de tissu doublée qui borde une ouverture et porte boutons et boutonnières.',
    detail:
      'Sur le qamis, la patte est posée dans une fente au milieu devant. Les deux pattes se superposent : la largeur de superposition doit être identique à la largeur finie de la patte.',
    related: ['col-officier', 'entoilage'],
  },
  {
    id: 'entoilage',
    term: 'Entoilage',
    category: 'couture',
    short: 'Toile thermocollante qui rigidifie une pièce (col, patte, poignet).',
    detail:
      'On repasse l’entoilage sur l’envers de la pièce, sans faire glisser le fer, avec une pattemouille. Choisissez un entoilage plus léger que votre tissu.',
    related: ['col-officier', 'patte'],
  },
  {
    id: 'cran',
    term: 'Cran (repère)',
    category: 'couture',
    short: 'Petite entaille dans la marge qui sert de repère d’assemblage.',
    detail:
      'Les crans permettent de faire correspondre deux pièces au bon endroit (milieu de la tête de manche avec la couture d’épaule, par exemple). Ne coupez jamais plus profond que la moitié de la marge.',
    related: ['marge', 'emmanchure'],
  },
  {
    id: 'ourlet',
    term: 'Ourlet',
    category: 'couture',
    short: 'Finition du bord inférieur d’un vêtement ou d’une manche, replié et cousu.',
    detail:
      'Un ourlet double (replié deux fois) cache les bords bruts. Sur une abaya, un ourlet généreux de 4 cm alourdit légèrement le bas et améliore le tomber.',
    related: ['marge'],
  },
  {
    id: 'coulisse',
    term: 'Coulisse',
    category: 'couture',
    short: 'Tunnel de tissu dans lequel on fait passer un élastique ou un cordon.',
    detail:
      'La largeur de la coulisse est égale à la largeur de l’élastique + 0,5 cm pour qu’il glisse facilement. On laisse une ouverture de 3 cm pour l’enfiler à l’aide d’une épingle à nourrice.',
    related: ['fourche'],
  },
]
