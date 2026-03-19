# Sisyphus Studio

Сайт независимой игровой студии на Astro 5 + React 19 + Tailwind CSS.

## Быстрый старт

```bash
npm install
npm run dev       # http://localhost:4321
```

## Команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка в ./dist
npm run preview      # Превью сборки
npm run ci           # Проверка кода (typecheck + lint + format)
```

## Структура

```
src/
├── components/
│   ├── common/          # AnimatedBackground, DisciplineIcon, ErrorBoundary
│   ├── features/        # ContactForm, NewsCarousel, ProjectsCarousel
│   ├── layout/          # Navbar, Footer
│   └── sections/        # Hero, About, Contact, Donate
├── config/              # Все константы и настройки
├── content/             # Новости и проекты (JSON)
├── i18n/                # Переводы (en/ru)
├── styles/              # CSS (tokens, animations, components)
└── utils/               # Вспомогательные функции
```

## Добавление контента

### Новость

Создай `src/content/news/05.json`:

```json
{
  "isoDate": "2025-06-01",
  "image": "/images/news/news-5.jpg",
  "type": "announcement",
  "en": {
    "title": "Title",
    "date": "Jun 01, 2025",
    "summary": "Short text...",
    "body": "Full text.\n\nSecond paragraph."
  },
  "ru": {
    "title": "Заголовок",
    "date": "01 Июн, 2025",
    "summary": "Краткий текст...",
    "body": "Полный текст.\n\nВторой абзац."
  }
}
```

Типы: `announcement`, `dev-diary`, `update`

### Проект

Создай `src/content/projects/03.json`:

```json
{
  "id": 3,
  "image": "/images/projects/project-3.jpg",
  "progress": 25,
  "wishlistUrl": "https://store.steampowered.com/app/...",
  "en": {
    "title": "Game Title",
    "description": "Description...",
    "price": "In Development",
    "tags": ["Co-op", "Shooter"]
  },
  "ru": {
    "title": "Название",
    "description": "Описание...",
    "price": "В разработке",
    "tags": ["Кооп", "Шутер"]
  }
}
```

## Настройка

### Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```env
PUBLIC_SITE_URL=https://sisyphus.studio
PUBLIC_STEAM_URL=https://store.steampowered.com/app/YOUR_APP_ID
PUBLIC_YOUTUBE_URL=https://www.youtube.com/@YourChannel
PUBLIC_DONATE_URL=https://your-donation-link.com
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
```

### Конфигурация

Все настройки в `src/config/`:
- `constants.ts` — анимации, бренд, UI
- `design.ts` — цвета, размеры, отступы
- `links.ts` — ссылки, соцсети, контакты
- `seo.ts` — SEO и meta теги

### Переводы

Все тексты в `src/i18n/translations.ts` (en/ru)

### CSS переменные

Все цвета в `src/styles/tokens.css`:

```css
--c-orange: #f87e0f;
--c-orange-light: #ff9d5c;
--c-orange-accent: #ffb86b;
--s-1 до --s-5: фоновые поверхности
--c-tertiary, --c-secondary: текстовые цвета
```

## Особенности

- **Анимированный фон** — полноэкранная сетка с плавной анимацией
- **Двуязычность** — en/ru с синхронизацией в localStorage
- **Адаптивность** — desktop/mobile версии компонентов
- **Доступность** — ARIA-метки, keyboard navigation
- **Производительность** — lazy loading, оптимизация изображений

## Документация

Подробнее в [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
