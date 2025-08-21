import { notFound } from "next/navigation";
import { processMDXContent } from "@/lib/mdx-strapi";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/strapiQueries";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import GiscusComments from "../../../components/blog/GiscusComments";
import ShareBlogPost from "../../../components/blog/ShareBlogPost";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author.name] : undefined,
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail.url,
              alt: post.thumbnail.alternativeText || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  // change scroll offset to add right scroll to height in table of contents
  const scrollOffSet: number = 80;

  if (!post) {
    notFound();
  }

  const processedPost = await processMDXContent(post);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <BlogHeader post={post} readingTime={processedPost.readingTime} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
            {processedPost.compiledContent}
          </article>

          <aside className="hidden md:block md:col-span-1">
            <TableOfContents
              headings={processedPost.headings}
              scrollOffset={scrollOffSet}
            />
          </aside>
        </div>
        <div className="flex pt-4 flex-col space-y-8">
          <ShareBlogPost
            url={`https://jesusperez.dev/blog/${params.slug}`}
            title={post.title}
          />
          <GiscusComments />
        </div>
      </div>
    </div>
  );
}
