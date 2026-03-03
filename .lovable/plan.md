

## Content Upgrade + Premium Animations + Mobile-Perfect Guest Form

### Scope

8 files changed, 1 new file created, 1 DB migration, 1 edge function update. Every section gets updated copy, tenex.co-style framer animations (smooth reveals, staggered children, spring physics, viewport-triggered), and the guest form is rebuilt from scratch with 7 fields optimized for mobile.

---

### 1. Hero — New Tagline
**File:** `src/components/Hero.tsx`
- Change tagline to `"The show for the builder era."`
- Keep typewriter effect, all animation logic unchanged

### 2. About — Full Copy Rewrite
**File:** `src/components/About.tsx`
- Two paragraphs from the doc: "The Creator Economy gave everyone a camera..." and "The Builder Economy is the show that documents this era..."
- Add staggered paragraph reveals (each paragraph fades in separately with slight delay)
- Heading: "About the Show"

### 3. New Host Section
**File:** `src/components/Host.tsx` (new)
- Krish Raja bio from the doc
- LinkedIn link button
- Placeholder div for host photo (with note it's coming)
- Smooth slide-in animation from left for photo area, fade-up for text
- Add to Index.tsx after About

### 4. Guest CTA Section — New Inline Section
**File:** `src/components/GuestCTA.tsx` (replaces WhoBuilds or sits alongside)
- Heading: "Want to be on the show?"
- Subtext from doc: "We're booking builders who are turning ideas into real products..."
- CTA button opens the modal
- Animated entrance

### 5. Guest Application Modal — Complete Rebuild (Mobile-First)
**File:** `src/components/GuestApplicationModal.tsx`

This is the most critical piece. The form must be perfect on mobile.

**New 7 fields:**
1. Name + LinkedIn URL (two inputs side-by-side on desktop, stacked on mobile)
2. What are you building? (short text)
3. How are you using AI to build or run it? (short text)
4. What's one thing about building with AI that surprised you? (textarea, 4 rows)
5. What stage are you at? (radio group: Idea / Early build / Launched pre-revenue / Revenue / Scaling)
6. Drop a link (text, optional)
7. What would you want someone to walk away knowing? (textarea, 4 rows)

**Mobile-first design decisions:**
- Full-screen sheet on mobile (using `Sheet` or full-height `Dialog`) instead of a centered modal that gets cramped
- Generous touch targets: min 44px height on all inputs
- Sticky submit button at bottom on mobile
- Smooth scroll within the form
- Each field group animates in with staggered delay on open
- Labels are descriptive (the question itself), not generic field names
- Progress indicator or step count at top

**Animation approach (tenex-style):**
- Modal/sheet entrance: smooth spring animation (`type: "spring", damping: 25, stiffness: 300`)
- Form fields stagger in: `staggerChildren: 0.06` with `fadeInUp` variants
- Submit button has subtle glow pulse
- Success state: checkmark animation before close

**Validation:** Zod schema with all 7 fields. Name, what_building, how_using_ai, surprise_insight, stage, takeaway required. LinkedIn and product_link optional.

### 6. Database Migration
Add columns to `guest_applications`:
```sql
ALTER TABLE guest_applications 
  ADD COLUMN linkedin_url text,
  ADD COLUMN what_building text,
  ADD COLUMN how_using_ai text,
  ADD COLUMN surprise_insight text,
  ADD COLUMN stage text,
  ADD COLUMN product_link text,
  ADD COLUMN takeaway text;
```
Keep old columns (no data loss). New inserts use the new fields; old columns get null.

### 7. Edge Function Update
**File:** `supabase/functions/notify-guest-application/index.ts`
- Update Zod schema for 7 new fields
- Update admin email HTML template to show all 7 answers clearly formatted
- Update auto-reply to reference their specific product/build

### 8. Subscribe → External Link
**File:** `src/components/Subscribe.tsx`
- Remove email form entirely
- Keep visual card with "Join The Builder Circle" heading
- Single CTA button: `<a href="https://live.themindmaker.ai" target="_blank">`
- Remove supabase import, useState, zod — clean component

### 9. Footer Update
**File:** `src/components/Footer.tsx`
- Change "A Mindmaker Production" to "a Mindmaker LLC product. New York, NY."

### 10. Index.tsx Layout Update
**File:** `src/pages/Index.tsx`
- Add `Host` component after `About`
- Add `GuestCTA` section (pass `onApplyClick`)
- Keep FeaturedGuests, Episodes, Testimonials (they return null when empty)

### 11. Animation Upgrade Across All Sections
Apply tenex.co-inspired animation patterns consistently:
- **Viewport-triggered reveals** using `useInView` with `motion.div`
- **Staggered children** for multi-element sections (About paragraphs, Host bio lines, WhoBuilds tags)
- **Spring physics** on interactive elements (buttons, cards): `type: "spring", stiffness: 400, damping: 30`
- **Smooth y-translate reveals**: elements slide up 40-60px with opacity fade, duration 0.6-0.8s
- **Scale on hover** for cards and buttons: `whileHover={{ scale: 1.02 }}` with `whileTap={{ scale: 0.98 }}`

### 12. Post-Implementation Testing
After implementation, I will test on:
- Desktop viewport: full layout, animations, form open/close, form submission
- Mobile viewport (375px): form usability, touch targets, scroll behavior, all sections readable
- Tablet viewport (768px): intermediate layout check

---

### Technical Notes
- The `guest_applications` table currently has `full_name`, `email`, `title_company`, `topic_pitch`, `social_link`. We keep these and add 7 new nullable columns. The insert logic maps the new form fields to new columns; `full_name` stays as the name field, `email` gets dropped from the form (we still collect name but email is gone from the new spec — wait, the new form doesn't have email). 

Actually, looking at the new form spec closely: there's no email field. The form collects Name + LinkedIn, what they're building, AI usage, surprise, stage, link, takeaway. But the edge function needs to send an auto-reply — without email, it can only notify admin. This is a design decision.

The notification to `krish@themindmaker.ai` still works (edge function sends to admin). The auto-reply to the applicant won't work without their email. I'll keep email as an optional field or remove the auto-reply. Given the doc says "sends a detailed email via resend to krish@themindmaker.ai", I'll keep it as admin-only notification and drop the auto-reply. But I should add email back as a required field for follow-up purposes.

**Decision:** Add email as field #1 (before LinkedIn) since Krish needs to reach them. The doc lists "Name + LinkedIn URL" as Q1 but having no way to contact someone is impractical. I'll include: Name, Email, LinkedIn URL as the first group.

