

## Hero Title: Bold Cinematic Reveal

### Concept

Kill the typewriter. Replace it with a **word-by-word cinematic reveal** — each word of "Welcome to the era of AI-enabled builders." lands individually with a staggered spring animation, sliding up from below with a blur-to-sharp effect. The title is massive, bold, and unmissable. Think tenex.co's confident, oversized typography that commands the screen.

### Changes

#### 1. Hero Title — Word-by-Word Spring Reveal (`src/components/Hero.tsx`)
- New tagline: `"Welcome to the era of AI-enabled builders."`
- Remove typewriter hook import and all typewriter logic
- Style as a true hero title: `text-3xl md:text-6xl font-bold tracking-tight leading-tight`
- Split the tagline into words. Each word is a `motion.span` that:
  - Starts: `opacity: 0, y: 40, filter: "blur(8px)"`
  - Animates to: `opacity: 1, y: 0, filter: "blur(0px)"`
  - Uses spring physics: `type: "spring", damping: 20, stiffness: 200`
  - Staggered with `staggerChildren: 0.08` on the parent
  - Delay after logo appears (~0.8s)
- "AI-enabled" gets a `text-gradient` class to make it pop
- Remove the invisible placeholder / absolute positioning hack — no longer needed

#### 2. Additional Pending Fixes (from previous approval)
- **Logo 25% bigger on mobile**: `max-w-[120px]` → `max-w-[150px]`
- **Button equal widths on mobile**: wrap all buttons in `w-full sm:w-auto` containers
- **YouTube button**: add greyed-out "Watch on YouTube" with Coming Soon tooltip, same style as Spotify
- **Brand icons**: copy uploaded Spotify/YouTube logos to `src/assets/`, use as `<img>` in buttons
- **About font fix**: first `<p>` from `text-xl` → `text-lg`

#### 3. Cleanup
- Delete `src/hooks/useTypewriter.ts` (no longer used anywhere)

### Files Changed
| File | Action |
|------|--------|
| `src/components/Hero.tsx` | Word-by-word reveal title, logo size, button widths, YouTube button, brand icons |
| `src/components/About.tsx` | First paragraph `text-xl` → `text-lg` |
| `src/assets/spotify-logo.png` | Copy uploaded Spotify logo |
| `src/assets/youtube-logo.png` | Copy uploaded YouTube logo |
| `src/hooks/useTypewriter.ts` | Delete (unused) |

