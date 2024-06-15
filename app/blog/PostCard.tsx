import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Text} from "@/components/ui/Typography/Text";
import {CalendarDaysIcon} from "lucide-react";
import {PostProps} from "@/lib/postProps";
import {PostTags} from "@/components/PostTags";

export default function PostCard({ post }: PostProps) {
    const postRoute: string = `/blog/${post._meta.path}`

    return (
        <Link href={postRoute} className="group relative transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <article className="p-4">
                <Card className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 hover:border-primary">
                    <CardHeader>
                        <CardTitle className="group-hover:text-primary group/link">
                            {post.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Text variant="small">{post.summary}</Text>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2">
                        <CalendarDaysIcon className="w-4 h-4"/>{post.date}
                    </CardFooter>
                    <PostTags tags={post.tags} className="pb-4 mx-4"/>
                </Card>
            </article>
        </Link>
    )
}