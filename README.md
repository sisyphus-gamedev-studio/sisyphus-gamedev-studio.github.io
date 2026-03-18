# Sisyphus Studio

Сайт независимой игровой студии. Astro 5 + React 19 + Tailwind CSS.

## Документация

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** — Подробное руководство разработчика

## Запуск

```bash
npm install
npm run dev       # localhost:4321
npm run build     # сборка в ./dist
npm run preview   # превью сборки
```

## Скрипты качества кода

```bash
npm run typecheck     # astro check + tsc --noEmit
npm run lint          # ESLint
npm run lint:fix      # ESLint с автоисправлением
npm run format        # Prettier
npm run format:check  # Проверка форматирования
npm run ci            # typecheck + lint + format:check
```

Pre-commit хук запускает `lint-staged` автоматически через Husky.

## Структура проекта

```
src/
├── components/
│   ├── common/
│   │   ├── DisciplineIcon.astro
│   │   ├── ErrorBoundary.tsx
│   │   └── SkeletonCard.tsx
│   ├── features/
│   │   ├── ProjectsCarousel/
│   │   │   ├── DesktopCarousel.tsx
│   │   │   ├── MobileCarousel.tsx
│   │   │   ├── tagIcons.ts
│   │   │   └── index.tsx
│   │   ├── ContactForm.tsx
│   │   ├── NewsCarousel.tsx
│   │   └── NewsModal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.astro
│       ├── About.astro
│       ├── Contact.astro
│       └── Donate.astro
├── config/
│   ├── constants.ts   — общие константы (анимации, бренд, карусели, валидация, UI)
│   ├── design.ts      — дизайн-система (цвета, размеры, отступы, стили тегов)
│   ├── links.ts       — ссылки, контакты, соцсети, иконки
│   ├── seo.ts         — SEO константы (meta, og, schema.org)
│   └── index.ts       — централизованный экспорт
├── content/
│   ├── config.ts      — схемы коллекций
│   ├── news/          — JSON файлы новостей
│   └── projects/      — JSON файлы проектов
├── hooks/
│   ├── useCarouselKeyboard.ts
│   ├── useLanguagePreference.ts
│   └── useReducedMotion.ts
├── i18n/
│   └── translations.ts  — строки интерфейса (en + ru)
├── layouts/
│   └── Layout.astro     — базовый layout с SEO
├── pages/
│   ├── [lang]/
│   │   ├── index.astro
│   │   └── rss.xml.ts
│   ├── 404.astro
│   └── index.astro
├── styles/
│   ├── animations.css   — keyframes, reveal анимации
│   ├── base.css         — reset, scrollbar
│   ├── buttons.css      — стили кнопок
│   ├── components.css   — карточки, бейджи
│   ├── skeleton.css     — loading состояния
│   ├── tokens.css       — CSS переменные
│   ├── typography.css   — типографика
│   └── global.css       — точка входа
├── utils/
│   ├── helpers.ts       — утилиты (isMailtoLink)
│   ├── images.ts        — обработка изображений
│   └── news.ts          — категории новостей
└── types.ts             — TypeScript типы
```

## Конфигурация

Все настройки централизованы в `src/config/`:

- `constants.ts` — общие константы (анимации, бренд, карусели, валидация, UI строки)
- `design.ts` — дизайн-система (цвета, размеры, layout)
- `links.ts` — все ссылки, контакты, соцсети, иконки
- `seo.ts` — SEO константы (meta теги, Open Graph, Schema.org)

Все переводы в `src/i18n/translations.ts`.

## Добавление новости

Создать файл `src/content/news/05.json`:

```json
{
  "isoDate": "2025-06-01",
  "image": "/images/news/news-5.jpg",
  "type": "announcement",
  "en": {
    "title": "...",
    "date": "Jun 01, 2025",
    "summary": "...",
    "body": "Paragraph one.\n\nParagraph two."
  },
  "ru": {
    "title": "...",
    "date": "01 Июн, 2025",
    "summary": "...",
    "body": "Абзац первый.\n\nАбзац второй."
  }
}
```

Доступные типы: `announcement`, `dev-diary`, `update`

## Добавление проекта

Создать файл `src/content/projects/03.json`:

```json
{
  "id": 3,
  "image": "/images/projects/project-3.jpg",
  "progress": 0,
  "wishlistUrl": "https://store.steampowered.com/app/...",
  "en": {
    "title": "...",
    "description": "...",
    "price": "In Development",
    "tags": ["Co-op", "Shooter"]
  },
  "ru": {
    "title": "...",
    "description": "...",
    "price": "В разработке",
    "tags": ["Кооп", "Шутер"]
  }
}
```

Поле `tags` опциональное. Иконки для тегов подбираются автоматически по ключевым словам в `src/components/features/ProjectsCarousel/tagIcons.ts`.

## Переменные окружения

Скопировать `.env.example` в `.env`:

```env
PUBLIC_SITE_URL=https://sisyphus.studio
PUBLIC_STEAM_URL=https://store.steampowered.com/app/YOUR_APP_ID
PUBLIC_YOUTUBE_URL=https://www.youtube.com/@YourChannel
PUBLIC_DONATE_URL=https://your-donation-link.com
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
```
