// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
var posts = defineCollection({
  name: "posts",
  directory: "/posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    tags: z.array(z.string().min(1).max(20))
  })
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
