"use client"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react";
type Heading = {
    depth: number,
    text: string,
    slug: string,
}

export default function TableOfContents({ headings }: {headings: Heading[]}) {
    //  Gets the current ID the user is currently on the article
    const [activeId, setActiveId] = useState<string>("");

    //  handleObserver tracks where the user is and will be updated in our useEffect to set the active id
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.map((entry) => {
            if(entry.isIntersecting) {
                setActiveId(entry.target.id)
            }
        });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: '0px 0px -80% 0px',
        });

        const headingElements = headings.map(heading => document.getElementById(heading.slug));

        headingElements.map(element => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headingElements.map((element) => {
                if(element) {
                    observer.unobserve
                }
            });
        }
    }, [headings, handleObserver]);

    if(!headings) {
        return (
            <p>
                No valid table of contents for this article.
            </p>
        );
    }

    return (
        <ul className="mt-2 space-y-2">
            {headings.map((heading: Heading) => (
                <li key={`${heading.depth}-${heading.slug}`}>
                    <Link
                        href={`#${heading.slug}`}
                        className={heading.slug === activeId ? "text-primary" : "text-secondary-foreground/70"}
                    >
                        {heading.text}
                    </Link>
                </li>
            ))}
        </ul>
    );
}