# Sisyphus Studio

Multilingual site for an indie game studio (Astro + React). Supports language-prefixed routes `/en/` and `/ru/` and uses prerendered content with small React “islands” for interactivity.
Built with Astro 5, React 19, TypeScript, and Tailwind CSS. Current language is persisted in `localStorage` under `ss_lang` (`LANGUAGE_STORAGE_KEY`).

## Quick Start

```bash
npm install
cp .env.example .env
# fill in `PUBLIC_*` env values
npm run dev
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist` |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run `astro check` + `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint auto-fix (src only) |
| `npm run format` | Prettier write (src only) |
| `npm run ci` | Full check: typecheck + lint + format |

## Environment Variables

Copy `.env.example` to `.env`. All variables are prefixed `PUBLIC_` and available in both server and client code.

| Variable | Description |
|---|---|
| `PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://example.com`) |
| `PUBLIC_FORMSPREE_ENDPOINT` | Form URL for the contact form (Formspree endpoint) |
| `PUBLIC_YOUTUBE_URL` | Video channel URL (e.g. YouTube channel) |
| `PUBLIC_STEAM_URL` | Store page URL |
| `PUBLIC_DONATE_URL` | Donation link |
| `PUBLIC_CAREERS_FORM_URL` | Careers / jobs application form URL |
| `PUBLIC_CONTACT_EMAIL` | Main contact email |
| `PUBLIC_CONTACT_SOCIAL_EMAIL` | Social / press contact email |

## Deployment (GitHub Pages)

This project is deployed via GitHub Actions to GitHub Pages on pushes to `main` (see `.github/workflows/deploy.yml`).

Set repository secrets with the following names (they are passed to the build as `PUBLIC_*` env vars):

- `PUBLIC_SITE_URL`
- `PUBLIC_FORMSPREE_ENDPOINT`
- `PUBLIC_YOUTUBE_URL`
- `PUBLIC_STEAM_URL`
- `PUBLIC_DONATE_URL`
- `PUBLIC_CAREERS_FORM_URL`
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_CONTACT_SOCIAL_EMAIL`

## Project Structure

```
src/
├── components/
│   ├── common/      # Primitives: AnimatedBackground, ErrorBoundary, SkeletonCard
│   ├── features/    # Interactive islands: ContactForm, NewsCarousel, NewsModal, ProjectsCarousel
│   ├── layout/      # Navbar, Footer
│   └── sections/    # Static Astro sections: Hero, About, Careers, Contact, Donate, Partners
├── config/          # Design tokens, URLs, constants — all re-exported from index.ts
├── content/         # Astro content collections: news, projects (JSON)
├── hooks/           # React hooks: useCarouselKeyboard, useLanguageSync, useReducedMotion
├── i18n/            # translations.ts — all UI copy for supported languages
├── layouts/         # Layout.astro — root HTML shell
├── pages/           # [lang]/index.astro, [lang]/rss.xml.ts, index.astro (redirect), 404.astro
├── styles/          # global.css imports tokens, base, typography, buttons, components, animations, skeleton
├── types.ts         # Shared TypeScript types
└── utils/           # images.ts — path helpers and broken-image fallbacks
```

## Adding Content

### News post

Create `src/content/news/NN.json`:

```json
{
  "isoDate": "YYYY-MM-DD",
  "image": "/images/news/filename.jpg",
  "type": "announcement",
  "en": {
    "title": "Title",
    "date": "Jun 01, 2025",
    "summary": "Short preview text.",
    "body": "Full article.\n\nSeparate paragraphs with a blank line."
  },
  "ru": { "title": "...", "date": "...", "summary": "...", "body": "..." }
}
```

Valid `type` values: `announcement` · `dev-diary` · `update`

### Project

Create `src/content/projects/NN.json`:

```json
{
  "id": 3,
  "image": "/images/projects/filename.jpg",
  "progress": 10,
  "wishlistUrl": "https://store.steampowered.com/app/...",
  "en": {
    "title": "Game Title",
    "description": "Short description.",
    "price": "In Development",
    "tags": ["Co-op", "Shooter"]
  },
  "ru": { "title": "...", "description": "...", "price": "...", "tags": ["..."] }
}
```

`progress` (0–100) and `wishlistUrl` are optional. Projects are sorted by `id`.

## Configuration

All config is exported from `src/config/index.ts`.

| File | What it controls |
|---|---|
| `constants.ts` | Brand info (`BRAND`), carousel timings, swipe threshold, scroll/reveal, ripple, validation regex, small UI strings (`UI`) |
| `design.ts` | Colors, layout dimensions, spacing, gradients, image filters, easing, component sizes, z-index |
| `donate.ts` | SVG icons for donation tier cards |
| `fonts.ts` | Google Fonts stylesheet URL |
| `i18n.ts` | `LANGUAGE_STORAGE_KEY`, `SUPPORTED_LANGUAGES` |
| `images.ts` | Fallback image dimensions, hero preload path, static image paths |
| `links.ts` | Env-backed URLs, Formspree endpoint, social links (SVG-based), `isMailtoLink` |
| `news.ts` | Category order, labels per language, category colors |
| `partners.ts` | Partner data and types |
| `seo.ts` | Default meta title/description, OG image dimensions, JSON-LD game list |

## Translations

All UI strings live in `src/i18n/translations.ts`.
Supported languages are defined in `src/config/i18n.ts` and in `astro.config.mjs`.
For every supported language, the translation object must have the same key shapes — TypeScript enforces this via `TranslationStructure`.

## Styling

CSS is split into focused files imported via `src/styles/global.css`. Always use design tokens instead of raw values:

```css
color: var(--c-orange);
background: var(--s-2);
border: 1px solid var(--b-default);
```

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for full architecture reference.
