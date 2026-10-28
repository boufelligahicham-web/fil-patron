import type { Locale } from '@/lib/i18n'

/**
 * Identité visuelle « Fil & Patron ».
 *
 * L'emblème est dessiné en SVG : un anneau de bâti pointillé émeraude, un
 * cercle de craie champagne et une paire de ciseaux de coupe. Aucun fichier
 * externe, aucune représentation d'être vivant : uniquement le petit matériel
 * d'atelier.
 *
 * Les teintes passent par les jetons du thème (`--atelier`, `--champagne`) :
 * l'emblème suit donc automatiquement le mode clair et le mode sombre.
 */

const COPY: Record<Locale, { sub: string; tagline: string }> = {
  fr: {
    sub: 'Atelier de modélisme',
    tagline: 'Le geste juste · La coupe parfaite',
  },
  ar: {
    sub: 'ورشة تصميم الأزياء',
    tagline: 'الحركة الصحيحة · القصّة المتقنة',
  },
}

export function BrandEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="presentation" aria-hidden="true" className={className}>
      {/* Le fil de bâti : anneau pointillé. */}
      <circle
        cx="32"
        cy="32"
        r="30.4"
        fill="none"
        stroke="var(--atelier)"
        strokeWidth="1.25"
        strokeDasharray="1 2.7"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Le repère de craie : cercle champagne. */}
      <circle cx="32" cy="32" r="23.5" fill="none" stroke="var(--champagne)" strokeWidth="1.2" />

      {/* Les ciseaux de coupe, lame vers le bas-gauche, anneaux vers le haut-droite. */}
      <g transform="translate(32 33) rotate(214) scale(0.98)" fill="var(--champagne)">
        <path d="M-1.8-1.3-5.1-18.5-3.2-19.2 0.5-1.3Z" />
        <path d="M1.8-1.3 5.1-18.5 3.2-19.2-0.5-1.3Z" />
        <circle cx="0" cy="0" r="1.5" />
        <g fill="none" stroke="var(--champagne)" strokeWidth="2.1" strokeLinecap="round">
          <path d="M-1.1 1-5.5 7.4" />
          <path d="M1.1 1 5.5 7.4" />
        </g>
        <g fill="none" stroke="var(--champagne)" strokeWidth="1.75">
          <circle cx="-6.8" cy="9.2" r="3.5" />
          <circle cx="6.8" cy="9.2" r="3.5" />
        </g>
      </g>
    </svg>
  )
}

/**
 * Emblème + nom + mention d'atelier. En arabe, on n'applique ni majuscules ni
 * interlettrage : cela casserait les liaisons de l'écriture arabe.
 */
export function BrandMark({
  locale,
  brand,
  withTagline = false,
  size = 'sm',
  emblemClassName = 'size-9',
  className,
}: {
  locale: Locale
  brand: string
  withTagline?: boolean
  size?: 'sm' | 'lg'
  emblemClassName?: string
  className?: string
}) {
  const copy = COPY[locale]
  const isAr = locale === 'ar'
  const large = size === 'lg'

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <BrandEmblem className={`${emblemClassName} shrink-0`} />
      <span className="flex flex-col">
        <span
          className={`font-serif font-bold leading-none text-ink ${
            isAr ? 'text-[17px]' : 'uppercase tracking-[0.16em]'
          } ${isAr ? (large ? 'sm:text-xl' : '') : large ? 'text-lg' : 'text-[15px]'}`}
        >
          {brand}
        </span>
        <span
          className={`mt-[5px] leading-none text-champagne ${
            isAr ? 'text-[10px]' : 'uppercase tracking-[0.2em]'
          } ${isAr ? '' : large ? 'text-[10px]' : 'text-[8.5px]'} ${
            large ? '' : 'hidden sm:block'
          }`}
        >
          {copy.sub}
        </span>
        {withTagline ? (
          <span className="mt-2 font-serif text-[11px] italic leading-none text-ink-soft">{copy.tagline}</span>
        ) : null}
      </span>
    </span>
  )
}
