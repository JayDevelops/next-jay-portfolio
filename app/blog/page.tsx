import { getRecentBlogPosts } from "@/lib/strapiQueries";
import { SimplifiedBlogPost } from "@/lib/strapiTypes";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";

export default async function Blog() {
  // const blogDirectory = "/posts";

  const allBlogs: SimplifiedBlogPost[] | undefined = await getRecentBlogPosts();

  if (!allBlogs) {
    return <p>No blog posts found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-4">My Thoughts</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Exploring ideas, sharing insights, personal stories, and documenting
          my journey in all aspects of software development.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allBlogs.map((post: SimplifiedBlogPost) => (
          <BlogCard key={`post-${post.id}`} post={post} />
        ))}
      </div>
    </div>
  );
}

// export const dynamic = "force-static";
export const revalidate = 600;
