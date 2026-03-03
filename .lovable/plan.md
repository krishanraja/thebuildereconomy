

## Plan: Host Photo + Hero Consolidation

### Problem
The Subscribe ("Join The Builder Circle") and WhoBuilds sections waste vertical space as standalone sections. The host photo placeholder needs the actual headshot.

### Changes

#### 1. Add Host Photo
- Copy uploaded image to `src/assets/krish-headshot.png`
- Update `src/components/Host.tsx`: replace the `<User>` icon placeholder with an `<img>` tag using the headshot, with `object-cover rounded-2xl` styling

#### 2. Convert WhoBuilds into a Ticker in the Hero
- Rewrite `src/components/WhoBuilds.tsx` as a horizontally scrolling marquee/ticker of the tags ("Founders", "Creators", "Investors"...) using CSS animation (infinite horizontal scroll, duplicated list for seamless loop)
- Position it at the bottom of the hero section — inside `Hero.tsx`, render the ticker as a full-width strip just above the bottom edge
- Style: subtle, semi-transparent tags scrolling continuously left-to-right, no heading

#### 3. Add "Join the Community" Button to Hero
- Add a third button row in the Hero section (below "Listen on Spotify" and "Apply to Be a Guest"): a smaller "Join the Community" link button pointing to `https://live.themindmaker.ai` (opens in new tab)
- Use a subtle style — `variant="ghost"` or small text link with arrow icon, so it doesn't compete with the main CTAs

#### 4. Remove Subscribe and WhoBuilds Sections from Index
- Remove `<Subscribe />` and `<WhoBuilds />` from `src/pages/Index.tsx` page layout
- The Subscribe component can stay in the codebase but is no longer rendered
- WhoBuilds component gets repurposed as the ticker

### Files Changed
| File | Action |
|------|--------|
| `src/assets/krish-headshot.png` | Copy uploaded image |
| `src/components/Host.tsx` | Replace placeholder with real photo |
| `src/components/Hero.tsx` | Add community button + ticker at bottom |
| `src/pages/Index.tsx` | Remove Subscribe and WhoBuilds sections |

