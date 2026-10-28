/**
 * Leçon de maître : tracé géométrique de l'emmanchure de base.
 *
 * Le contenu français est la source de vérité ; la version arabe vit dans
 * `armhole-ar.ts` et partage exactement la même structure.
 */

import type { Locale } from '@/lib/i18n'
import { ARMHOLE_AR } from './armhole-ar'

export type FigureId = 'frame' | 'curve' | 'angles' | 'sleeve' | 'montage'

export type FigureText = {
  centerBack: string
  neckLine: string
  chestLine: string
  shoulderSeam: string
  sideSeam: string
  armhole: string
  breakLine: string
  control1: string
  control2: string
  tangent: string
  hollow: string
  chord: string
  cap: string
  capLength: string
  armholeLength: string
  difference: string
  angleC: string
  angleD: string
  scaleNote: string
  body: string
  sleeve: string
  pins: string
  direction: string
}

export type Block =
  | { kind: 'lead'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][]; numeric?: number[] }
  | { kind: 'formula'; expression: string; caption?: string }
  | { kind: 'note'; tone: 'note' | 'warn' | 'tip'; title: string; text: string }
  | { kind: 'gesture'; title: string; text: string }
  | { kind: 'figure'; id: FigureId; caption: string }
  | { kind: 'cards'; items: { title: string; text: string; meta?: string }[] }
  | { kind: 'steps'; items: { n: string; title: string; text: string; gesture?: string }[] }
  | { kind: 'checks'; head: [string, string, string]; rows: { label: string; value: string; tolerance: string }[] }

export type Section = {
  id: string
  number: string
  title: string
  lead?: string
  blocks: Block[]
}

export type ArmholeLesson = {
  eyebrow: string
  title: string
  subtitle: string
  intro: string
  meta: { reading: string; level: string; garment: string }
  tocTitle: string
  tocHint: string
  figures: FigureText
  sections: Section[]
  closing: { title: string; items: string[] }
  cta: { title: string; text: string; label: string }
}

