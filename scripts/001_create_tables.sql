create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null check (char_length(lesson_slug) between 1 and 120),
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "progress_select_own" on public.lesson_progress;
drop policy if exists "progress_insert_own" on public.lesson_progress;
drop policy if exists "progress_delete_own" on public.lesson_progress;
create policy "progress_select_own" on public.lesson_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "progress_delete_own" on public.lesson_progress for delete using (auth.uid() = user_id);

create table if not exists public.measurement_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  measurements jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.measurement_profiles enable row level security;

drop policy if exists "measurements_select_own" on public.measurement_profiles;
drop policy if exists "measurements_insert_own" on public.measurement_profiles;
drop policy if exists "measurements_update_own" on public.measurement_profiles;
create policy "measurements_select_own" on public.measurement_profiles for select using (auth.uid() = user_id);
create policy "measurements_insert_own" on public.measurement_profiles for insert with check (auth.uid() = user_id);
create policy "measurements_update_own" on public.measurement_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
