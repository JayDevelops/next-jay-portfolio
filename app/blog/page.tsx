import {AllPosts} from "@/app/blog/AllPosts";
import HeroSection from "@/components/HeroSection";


const subTitles: string[] = [
    "Tech",
    "Next.js",
    "Web Development",
    "My Life"
]

export default function Blog() {
    return (
        <div className="container-lg space-y-3 md:mx-12">
            <div className="flex justify-center">
                <HeroSection mainTitle="Welcome to my Blog!" startSubtitle="I write about" subTitles={subTitles} />
            </div>
            <AllPosts/>
        </div>
    )
}