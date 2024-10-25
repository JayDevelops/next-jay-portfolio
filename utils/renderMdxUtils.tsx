import fs, { promises as fsPromises } from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from "@/components/MDXComponents";
import { JSXElementConstructor, ReactElement } from "react";

export interface Post {
    metadata: {
        date: string;
        description: string;
        index: number;
        title: string;
        tags: string[];
        thumbnail?: string; // Marking as optional
    };
    slug: string;
    content: ReactElement<any, string | JSXElementConstructor<any>>;
}

/**
 * Get the paths of all blog posts in the specified directory
 */
export async function getPostFilePaths(contentSource: string) {
    try {
        const dirFiles = fs.readdirSync(path.join(process.cwd(), contentSource));
        return dirFiles.filter((filepath) => /.mdx?$/.test(filepath));
    } catch (error) {
        console.error(`Error reading directory ${contentSource}:`, error);
        return [];
    }
}

/**
 * Parse the front matter and content from an .mdx file
 */
export async function getMDXContentAndFrontMatter(source: Buffer) {
    const components = MDXComponents({});

    // Parse content and frontmatter, with components for custom rendering
    const { content, frontmatter } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                rehypePlugins: [],
            },
            parseFrontmatter: true,
        },
        components: components,
    });

    return {
        title: frontmatter.title as string,
        description: frontmatter.description as string,
        date: frontmatter.date as string,
        index: frontmatter.index as number,
        tags: frontmatter.tags as string[],
        thumbnail: frontmatter.thumbnail as string | undefined, // Ensuring it can be undefined
        content,
    };
}

/**
 * Retrieve all content with metadata from a directory of MDX files
 */
export async function getAllContent(contentSource: string): Promise<Post[]> {
    const postPaths = await getPostFilePaths(contentSource);

    const contentPostPromises = postPaths.map(async (postPath) => {
        try {
            const filePath = path.join(process.cwd(), contentSource, postPath);
            const source = await fsPromises.readFile(filePath);
            const postContentAndMetadata = await getMDXContentAndFrontMatter(source);

            return {
                slug: postPath.replace(/\.mdx?$/, ""),
                metadata: {
                    title: postContentAndMetadata.title,
                    description: postContentAndMetadata.description,
                    date: postContentAndMetadata.date,
                    index: postContentAndMetadata.index,
                    tags: postContentAndMetadata.tags,
                    thumbnail: postContentAndMetadata.thumbnail, // Will be undefined if not provided
                },
                content: postContentAndMetadata.content,
            };
        } catch (error) {
            console.error(`Error processing file ${postPath}:`, error);
            return null;
        }
    });

    const resolvedPosts = await Promise.all(contentPostPromises);
    return resolvedPosts.filter((post): post is Post => post !== null); // Filter out any failed posts
}
