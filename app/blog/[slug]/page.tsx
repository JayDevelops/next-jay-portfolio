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

  return posts?.map((post) => ({
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
// import path from "node:path";
// import {
//   getPostFilePaths,
//   getMDXContentAndFrontMatter,
// } from "@/utils/renderMdxUtils";
// import { notFound } from "next/navigation";
// import RenderMDXContent from "@/app/blog/[slug]/RenderMDXContent";
// import { extractHeadings } from "@/utils/mdxUtils";
// import TableOfContents from "@/app/blog/[slug]/TableOfContents";
// import GiscusComments from "./GiscusComments";
// import ShareButtons from "./ShareBlogPost";
// import KofiButton from "./KofiButton";

// //  postSource is our parent folder where all our .mdx content is living in
// const postsSource = "/posts";

// type BlogPagePostProps = {
//   params: {
//     slug: string;
//   };
// };

// export default async function BlogPagePost({ params }: BlogPagePostProps) {
//   //  get the source if it exists, otherwise throw a notfound error
//   let source;
//   try {
//     source = fs.readFileSync(
//       path.join(process.cwd(), postsSource, params.slug + ".mdx")
//     );
//   } catch (error) {
//     //  throw notFound page if the user inputted a bad slug that does not exist
//     console.log("error rendering doc page: " + error);
//     notFound();
//   }

//   //  get our attributes from our helper blogMdxUtils utils function
//   const { title, description, date, index, content, rawSource } =
//     await getMDXContentAndFrontMatter(source);

//   //  Get the headings from our mdx content to pass to our TableOfContents component
//   const getHeadings = await extractHeadings(source.toString());

//   return (
//     <div className="w-full min-w-0 flex flex-col pt-4">
//       <div className="w-full max-w-none lg:max-w-6xl mx-auto flex flex-col xl:flex-row xl:justify-center gap-8 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-none lg:max-w-4xl min-w-0 flex-1">
//           <RenderMDXContent
//             title={title}
//             description={description}
//             date={date}
//             index={index}
//             content={content}
//             rawSource={rawSource}
//           />
//           <div className="mb-6">
//             <KofiButton />
//             <ShareButtons
//               className="pt-6 pb-8"
//               url={`https://jesusperez.dev/blog/${params.slug}`}
//               title={title}
//             />
//             <GiscusComments />
//           </div>
//         </div>

//         <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 lg:px-4">
//           <div className="mx-auto">
//             <p className="text-lg font-bold">On This Page</p>
//             <TableOfContents headings={getHeadings} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// //  generateMetadata from the current post metadata
// export async function generateMetadata({ params }: BlogPagePostProps) {
//   let source;
//   try {
//     source = fs.readFileSync(
//       path.join(process.cwd(), postsSource, params.slug + ".mdx")
//     );
//   } catch {
//     notFound();
//   }

//   const { title, description } = await getMDXContentAndFrontMatter(source);

//   return {
//     title,
//     description,
//     alternates: {
//       canonicalUrl: `/blog/${params.slug}`,
//     },
//     openGraph: {
//       title,
//       description,
//       type: "article",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//     },
//   };
// }

// // generateStaticParams will build each blog slug route as a static page on build time, rather than on run time
// export const generateStaticParams = async () => {
//   const blogPostFilePaths = await getPostFilePaths("/posts");

//   return blogPostFilePaths.map((path) => ({
//     slug: path.replace(/.mdx?$/, ""),
//   }));
// };

// export const dynamic = "force-static";
