'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocale } from '@/components/locale-provider'

export type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'unsupported'

type Narration = { title: string; text: string }

type SpeechApi = {
  /** Texte à lire : narration déposée par la page, sinon contenu principal. */
  title: string | null
  status: SpeechStatus
  progress: number
  elapsed: number
  voiceName: string | null
  registerNarration: (narration: Narration | null) => void
  toggle: () => void
  stop: () => void
}

const SpeechContext = createContext<SpeechApi | null>(null)

/** Découpe le texte en fragments courts : Chrome coupe les longs énoncés. */
function chunkText(text: string, max = 190): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []

  const sentences = clean.match(/[^.!?…؟؛]+[.!?…؟؛]*\s*/g) ?? [clean]
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length <= max) {
      current += sentence
      continue
    }
    if (current) chunks.push(current.trim())
    if (sentence.length <= max) {
      current = sentence
      continue
    }
    // Phrase trop longue : on recoupe sur les virgules puis sur les espaces.
    let rest = sentence
    while (rest.length > max) {
      const window = rest.slice(0, max)
      const cut = Math.max(window.lastIndexOf(','), window.lastIndexOf(' '))
      const end = cut > max * 0.5 ? cut + 1 : max
      chunks.push(rest.slice(0, end).trim())
      rest = rest.slice(end)
    }
    current = rest
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}

function pickVoice(locale: 'fr' | 'ar'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  const prefix = locale === 'ar' ? 'ar' : 'fr'
  const matching = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix))
  if (!matching.length) return null

  // Voix locale d'abord : plus réactive et disponible hors ligne.
  return matching.find((voice) => voice.localService) ?? matching[0]
}

/** Longueur approximative de la lecture, en minutes (≈ 165 mots/min). */
export function estimateMinutes(text: string) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 165))
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const pathname = usePathname()
  const [narration, setNarration] = useState<Narration | null>(null)
  const [title, setTitle] = useState<string | null>(null)
  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [voiceName, setVoiceName] = useState<string | null>(null)

  const chunksRef = useRef<string[]>([])
  const indexRef = useRef(0)
  const cancelledRef = useRef(false)

  const supported =
    typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined'

  useEffect(() => {
    setStatus(supported ? 'idle' : 'unsupported')
  }, [supported])

  // Une nouvelle page ne se lit pas par-dessus l'ancienne.
  useEffect(() => {
    cancelledRef.current = true
    window.speechSynthesis?.cancel()
    setStatus(supported ? 'idle' : 'unsupported')
    setProgress(0)
    setElapsed(0)
  }, [pathname, supported])

  useEffect(() => {
    return () => {
      cancelledRef.current = true
      window.speechSynthesis?.cancel()
    }
  }, [])

  useEffect(() => {
    if (status !== 'speaking') return
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(id)
  }, [status])

  const registerNarration = useCallback((next: Narration | null) => {
    setNarration(next)
    if (next) setTitle(next.title)
  }, [])

  const reset = useCallback(() => {
    setStatus(supported ? 'idle' : 'unsupported')
    setProgress(0)
    setElapsed(0)
    indexRef.current = 0
  }, [supported])

  const speakChunk = useCallback(
    (index: number, chunks: string[]) => {
      const synth = window.speechSynthesis
      if (cancelledRef.current) return

      if (index >= chunks.length) {
        reset()
        return
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index])
      utterance.lang = locale === 'ar' ? 'ar-SA' : 'fr-FR'
      utterance.rate = 0.96
      utterance.pitch = 1

      const voice = pickVoice(locale)
      if (voice) {
        utterance.voice = voice
        setVoiceName(voice.name)
      }

      utterance.onend = () => {
        if (cancelledRef.current) return
        const next = index + 1
        indexRef.current = next
        setProgress(next / chunks.length)
        speakChunk(next, chunks)
      }
      utterance.onerror = () => {
        if (cancelledRef.current) return
        reset()
      }

      synth.speak(utterance)
      setStatus('speaking')
    },
    [locale, reset],
  )

  const readPage = useCallback(() => {
    const main = document.getElementById('contenu')
    const text = main?.innerText ?? ''
    return {
      title: document.title,
      text: text.slice(0, 6000),
    }
  }, [])

  const toggle = useCallback(() => {
    const synth = window.speechSynthesis
    if (!synth) {
      setStatus('unsupported')
      return
    }

    if (status === 'speaking') {
      synth.pause()
      setStatus('paused')
      return
    }

    if (status === 'paused' && synth.paused) {
      synth.resume()
      setStatus('speaking')
      return
    }

    const source = narration ?? readPage()
    const chunks = chunkText(source.text)
    if (!chunks.length) return

    cancelledRef.current = true
    synth.cancel()

    window.setTimeout(() => {
      cancelledRef.current = false
      chunksRef.current = chunks
      indexRef.current = 0
      setTitle(source.title)
      setProgress(0)
      setElapsed(0)
      speakChunk(0, chunks)
    }, 60)
  }, [narration, readPage, speakChunk, status])

  const stop = useCallback(() => {
    cancelledRef.current = true
    window.speechSynthesis?.cancel()
    reset()
  }, [reset])

  // Certains navigateurs chargent les voix en différé.
  useEffect(() => {
    if (!supported) return
    const synth = window.speechSynthesis
    const refresh = () => {
      const voice = pickVoice(locale)
      if (voice) setVoiceName(voice.name)
    }
    refresh()
    synth.addEventListener?.('voiceschanged', refresh)
    return () => synth.removeEventListener?.('voiceschanged', refresh)
  }, [locale, supported])

  const api = useMemo<SpeechApi>(
    () => ({
      title,
      status,
      progress,
      elapsed,
      voiceName,
      registerNarration,
      toggle,
      stop,
    }),
    [title, status, progress, elapsed, voiceName, registerNarration, toggle, stop],
  )

  return <SpeechContext.Provider value={api}>{children}</SpeechContext.Provider>
}

export function useSpeech(): SpeechApi {
  const value = useContext(SpeechContext)
  if (!value) throw new Error('useSpeech doit être utilisé dans <SpeechProvider>')
  return value
}
