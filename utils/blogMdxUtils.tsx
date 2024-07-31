import fs, {promises as fsPromises} from 'node:fs';
import path from 'node:path';
import {compileMDX} from 'next-mdx-remote/rsc';
import {MDXComponents} from "@/components/MDXComponents";
import {JSXElementConstructor, ReactElement} from "react";
export interface BlogPost {
    metadata: {
        date: string,
        description: string,
        index: number,
        title: string,
        tags: string[],
        content: ReactElement<any, string | JSXElementConstructor<any>>,
    };
    slug: string,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

const postsSource = "/posts";
/**
 * Get the paths of all blog posts in the "posts" directory
 */
export async function getBlogPostFilePaths() {
    const dirFiles = fs.readdirSync(path.join(process.cwd(), postsSource));

    //  Only include files with the mdx extension
    return dirFiles.filter((filepath) => /.mdx?$/.test(filepath));
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

    const title = frontmatter.title as string;
    const description = frontmatter.description as string;
    const date = frontmatter.date as string;
    const index = frontmatter.index as number;
    const tags = frontmatter.tags as string[];

    return { title, description, date, index, tags, content };
}

/**
 * Get an array of all blog posts with content and metadata
 */
export async function getAllBlogPosts(): Promise<BlogPost[] | any[]> {
    const postPaths = await getBlogPostFilePaths();

    const blogPostsPromises = postPaths.map(async (postPath) => {
        const filePath = path.join(process.cwd(), postsSource, postPath);
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
        };
    });

    return await Promise.all(blogPostsPromises).catch(() => []);
}