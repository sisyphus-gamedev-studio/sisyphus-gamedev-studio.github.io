import { Gamepad2, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const URLS = {
  site: import.meta.env.PUBLIC_SITE_URL || "https://sisyphus.com",
  steam: import.meta.env.PUBLIC_STEAM_URL || "https://store.steampowered.com",
  youtube: import.meta.env.PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@SisyphusStudioDev",
  donate: import.meta.env.PUBLIC_DONATE_URL || "#",
} as const;

export const CONTACT = {
  email: "sisyphus.gamedev.studio@gmail.com",
  careerEmail: "sisyphus.gamedev.studio@gmail.com",
  formspreeEndpoint:
    import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID",
} as const;

export const SOCIAL_ICONS = {
  youtube: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
  email: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
} as const;

export interface SocialLink {
  icon?: LucideIcon;
  iconSvg?: string;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    iconSvg: SOCIAL_ICONS.youtube,
    href: URLS.youtube,
    label: "YouTube",
  },
  {
    icon: Gamepad2,
    href: URLS.steam,
    label: "Steam",
  },
  {
    icon: Mail,
    href: `mailto:${CONTACT.email}`,
    label: "Email",
  },
];
