# ARCHITECTURE

> System architecture for The Builder Economy. For *why* the show exists, read
> [`MANIFESTO.md`](MANIFESTO.md) first — this doc is how it's wired.

---

## The big picture: one of several Mindmaker properties

The Builder Economy is one surface in a wider Mindmaker portfolio. Several
properties now share a single backend (the **Mindmaker AI** Supabase project,
ref `bkyuxvschuwngtcdhsyg`) so leads and audience can be seen in one place:

| Property | What it is | `source` tag |
|----------|------------|--------------|
| CTRL app | The leadership product | `ctrl` |
| Mindmaker site | The marketing site | `mindmaker_site` |
| Mindmaker Live | The Substack | `mindmaker_live` |
| **The Builder Economy** | This podcast/site | `builder_economy` |

Every email/lead lands in one shared `audience_contacts` table, tagged by
`source`, so "where did this person come from?" is a single query. The Builder
Economy keeps its own content in namespaced `be_*` tables that live alongside
CTRL without touching it.

> History: the backend was previously a Lovable-managed Supabase project. It was
> consolidated into the shared Mindmaker AI project. See `PROJECT_NOTES.md`
> (ADR-001) and `CHANGELOG.md`.

---

## Component Hierarchy

```
App.tsx (BrowserRouter)
├── Index.tsx (main page)
│   ├── CustomCursor.tsx (hover-capable devices only)
│   ├── Header.tsx (fixed, fades on scroll)
│   ├── Hero.tsx
│   │   └── NotifyForm.tsx (inline email capture, tone="onDark")
│   ├── MarqueeRiver.tsx (status ticker)
│   ├── About.tsx
│   ├── Host.tsx
│   ├── GuestCTA.tsx
│   ├── FeaturedGuests.tsx (reads be_guests; renders null until approved guests exist)
│   ├── Episodes.tsx (reads be_episodes; renders null until published episodes exist)
│   ├── Testimonials.tsx (reads be_testimonials; renders null until featured rows exist)
│   ├── Subscribe.tsx
│   │   └── NotifyForm.tsx (inline email capture, tone="onLight")
│   ├── Footer.tsx
│   └── GuestApplicationModal.tsx (opened from Hero + GuestCTA)
└── NotFound.tsx (branded catch-all; see vercel.json)
```

`NotifyForm` is the single shared email-capture component. It writes to
`audience_contacts` (tagged `source: "builder_economy"`) and fires
`send-welcome-email`. The hero and the Subscribe band both render it.

---

## Data Flows

### Newsletter subscription

```
User enters email → NotifyForm.tsx (Hero + Subscribe)
    ↓  zod-validated
supabase.from("audience_contacts").insert({ email, source: "builder_economy" })
    ↓  (unique-violation 23505 on (email, source) is treated as success)
supabase.functions.invoke("send-welcome-email", { body: { email } })   [best-effort]
    ↓
Edge function → Resend:
  1. Launch-honest welcome email to the subscriber (no links to unshipped content)
  2. Internal notification to krish@themindmaker.ai (so a signup is never invisible)
    ↓
Inline success state in the form
```

### Guest application

```
"Apply to Be a Guest" → GuestApplicationModal.tsx → handleSubmit()
    ↓  zod-validated (7 fields + email)
supabase.from("be_guest_applications").insert(formData)
    ↓
supabase.functions.invoke("notify-guest-application", { body: formData })
    ↓
Edge function → Resend:
  1. Admin notification (krish@themindmaker.ai)
  2. Auto-reply to applicant
    ↓
Success state, modal closes
```

### Content reads (pre-launch: empty → sections hide themselves)

```
Episodes.tsx      → be_episodes      (is_published = true)
FeaturedGuests.tsx → be_guests       (approved = true)
Testimonials.tsx  → be_testimonials  (featured = true)
```

---

## Edge Functions

Both run on the Mindmaker AI project with `verify_jwt = false` (public forms call
them with the anon key) and use the project's existing `RESEND_API_KEY`.

### send-welcome-email
```
POST { email }
  → zod-validate + in-memory rate limit
  → Resend: welcome email to subscriber
  → Resend: admin notification to krish@themindmaker.ai (best-effort)
  → { success }
```
Invariant: the welcome email links only to pages that exist in production.
`scripts/check-email-links.mjs` enforces this in CI.

### notify-guest-application
```
POST GuestApplication
  → Resend: admin notification (full application)
  → Resend: auto-reply to applicant
  → { success }
```

---

## Database Schema (Mindmaker AI · public schema)

### audience_contacts — shared, cross-property
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| email | TEXT | NOT NULL |
| source | lead_source | NOT NULL — `ctrl` / `mindmaker_site` / `mindmaker_live` / `builder_economy` |
| name | TEXT | nullable |
| status | TEXT | default `subscribed` |
| metadata | JSONB | default `{}` |
| created_at | TIMESTAMPTZ | default now() |
| updated_at | TIMESTAMPTZ | default now() (trigger-maintained) |
| | | UNIQUE (email, source) |

### be_guest_applications
`id, full_name, email, linkedin_url, what_building, how_using_ai,
surprise_insight, stage, product_link, takeaway, status (default 'new'),
created_at`.

### be_episodes
`id, title, subtitle, guest_name, guest_title, description, episode_url,
cover_image_url, episode_number, published_at, is_published (default true),
created_at`.

### be_guests
`id, name, title, photo_url, quote, episode_id (FK → be_episodes), approved
(default false), created_at`.

### be_testimonials
`id, quote, author, role, featured (default false), created_at`.

> CTRL's own tables (including its separate `leads` table) are untouched. A
> unified view over CTRL `leads` ∪ `audience_contacts` can be layered on later.

---

## Security

### RLS
All Builder Economy tables have RLS enabled:
- **audience_contacts / be_guest_applications**: public **insert** only (anon
  signup/apply). No public read — the contact list stays private; reads happen
  via the service role / dashboard.
- **be_episodes / be_guests / be_testimonials**: public **read** of
  published/approved/featured rows only.

### Secrets
- `RESEND_API_KEY` (Supabase edge-function secret) — transactional email.
- Front-end env (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`,
  `VITE_SUPABASE_PROJECT_ID`) set in Vercel. The publishable/anon key is safe to
  ship to the browser; RLS is the boundary.

---

## Hosting

- **Front end**: Vercel, git-connected to `krishanraja/thebuildereconomy`
  (production branch `main`), framework Vite. `vercel.json` adds an SPA rewrite
  (deep links no longer hard-404) and a temporary `/ep/*` → `/` redirect so
  legacy welcome-email links land softly.
- **Backend**: Supabase (Mindmaker AI project). Edge functions deploy
  **separately** from the site — see `RUNBOOK.md`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| Hosting | Vercel |
| Backend | Supabase (shared Mindmaker AI project) |
| Database | PostgreSQL |
| Edge Functions | Deno |
| Email | Resend |
