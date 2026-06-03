-- Builder Economy content tables (episodes / guests / testimonials), namespaced
-- `be_*` so they live cleanly alongside CTRL in the shared Mindmaker AI project.
-- Mirrors the original Lovable schema. Additive; public-read for published rows.

-- be_episodes ---------------------------------------------------------------
create table if not exists public.be_episodes (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  subtitle       text,
  guest_name     text,
  guest_title    text,
  description    text,
  episode_url    text not null,
  cover_image_url text,
  episode_number integer,
  published_at   timestamptz default now(),
  is_published   boolean not null default true,
  created_at     timestamptz not null default now()
);
create index if not exists idx_be_episodes_published_at on public.be_episodes (published_at desc);
alter table public.be_episodes enable row level security;
grant select on public.be_episodes to anon, authenticated;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='be_episodes' and policyname='public read be_episodes') then
    create policy "public read be_episodes" on public.be_episodes for select using (is_published = true);
  end if;
end $$;

-- be_guests -----------------------------------------------------------------
create table if not exists public.be_guests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  title      text,
  photo_url  text,
  quote      text,
  episode_id uuid references public.be_episodes(id) on delete set null,
  approved   boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_be_guests_approved on public.be_guests (approved);
alter table public.be_guests enable row level security;
grant select on public.be_guests to anon, authenticated;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='be_guests' and policyname='public read be_guests') then
    create policy "public read be_guests" on public.be_guests for select using (approved = true);
  end if;
end $$;

-- be_testimonials -----------------------------------------------------------
create table if not exists public.be_testimonials (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  author     text not null,
  role       text,
  featured   boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_be_testimonials_featured on public.be_testimonials (featured);
alter table public.be_testimonials enable row level security;
grant select on public.be_testimonials to anon, authenticated;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='be_testimonials' and policyname='public read be_testimonials') then
    create policy "public read be_testimonials" on public.be_testimonials for select using (featured = true);
  end if;
end $$;
