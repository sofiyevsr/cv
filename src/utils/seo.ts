import { seoData } from "./constants";
import type { BlogData } from "./types";

export const personSchema = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "Person",
  name: seoData.name,
  url: seoData.website,
  jobTitle: seoData.jobTitle,
  email: seoData.email,
});

export const getBlogSchema = (blog: BlogData) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    image: [blog.image],
    datePublished: blog.pubDate.toString(),
    author: [
      {
        "@type": "Person",
        name: blog.author,
      },
    ],
  });
