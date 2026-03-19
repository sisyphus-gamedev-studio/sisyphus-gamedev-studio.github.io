# Руководство разработчика — Sisyphus Studio

## `/src/components/` — Компоненты

### `common/` — Переиспользуемые
- **`DisciplineIcon.astro`** — иконки дисциплин (engineering, art, sound, design) для секции About
- **`ErrorBoundary.tsx`** — React error boundary для обработки ошибок рендера
- **`SkeletonCard.tsx`** — скелетон-загрузчик для карточек новостей

### `features/` — Функциональные
- **`ContactForm.tsx`** — форма обратной связи с валидацией и отправкой на Formspree
- **`NewsCarousel.tsx`** — карусель новостей с автопрокруткой, фильтрацией по категориям и свайпами
- **`NewsModal.tsx`** — модальное окно для полного текста новости
- **`ProjectsCarousel/`** — карусель проектов
  - `index.tsx` — логика переключения desktop/mobile
  - `DesktopCarousel.tsx` — раскрывающиеся панели
  - `MobileCarousel.tsx` — свайп-версия
  - `tagIcons.ts` — маппинг ключевых слов тегов на иконки Lucide (en + ru)

### `layout/` — Макет
- **`Navbar.tsx`** — навигация с мобильным меню, переключателем языка и соцсетями
  - Sticky позиционирование с прозрачностью при скролле
  - Мобильное меню с анимацией (hamburger → close)
  - Переключатель языка (en/ru) с синхронизацией в localStorage
  - Ссылки на соцсети (YouTube, Email)
  - Accessibility: aria-labels, focus management, keyboard navigation
- **`Footer.tsx`** — футер с навигацией и копирайтом
  - Навигационные ссылки (About, Projects, News, Contact)
  - Кнопка "Back to top" с плавной прокруткой
  - Копирайт с динамическим годом
  - Адаптивная сетка для desktop/mobile

### `sections/` — Секции страницы
- **`Hero.astro`** — главная секция с заголовком, статистикой и карточками проектов
- **`About.astro`** — секция "О студии" с командой и дисциплинами
- **`Donate.astro`** — секция поддержки/пожертвований (перед Contact)
- **`Contact.astro`** — секция контактов с формой и соцсетями

---

## `/src/config/` — Конфигурация

Все константы проекта. Импортируй из `src/config` (централизованный `index.ts`).

- **`constants.ts`**
  - `TRANSITIONS` — настройки анимаций
  - `INTERSECTION_OBSERVER` — настройки для navbar
  - `BRAND` — название, год основания, размер команды
  - `NEWS_CAROUSEL`, `PROJECTS_*` — настройки каруселей
  - `SWIPE_THRESHOLD` — порог свайпа
  - `EMAIL_REGEX`, `FOCUSABLE_SELECTORS` — валидация и доступность
  - `UI` — строки skip link, noscript, badges

- **`design.ts`**
  - `COLORS` — цветовая палитра (включая цвета категорий новостей)
  - `LAYOUT` — maxWidth, padding, navHeight
  - `SPACING` — отступы компонентов (`sectionPadding`, `sectionPaddingMobile`, `cardPadding`)
  - `SIZES` — размеры карточек, модала, hero
  - `TAG_STYLE` — базовые стили тегов жанров (`base`, `desktop`, `mobile`)

- **`links.ts`**
  - `URLS` — внешние URL (site, steam, youtube, donate)
  - `CONTACT` — email, formspree endpoint
  - `SOCIAL_LINKS` — ссылки на соцсети с иконками
  - `SOCIAL_ICONS` — SVG иконки (youtube, email)

- **`seo.ts`** — meta теги, Open Graph, Schema.org данные

---

## `/src/content/` — Контент (Astro Content Collections)

- **`config.ts`** — схемы коллекций (news, projects)
- **`news/`** — JSON файлы новостей
  - Структура: `{ isoDate, image, type, en: {...}, ru: {...} }`
  - Типы: `announcement`, `dev-diary`, `update`
- **`projects/`** — JSON файлы проектов
  - Структура: `{ id, image, progress?, wishlistUrl?, en: { title, description, price, tags? }, ru: {...} }`
  - `tags` — опциональный массив строк; иконки подбираются автоматически по `tagIcons.ts`

---

## `/src/hooks/` — React хуки

- **`useCarouselKeyboard.ts`** — навигация по карусели с клавиатуры (стрелки, Home, End)
- **`useLanguagePreference.ts`** — синхронизация языка в localStorage (`useLanguageSync`)
- **`useReducedMotion.ts`** — определение `prefers-reduced-motion`

---

## `/src/i18n/` — Интернационализация

- **`translations.ts`** — все переводы интерфейса (en, ru)
  - Разделы: `nav`, `hero`, `projects`, `about`, `news`, `contact`, `footer`, `notFound`, `meta`
  - `footer.cta` — тексты секции Donate (title, description, actionText, sectionLabel)
  - `footer.backToTop` — подпись кнопки "наверх"
  - `nav.toggleNav`, `nav.navMenu` — aria-label для мобильного меню
  - `news.allCategories` — метка фильтра "Все"

