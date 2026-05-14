import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "https://sisyphus-gamedev-studio.github.io",

  integrations: [
    react(),
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

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
