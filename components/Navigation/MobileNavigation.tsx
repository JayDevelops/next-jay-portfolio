"use client";
import { menuLinks } from "@/components/Navigation/MenuLinks";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  modalVariants,
  linkItemVariants,
  navLinksVariants,
} from "@/components/Navigation/MobileNavAnimate";
import { useState } from "react";

interface MobileNavigationProps {
  closeMenu: () => void;
  isMobile: boolean;
}

export function MobileNavigation({
  closeMenu,
  isMobile,
}: MobileNavigationProps) {
  const [shouldAnimateExit, setShouldAnimateExit] = useState(false);

  const handleLinkClick = () => {
    setShouldAnimateExit(true);
    closeMenu();
  };

  return (
    <nav className="h-screen bg-primary py-4 px-4 md:hidden">
      <AnimatePresence>
        {isMobile && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-primary"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative bg-primary w-full"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-8 items-center justify-center h-full">
                {menuLinks.map((link, index) => (
                  <Link href={link.path} key={index} onClick={closeMenu}>
                    <motion.span
                      className="text-white font-light text-2xl cursor-pointer"
                      variants={linkItemVariants}
                    >
                      {link.title}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
