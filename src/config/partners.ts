import { SPONSOR_CATEGORY_STYLES, toAccentInlineStyle, type AccentKey } from "./accents";

export type PartnerLogoStyle = AccentKey;
export type PartnerCategory = keyof typeof SPONSOR_CATEGORY_STYLES;

export const PARTNER_LOGO_STYLES: Record<PartnerLogoStyle, string> = {
  orange: toAccentInlineStyle("orange"),
  blue: toAccentInlineStyle("blue"),
  green: toAccentInlineStyle("green"),
  purple: toAccentInlineStyle("purple"),
};

export { SPONSOR_CATEGORY_STYLES as PARTNER_CATEGORY_STYLES };

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
