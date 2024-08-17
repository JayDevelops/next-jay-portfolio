import { getAllContent } from "@/utils/blogMdxUtils";
import { Post } from "@/utils/blogMdxUtils";
import AllBlogPosts from "@/app/blog/AllBlogPosts";


export default async function Blog() {
    const blogDirectory = "/posts";
    let allBlogs: Post[] = await getAllContent(blogDirectory);

    if (!allBlogs) {
        return (
            <p>no blog posts found</p>
        )
    }

    //  Pass our sorted blogs to render in our AllBlogPosts parent component
    const sortedBlogs: Post[] = allBlogs.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return (
        <AllBlogPosts sortedBlogs={sortedBlogs} />
    )
}