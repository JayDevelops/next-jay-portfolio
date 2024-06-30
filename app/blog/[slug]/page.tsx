import {allPosts} from "content-collections";
import BlogArticleNotFound from "@/app/blog/[slug]/not-found";
import MainBlogContent from "@/app/blog/[slug]/MainBlogContent";
import "@code-hike/mdx/dist/index.css";

type PostProps = {
    params: {
        slug: string,
    }
}

export default function Post({ params }: { params: { slug: string } }) {
    const post = allPosts.find((post) => post._meta.path === params.slug)

    if (!post) {
        return <BlogArticleNotFound />
    }

    return (
        <div className="px-8">
            <MainBlogContent post={post}/>
        </div>
    )
}

//  generate static pages for each of our matched post page
export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post._meta.path
    }));
}

export function generateMetadata({ params }: PostProps) {
    const post = allPosts.find((p) => p._meta.path === params.slug);

    if (!post) {
        return
    }

    return {
        title: post.title,
        description: post.summary,
    }
}

export const dynamicParams = false;