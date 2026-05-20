export type AccentKey = "orange" | "blue" | "green" | "purple";

export interface AccentTokens {
  bg: string;
  border: string;
  text: string;
}

/** Shared avatar / logo accent palette (team CSS uses matching vars in tokens.css). */
export const ACCENT_STYLES: Record<AccentKey, AccentTokens> = {
  orange: {
    bg: "var(--c-orange-dim)",
    border: "var(--c-orange-border)",
    text: "var(--c-orange)",
  },
  blue: {
    bg: "var(--accent-blue-bg)",
    border: "var(--accent-blue-border)",
    text: "var(--accent-blue-text)",
  },
  green: {
    bg: "var(--accent-green-bg)",
    border: "var(--accent-green-border)",
    text: "var(--accent-green-text)",
  },
  purple: {
    bg: "var(--accent-purple-bg)",
    border: "var(--accent-purple-border)",
    text: "var(--accent-purple-text)",
  },
} as const;

export const toAccentInlineStyle = (accent: AccentKey): string => {
  const s = ACCENT_STYLES[accent];
  return `background:${s.bg};border:1px solid ${s.border};color:${s.text}`;
};

export type SponsorCategory = "gold" | "silver" | "bronze" | "partner";

export const SPONSOR_CATEGORY_STYLES: Record<SponsorCategory, string> = {
  gold: "background:var(--c-orange-dim);border-color:var(--c-orange-border);color:var(--c-orange-accent)",
  silver:
    "background:var(--accent-silver-bg);border-color:var(--accent-silver-border);color:var(--accent-silver-text)",
  bronze:
    "background:var(--accent-bronze-bg);border-color:var(--accent-bronze-border);color:var(--accent-bronze-text)",
  partner:
    "background:var(--accent-green-bg);border-color:var(--accent-green-border);color:var(--accent-green-text)",
} as const;
