export type AccentKey = "orange" | "blue" | "green" | "purple";

export type SponsorCategory = "gold" | "silver" | "bronze" | "partner";

export const sponsorCategoryBadgeClass = (category: SponsorCategory): string =>
  `md-badge md-badge--${category}`;

export const accentMediaClass = (accent: AccentKey): string =>
  `card-entity__media--accent-${accent}`;
