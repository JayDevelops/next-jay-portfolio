import {HeadingOne} from "@/components/ui/Typography/Headers"
import {Text} from "@/components/ui/Typography/Text"
import { Post } from "content-collections";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Markdown from "@/components/Markdown";
import {cn} from "@/lib/utils";
import {Card} from "@/components/ui/card";
import DateTime from "@/components/DateTime";

type PostProps = {
    post: Post
}
export default function MainBlogContent({ post }: PostProps) {
    return (
        <>
            <HeadingOne>{post.title}</HeadingOne>

            <div>
                <div className="my-2 flex justify-between text-xs text-muted-foreground">
                    <Text>{post.readingTime}</Text>
                    <DateTime value={post.date} title="Posted at"/>
                </div>
                <Text className="text-xs md:text-base text-secondary-foreground/70">TLDR: {' '}{post.summary}</Text>
            </div>

            <Markdown code={post.content.mdx}/>
        </>
    )
}

export function AuthorSection({date}: { date: string }) {
    return (
        <Card className="flex items-center space-x-4 p-4 border-primary/70">
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium" itemProp="name">Jesus Perez</span>
            </div>
            <span className="text-sm text-secondary-foreground/70">{date}</span>
        </Card>
    )
}