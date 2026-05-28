# ARCHITECTURE

> System architecture documentation for The Builder Economy.

---

## Component Hierarchy

```
App.tsx
└── Index.tsx (main page)
    ├── CustomCursor.tsx (hover-capable devices only)
    ├── Header.tsx (fixed, fades on scroll)
    ├── Hero.tsx (landing section)
    │   └── NotifyForm.tsx (inline email capture, tone="onDark")
    ├── MarqueeRiver.tsx (status ticker)
    ├── About.tsx
    ├── Host.tsx
    ├── GuestCTA.tsx
    ├── FeaturedGuests.tsx (renders null until approved guests exist)
    ├── Episodes.tsx (renders null until published episodes exist)
    ├── Testimonials.tsx (commented out until 4+ approved testimonials)
    ├── Subscribe.tsx
    │   └── NotifyForm.tsx (inline email capture, tone="onLight")
    ├── Footer.tsx
    └── GuestApplicationModal.tsx (opened from Hero + GuestCTA)
```

`NotifyForm` is the single shared email-capture component. It writes to
`subscribers` and fires `send-welcome-email`. The hero and the Subscribe band
both render it, so the launch list is built on-page rather than off-site.

---

## Data Flows

### Newsletter Subscription Flow

```
User enters email → NotifyForm.tsx (rendered in Hero and Subscribe)
    ↓
submit() validates email with zod
    ↓
supabase.from("subscribers").insert({ email })
    ↓ (unique-violation 23505 is treated as success — already on the list)
supabase.functions.invoke("send-welcome-email", { body: { email } })  [best-effort]
    ↓
Edge Function → Resend API → Email sent
    ↓
Inline success state shown in the form
```

### Guest Application Flow

```
User clicks "Apply to Be a Guest" → Hero.tsx
    ↓
onApplyClick() → sets modal open state
    ↓
GuestApplicationModal.tsx renders
    ↓
User fills form → handleSubmit()
    ↓
supabase.from("guest_applications").insert(formData)
    ↓ (on success)
supabase.functions.invoke("notify-guest-application", { body: formData })
    ↓
Edge Function sends:
  1. Admin notification email (to krish@themindmaker.ai)
  2. Auto-reply to applicant
    ↓
Toast notification, modal closes
```

---

## Edge Functions

### send-welcome-email

```
Request: POST { email: string }
    ↓
Validate email
    ↓
Fetch RESEND_API_KEY from env
    ↓
POST to api.resend.com/emails
    ↓
Response: { success: boolean, emailResponse: object }
```

### notify-guest-application

```
Request: POST GuestApplication
    ↓
Send admin notification email
    ↓
Send auto-reply to applicant
    ↓
Response: { success: boolean, adminEmail: object, autoReply: object }
```

---

## Database Schema

### subscribers
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default gen_random_uuid() |
| email | TEXT | NOT NULL, UNIQUE |
| created_at | TIMESTAMPTZ | default now() |

### guest_applications
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| full_name | TEXT | NOT NULL |
| email | TEXT | NOT NULL |
| linkedin_url | TEXT | nullable |
| what_building | TEXT | nullable |
| how_using_ai | TEXT | nullable |
| surprise_insight | TEXT | nullable |
| stage | TEXT | nullable |
| product_link | TEXT | nullable |
| takeaway | TEXT | nullable |
| approved | BOOLEAN | default false |
| created_at | TIMESTAMPTZ | default now() |

> The legacy `title_company`, `topic_pitch`, and `social_link` columns still
> exist for old rows but are no longer written by the form. See
> `docs/GUEST_BRIEF.md` for how these fields map to guest casting.

### episodes
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| title | TEXT | NOT NULL |
| subtitle | TEXT | nullable |
| description | TEXT | nullable |
| episode_url | TEXT | NOT NULL |
| cover_image_url | TEXT | nullable |
| guest_name | TEXT | nullable |
| guest_title | TEXT | nullable |
| is_published | BOOLEAN | default true |
| published_at | TIMESTAMPTZ | nullable |

### guests
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | TEXT | NOT NULL |
| title | TEXT | nullable |
| photo_url | TEXT | nullable |
| quote | TEXT | nullable |
| episode_id | UUID | FK → episodes |
| approved | BOOLEAN | default false |

### testimonials
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| author | TEXT | NOT NULL |
| role | TEXT | nullable |
| quote | TEXT | NOT NULL |
| featured | BOOLEAN | default false |
| created_at | TIMESTAMPTZ | default now() |

---

## Security

### RLS Policies
All tables have Row Level Security enabled:
- **subscribers**: Public insert (for signups)
- **guest_applications**: Public insert (for applications)
- **episodes**: Public select (for display)
- **guests**: Public select (for display)
- **testimonials**: Public select (for display)

### Secrets
- `RESEND_API_KEY`: Required for email functionality

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| Backend | Lovable Cloud (Supabase) |
| Database | PostgreSQL |
| Edge Functions | Deno |
| Email | Resend |
