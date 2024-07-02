import { type Post } from "content-collections";

export type PostTypes = Pick<
    Post,
    "title" | "summary" | "date" | "tags" | "url" | "readingTime" | "_meta"
>