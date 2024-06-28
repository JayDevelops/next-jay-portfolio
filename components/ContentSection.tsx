/*
* Wraps the main text content section with the following prose rules so prose does the styling automatically.
* See https://github.com/tailwindlabs/tailwindcss-typography for more information.
*
* */
import {cn} from "@/lib/utils";
import {ReactNode} from "react";

type ContentProps = {
    children: ReactNode,
}

export default function ContentSection({children}: ContentProps) {
    return (
        <section
            className={cn(
                "prose prose-base dark:prose-invert",
                // "prose-code:rounded prose-code:border prose-code:px-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
                "dark:prose-code:border-primary/40 dark:prose-code:text-primary/10",
                "hover:prose-a:decoration-primary/30 hover:prose-a:decoration-2"
            )}
        >
            {children}
        </section>
    )
}