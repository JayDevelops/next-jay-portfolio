"use client"
import Link from "next/link";
import ModeToggle from "@/components/ui/ToggleMode";
import {DesktopLinks} from "@/components/Navigation/DesktopLinks";

export default function Navigation() {

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Link href="/" className="text-primary text-3xl">
                    <h1 className="text-primary text-3xl">
                        JP
                    </h1>
                </Link>

                <div className="mr-4 hidden md:flex">
                    <DesktopLinks />
                </div>

                {/* Right Side of the Navigation Menu */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none"/>
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}

// export function RightNavLinks() {
//     return (
//         <NavigationMenu className="ml-3 flex items-center gap-2 text-sm lg:gap-4 list-none">
//             {socialMediaLinks.map((socialLink, index) => (
//                 <NavigationMenuLink key={`social-link-${index}`}>
//                     <Link href={socialLink.path} target="_blank" legacyBehavior passHref>
//                         <NavigationMenuLink>
//                             {socialLink.icon}
//                         </NavigationMenuLink>
//                     </Link>
//                 </NavigationMenuLink>
//             ))}
//         </NavigationMenu>
//     )
// }