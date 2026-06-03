# PROJECT NOTES

> Running decisions log for The Builder Economy project.
> Updated: 2026-06-03

---

## Project Overview

**The Builder Economy** is a podcast landing page and community platform for people building with AI. It features:
- Editorial hero with inline email capture (NotifyForm)
- Guest application flow (7-field form → database → email notifications)
- Newsletter signup (NotifyForm in Hero + Subscribe → database → welcome email)
- About, Host, Guest CTA, featured guests, episodes sections

Editorial mission and guest casting criteria now live in `docs/MANIFESTO.md` and
`docs/GUEST_BRIEF.md`. The brief is written so an AI agent can source ranked
guest candidates directly from the repo.

---

## Architecture Decisions

### ADR-001: Supabase backend, consolidated into the shared Mindmaker AI project
- **Decision**: Use Supabase for all backend functionality. Originally a
  Lovable-managed Supabase project; consolidated into the shared **Mindmaker AI**
  project (ref `bkyuxvschuwngtcdhsyg`), which also backs CTRL.
- **Rationale**: One place to see audience/leads across all Mindmaker properties;
  no dependence on Lovable-managed infrastructure.
- **Date**: Project inception; consolidated 2026-06.

### ADR-002: Framer Motion for Animations
- **Decision**: Use framer-motion for all animations
- **Rationale**: Powerful, declarative, good DX
- **Date**: Project inception

### ADR-003: Resend for Email
- **Decision**: Use Resend API for transactional emails
- **Rationale**: Simple API, good deliverability
- **Dependencies**: RESEND_API_KEY secret
- **Date**: Project inception

### ADR-004: Design System in CSS Variables
- **Decision**: All colors defined as HSL in index.css using CSS variables
- **Rationale**: Consistency, theming support, shadcn compatibility
- **Date**: Project inception

### ADR-005: Cross-property source attribution
- **Decision**: One shared `audience_contacts` table tagged with a `lead_source`
  enum (`ctrl`, `mindmaker_site`, `mindmaker_live`, `builder_economy`). Builder
  Economy's own content lives in namespaced `be_*` tables; CTRL's tables are
  untouched.
- **Rationale**: "Where did this lead come from?" becomes one query; additive and
  low-risk on a shared production database.
- **Date**: 2026-06.

---

## Known Issues

| ID | Issue | Status | Notes |
|----|-------|--------|-------|
| - | None currently tracked | - | - |

---

## Recent Changes

See [CHANGELOG.md](../CHANGELOG.md) for detailed change history.

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL (Mindmaker AI) | Yes (set in Vercel) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key | Yes (set in Vercel) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ref | Yes (set in Vercel) |
| `RESEND_API_KEY` | Resend email API key | Yes (Supabase secret) |

---

## Database Schema Summary

### Tables
- `audience_contacts` - Cross-property email/lead capture (email, source, name,
  status, metadata, created_at). `source` is the `lead_source` enum: ctrl /
  mindmaker_site / mindmaker_live / builder_economy. UNIQUE (email, source).
- `be_guest_applications` - Guest application submissions (full_name, email,
  linkedin_url, what_building, how_using_ai, surprise_insight, stage,
  product_link, takeaway, status).
- `be_episodes` - Podcast episode data
- `be_guests` - Featured guest profiles
- `be_testimonials` - Testimonials

### RLS Policies
- All tables have RLS enabled
- audience_contacts / be_guest_applications: public insert only; no public read
  (the contact list stays private)
- be_episodes / be_guests / be_testimonials: public read of
  published/approved/featured rows

---

## Edge Functions

| Function | Purpose | Trigger |
|----------|---------|---------|
| `send-welcome-email` | Welcome email to subscriber + admin notification | After audience_contacts insert |
| `notify-guest-application` | Admin notification + auto-reply | After be_guest_applications insert |

---

## Future Considerations

1. **Authentication**: Not currently implemented. Add if admin dashboard needed.
2. **Platform links**: Hero/footer link to Spotify and YouTube placeholders.
   Swap in real show URLs once the feed is live, and add a platform-buttons row
   to the hero (noted inline in `Hero.tsx`).
3. **Analytics**: Consider adding page view tracking.
4. **AI guest sourcing**: `docs/GUEST_BRIEF.md` defines a rubric and JSON output
   format. Wiring an agent to read the brief + score the `be_guest_applications`
   inbound pile is a natural next step.
