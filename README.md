# The Builder Economy

> Conversations to inspire a new era where everyone builds with AI.

A podcast landing page and community platform featuring guest applications, newsletter subscriptions, and episode showcases.

---

## Purpose

> If the Creator Economy gave everyone a voice, the Builder Economy gives
> everyone a factory.

AI has collapsed the cost of building software to near zero, so the constraint
on entrepreneurship is no longer access — it's taste, judgment, and the
willingness to ship. The Builder Economy is the record of that shift: every
episode is a conversation with someone living inside it. The full editorial
mission is in [`docs/MANIFESTO.md`](docs/MANIFESTO.md).

---

## Features

- **Editorial Hero**: Branded landing with inline email capture
- **Guest Applications**: 7-field form to apply as a podcast guest
- **Email Capture**: On-page signup (Hero + Subscribe band) → welcome email
- **Featured Guests / Episodes**: Render once approved/published rows exist
- **Host + Guest CTA**: Bio and "be on the show" sections

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

---

## Project Structure

```
/src
  /components      # UI components
  /lib             # Utilities (logger, config, animations)
  /hooks           # Custom React hooks
  /types           # TypeScript type definitions
  /pages           # Route pages
  /integrations    # Supabase client
  /assets          # Static assets (images, logos)
/supabase
  /functions       # Edge functions
  /migrations      # Database migrations
/docs              # Documentation
  MASTER_INSTRUCTIONS.md
  PROJECT_NOTES.md
  ARCHITECTURE.md
  DESIGN_SYSTEM.md
/public            # Public static files
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Front-end env (set in Vercel — Production, Preview, Development):
- `VITE_SUPABASE_URL` — Supabase project URL (Mindmaker AI)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/publishable key (safe in the browser; RLS is the boundary)
- `VITE_SUPABASE_PROJECT_ID` — Supabase project ref

Edge-function secret (set in the Supabase dashboard):
- `RESEND_API_KEY` — Resend email API key

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `audience_contacts` | Cross-property email/lead capture, tagged by `source` |
| `be_guest_applications` | Guest application submissions |
| `be_episodes` | Podcast episode data |
| `be_guests` | Featured guest profiles |
| `be_testimonials` | Community testimonials |

All tables have RLS enabled. See `docs/ARCHITECTURE.md` for full schema.

---

## Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `send-welcome-email` | Subscriber signup | Sends welcome email |
| `notify-guest-application` | Application submit | Notifies admin + auto-replies |

---

## Documentation

- [Manifesto](docs/MANIFESTO.md) - The editorial mission and worldview
- [Guest Brief](docs/GUEST_BRIEF.md) - Casting spec (human- and AI-readable)
- [Voice](docs/VOICE.md) - How we write copy
- [Master Instructions](docs/MASTER_INSTRUCTIONS.md) - Development guidelines
- [Project Notes](docs/PROJECT_NOTES.md) - Running decisions log
- [Architecture](docs/ARCHITECTURE.md) - System architecture
- [Design System](docs/DESIGN_SYSTEM.md) - Brand tokens and UI guidelines

---

## Development

### Key Files

- `src/index.css` - Design tokens (colors, gradients)
- `tailwind.config.ts` - Tailwind configuration
- `src/lib/logger.ts` - Structured logging utility
- `src/lib/config.ts` - Centralized configuration
- `src/lib/animations.ts` - Framer Motion variants
- `src/types/index.ts` - TypeScript types

### Logging

```typescript
import { logger } from '@/lib/logger';

logger.info('User action', { userId: '123', action: 'click' });
logger.error('Failed to submit', { error: err.message });
```

---

## Deployment

**Front end** deploys via Vercel on push to `main` (project `thebuildereconomy`,
git-connected to this repo). Front-end env vars live in Vercel.

> **Edge functions deploy separately from the site.** Publishing the front end
> does **not** redeploy `supabase/functions/**`. After changing an edge function
> (e.g. `send-welcome-email`), redeploy it explicitly or production keeps running
> the old version. See [`docs/RUNBOOK.md`](docs/RUNBOOK.md).

---

## License

Private project. All rights reserved.
