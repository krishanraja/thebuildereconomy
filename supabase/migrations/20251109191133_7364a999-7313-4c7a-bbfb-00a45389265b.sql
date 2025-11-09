-- Episodes
create table if not exists public.episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  guest_name text,
  guest_title text,
  description text,
  episode_url text not null,
  cover_image_url text,
  published_at timestamptz default now(),
  is_published boolean default true
);

-- Guests
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  photo_url text,
  quote text,
  episode_id uuid references public.episodes(id) on delete set null,
  approved boolean default false
);

-- Guest applications
create table if not exists public.guest_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  title_company text,
  topic_pitch text,
  social_link text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Subscribers
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Helpful indexes
create index if not exists idx_episodes_published_at on public.episodes(published_at desc);
create index if not exists idx_guests_approved on public.guests(approved);
create index if not exists idx_testimonials_featured on public.testimonials(featured);

-- Enable RLS
alter table public.episodes enable row level security;
alter table public.guests enable row level security;
alter table public.guest_applications enable row level security;
alter table public.subscribers enable row level security;
alter table public.testimonials enable row level security;

-- Public can read only published/approved content
create policy "public read episodes" on public.episodes
for select using (is_published = true);

create policy "public read guests" on public.guests
for select using (approved = true);

create policy "public read testimonials" on public.testimonials
for select using (featured = true);

-- Public can insert applications and subscribe
create policy "anon insert guest applications" on public.guest_applications
for insert with check (true);

create policy "anon insert subscribers" on public.subscribers
for insert with check (true);