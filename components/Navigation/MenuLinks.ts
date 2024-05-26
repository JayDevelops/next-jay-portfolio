import React, {ForwardRefExoticComponent, RefAttributes} from "react";
import {InstagramLogoIcon} from "@radix-ui/react-icons";
import {IconProps} from "@radix-ui/react-icons/dist/types";

interface MenuLink {
    title: string,
    path: string,
}

interface SocialMediaLink extends MenuLink{
    icon?: any,
}

export const menuLinks: MenuLink[] = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "Blog", path: "/blog" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
]
