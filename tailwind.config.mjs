export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        display: ['"Exo 2"', "sans-serif"],
        sans: ['"Exo 2"', "sans-serif"],
      },
      colors: {
        orange: "var(--c-orange)",
        surface: {
          1: "var(--s-1)",
          2: "var(--s-2)",
          3: "var(--s-3)",
          4: "var(--s-4)",
          5: "var(--s-5)",
          6: "var(--s-6)",
        },
        border: {
          subtle: "var(--b-subtle)",
          default: "var(--b-default)",
          strong: "var(--b-strong)",
          accent: "var(--b-accent)",
        },
      },
    },
  },
  plugins: [],
};
