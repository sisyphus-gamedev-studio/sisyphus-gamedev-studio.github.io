# Sisyphus Studio

Website for an independent game studio. Built with Astro 5, React 19, TypeScript, and Tailwind CSS. Supports English and Russian.

## Quick Start

```bash
npm install
cp .env.example .env
# fill in .env values
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
| `npm run format` | Prettier write |
| `npm run ci` | Full check: typecheck + lint + format |

## Environment Variables

Copy `.env.example` to `.env`. All variables are prefixed `PUBLIC_` and available in both server and client code.

| Variable | Description |
|---|---|
| `PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://sisyphus.studio`) |
| `PUBLIC_FORMSPREE_ENDPOINT` | Formspree form URL for the contact form |
| `PUBLIC_YOUTUBE_URL` | YouTube channel URL |
| `PUBLIC_STEAM_URL` | Steam store page URL |
| `PUBLIC_DONATE_URL` | Donation link |
| `PUBLIC_CAREERS_FORM_URL` | Careers application form URL |
| `PUBLIC_CONTACT_EMAIL` | Main contact / careers email |
| `PUBLIC_CONTACT_SOCIAL_EMAIL` | Social / press contact email |

## Project Structure

```
src/
├── components/
│   ├── common/      # Primitives: AnimatedBackground, DisciplineIcon, ErrorBoundary, SkeletonCard
│   ├── features/    # Interactive islands: ContactForm, NewsCarousel, NewsModal, ProjectsCarousel
│   ├── layout/      # Navbar, Footer
│   └── sections/    # Static Astro sections: Hero, About, Projects, News, Partners, Careers, Contact, Donate
├── config/          # Design tokens, URLs, constants — all re-exported from index.ts
├── content/         # Astro content collections: news, projects (JSON)
├── hooks/           # React hooks: useCarouselKeyboard, useLanguageSync, useReducedMotion
├── i18n/            # translations.ts — all UI copy for EN and RU
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
| `constants.ts` | Brand info, carousel timings, swipe threshold, scroll/reveal, ripple, validation regex, small UI strings |
| `design.ts` | Colors, layout dimensions, spacing, gradients, image filters, component sizes |
| `donate.ts` | SVG icons for donation tier cards |
| `fonts.ts` | Google Fonts stylesheet URL |
| `i18n.ts` | `LANGUAGE_STORAGE_KEY`, `SUPPORTED_LANGUAGES` |
| `images.ts` | Fallback image dimensions, hero preload path, static image paths (`IMAGES`) |
| `links.ts` | Env-backed URLs, Formspree endpoint, social links (all SVG-based), `isMailtoLink` |
| `news.ts` | Category order, labels per language, category colors |
| `partners.ts` | Partner data and types |
| `seo.ts` | Default meta title/description, OG image dimensions, JSON-LD game list |

## Translations

All UI strings live in `src/i18n/translations.ts`. Both `en` and `ru` must always have identical key shapes — TypeScript enforces this via `TranslationStructure`.

## Styling

CSS is split into focused files imported via `src/styles/global.css`. Always use design tokens instead of raw values:

```css
color: var(--c-orange);
background: var(--s-2);
border: 1px solid var(--b-default);
```

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for full architecture reference.
