import { blogSchema } from "../utils/validations";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    blogSchema.extend({
      image: blogSchema.shape.image.extend({
        url: image(),
      }),
    }),
});

export const collections = {
  blog: blogCollection,
};
