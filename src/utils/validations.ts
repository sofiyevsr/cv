import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  pubDate: z.date(),
  tags: z.array(z.string()),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  published: z.boolean().optional(),
});
