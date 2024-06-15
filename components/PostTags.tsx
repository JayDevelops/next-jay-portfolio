import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

export function PostTags({tags, className}: { tags: string[], className?: string }) {
    return (
        <div className={cn(
            "relative flex flex-row space-x-2", className
        )}>
            {tags.map((tag: string, index: number) => (
                <Badge
                    key={`tag-${index}`}
                    className="rounded-lg"
                    variant="tag"
                >
                    {tag}
                </Badge>
            ))}
        </div>
    )
}