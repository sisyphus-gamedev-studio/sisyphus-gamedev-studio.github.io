# Руководство разработчика

## Архитектура

### Компоненты

**common/** — переиспользуемые
- `AnimatedBackground.astro` — полноэкранный фон с анимацией
- `DisciplineIcon.astro` — иконки для секции About
- `ErrorBoundary.tsx` — обработка ошибок React
- `SkeletonCard.tsx` — загрузочные состояния

**features/** — функциональные
- `ContactForm.tsx` — форма с валидацией
- `NewsCarousel.tsx` — карусель новостей с фильтрами
- `NewsModal.tsx` — модальное окно новости
- `ProjectsCarousel/` — карусель проектов (desktop/mobile)

**layout/** — макет
- `Navbar.tsx` — навигация с меню и языком
- `Footer.tsx` — футер

**sections/** — секции страницы
- `Hero.astro` — главная секция
- `About.astro` — о студии
- `Donate.astro` — поддержка
- `Contact.astro` — контакты

### Конфигурация

Все константы в `src/config/`:

```typescript
// constants.ts
TRANSITIONS        // настройки анимаций
BRAND             // название, год, команда
NEWS_CAROUSEL     // настройки карусели
EMAIL_REGEX       // валидация

// design.ts
COLORS            // цветовая палитра
LAYOUT            // maxWidth, padding
SPACING           // отступы
SIZES             // размеры компонентов

// links.ts
URLS              // внешние ссылки
CONTACT           // email, formspree
SOCIAL_LINKS      // соцсети с иконками

// seo.ts
SEO               // meta теги, Open Graph
```

### Контент

**Content Collections** в `src/content/`:

```typescript
// news/
{
  isoDate: string;
  image: string;
  type: "announcement" | "dev-diary" | "update";
  en: { title, date, summary, body };
  ru: { title, date, summary, body };
}

// projects/
{
  id: number;
  image: string;
  progress?: number;
  wishlistUrl?: string;
  en: { title, description, price, tags? };
  ru: { title, description, price, tags? };
}
```

### Стили

**tokens.css** — все CSS переменные:
```css
--c-orange, --c-orange-light, --c-orange-accent
--s-1 до --s-5 (поверхности)
--c-tertiary, --c-secondary (текст)
--b-subtle, --b-default (границы)
--r-sm, --r-xl, --r-2xl (радиусы)
```

**Остальные файлы:**
- `base.css` — reset, scrollbar
- `typography.css` — классы `t-*`
- `buttons.css` — `btn-*`, `icon-btn-*`
- `components.css` — карточки, бейджи
- `animations.css` — keyframes, reveal

### Утилиты

```typescript
// helpers.ts
isMailtoLink(href)

// images.ts
getHeroImage(name)
handleImageError(e, width, height)
nativeImageFallback(width, height)

// news.ts
getNewsCategories()
getCategoryLabel(type, lang)
getCategoryColor(type)
```

### Хуки

```typescript
useCarouselKeyboard()      // навигация стрелками
useLanguagePreference()    // синхронизация языка
useReducedMotion()         // prefers-reduced-motion
```

## Работа с контентом

### Добавить новость

1. Создай `src/content/news/XX.json`
2. Добавь изображение в `public/images/news/`
3. Заполни оба языка (en/ru)

### Добавить проект

1. Создай `src/content/projects/XX.json`
2. Добавь изображение в `public/images/projects/`
3. Заполни оба языка (en/ru)
4. Для новых тегов обнови `tagIcons.ts`

### Изменить тексты

Все переводы в `src/i18n/translations.ts`:
```typescript
TRANSLATIONS = {
  en: { nav, hero, projects, about, news, contact, footer, notFound, meta },
  ru: { ... }
}
```

## Стилизация

### Использование цветов

❌ Плохо:
```css
color: #f87e0f;
background: #1a1a1a;
```

✅ Хорошо:
```css
color: var(--c-orange);
background: var(--s-4);
```

### Использование констант

❌ Плохо:
```typescript
const interval = 5000;
const maxWidth = 1280;
```

✅ Хорошо:
```typescript
import { NEWS_CAROUSEL, LAYOUT } from "@/config";
const interval = NEWS_CAROUSEL.AUTO_INTERVAL;
const maxWidth = LAYOUT.maxWidth;
```

## Анимированный фон

Реализован в `AnimatedBackground.astro`:
- Fixed position на всех страницах
- Два слоя сетки (32px и 128px)
- Анимация через requestAnimationFrame
- Отключается при `prefers-reduced-motion`
- Контент поверх фона (z-index: 1)

## Порядок секций

```
Navbar (fixed, прозрачный → полупрозрачный)
├── Hero          (прозрачный)
├── Projects      (--s-2)
├── About         (прозрачный)
├── News          (--s-2)
├── Donate        (прозрачный)
├── Contact       (--s-2)
└── Footer        (полупрозрачный с blur)
```

## Команды

```bash
npm run dev          # dev сервер
npm run build        # сборка
npm run preview      # превью

npm run typecheck    # проверка типов
npm run lint         # ESLint
npm run lint:fix     # автофикс
npm run format       # Prettier
npm run ci           # полная проверка
```

## Чеклист перед коммитом

- [ ] `npm run ci` проходит без ошибок
- [ ] Добавлены переводы на оба языка
- [ ] Использованы CSS переменные
- [ ] Использованы константы из config
- [ ] Добавлены aria-labels где нужно

## Полезные ссылки

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
