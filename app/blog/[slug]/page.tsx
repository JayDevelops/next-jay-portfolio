import {allPosts} from "content-collections";
import MainBlogContent from "@/app/blog/[slug]/MainBlogContent";
import {notFound} from "next/navigation";

type PostProps = {
    params: {
        slug: string,
    }
}

export default function BlogPage({ params }: PostProps) {
    const post = allPosts.find((p) => p._meta.path === params.slug);

    if (post) {
        return notFound()
    }

    return (
        <>
            <MainBlogContent post={post!} />
        </>
    )
}

//  generate static pages for each of our matched post page
export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post._meta.path
    }))
}

export const generateMetadata = ({ params }: PostProps) => {
    const post = allPosts.find((p) => p._meta.path === params.slug)

    if (!post) {
        return null
    }

    return {
        title: post.title,
        description: post.summary,
    }
}

export const dynamicParams = false;