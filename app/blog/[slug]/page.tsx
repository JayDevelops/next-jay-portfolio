import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { useMDXComponents } from "@/components/useMDXComponents";
import { compileMDX } from "next-mdx-remote/rsc";
import RenderMDXContent from "@/app/blog/[slug]/RenderMDXContent";
import {extractHeadings} from "@/utils/mdxUtils";
import TableOfContents from "@/app/blog/[slug]/TableOfContents";
// import { extractHeadings } from "@/utils/mdxUtils"

//  postSource is our parent folder where all our .mdx content is living in
const postsSource = "/posts";

type BlogPagePostProps = {
    params: {
        slug: string,
    };
};

export default async function BlogPagePost({ params }: BlogPagePostProps) {
    let source;
    try {
        source = fs.readFileSync(
            path.join(process.cwd(), postsSource, params.slug + ".mdx")
        );
    } catch (error) {
        //  throw notFound page if the user inputted a bad slug that does not exist
        console.log("error rendering doc page: " + error);
        notFound();
    }

    //  Parse the components local to our this page, otherwise won't render the components
    const components = useMDXComponents({});

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

    //  Get the headings from our mdx content to pass to our TableOfContents component
    const getHeadings = await extractHeadings(source.toString())

    //  Parse the front matter from our mdx files to their appropriate types
    const title = frontmatter.title as string;
    const description = frontmatter.description as string;
    const date = frontmatter.date as string;
    const index = frontmatter.index as number;

    return (
        <div className="flex w-full flex-col">
            <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
                <div className="min-w-0 max-w-4xl flex-auto py- lg:max-w-none md:pr-6">
                    <RenderMDXContent title={title} description={description} date={date} index={index} content={content} />
                </div>

                <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 lg:px-4">
                    <div className="mx-auto">
                        <p className="text-lg font-bold">On This Page</p>
                        <TableOfContents headings={getHeadings} />
                    </div>
                </div>
            </div>
        </div>
    );
};


// generateStaticParams will build each blog slug route as a static page on build time, rather than on run time
export const generateStaticParams = async () => {
    const blogPostFilePaths = await getBlogPostFilePaths();

    return blogPostFilePaths.map((path) => ({
        slug: path.replace(/.mdx?$/, ""),
    }));
};

async function getBlogPostFilePaths() {
    const dirFiles = fs.readdirSync(path.join(process.cwd(), postsSource));

    //  Only include files with the mdx extension
    return dirFiles.filter((filepath) => /.mdx?$/.test(filepath));
}

export const dynamic = "force-static";