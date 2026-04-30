# Image drop-in cheat sheet

Drop files here with these exact paths and the site will pick them up. Until a
file is present, the layout renders a typographic placeholder in the section
colour — the layout never breaks.

All filenames are **lowercase-kebab-case**. Use `.jpg` for photography,
`.png` only for transparent assets.

## Required (the highest-impact slots)

| Path | Where it shows | Recommended size |
|------|----------------|------------------|
| `hero/hero-portrait.jpg` | Right column of the Hero on `md:` and up | 1600×2000 |
| `host/krish-portrait.jpg` | Host section, parallax portrait | 1200×1500 |
| `og/og-cover.jpg` | Open Graph share card | 1200×630 |

## Optional (richer the more you drop in)

| Path | Where it shows | Recommended size |
|------|----------------|------------------|
| `host/krish-action-1.jpg` | Secondary Host shot, slides in on scroll | 1200×800 |
| `about/about-collage-1.jpg` | Sticky pin in About | 1000×1200 |
| `guests/<slug>.jpg` | One per featured guest in the roster | 1000×1250 |
| `guests/<slug>-action.jpg` | Sustained-hover crossfade | 1200×800 |
| `episodes/ep-<NN>-cover.jpg` | Fallback when Supabase cover_image_url is empty | 1600×900 |
| `testimonials/<slug>.jpg` | Optional avatar next to a quote | 400×400 (square) |
| `misc/grain.png` | Heavier grain overlay (a built-in SVG grain runs by default) | 256×256 tile |

## Slug rules for guests

`slug` = guest name → lowercase, spaces → `-`, drop punctuation. Examples:

| Guest name | Slug |
|------------|------|
| `Riley Brown` | `riley-brown` |
| `Aravind Srinivas` | `aravind-srinivas` |
| `Dr. Mary Aiken` | `dr-mary-aiken` |

Wire new guests in `src/data/guests.ts` if you want a custom slug → file
override. The default is the auto-slug above.

## What happens if a file is missing

Each section's Img helper falls back to a typographic poster (display serif
label on the section's block colour). This is on purpose — it looks
intentional, so you can ship the redesign and drop photography in over time.
