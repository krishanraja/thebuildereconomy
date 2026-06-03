#!/usr/bin/env node
/**
 * check-email-links.mjs
 *
 * Guardrail against the "fake links in real emails" incident: the welcome
 * email once shipped with links to /ep/origin, /ep/tactics and /ep/vision —
 * episode pages that do not exist — so every new subscriber who clicked got a
 * 404. (The show does not launch until 2026.)
 *
 * This scans the email edge functions for hard-coded links to our own site and
 * fails if any point somewhere other than the live, allow-listed destinations
 * below. External links (Resend, user-supplied LinkedIn/product URLs, etc.) are
 * out of scope. Dynamic links built from template values are skipped.
 *
 * Run:  node scripts/check-email-links.mjs   (also wired into CI)
 */

import { readFileSync } from "node:fs";

const SITE_HOSTS = ["thebuildereconomy.com", "www.thebuildereconomy.com"];

// Only these internal destinations are known to exist in production. Keep this
// list honest: do NOT add a path until the page is actually live. When real
// episode routes ship, add them here (and update the /ep/* redirect in
// vercel.json) so this check passes by design, not by accident.
const ALLOWED_INTERNAL = new Set([
  "https://thebuildereconomy.com",
  "https://thebuildereconomy.com/",
  "https://www.thebuildereconomy.com",
  "https://www.thebuildereconomy.com/",
]);

const FILES = [
  "supabase/functions/send-welcome-email/index.ts",
  "supabase/functions/notify-guest-application/index.ts",
];

// Absolute URLs only. We police links to our own hosts; everything else passes.
const URL_RE = /https?:\/\/[^\s"'`)<>]+/g;

const violations = [];

for (const file of FILES) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue; // a function may not exist in every checkout
  }

  src.split("\n").forEach((line, index) => {
    const matches = line.match(URL_RE);
    if (!matches) return;

    for (const raw of matches) {
      // Skip links assembled from template values — not static placeholders.
      if (raw.includes("${")) continue;

      const url = raw.replace(/[.,)]+$/, ""); // trim trailing punctuation
      let host;
      try {
        host = new URL(url).host;
      } catch {
        continue;
      }
      if (!SITE_HOSTS.includes(host)) continue; // only police our own domain

      const normalized = url.split("#")[0].split("?")[0];
      if (!ALLOWED_INTERNAL.has(normalized)) {
        violations.push({ file, line: index + 1, url });
      }
    }
  });
}

if (violations.length > 0) {
  console.error("\n✖ Email link check failed — links to non-existent internal pages:\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.url}`);
  }
  console.error(
    "\nEmails go to real subscribers the moment they sign up. Link only to pages\n" +
      "that exist in production. If a destination is now live, add it to\n" +
      "ALLOWED_INTERNAL in scripts/check-email-links.mjs.\n"
  );
  process.exit(1);
}

console.log("✓ Email link check passed — no links to non-existent internal pages.");
