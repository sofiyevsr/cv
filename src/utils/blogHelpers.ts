import { getCollection } from "astro:content";

export async function getBlogPosts() {
  return await getCollection("blog", ({ data }) => {
    return import.meta.env.DEV || data.published === true;
  });
}
