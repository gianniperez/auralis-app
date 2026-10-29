"use client";

import { motion } from "framer-motion";

export interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
  className?: string;
}

export default function TagBadge({
  label,
  active = false,
  onClick,
  count,
  className = "",
}: TagBadgeProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wide transition-all select-none cursor-pointer flex items-center gap-1.5 ${
        active
          ? "holo-pill-active text-gold-50"
          : "bg-surface/60 text-parchment-muted border border-parchment-darker hover:border-amethyst-300/40 hover:text-parchment backdrop-blur-sm"
      } ${className}`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
            active ? "bg-gold-200 text-abyss font-semibold" : "bg-surface-elevated text-parchment-dark"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
