import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from "@/components/MDXComponents";

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

    return { title, description, date, index, content };
}