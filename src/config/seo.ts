import { BRAND } from "./constants";
import { HERO_PRELOAD_IMAGE_SRC } from "./images";

export const SEO = {
  defaultTitle: `${BRAND.prefix} ${BRAND.suffix} — Independent Game Developers`,
  defaultDescription: `${BRAND.prefix} ${BRAND.suffix} is an independent game studio creating Frog Frag and Krivda. Small team, big ambitions.`,
  themeColor: "#1a1a1a",
  ogImagePath: HERO_PRELOAD_IMAGE_SRC,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  games: [
    {
      name: "Frog Frag",
      description: "A cooperative deathmatch shooter with procedurally generated maps.",
    },
    {
      name: "Krivda",
      description: "A cooperative survival game rooted in Slavic mythology.",
    },
  ],
} as const;
