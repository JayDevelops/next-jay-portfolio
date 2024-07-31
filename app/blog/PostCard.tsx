"use client"
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Text} from "@/components/ui/Typography/Text";
import {CalendarDaysIcon} from "lucide-react";
import {PostTags} from "@/components/PostTags";
import {BlogPost} from "@/utils/blogMdxUtils";
import { motion } from "framer-motion";

export default function PostCard({sortedBlogs} : {sortedBlogs: BlogPost[]}) {
    return (
        <motion.div
            className="grid grid-cols-3"
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
            {sortedBlogs.map((post: BlogPost) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative transition-transform duration-300 ease-in-out hover:scale-[1.02]">
                    <article className="p-4">
                        <Card className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 hover:border-primary border-opacity-30">
                            <CardHeader>
                                <CardTitle className="group-hover:text-primary group/link">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Text variant="small">{post.description}</Text>
                            </CardContent>
                            <CardFooter className="flex items-center gap-2 text-muted-foreground font-light text-xs">
                                <CalendarDaysIcon className="w-4 h-4"/>{' '}{post.date}
                            </CardFooter>
                            <div className="px-4 pb-2">
                                <PostTags tags={post.tags} />
                            </div>
                        </Card>
                    </article>
                </Link>
            ))}
        </motion.div>
    )
}