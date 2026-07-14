// source.config.ts
import {
  defineCollections,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";

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
    valueToExport: ["readingTime"]
  }
});
var source_config_default = defineConfig({
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
