import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Text} from "@/components/ui/Typography/Text";
import {CalendarDaysIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {PostProps} from "@/lib/postProps";

export default function PostCard({ post }: PostProps) {
    const postRoute: string = `/blog/${post._meta.path}`

    return (
        <Link href={postRoute} className="transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <article className="p-4">
                <Card className="shadow-secondary hover:shadow-lg hover:shadow-primary py-2 hover:border-primary">
                    <CardHeader>
                        <CardTitle>
                            {post.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Text variant="small">{post.summary}</Text>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2">
                        <CalendarDaysIcon className="w-4 h-4"/>{post.date}
                    </CardFooter>
                    <PostTags tags={post.tags} className="pb-4 px-4"/>
                </Card>
            </article>
        </Link>
    )
}

export function PostTags({ tags, className}: {tags: string[], className?: string}) {
    return (
        <div className={cn(
            "flex flex-row flex-wrap gap-1", className
        )}>
            {tags.map((tag: string, index: number) => (
                <span
                    key={`tag-${index}`}
                    className={cn(
                        "w-fit whitespace-nowrap rounded px-2 py-1",
                        "bg-secondary text-secondary-foreground"
                    )}
                >
                    {tag}
                </span>
            ))}
        </div>
    )
}