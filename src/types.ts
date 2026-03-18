export type Language = "en" | "ru";

export type NewsCategory = "announcement" | "dev-diary" | "update";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  tags?: string[];
  progress?: number;
  wishlistUrl?: string;
}

export interface NewsItem {
  isoDate: string;
  date: string;
  title: string;
  image: string;
  summary: string;
  body: string;
  type: NewsCategory;
}

export interface TranslationStructure {
  nav: {
    home: string;
    about: string;
    projects: string;
    news: string;
    contact: string;
    toggleNav: string;
    navMenu: string;
  };
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    badge: string;
    stats: { titles: string; founded: string; independent: string };
    featuredLabel: string;
    featuredSub: string;
    progressLabel: string;
    conceptLabel: string;
    conceptSub: string;
    scroll: string;
    comingSoon: string;
    inDevLabel: string;
  };
  projects: {
    heading: string;
    sectionLabel: string;
    of: string;
    wishlist: string;
    prevGame: string;
    nextGame: string;
    swipeHint: string;
  };
  about: {
    heading: string;
    sectionLabel: string;
    description: string;
    foundedLabel: string;
    indieLabel: string;
    craftLabel: string;
    disciplines: {
      engineering: string;
      art: string;
      sound: string;
      design: string;
    };
    stats: {
      team: string;
      titles: string;
      founded: string;
      independent: string;
    };
    missionLabel: string;
    missionQuote: string;
    statusLabel: string;
    statusSub: string;
  };
  news: {
    heading: string;
    sectionLabel: string;
    readMore: string;
    of: string;
    updates: string;
    closeArticle: string;
    paused: string;
    swipeHint: string;
    allCategories: string;
  };
  contact: {
    heading: string;
    sectionLabel: string;
    description: string;
  };
  footer: {
    followUs: string;
    copyright: string;
    cta: {
      title: string;
      titleSuffix: string;
      description: string;
      sectionLabel: string;
      note: string;
      badge: string;
      tiers: Array<{
        label: string;
        title: string;
        description: string;
        cta: string;
      }>;
    };
    links: { about: string; games: string; news: string; contact: string };
    backToTop: string;
  };
  notFound: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
}
