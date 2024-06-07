import {allPosts} from "content-collections";
import BlogArticleNotFound from "@/app/blog/[slug]/not-found";
import MainBlogContent from "@/app/blog/[slug]/MainBlogContent";
import {PostProps} from "@/lib/postProps";

export default function Post({ params }: { params: { slug: string } }) {
    //  Grab the requested slug and find that post in our post-collection
    const {slug} = params
    const post = allPosts.find((post) => post._meta.path === slug);

    //  If no post found return our not found
    if (!post) {
        return BlogArticleNotFound()
    }

    return (
        <div className="container mx-auto grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
            <MainBlogContent post={post} />
        </div>
    )
}

export function generateHeadings({post}: PostProps) {
    return (
        <div>
            {post.content}
        </div>
    )
}