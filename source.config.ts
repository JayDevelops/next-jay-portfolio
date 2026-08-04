import { z } from "zod";

import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
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
    date: z.date(),
    description: z.string().optional(),
  }),
  postprocess: {
    valueToExport: ["readingTime"],
    includeProcessedMarkdown: true,
  },
});

export default defineConfig({
  plugins: [],
  mdxOptions: {
    remarkPlugins: (v) => [
      [remarkReadingTime, { format: ReadTimeFormat.Text }],
      ...v,
    ],
  },
});
