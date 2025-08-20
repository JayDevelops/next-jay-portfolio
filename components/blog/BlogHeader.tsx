import { SimplifiedBlogPost } from "@/lib/strapiTypes";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import KofiButton from "./KofiButton";

interface BlogHeaderProps {
  post: SimplifiedBlogPost;
  readingTime: number;
}

export function BlogHeader({ post, readingTime }: BlogHeaderProps) {
  const publishedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{publishedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
          {post.author && (
            <div className="flex items-center gap-2">
              <span>{post.author.name}</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>

        <p className="text-lg text-muted-foreground">{post.description}</p>

        <div className="space-y-4">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={`tag-${tag}`} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <KofiButton className="inline-block md:hidden" />
        </div>
      </div>
    </header>
  );
}
