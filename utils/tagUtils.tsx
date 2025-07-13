import type { Post } from "@/utils/renderMdxUtils";

export function extractAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    if (post.metadata.tags && Array.isArray(post.metadata.tags)) {
      post.metadata.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
}

export function filterPostsByTags(
  posts: Post[],
  selectedTags: string[]
): Post[] {
  if (selectedTags.length === 0) {
    return posts;
  }

  return posts.filter((post) => {
    if (!post.metadata.tags || !Array.isArray(post.metadata.tags)) {
      return false;
    }

    // Check if post has at least one of the selected tags
    return selectedTags.some((selectedTag) =>
      post.metadata.tags.includes(selectedTag)
    );
  });
}
