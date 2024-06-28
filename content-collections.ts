import {remarkCodeHike} from "@code-hike/mdx";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import path from "node:path";

const posts = defineCollection({
    name: "posts",
    directory: "/posts",
    include: "**/*.mdx",
    schema: (z) => ({
        title: z.string(),
        summary: z.string(),
        date: z.string(),
        tags: z.array(z.string().min(1).max(20)),
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
            remarkPlugins: [remarkGfm,
                [remarkCodeHike,
                    { theme: "dark-plus", showCopyButton: true}
                ],
            ],
        })

        return {
            ...post,
            content: {
                mdx,
                raw: post.content,
            },
            url: `/posts/${post._meta.path}`,
        }
    },
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
        liveButton: z.string().optional(),
        projectRepo: z.string().optional(),
    })
})

export default defineConfig({
    collections: [posts, projects],
});