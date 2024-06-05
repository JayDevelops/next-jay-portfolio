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
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
