import { slugify } from "./slugify";
import { strapiClient } from "./strapiClient";
import {
  BlogCategory,
  SimplifiedBlogPost,
  StrapiBlogPost,
} from "./strapiTypes";

// getBlogCollection returns blog collection
export async function getBlogCollection() {
  return await strapiClient.collection("blogs");
}

//  Function to return categories collection
export async function getAllCategories(): Promise<BlogCategory[] | undefined> {
  const categories = strapiClient.collection("categories");

  const allCategories = await categories.find();

  return allCategories.data as BlogCategory[];
}

/*
 * Helper functions to get certain articles or other types from strapi cms via strapiClient.
 */
export async function getAllBlogPosts(
  categoryName?: string | null | undefined,
  limit?: number
): Promise<SimplifiedBlogPost[] | undefined> {
  const blogs = await getBlogCollection();

  let filters: any = undefined;
  let pagination: any = {};

  if (categoryName === "recent") {
    pagination.limit = 5;
  } else if (categoryName && categoryName !== "all") {
    // real category filtering
    filters = {
      category: {
        name: {
          $eqi: categoryName,
        },
      },
    };
    if (limit) pagination.limit = limit;
  } else {
    // "all" or no category -> show everything (unless limit is passed)
    if (limit) pagination.limit = limit;
  }

  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
    filters,
    pagination,
  });

  if (!allBlogs?.data) return undefined;

  return allBlogs.data.map((post) =>
    transformStrapiBlogPost(post as StrapiBlogPost)
  );
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

export async function getBlogPostBySlug(
  slug: string
): Promise<SimplifiedBlogPost | undefined> {
  const allPosts = await getAllBlogPosts();
  if (!allPosts) return undefined;

  return allPosts.find((post) => post.slug === slug);
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

//  getBlogsForSearchModal will be used to grab blog posts for search modal
export async function getBlogsForSearchModal() {
  const blogs = await getBlogCollection();

  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date:desc",
    populate: "*",
  });

  if (!allBlogs?.data) return undefined;

  return allBlogs.data.map((post) =>
    transformStrapiBlogPost(post as StrapiBlogPost)
  );
}
