# DESIGN SYSTEM

> Brand tokens, typography, spacing, and component guidelines.

---

## Color Palette

All colors are defined as HSL values in `src/index.css`.

### Core Colors

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | 212 51% 11% | Main background (deep ink blue) |
| `--foreground` | 155 85% 95% | Primary text color |
| `--primary` | 155 85% 73% | Primary brand color (mint green) |
| `--primary-foreground` | 212 51% 11% | Text on primary surfaces |
| `--secondary` | 212 51% 11% | Secondary surfaces |
| `--secondary-foreground` | 155 85% 95% | Text on secondary surfaces |
| `--muted` | 212 40% 20% | Muted backgrounds |
| `--muted-foreground` | 155 40% 70% | Muted text |
| `--accent` | 155 85% 73% | Accent color (same as primary) |
| `--card` | 212 45% 15% | Card backgrounds |
| `--border` | 212 30% 25% | Border color |

### Gradient Colors

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--gradient-start` | 212 51% 8% | Gradient start (darker) |
| `--gradient-mid` | 212 45% 15% | Gradient midpoint |
| `--gradient-end` | 155 50% 20% | Gradient end (mint tint) |
| `--glow-primary` | 155 85% 73% | Primary glow effect |
| `--glow-secondary` | 155 70% 60% | Secondary glow effect |

---

## Typography

### Font Family
- **Primary**: Outfit (headings and body)
- **Fallback**: Inter, sans-serif

### Font Weights
- **Regular**: 400 (body text)
- **Semibold**: 600 (emphasis)
- **Bold**: 700 (headings)

### Scale (Tailwind Classes)

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero tagline | text-lg | text-3xl |
| Section heading | text-4xl | text-5xl |
| Card title | text-xl | text-2xl |
| Body text | text-base | text-base |
| Small text | text-sm | text-sm |

---

## Spacing Scale

Using Tailwind's default spacing scale:
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)
- `24` = 6rem (96px)

### Section Spacing
- Section padding: `py-24 px-4`
- Container max-width: `max-w-4xl` or `max-w-6xl`
- Card padding: `p-12` (large), `p-8` (medium), `p-6` (small)

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.75rem | Default (cards, buttons) |
| `rounded-lg` | var(--radius) | Standard rounded |
| `rounded-2xl` | 1rem | Large containers |
| `rounded-full` | 9999px | Circular elements |

---

## Effects

### Gradients

```css
/* Mesh background gradient */
.gradient-mesh {
  background: 
    radial-gradient(ellipse at 20% 20%, hsl(var(--gradient-mid)) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, hsl(var(--gradient-end)) 0%, transparent 50%),
    linear-gradient(180deg, hsl(var(--gradient-start)) 0%, hsl(var(--background)) 100%);
}

/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Glow Effect

```css
.glow-effect {
  box-shadow: 
    0 0 40px hsl(var(--glow-primary) / 0.3),
    0 0 80px hsl(var(--glow-secondary) / 0.2);
}
```

### Text Shadow (Hero)
```css
text-shadow: 0 2px 20px hsl(var(--glow-primary) / 0.2);
```

---

## Animation Catalog

### Framer Motion Variants

```typescript
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

// Fade in only
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

// Scale in
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};
```

### CSS Transitions
- Standard transition: `transition-all duration-300`
- Fast transition: `transition-all duration-150`
- Hover opacity: `hover:opacity-100`

### Animation Delays (Hero section)
- Logo: delay 0.4s
- Tagline: delay 0.6s
- Buttons: delay 0.8s

---

## Component Guidelines

### Buttons

| Variant | Usage |
|---------|-------|
| Primary | Main CTAs: `bg-primary hover:bg-primary/90` |
| Outline | Secondary CTAs: `border-2 border-primary text-primary` |
| Disabled | Coming soon states: `cursor-not-allowed opacity-80` |

### Cards
- Background: `bg-card/50 backdrop-blur`
- Border: `border border-primary/20`
- Effect: `glow-effect rounded-2xl`

### Inputs
- Background: `bg-background/50`
- Border: `border-border focus:border-primary`

### Dialogs
- Max width: `max-w-2xl`
- Max height: `max-h-[90vh] overflow-y-auto`

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | < 640px | Mobile |
| `sm:` | ≥ 640px | Small tablets |
| `md:` | ≥ 768px | Tablets/Desktop |
| `lg:` | ≥ 1024px | Large desktop |
| `xl:` | ≥ 1280px | Extra large |
| `2xl:` | ≥ 1536px | Ultra wide |

### Mobile-First Patterns
- Stack on mobile: `flex-col sm:flex-row`
- Smaller text on mobile: `text-lg md:text-3xl`
- Smaller logo on mobile: `h-10 md:h-32`
