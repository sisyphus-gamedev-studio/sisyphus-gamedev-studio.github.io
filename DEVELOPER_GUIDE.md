# Developer Guide

## Architecture Overview

Single-page site with two language routes (`/en/`, `/ru/`). Astro handles static generation and server-side data fetching; React components handle interactivity. All pages are prerendered at build time (`prerender = true`).

The root `/` redirects to `/en/` with a 301. A 404 page detects language from the URL and renders the appropriate translation.

**Layers:**

1. **Routes** (`src/pages/`) — load content collections, pick the active language, pass typed props into layout and sections.
2. **Sections** (`.astro` under `components/sections/`) — static markup; may embed React islands with `client:*`.
3. **Islands** (`.tsx` under `components/features/` and `components/layout/`) — state, effects, keyboard/touch, forms.
4. **Config** (`src/config/`) — design tokens, URLs, runtime constants. Import from the barrel `src/config/index.ts`.
5. **Utils** (`src/utils/`) — cross-cutting helpers (image error fallbacks).

---

## Routing & Pages

| Route | File | Notes |
|---|---|---|
| `/` | `pages/index.astro` | 301 redirect to `/en/` |
| `/{lang}/` | `pages/[lang]/index.astro` | Main page, static paths for `en` and `ru` |
| `/{lang}/rss.xml` | `pages/[lang]/rss.xml.ts` | RSS feed |
| `/*` (404) | `pages/404.astro` | Detects lang from URL |

`getStaticPaths` in both `[lang]` files returns `[{ params: { lang: "en" } }, { params: { lang: "ru" } }]`.

---

## Layout

`src/layouts/Layout.astro` is the root HTML shell. It sets up:

