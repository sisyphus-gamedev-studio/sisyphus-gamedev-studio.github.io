import type { TranslationStructure } from "../types";

export const NAV_SECTION_IDS = [
  "home",
  "about",
  "team",
  "projects",
  "news",
  "careers",
  "donate",
  "contact",
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export interface NavLinkItem {
  id: NavSectionId;
  label: string;
  href: string;
}

export const buildNavLinks = (nav: TranslationStructure["nav"], base = ""): NavLinkItem[] =>
  NAV_SECTION_IDS.map((id) => ({
    id,
    label: nav[id],
    href: `${base}#${id}`,
  }));
