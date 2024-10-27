"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/Typography/Text";
import { CalendarDaysIcon } from "lucide-react";
import { PostTags } from "@/components/PostTags";
import { Post } from "@/utils/renderMdxUtils";
import { motion } from "framer-motion";
import { ProjectLinks } from "@/app/projects/ProjectLinks";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ContentCardProps {
    contentItems: Post[];
    cardType: "blog" | "projects",
    className?: string,
}

export default function ContentCard({ contentItems, cardType, className}: ContentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={className}
        >
            {contentItems.map((post: Post) => (
                <article className="p-4" key={post.slug}>
                    <Card className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 border-opacity-30">
                        <CardHeader>
                            {post.metadata.thumbnail && (
                                <Image
                                    src={post.metadata.thumbnail}
                                    alt={`${post.metadata.title} thumbnail`}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto rounded"
                                    priority={true} // Optional: consider using priority for critical images
                                />
                            )}
                            <CardTitle className="group-hover:text-primary group/link">
                                {post.metadata.title}
                            </CardTitle>
                            <div
                                className="flex items-center text-xs font-thin text-muted-foreground text-left space-x-1 mt-2"
                            >
                                <CalendarDaysIcon className="w-3 h-3" />
                                <span>{post.metadata.date}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <Text variant="small">{post.metadata.description}</Text>
                        </CardContent>
                        <div className="pb-4 px-4">
                            <PostTags tags={post.metadata.tags} className="pl-2 space-x-2"/>

                            {cardType === "projects" && <ProjectLinks post={post} />}
                            {cardType === "blog" && (
                                <Button variant="outline" className="mt-6" asChild>
                                   <Link href={`/blog/${post.slug}`}>
                                       Read More
                                   </Link>
                                </Button>
                            )}
                        </div>
                    </Card>
                </article>
            ))}
        </motion.div>
    );
}
