"use client";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {File, NewspaperIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { allPosts } from "content-collections";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuLinks } from "@/components/Navigation/MenuLinks";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function SearchModal() {
    const [open, setOpen] = useState<boolean>(false);
    const pathName = usePathname()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    const handleSelect = (href: string) => {
        setOpen(false)
        window.location.href = href;
    }

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="px-4 py-2 relative h-10 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
                <span className="hidden lg:inline-flex">
                    Search my site...
                </span>
                <span className="inline-flex lg:hidden">
                    Search...
                </span>
                <kbd className="pointer-events-none absolute right-[0.4rem] top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle>
                    <VisuallyHidden>Search Dialog</VisuallyHidden>
                </DialogTitle>
                <DialogDescription>
                    <VisuallyHidden>Search my site...</VisuallyHidden>
                </DialogDescription>
                <CommandInput
                    placeholder="Type a command or search..."
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Blog Posts">
                        {allPosts.filter(post => `${post.url}` !== pathName).map((post) => (
                            <CommandItem
                                asChild
                                key={post.url}
                                value={post.title}
                                onSelect={() => handleSelect(`${post.url}`)}
                                className="hover:cursor-pointer"
                            >
                                <Link href={`${post.url}`}>
                                    <NewspaperIcon className="mr-2 h-4 w-4" />
                                    {post.title}
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Main Pages">
                            {menuLinks.filter((link) => link.path !== pathName).map((link) => (
                                <CommandItem
                                    asChild
                                    key={link.path}
                                    value={link.title}
                                    onSelect={() => handleSelect(`${link.path}`)}
                                    className="hover:cursor-pointer"
                                >
                                    <Link href={`${link.path}`}>
                                        <File className="mr-2 h-4 w-4" />
                                        {link.title}
                                    </Link>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}