"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import KofiButton from "./KofiButton";
import { CopyPageSource } from "../CopyPageSource";
import { TOCItemType } from "fumadocs-core/toc";

interface TableOfContentsProps {
  toc: TOCItemType[];
  scrollOffset?: number;
  rawSource?: string;
}

function toId(url: string) {
  // "#my-heading" -> "my-heading"
  const cleaned = url.replace(/^#/, "");
  return cleaned;
}

export function TableOfContents({
  toc,
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
      { rootMargin: "0% 0% -40% 0%" },
    );

    const headingElements = toc
      .map((item) => document.getElementById(toId(item.url)))
      .filter((el): el is HTMLElement => Boolean(el));

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.offsetTop - scrollOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-16">
      <h3 className="font-semibold mb-4">Table of Contents</h3>
      <div className="space-y-4">
        <ul className="space-y-2 text-sm">
          {toc.map((item) => {
            const id = toId(item.url);
            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  onClick={(e) => handleClick(e, id)}
                  className={cn(
                    "block py-1 transition-colors hover:text-primary cursor-pointer",
                    item.depth === 2 && "pl-0",
                    item.depth === 3 && "pl-4",
                    item.depth === 4 && "pl-8",
                    item.depth === 5 && "pl-12",
                    activeId === id
                      ? "text-primary font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <KofiButton />
        {rawSource && <CopyPageSource rawSource={rawSource} />}
      </div>
    </nav>
  );
}
