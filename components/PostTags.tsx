import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

export function PostTags({tags, className}: { tags: string[], className?: string}) {
    return (
        <div className={cn(
            "flex flex-wrap gap-2",
            className
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