---

## `/src/utils/` — Утилиты

- **`helpers.ts`** — `isMailtoLink(href)` — проверка mailto ссылок
- **`images.ts`** — `getHeroImage`, `handleImageError`, `nativeImageFallback` — обработка изображений
- **`interactiveGrid.ts`** — `initInteractiveGrid(section)` — анимация фоновой сетки с плавным дрейфом слоев
  - Автоматически отключается при `prefers-reduced-motion`
  - Использует requestAnimationFrame для плавной анимации
  - Применяется к элементам с классом `.grid-layer`
- **`news.ts`** — `getNewsCategories`, `getCategoryLabel`, `getCategoryColor` — работа с категориями новостей

---

## `/src/styles/` — Стили

- **`tokens.css`** — CSS переменные (`--c-orange`, `--s-1..5`, `--b-*`, `--r-*`, `--c-tertiary`, etc.)
- **`global.css`** — точка входа (импортирует все остальные)
- **`base.css`** — reset, scrollbar
- **`typography.css`** — классы `t-*`
- **`buttons.css`** — `btn-*`, `icon-btn-*`
- **`components.css`** — карточки, бейджи, прогресс-бары, nav-desktop-link
- **`animations.css`** — keyframes и reveal анимации
- **`skeleton.css`** — скелетон-загрузчики

---

## Порядок секций на странице

```
Navbar (fixed)
├── Hero          — background: var(--s-4)
├── Projects      — background: var(--s-2)
├── About         — background: var(--s-4)
├── News          — background: var(--s-2)
├── Donate        — background: var(--s-4)
├── Contact       — background: var(--s-2)
└── Footer        — background: var(--s-1)
```

---

## Как добавить новость

1. Создай `src/content/news/05.json`:
```json
{
  "isoDate": "2025-06-01",
  "image": "/images/news/news-5.jpg",
  "type": "announcement",
  "en": {
    "title": "New Feature Released",
    "date": "Jun 01, 2025",
    "summary": "Short description...",
    "body": "Full text.\n\nSecond paragraph."
  },
  "ru": {
    "title": "Новая функция",
    "date": "01 Июн, 2025",
    "summary": "Краткое описание...",
    "body": "Полный текст.\n\nВторой абзац."
  }
}
```
2. Добавь изображение в `public/images/news/`

---

## Как добавить проект

1. Создай `src/content/projects/03.json`:
```json
{
  "id": 3,
  "image": "/images/projects/project-3.jpg",
  "progress": 25,
  "wishlistUrl": "https://store.steampowered.com/app/...",
  "en": {
    "title": "Game Title",
    "description": "...",
    "price": "In Development",
    "tags": ["Co-op", "Shooter"]
  },
  "ru": {
    "title": "Название игры",
    "description": "...",
    "price": "В разработке",
    "tags": ["Кооп", "Шутер"]
  }
}
```
2. Добавь изображение в `public/images/projects/`
3. Чтобы добавить иконку для нового тега — расширь маппинг в `src/components/features/ProjectsCarousel/tagIcons.ts`

---

## Как изменить дизайн

**Цвета** — `src/config/design.ts` → `COLORS`  
**Размеры компонентов** — `src/config/design.ts` → `SIZES`  
**Анимации** — `src/config/constants.ts` → `TRANSITIONS`  
**CSS переменные** — `src/styles/tokens.css`

---

## Как изменить ссылки

**Внешние URL** — `.env`:
```env
PUBLIC_SITE_URL=https://sisyphus.studio
PUBLIC_STEAM_URL=https://store.steampowered.com/app/YOUR_APP_ID
PUBLIC_YOUTUBE_URL=https://www.youtube.com/@YourChannel
PUBLIC_DONATE_URL=https://your-donation-link.com
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
```

**Соцсети** — `src/config/links.ts` → `SOCIAL_LINKS`

---

## Как обновить информацию о студии

**Размер команды** — `src/config/constants.ts` → `BRAND.teamSize`  
**Контактный email** — `src/config/links.ts` → `CONTACT.email`  
**Тексты секции Donate** — `src/i18n/translations.ts` → `footer.cta`

---

## Команды

```bash
npm run dev          # dev сервер
npm run build        # сборка
npm run preview      # превью сборки
npm run typecheck    # проверка типов
npm run lint         # ESLint
npm run lint:fix     # автоисправление
npm run format       # Prettier
npm run ci           # полная проверка
```

---

## Важные замечания

- Импортируй константы из `src/config` — не хардкодь значения в компонентах
- Добавляй переводы сразу на оба языка (en и ru)
- Запускай `npm run ci` перед коммитом
- `BRAND.teamSize` обновляется вручную

---

## Полезные ссылки

- [Astro](https://docs.astro.build)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
