import {Post} from "content-collections";
import HeroSection from "@/components/HeroSection";
import {allPosts} from "content-collections";
import PostCard from "@/app/blog/PostCard";


const subTitles: string[] = [
    "Tech",
    "Next.js",
    "Web Development",
    "My Life"
]

export default function Blog() {
    return (
        <div className="container space-y-3">
            <div className="flex justify-center mx-2 ">
                <HeroSection mainTitle="Welcome to my Blog!" startSubtitle="I write about" subTitles={subTitles}/>
            </div>

            <div className="my-4 grid md:grid-cols-3">
                {allPosts.map((post: Post, index: number) => (
                    <PostCard key={index} post={post} />
                ))}
            </div>
        </div>
    )
}