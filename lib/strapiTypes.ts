// Base interfaces for shared Strapi fields
export interface StrapiBaseFields {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Image/Media interface
export interface StrapiImage extends StrapiBaseFields {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, any>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
}

// Author interface
export interface BlogAuthor extends StrapiBaseFields {
  name: string;
  email: string;
}

// Category interface
export interface BlogCategory extends StrapiBaseFields {
  name: string;
  slug: string | null;
  description: string;
}

// Tags interface (based on your data structure)
export interface BlogTags {
  tags: string[];
}

// Main Blog Post interface
export interface StrapiBlogPost extends StrapiBaseFields {
  title: string;
  content: string;
  description: string;
  date: string;
  rawSource: string;
  tags: BlogTags;
  category: BlogCategory;
  thumbnail: StrapiImage;
  author: BlogAuthor;
}

export interface StrapiBlogResponse {
  data: StrapiBlogPost[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Utility type for a single blog post response
export type StrapiBlogPostResponse = {
  data: StrapiBlogPost;
  meta?: any;
};

// Simplified blog post type
export interface SimplifiedBlogPost {
  id: number;
  documentId: string;
  title: string;
  content: string;
  description: string;
  date: string;
  slug?: string;
  author: {
    name: string;
    email: string;
  };
  category: {
    name: string;
    description: string;
  };
  rawSource: string;
  thumbnail: {
    url: string;
    alternativeText: string | null;
  };
  tags: string[];
}

export interface BlogCategory extends StrapiBaseFields {
  name: string;
  slug: string | null;
  description: string;
}
