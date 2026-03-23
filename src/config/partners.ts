export type PartnerLogoStyle = "orange" | "blue" | "green" | "purple";
export type PartnerCategory = "strategic" | "audio" | "tech" | "media";

export const PARTNER_LOGO_STYLES: Record<PartnerLogoStyle, string> = {
  orange:
    "background:var(--c-orange-dim);border:1px solid var(--c-orange-border);color:var(--c-orange)",
  blue: "background:rgba(100,140,255,.10);border:1px solid rgba(100,140,255,.20);color:#7c9ef8",
  green: "background:rgba(100,200,100,.09);border:1px solid rgba(100,200,100,.20);color:#7ec87e",
  purple: "background:rgba(160,100,255,.09);border:1px solid rgba(160,100,255,.20);color:#b87ef8",
} as const;

export const PARTNER_CATEGORY_STYLES: Record<PartnerCategory, string> = {
  strategic:
    "background:var(--c-orange-dim);border-color:var(--c-orange-border);color:var(--c-orange-accent)",
  audio: "",
  tech: "",
  media: "",
} as const;

export interface PartnerLink {
  website?: string;
  steam?: string;
  twitter?: string;
  github?: string;
}

export interface Partner {
  id: string;
  logoInitials: string;
  logoStyle: PartnerLogoStyle;
  category: PartnerCategory;
  featured?: boolean;
  links: PartnerLink;
  en: { name: string; description: string };
  ru: { name: string; description: string };
}

export const PARTNERS: Partner[] = [
  {
    id: "dark-night",
    logoInitials: "DN",
    logoStyle: "orange",
    category: "strategic",
    featured: false,
    links: {
      website: "https://darknightstudio.com",
      steam: "https://store.steampowered.com",
      twitter: "https://twitter.com",
    },
    en: {
      name: "Dark Night",
      description:
        "Our closest creative ally — an independent studio with deep roots in narrative and atmospheric design. We share pipeline tools, asset libraries, and run cross-studio playtesting sessions.",
    },
    ru: {
      name: "Dark Night",
      description:
        "Наш ближайший творческий союзник — независимая студия с глубокими корнями в нарративном дизайне. Делимся инструментами пайплайна, библиотеками ассетов и проводим совместные плейтесты.",
    },
  },
];
