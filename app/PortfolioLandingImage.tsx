"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Text } from "@/components/ui/Typography/Text";
import Link from "next/link";

interface PortfolioLandingImageProps {
  src: string;
  alt: string;
  author: string;
  authorLink: string;
}

export default function PortfolioLandingImage({
  src,
  alt,
  author,
  authorLink,
}: PortfolioLandingImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[400px] overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="rounded-lg object-cover"
      />
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
      >
        <Text>
          Drawing by{" "}
          <Link href={authorLink} className="text-primary/90" target="_blank">
            {author}
          </Link>
        </Text>
      </motion.div>
    </motion.div>
  );
}
