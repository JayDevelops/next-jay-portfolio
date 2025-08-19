import { getAllContent } from "@/utils/renderMdxUtils";
import type { Post } from "@/utils/renderMdxUtils";
import AllBlogPosts from "@/app/blog/AllBlogPosts";
import { BlogPost, getAllBlogPosts } from "@/lib/strapiQueries";

export default async function Blog() {
  const blogDirectory = "/posts";
  const allBlogs: Post[] = await getAllContent(blogDirectory);

  const strapiAllBlogs = await getAllBlogPosts();
  console.log("All strapi blogs:", strapiAllBlogs);
  // strapiAllBlogs?.forEach((blog: BlogPost) => console.log(blog));

  if (!allBlogs) {
    return <p>No blog posts found</p>;
  }

  // Sort blogs by date (newest first)
  const sortedBlogs: Post[] = allBlogs.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return <AllBlogPosts sortedBlogs={sortedBlogs} />;
}

export const dynamic = "force-static";
