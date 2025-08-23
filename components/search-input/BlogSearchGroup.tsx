"use client";
import { SimplifiedBlogPost } from "@/lib/strapiTypes";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import Link from "next/link";
import { NewspaperIcon } from "lucide-react";

export default function BlogSearchGroup({
  blogs,
  handleSelect,
}: {
  blogs: SimplifiedBlogPost[] | undefined;
  handleSelect: (href: string) => void;
}) {
  return (
    <CommandGroup heading="Blog Posts">
      {blogs?.map((blog) => (
        <CommandItem
          className="hover:cursor-pointer"
          onSelect={() => handleSelect(`${blog.slug}`)}
          key={blog.slug}
          asChild
        >
          <Link href={`/blog/${blog.slug}`}>
            <NewspaperIcon className="mr-2 h-4 w-4" />
            {blog.title}
          </Link>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
