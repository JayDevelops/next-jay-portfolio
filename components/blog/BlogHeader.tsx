import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import KofiButton from "./KofiButton";
import { CopyPageSource } from "../CopyPageSource";
import { BlogData } from "@/lib/source";

interface BlogHeaderProps {
  pageData: BlogData;
  readingTime: string;
  rawText?: string;
}

export function BlogHeader({
  pageData,
  readingTime,
  rawText,
}: BlogHeaderProps) {
  const publishedDate = new Date(pageData.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateTime = new Date(pageData.date).toISOString();

  return (
    <header className="mb-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={dateTime}>{publishedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
          {pageData.author && (
            <div className="flex items-center gap-2">
              <span>{pageData.author}</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{pageData.title}</h1>

        <p className="text-lg text-muted-foreground">{pageData.description}</p>

        <div className="space-y-4">
          {/* {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={`tag-${tag}`} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )} */}
          <div className="md:hidden flex flex-row items-center gap-4">
            <KofiButton />
            {rawText && <CopyPageSource rawSource={rawText} />}
          </div>
        </div>
      </div>
    </header>
  );
}
