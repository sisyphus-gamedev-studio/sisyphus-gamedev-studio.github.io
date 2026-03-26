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
    cta: string;
    ctaSecondary: string;
    badge: string;
    stats: { titles: string; founded: string; independent: string };
    featuredSub: string;
    progressLabel: string;
    conceptSub: string;
    scroll: string;
    comingSoon: string;
    inDevLabel: string;
  };
  projects: {
    heading: string;
    headingSuffix: string;
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
    headingSuffix: string;
    sectionLabel: string;
    description: string;
    foundedLabel: string;
    indieLabel: string;
    stats: {
      team: string;
      titles: string;
      founded: string;
      enthusiasm: string;
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
    formCardLabel: string;
    formCardTitle: string;
    formCardDesc: string;
    checkItemsLabel: string;
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
      partner: string;
    };
    linkLabels: {
      website: string;
      steam: string;
      twitter: string;
      github: string;
    };
  };
  news: {
    heading: string;
    headingSuffix: string;
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
    headingSuffix: string;
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
    sectionLabel: string;
    copyright: string;
    cta: {
      title: string;
      titleSuffix: string;
      description: string;
      sectionLabel: string;
      note: string;
      tiers: Array<{
        label: string;
        title: string;
        description: string;
        cta: string;
      }>;
    };
    backToTop: string;
  };
  notFound: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
}