const FR: ArmholeLesson = {
  eyebrow: 'Leçon de maître · Atelier virtuel guidé',
  title: 'Le tracé de l’emmanchure de base',
  subtitle: 'De l’acromion au creux axillaire : géométrie, geste et matière',
  intro:
    'Une emmanchure n’est pas un arc décoratif entre deux points. C’est la trace plane d’une section tridimensionnelle : le moment exact où le vêtement quitte le thorax pour entourer le bras. Nous allons la construire au millimètre, puis la couper, la stabiliser et la monter comme on le fait en atelier.',
  meta: { reading: '18 min de lecture', level: 'Maîtrise', garment: 'Abaya · TP 92' },
  tocTitle: 'Sommaire de la leçon',
  tocHint: 'Douze étapes, du cadre mathématique au montage à plat.',
  figures: {
    centerBack: 'Milieu dos',
    neckLine: 'Ligne de nuque',
    chestLine: 'Ligne de poitrine',
    shoulderSeam: 'Couture d’épaule',
    sideSeam: 'Couture de côté',
    armhole: 'Emmanchure',
    breakLine: 'Bas du patron',
    control1: 'Point de contrôle 1',
    control2: 'Point de contrôle 2',
    tangent: 'Tangente',
    hollow: 'Creux maximal',
    chord: 'Corde C–D',
    cap: 'Tête de manche',
    capLength: 'Tête de manche',
    armholeLength: 'Emmanchure totale',
    difference: 'Écart',
    angleC: 'Angle en C',
    angleD: 'Angle en D',
    scaleNote: 'Schéma non à l’échelle · cotes en cm',
    body: 'Buste ouvert',
    sleeve: 'Manche',
    pins: 'Épingles',
    direction: 'Sens de piqûre',
  },
  sections: [
    {
      id: 'donnees',
      number: '01',
      title: 'Les données et les points de départ',
      lead:
        'Nous construisons l’emmanchure dos de l’abaya Fil & Patron pour un tour de poitrine de 92 cm, parce que c’est le patron matrice des trois autres. Dans ce gabarit simplifié, l’emmanchure devant est identique ; la variante ajustée est traitée en fin de leçon.',
      blocks: [
        {
          kind: 'p',
          text:
            'Convention d’atelier : toutes les cotes sont en centimètres, x positif vers la droite depuis le milieu dos, y positif vers le bas depuis la ligne de nuque. Mesures de référence : tour de poitrine 92, tour de cou 37, longueur d’épaule 12,5, nuque-sol 140.',
        },
        {
          kind: 'table',
          caption: 'Valeurs de construction du cadre d’emmanchure',
          head: ['Grandeur', 'Formule', 'Valeur', 'Origine géométrique ou anatomique'],
          numeric: [2],
          rows: [
            [
              'Largeur poitrine demi-dos W',
              'TP ÷ 4 + 4',
              '27,0',
              'Le tour de poitrine est divisé en quatre : le patron est une demi-coupe, et le +4 par quart donne +16 cm d’aisance totale. C’est l’aisance de l’abaya, pas une marge de couture.',
            ],
            [
              'Encolure ne',
              'TC ÷ 6 + 0,5',
              '6,7',
              'Module pratique du diamètre du cou, légèrement majoré pour l’aisance. Le cou est assimilé à un cylindre ; TC ÷ π donnerait le diamètre strict, TC ÷ 6 est le module de patronage.',
            ],
            [
              'Épaule sx',
              'ne + LE',
              '19,2',
              'Depuis le milieu dos : demi-encolure + longueur d’épaule. LE est mesurée du milieu du cou à l’acromion, la pointe osseuse de l’épaule.',
            ],
            [
              'Pente d’épaule',
              'fixe',
              '3,5',
              'Pente anatomique moyenne : 3,5 cm de chute pour 12,5 cm de projection, soit 15,6°.',
            ],
            [
              'Profondeur d’emmanchure P',
              'TP ÷ 8 + 12',
              '23,5',
              'TP ÷ 8 est un module anthropométrique de la profondeur du thorax ; +12 est l’aisance verticale de l’abaya. Ce n’est pas une constante anatomique : c’est un paramètre de style qui abaisse l’aisselle pour obtenir le tombé fluide.',
            ],
            [
              'Hauteur de cadre L',
              'LNS − 2',
              '138,0',
              'La nuque-sol moins 2 cm de compensation de tracé.',
            ],
          ],
        },
        {
          kind: 'figure',
          id: 'frame',
          caption:
            'Le cadre de construction : milieu dos, ligne de nuque, ligne de poitrine, épaule et côté. Les cotes indiquent les valeurs du gabarit TP 92.',
        },
        {
          kind: 'table',
          caption: 'Points de construction de l’emmanchure',
          head: ['Point', 'x', 'y', 'Rôle'],
          numeric: [1, 2],
          rows: [
            ['A', '0', '2,0', 'Milieu dos, base de l’encolure dos'],
            ['B', '6,7', '0', 'Côté de l’encolure, sur la ligne de nuque'],
            ['C', '19,2', '3,5', 'Pointe d’épaule, sur l’acromion'],
            ['D', '27,0', '23,5', 'Point sous le bras, dans le creux axillaire'],
            ['E', '37,0', '136,5', 'Bas de couture de côté'],
            ['F', '0', '138,0', 'Milieu dos au bas'],
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Note de précision sur la couture d’épaule',
          text:
            'Le gabarit place C à 12,5 cm horizontalement de B, puis 3,5 cm plus bas. La couture B–C mesure donc √(12,5² + 3,5²) = 13,0 cm, soit 0,5 cm de plus que LE. C’est une aisance d’épaule acceptable pour une abaya. Pour une épaule strictement ajustée à 12,5 cm de couture, la projection horizontale doit être 12,0 cm : C se place alors à 18,7 cm du milieu. Ne mélangez jamais les deux conventions dans le même tracé.',
        },
      ],
    },
    {
      id: 'anatomie',
      number: '02',
      title: 'Ce qu’est réellement une emmanchure',
      lead:
        'Trois volumes commandent le tracé. Les comprendre évite de copier une courbe sans savoir pourquoi elle tourne.',
      blocks: [
        {
          kind: 'list',
          ordered: true,
          items: [
            'Le thorax, assimilable à un cylindre elliptique. La ligne de poitrine y = P est l’horizontale de plus grand développement.',
            'Le bras, assimilable à un cône tronqué. L’acromion (C) est le sommet osseux ; l’aisselle (D) est le creux où le bras s’articule.',
            'L’omoplate et le pectoral, qui expliquent pourquoi, sur une coupe ajustée, l’emmanchure dos est plus plate et l’emmanchure devant plus creusée.',
          ],
        },
        {
          kind: 'p',
          text:
            'En deux dimensions, cela impose deux contraintes contradictoires. En haut, la courbe doit être presque verticale pour ne pas créer de « corne » à l’épaule. En bas, elle doit arriver horizontalement à D pour que la couture de côté et l’emmanchure se rencontrent sans « bec ». C’est pourquoi une emmanchure correcte n’est jamais un simple quart de cercle.',
        },
        {
          kind: 'note',
          tone: 'note',
          title: 'Le principe directeur',
          text:
            'C est un os, D est un creux. L’emmanchure relie l’acromion à l’aisselle, pas deux points arbitraires. La tangente fait la qualité : verticale en C, horizontale en D.',
        },
      ],
    },
    {
      id: 'trace',
      number: '03',
      title: 'Le tracé pas à pas',
      lead: 'Sept gestes, dans l’ordre exact de l’atelier. Chaque cote est vérifiée avant de passer au trait suivant.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              n: '1',
              title: 'Le cadre et l’équerrage',
              text:
                'Sur papier 120 g, tracez une verticale : milieu dos. Une horizontale en haut : ligne de nuque. Leur intersection O doit être exactement à 90°. Tracez ensuite le rectangle de W = 27,0 de large sur L = 138,0 de haut. La ligne de poitrine est à y = 23,5, soit 235 mm sous la ligne de nuque.',
              gesture:
                'L’équerre est posée à plat, la branche longue contre la verticale, la branche courte vers la droite. Le crayon est tenu à 60°, la mine contre la règle, le poignet fixe, l’avant-bras mobile. On tire la ligne vers soi, jamais en poussant.',
            },
            {
              n: '2',
              title: 'A, B et C',
              text:
                'Placez A à 20 mm sous O sur le milieu dos. Placez B à 67 mm à droite de O sur la ligne de nuque. Tracez l’encolure A–B : tangente horizontale en A, arrivée verticale en B. Depuis B, portez 125 mm vers la droite, puis 35 mm vers le bas : vous êtes en C. Tracez la couture d’épaule B–C.',
              gesture:
                'Une encolure qui arrive en angle au milieu dos crée une pointe visible une fois dépliée. Contrôlez immédiatement B–C : 13,0 cm avec la convention du gabarit, ou 12,5 cm si vous avez corrigé la projection à 12,0 cm. Notez la convention choisie en marge du patron.',
            },
            {
              n: '3',
              title: 'D, le point sous le bras',
              text:
                'Depuis la ligne de nuque, descendez de 235 mm. Depuis le milieu dos, portez 270 mm vers la droite. L’intersection est D. Tracez la ligne de poitrine horizontale passant par D, et la verticale de référence à x = 27,0.',
              gesture:
                'Vérifiez l’équerre : D est le point où la courbe d’emmanchure devra arriver à l’horizontale. La couture de côté part de D vers E (37,0 ; 136,5). Elle s’évase de 10 cm sur 113 cm, soit 5,1° par rapport à la verticale.',
            },
            {
              n: '4',
              title: 'La courbe C–D',
              text:
                'La courbe est concave vers le milieu dos : elle creuse légèrement à l’intérieur, puis ressort vers D. Le gabarit utilise un arc de Bézier cubique, dont les points de contrôle sont P1 (17,7 ; 12,9), P2 (20,4 ; 23,5) et P3 = D (27,0 ; 23,5).',
              gesture:
                'Les points de contrôle ne sont pas sur la couture : ce sont des poignées mathématiques. Sur le papier, on ne les pique pas ; on s’en sert pour comprendre la courbure et pour choisir le segment de règle japonaise.',
            },
            {
              n: '5',
              title: 'Le geste à la règle japonaise',
              text:
                'Posez la règle sur C et sur le point le plus creux (18,8 ; 8,65). Choisissez le segment dont la courbure est la plus serrée : c’est la partie haute de l’emmanchure. Vérifiez que le bord passe aussi par le repère (19,1 ; 12,9).',
              gesture:
                'Tenez la règle de la main gauche, pouce sur la partie convexe, doigts écartés, sans glisser. Le crayon est à 60°, la mine contre le bord. Dessinez d’un seul geste continu, de C vers D ; ne repassez pas la courbe par petits traits.',
            },
            {
              n: '6',
              title: 'Les angles et l’équerrage',
              text:
                'En C, la tangente part vers le bas et 9,1° vers le milieu. L’angle entre la couture d’épaule et l’emmanchure est de 83,4°. En D, la tangente est horizontale ; l’angle avec la couture de côté n’est donc que de 84,9°, puisque cette couture s’évase de 5,1°.',
              gesture:
                'Pour un équerrage strict, relevez l’extrémité de 1,3 mm sur les 15 derniers millimètres : la tangente devient perpendiculaire à la couture. Sur une abaya fluide, l’écart est invisible ; sur un tissu structuré, il évite le bec d’aisselle.',
            },
            {
              n: '7',
              title: 'Marges et crans',
              text:
                'Ajoutez 10 mm de marge autour de l’emmanchure. Pas 15 mm : la tête de manche est calibrée sur cette marge. Marquez la ligne de couture au fil de bâti sur l’envers, pas à la craie : la craie sert à la ligne de coupe, le fil à la ligne de couture.',
              gesture:
                'Crans : un à C (épaule), un à D (sous-bras), un cran d’équilibre à mi-hauteur. Profondeur 5 mm maximum, largeur 2 mm, jamais dans la ligne de couture. Code d’atelier : un cran = devant, deux crans = dos.',
            },
          ],
        },
      ],
    },
    {
      id: 'courbe',
      number: '04',
      title: 'La courbe C–D, au millimètre',
      lead:
        'La courbe est une Bézier cubique. Cette écriture mathématique n’est pas un ornement : elle explique pourquoi le creux se déplace et pourquoi deux arcs peuvent se raccorder sans cassure.',
      blocks: [
        {
          kind: 'formula',
          caption: 'Équation de la courbe, pour la culture mathématique et le contrôle des points de passage',
          expression: 'B(t) = (1−t)³·C + 3(1−t)²t·P1 + 3(1−t)t²·P2 + t³·D',
        },
        {
          kind: 'p',
          text:
            'La courbe réelle passe par les repères suivants, à vérifier à la règle. Le creux maximal n’est que de 4 mm (19,2 − 18,79 = 0,41 cm). C’est volontaire pour une abaya : l’aisance remplace le creux d’une emmanchure ajustée.',
        },
        {
          kind: 'table',
          caption: 'Points de passage de la courbe d’emmanchure',
          head: ['y', 'x de la courbe', 'Observation'],
          numeric: [0, 1],
          rows: [
            ['3,5', '19,2', 'C, pointe d’épaule'],
            ['6,0', '18,9', 'Début du creux'],
            ['8,65', '18,79', 'Point le plus creux'],
            ['10,0', '18,82', 'Niveau de la carrure'],
            ['12,9', '19,09', 'Mi-profondeur'],
            ['17,0', '20,04', 'Amorce du retour'],
            ['19,2', '20,97', 'Tiers inférieur'],
            ['21,0', '22,14', 'Approche de D'],
            ['22,3', '23,47', 'Quasi-horizontal'],
            ['23,5', '27,0', 'D, arrivée horizontale'],
          ],
        },
        {
          kind: 'figure',
          id: 'curve',
          caption:
            'La courbe C–D et ses poignées mathématiques. Le creux ne dépasse pas 4 mm : c’est la signature d’une emmanchure d’abaya, pas d’une robe ajustée.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Ne mélangez pas les esthétiques',
          text:
            'Une robe ajustée aurait un creux de 15 à 25 mm. Une abaya travaille avec 3 à 6 mm. Si vous creusez davantage, vous mangez l’aisance et la manche tire ; si vous aplatissez trop, l’emmanchure bâille au porté.',
        },
      ],
    },
    {
      id: 'regle',
      number: '05',
      title: 'Le geste à la règle japonaise',
      lead: 'La règle japonaise ne dessine pas à votre place : elle impose une courbure continue. Le geste se prépare avant de tracer.',
      blocks: [
        {
          kind: 'list',
          ordered: true,
          items: [
            'Posez la règle sur C et sur le point le plus creux (18,8 ; 8,65). Choisissez le segment dont la courbure est la plus serrée : c’est la partie haute de l’emmanchure.',
            'Vérifiez que le bord passe aussi par le repère (19,1 ; 12,9). Si ce n’est pas le cas, changez de segment : la courbe ne doit pas se briser à mi-parcours.',
            'Pour la partie basse, posez la règle sur le creux, puis sur (21,0 ; 19,2), puis sur D. Choisissez le segment qui arrive horizontalement en D.',
            'Si aucune courbe unique ne convient, tracez deux arcs qui se raccordent au creux avec une tangente commune ; effacez le raccord et repassez une seule fois pour fondre les deux arcs.',
            'Contrôlez au ruban posé sur chant : la demi-emmanchure doit mesurer 23,85 cm, soit 47,7 cm pour l’ensemble devant + dos. Tolérance : ±2 mm sur la demi.',
          ],
        },
        {
          kind: 'gesture',
          title: 'La main, le poignet, la mine',
          text:
            'Règle tenue de la main gauche, pouce sur la partie convexe, doigts écartés, sans glisser. Crayon à 60°, mine contre le bord, poignet fixe et avant-bras mobile. On dessine de C vers D d’un seul geste continu. Repasser par petits traits casse la courbe et crée des micro-angles invisibles à l’œil mais sensibles au montage.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Le contrôle au ruban sur chant',
          text:
            'Un ruban posé à plat sous-estime la longueur d’une courbe. Posez-le sur chant, perpendiculaire au papier, et faites-le épouser le trait sans le tirer. C’est la seule mesure qui correspondra à la tête de manche.',
        },
      ],
    },
    {
      id: 'angles',
      number: '06',
      title: 'Angles, tangentes et équerrage',
      lead: 'Deux angles décident du tombé : l’un à l’épaule, l’autre sous le bras. Ils se contrôlent au rapporteur, pas à l’œil.',
      blocks: [
        {
          kind: 'list',
          items: [
            'En C, la tangente part vers le bas et 9,1° vers le milieu. L’angle entre la couture d’épaule et l’emmanchure est de 83,4°. Il doit rester entre 80° et 90° : au-delà, on obtient une corne ; en dessous, l’épaule est mangée.',
            'En D, la tangente est horizontale. L’angle avec la couture de côté n’est donc que de 84,9°, puisque cette couture s’évase de 5,1°. Pour un équerrage strict, relevez l’extrémité de 1,3 mm sur les 15 derniers millimètres.',
          ],
        },
        {
          kind: 'figure',
          id: 'angles',
          caption:
            'Contrôle des deux angles critiques. À gauche l’épaule, à droite le sous-bras : la tangente doit rester dans la fourchette 80–90°.',
        },
        {
          kind: 'note',
          tone: 'tip',
          title: 'Le test du papier plié',
          text:
            'Pliez le patron le long de la couture de côté, puis regardez l’emmanchure en transparence. Si la tangente en D se relève vers l’extérieur, vous aurez un bec à l’aisselle. Redressez les 15 derniers millimètres avant de couper.',
        },
      ],
    },
    {
      id: 'outils',
      number: '07',
      title: 'Le geste exact, outil par outil',
      lead: 'Un tracé juste peut être ruiné par une craie mal tenue ou des ciseaux qui soulèvent le tissu. Voici la gestuelle d’atelier.',
      blocks: [
        {
          kind: 'table',
          caption: 'Gestes professionnels et erreurs à éviter',
          head: ['Outil', 'Geste professionnel', 'Erreur à éviter'],
          rows: [
            [
              'Craie tailleur',
              'Tenue inclinée à 30–40°, tranchant affûté, marques par petits traits perpendiculaires à la ligne. La main repose sur le patron, pas sur le tissu.',
              'La craie verticale qui laboure le tissu et déplace les fils ; la ligne continue qui étire le biais.',
            ],
            [
              'Papier de patron',
              'Posez des poids plutôt que des épingles sur la courbe. Si vous épinglez, piquez à 1 cm à l’intérieur de la ligne, perpendiculairement.',
              'Les épingles plantées dans la courbe, qui déforment le biais au moment de couper.',
            ],
            [
              'Ciseaux d’atelier',
              'Lame inférieure à plat sur la table, lame supérieure verticale. Coupez la courbe de C vers D en une seule direction, par morsures de 2–3 mm, sans soulever le tissu. Le pivot reste au-dessus de la table.',
              'Couper en fermant complètement les lames ; soulever le tissu ; attaquer la courbe avec la pointe.',
            ],
            [
              'Ruban mesureur',
              'Pour mesurer la courbe, posez-le sur chant, pas à plat. Pour mesurer le corps, un doigt sous le ruban, horizontal, sans comprimer.',
              'Tirer le ruban : on sous-estime la longueur et on croit que l’emmanchure est trop courte.',
            ],
            [
              'Machine',
              'Aiguille 70/10 pour crêpe, 80/12 pour nidha, 90/14 pour velours. Longueur 2,2–2,5 mm. Le pied se lève pour engager la courbe, puis se redescend.',
              'Tirer la courbe devant et derrière l’aiguille : d’où les vagues.',
            ],
            [
              'Fer',
              'Jeannette sous l’emmanchure ; fer pointe sur la courbe, jamais la semelle à plat. Ouvrez la marge, puis couchez-la vers le corps.',
              'Repasser en travers du biais : l’emmanchure s’allonge et ne revient plus.',
            ],
          ],
        },
      ],
    },
    {
      id: 'matiere',
      number: '08',
      title: 'L’anatomie de la matière',
      lead:
        'L’emmanchure est une couture en biais. Au niveau du creux, les fils sont à 45° : c’est là que le tissu s’allonge le plus. Le comportement du textile commande la préparation.',
      blocks: [
        {
          kind: 'cards',
          items: [
            {
              title: 'Crêpe, viscose',
              meta: 'Très fluide · biais élastique',
              text: 'L’emmanchure peut s’allonger de 5 à 8 mm au porté. Surpiqûre de maintien à 2 mm de la ligne, fil 120, aiguille 70/10. Laissez reposer 24 h avant de monter la manche.',
            },
            {
              title: 'Nidha',
              meta: 'Dense · peu extensible',
              text: 'Prend bien le fer, mais risque de brillance sous l’aisselle. Fer avec pattemouille, sans glisser. L’emmanchure tient sa forme : pas de surpiqûre inutile.',
            },
            {
              title: 'Moubra, velours',
              meta: 'Poil directionnel · épais',
              text: 'Aucune tolérance au repassage direct. Coupez toutes les pièces dans le même sens du poil. Surjetez le bord avant assemblage. Pressez sur planche à aiguilles, vapeur par l’envers.',
            },
            {
              title: 'Lin',
              meta: 'Rigide · effiloché',
              text: 'Surjetez le bord avant la surpiqûre de maintien ; repassez à fer chaud avec vapeur. La courbe tient mieux, mais le bord s’effiloche vite.',
            },
            {
              title: 'Tissu lâche',
              meta: 'Biais instable',
              text: 'Chaînage : une chaînette lâche au fil de coton, à 2 mm à l’intérieur de la ligne de couture. Retirez-la après montage.',
            },
          ],
        },
        {
          kind: 'note',
          tone: 'note',
          title: 'Stabiliser n’est pas finir',
          text:
            'La surpiqûre de maintien et le chaînage ne sont pas des finitions : ce sont des stabilisateurs de géométrie. Ils empêchent la courbe de s’allonger avant que la manche ne la fixe.',
        },
      ],
    },
    {
      id: 'atelier',
      number: '09',
      title: 'La logique d’atelier',
      lead:
        'L’ordre n’est pas arbitraire. Il répond à une seule question : à quel moment la courbe est-elle encore accessible et stable ?',
      blocks: [
        {
          kind: 'list',
          ordered: true,
          items: [
            'Surpiqûre de maintien des deux emmanchures, à 2 mm à l’intérieur de la ligne, avant toute manipulation. La courbe est encore plate, on peut la stabiliser sans la déformer.',
            'Coutures d’épaules, puis ouverture au fer sur jeannette. Le cadre du buste est fixé.',
            'Préparation de la manche : crans d’épaule, de devant, de dos ; deux rangs de fronces à 6 et 9 mm du bord, entre les crans. Répartissez l’embu au tiers supérieur de la tête.',
            'Montage à plat : le buste est encore ouvert, l’emmanchure est un arc accessible. Placez la manche endroit contre endroit, épinglez au cran d’épaule, au cran sous-bras et aux crans d’équilibre. Piquez de D vers C de chaque côté, manche au-dessus, en contrôlant l’embu.',
            'Surjet des deux marges ensemble, 3 fils, largeur 3 mm, sans rogner la couture.',
            'Fermeture du dessous : côté + manche en une seule passe, du bas vers le poignet, en faisant correspondre D. Cette continuité évite un décalage au creux axillaire.',
            'Ferraillage : ouverture des marges sur jeannette, puis couchées vers le corps. Contrôle final à plat et en volume.',
          ],
        },
        {
          kind: 'figure',
          id: 'montage',
          caption:
            'Montage à plat : le buste reste ouvert, la manche est posée endroit contre endroit. On pique de D vers C, manche au-dessus, en contrôlant l’embu.',
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Pourquoi ne pas monter la manche en rond ?',
          text:
            'Une fois le côté fermé, l’emmanchure devient un tunnel. Le montage à plat permet de voir la courbe, de répartir l’embu et de corriger un décalage de 2 mm. La manche en rond est réservée aux vestes tailleur, où l’épaule est construite et où l’on cherche un tombé différent.',
        },
      ],
    },
    {
      id: 'controles',
      number: '10',
      title: 'Contrôles chiffrés et corrections',
      lead: 'Un patron ne se juge pas à l’œil. Il se mesure, se compare, puis se corrige dans l’ordre des causes.',
      blocks: [
        {
          kind: 'checks',
          head: ['Contrôle', 'Valeur pour TP 92', 'Tolérance'],
          rows: [
            { label: 'Demi-emmanchure C–D', value: '23,85 cm', tolerance: '±2 mm' },
            { label: 'Emmanchure totale', value: '47,7 cm', tolerance: '±4 mm' },
            { label: 'Angle en C', value: '83,4°', tolerance: '80–90°' },
            { label: 'Angle en D avec le côté', value: '84,9°', tolerance: '90° ±2°' },
            { label: 'Creux maximal', value: '0,41 cm', tolerance: '0,3–0,6 cm' },
            { label: 'Rapport courbe / corde', value: '1,11', tolerance: '1,08–1,15' },
            { label: 'Largeur dos à y = 10', value: '37,6 cm', tolerance: 'CD + 1 à 2 cm' },
            { label: 'Marge d’emmanchure', value: '10 mm', tolerance: 'exact' },
            { label: 'Cran', value: '5 mm', tolerance: '≤ 5 mm' },
          ],
        },
        {
          kind: 'p',
          text:
            'Le contrôle de la carrure est le plus parlant : à 10 cm sous la nuque, la largeur entre les deux emmanchures vaut 2 × 18,82 = 37,64 cm. Pour une carrure mesurée à 36 cm, on a 1,6 cm d’aisance : c’est cohérent. Si vous trouvez 40 cm, l’emmanchure est trop creusée ou trop large ; si vous trouvez 34 cm, elle est trop plate.',
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'L’emmanchure bâille',
              meta: 'Cause : épaule ou creux',
              text: 'Ne reprenez pas la couture de côté. Vérifiez d’abord l’épaule (3 mm de trop) et le creux. Réduisez P de 5 mm si le volume est en cause.',
            },
            {
              title: 'Elle mord l’aisselle',
              meta: 'Cause : D trop haut',
              text: 'Abaissez D de 5 mm, puis reprenez la tête de manche. Ne creusez jamais l’emmanchure pour faire entrer une manche trop courte.',
            },
            {
              title: 'Elle est ondulée',
              meta: 'Cause : surpiqûre tirée',
              text: 'Recoupez 2 mm, stabilisez au ruban de soie et repiquez sans tension. Le biais a été étiré : il ne reviendra pas.',
            },
            {
              title: 'La tête de manche plisse',
              meta: 'Cause : embu mal réparti',
              text: 'Défaites, repiquez en concentrant les fronces au tiers supérieur, jamais au sous-bras.',
            },
            {
              title: 'Un bec apparaît en D',
              meta: 'Cause : tangente non perpendiculaire',
              text: 'La tangente n’est pas perpendiculaire à la couture de côté. Reprenez les 15 derniers millimètres.',
            },
          ],
        },
      ],
    },
    {
      id: 'variantes',
      number: '11',
      title: 'Variantes et point de vigilance',
      lead: 'Le principe des tangentes ne change pas. Ce qui change, c’est la profondeur, le creux et la répartition devant / dos.',
      blocks: [
        {
          kind: 'cards',
          items: [
            {
              title: 'Qamis',
              meta: 'P = 21,5 · W = 28,0',
              text: 'L’emmanchure est 2 cm moins profonde et 1 cm plus large ; la courbe est plus plate, l’aisance totale passe à 20 cm. Le principe des tangentes reste identique.',
            },
            {
              title: 'Robe ajustée',
              meta: 'P = 17–19 · W = 25–26',
              text: 'Le creux passe à 15–25 mm, et le devant descend de 1 à 1,5 cm plus bas que le dos. Le dos reste plus plat. La tête de manche doit être recalculée.',
            },
            {
              title: 'Sans manche',
              meta: 'Parementure 3–4 cm',
              text: 'Parementure coupée dans le biais pour suivre la courbe ; surpiqûre, sous-piqûre, presse. Sans parementure, l’emmanchure s’allonge et bâille.',
            },
          ],
        },
        {
          kind: 'note',
          tone: 'warn',
          title: 'Le point de vigilance du gabarit simplifié',
          text:
            'Avec T = P ÷ 3 = 7,8 et S = TBr + 14 = 42, la tête de manche obtenue mesure environ 45,5 cm pour une emmanchure de 47,7 cm : elle est courte de 2,2 cm. Le gabarit didactique donne un point de départ, pas une vérité de coupe. Mesurez toujours la tête avant de couper : elle doit dépasser l’emmanchure de 1 à 1,5 cm. Pour cet exemple, il faut soit élargir le haut de manche à environ 45 cm, soit augmenter T à environ 11 cm, puis re-mesurer. On ne rétrécit jamais l’emmanchure pour faire entrer une tête trop courte.',
        },
        {
          kind: 'figure',
          id: 'sleeve',
          caption:
            'Comparaison des développés : la tête de manche du gabarit mesure 45,5 cm, l’emmanchure 47,7 cm. L’écart de 2,2 cm se corrige sur la manche, jamais sur l’emmanchure.',
        },
      ],
    },
  ],
  closing: {
    title: 'À retenir',
    items: [
      'C est un os, D est un creux : l’emmanchure relie l’acromion à l’aisselle, pas deux points arbitraires.',
      'La tangente fait la qualité : verticale et à 9° en C, horizontale en D. C’est elle qui évite la corne et le bec.',
      'Le creux de l’abaya est faible, 4 mm : l’aisance fait le tombé. Le creux de 2 cm est celui d’une robe ajustée.',
      'L’emmanchure est une couture en biais : surpiqûre de maintien, chaînage si tissu lâche, jamais de traction.',
      'On monte à plat, on vérifie à plat, on presse sur jeannette : la géométrie doit survivre au volume.',
    ],
  },
  cta: {
    title: 'Passer du tracé à la coupe',
    text: 'Retrouvez l’emmanchure dans le patron Abaya, avec vos mesures et la checklist des étapes.',
    label: 'Ouvrir le patron Abaya',
  },
}

export function getArmholeLesson(locale: Locale): ArmholeLesson {
  return locale === 'ar' ? ARMHOLE_AR : FR
}
