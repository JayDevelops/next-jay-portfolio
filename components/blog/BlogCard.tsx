import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { SimplifiedBlogPost } from "@/lib/strapiTypes";

export function BlogCard({ post }: { post: SimplifiedBlogPost }) {
  const publishedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        {post.thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.thumbnail.url || "/placeholder.svg"}
              alt={post.thumbnail.alternativeText || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={publishedDate}>{publishedDate}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge
                  key={`tag-${tag}`}
                  variant="secondary"
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {post.author && (
            <div className="flex items-center gap-1 mt-4">
              <User className="w-4 h-4" />
              <p className="text-muted-foreground">By {post.author.name}</p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
