import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { blogPosts } from "fumadocs-mdx:collections/server";

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export type BlogPage = NonNullable<ReturnType<typeof blog.getPage>>;
export type BlogData = BlogPage["data"];

export const getPosts = () => blog.getPages();
export const getPost = (slug: string) => blog.getPage([slug]);
