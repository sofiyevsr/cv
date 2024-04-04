import type { getBlogPosts } from "./blogHelpers";

export type BlogData = Awaited<ReturnType<typeof getBlogPosts>>[number]["data"];
