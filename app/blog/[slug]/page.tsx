import { allPosts } from "content-collections";
import Markdown from "react-markdown";
import {HeadingOne} from "@/components/ui/Typography/Headers";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/Typography/Text";
import {ArrowBigRight} from "lucide-react";

export default function Post({ params }: { params: { slug: string } }) {
    const {slug} = params
    const post = allPosts.find((post) => post._meta.path === slug);

    console.log(slug)

    if (!post) {
        return (
            <div className="space-y-3">
                <HeadingOne>Post Not Found</HeadingOne>
                <Text>
                    The requested blog article is not found or no longer available.
                </Text>
                <Text>
                    Please click on the button below to navigate to all my other available posts :)
                </Text>
                <Button asChild>
                    <Link href="/blog">
                        Main Blog <ArrowBigRight />
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <article className="prose lg:prose-xl dark:prose-invert">
            <h1>{post.title}</h1>
            <Markdown>{post.content}</Markdown>
        </article>
    )
}