/**
 * Illustrations des 14 mesures.
 *
 * Chaque schéma montre un vêtement à plat (abaya, qamis, sarouel, manche,
 * ouverture de jilbeb) et le geste de mesure : ruban, flèches, cotes.
 * Aucune figure humaine ni animale n'est représentée.
 */

import type { ReactNode } from 'react'
import type { MeasurementKey } from '@/lib/content/measurements'
import { Arrow, Dashed, Frame, Ring, Tape, INK, ACCENT, SOFT, FILL, FILL_SOFT } from './parts'

const CARD = 'var(--card)'

/** Silhouette de vêtement ample, vue de face, posée à plat. */
function Garment({ hem = 104, back = false }: { hem?: number; back?: boolean }) {
  const neckline = back
    ? `C 96 36 90 39 80 39 C 70 39 64 36 56 30`
    : `C 98 42 90 46 80 46 C 70 46 62 42 56 30`
  return (
    <g>
      <path
        d={`M 56 30 L 42 34 L 22 48 L 32 62 L 52 52 L 50 ${hem} L 110 ${hem} L 108 52 L 128 62 L 138 48 L 118 34 L 104 30 ${neckline} Z`}
        fill={FILL_SOFT}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <line x1={80} y1={50} x2={80} y2={hem - 4} stroke={SOFT} strokeWidth={0.8} strokeDasharray="3 3" />
    </g>
  )
}

function Scene({ children }: { children: ReactNode }) {
  return <Frame>{children}</Frame>
}

