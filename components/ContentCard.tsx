"use client"
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/Typography/Text";
import { CalendarDaysIcon } from "lucide-react";
import { PostTags } from "@/components/PostTags";
import { Post } from "@/utils/renderMdxUtils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
    contentItems: Post[];
    cardType: "blog" | "projects",
    className?: string,
}

export default function ContentCard({ contentItems, cardType, className}: ContentCardProps) {

    if (cardType == "blog") {
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
                className={className}
            >
                {contentItems.map((post: Post) => (
                    <Link
                        key={post.slug}
                        href={`blog/${post.slug}`}
                        className="group relative transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                    >
                        <article className="p-4">
                            <Card
                                className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 border-opacity-30">
                                <CardHeader>
                                    <CardTitle className="group-hover:text-primary group/link">
                                        {post.metadata.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    <Text variant="small">{post.metadata.description}</Text>
                                </CardContent>
                                <CardFooter
                                    className="flex items-center gap-2 text-muted-foreground font-light text-xs">
                                    <CalendarDaysIcon className="w-4 h-4"/>{' '}{post.metadata.date}
                                </CardFooter>
                                <PostTags tags={post.metadata.tags} className="px-4 pb-4 space-x-2"/>
                            </Card>
                        </article>
                    </Link>
                ))}
            </motion.div>
        )
    }

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
            {contentItems.map((post: Post) => (
                <article className="p-4" key={post.slug}>
                    <Card
                        className="shadow-secondary group-hover:shadow-md group-hover:shadow-primary py-2 border-opacity-30">
                        <CardHeader>
                            <CardTitle className="group-hover:text-primary group/link">
                                {post.metadata.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <Text variant="small">{post.metadata.description}</Text>
                        </CardContent>
                        <CardFooter className="flex items-center gap-2 text-muted-foreground font-light text-xs">
                            <CalendarDaysIcon className="w-4 h-4"/>{' '}{post.metadata.date}
                        </CardFooter>
                        <div className="pb-4 px-4">
                            <div className="flex space-x-4 py-4">
                                {post.metadata.githubLink ? (
                                    <Button asChild variant="outline">
                                        <Link href={post.metadata.githubLink} target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </Link>
                                    </Button>
                                ) : null}
                                {post.metadata.liveLink && (
                                    <Button asChild variant="outline">
                                        <Link href={post.metadata.liveLink} target="_blank" rel="noopener noreferrer">
                                            Live Demo
                                        </Link>
                                    </Button>
                                )}
                            </div>
                            <PostTags tags={post.metadata.tags} className="space-x-2"/>
                        </div>
                    </Card>
                </article>
            ))}
        </motion.div>
    )
}