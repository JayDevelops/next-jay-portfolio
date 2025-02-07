"use client";
import ToggleListCardViewButtons from "@/app/blog/ToggleListCardViewButtons";
import { Post } from "@/utils/renderMdxUtils";
import Link from "next/link";
import { useState } from "react";
import ContentCard from "@/components/ContentCard";
import { AnimatePresence, motion } from "framer-motion";

export default function AllBlogPosts({ sortedBlogs }: { sortedBlogs: Post[] }) {
  //  by default, we will be showing the list view, otherwise we will show the card view
  const [toggleCard, setToggleCard] = useState<boolean>(false);

  return (
    <section className="w-[450px] lg:w-[1200px] p-4">
      <div className="justify-between flex">
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          My Thoughts
        </h1>
        <div>
          <ToggleListCardViewButtons
            toggleCard={toggleCard}
            setToggleCard={setToggleCard}
          />
        </div>
      </div>
      <AnimatePresence>
        {toggleCard ? (
          <ContentCard
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            contentItems={sortedBlogs}
            cardType="blog"
          />
        ) : (
          <ListView sortedBlogs={sortedBlogs} />
        )}
      </AnimatePresence>
    </section>
  );
}
export function ListView({ sortedBlogs }: { sortedBlogs: Post[] }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -5,
      }}
    >
      {sortedBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-8 mb-6"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-secondary-foreground hover:text-primary tracking-tight text-lg transition-colors">
              {post.metadata.title}
            </p>
            <p className="text-muted-foreground text-sm">
              {new Date(post.metadata.date).toDateString()}
            </p>
          </div>
        </Link>
      ))}
    </motion.div>
  );
}
