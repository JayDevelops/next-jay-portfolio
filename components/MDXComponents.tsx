/*
 * MDXComponents pass custom react components to our .mdx files as they cannot render without these references.
 */
import React from "react";
import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import { highlight } from "sugar-high";
import Link from "next/link";
import Image from "next/image";

export function MDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ ...props }) => <Heading level={1} {...props} />,
    h2: ({ ...props }) => <Heading level={2} {...props} />,
    h3: ({ ...props }) => <Heading level={3} {...props} />,
    h4: ({ ...props }) => <Heading level={4} {...props} />,
    h5: ({ ...props }) => <Heading level={5} {...props} />,
    h6: ({ ...props }) => <Heading level={6} {...props} />,
    a: ({ children, href }) => (
      <a href={href} className="text-primary">
        {children}
      </a>
    ),
    Link: ({ children, external, href, target }) => (
      <Link
        href={href}
        className="text-muted-foreground hover:text-primary/90 transition-colors"
        target={external ? "_blank" : target}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    ),
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    Button: ({ ...props }) => <Button {...props} />,
    code: (props) => <Code {...props} />,
    pre: ({ children, ...props }) => <Pre {...props}>{children}</Pre>,
    Image: ({ alt, ...props }) => <Image alt={alt} {...props} />,
    ...components,
  };
}

const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  ...props
}) => {
  return (
    <pre
      className="overflow-x-auto max-w-full text-sm bg-muted p-4 rounded-md border whitespace-pre-wrap break-words sm:whitespace-pre"
      {...props}
    >
      {children}
    </pre>
  );
};

interface CodeProps {
  children?: React.ReactNode;
  [key: string]: any;
}

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const codeString = React.Children.toArray(children).join("").toString();
  const codeHTML = highlight(codeString);

  return (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-full overflow-x-auto inline-block"
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  );
};

//  Inspired by leerob.io blog refresh where he slugged headings with the link attached
const Heading = ({
  level,
  children,
  ...props
}: { level: number } & React.HTMLAttributes<HTMLHeadingElement>) => {
  //	grab the children inside the markdown html file to slugify that text such as `## Section One ` turns to section-two
  const slug = slugify(children?.toString() ?? "");

  return React.createElement(
    `h${level}`,
    { id: slug, ...props },
    React.createElement(
      "a",
      {
        href: `#${slug}`,
        className: "no-underline hover:underline",
      },
      children
    )
  );
};

function slugify(str: React.ReactNode) {
  return str!
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
