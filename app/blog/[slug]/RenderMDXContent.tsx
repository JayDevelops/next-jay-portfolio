/*
 * RenderMDXContent is responsible to display the middle MDX content section being rendered in blog/[slug]/page.tsx
 */
import { JSXElementConstructor, ReactElement } from "react";

type RenderMDXContentProps = {
  title: string;
  description: string;
  date: string;
  index: number;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

export default function RenderMDXContent({
  title,
  description,
  date,
  index,
  content,
}: RenderMDXContentProps) {
  return (
    <div className="px-4 md:px-auto">
      <div className="space-y-4 mb-4 md:mb-8">
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-sm">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <h1 className="scroll-m-20 text-2xl md:text-xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-sm md:text-base">
          TLDR: {description}
        </p>
      </div>

      <article className="prose prose-sm md:prose-base dark:prose-invert min-w-full mt-4 mb-4">
        {content}
      </article>

      <div className="space-y-4">
        <p className="leading-7 [&:not(:first-child)]:mt-6">{index}</p>
      </div>
    </div>
  );
}
