"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
}

interface SparklesProps {
  /** If true, sparkles spawn continuously. If false, existing sparkles finish and stop */
  active?: boolean;
  /** Palette of colors for the 4-point stars */
  colors?: string[];
  /** Min and max size in px */
  minSize?: number;
  maxSize?: number;
  /** Spawn rate interval in ms */
  spawnInterval?: number;
  /** Max concurrent sparkles alive at once */
  maxCount?: number;
  /** Lifetime of each sparkle in ms */
  lifetime?: number;
}

/**
 * Ultra-delicate, slender 4-point Star Lens Flare.
 * Super thin needle rays tapering to sharp tips, with a subtle tiny glowing center.
 */
const SlenderStarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block"
  >
    <path
      d="M50 0C50 32 46 47 0 50C46 53 50 68 50 100C50 68 54 53 100 50C54 47 50 32 50 0Z"
      fill={color}
    />
    <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" opacity="0.95" />
  </svg>
);

const DEFAULT_COLORS = ["#ffffff", "#fdf5e6", "#f5e0ce", "#edc29e"];

function getRandomPerimeterCoords(): { top: string; left: string } {
  const edge = Math.floor(Math.random() * 4);
  const offset = 10 + Math.random() * 80;
  const outwardOffset = -(1 + Math.random() * 3);

  switch (edge) {
    case 0:
      return { top: `${outwardOffset}px`, left: `${offset}%` };
    case 1:
      return { top: `${offset}%`, left: `calc(100% + ${Math.abs(outwardOffset)}px)` };
    case 2:
      return { top: `calc(100% + ${Math.abs(outwardOffset)}px)`, left: `${offset}%` };
    case 3:
    default:
      return { top: `${offset}%`, left: `${outwardOffset}px` };
  }
}

export default function Sparkles({
  active = false,
  colors = DEFAULT_COLORS,
  minSize = 9,
  maxSize = 15,
  spawnInterval = 320,
  maxCount = 4,
  lifetime = 1300,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const spawnSparkle = useCallback(() => {
    const now = Date.now();
    const newSparkle: Sparkle = {
      id: `${now}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
      style: getRandomPerimeterCoords(),
    };

    setSparkles((prev) => {
      const filtered = prev.filter((s) => now - s.createdAt < lifetime);
      if (filtered.length >= maxCount) {
        return [...filtered.slice(1), newSparkle];
      }
      return [...filtered, newSparkle];
    });
  }, [colors, minSize, maxSize, maxCount, lifetime]);

  useEffect(() => {
    if (!active) {
      const timeout = setTimeout(() => {
        setSparkles([]);
      }, lifetime);
      return () => clearTimeout(timeout);
    }

    const initialTimeout = setTimeout(() => {
      spawnSparkle();
    }, 0);

    const interval = setInterval(() => {
      spawnSparkle();
    }, spawnInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [active, spawnSparkle, spawnInterval, lifetime]);

  return (
    <span className="absolute -inset-1.5 pointer-events-none z-10 overflow-visible" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute pointer-events-none z-20 will-change-transform"
            style={{
              top: sparkle.style.top,
              left: sparkle.style.left,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 0 5px rgba(253, 245, 230, 0.9)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.15, 0.95, 0],
              opacity: [0, 0.95, 0.85, 0],
            }}
            transition={{
              duration: lifetime / 1000,
              ease: [0.33, 1, 0.68, 1],
              times: [0, 0.35, 0.7, 1],
            }}
          >
            <SlenderStarIcon size={sparkle.size} color={sparkle.color} />
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
