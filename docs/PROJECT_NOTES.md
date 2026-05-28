# PROJECT NOTES

> Running decisions log for The Builder Economy project.
> Updated: 2026-05-28

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

### ADR-001: Lovable Cloud for Backend
- **Decision**: Use Lovable Cloud (Supabase) for all backend functionality
- **Rationale**: Native integration, no external account needed
- **Date**: Project inception

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
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (auto-provided) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key | Yes (auto-provided) |
| `RESEND_API_KEY` | Resend email API key | Yes (for emails) |

---

## Database Schema Summary

### Tables
- `subscribers` - Newsletter signups (email, created_at)
- `guest_applications` - Guest application submissions (full_name, email,
  linkedin_url, what_building, how_using_ai, surprise_insight, stage,
  product_link, takeaway, approved). Legacy columns title_company / topic_pitch
  / social_link retained for old rows.
- `episodes` - Podcast episode data
- `guests` - Featured guest profiles
- `testimonials` - User testimonials

### RLS Policies
- All tables have RLS enabled
- Subscribers: Insert only (no auth required for insert)
- Guest applications: Insert only (no auth required)
- Episodes/Guests/Testimonials: Public read access

---

## Edge Functions

| Function | Purpose | Trigger |
|----------|---------|---------|
| `send-welcome-email` | Welcome email to new subscribers | After subscriber insert |
| `notify-guest-application` | Admin notification + auto-reply | After guest application submit |

---

## Future Considerations

1. **Authentication**: Not currently implemented. Add if admin dashboard needed.
2. **Platform links**: Hero/footer link to Spotify and YouTube placeholders.
   Swap in real show URLs once the feed is live, and add a platform-buttons row
   to the hero (noted inline in `Hero.tsx`).
3. **Analytics**: Consider adding page view tracking.
4. **AI guest sourcing**: `docs/GUEST_BRIEF.md` defines a rubric and JSON output
   format. Wiring an agent to read the brief + score the `guest_applications`
   inbound pile is a natural next step.
