# Changelog

All notable changes to The Builder Economy project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
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
- Improved responsive design for mobile devices
- Updated Header logo sizing: `h-10` on mobile, `h-32` on desktop
- Updated Hero tagline: `text-lg` on mobile, `text-3xl` on desktop
- Added controlled line breaks for mobile tagline

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
