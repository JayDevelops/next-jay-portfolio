import type React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/MDXComponents";
import { extractHeadings } from "./mdxUtils";
import { SimplifiedBlogPost } from "./strapiTypes";

export interface ProcessedPost extends SimplifiedBlogPost {
  compiledContent: React.ReactElement;
  headings: Array<{
    depth: number;
    text: string;
    slug: string;
  }>;
  readingTime: number;
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Process MDX content from Strapi
export async function processMDXContent(
  post: SimplifiedBlogPost
): Promise<ProcessedPost> {
  const components = MDXComponents({});

  // Compile MDX content
  const { content: compiledContent } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        rehypePlugins: [],
      },
    },
    components: components,
  });

  // Extract headings for table of contents
  const headings = await extractHeadings(post.content);

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content);

  return {
    ...post,
    compiledContent,
    headings,
    readingTime,
  };
}
