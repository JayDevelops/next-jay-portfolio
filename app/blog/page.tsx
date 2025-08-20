import {
  getAllBlogPosts,
  getAllCategories,
  getRecentBlogPosts,
} from "@/lib/strapiQueries";
import { SimplifiedBlogPost } from "@/lib/strapiTypes";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import CategoriesFilter from "./CategoriesFilter";

export default async function Blog({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // const blogDirectory = "/posts";
  const category = searchParams.category;
  const allBlogs: SimplifiedBlogPost[] | undefined = await getAllBlogPosts(
    category
  );
  const categories = await getAllCategories();

  if (!allBlogs) {
    return <p>No blog posts found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">My Thoughts</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Exploring ideas, sharing insights, personal stories, and documenting
          my journey in all aspects of software development.
        </p>
      </header>

      <CategoriesFilter categories={categories} category={category} />

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
