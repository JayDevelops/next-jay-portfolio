import fs, {promises as fsPromises} from 'node:fs';
import path from 'node:path';
import {compileMDX} from 'next-mdx-remote/rsc';
import {MDXComponents} from "@/components/MDXComponents";
import {JSXElementConstructor, ReactElement} from "react";
export interface Post {
    metadata: {
        date: string,
        description: string,
        index: number,
        title: string,
        tags: string[],
        githubLink?: string | undefined,
        liveLink?: string | undefined,
        content: ReactElement<any, string | JSXElementConstructor<any>>,
    };
    slug?: string,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

/**
 * Get the paths of all blog posts in the "posts" directory
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
 * Parse the front matter and the content from a given .mdx file
 */
export async function getMDXContentAndFrontMatter(source: Buffer) {
    const components = MDXComponents({});

    //  Grab the content and front matter, passing components to render appropriately on the page
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

    //  Default metadata on all mdx files
    const title = frontmatter.title as string;
    const description = frontmatter.description as string;
    const date = frontmatter.date as string;
    const index = frontmatter.index as number;
    const tags = frontmatter.tags as string[];

    //  Optional metadata below, found on mdx project content
    const githubLink = frontmatter as string | undefined;
    const liveLink = frontmatter as string | undefined;

    return { title, description, date, index, tags, content, githubLink, liveLink };
}

/**
 * Get an array of all blog posts with content and metadata
 */
export async function getAllContent(contentSource: string): Promise<Post[] | any[]> {
    const postPaths = await getPostFilePaths(contentSource);

    const contentPostPromises = postPaths.map(async (postPath) => {
        const filePath = path.join(process.cwd(), contentSource, postPath);
        const source = await fsPromises.readFile(filePath);
        const postContentAndMetadata = await getMDXContentAndFrontMatter(source);

        return {
            slug: postPath.replace(/\.mdx?$/, ""),
            metadata: postContentAndMetadata,
            content: postContentAndMetadata.content,
            title: postContentAndMetadata.title,
            date: postContentAndMetadata.date,
            description: postContentAndMetadata.description,
            tags: postContentAndMetadata.tags,
            githubLink: postContentAndMetadata.githubLink,
            liveLink: postContentAndMetadata.liveLink,
        };
    });

    return await Promise.all(contentPostPromises).catch(() => []);
}