# Runbook

Operational notes for keeping The Builder Economy healthy. Short and practical.

---

## Incident: subscribers report broken links in the welcome email

**Symptom.** A new subscriber clicks a link in the welcome email and gets a
`404: NOT_FOUND` page (the host's, e.g. Vercel's `iad1::…` error page).

**Root cause (2026-06).** An early version of `send-welcome-email` linked to
`/ep/origin`, `/ep/tactics`, and `/ep/vision` — episode pages that do not exist
(the show launches in 2026). Two compounding problems:

1. **Fake links in a real email.** The email promised resources that were never
   published.
2. **Deploy drift.** The repo had already removed those links ("launch-honest"
   welcome email), but the **edge function was never redeployed**, so production
   kept sending the old email long after the fix was committed.
3. **No SPA fallback.** The site is a Vite SPA with no host rewrite, so any deep
   link hard-404s at the edge before the React app (and its branded 404) loads.

**What's in place now.**

- The welcome email links only to live destinations. CI runs
  `node scripts/check-email-links.mjs`, which fails the build if any email links
  to a non-existent internal page.
- `vercel.json` redirects `/ep/*` → `/` (temporary) so links already sitting in
  inboxes resolve to the home page, and rewrites all other unknown paths to the
  SPA so they show the branded 404 instead of a raw host error.

**If it happens again:**

1. Look at the live email, not just the repo. Reproduce by subscribing a test
   address.
2. Diff the deployed edge function against `supabase/functions/send-welcome-email/index.ts`.
   If they differ, you have deploy drift — redeploy (see below).
3. If a link points to a page that isn't live yet, remove it or point it at the
   home page, then add the offending path to the `/ep/*`-style redirect in
   `vercel.json` so already-sent links land softly.

---

## Deploying changes

**The site and the edge functions deploy separately.** Shipping the front end
does **not** ship `supabase/functions/**`. This is the gap that caused the
incident above.

- **Front end / `vercel.json`:** deploys with the site (Lovable Publish, or the
  connected Vercel/GitHub deploy).
- **Edge functions (`send-welcome-email`, `notify-guest-application`):** must be
  deployed to Supabase explicitly after any change:

  ```bash
  supabase functions deploy send-welcome-email
  supabase functions deploy notify-guest-application
  ```

  (Or redeploy functions from the Lovable Cloud / Supabase dashboard.)

After editing anything under `supabase/functions/**`, redeploy and then verify
by sending yourself a real signup.
