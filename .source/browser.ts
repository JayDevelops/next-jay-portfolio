// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
} & {
  DocData: {
    blogPosts: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>();
const browserCollections = {
  blogPosts: create.doc("blogPosts", {"adding-copy-markdown-button-in-mdx-content.mdx": () => import("../content/blog/adding-copy-markdown-button-in-mdx-content.mdx?collection=blogPosts"), "blog-portfolio-refresh-2024.mdx": () => import("../content/blog/blog-portfolio-refresh-2024.mdx?collection=blogPosts"), "implement-auth-js-in-next-js-app.mdx": () => import("../content/blog/implement-auth-js-in-next-js-app.mdx?collection=blogPosts"), "july-update-2025.mdx": () => import("../content/blog/july-update-2025.mdx?collection=blogPosts"), "pokemon-api-mcp-server.mdx": () => import("../content/blog/pokemon-api-mcp-server.mdx?collection=blogPosts"), "prefix-sum.mdx": () => import("../content/blog/prefix-sum.mdx?collection=blogPosts"), "shopify-ui-extension.mdx": () => import("../content/blog/shopify-ui-extension.mdx?collection=blogPosts"), "socket-programming.mdx": () => import("../content/blog/socket-programming.mdx?collection=blogPosts"), }),
};
export default browserCollections;