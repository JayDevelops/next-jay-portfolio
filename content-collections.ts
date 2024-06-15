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

const projects = defineCollection({
    name: "projects",
    directory: "/projects",
    include: "**/*.md",
    schema: (z) => ({
        title: z.string(),
        summary: z.string(),
        imageUrl: z.string(),
        date: z.string(),
        tags: z.array(z.string().min(1).max(20)),
        liveButton: z.string(),
        projectRepo: z.string()
    })
})

export default defineConfig({
    collections: [posts, projects],
});