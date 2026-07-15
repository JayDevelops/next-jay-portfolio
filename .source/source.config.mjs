// source.config.ts
import { z } from "zod";
import {
  defineCollections,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";

// lib/fumadoc-remark-plugins/remark-reading-time.ts
import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";
var remarkReadingTime = (options = {}) => {
  const { format = "text" /* Text */ } = options;
  return (tree, file) => {
    const text = toString(tree);
    const stats = readingTime(text);
    const vFileData = file.data;
    if (format === "minutes" /* Minutes */) {
      vFileData.readingTime = stats.minutes.toString();
    } else {
      vFileData.readingTime = stats.text;
    }
  };
};

// source.config.ts
import lastModified from "fumadocs-mdx/plugins/last-modified";
var blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    title: z.string(),
    date: z.date(),
    description: z.string().optional()
  }),
  postprocess: {
    valueToExport: ["readingTime"],
    includeProcessedMarkdown: true
  }
});
var source_config_default = defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: (v) => [
      [remarkReadingTime, { format: "text" /* Text */ }],
      ...v
    ]
  }
});
export {
  blogPosts,
  source_config_default as default
};
