/**
 * Thèmes de l'atelier.
 *
 * - `atelier` : papier beige, rose poudré (par défaut, clair)
 * - `glacier` : nuit polaire (classe `dark`)
 *
 * Ce module reste pur : il est importé par des composants client (bascule)
 * comme par le serveur (rendu de `<html>`).
 */
export const THEMES = ['atelier', 'glacier'] as const
export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'atelier'
export const THEME_COOKIE = 'theme'

export function isTheme(value: unknown): value is Theme {
  return value === 'atelier' || value === 'glacier'
}

/** Classe appliquée à `<html>` : seule la nuit polaire a besoin du mode sombre. */
export function themeClass(theme: Theme) {
  return theme === 'glacier' ? 'dark' : ''
}
