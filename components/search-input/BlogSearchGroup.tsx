"use client";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import Link from "next/link";
import { NewspaperIcon } from "lucide-react";

export default function BlogSearchGroup({
  blogs,
  handleSelect,
}: {
  blogs: any;
  handleSelect: (href: string) => void;
}) {
  return (
    <CommandGroup heading="Blog Posts">
      {blogs?.map((blog: any) => (
        <CommandItem
          className="hover:cursor-pointer"
          onSelect={() => handleSelect(`/blog/${blog.slug}`)}
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
