/**
 * Illustrations du glossaire (21 termes).
 *
 * Objets uniquement : tissu, patron, ruban, ciseaux absents, fer à repasser,
 * boutons, cordon. Aucune figure humaine ni animale.
 * Les rares textes sont des cotes ou des angles, traduits via `cmUnit`.
 */

import type { ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'
import { cmUnit } from '@/lib/patterns/localized'
import { Arrow, Button, Cloth, Dashed, Frame, Label, Ring, Tape, INK, ACCENT, SOFT, FILL, FILL_SOFT } from './parts'

const CARD = 'var(--card)'

function Scene({ children }: { children: ReactNode }) {
  return <Frame>{children}</Frame>
}

/** Quadrillage de fils verticaux (chaîne). */
function Grain({ x1, x2, y1, y2, count = 5 }: { x1: number; x2: number; y1: number; y2: number; count?: number }) {
  return (
    <g stroke={SOFT} strokeWidth={0.7} strokeOpacity={0.65}>
      {Array.from({ length: count }, (_, i) => {
        const x = x1 + ((i + 1) * (x2 - x1)) / (count + 1)
        return <line key={x} x1={x} y1={y1} x2={x} y2={y2} />
      })}
    </g>
  )
}

export function GlossaryIllustration({ id, locale }: { id: string; locale: Locale }) {
  const unit = cmUnit(locale)

  switch (id) {
    /* ---------------------------------------------------------------- tissu */
    case 'droit-fil':
      return (
        <Scene>
          <Cloth x={26} y={26} w={108} h={68} grain={6} />
          <line x1={26} y1={26} x2={26} y2={94} stroke={ACCENT} strokeWidth={2.2} strokeOpacity={0.5} />
          <line x1={134} y1={26} x2={134} y2={94} stroke={ACCENT} strokeWidth={2.2} strokeOpacity={0.5} />
          <Arrow x1={80} y1={98} x2={80} y2={22} width={1.5} head={5} />
          <line x1={80} y1={102} x2={80} y2={98} stroke={ACCENT} strokeWidth={1.4} />
        </Scene>
      )

    case 'lisiere':
      return (
        <Scene>
          <rect x={30} y={24} width={100} height={72} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={30} x2={130} y1={24} y2={96} count={5} />
          <rect x={30} y={24} width={7} height={72} fill={ACCENT} fillOpacity={0.22} stroke={ACCENT} strokeWidth={1.5} />
          <rect x={123} y={24} width={7} height={72} fill={ACCENT} fillOpacity={0.22} stroke={ACCENT} strokeWidth={1.5} />
          <Arrow x1={80} y1={60} x2={40} y2={60} width={1.3} />
          <Arrow x1={80} y1={60} x2={120} y2={60} width={1.3} />
          <g stroke={SOFT} strokeWidth={0.9} strokeLinecap="round">
            <line x1={30} y1={30} x2={22} y2={26} />
            <line x1={30} y1={72} x2={22} y2={76} />
            <line x1={130} y1={36} x2={138} y2={32} />
            <line x1={130} y1={78} x2={138} y2={82} />
          </g>
        </Scene>
      )

    case 'biais':
      return (
        <Scene>
          <rect x={32} y={20} width={96} height={80} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={32} x2={128} y1={20} y2={100} count={6} />
          <line x1={32} y1={100} x2={128} y2={20} stroke={ACCENT} strokeWidth={2.4} />
          <path d="M 32 78 A 22 22 0 0 1 54 100" fill="none" stroke={SOFT} strokeWidth={1.2} />
          <Label x={61} y={96} size={9} weight={700} color={ACCENT}>
            45°
          </Label>
          <Dashed x1={32} y1={20} x2={128} y2={20} />
          <line x1={32} y1={20} x2={32} y2={100} stroke={SOFT} strokeWidth={2} strokeOpacity={0.5} />
        </Scene>
      )

    case 'laize':
      return (
        <Scene>
          <rect x={30} y={30} width={100} height={56} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={30} x2={130} y1={30} y2={86} count={5} />
          <rect x={30} y={30} width={6} height={56} fill={ACCENT} fillOpacity={0.2} />
          <rect x={124} y={30} width={6} height={56} fill={ACCENT} fillOpacity={0.2} />
          <Dashed x1={30} y1={86} x2={30} y2={100} />
          <Dashed x1={130} y1={86} x2={130} y2={100} />
          <Arrow x1={30} y1={100} x2={130} y2={100} double width={1.4} />
          <Label x={80} y={114} size={9} weight={700} color={ACCENT}>
            {`140 ${unit}`}
          </Label>
        </Scene>
      )

    case 'pli':
      return (
        <Scene>
          <rect x={22} y={24} width={116} height={72} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.2} />
          <rect x={22} y={24} width={58} height={72} fill={FILL} stroke="none" />
          <line x1={80} y1={20} x2={80} y2={100} stroke={ACCENT} strokeWidth={2.6} />
          <path
            d="M 34 88 L 34 42 Q 34 34 46 34 L 68 34 L 68 88 Z"
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.6}
          />
          <path
            d="M 126 88 L 126 42 Q 126 34 114 34 L 92 34 L 92 88 Z"
            fill="none"
            stroke={SOFT}
            strokeWidth={1.3}
            strokeDasharray="3.5 2.5"
          />
          <Arrow x1={102} y1={104} x2={82} y2={104} width={1.3} />
          <Dashed x1={80} y1={100} x2={80} y2={106} />
        </Scene>
      )

    /* ---------------------------------------------------------- construction */
    case 'marge':
      return (
        <Scene>
          <path
            d="M 44 32 L 96 30 Q 110 54 104 84 L 52 96 Q 36 64 44 32 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path
            d="M 36 24 L 104 22 Q 120 54 112 92 L 44 104 Q 26 64 36 24 Z"
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.3}
            strokeDasharray="4 3"
            strokeLinejoin="round"
          />
          <Arrow x1={102} y1={34} x2={110} y2={28} width={1.2} head={4} />
          <Arrow x1={62} y1={92} x2={52} y2={100} width={1.2} head={4} />
          <Arrow x1={39} y1={66} x2={31} y2={66} width={1.2} head={4} />
          <Label x={116} y={106} size={8.5} weight={700} color={ACCENT} anchor="end">
            {`+1 ${unit}`}
          </Label>
        </Scene>
      )

    case 'pince':
      return (
        <Scene>
          <rect x={26} y={22} width={108} height={80} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={26} x2={134} y1={22} y2={102} count={5} />
          <path d="M 58 36 L 102 36 L 80 88 Z" fill={FILL} stroke={ACCENT} strokeWidth={1.7} strokeLinejoin="round" />
          <Dashed x1={80} y1={30} x2={80} y2={94} color={ACCENT} />
          <Arrow x1={54} y1={60} x2={68} y2={60} width={1.2} head={4} />
          <Arrow x1={106} y1={60} x2={92} y2={60} width={1.2} head={4} />
          <circle cx={80} cy={88} r={1.8} fill={ACCENT} />
        </Scene>
      )

    case 'aisance':
      return (
        <Scene>
          <path
            d="M 64 30 C 68 38 74 41 80 41 C 86 41 92 38 96 30 L 100 34 L 104 78 L 98 98 L 62 98 L 56 78 L 60 34 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path
            d="M 48 28 C 56 40 68 45 80 45 C 92 45 104 40 112 28 L 120 36 L 128 84 L 118 108 L 42 108 L 32 84 L 40 36 Z"
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeDasharray="4 3"
            strokeLinejoin="round"
          />
          <Arrow x1={50} y1={66} x2={62} y2={66} width={1.3} />
          <Arrow x1={110} y1={66} x2={98} y2={66} width={1.3} />
        </Scene>
      )

    case 'mesure':
      return (
        <Scene>
          <path
            d="M 54 26 L 74 30 L 80 42 L 86 30 L 106 26 L 112 52 L 116 100 L 44 100 L 48 52 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <Ring cx={80} cy={58} rx={31} ry={10} />
          <Tape x1={110} y1={64} x2={124} y2={84} />
          <g stroke={SOFT} strokeWidth={0.9}>
            <line x1={62} y1={54} x2={62} y2={58} />
            <line x1={72} y1={53} x2={72} y2={57} />
            <line x1={88} y1={53} x2={88} y2={57} />
            <line x1={98} y1={54} x2={98} y2={58} />
          </g>
        </Scene>
      )

    case 'milieu':
      return (
        <Scene>
          <rect x={24} y={22} width={112} height={80} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.2} />
          <rect x={80} y={22} width={56} height={80} fill={SOFT} fillOpacity={0.07} />
          <line x1={80} y1={18} x2={80} y2={106} stroke={ACCENT} strokeWidth={2.4} strokeDasharray="6 3" />
          <path d="M 40 92 L 40 40 Q 40 32 50 32 L 70 32 L 70 92 Z" fill="none" stroke={ACCENT} strokeWidth={1.6} />
          <path
            d="M 120 92 L 120 40 Q 120 32 110 32 L 90 32 L 90 92 Z"
            fill="none"
            stroke={SOFT}
            strokeWidth={1.2}
            strokeDasharray="3.5 2.5"
          />
          <Arrow x1={52} y1={104} x2={76} y2={104} width={1.2} head={4} />
          <Arrow x1={108} y1={104} x2={84} y2={104} width={1.2} head={4} />
        </Scene>
      )

    case 'emmanchure':
      return (
        <Scene>
          <path
            d="M 30 22 L 82 22 L 88 34 C 70 48 70 68 88 82 L 84 104 L 30 104 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <Grain x1={30} x2={84} y1={22} y2={104} count={4} />
          <path d="M 88 34 C 70 48 70 68 88 82" fill="none" stroke={ACCENT} strokeWidth={2.6} />
          <circle cx={88} cy={34} r={2.2} fill={ACCENT} />
          <circle cx={88} cy={82} r={2.2} fill={ACCENT} />
          <Arrow x1={86} y1={44} x2={76} y2={54} width={1.2} head={4} />
          <Arrow x1={76} y1={64} x2={86} y2={74} width={1.2} head={4} />
        </Scene>
      )

    case 'tete-manche':
      return (
        <Scene>
          <path
            d="M 18 84 L 18 60 C 18 36 32 24 46 24 C 60 24 74 36 74 60 L 74 84 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path d="M 18 60 C 18 36 32 24 46 24 C 60 24 74 36 74 60" fill="none" stroke={ACCENT} strokeWidth={2.6} />
          <circle cx={18} cy={60} r={2.2} fill={ACCENT} />
          <circle cx={74} cy={60} r={2.2} fill={ACCENT} />
          <line x1={18} y1={90} x2={74} y2={90} stroke={SOFT} strokeWidth={2} strokeOpacity={0.5} />

          <Dashed x1={82} y1={48} x2={96} y2={48} color={ACCENT} />

          <path d="M 104 32 L 150 32 L 150 96 L 104 96 Z" fill={FILL_SOFT} stroke={INK} strokeWidth={1.3} />
          <path d="M 104 32 C 118 72 136 72 150 32" fill="none" stroke={ACCENT} strokeWidth={2.6} />
          <circle cx={104} cy={32} r={2.2} fill={ACCENT} />
          <circle cx={150} cy={32} r={2.2} fill={ACCENT} />
          <Arrow x1={112} y1={68} x2={126} y2={64} width={1.1} head={4} />
        </Scene>
      )

    case 'fourche':
      return (
        <Scene>
          <path
            d="M 42 26 L 118 26 L 124 60 L 118 102 L 96 102 L 80 70 L 64 102 L 42 102 L 36 60 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <rect x={42} y={20} width={76} height={7} rx={2} fill={FILL} stroke={INK} strokeWidth={1.1} />
          <path d="M 64 102 C 64 84 71 74 80 70 C 89 74 96 84 96 102" fill="none" stroke={ACCENT} strokeWidth={2.4} />
          <Dashed x1={30} y1={70} x2={130} y2={70} />
          <Arrow x1={126} y1={70} x2={126} y2={92} width={1.2} head={4} />
        </Scene>
      )

    case 'montant':
      return (
        <Scene>
          <path
            d="M 52 26 L 104 26 L 114 102 L 80 102 L 74 68 L 60 102 L 42 102 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <rect x={52} y={20} width={52} height={7} rx={2} fill={FILL} stroke={INK} strokeWidth={1.1} />
          <Dashed x1={28} y1={30} x2={132} y2={30} />
          <Dashed x1={28} y1={68} x2={132} y2={68} />
          <Arrow x1={128} y1={30} x2={128} y2={68} double width={1.4} />
          <circle cx={74} cy={68} r={2} fill={ACCENT} />
        </Scene>
      )

    case 'gousset':
      return (
        <Scene>
          <path
            d="M 30 20 L 70 20 L 70 54 L 80 62 L 90 54 L 90 20 L 130 20 L 130 104 L 92 104 L 80 74 L 68 104 L 30 104 Z"
            fill={FILL_SOFT}
            stroke={INK}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <path d="M 70 20 L 70 54 L 80 62 L 90 54 L 90 20" fill="none" stroke={SOFT} strokeWidth={0.9} strokeDasharray="3 2" />
          <path d="M 80 44 L 96 60 L 80 76 L 64 60 Z" fill={FILL} stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" />
          <path d="M 72 52 L 88 68 M 88 52 L 72 68" stroke={ACCENT} strokeWidth={0.9} strokeDasharray="2.5 2" />
          <Arrow x1={108} y1={60} x2={98} y2={60} width={1.2} head={4} />
        </Scene>
      )

    case 'col-officier':
      return (
        <Scene>
          <path d="M 48 104 Q 80 82 112 104" fill="none" stroke={SOFT} strokeWidth={1.3} strokeDasharray="4 3" />
          <path
            d="M 34 92 L 34 58 Q 80 30 126 58 L 126 92 L 112 92 L 112 64 Q 80 44 48 64 L 48 92 Z"
            fill={FILL}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path d="M 48 64 Q 80 44 112 64" fill="none" stroke={ACCENT} strokeWidth={1.8} />
          <line x1={80} y1={40} x2={80} y2={92} stroke={SOFT} strokeWidth={1} strokeDasharray="3 2" />
          <circle cx={80} cy={84} r={2.2} fill={CARD} stroke={INK} strokeWidth={1.2} />
          <Dashed x1={34} y1={98} x2={34} y2={108} />
          <Dashed x1={126} y1={98} x2={126} y2={108} />
        </Scene>
      )

    case 'patte':
      return (
        <Scene>
          <rect x={22} y={20} width={116} height={84} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.3} />
          <Grain x1={22} x2={138} y1={20} y2={104} count={5} />
          <rect x={58} y={20} width={22} height={84} fill={FILL} stroke={ACCENT} strokeWidth={1.4} />
          <rect x={80} y={20} width={22} height={84} fill={FILL_SOFT} stroke={ACCENT} strokeWidth={1.4} />
          <line x1={80} y1={20} x2={80} y2={104} stroke={ACCENT} strokeWidth={1.6} strokeDasharray="5 3" />
          {[34, 54, 74, 94].map((y) => (
            <g key={y}>
              <Button cx={69} cy={y} r={3.2} />
              <line x1={91} y1={y - 3} x2={91} y2={y + 3} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
            </g>
          ))}
          <Arrow x1={46} y1={110} x2={58} y2={110} width={1.2} head={4} />
          <Arrow x1={114} y1={110} x2={102} y2={110} width={1.2} head={4} />
        </Scene>
      )

    /* -------------------------------------------------------------- couture */
    case 'entoilage':
      return (
        <Scene>
          <rect x={28} y={66} width={104} height={38} rx={2} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={28} x2={132} y1={66} y2={104} count={5} />
          <rect x={38} y={38} width={84} height={24} rx={2} fill={FILL} stroke={ACCENT} strokeWidth={1.3} strokeDasharray="4 2.5" />
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={44 + (i % 7) * 12} cy={44 + Math.floor(i / 7) * 12} r={1.1} fill={ACCENT} />
          ))}
          <Arrow x1={80} y1={30} x2={80} y2={62} width={1.4} head={5} />
          <path d="M 50 10 L 104 10 L 114 16 L 112 20 L 48 20 Q 44 20 44 15 Q 44 10 50 10 Z" fill={FILL} stroke={INK} strokeWidth={1.3} />
          <path d="M 60 10 L 60 5 Q 60 2 65 2 L 95 2 Q 100 2 100 5 L 100 10" fill="none" stroke={INK} strokeWidth={1.6} />
          <g fill={SOFT} fillOpacity={0.55}>
            <circle cx={62} cy={26} r={1.2} />
            <circle cx={80} cy={28} r={1.2} />
            <circle cx={98} cy={26} r={1.2} />
          </g>
        </Scene>
      )

    case 'cran':
      return (
        <Scene>
          <rect x={20} y={24} width={56} height={72} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <rect x={84} y={24} width={56} height={72} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <path d="M 76 52 L 68 60 L 76 68 Z" fill={CARD} stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
          <path d="M 84 52 L 92 60 L 84 68 Z" fill={CARD} stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
          <Dashed x1={58} y1={60} x2={102} y2={60} color={ACCENT} />
          <Arrow x1={40} y1={60} x2={64} y2={60} width={1.2} head={4} />
          <Arrow x1={120} y1={60} x2={96} y2={60} width={1.2} head={4} />
        </Scene>
      )

    case 'ourlet':
      return (
        <Scene>
          <rect x={42} y={18} width={76} height={62} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <Grain x1={42} x2={118} y1={18} y2={80} count={4} />
          <path d="M 42 80 L 42 96 Q 42 104 50 104 L 118 104 L 118 80" fill={FILL} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
          <path d="M 42 80 Q 42 88 50 88 L 118 88" fill="none" stroke={SOFT} strokeWidth={1} strokeDasharray="3 2" />
          <line x1={42} y1={92} x2={118} y2={92} stroke={ACCENT} strokeWidth={1.3} strokeDasharray="4 3" />
          <Dashed x1={126} y1={80} x2={126} y2={104} color={ACCENT} />
          <Arrow x1={132} y1={104} x2={132} y2={82} width={1.3} head={4} />
          <Label x={72} y={116} size={8.5} weight={700} color={ACCENT}>
            {`4 ${unit}`}
          </Label>
        </Scene>
      )

    case 'coulisse':
      return (
        <Scene>
          <rect x={22} y={38} width={116} height={44} rx={3} fill={FILL_SOFT} stroke={INK} strokeWidth={1.4} />
          <rect x={26} y={46} width={108} height={28} rx={2} fill={FILL} stroke={ACCENT} strokeWidth={1.2} />
          <line x1={26} y1={50} x2={134} y2={50} stroke={ACCENT} strokeWidth={1} strokeDasharray="4 3" />
          <line x1={26} y1={70} x2={134} y2={70} stroke={ACCENT} strokeWidth={1} strokeDasharray="4 3" />
          <path d="M 32 60 Q 44 50 56 60 T 80 60 T 104 60 T 128 60" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
          <path d="M 128 60 L 138 52" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
          <path d="M 138 52 q 6 -4 0 -8 q -6 4 0 8" fill={CARD} stroke={INK} strokeWidth={1.1} />
        </Scene>
      )

    default:
      return (
        <Scene>
          <Cloth x={30} y={26} w={100} h={68} grain={4} />
          <Ring cx={80} cy={60} rx={30} ry={10} />
        </Scene>
      )
  }
}
