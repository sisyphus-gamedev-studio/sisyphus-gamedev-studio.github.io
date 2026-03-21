# Developer Guide

## Architecture Overview

Single-page site with two language routes (`/en/`, `/ru/`). Astro handles static generation and server-side data fetching; React components handle interactivity. All pages are prerendered at build time.

The root `/` redirects to the default language. A 404 page detects language from the URL and renders the appropriate translation.

---

## Routing & Pages

Routes are generated from `src/pages/[lang]/index.astro` with static paths for each supported language. The page fetches content collections, transforms them into typed arrays using the current language, and passes data down to all section components.

An RSS feed is available at `/{lang}/rss.xml`.

---

## Layout

`src/layouts/Layout.astro` is the root HTML shell. It sets up:

- Full `<head>` with meta, Open Graph, Twitter Card, hreflang, canonical, and RSS link
- JSON-LD structured data (Organization + VideoGame entries)
- Font loading and critical image preloads
- Inline language redirect script (reads persisted language from `localStorage`, redirects if URL doesn't match)
- Astro `<ClientRouter />` for view transitions
- Skip-to-content link and `<noscript>` warning
- Client-side scripts: scroll progress bar, button ripple effect, intersection observer for scroll reveal animations

---

## Components

### common/

Reusable primitives shared across the site.

- **AnimatedBackground** — fixed full-screen animated grid background. Two overlapping grid layers animated with `requestAnimationFrame`. Disabled when `prefers-reduced-motion` is set.
- **DisciplineIcon** — renders discipline-specific icons by name.
- **ErrorBoundary** — React class component. Catches errors in subtrees and renders a fallback UI. Used to wrap major interactive sections.
- **SkeletonCard** — loading placeholder with shimmer animation. Used during SSR before hydration.

### features/

Interactive components that handle user input and state.

- **ContactForm** — controlled form with client-side validation and Formspree submission. Manages field values, validation errors, focus state, and submission status.
- **NewsCarousel** — auto-advancing carousel with category filters, touch swipe, keyboard navigation, and a modal for full articles. Respects `prefers-reduced-motion`.
- **NewsModal** — full-screen modal with focus trap, Escape to close, click-outside to close, and scroll lock.
- **ProjectsCarousel** — responsive carousel that renders a desktop accordion or mobile swipe view depending on viewport width.

### layout/

- **Navbar** — fixed top navigation with scroll-based background transition, active section tracking, mobile menu with focus management, and a language switcher.
- **Footer** — site footer with navigation links, copyright, and back-to-top button.

### sections/

Astro components for each page section. They receive translations and data as props and contain no client-side logic of their own.

- **Hero** — main landing section with animated title, stats, and featured project cards.
- **About** — studio info with team stats, disciplines, and mission statement.
- **Donate** — support tiers linking to donation, sponsor contact, and Steam wishlist.
- **Contact** — contact info alongside the `ContactForm` component.

---

## Configuration

All constants are in `src/config/` and re-exported from a single index file.

- **constants.ts** — brand info, transition timings, carousel intervals, validation patterns, UI strings
- **design.ts** — color palette, easing functions, layout dimensions, spacing, image filters, gradients, component sizes
- **links.ts** — external URLs (from env vars), contact details, social link definitions
- **seo.ts** — default title/description, OG image path and dimensions, game schema entries

Use config constants instead of magic numbers:

```ts
// wrong
const interval = 5500;

// right
import { NEWS_CAROUSEL } from "@/config";
const interval = NEWS_CAROUSEL.AUTO_INTERVAL;
```

---

## Types

Defined in `src/types.ts`:

- `Language` — supported locale values
- `NewsCategory` — valid news post types
- `Project` — project data shape
- `NewsItem` — news post data shape
- `TranslationStructure` — full shape of the translations object, used to type all translation props

---

## Content Collections

Defined in `src/content/config.ts` using Astro Content Collections with Zod validation.

**News** fields: `isoDate` (YYYY-MM-DD), `image` path, `type` enum, localized `title`/`date`/`summary`/`body` for each language.

**Projects** fields: `id` (used for sort order), `image` path, optional `progress` (0–100), optional `wishlistUrl`, localized `title`/`description`/`price`/`tags` for each language.

---

## i18n & Translations

`src/i18n/translations.ts` exports a single `TRANSLATIONS` object typed against `TranslationStructure`. It covers all sections: nav, meta, hero, projects, about, news, contact, footer, and 404.

Language is persisted to `localStorage`. On page load, the inline script in the layout redirects if the URL language doesn't match the stored preference.

---

## Hooks

- **useCarouselKeyboard** — attaches keyboard navigation (Arrow keys, Home, End) to a container ref. Returns the ref to attach to the carousel element.
- **useLanguageSync** — writes the current language to `localStorage` on change.
- **useReducedMotion** — returns `true` if `prefers-reduced-motion: reduce` is active. Updates reactively on media query change.

---

## Utilities

- **helpers.ts** — `isMailtoLink(href)` checks if a link is a mailto, used to conditionally set `target` and `rel` attributes.
- **images.ts** — `getHeroImage(name)` builds an image path; `handleImageError` (React) and `nativeImageFallback` (Astro) replace broken images with an inline SVG placeholder.
- **news.ts** — `getNewsCategories()`, `getCategoryLabel(type, lang)`, `getCategoryColor(type)` for working with news category metadata.

---

## Styles

CSS is split into focused files, all imported in `src/styles/global.css`:

| File | Contents |
|---|---|
| `tokens.css` | CSS custom properties: colors, surfaces, borders, radii, easing |
| `base.css` | Reset, scrollbar, selection, focus-visible |
| `typography.css` | `t-*` text utility classes |
| `buttons.css` | Button variants |
| `components.css` | Cards, chips, badges, progress bars, layout utilities, reveal classes |
| `animations.css` | Keyframes, entrance animations, glitch effects |
| `skeleton.css` | Shimmer animation for loading states |

### CSS Variables

Key variables defined in `tokens.css`:

```css
/* Orange accent */
--c-orange, --c-orange-light, --c-orange-accent
--c-orange-dim, --c-orange-border

/* Text */
--c-on-surface, --c-secondary, --c-tertiary

/* Surfaces */
--s-1 through --s-5

/* Borders */
--b-subtle, --b-default, --b-strong, --b-accent

/* Easing */
--ease-em, --ease-dec

/* Border radii */
--r-sm, --r-xl, --r-2xl, --r-full
```

### Scroll Reveal

Add one of these classes to any element to animate it in when it enters the viewport:

```
.reveal          fade up
.reveal-left     slide from left
.reveal-right    slide from right
.reveal-scale    scale up
```

The layout's intersection observer adds `.in` when the element becomes visible.

---

## Pre-commit Checklist

- [ ] `npm run ci` passes
- [ ] Translations added for all supported languages
- [ ] CSS variables used instead of raw values
- [ ] Config constants used instead of magic numbers
- [ ] `aria-label` added on interactive elements without visible text
- [ ] Content JSON is valid against the collection schema

---

## Useful Links

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
