# ARCHITECTURE

> System architecture documentation for The Builder Economy.

---

## Component Hierarchy

```
App.tsx
└── Index.tsx (main page)
    ├── Header.tsx (fixed, scroll-aware)
    ├── Hero.tsx (landing section)
    │   └── GuestApplicationModal.tsx (dialog)
    ├── About.tsx
    ├── Episodes.tsx
    ├── FeaturedGuests.tsx
    ├── WhoBuilds.tsx
    ├── Testimonials.tsx
    ├── Subscribe.tsx
    └── Footer.tsx
```

---

## Data Flows

### Newsletter Subscription Flow

```
User enters email → Subscribe.tsx
    ↓
handleSubmit() validates email
    ↓
supabase.from("subscribers").insert({ email })
    ↓ (on success)
supabase.functions.invoke("send-welcome-email", { body: { email } })
    ↓
Edge Function → Resend API → Email sent
    ↓
Toast notification to user
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
| title_company | TEXT | nullable |
| topic_pitch | TEXT | nullable |
| social_link | TEXT | nullable |
| approved | BOOLEAN | default false |
| created_at | TIMESTAMPTZ | default now() |

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
