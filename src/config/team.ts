import type { PartnerLink } from "./partners";

export type TeamMemberAccent = "orange" | "blue" | "green" | "purple";

export const TEAM_MEMBER_ACCENT_STYLES: Record<TeamMemberAccent, string> = {
  orange:
    "background:var(--c-orange-dim);border:1px solid var(--c-orange-border);color:var(--c-orange)",
  blue: "background:rgba(100,140,255,.10);border:1px solid rgba(100,140,255,.20);color:#7c9ef8",
  green: "background:rgba(100,200,100,.09);border:1px solid rgba(100,200,100,.20);color:#7ec87e",
  purple: "background:rgba(160,100,255,.09);border:1px solid rgba(160,100,255,.20);color:#b87ef8",
} as const;

export type TeamSideProject =
  | { type: "partner"; partnerId: string }
  | { type: "placeholder"; id?: string; accent?: TeamMemberAccent; logoInitials?: string }
  | {
      type: "custom";
      id: string;
      logoInitials: string;
      logoImage?: string;
      accent?: TeamMemberAccent;
      links?: PartnerLink;
      en: { name: string; description: string; badge?: string };
      ru: { name: string; description: string; badge?: string };
    };

export interface TeamMember {
  id: string;
  initials: string;
  accent: TeamMemberAccent;
  image?: string;
  sideProjects?: TeamSideProject[];
  en: { name: string; role: string; quote?: string };
  ru: { name: string; role: string; quote?: string };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "danya",
    initials: "ДН",
    accent: "orange",
    sideProjects: [{ type: "partner", partnerId: "darkmoonight" }],
    ru: {
      name: "Даня",
      role: "Сосоздатель студии. Старший UE5 разработчик. Net code. Оптимизация.",
      quote: "Сетевой код не прощает оптимизма — только профилировщик.",
    },
    en: {
      name: "Danya",
      role: "Studio co-founder. Senior UE5 developer. Netcode. Optimization.",
      quote: "Netcode doesn't forgive optimism — only the profiler.",
    },
  },
  {
    id: "vlad",
    initials: "ВЛ",
    accent: "blue",
    sideProjects: [{ type: "placeholder", id: "vlad-side-a", accent: "blue", logoInitials: "3D" }],
    ru: {
      name: "Влад",
      role: "Старший 3D дизайнер. Оружие, дизайнер локаций.",
      quote: "Деталь не в количестве — в том, чтобы каждая читалась в бою.",
    },
    en: {
      name: "Vlad",
      role: "Senior 3D designer. Weapons and level design.",
      quote: "A detail isn't about quantity — it's that every one reads in combat.",
    },
  },
  {
    id: "misha",
    initials: "МШ",
    accent: "green",
    sideProjects: [{ type: "placeholder", id: "misha-side-a", accent: "green", logoInitials: "···" }],
    ru: {
      name: "Миша",
      role: "Сосоздатель студии. Креативный директор. Игровой продюсер. Менеджер HR.",
      quote: "Хороший питч укладывается в один экран — как хороший уровень.",
    },
    en: {
      name: "Misha",
      role: "Studio co-founder. Creative director. Game producer. HR manager.",
      quote: "A good pitch fits on one screen — like a good level.",
    },
  },
  {
    id: "zhenya",
    initials: "ЖН",
    accent: "purple",
    sideProjects: [{ type: "placeholder", id: "zhenya-side-a", accent: "purple", logoInitials: "UE" }],
    ru: {
      name: "Женя",
      role: "Младший UE5 разработчик.",
      quote: "Каждый закрытый тикет — ещё один метр вверх по склону.",
    },
    en: {
      name: "Zhenya",
      role: "Junior UE5 developer.",
      quote: "Every closed ticket is another meter up the slope.",
    },
  },
];
