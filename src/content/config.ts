import { defineCollection, z } from "astro:content";

const localizedFields = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().min(1),
});

const newsCollection = defineCollection({
  type: "data",
  schema: z.object({
    isoDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
    image: z.string().startsWith("/images/"),
    type: z.enum(["announcement", "dev-diary", "update"]).default("update"),
    en: localizedFields,
    ru: localizedFields,
  }),
});

const projectLocalizedFields = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.number().int().positive(),
    image: z.string().startsWith("/images/"),
    progress: z.number().min(0).max(100).optional(),
    wishlistUrl: z.string().url().optional(),
    en: projectLocalizedFields,
    ru: projectLocalizedFields,
  }),
});

export const collections = {
  news: newsCollection,
  projects: projectsCollection,
};
