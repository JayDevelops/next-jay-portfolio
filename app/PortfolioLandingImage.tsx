"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Text } from "@/components/ui/Typography/Text";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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

  const containerVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const overlayVariants = {
    initial: { opacity: 0, y: "100%" },
    hover: { opacity: 1, y: 0 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative w-full h-[400px] overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={containerVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <Suspense fallback={<Skeleton className="w-full h-[400px] rounded-xl" />}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="rounded-lg object-cover"
        />
      </Suspense>
      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4"
      >
        <motion.div
          variants={textVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.3, delay: 0.17 }}
        >
          <Text>
            Drawing by{" "}
            <Link href={authorLink} className="text-primary/90" target="_blank">
              {author}
            </Link>
          </Text>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
