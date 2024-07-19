// import { visit } from "unist-util-visit";
// Function to extract headings from the MDX source
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';

export async function extractHeadings(source: string) {
    const processor = unified().use(remarkParse).use(remarkMdx);

    // Parse the source into ast tree and init the headings to store to use in our TOC
    const ast = processor.parse(source);
    const headings: { depth: number; text: string, slug: string}[] = [];

    visit(ast, 'heading', (node) => {
        const text = node.children.map((child) => {
            if (child.type === 'text') {
                return child.value;
            } else if (child.type === 'mdxJsxTextElement') {
                return child.children.map((subChild) => subChild.value).join('');
            }
            return ''
        }).join('')

        //  Do not include text if it has multiple lines or other attributes
        if(text.includes('\r\n') || text.includes('\n')) {
            return
        }

        //  slugify the text title from `## section two` to `section-two`
        const slug = slugify(text)

        headings.push({
            depth: node.depth,
            text: text,
            slug: slug
        })
    })

    return headings;
}

function slugify(str: string) {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
}