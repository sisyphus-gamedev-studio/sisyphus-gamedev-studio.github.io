export type Language = "en" | "ru";

export type NewsCategory = "announcement" | "dev-diary" | "update";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TranslationStructure {
  nav: {
    home: string;
    about: string;
    projects: string;
    news: string;
    partners: string;
    team: string;
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
    learnMore: string;
    prevGame: string;
    nextGame: string;
    swipeHint: string;
    progressLabel: string;
  };
  about: {
    heading: string;
    headingSuffix: string;
    sectionLabel: string;
    descriptionParagraphs: [string, string, string];
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
    pillarsLabel: string;
    pillars: { title: string; text: string }[];
    statusLabel: string;
    statusSub: string;
  };
  team: {
    sectionLabel: string;
    heading: string;
    headingSuffix: string;
    description: string;
    quoteLabel: string;
    expandSideProject: string;
    collapseSideProject: string;
    sideProjectsLabel: string;
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
    stackTitle: string;
    vacanciesTitle: string;
    vacancies: Array<{ title: string; type: string }>;
    faq: {
      triggerLabel: string;
      title: string;
      subtitle: string;
      closeLabel: string;
      items: FAQItem[];
    };
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
      youtube: string;
      vk: string;
      artstation: string;
    };
  };
  news: {
    heading: string;
    headingSuffix: string;
    sectionLabel: string;
    readMore: string;
    closeArticle: string;
    paused: string;
    swipeHint: string;
    allCategories: string;
    noNews: string;
  };
  donate: {
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
      comingSoon?: boolean;
    }>;
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
    backToTop: string;
  };
  notFound: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
  };
}
