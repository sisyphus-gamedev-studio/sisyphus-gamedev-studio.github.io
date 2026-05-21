export type AccentKey = "orange" | "blue" | "green" | "purple";

export type SponsorCategory = "gold" | "silver" | "bronze" | "partner";

/** CSS class for partner/sponsor category badge (use with `md-badge`). */
export const sponsorCategoryBadgeClass = (category: SponsorCategory): string =>
  `md-badge md-badge--${category}`;

/** CSS class for placeholder logo/avatar accent on `card-entity__media`. */
export const accentMediaClass = (accent: AccentKey): string =>
  `card-entity__media--accent-${accent}`;
