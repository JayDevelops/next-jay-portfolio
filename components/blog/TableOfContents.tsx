"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import KofiButton from "./KofiButton";
import { CopyPageSource } from "../CopyPageSource";

interface Heading {
  depth: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  scrollOffset?: number;
  rawSource?: string;
}

export function TableOfContents({
  headings,
  scrollOffset = 100,
  rawSource,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -40% 0%" }
    );

    const headingElements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter(Boolean);

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(slug);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without triggering default scroll
      window.history.pushState(null, "", `#${slug}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-16">
      <h3 className="font-semibold mb-4">Table of Contents</h3>
      <div className="space-y-4">
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                onClick={(e) => handleClick(e, heading.slug)}
                className={cn(
                  "block py-1 transition-colors hover:text-primary cursor-pointer",
                  heading.depth === 2 && "pl-0",
                  heading.depth === 3 && "pl-4",
                  heading.depth === 4 && "pl-8",
                  heading.depth === 5 && "pl-12",
                  activeId === heading.slug
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
        <KofiButton />
        {rawSource && <CopyPageSource rawSource={rawSource} />}
      </div>
    </nav>
  );
}
