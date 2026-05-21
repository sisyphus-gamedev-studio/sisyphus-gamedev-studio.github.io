import type { Language, NewsCategory } from "../types";

export const NEWS_CATEGORY_ORDER: NewsCategory[] = ["announcement", "dev-diary", "update"];

const categoryLabels: Record<NewsCategory, Record<Language, string>> = {
  announcement: { en: "Announcement", ru: "Анонс" },
  "dev-diary": { en: "Dev Diary", ru: "Дневник разработки" },
  update: { en: "Update", ru: "Обновление" },
};

export const getNewsCategories = (): NewsCategory[] => NEWS_CATEGORY_ORDER;

export const getCategoryLabel = (category: NewsCategory, lang: Language): string =>
  categoryLabels[category][lang];
