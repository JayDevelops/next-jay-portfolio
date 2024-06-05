import { defineCollection, defineConfig } from "@content-collections/core";

const posts = defineCollection({
    name: "posts",
    directory: "/posts",
    include: "**/*.md",
    schema: (z) => ({
        title: z.string(),
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.string().min(1).max(20)),
    }),
});

export default defineConfig({
    collections: [posts],
});