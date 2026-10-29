"use client";

import { motion } from "framer-motion";
import { icons } from "@/icons";
import { socialLinks, SocialLink } from "@/data/socialLinks";

export interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
  iconSize?: string;
}

export default function SocialLinks({
  links = socialLinks,
  className = "",
  iconSize = "w-5 h-5",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {links.map((item) => {
        const IconComponent = icons[item.iconName];
        if (!IconComponent) return null;

        return (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            className="p-2 sm:p-2.5 rounded-full bg-surface/60 hover:bg-surface-elevated text-gold-200/80 hover:text-gold-100 transition-all shadow-sm hover:shadow-glow-gold"
          >
            <IconComponent className={iconSize} />
          </motion.a>
        );
      })}
    </div>
  );
}
