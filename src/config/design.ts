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

export const LAYOUT = {
  maxWidth: 1280,
  padding: 20,
  navHeight: 76,
  mobileBreakpoint: 768,
} as const;

export const SIZES = {
  hero: {
    cardImageSize: 48,
    statNumSize: 42,
    paddingTop: 120,
    paddingBottom: 96,
  },
  form: {
    inputFontSize: 13,
    textareaMinHeight: 120,
  },
} as const;
