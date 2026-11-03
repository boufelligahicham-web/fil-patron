'use client'

import { useEffect } from 'react'
import { useSpeech } from '@/components/speech/speech-provider'

/**
 * Dépose la narration de la page auprès du guide vocal.
 *
 * Le texte est rédigé à la main (et non extrait du DOM) pour être fluide à
 * l'oreille : la lecture suit le fil de l'atelier plutôt que la mise en page.
 */
export function PageNarration({ title, text }: { title: string; text: string }) {
  const { registerNarration } = useSpeech()

  useEffect(() => {
    registerNarration({ title, text })
  }, [title, text, registerNarration])

  return null
}
