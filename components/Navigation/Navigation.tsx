"use client";
import Link from "next/link";
import ModeToggle from "@/components/ui/ToggleMode";
import { DesktopLinks } from "@/components/Navigation/DesktopLinks";
import { useState } from "react";
import { MobileNavigation } from "@/components/Navigation/MobileNavigation";
import { Twirl as Hamburger } from "hamburger-react";
import SearchModal from "@/components/SearchModal";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="text-primary text-3xl">
          <h1 className="text-primary text-3xl">JP</h1>
        </Link>

        <div className="mr-4 hidden md:flex">
          <DesktopLinks />
        </div>

        {/* Right Side of the Navigation Menu */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none px-2 md:p-0">
            <SearchModal />
          </div>

          <ModeToggle />

          {/* Right side mobile navigation will show only on mobile devices */}
          <div className="md:hidden flex items-center space-x-4 justify-end z-10">
            <button
              id="menu-toggle"
              className="menu-toggle text-white cursor-pointer"
              aria-label="Toggle to open and close menu"
            >
              <Hamburger
                toggled={isMobile}
                toggle={setIsMobile}
                label="menu-toggle"
                duration={0.4}
                color="hsl(var(--secondary-foreground))"
              />
            </button>
          </div>
        </div>
      </div>
      {isMobile && (
        <MobileNavigation
          closeMenu={() => setIsMobile(false)}
          isMobile={isMobile}
        />
      )}
    </header>
  );
}
