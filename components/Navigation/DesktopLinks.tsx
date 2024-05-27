import {usePathname} from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {menuLinks} from "@/components/Navigation/MenuLinks";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function DesktopLinks() {
    //  Grabs the currentPath the user is on to color in the active NavigationMenuLink
    const currentPath = usePathname()

    return (
        <NavigationMenu className="ml-3 flex items-center gap-2 text-sm lg:gap-4 list-none">
            {menuLinks.map((item, index) => (
                <NavigationMenuItem key={`menu-link-${index}`} className="text-secondary-foreground">
                    <Link href={item.path} legacyBehavior passHref>
                        <NavigationMenuLink
                            className={cn({
                                    'text-secondary-foreground': item.path === currentPath,
                                    'text-muted-foreground': item.path !== currentPath,
                                    'transition-colors': true,
                                },
                                navigationMenuTriggerStyle()
                            )}
                        >
                            {item.title}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}
        </NavigationMenu>
    )
}