const DEFAULT_EMAIL = "sisyphus.gamedev.studio@gmail.com";

export const URLS = {
  site: import.meta.env.PUBLIC_SITE_URL || "https://sisyphus.studio",
  steam: import.meta.env.PUBLIC_STEAM_URL || "https://store.steampowered.com",
  donate: import.meta.env.PUBLIC_DONATE_URL || "https://boosty.to/sisyphus.studio",
  careersForm:
    import.meta.env.PUBLIC_CAREERS_FORM_URL || "https://forms.gle/iHn919TyKMPFhaYL8",
} as const;

export const isMailtoLink = (href: string): boolean => href.startsWith("mailto:");

export const CONTACT = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || DEFAULT_EMAIL,
  formspreeEndpoint:
    import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID",
} as const;

const STEAM_SVG_PATH =
  "M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z";

export const SOCIAL_ICONS = {
  steam: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${STEAM_SVG_PATH}"/></svg>`,
  steamContact: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${STEAM_SVG_PATH}"/></svg>`,
  steamSm: `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="${STEAM_SVG_PATH}"/></svg>`,
  email: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
} as const;

export interface SocialLink {
  iconSvg: string;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { iconSvg: SOCIAL_ICONS.email, href: `mailto:${CONTACT.email}`, label: "Email" },
];
