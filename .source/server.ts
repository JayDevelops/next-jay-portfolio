// @ts-nocheck
import * as __fd_glob_7 from "../content/blog/socket-programming.mdx?collection=blogPosts"
import * as __fd_glob_6 from "../content/blog/shopify-ui-extension.mdx?collection=blogPosts"
import * as __fd_glob_5 from "../content/blog/prefix-sum.mdx?collection=blogPosts"
import * as __fd_glob_4 from "../content/blog/pokemon-api-mcp-server.mdx?collection=blogPosts"
import * as __fd_glob_3 from "../content/blog/july-update-2025.mdx?collection=blogPosts"
import * as __fd_glob_2 from "../content/blog/implement-auth-js-in-next-js-app.mdx?collection=blogPosts"
import * as __fd_glob_1 from "../content/blog/blog-portfolio-refresh-2024.mdx?collection=blogPosts"
import * as __fd_glob_0 from "../content/blog/adding-copy-markdown-button-in-mdx-content.mdx?collection=blogPosts"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
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
}>({"doc":{"passthroughs":["extractedReferences","lastModified"]}});

export const blogPosts = await create.doc("blogPosts", "content/blog", {"adding-copy-markdown-button-in-mdx-content.mdx": __fd_glob_0, "blog-portfolio-refresh-2024.mdx": __fd_glob_1, "implement-auth-js-in-next-js-app.mdx": __fd_glob_2, "july-update-2025.mdx": __fd_glob_3, "pokemon-api-mcp-server.mdx": __fd_glob_4, "prefix-sum.mdx": __fd_glob_5, "shopify-ui-extension.mdx": __fd_glob_6, "socket-programming.mdx": __fd_glob_7, });