"use client";

import { useState, useMemo } from "react";
import type { Post } from "@/utils/renderMdxUtils";
import TagFilter from "@/components/TagFilter";
import { extractAllTags, filterPostsByTags } from "@/utils/tagUtils";
import Link from "next/link";

interface AllBlogPostsProps {
  sortedBlogs: Post[];
}

export default function AllBlogPosts({ sortedBlogs }: AllBlogPostsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  // Extract all unique tags
  const allTags = useMemo(() => extractAllTags(sortedBlogs), [sortedBlogs]);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(
    () => filterPostsByTags(sortedBlogs, selectedTags),
    [sortedBlogs, selectedTags]
  );

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Thoughts</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "list"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "card"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Tag Filter */}
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearAll={handleClearAllTags}
      />

      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {sortedBlogs.length} posts
      </div>

      {/* Blog posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No posts found with the selected tags.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "card" ? "grid gap-6 md:grid-cols-2" : "space-y-6"
          }
        >
          {filteredPosts.map((post) => (
            <BlogPostItem key={post.slug} post={post} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

interface BlogPostItemProps {
  post: Post;
  viewMode: "list" | "card";
}

function BlogPostItem({ post, viewMode }: BlogPostItemProps) {
  const isCard = viewMode === "card";

  return (
    <article
      className={`${
        isCard ? "bg-card border rounded-lg p-6" : "border-b pb-6"
      }`}
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
        </h2>

        <p className="text-sm text-muted-foreground">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {post.metadata.description && (
          <p className="text-muted-foreground">{post.metadata.description}</p>
        )}

        <div className="space-y-4">
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-secondary-foreground/80 hover:text-primary/90 transition-colors">
            <Link href={`/blog/${post.slug}`}>Read More...</Link>
          </p>
        </div>
      </div>
    </article>
  );
}
