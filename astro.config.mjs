import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "https://sisyphus.github.io",

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          ru: "ru-RU",
        },
      },
      serialize(item) {
        if (/\/(en|ru)\/$/.test(item.url)) {
          return {
            ...item,
            lastmod: new Date().toISOString().split("T")[0],
            changefreq: "weekly",
            priority: 1.0,
          };
        }
        return item;
      },
    }),
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
