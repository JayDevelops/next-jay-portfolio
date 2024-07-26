import {getAllBlogPosts} from "@/utils/blogMdxUtils";
import Link from "next/link";
import {BlogPost} from "@/utils/blogMdxUtils";


export default async function Blog() {
    let allBlogs: BlogPost[] = await getAllBlogPosts();

    if (!allBlogs) {
        return (
            <p>no blog posts found</p>
        )
    }

    return (
        <section className="w-[450px] lg:w-[1100px] px-8">
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                My Thoughts
            </h1>
            {allBlogs
                .sort((a, b) => {
                    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
                })
                .map((post: BlogPost) => (
                    <Link
                        key={post.slug}
                        className="flex flex-col space-y-8 mb-4"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-col">
                            <p className="text-primary-foreground tracking-tight text-lg">
                                {post.metadata.title}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                {(new Date(post.metadata.date).toDateString())}
                            </p>
                        </div>
                    </Link>
                ))}
        </section>
    );
}