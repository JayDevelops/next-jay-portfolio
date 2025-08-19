import { slugify } from "./slugify";
import { strapiClient } from "./strapiClient";

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  date: string;
  rawSource?: string;
  tags: {
    tags: string[];
  };
  slug?: string;
  thumbnail?: {
    ext?: string;
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: any;
    hash: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  author?: {
    avatar?: {
      id: number;
      documentId: string;
      name: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats: any;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: string;
      provider: string;
      provider_metadata?: any;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  date: Date;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  thumbnail?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  author?: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
}
// getBlogCollection returns blog collection
export async function getBlogCollection() {
  return await strapiClient.collection("blogs");
}

function isStrapiPost(doc: any): doc is StrapiPost {
  return (
    doc &&
    typeof doc.id === "number" &&
    typeof doc.title === "string" &&
    typeof doc.description === "string" &&
    typeof doc.content === "string"
  );
}

// Updated transformation function to work with Strapi Document type
function mapStrapiPostToBlogPost(post: any): BlogPost {
  console.log("Transforming post thumbnail:", post.thumnbnail); // Note the typo
  console.log("Transforming post author:", post.author);

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    slug: post.slug || slugify(post.title),
    date: new Date(post.publishedAt || post.createdAt),
    tags:
      post.tags?.tags?.map((tagName: string, index: number) => ({
        id: index,
        name: tagName,
        slug: slugify(tagName),
      })) || [],
    thumbnail: post.thumbnail
      ? {
          url: post.thumbnail.url,
          alternativeText: post.thumbnail.alternativeText,
          width: post.thumbnail.width,
          height: post.thumbnail.height,
        }
      : undefined,
    author: post.author
      ? {
          id: post.author.id,
          name: post.author.name,
          email: post.author.email,
          avatar: post.author.avatar,
        }
      : undefined,
  };
}

/**
 * Helper functions to get certain articles or other types from strapi cms via strapiClient.
 */
export async function getAllBlogPosts(): Promise<BlogPost[] | undefined> {
  const blogs = await getBlogCollection();
  const allBlogs = await blogs.find({
    locale: "en",
    sort: "date",
    populate: "*",
  });

  // Enhanced debugging
  if (allBlogs.data && allBlogs.data[0]) {
    console.log("=== DEBUGGING FIRST BLOG POST ===");
    console.log("Available fields:", Object.keys(allBlogs.data[0]));
    console.log("Full first post:", JSON.stringify(allBlogs.data[0], null, 2));
    console.log("Thumbnail field:", allBlogs.data[0].thumbnail);
    console.log("Author field:", allBlogs.data[0].author);
    console.log("==================================");
  }
  console.log("all raw blogs:", allBlogs.data);

  if (!allBlogs?.data) return undefined;

  return allBlogs.data.filter(isStrapiPost).map(mapStrapiPostToBlogPost);
}
