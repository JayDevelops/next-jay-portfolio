import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
import {
  ReadTimeFormat,
  remarkReadingTime,
} from "./lib/fumadoc-remark-plugins/remark-reading-time";

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string().optional(),
  }),
  postprocess: {
    valueToExport: ["readingTime"],
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [
      [remarkReadingTime, { format: ReadTimeFormat.Text }],
      ...v,
    ],
  },
});
