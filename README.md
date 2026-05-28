# The Builder Economy

> Conversations to inspire a new era where everyone builds with AI.

A podcast landing page and community platform featuring guest applications, newsletter subscriptions, and episode showcases.

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
| Backend | Lovable Cloud (Supabase) |
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

The following are auto-configured by Lovable Cloud:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key

Edge function secrets (configure in Lovable Cloud):
- `RESEND_API_KEY` - Resend email API key

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `subscribers` | Newsletter email signups |
| `guest_applications` | Guest application submissions |
| `episodes` | Podcast episode data |
| `guests` | Featured guest profiles |
| `testimonials` | Community testimonials |

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

Deploy via Lovable:
1. Open [Lovable Project](https://lovable.dev/projects/dc395342-a01e-4785-9d96-8010ab301bf4)
2. Click Share → Publish

---

## License

Private project. All rights reserved.
