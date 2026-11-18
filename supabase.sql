-- Run this once in Supabase dashboard -> SQL Editor

create table notes (
  id bigint generated always as identity primary key,
  text text not null check (char_length(text) between 1 and 280),
  created_at timestamptz not null default now()
);

-- Row Level Security: the database itself decides who can do what.
alter table notes enable row level security;

create policy "anyone can read notes"
  on notes for select using (true);

create policy "anyone can add notes"
  on notes for insert with check (true);

-- No update/delete policy = nobody can edit or delete via the public key.
