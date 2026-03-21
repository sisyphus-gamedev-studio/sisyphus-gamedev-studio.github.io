# Sisyphus Studio

Website for an independent game studio.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `./dist` |
| `npm run preview` | Preview production build |
| `npm run ci` | Full check: typecheck + lint + format |

## Environment Variables

Copy `.env.example` to `.env` and fill in your values. All variables are prefixed `PUBLIC_` and available in both server and client code.

## Project Structure

```
src/
├── components/      # UI components (common, features, layout, sections)
├── config/          # Constants, design tokens, links, SEO
├── content/         # News and project JSON files
├── hooks/           # React hooks
├── i18n/            # Translations
├── layouts/         # Root HTML layout
├── pages/           # Routes
├── styles/          # CSS
├── types.ts         # Shared TypeScript types
└── utils/           # Helper functions
```

## Adding Content

### News post

Create a new JSON file in `src/content/news/`:

```json
{
  "isoDate": "YYYY-MM-DD",
  "image": "/images/news/filename.jpg",
  "type": "announcement",
  "en": {
    "title": "Title",
    "date": "Jun 01, 2025",
    "summary": "Short preview text.",
    "body": "Full article text.\n\nSeparate paragraphs with a blank line."
  },
  "ru": { ... }
}
```

Valid `type` values: `announcement` · `dev-diary` · `update`

### Project

Create a new JSON file in `src/content/projects/`:

```json
{
  "id": 1,
  "image": "/images/projects/filename.jpg",
  "progress": 50,
  "wishlistUrl": "https://...",
  "en": {
    "title": "Game Title",
    "description": "Short description.",
    "price": "In Development",
    "tags": ["Co-op", "Shooter"]
  },
  "ru": { ... }
}
```

`progress` (0–100) and `wishlistUrl` are optional.

## Configuration

All settings live in `src/config/`:

| File | What it controls |
|---|---|
| `constants.ts` | Brand info, animation timings, carousel settings |
| `design.ts` | Colors, layout dimensions, spacing, gradients |
| `links.ts` | External URLs, contact email, social links |
| `seo.ts` | Meta tags, OG image, structured data |

## Translations

All UI strings are in `src/i18n/translations.ts`. Both `en` and `ru` objects must always have identical key shapes.

## Styling

CSS is split into focused files imported via `src/styles/global.css`. Always use CSS variables instead of raw values:

```css
/* wrong */
color: #f87e0f;

/* right */
color: var(--c-orange);
```

## Developer Guide

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for full architecture reference.
