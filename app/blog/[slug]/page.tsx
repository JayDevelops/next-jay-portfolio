import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import GiscusComments from "@/components/blog/GiscusComments";
import ShareBlogPost from "@/components/blog/ShareBlogPost";
import { draftMode } from "next/headers";

import { getPost, getPosts, blog } from "@/lib/source";
import { getMDXComponents } from "@/components/MDXComponents";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // handle the slug not being found
  const { slug } = await params;
  if (!slug) {
    return notFound();
  }

  // handle the page not being found
  const page = blog.getPage([slug]);
  if (!page) {
    return notFound();
  }

  // grab attributes from the selected blog page data
  const { body: Mdx, toc } = page.data;
  const readingTime: string =
    (page.data._exports?.readingTime as string) ?? "no reading time";
  const rawText: string = await page.data.getText("processed");

  // change scroll offset to add right scroll to height in table of contents
  const scrollOffSet: number = 80;
  const mdxComponents = getMDXComponents({});

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <BlogHeader
          pageData={page.data}
          readingTime={readingTime}
          rawText={rawText}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
            <Mdx components={mdxComponents} />
          </article>

          <aside className="hidden md:block md:col-span-1">
            {toc?.length ? (
              <TableOfContents
                toc={toc}
                scrollOffset={scrollOffSet}
                rawSource={rawText}
              />
            ) : (
              <div />
            )}
          </aside>
        </div>
        <div className="flex pt-4 flex-col space-y-8">
          <ShareBlogPost
            url={`https://jesusperez.dev/blog/${slug}`}
            title={page.data.title}
          />
          <GiscusComments />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[page.slugs.length - 1],
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  // handle page not found
  const { slug } = await params;
  const page = blog.getPage([slug]);
  if (!page) return { title: "Post Not Found" };

  const { title, description, author, date } = page.data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date?.toISOString(),
      authors: author ? [author] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
