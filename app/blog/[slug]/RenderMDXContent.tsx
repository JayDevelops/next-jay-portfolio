/*
* RenderMDXContent is responsible to display the middle MDX content section being rendered in blog/[slug]/page.tsx
*/
import { JSXElementConstructor, ReactElement } from "react";

type RenderMDXContentProps = {
    title: string,
    description: string,
    date: string,
    index: number,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

export default function RenderMDXContent({ title, description, date, index, content } : RenderMDXContentProps)  {
    return (
        <>
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
                    {title}
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Description:{' '}{description}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {new Date(date).toDateString()}
                </p>
            </div>

            <article className="prose dark:prose-invert min-w-full mt-4 mb-4">
                {content}
            </article>

            <div className="space-y-4">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {index}
                </p>
            </div>
        </>
    )
}