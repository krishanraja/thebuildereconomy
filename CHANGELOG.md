# Changelog

All notable changes to The Builder Economy project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Backend consolidation migration
  (`supabase/migrations/20260603120000_audience_contacts_and_be_guest_applications.sql`):
  a cross-property `lead_source` enum (`ctrl`, `mindmaker_site`, `mindmaker_live`,
  `builder_economy`), a unified `audience_contacts` table, and `be_guest_applications`.
  Applied additively to the shared Mindmaker AI Supabase project as the first step of
  moving Builder Economy off the Lovable-managed project. No existing CTRL object is
  altered. (Edge functions + front-end repoint to follow.)
- Editorial mission doc (`docs/MANIFESTO.md`) and guest casting spec
  (`docs/GUEST_BRIEF.md`), the latter written for human bookers and AI sourcing
  agents (archetypes, inclusion criteria, disqualifiers, scoring rubric, JSON
  output format)
- On-page email capture (`src/components/NotifyForm.tsx`) used in the Hero and a
  new Subscribe band; writes to `subscribers` and fires `send-welcome-email`
- Master Instructions compliance documentation (`docs/MASTER_INSTRUCTIONS.md`)
- Project notes and decision log (`docs/PROJECT_NOTES.md`)
- Architecture documentation (`docs/ARCHITECTURE.md`)
- Design system documentation (`docs/DESIGN_SYSTEM.md`)
- Structured logging utility (`src/lib/logger.ts`)
- Centralized configuration (`src/lib/config.ts`)
- Animation variants library (`src/lib/animations.ts`)
- Centralized type definitions (`src/types/index.ts`)
- File header documentation to key components

### Changed
- Hero primary CTA is now on-page email capture instead of an off-site link
- Rebuilt the unused, off-voice Subscribe section as an on-brand closing band
  that uses NotifyForm
- About copy sharpened to carry the manifesto's core thesis (taste is the moat)
- Welcome email rewritten to voice and made launch-honest (no fake episode links)
- Synced `GuestApplication` / `GuestApplicationFormData` types with the live
  form fields; removed the `as any` cast in the guest application insert
- Updated ARCHITECTURE (component tree, `guest_applications` schema, newsletter
  flow), PROJECT_NOTES, and README to match the current code
- Improved responsive design for mobile devices
- Updated Header logo sizing: `h-10` on mobile, `h-32` on desktop
- Updated Hero tagline: `text-lg` on mobile, `text-3xl` on desktop
- Added controlled line breaks for mobile tagline

### Fixed
- Welcome email no longer links to episode pages that don't exist. The live edge
  function was still sending the pre-launch email (links to `/ep/origin`,
  `/ep/tactics`, `/ep/vision`), so every new subscriber hit a 404 — deploy drift
  between the repo and the deployed function. Hardened against recurrence (below)
  and documented the edge-function redeploy step.

### Added (tooling / safety nets)
- `scripts/check-email-links.mjs` + CI (`.github/workflows/ci.yml`): fails the
  build if any email links to a non-existent internal page
- `vercel.json`: SPA rewrite so deep links stop hard-404ing, plus a temporary
  `/ep/*` → `/` redirect so links already sent in welcome emails land on the home
  page instead of a raw host 404
- On-brand 404 page (`src/pages/NotFound.tsx`)
- Operational runbook (`docs/RUNBOOK.md`)

---

## [1.0.0] - 2025-12-09

### Added
- Initial project setup with Lovable
- Hero section with podcast branding
- Guest application modal and flow
- Newsletter subscription with welcome email
- Featured guests section
- Episodes section
- Testimonials section
- About section
- Footer with links
- Edge functions for email notifications:
  - `send-welcome-email`
  - `notify-guest-application`
- Database tables:
  - `subscribers`
  - `guest_applications`
  - `episodes`
  - `guests`
  - `testimonials`
- Row Level Security policies for all tables
- Framer Motion animations
- Responsive design
- Custom design system with ink blue and mint green theme
