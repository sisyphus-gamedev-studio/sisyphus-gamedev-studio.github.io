/**
 * JS design tokens — keep in sync with CSS custom properties in src/styles/tokens.css.
 */
export const DESIGN_TOKENS = {
  orange: "#f87e0f",
  orangeDim: "rgba(248, 126, 15, 0.1)",
  orangeBorder: "rgba(248, 126, 15, 0.2)",
  onAccent: "#111111",
  onWhite: "#ffffff",
  onSurface: "#f0ece8",
  muted: "#555555",
  tertiary: "#737373",
  surface: {
    s1: "#0d0d0d",
    s3: "#151515",
    s4: "#1a1a1a",
    s5: "#202020",
  },
  border: {
    default: "rgba(255, 255, 255, 0.07)",
    strong: "rgba(255, 255, 255, 0.08)",
  },
  navBg: "rgba(13, 13, 13, 0.92)",
  panelBg: "rgba(13, 13, 13, 0.97)",
} as const;

/** @deprecated Prefer CSS vars in components; kept for React inline styles during migration. */
export const COLORS = {
  orange: DESIGN_TOKENS.orange,
  orangeDim: DESIGN_TOKENS.orangeDim,
  orangeBorder: DESIGN_TOKENS.orangeBorder,
  navBg: DESIGN_TOKENS.navBg,
  panelBg: DESIGN_TOKENS.panelBg,
  surface: {
    s3: DESIGN_TOKENS.surface.s3,
    s4: DESIGN_TOKENS.surface.s4,
    s5: DESIGN_TOKENS.surface.s5,
  },
  text: {
    primary: DESIGN_TOKENS.onSurface,
    tertiary: DESIGN_TOKENS.tertiary,
    muted: DESIGN_TOKENS.muted,
  },
  border: DESIGN_TOKENS.border,
} as const;

export const IMAGE_FILTERS = {
  heroMain: "brightness(.75) saturate(.85)",
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
    logoSize: 56,
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
