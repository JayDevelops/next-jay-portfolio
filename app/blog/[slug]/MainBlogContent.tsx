import {HeadingOne} from "@/components/ui/Typography/Headers"
import {PostProps} from "@/lib/postProps"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Markdown from "react-markdown";
import {cn} from "@/lib/utils";

export default function MainBlogContent({ post }: PostProps) {
    return (
        <article className={cn(
            "prose lg:prose-xl dark:prose-invert"
        )}>
            <div className="space-y-4">
                <HeadingOne >
                    {post.title}
                </HeadingOne>

                <AuthorSection date={post.date} />
            </div>

            <div className="space-y-6">
                <p className="text-sm md:text-base text-primary-foreground/70">Summary: {' '}{post.summary}</p>
                <Markdown>{post.content}</Markdown>
            </div>
        </article>
    )
}

export function AuthorSection({ date }: {date: string}) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>

                <span className="text-sm font-medium" itemProp="name">Jesus Perez</span>
            </div>

            <span className="text-sm text-secondary-foreground/70">{date}</span>
        </div>
    )
}