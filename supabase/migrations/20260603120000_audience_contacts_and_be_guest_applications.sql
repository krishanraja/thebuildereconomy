-- Builder Economy → Mindmaker AI consolidation (additive).
--
-- Stands up cross-property lead attribution in the shared Mindmaker AI project
-- WITHOUT touching any existing CTRL object. Introduces:
--   1. lead_source enum            — which property a contact came from
--   2. audience_contacts table     — unified email capture across all properties
--   3. be_guest_applications table — Builder Economy guest applications
--
-- The existing CTRL `leads` table is intentionally left untouched. A unified
-- view (CTRL `leads` ∪ audience_contacts) can be layered on later.

-- 1) Cross-property source attribution -------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'lead_source' and n.nspname = 'public'
  ) then
    create type public.lead_source as enum (
      'ctrl',
      'mindmaker_site',
      'mindmaker_live',
      'builder_economy'
    );
  end if;
end $$;

-- 2) Unified audience / email capture --------------------------------------
create table if not exists public.audience_contacts (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     public.lead_source not null,
  name       text,
  status     text not null default 'subscribed',
  metadata   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint audience_contacts_email_source_key unique (email, source)
);

create index if not exists idx_audience_contacts_source     on public.audience_contacts (source);
create index if not exists idx_audience_contacts_email_lower on public.audience_contacts (lower(email));
create index if not exists idx_audience_contacts_created_at  on public.audience_contacts (created_at desc);

alter table public.audience_contacts enable row level security;

-- Public signup forms (anon key) may insert. No anon SELECT — the list stays private.
grant insert on public.audience_contacts to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'audience_contacts'
      and policyname = 'anon insert audience_contacts'
  ) then
    create policy "anon insert audience_contacts" on public.audience_contacts
      for insert to anon, authenticated with check (true);
  end if;
end $$;

-- Uniquely-named trigger fn (no collision with any shared CTRL function).
create or replace function public.be_audience_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create or replace trigger trg_audience_contacts_updated_at
  before update on public.audience_contacts
  for each row execute function public.be_audience_set_updated_at();

-- 3) Builder Economy guest applications ------------------------------------
create table if not exists public.be_guest_applications (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  email            text not null,
  linkedin_url     text,
  what_building    text,
  how_using_ai     text,
  surprise_insight text,
  stage            text,
  product_link     text,
  takeaway         text,
  status           text not null default 'new',
  created_at       timestamptz not null default now()
);

create index if not exists idx_be_guest_applications_created_at on public.be_guest_applications (created_at desc);

alter table public.be_guest_applications enable row level security;

grant insert on public.be_guest_applications to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'be_guest_applications'
      and policyname = 'anon insert be_guest_applications'
  ) then
    create policy "anon insert be_guest_applications" on public.be_guest_applications
      for insert to anon, authenticated with check (true);
  end if;
end $$;
