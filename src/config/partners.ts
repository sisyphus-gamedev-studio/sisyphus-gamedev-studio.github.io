import type { AccentKey, SponsorCategory } from "./accents";

export type PartnerLogoStyle = AccentKey;
export type PartnerCategory = SponsorCategory;

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
