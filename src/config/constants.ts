export const TRANSITIONS = {
  default: ".3s cubic-bezier(0.2,0,0,1)",
  fast: ".2s cubic-bezier(0.2,0,0,1)",
  slow: ".65s cubic-bezier(0.2,0,0,1)",
  smooth: ".25s cubic-bezier(0.2,0,0,1)",
} as const;

export const INTERSECTION_OBSERVER = {
  navbar: {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  },
} as const;

interface BrandConfig {
  prefix: string;
  suffix: string;
  short: string;
  foundedYear: number;
  teamSize: number;
}

export const BRAND = {
  prefix: "Sisyphus",
  suffix: "Studio",
  short: "SS",
  foundedYear: 2025,
  teamSize: 4,
} satisfies BrandConfig;

export const NEWS_CAROUSEL = {
  AUTO_INTERVAL: 5500,
  RESUME_DELAY: 20000,
} as const;

export const NEWS_SUMMARY_PREVIEW_CHARS = 72;

export const PROJECTS_EXPAND_MS = 580;
export const PROJECTS_CONTENT_REVEAL_RATIO = 0.38;

export const SWIPE_THRESHOLD = 40;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const UI = {
  skipLink: {
    en: "Skip to content",
    ru: "Перейти к содержимому",
  },
  noScript: {
    en: "JavaScript is required for the full site experience.",
    ru: "Для полноценной работы сайта необходим JavaScript.",
  },
  hero: {
    stats: {
      independent: "100%",
    },
    badges: {
      inDev: { en: "In Development", ru: "В разработке" },
      comingSoon: { en: "Coming Soon", ru: "Скоро" },
    },
  },
  about: {
    independent: { en: "Indie", ru: "Инди" },
  },
} as const;
