import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Project = GetTypeByName<typeof configuration, "projects">;
export declare const allProjects: Array<Project>;

export {};
