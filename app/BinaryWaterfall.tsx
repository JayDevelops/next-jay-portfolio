"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

interface BinaryParticle {
  id: number;
  x: number;
  direction: "left" | "right";
  delay: number;
  size: "sm" | "md" | "lg";
  speed: "slow" | "medium" | "fast";
  value: "0" | "1";
}

const SIZES = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
};

const SPEEDS = {
  slow: 5,
  medium: 4,
  fast: 3,
};

export default function BinaryWaterfall() {
  const [particles, setParticles] = useState<BinaryParticle[]>([]);
  const [count, setCount] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const interval = setInterval(() => {
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
      const speeds: Array<"slow" | "medium" | "fast"> = [
        "slow",
        "medium",
        "fast",
      ];

      // Create new particle
      const newParticle: BinaryParticle = {
        id: count,
        x: isDesktop ? Math.random() * 40 : Math.random() * 100,
        direction: Math.random() > 0.5 ? "left" : "right",
        delay: Math.random() * 0.3,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        speed: speeds[Math.floor(Math.random() * speeds.length)],
        value: Math.random() > 0.5 ? "0" : "1",
      };

      setParticles((prev) => [...prev, newParticle]);
      setCount((prev) => prev + 1);

      // Keep more particles active at once
      setParticles((prev) => prev.filter((p) => p.id > count - 35));
    }, 200);

    return () => clearInterval(interval);
  }, [count, isDesktop]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" />
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              y: -20,
              x: `${particle.x}vw`,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: ["0vh", "100vh"],
              x: isDesktop
                ? particle.direction === "left"
                  ? [`${particle.x}vw`, `${particle.x - 15}vw`]
                  : [`${particle.x}vw`, `${particle.x + 15}vw`]
                : `${particle.x}vw`,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: SPEEDS[particle.speed],
              delay: particle.delay,
              ease: "linear",
            }}
            className={`
              absolute font-mono
              ${SIZES[particle.size]}
              ${particle.value === "0" ? "text-blue-500" : "text-red-500"}
              opacity-80
              drop-shadow-[0_0_3px_rgba(34,211,238,0.5)]
            `}
          >
            {particle.value}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
