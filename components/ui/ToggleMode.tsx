"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ModeToggle() {
    const { theme, setTheme, systemTheme } = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme

    //  initially sets default theme to system, otherwise on click will toggle between light and dark mode
    const toggleTheme = () => {
        if (currentTheme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
        >
            {currentTheme === "light" ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all duration-100" />
            ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all duration-100" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
