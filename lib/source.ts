import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blogPosts } from "fumadocs-mdx:collections/server";
import type { InferPageType } from "fumadocs-core/source";

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export type BlogPage = InferPageType<typeof blog>;
export type BlogData = BlogPage["data"] & {
  _exports?: { readingTime?: string };
};