export function MeasurementIllustration({ id }: { id: MeasurementKey }) {
  switch (id) {
    case 'tourPoitrine':
      return (
        <Scene>
          <Garment />
          <Ring cx={80} cy={62} rx={27} ry={9} />
          <Tape x1={107} y1={62} x2={119} y2={78} />
          <Arrow x1={108} y1={74} x2={116} y2={80} width={1.2} />
          <Dashed x1={53} y1={62} x2={28} y2={62} />
          <Dashed x1={107} y1={62} x2={132} y2={62} />
        </Scene>
      )

    case 'tourTaille':
      return (
        <Scene>
          <Garment />
          <line x1={54} y1={76} x2={106} y2={76} stroke={SOFT} strokeWidth={2.4} strokeOpacity={0.5} />
          <Ring cx={80} cy={76} rx={25} ry={7.5} />
          <Tape x1={55} y1={76} x2={42} y2={66} />
          <rect x={76} y={83} width={8} height={2.4} rx={1} fill={ACCENT} fillOpacity={0.35} />
          <circle cx={80} cy={85} r={2.2} fill={FILL} stroke={ACCENT} strokeWidth={1.1} />
          <path d="M 80 87 l -4 8 M 80 87 l 4 8" stroke={ACCENT} strokeWidth={1.1} strokeLinecap="round" />
        </Scene>
      )

    case 'tourBassin':
      return (
        <Scene>
          <Garment />
          <Ring cx={80} cy={88} rx={28} ry={9} />
          <Arrow x1={80} y1={88} x2={108} y2={88} width={1.2} />
          <Dashed x1={80} y1={88} x2={52} y2={88} color={ACCENT} />
        </Scene>
      )

    case 'tourCou':
      return (
        <Scene>
          <path
            d="M 30 110 L 30 64 Q 30 38 80 32 Q 130 38 130 64 L 130 110 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <ellipse cx={80} cy={66} rx={25} ry={15} fill={CARD} stroke={INK} strokeWidth={1.4} />
          <ellipse cx={80} cy={66} rx={31} ry={21} fill="none" stroke={SOFT} strokeWidth={0.8} strokeDasharray="3 3" />
          <Ring cx={80} cy={66} rx={34} ry={23} />
          <Tape x1={52} y1={79} x2={42} y2={92} />
        </Scene>
      )

    case 'tourBras':
      return (
        <Scene>
          <path
            d="M 30 44 L 100 39 L 130 48 L 130 72 L 100 81 L 30 76 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <Ring cx={64} cy={59} rx={8.5} ry={18.5} />
          <Tape x1={72} y1={45} x2={84} y2={40} />
          <Dashed x1={64} y1={41} x2={64} y2={26} />
          <Arrow x1={64} y1={26} x2={64} y2={40} width={1.2} />
        </Scene>
      )

    case 'tourPoignet':
      return (
        <Scene>
          <path
            d="M 28 42 L 96 46 L 104 50 L 104 70 L 96 74 L 28 78 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <rect x={100} y={46} width={13} height={28} rx={2.5} fill={FILL} stroke={INK} strokeWidth={1.3} />
          <Ring cx={106} cy={60} rx={7.5} ry={17} />
          <circle cx={106} cy={60} r={1.6} fill={INK} />
          <Tape x1={107} y1={77} x2={118} y2={90} />
        </Scene>
      )

    case 'tourCheville':
      return (
        <Scene>
          <path
            d="M 58 20 L 102 20 L 105 86 L 99 100 L 61 100 L 55 86 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <line x1={58} y1={94} x2={102} y2={94} stroke={SOFT} strokeWidth={1} strokeDasharray="3 2" />
          <Ring cx={80} cy={84} rx={21} ry={7.5} />
          <Tape x1={100} y1={84} x2={115} y2={92} />
          <Dashed x1={55} y1={68} x2={40} y2={68} />
          <Dashed x1={105} y1={68} x2={120} y2={68} />
        </Scene>
      )

    case 'tourVisage':
      return (
        <Scene>
          <path
            d="M 34 112 L 34 58 Q 34 24 80 18 Q 126 24 126 58 L 126 112 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <path
            d="M 80 34 C 104 34 112 50 112 65 C 112 85 98 97 80 97 C 62 97 48 85 48 65 C 48 50 56 34 80 34 Z"
            fill={CARD}
            stroke={INK}
            strokeWidth={1.4}
          />
          <path d="M 34 58 C 46 52 54 44 58 34" fill="none" stroke={SOFT} strokeWidth={0.9} />
          <path d="M 126 58 C 114 52 106 44 102 34" fill="none" stroke={SOFT} strokeWidth={0.9} />
          <Ring cx={80} cy={65} rx={37} ry={36} />
          <Tape x1={113} y1={90} x2={126} y2={102} />
        </Scene>
      )

    case 'carrureDos':
      return (
        <Scene>
          <Garment back />
          <Dashed x1={54} y1={56} x2={106} y2={56} />
          <Arrow x1={54} y1={56} x2={106} y2={56} double />
          <line x1={54} y1={50} x2={54} y2={62} stroke={ACCENT} strokeWidth={1.2} />
          <line x1={106} y1={50} x2={106} y2={62} stroke={ACCENT} strokeWidth={1.2} />
          <Dashed x1={80} y1={39} x2={80} y2={56} />
        </Scene>
      )

    case 'longueurEpaule':
      return (
        <Scene>
          <path
            d="M 44 108 L 44 46 L 64 34 Q 80 46 96 34 L 116 46 L 116 108 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <path d="M 64 34 L 44 46" stroke={ACCENT} strokeWidth={1.9} />
          <circle cx={64} cy={34} r={2.3} fill={ACCENT} />
          <circle cx={44} cy={46} r={2.3} fill={ACCENT} />
          <Arrow x1={62} y1={36} x2={46} y2={45} double width={1.2} />
          <Dashed x1={64} y1={34} x2={64} y2={18} />
          <Dashed x1={44} y1={46} x2={44} y2={62} />
          <path d="M 64 34 Q 80 46 96 34" fill="none" stroke={SOFT} strokeWidth={1} strokeDasharray="3 2" />
        </Scene>
      )

    case 'longueurManche':
      return (
        <Scene>
          <path
            d="M 24 48 L 40 26 L 132 78 L 114 98 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <path d="M 116 82 L 128 88" stroke={INK} strokeWidth={1.3} />
          <Arrow x1={36} y1={38} x2={122} y2={88} double width={1.2} />
          <Dashed x1={36} y1={38} x2={26} y2={52} />
          <path d="M 66 52 L 76 58" stroke={SOFT} strokeWidth={0.9} strokeDasharray="3 2" />
          <path d="M 88 64 L 98 70" stroke={SOFT} strokeWidth={0.9} strokeDasharray="3 2" />
        </Scene>
      )

    case 'longueurTotale':
      return (
        <Scene>
          <Garment hem={98} />
          <Arrow x1={80} y1={34} x2={80} y2={108} double width={1.3} />
          <Dashed x1={80} y1={108} x2={80} y2={114} />
          <line x1={20} y1={114} x2={140} y2={114} stroke={SOFT} strokeWidth={1.4} />
          <line x1={24} y1={114} x2={18} y2={118} stroke={SOFT} strokeWidth={1} />
          <line x1={40} y1={114} x2={34} y2={118} stroke={SOFT} strokeWidth={1} />
          <line x1={56} y1={114} x2={50} y2={118} stroke={SOFT} strokeWidth={1} />
        </Scene>
      )

    case 'hauteurMontant':
      return (
        <Scene>
          <path
            d="M 42 30 L 118 30 L 124 64 L 118 104 L 96 104 L 80 74 L 64 104 L 42 104 L 36 64 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <rect x={42} y={23} width={76} height={8} rx={2} fill={FILL} stroke={INK} strokeWidth={1.2} />
          <Dashed x1={30} y1={31} x2={134} y2={31} />
          <Dashed x1={30} y1={74} x2={134} y2={74} />
          <Arrow x1={132} y1={31} x2={132} y2={74} double width={1.3} />
          <path d="M 80 74 L 80 82" stroke={ACCENT} strokeWidth={1.2} strokeDasharray="3 2" />
        </Scene>
      )

    case 'longueurCote':
      return (
        <Scene>
          <path
            d="M 52 26 L 104 26 L 114 104 L 80 104 L 74 68 L 60 104 L 42 104 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <line x1={52} y1={40} x2={104} y2={40} stroke={SOFT} strokeWidth={2} strokeOpacity={0.5} />
          <path d="M 45 42 C 42 62 40 84 41 102" fill="none" stroke={ACCENT} strokeWidth={1.6} />
          <Arrow x1={45} y1={42} x2={41} y2={102} double width={1.2} />
          <Dashed x1={36} y1={42} x2={52} y2={42} />
          <Dashed x1={32} y1={102} x2={46} y2={102} />
        </Scene>
      )

    default:
      return (
        <Scene>
          <Garment />
          <Ring cx={80} cy={62} rx={27} ry={9} />
        </Scene>
      )
  }
}
