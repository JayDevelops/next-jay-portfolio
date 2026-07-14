import {
  getAllBlogPosts,
  getAllCategories,
  getRecentBlogPosts,
} from "@/lib/strapiQueries";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import CategoriesFilter from "./CategoriesFilter";
import { redirect } from "next/navigation";
import { blog } from "@/lib/source";

// TODO: Come back later to fix categories
interface BlogIndexPageProps {
  searchParams: {
    category?: string;
  };
}

export default function Blog() {
  // // const blogDirectory = "/posts";
  // const category = searchParams.category;
  // const allBlogs: SimplifiedBlogPost[] | undefined = await getAllBlogPosts(
  //   category
  // );
  // const categories = await getAllCategories();
  const allPosts = blog.getPages();

  if (!allPosts) {
    return <p>No blog posts found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-2">My Thoughts</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Exploring ideas, sharing insights, personal stories, and documenting
          my journey in all aspects of software development.
        </p>
      </header>

      {/* <CategoriesFilter categories={categories} category={category} /> */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {allPosts.map((post) => (
          <BlogCard key={post.url} post={post} />
        ))}
      </div>
    </div>
  );
}
