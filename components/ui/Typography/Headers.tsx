import { PropsWithChildren } from "react"

export type HeadingVariantProps = PropsWithChildren<{
    color?:
        | "primary"
        | "muted"
        | "muted-foreground"
        | "secondary"
        | "secondary-foreground"
        | "primary-foreground"
        | "accent"
        | "accent-foreground";
    className?: string;
}>

// Map color variant to corresponding Tailwind CSS class
export const colorClass = {
    primary: "text-primary",
    muted: "text-muted",
    "muted-foreground": "text-muted-foreground",
    secondary: "text-secondary",
    "secondary-foreground": "text-secondary-foreground",
    "primary-foreground": "text-primary-foreground",
    accent: "text-accent",
    "accent-foreground": "text-accent-foreground",
}


export function HeadingOne({ children, color = "secondary-foreground", className = "" }: HeadingVariantProps) {
    // If the passed children react node is falsy (empty), then return nothing
    if (!children) return null;

    const colorClassValue = colorClass[color];

    return (
        <h1
            className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl ${colorClassValue} ${className}`}
        >
            {children}
        </h1>
    );
}

export function HeadingTwo({ children, color = "secondary-foreground", className = "" }: HeadingVariantProps) {
    // If the passed children react node is falsy (empty), then return nothing
    if (!children) return null;

    const colorClassValue = colorClass[color];

    return (
        <h2
            className={`scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 ${colorClassValue} ${className}`}
        >
            {children}
        </h2>
    )
}

export function HeadingThree({ children, color = "secondary-foreground", className = "" }: HeadingVariantProps) {
    // If the passed children react node is falsy (empty), then return nothing
    if (!children) return null;

    const colorClassValue = colorClass[color]

    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${colorClassValue} ${className}`}>
            {children}
        </h3>
    )
}

export function HeadingFour({ children, color = "secondary-foreground", className = "" }: HeadingVariantProps) {
    // If the passed children react node is falsy (empty), then return nothing
    if (!children) return null;

    const colorClassValue = colorClass[color]

    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${colorClassValue} ${className}`}>
            {children}
        </h4>
    )
}


export function HeadingFive({ children, color = "secondary-foreground", className = "" }: HeadingVariantProps) {
    // If the passed children react node is falsy (empty), then return nothing
    if (!children) return null;

    const colorClassValue = colorClass[color]

    return (
        <h4 className={`scroll-m-20 text-base font-semibold tracking-tight ${colorClassValue} ${className}`}>
            {children}
        </h4>
    )
}