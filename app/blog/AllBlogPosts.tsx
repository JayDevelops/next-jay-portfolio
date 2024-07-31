"use client"
import ToggleListCardViewButtons from "@/app/blog/ToggleListCardViewButtons";
import {BlogPost} from "@/utils/blogMdxUtils";
import Link from "next/link";
import {useState} from "react";
import PostCard from "@/app/blog/PostCard";
import {AnimatePresence, motion} from "framer-motion";

export default function AllBlogPosts({sortedBlogs} : {sortedBlogs: BlogPost[]}) {
    //  by default, we will be showing the list view, otherwise we will show the card view
    const [toggleCard, setToggleCard] = useState<boolean>(false)

    return (
        <section className="w-[450px] lg:w-[1100px] px-8">
            <div className="justify-between flex">
                <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                    My Thoughts
                </h1>
                <div>
                    <ToggleListCardViewButtons toggleCard={toggleCard} setToggleCard={setToggleCard} />
                </div>
            </div>
            <AnimatePresence>
                {toggleCard ? (
                    <PostCard sortedBlogs={sortedBlogs} />
                ): (
                    <ListView sortedBlogs={sortedBlogs} />
                )}
            </AnimatePresence>
        </section>
    );
}
export function ListView({sortedBlogs} : {sortedBlogs: BlogPost[]}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -10
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                y: -5
            }}
        >
            {sortedBlogs.map((post) => (
                <Link
                    key={post.slug}
                    className="flex flex-col space-y-8 mb-6"
                    href={`/blog/${post.slug}`}
                >
                    <div className="w-full flex flex-col">
                        <p
                            className="text-secondary-foreground hover:text-primary tracking-tight text-lg transition-colors"
                        >
                            {post.metadata.title}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            {(new Date(post.metadata.date).toDateString())}
                        </p>
                    </div>
                </Link>
            ))}
        </motion.div>
    )
}