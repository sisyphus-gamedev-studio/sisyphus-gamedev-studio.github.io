export const IMAGE_FILTERS = {
  heroMain: "brightness(.75) saturate(.85)",
} as const;

export const COLORS = {
  orange: "#f87e0f",
  orangeDim: "rgba(248,126,15,.1)",
  orangeBorder: "rgba(248,126,15,.2)",
  navBg: "rgba(13,13,13,0.92)",
  panelBg: "rgba(13,13,13,0.97)",
  surface: {
    s3: "#151515",
    s4: "#1a1a1a",
    s5: "#202020",
  },
  text: {
    primary: "#f0ece8",
    tertiary: "#737373",
    muted: "#555",
  },
  border: {
    default: "rgba(255,255,255,.07)",
    strong: "rgba(255,255,255,.08)",
  },
} as const;

/** Keep in sync with CSS vars in styles/tokens.css (--layout-*). */
export const LAYOUT = {
  maxWidth: 1280,
  padding: 20,
  navHeight: 76,
  mobileBreakpoint: 768,
} as const;

export const BACKDROP = {
  navScrolled: "blur(24px) saturate(1.6)",
  panel: "blur(24px)",
  footer: "blur(12px)",
} as const;

export const SIZES = {
  hero: {
    cardHeight: 264,
    cardImageSize: 48,
    statNumSize: 42,
    paddingTop: 120,
    paddingBottom: 96,
  },
  form: {
    inputFontSize: 13,
    textareaMinHeight: 120,
  },
  errorBoundary: {
    bodyFontSize: 14,
    subtitleFontSize: 12,
  },
  nav: {
    brandFontSize: 16,
    linkFontSize: 15,
    chipFontSize: 11,
    chipLetterSpacing: 1,
    mobileLinkFontSize: 14,
    mobileLangFontSize: 12,
    burgerSize: 34,
    desktopDividerHeight: 16,
  },
  footer: {
    logoSize: 28,
    backToTopSize: 32,
    paddingTop: 40,
    paddingBottom: 32,
  },
} as const;

export const Z_INDEX = {
  nav: 50,
} as const;
