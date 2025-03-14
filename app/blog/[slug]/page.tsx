import fs from "node:fs";
import path from "node:path";
import {
  getPostFilePaths,
  getMDXContentAndFrontMatter,
} from "@/utils/renderMdxUtils";
import { notFound } from "next/navigation";
import RenderMDXContent from "@/app/blog/[slug]/RenderMDXContent";
import { extractHeadings } from "@/utils/mdxUtils";
import TableOfContents from "@/app/blog/[slug]/TableOfContents";
import GiscusComments from "./GiscusComments";
import ShareButtons from "./ShareBlogPost";

//  postSource is our parent folder where all our .mdx content is living in
const postsSource = "/posts";

type BlogPagePostProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPagePost({ params }: BlogPagePostProps) {
  //  get the source if it exists, otherwise throw a notfound error
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

  //  get our attributes from our helper blogMdxUtils utils function
  const { title, description, date, index, content } =
    await getMDXContentAndFrontMatter(source);

  //  Get the headings from our mdx content to pass to our TableOfContents component
  const getHeadings = await extractHeadings(source.toString());

  return (
    <div className="flex w-full flex-col pt-4">
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-4 lg:px-8 xl:px-12">
        <div className="min-w-0 max-w-4xl flex-auto pb-12 lg:max-w-none md:pr-6">
          <RenderMDXContent
            title={title}
            description={description}
            date={date}
            index={index}
            content={content}
          />
          <div>
            <ShareButtons
              className="pt-6 pb-8"
              url={`https://jesusperez.dev/blog/${params.slug}`}
              title={title}
            />
            <GiscusComments />
          </div>
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
}

//  generateMetadata from the current post metadata
export async function generateMetadata({ params }: BlogPagePostProps) {
  let source;
  try {
    source = fs.readFileSync(
      path.join(process.cwd(), postsSource, params.slug + ".mdx")
    );
  } catch {
    notFound();
  }

  const { title, description } = await getMDXContentAndFrontMatter(source);

  return {
    title,
    description,
    alternates: {
      canonicalUrl: `/blog/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// generateStaticParams will build each blog slug route as a static page on build time, rather than on run time
export const generateStaticParams = async () => {
  const blogPostFilePaths = await getPostFilePaths("/posts");

  return blogPostFilePaths.map((path) => ({
    slug: path.replace(/.mdx?$/, ""),
  }));
};

export const dynamic = "force-static";
