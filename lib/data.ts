import { DEFAULT_MEASUREMENTS, sanitizeMeasurements, type Measurements } from '@/lib/content/measurements'
import { hasSupabaseEnv } from '@/lib/supabase/env'
import { createClient } from '@/lib/supabase/server'

function guestContext() {
  return {
    user: null,
    completed: new Set<string>(),
    measurements: DEFAULT_MEASUREMENTS as Measurements,
    hasSavedMeasurements: false,
    measurementsUpdatedAt: null as string | null,
  }
}

export async function getUserContext() {
  // Mode invité : le site est entièrement consultable sans Supabase.
  if (!hasSupabaseEnv()) return guestContext()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return guestContext()

  const [progressRes, measuresRes] = await Promise.all([
    supabase.from('lesson_progress').select('lesson_slug').eq('user_id', user.id),
    supabase
      .from('measurement_profiles')
      .select('measurements, updated_at')
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  return {
    user,
    completed: new Set<string>((progressRes.data ?? []).map((r) => r.lesson_slug as string)),
    measurements: measuresRes.data
      ? sanitizeMeasurements(measuresRes.data.measurements)
      : DEFAULT_MEASUREMENTS,
    hasSavedMeasurements: Boolean(measuresRes.data),
    measurementsUpdatedAt: (measuresRes.data?.updated_at as string | undefined) ?? null,
  }
}
