'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sanitizeMeasurements } from '@/lib/content/measurements'
import { ALL_LESSON_SLUGS } from '@/lib/patterns'
import { hasSupabaseEnv } from '@/lib/supabase/env'
import { createClient } from '@/lib/supabase/server'

type ActionResult = { ok: true } | { ok: false; error: string }

const NOT_CONFIGURED =
  'Le compte en ligne n’est pas encore activé : impossible d’enregistrer pour le moment.'

export async function setLessonProgress(slug: string, completed: boolean): Promise<ActionResult> {
  if (!ALL_LESSON_SLUGS.has(slug)) return { ok: false, error: 'Leçon inconnue.' }
  if (!hasSupabaseEnv()) return { ok: false, error: NOT_CONFIGURED }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Connectez-vous pour enregistrer votre progression.' }

  const { error } = completed
    ? await supabase
        .from('lesson_progress')
        .upsert({ user_id: user.id, lesson_slug: slug }, { onConflict: 'user_id,lesson_slug', ignoreDuplicates: true })
    : await supabase.from('lesson_progress').delete().eq('user_id', user.id).eq('lesson_slug', slug)

  if (error) {
    console.error('setLessonProgress error:', error.message)
    return { ok: false, error: 'L’enregistrement a échoué. Réessayez dans un instant.' }
  }

  revalidatePath('/tableau-de-bord')
  return { ok: true }
}

export async function saveMeasurements(input: unknown): Promise<ActionResult> {
  if (!hasSupabaseEnv()) return { ok: false, error: NOT_CONFIGURED }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Connectez-vous pour enregistrer vos mesures.' }

  const measurements = sanitizeMeasurements(input)
  const { error } = await supabase
    .from('measurement_profiles')
    .upsert(
      { user_id: user.id, measurements, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )

  if (error) {
    console.error('saveMeasurements error:', error.message)
    return { ok: false, error: 'L’enregistrement a échoué. Réessayez dans un instant.' }
  }

  revalidatePath('/patrons', 'layout')
  revalidatePath('/tableau-de-bord')
  return { ok: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
