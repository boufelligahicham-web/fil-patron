import { cookies } from 'next/headers'
import { DEFAULT_THEME, THEME_COOKIE, isTheme, type Theme } from '@/lib/theme'

/**
 * Lit le thème choisi dans le cookie `theme` (côté serveur uniquement).
 * Le cookie est écrit par la bascule d'ambiance et permet de rendre la page
 * directement dans la bonne palette, sans clignotement.
 */
export async function getTheme(): Promise<Theme> {
  const store = await cookies()
  const value = store.get(THEME_COOKIE)?.value
  return isTheme(value) ? value : DEFAULT_THEME
}
