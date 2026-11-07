-- Inglês Todo Dia: progresso de cada aluno (uma linha por pessoa, com o progresso em JSON).
-- Usa o mesmo projeto Supabase do English Journey: a mesma conta entra nos dois apps.
-- Cada pessoa só enxerga e altera a própria linha (RLS).

create table if not exists public.ingles_todo_dia (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.ingles_todo_dia enable row level security;

drop policy if exists "aluno lê o próprio progresso" on public.ingles_todo_dia;
create policy "aluno lê o próprio progresso" on public.ingles_todo_dia
  for select using (auth.uid() = user_id);
drop policy if exists "aluno cria o próprio progresso" on public.ingles_todo_dia;
create policy "aluno cria o próprio progresso" on public.ingles_todo_dia
  for insert with check (auth.uid() = user_id);
drop policy if exists "aluno atualiza o próprio progresso" on public.ingles_todo_dia;
create policy "aluno atualiza o próprio progresso" on public.ingles_todo_dia
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