- Full `<head>`: meta, Open Graph, Twitter Card, hreflang, canonical, RSS `<link>`
- JSON-LD structured data (Organization + VideoGame entries from `SEO.games`)
- Font loading (`FONTS.googleCssHref`) and hero image preload (`HERO_PRELOAD_IMAGE_SRC`)
- Inline language redirect script (reads `LANGUAGE_STORAGE_KEY` from `localStorage`, redirects if URL lang doesn't match stored preference)
- Astro `<ClientRouter />` for view transitions
- Skip-to-content link and `<noscript>` warning
- Client script: scroll progress bar, ripple effect, scroll-reveal `IntersectionObserver`, view-transition scroll restoration

---

## Section Order

Sections are rendered in this order in `pages/[lang]/index.astro`:

1. **Hero** — title, stats, featured project cards
2. **About** — team info, disciplines, mission statement
3. **ProjectsCarousel** — desktop accordion / mobile swipe
4. **NewsCarousel** — auto-advancing carousel with category filters and modal
5. **Partners** — partner cards with links
6. **Careers** — open application info and form link
7. **Contact** — contact form (Formspree) and social links
8. **Donate** — support tiers (sponsor, one-time, wishlist)

---

## Components

### common/

| Component | Description |
|---|---|
| `AnimatedBackground` | Fixed full-screen animated grid. Two layers with `requestAnimationFrame`. Disabled on `prefers-reduced-motion`. |
| `DisciplineIcon` | Renders an SVG icon by name (`engineering`, `art`, `sound`, `design`). |
| `ErrorBoundary` | React class component. Catches errors in subtrees and renders a fallback UI. |
| `SkeletonCard` | Shimmer loading placeholder. Used in `NewsCarousel` before hydration. |

### features/

| Component | Description |
|---|---|
| `ContactForm` | Controlled form with client-side validation and Formspree submission. Strings from `t.contact.form`. |
| `NewsCarousel` | Auto-advancing carousel with category filters, touch swipe, keyboard navigation, and article modal. |
| `NewsModal` | Full-screen modal with focus trap, Escape to close, click-outside to close, scroll lock. |
| `ProjectsCarousel` | Renders `DesktopCarousel` or `MobileCarousel` based on viewport width. |

### layout/

| Component | Description |
|---|---|
| `Navbar` | Fixed top nav with scroll-based background, active section tracking via `IntersectionObserver`, mobile menu with focus trap, language switcher. |
| `Footer` | Navigation links, copyright with dynamic year, back-to-top button. |

### sections/

All are `.astro` files. They receive translations and data as props and contain no client-side logic.

| Section | Background | Notes |
|---|---|---|
| `Hero` | transparent | Animated glitch title, stats, project cards |
| `About` | `var(--s-2)` | Team stats, disciplines grid, mission quote |
| `Partners` | transparent | Partner cards with category badges and links |
| `Careers` | `var(--s-2)` | Two-column layout: description + application card |
| `Contact` | transparent | Two-column: info + `ContactForm` island |
| `Donate` | `var(--s-2)` | Three-tier support cards |

---

## Configuration

All modules under `src/config/` are re-exported from `src/config/index.ts`.

### constants.ts

```ts
BRAND          // { prefix, suffix, short, foundedYear, teamSize }
TRANSITIONS    // CSS transition strings
NEWS_CAROUSEL  // { AUTO_INTERVAL, RESUME_DELAY }
SCROLL_REVEAL  // IntersectionObserver options
RIPPLE         // button selector + size multiplier
EMAIL_REGEX    // validation
FOCUSABLE_SELECTORS  // for focus trap in modals
UI             // small strings used outside translations (skip link, noscript, badges)
```

### design.ts

```ts
COLORS         // orange palette, surfaces, text, borders, news category colors
LAYOUT         // { maxWidth: 1280, padding: 20, navHeight: 76 }
SPACING        // section padding, card padding, nav link margin
EASING         // CSS easing strings
GRADIENTS      // card overlays, orange tint
IMAGE_FILTERS  // brightness/saturation for project/news images
TAG_STYLE      // base + desktop/mobile tag styles
SIZES          // news card, modal, hero card dimensions
```

### links.ts

```ts
URLS           // site, steam, youtube, donate (all env-backed)
CONTACT        // email, contactEmail, careerEmail, formspreeEndpoint (env-backed)
SOCIAL_ICONS   // inline SVG strings for YouTube, Steam, email
SOCIAL_LINKS   // array used by Navbar and Footer — all SVG-based (no Lucide components)
CONTACT_PAGE_SOCIAL  // array used by Contact section
isMailtoLink   // (href: string) => boolean
```

---

## Types

`src/types.ts`:

| Type | Description |
|---|---|
| `Language` | `"en" \| "ru"` |
| `NewsCategory` | `"announcement" \| "dev-diary" \| "update"` |
| `Project` | Mapped from projects collection for a specific language |
| `NewsItem` | Mapped from news collection for a specific language |
| `TranslationStructure` | Full shape of the translations object — all `partners` fields are required |

---

## Content Collections

Defined in `src/content/config.ts` with Zod validation.

### News schema

```
isoDate     string  YYYY-MM-DD
image       string  must start with /images/
type        enum    announcement | dev-diary | update  (default: update)
en / ru     object  { title, date, summary, body }
```

### Projects schema

```
id          number  positive integer, used for sort order
image       string  must start with /images/
progress    number  0–100 (optional)
wishlistUrl string  valid URL (optional)
en / ru     object  { title, description, price, tags? }
```

---

## i18n

`src/i18n/translations.ts` exports `TRANSLATIONS` typed against `TranslationStructure`. Covers all sections including `contact.form` (used by the `ContactForm` island) and `meta.rssTitle` / `meta.rssDescription` (used by the RSS feed and layout `<link>`).

Language is persisted to `localStorage` under `LANGUAGE_STORAGE_KEY`. The inline script in `Layout.astro` redirects on page load if the URL language doesn't match the stored preference.

`SUPPORTED_LANGUAGES` in `src/config/i18n.ts` must stay in sync with `i18n.locales` in `astro.config.mjs`.

---

## Hooks

| Hook | Description |
|---|---|
| `useCarouselKeyboard` | Arrow keys, Home, End navigation on a container ref. Returns `{ containerRef }`. |
| `useLanguageSync` | Writes current language to `localStorage` on change. |
| `useReducedMotion` | Returns `true` if `prefers-reduced-motion: reduce`. Updates reactively. |

---

## Utilities

`src/utils/images.ts`:

| Export | Description |
|---|---|
| `getHeroImage(name)` | Returns `/images/hero/{name}.jpg` |
| `handleImageError(e, w, h)` | React `onError` handler — replaces broken image with inline SVG placeholder |
| `nativeImageFallback(w, h)` | Returns an `onerror` string for Astro `<img>` tags |

Fallback dimensions should match `IMAGE_FALLBACK` in `src/config/images.ts`. Static image paths are centralized in `IMAGES` (also from `src/config/images.ts`).

---

## Styles

All files imported in `src/styles/global.css`:

| File | Contents |
|---|---|
| `tokens.css` | CSS custom properties: colors, surfaces, borders, radii, easing, spacing |
| `base.css` | Reset, scrollbar, selection, `focus-visible` |
| `typography.css` | `t-*` text utility classes |
| `buttons.css` | `btn-filled`, `btn-tonal`, `btn-outlined`, `icon-btn`, `icon-btn-outlined` |
| `components.css` | `state`, cards, `chip`, badges, progress bars, section eyebrow, skip link, footer/nav links, flex utilities |
| `animations.css` | Keyframes, entrance animations (`anim`, `reveal`, `reveal-left`, `reveal-right`, `reveal-scale`), glitch effects, `reduced-motion` overrides |
| `skeleton.css` | `skeleton-shimmer` shimmer animation |

### Key CSS variables (`tokens.css`)

```css
/* Accent */
--c-orange, --c-orange-light, --c-orange-accent, --c-orange-dim, --c-orange-border

/* Text */
--c-on-surface, --c-secondary, --c-tertiary

/* Surfaces (darkest → lightest) */
--s-1 (#0d0d0d) through --s-5 (#202020)

/* Borders */
--b-subtle, --b-default, --b-strong, --b-accent

/* Easing */
--ease-em, --ease-dec

/* Radii */
--r-sm (8px), --r-xl (20px), --r-2xl (24px), --r-full (9999px)

/* Spacing */
--spacing-section: 100px 0
```

### Scroll reveal

Add a class to any element to animate it on scroll:

```
.reveal          fade up
.reveal-left     slide from left
.reveal-right    slide from right
.reveal-scale    scale up
```

The layout's `IntersectionObserver` adds `.in` when the element enters the viewport.

---

## Pre-commit Checklist

- [ ] `npm run ci` passes (typecheck + lint + format)
- [ ] Translations added for both `en` and `ru` with identical key shapes
- [ ] CSS variables used instead of raw hex values
- [ ] Config constants used instead of magic numbers
- [ ] `aria-label` on interactive elements without visible text
- [ ] New content JSON validates against the collection schema

---

## Useful Links

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Formspree](https://formspree.io/docs)
