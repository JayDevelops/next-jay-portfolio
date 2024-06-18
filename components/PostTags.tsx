import {Badge} from "@/components/ui/badge";

export function PostTags({tags}: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
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