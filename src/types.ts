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
    partners: string;
    careers: string;
    donate: string;
    contact: string;
    toggleNav: string;
    navMenu: string;
  };
  meta: {
    title: string;
    description: string;
    rssTitle: string;
    rssDescription: string;
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
    progressLabel: string;
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
  careers: {
    sectionLabel: string;
    heading: string;
    headingSuffix: string;
    description: string;
    chips: string[];
    formCardLabel: string;
    formCardTitle: string;
    formCardDesc: string;
    checkItems: [string, string, string, string];
    formBtnLabel: string;
    statusLabel: string;
    vacanciesTitle: string;
    vacancies: Array<{ title: string; type: string }>;
  };
  partners: {
    sectionLabel: string;
    heading: string;
    headingSuffix: string;
    description: string;
    activeCount: string;
    categoryLabels: {
      gold: string;
      silver: string;
      bronze: string;
    };
    linkLabels: {
      website: string;
      steam: string;
      twitter: string;
      github: string;
    };
    becomeTitle: string;
    becomeSub: string;
    becomeBtnLabel: string;
    becomeSecondaryLabel: string;
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
    noNews: string;
  };
  contact: {
    heading: string;
    sectionLabel: string;
    description: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      required: string;
      invalidEmail: string;
    };
  };
  footer: {
    followUs: string;
    sectionLabel: string;
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
