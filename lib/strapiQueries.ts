import { slugify } from "./slugify";
import { strapiClient } from "./strapiClient";
import { SimplifiedBlogPost, StrapiBlogPost } from "./strapiTypes";

// getBlogCollection returns blog collection
export async function getBlogCollection() {
  return await strapiClient.collection("blogs");
}

/*
 * Helper functions to get certain articles or other types from strapi cms via strapiClient.
 */
export async function getAllBlogPosts(): Promise<
  SimplifiedBlogPost[] | undefined
> {
  const blogs = await getBlogCollection();
  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
  });

  if (!allBlogs?.data) return undefined;

  // Transform the data to add slug and flatten structure
  return allBlogs.data.map((post) =>
    transformStrapiBlogPost(post as StrapiBlogPost)
  );
}

// Alternative: If you want to keep the raw structure but just add slug
export async function getAllBlogPostsWithSlug(): Promise<
  Array<StrapiBlogPost & { slug: string }> | undefined
> {
  const blogs = await getBlogCollection();
  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
  });

  if (!allBlogs?.data) return undefined;

  // Add slug to the existing structure
  return allBlogs.data.map((post) => ({
    ...(post as StrapiBlogPost),
    slug: slugify((post as StrapiBlogPost).title),
  }));
}

// More efficient: Get blog post by slug with direct Strapi query
export async function getBlogPostBySlug(
  slug: string
): Promise<SimplifiedBlogPost | undefined> {
  const allPosts = await getAllBlogPosts();
  if (!allPosts) return undefined;

  return allPosts.find((post) => post.slug === slug);
}

// Alternative: Direct query by title (more efficient for single posts)
export async function getBlogPostBySlugDirect(
  slug: string
): Promise<SimplifiedBlogPost | undefined> {
  const allPosts = await getAllBlogPosts();
  if (!allPosts) return undefined;

  return allPosts.find((post) => post.slug === slug);
}

// Get recent blog posts (limit)
export async function getRecentBlogPosts(
  limit: number = 5
): Promise<SimplifiedBlogPost[] | undefined> {
  const blogs = await getBlogCollection();
  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
    pagination: {
      limit,
    },
  });

  if (!allBlogs?.data) return undefined;

  return allBlogs.data.map((post) =>
    transformStrapiBlogPost(post as StrapiBlogPost)
  );
}

// Get posts by category
export async function getBlogPostsByCategory(
  categoryName: string
): Promise<SimplifiedBlogPost[] | undefined> {
  const blogs = await getBlogCollection();
  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
    filters: {
      category: {
        name: {
          $eq: categoryName,
        },
      },
    },
  });

  if (!allBlogs?.data) return undefined;

  return allBlogs.data.map((post) =>
    transformStrapiBlogPost(post as StrapiBlogPost)
  );
}

function transformStrapiBlogPost(post: StrapiBlogPost): SimplifiedBlogPost {
  return {
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    content: post.content,
    description: post.description,
    date: post.date,
    slug: slugify(post.title),
    author: {
      name: post.author.name,
      email: post.author.email,
    },
    category: {
      name: post.category.name,
      description: post.category.description,
    },
    thumbnail: {
      url: getFullImageUrl(post.thumbnail.url),
      alternativeText: post.thumbnail.alternativeText,
    },
    tags: post.tags.tags,
  };
}

// Helper function to get full image URL
function getFullImageUrl(imageUrl: string): string {
  // If URL is already absolute, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If URL starts with /, it's relative to domain
  if (imageUrl.startsWith("/")) {
    return `${process.env.STRAPI_BASE_URL}${imageUrl}`;
  }

  // Otherwise, assume it needs full path
  return `${process.env.STRAPI_BASE_URL}/${imageUrl}`;
}
