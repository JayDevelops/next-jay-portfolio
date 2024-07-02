"use client";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {NewspaperIcon, SearchCode} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {allPosts} from "content-collections";
import Link from "next/link";

export default function SearchModal() {
    const [open, setOpen] = useState<boolean>(false);


    const handleButtonClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <Button variant="outline" className="text-muted-foreground" onClick={handleButtonClick}>
                <span className="hidden lg:inline-flex">
                    Search my site...
                </span>
                <span className="inline-flex lg:hidden">
                    Search...
                </span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type a command or search..."
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Blog Posts">
                        {allPosts.map((post, index) => (
                            <Link href={`/blog/${post.url}`} key={index}>
                                <CommandItem>
                                    <NewspaperIcon className="mr-2 h-4 w-4" />
                                    <span>{post.title}</span>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

// function SearchInput({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {
//     return (
//         <CommandDialog open={open} onOpenChange={setOpen}>
//             <CommandInput placeholder="Type a command or search..." />
//             <CommandList>
//                 <CommandEmpty>No results found.</CommandEmpty>
//                 <CommandGroup heading="Suggestions">
//                     <CommandItem>Calendar</CommandItem>
//                     <CommandItem>Search Emoji</CommandItem>
//                     <CommandItem>Calculator</CommandItem>
//                 </CommandGroup>
//             </CommandList>
//         </CommandDialog>
//     )
// }