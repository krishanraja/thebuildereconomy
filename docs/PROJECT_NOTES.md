# PROJECT NOTES

> Running decisions log for The Builder Economy project.
> Updated: 2025-12-09

---

## Project Overview

**The Builder Economy** is a podcast landing page and community platform for people building with AI. It features:
- Hero section with podcast branding
- Guest application flow (form → database → email notifications)
- Newsletter subscription (email → database → welcome email)
- Featured guests, episodes, testimonials sections

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
- `guest_applications` - Guest application submissions
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
2. **Spotify Integration**: Podcast links pending Spotify availability.
3. **Analytics**: Consider adding page view tracking.
