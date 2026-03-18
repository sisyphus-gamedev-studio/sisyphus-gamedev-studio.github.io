export const COLORS = {
  orange: "#f87e0f",
  orangeDim: "rgba(248,126,15,.1)",
  orangeBorder: "rgba(248,126,15,.2)",
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
  mobile:  { fontSize: 10, padding: "3px 8px" },
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
  },
  hero: {
    cardHeight: 264,
    cardImageSize: 48,
  },
} as const;
