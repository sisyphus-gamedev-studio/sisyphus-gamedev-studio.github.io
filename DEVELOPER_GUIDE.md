# Developer Guide

## Architecture Overview

Single-page site with language-prefixed routes (`/{lang}/`). Astro handles static generation and server-side data fetching; React components handle interactivity. All pages are prerendered at build time (`prerender = true`).

The root `/` redirects to the default language route with a 301. A 404 page detects language from the URL and renders the appropriate translation.

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
| `/` | `pages/index.astro` | 301 redirect to the default language route |
| `/{lang}/` | `pages/[lang]/index.astro` | Main page, static paths for the configured languages |
| `/{lang}/rss.xml` | `pages/[lang]/rss.xml.ts` | RSS feed |
| `/*` (404) | `pages/404.astro` | Detects lang from URL |

`getStaticPaths` in both `[lang]` files returns a list of `[{ params: { lang } }]` for each supported language.

---

## Layout

`src/layouts/Layout.astro` is the root HTML shell. It sets up:

- Full `<head>`: meta, Open Graph, Twitter Card, hreflang, canonical, RSS `<link>`
- JSON-LD structured data (Organization + VideoGame entries from `SEO.games`)
- Font loading (`FONTS.googleCssHref`) and hero image preload (`HERO_PRELOAD_IMAGE_SRC`)
- Inline language redirect script (reads `LANGUAGE_STORAGE_KEY` from `localStorage` (currently `ss_lang`), redirects if URL lang doesn't match stored preference)
- Astro `<ClientRouter />` for view transitions
- Skip-to-content link and `<noscript>` warning
- Client script: scroll progress bar, ripple effect, scroll-reveal `IntersectionObserver`, view-transition scroll restoration

---

## Section Order

Sections are rendered in this order in `pages/[lang]/index.astro`:

1. **Hero** — title, stats, featured project cards
2. **About** — team stats, mission statement
3. **ProjectsCarousel** — desktop accordion / mobile swipe
4. **NewsCarousel** — auto-advancing carousel with category filters and modal
5. **Careers** — open application info and form link
6. **Donate** — support tiers (sponsor, one-time, wishlist)
7. **Partners** — partner cards with links
8. **Contact** — contact form (Web3Forms) and social links

---

## Components

### common/

| Component | Description |
|---|---|
| `AnimatedBackground` | Fixed full-screen animated grid. Two layers with `requestAnimationFrame`. Disabled on `prefers-reduced-motion`. |
| `ErrorBoundary` | React class component. Catches errors in subtrees; fallback UI uses `.error-boundary` classes. |
| `SkeletonCard` | Shimmer loading placeholder. Used in `NewsCarousel` before hydration. |

### features/

| Component | Description |
|---|---|
| `ContactForm` | Controlled form with client-side validation and Web3Forms submission. Strings from `t.contact.form`. |
| `NewsCarousel` | Auto-advancing carousel with category filters, touch swipe, keyboard navigation, and article modal. |
| `NewsModal` | Full-screen modal with focus trap, Escape to close, click-outside to close, scroll lock. |
| `ProjectsCarousel` | Renders `DesktopCarousel` or `MobileCarousel` based on viewport width. |

### layout/

| Component | Description |
|---|---|
| `BrandLink` | Shared logo + studio name link (`variant`: `nav` \| `footer`). Used by Navbar and Footer. |
| `Navbar` | Fixed top nav (`.nav-shell` / `.nav-shell--scrolled`), active section tracking, mobile sheet, language switcher. Links built via `buildNavLinks()` from `navigation.ts`. |
| `Footer` | Section links (`buildNavLinks(nav, \`/${lang}/\`)`), social icons, copyright, back-to-top. Styled with `.footer-shell` / `.footer-inner`. |

### sections/

All are `.astro` files. They receive translations and data as props and contain no client-side logic.

| Section | Background | Notes |
|---|---|---|
| `Hero` | transparent | Animated glitch title, stats, featured project cards; grid from `AnimatedBackground` |
| `About` | `--filled` (`--s-2`) | Stats, mission quote, active development status |
| `Team` | `--grid` (transparent) | Team grid island; animated grid visible |
| `ProjectsCarousel` | `--filled` | Desktop/mobile carousel |
| `NewsCarousel` | `--grid` | News carousel + filters; animated grid visible |
| `Careers` | `--filled` | Two-column: vacancies + application card |
| `Donate` | `--grid` | Three-tier support cards |
| `Partners` | `--filled` | Partner cards with category badges |
| `Contact` | `--grid` | Info + `ContactForm` island |

Sections after Hero alternate `--filled` / `--grid` so the fixed `AnimatedBackground` grid shows through transparent blocks.

---

## Configuration

All modules under `src/config/` are re-exported from `src/config/index.ts`.

### constants.ts

```ts
BRAND          // { prefix, suffix, short, foundedYear, teamSize }
NEWS_CAROUSEL  // { AUTO_INTERVAL, RESUME_DELAY }
SCROLL_REVEAL  // IntersectionObserver options
RIPPLE         // button selector + size multiplier
EMAIL_REGEX    // validation
FOCUSABLE_SELECTORS  // for focus trap in modals
UI             // small strings: skipLink, noScript, hero stats/badges, errorBoundary
```

### navigation.ts

```ts
NAV_SECTION_IDS  // home, about, team, projects, news, careers, donate, contact
buildNavLinks(nav, base?)  // { id, label, href }[] for Navbar (#hash) and Footer (/{lang}/#hash)
```

### Section layout (styling)

Every content section (except Hero) follows the same shell:

1. `site-section` (+ optional `site-section--filled` or `site-section--grid`)
2. `site-section__container` — max-width and horizontal padding (do not repeat inline)
3. `site-section__head` — eyebrow + `section-heading` + optional `section-lead` (48px bottom margin)
4. Content blocks — use the card system in `src/styles/cards.css`

### Card system (`cards.css`)

Use one of three families; avoid inline `background` / `border` / `border-radius` for static card shells.

| Family | Sections | Base classes |
|---|---|---|
| **Entity** | Team, Partners | `card card--interactive state` + `card-entity__*` |
| **Tier / CTA** | Donate | `card card--elevated card--interactive` + `md-badge` labels |
| **Media** | Projects mobile, News main, Hero | `card card--flush` + section BEM (`projects-mobile`, `news-card-main`, …) |

| Class | Use |
|---|---|
| `.card` | Default panel (`--s-4`, `--card-radius`, `--card-padding`) |
| `.card--elevated` | Raised surface (`--s-5`) — donate tiers |
| `.card--accent` | Orange border — featured partners/donate highlight |
| `.card--compact` | Compact tiles — About sidebar, careers stack/vacancies |
| `.card--media` | Hero featured game card (shadow) |
| `.card--secondary` | Smaller radius/padding — Hero concept link |
| `.card--interactive` | Unified hover lift + `--card-hover-shadow` |
| `.card--flush` | No padding — news main, projects mobile, contact form shell |
| `.card-accent-top` | Orange gradient top line |
| `.card-entity__media--accent-{orange,blue,green,purple}` | Placeholder avatars/logos |
| `.card-grid-gap` | Grid/flex gap token (`--card-grid-gap`, 12px) |

**Badges:** `md-badge` + modifiers (`md-badge-primary`, `md-badge--tag`, `md-badge--gold|silver|bronze|partner`). Partner categories: `sponsorCategoryBadgeClass()` in `accents.ts`. Project tags: `md-badge md-badge--tag`.

**Titles:** Person/org names → `card-entity__title` only. Game/project names → `t-card-title`.

Section CSS: `team-grid.css`, `partners-section.css`, `donate-section.css`, `projects-section.css`, `news-section.css`, `hero-section.css`, `modal-panel.css`, etc. All imported from `global.css`.

**Modals:** `.modal-backdrop` + `.modal-panel` (News article, Careers FAQ). Article titles use `.modal-panel__title` (sentence case), not `t-card-title`.

**News titles:** Main carousel `.news-card-main__title`; list `.news-card-list-item__title`.

Forms: `form-field`, `form-label`, `form-success` in `forms.css`.

Shared heading classes: `section-heading`, `section-heading__accent`, `section-lead`, `section-lead--narrow`, `section-lead--wide`.

Tokens live in `src/styles/tokens.css` (`--card-*`, `--layout-*`, `--font-sans`, colors). `DESIGN_TOKENS` in `design.ts` mirrors hex/rgba values for JS-only code (e.g. SVG placeholders). Prefer CSS classes over inline styles for static layout.

### design.ts

```ts
DESIGN_TOKENS  // orange, surfaces, borders — sync with tokens.css
LAYOUT         // { maxWidth, padding, navHeight, mobileBreakpoint } — also as --layout-* in CSS
IMAGE_FILTERS  // hero image filter (project/news filters live in section CSS)
SIZES          // hero and contact form dimensions still used inline in Hero.astro / ContactForm
```

### links.ts

```ts
URLS           // site, steam, youtube, youtubeOrigin, donate (all env-backed)
CONTACT        // email, web3formsAccessKey (env-backed)
SOCIAL_ICONS   // inline SVG strings for YouTube, Steam, email
SOCIAL_LINKS   // array used by Navbar and Footer
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
| `TranslationStructure` | Full shape of the translations object — TypeScript enforces EN/RU key parity |

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

Language is persisted to `localStorage` under `LANGUAGE_STORAGE_KEY` (currently `ss_lang`). The inline script in `Layout.astro` redirects on page load if the URL language doesn't match the stored preference.

`SUPPORTED_LANGUAGES` in `src/config/i18n.ts` must stay in sync with `i18n.locales` in `astro.config.mjs`.

### Translation key conventions

- Section headings use `heading` + `headingSuffix` — the suffix is rendered in orange.
- `sectionLabel` is the small eyebrow label above the heading.
- `footer.cta` is passed directly to the `Donate` section as its translation prop.

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
| `handleImageError(e, w, h)` | React `onError` — detailed SVG placeholder via `DESIGN_TOKENS` colors |
| `nativeImageFallback(w, h)` | Astro `onerror` string — simple rect placeholder |

Both handlers share internal `buildPlaceholderDataUrl`. Fallback dimensions should match `IMAGE_FALLBACK` in `src/config/images.ts`. Static image paths are in `IMAGES` (`src/config/images.ts`). OG/Twitter image uses `HERO_PRELOAD_IMAGE_SRC` via `seo.ts`.

---

## Styles

All files imported in `src/styles/global.css`:

| File | Contents |
|---|---|
| `tokens.css` | CSS custom properties: colors, surfaces, borders, radii, easing, spacing |
| `base.css` | Reset, scrollbar, selection, `focus-visible` |
| `typography.css` | `t-*` text utility classes |
| `buttons.css` | `btn-filled`, `btn-tonal`, `btn-outlined`, `icon-btn`, `icon-btn-outlined` |
| `components.css` | `state`, cards, `chip`, badges, nav/footer shells (`.nav-shell`, `.footer-shell`, `.brand-link`), flex utilities (`.flex-col`, `.gap-6`, `.gap-10`) |
| `animations.css` | Keyframes, entrance animations (`anim`, `reveal`, `reveal-left`, `reveal-right`, `reveal-scale`), glitch effects, reduced-motion overrides |
| `skeleton.css` | `skeleton-shimmer` shimmer animation |

### Key CSS variables (`tokens.css`)

```css
--font-sans

--c-orange, --c-orange-light, --c-orange-dim, --c-orange-border
--c-orange-07, --c-orange-15, --c-orange-30, --c-orange-40
--c-on-accent, --c-on-white, --c-on-surface, --c-muted, --c-modal-lead
--c-secondary, --c-tertiary
--c-glitch-red, --c-glitch-cyan

--s-1 … --s-6
--b-subtle, --b-default, --b-strong, --b-accent

--layout-max-width, --layout-padding, --layout-nav-height

--ease-em, --ease-dec
--r-sm … --r-full
--spacing-section
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
- [ ] Translations added for all supported languages with identical key shapes
- [ ] CSS variables used instead of raw hex values
- [ ] Config constants used instead of magic numbers
- [ ] `aria-label` on interactive elements without visible text
- [ ] New content JSON validates against the collection schema

---

## Deploying to GitHub Pages

Deployment is handled by `.github/workflows/deploy.yml`.

The workflow:

- Triggers on `push` to `main`
- Runs `npm ci` and `npm run build`
- Uploads the `./dist` artifact and deploys it to GitHub Pages

It passes build-time environment variables (`import.meta.env.PUBLIC_*`) via GitHub repository secrets.

Required secrets:

- `PUBLIC_SITE_URL`
- `PUBLIC_WEB3FORMS_ACCESS_KEY`
- `PUBLIC_YOUTUBE_URL`
- `PUBLIC_STEAM_URL`
- `PUBLIC_DONATE_URL`
- `PUBLIC_CAREERS_FORM_URL`
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_CONTACT_SOCIAL_EMAIL`

---

## Useful Links

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Web3Forms](https://docs.web3forms.com/)
