export type PartnerLogoStyle = "orange" | "blue" | "green" | "purple";
export type PartnerCategory = "gold" | "silver" | "bronze" | "partner";

export const PARTNER_LOGO_STYLES: Record<PartnerLogoStyle, string> = {
  orange:
    "background:var(--c-orange-dim);border:1px solid var(--c-orange-border);color:var(--c-orange)",
  blue: "background:rgba(100,140,255,.10);border:1px solid rgba(100,140,255,.20);color:#7c9ef8",
  green: "background:rgba(100,200,100,.09);border:1px solid rgba(100,200,100,.20);color:#7ec87e",
  purple: "background:rgba(160,100,255,.09);border:1px solid rgba(160,100,255,.20);color:#b87ef8",
} as const;

export const PARTNER_CATEGORY_STYLES: Record<PartnerCategory, string> = {
  gold: "background:var(--c-orange-dim);border-color:var(--c-orange-border);color:var(--c-orange-accent)",
  silver: "background:rgba(180,180,200,.10);border-color:rgba(180,180,200,.20);color:#b0b8cc",
  bronze: "background:rgba(180,120,80,.10);border-color:rgba(180,120,80,.20);color:#c8906a",
  partner: "background:rgba(100,200,100,.09);border-color:rgba(100,200,100,.20);color:#7ec87e",
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
  logoImage?: string;
  logoStyle: PartnerLogoStyle;
  category: PartnerCategory;
  featured?: boolean;
  links: PartnerLink;
  en: { name: string; description: string };
  ru: { name: string; description: string };
}

export const PARTNERS: Partner[] = [
  {
    id: "darkmoonight",
    logoInitials: "DM",
    logoImage: "/images/partners/darknight.png",
    logoStyle: "green",
    category: "partner",
    featured: false,
    links: {
      github: "https://github.com/darkmoonight",
    },
    en: {
      name: "DARK NIGHT",
      description:
        "Open-source developer and contributor. A partner who supports our studio and shares our passion for building great things.",
    },
    ru: {
      name: "DARK NIGHT",
      description:
        "Разработчик открытого программного обеспечения и контрибьютор. Партнёр, который поддерживает нашу студию и разделяет страсть к созданию крутых вещей.",
    },
  },
  {
    id: "placeholder",
    logoInitials: "SP",
    logoStyle: "orange",
    category: "gold",
    featured: false,
    links: {
      website: "#",
    },
    en: {
      name: "Your Company",
      description:
        "Become our title sponsor and get your brand in front of our growing community. Your logo, name, and link featured prominently across the studio.",
    },
    ru: {
      name: "Ваша компания",
      description:
        "Станьте нашим титульным спонсором и представьте свой бренд нашей растущей аудитории. Ваш логотип, название и ссылка будут размещены на видном месте.",
    },
  },
];
