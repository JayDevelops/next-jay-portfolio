import { getAllBlogPosts } from "@/utils/blogMdxUtils";
import { BlogPost } from "@/utils/blogMdxUtils";
import AllBlogPosts from "@/app/blog/AllBlogPosts";


export default async function Blog() {
    let allBlogs: BlogPost[] = await getAllBlogPosts();

    if (!allBlogs) {
        return (
            <p>no blog posts found</p>
        )
    }

    //  Pass our sorted blogs to render in our AllBlogPosts parent component
    const sortedBlogs: BlogPost[] = allBlogs.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return (
        <AllBlogPosts sortedBlogs={sortedBlogs} />
    )
}