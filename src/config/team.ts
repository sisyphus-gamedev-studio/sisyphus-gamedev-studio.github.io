import type { PartnerLink } from "./partners";
import type { AccentKey } from "./accents";

export type TeamMemberAccent = AccentKey;

export interface TeamSideProject {
  id: string;
  logoInitials: string;
  logoImage?: string;
  accent?: TeamMemberAccent;
  links?: PartnerLink;
  en: { name: string };
  ru: { name: string };
}

export interface TeamMember {
  id: string;
  initials: string;
  accent: TeamMemberAccent;
  image?: string;
  sideProjects?: TeamSideProject[];
  en: { name: string; role: string; quote?: string };
  ru: { name: string; role: string; quote?: string };
}

const sideProject = (
  project: Omit<TeamSideProject, "en" | "ru"> & { name: string },
): TeamSideProject => {
  const { name, ...rest } = project;
  return { ...rest, en: { name }, ru: { name } };
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "yoshi",
    initials: "YO",
    accent: "orange",
    image: "/images/team/yoshi.jpg",
    sideProjects: [
      sideProject({
        id: "darkmoonight",
        name: "DARK NIGHT",
        logoInitials: "DM",
        logoImage: "/images/team/project/darknight.png",
        accent: "green",
        links: {
          website: "https://darkmoonight.github.io/",
          github: "https://github.com/darkmoonight",
        },
      }),
      sideProject({
        id: "noctisalamandra",
        name: "Noctis Salamandra",
        logoInitials: "NS",
        logoImage: "/images/team/project/salamander.png",
        accent: "orange",
        links: { github: "https://github.com/noctisalamandra" },
      }),
    ],
    ru: {
      name: "Yoshi",
      role: "Сосоздатель студии. Старший UE5 разработчик. Net code. Оптимизация.",
      quote: "Меня заперли в подвале и заставляют работать, спасите.",
    },
    en: {
      name: "Yoshi",
      role: "Studio co-founder. Senior UE5 developer. Netcode. Optimization.",
      quote: "They locked me in the basement and make me work. Save me.",
    },
  },
  {
    id: "yakudzava",
    initials: "YA",
    accent: "green",
    image: "/images/team/yakudzava.jpg",
    sideProjects: [
      sideProject({
        id: "yakudzava-youtube",
        name: "Yakudzava",
        logoInitials: "YT",
        logoImage: "/images/team/project/yakudzavayoutube.jpg",
        accent: "green",
        links: { youtube: "https://www.youtube.com/@yakudzava" },
      }),
      sideProject({
        id: "yakudzava-vk",
        name: "Yakudzava Shop | League of Legends",
        logoInitials: "VK",
        logoImage: "/images/team/project/yakudzavashop.jpg",
        accent: "green",
        links: { vk: "https://vk.com/yakudzava_shop_lol" },
      }),
    ],
    ru: {
      name: "Yakudzava",
      role: "Сосоздатель студии. Креативный директор. Игровой продюсер. Менеджер HR.",
      quote: "Зачем менять мир, если можно создавать игры.",
    },
    en: {
      name: "Yakudzava",
      role: "Studio co-founder. Creative director. Game producer. HR manager.",
      quote: "Why change the world when you can make games.",
    },
  },
  {
    id: "vlad",
    initials: "ВЛ",
    accent: "blue",
    image: "/images/team/vlad.jpg",
    sideProjects: [
      sideProject({
        id: "vlad-artstation",
        name: "ArtStation",
        logoInitials: "VZ",
        logoImage: "/images/team/project/artstation.jpg",
        accent: "blue",
        links: { artstation: "https://www.artstation.com/vladislav_zemtsov" },
      }),
    ],
    ru: {
      name: "Влад Земцов",
      role: "Старший 3D дизайнер. Оружие, дизайнер локаций.",
      quote: "Люблю развиваться, делать красиво и иногда ничего не делать — для баланса.",
    },
    en: {
      name: "Vlad Zemtsov",
      role: "Senior 3D designer. Weapons and level design.",
      quote: "I love growing, making things beautiful, and sometimes doing nothing — for balance.",
    },
  },
  {
    id: "joneky",
    initials: "JO",
    accent: "purple",
    image: "/images/team/joneky.jpg",
    ru: {
      name: "Joneky",
      role: "Младший UE5 разработчик.",
      quote: "Выбивай сильнейших, слабые сами вылетят.",
    },
    en: {
      name: "Joneky",
      role: "Junior UE5 developer.",
      quote: "Knock out the strongest; the weak will drop out on their own.",
    },
  },
];
