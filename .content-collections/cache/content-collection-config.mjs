// content-collections.ts
import { remarkCodeHike } from "@code-hike/mdx";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import path from "node:path";
import readingTime from "reading-time";
function calculateReadingTime(content) {
  const contentWithoutImages = content.replace(/<svg+.+?(?=<\/svg>)<\/svg>/gs, "");
  return readingTime(contentWithoutImages).text;
}
var posts = defineCollection({
  name: "posts",
  directory: "/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    tags: z.array(z.string().min(1).max(20))
  }),
  transform: async (post, ctx) => {
    const mdx = await compileMDX(ctx, post, {
      files: (appender) => {
        const directory = path.join("/posts", post._meta.directory, "components");
        appender.directory("./components", directory);
      },
      rehypePlugins: [
        rehypeSlug
      ],
      remarkPlugins: [
        remarkGfm,
        [
          remarkCodeHike,
          { theme: "dark-plus", showCopyButton: true }
        ]
      ]
    });
    return {
      ...post,
      content: {
        mdx,
        raw: post.content
      },
      readingTime: calculateReadingTime(post.content),
      url: `/blog/${post._meta.path}`
    };
  }
});
var projects = defineCollection({
  name: "projects",
  directory: "/projects",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    imageUrl: z.string(),
    date: z.string(),
    tags: z.array(z.string().min(1).max(20)),
    liveButton: z.string().optional(),
    projectRepo: z.string().optional()
  })
});
var content_collections_default = defineConfig({
  collections: [posts, projects]
});
export {
  content_collections_default as default
};
