import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import type { BlogPage } from "@/lib/source";
import type { BlogData } from "@/lib/source";

interface BlogCardProps {
  post: BlogPage;
}

export function BlogCard({ post }: BlogCardProps) {
  // cast data with specific blog data types
  const data = post.data as BlogData;
  const { title, description, date, author } = data;

  // handle dates and read time
  const publishedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateTime = new Date(date).toISOString();
  const readingTime: string = data._exports?.readingTime ?? "no reading time";

  return (
    <Link href={post.url} className="group block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
        {/* {post.thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.thumbnail.url || "/placeholder.svg"}
              alt={post.thumbnail.alternativeText || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )} */}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0" />
              <time dateTime={dateTime}>{publishedDate}</time>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{readingTime}</span>
              </div>
            )}
          </div>

          <h2 className="mb-2 text-xl font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h2>

          <p className="mb-4 text-muted-foreground line-clamp-3">
            {description}
          </p>

          {author && (
            <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-muted-foreground">
              <User className="h-4 w-4 shrink-0" />
              <span>By {author}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
