export const EASING = {
  standard: "cubic-bezier(0.4,0,0.2,1)",
  decelerate: "cubic-bezier(0.2,0,0,1)",
  accelerate: "cubic-bezier(0.4,0,1,1)",
} as const;

export const IMAGE_FILTERS = {
  activeProject: "brightness(.85) saturate(.9)",
  inactiveProject: "brightness(.6) saturate(.7)",
  mobileProject: "brightness(.75) saturate(.85)",
  modal: "brightness(.65) saturate(.75)",
  heroMain: "brightness(.75) saturate(.85)",
  heroConcept: "brightness(.7) saturate(.75)",
} as const;

export const GRADIENTS = {
  cardOverlay: "linear-gradient(180deg,transparent 30%,rgba(17,17,17,.85) 100%)",
  cardOverlayStrong: "linear-gradient(180deg,transparent 30%,rgba(17,17,17,.98) 100%)",
  orangeTint: "linear-gradient(135deg,rgba(248,126,15,.07) 0%,transparent 55%)",
  newsCard:
    "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(21,21,21,.6) 40%, rgba(21,21,21,.97) 72%)",
} as const;

export const COLORS = {
  orange: "#f87e0f",
  orangeLight: "#ff9d5c",
  orangeAccent: "#ffb86b",
  orangeDim: "rgba(248,126,15,.1)",
  orangeBorder: "rgba(248,126,15,.2)",
  navBg: "rgba(13,13,13,0.92)",
  panelBg: "rgba(13,13,13,0.97)",
  error: "#f87272",
  surface: {
    s1: "#0d0d0d",
    s2: "#161616",
    s3: "#151515",
    s4: "#1a1a1a",
    s5: "#202020",
  },
  text: {
    primary: "#f0ece8",
    secondary: "#999",
    tertiary: "#737373",
    muted: "#555",
    dim: "#c8c4c0",
  },
  border: {
    subtle: "rgba(255,255,255,.06)",
    default: "rgba(255,255,255,.07)",
    strong: "rgba(255,255,255,.08)",
    medium: "rgba(255,255,255,.2)",
  },
  news: {
    announcement: "var(--c-orange)",
    devDiary: "#7c9ef8",
    update: "#7ec87e",
  },
} as const;

export const LAYOUT = {
  maxWidth: 1280,
  padding: 20,
  navHeight: 76,
  mobileBreakpoint: 768,
} as const;

export const SPACING = {
  sectionPadding: "100px 0",
  sectionPaddingMobile: "72px 0",
  cardPadding: {
    news: "clamp(14px,4vw,26px) clamp(14px,5vw,28px) clamp(16px,4vw,32px)",
    project: "32px 40px 36px",
  },
  navLinkMargin: 20,
} as const;

export const BACKDROP = {
  navScrolled: "blur(24px) saturate(1.6)",
  panel: "blur(24px)",
  footer: "blur(12px)",
  modal: "blur(6px)",
  modalClose: "blur(8px)",
  heroBadge: "blur(8px)",
} as const;

export const OVERLAY = {
  modalBg: "rgba(0,0,0,.72)",
  modalCloseBg: "rgba(0,0,0,.45)",
  modalCloseBorder: "rgba(255,255,255,.15)",
  tagBg: "rgba(255,255,255,.04)",
} as const;

export const TAG_STYLE = {
  base: {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: 5,
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.07)",
    borderRadius: 4,
  },
  desktop: { fontSize: 11, padding: "4px 10px" },
  mobile: { fontSize: 10, padding: "3px 8px" },
} as const;

export const SIZES = {
  newsCard: {
    height: "clamp(260px, 55vw, 480px)",
    titleSize: "clamp(16px,3.5vw,26px)",
    summarySize: "clamp(12px,2vw,15px)",
    maxSummaryWidth: 500,
  },
  modal: {
    maxWidth: 720,
    imageHeight: 240,
    titleSize: "clamp(22px,4vw,32px)",
    boxShadow: "0 32px 80px rgba(0,0,0,.8)",
  },
  hero: {
    cardHeight: 264,
    cardImageSize: 48,
    statNumSize: 42,
    featuredTitleSize: 26,
    conceptTitleSize: 14,
    paddingTop: 120,
    paddingBottom: 96,
  },
  projects: {
    desktopTitleSize: "clamp(32px,3.8vw,52px)",
    mobileTitleSize: 32,
    skeletonMinHeight: 768,
  },
  form: {
    inputFontSize: 13,
    textareaMinHeight: 120,
  },
  errorBoundary: {
    bodyFontSize: 14,
    subtitleFontSize: 12,
  },
  newsCarousel: {
    emptyStateMinHeight: 200,
  },
  nav: {
    brandFontSize: 16,
    linkFontSize: 15,
    chipFontSize: 11,
    chipLetterSpacing: 1,
    mobileLinkFontSize: 14,
    mobileLangFontSize: 12,
  },
} as const;

export const Z_INDEX = {
  nav: 50,
  modal: 200,
} as const;
