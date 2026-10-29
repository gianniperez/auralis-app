"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { icons } from "@/icons";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle swipe down to dismiss
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-abyss/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer / Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={`glass-panel relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-6 shadow-card-elevated border-t sm:border border-gold-200/25 max-h-[90vh] overflow-y-auto z-10 ${className}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Drag Handle Bar for mobile swipe gesture */}
            <div className="sm:hidden flex justify-center pb-3 -mt-2 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-parchment-dark/50" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-parchment-darker">
              {title && (
                <div className="font-display text-lg sm:text-xl text-parchment tracking-wide">
                  {title}
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar panel"
                className="w-7 h-7 rounded-full flex items-center justify-center text-parchment-muted/80 hover:text-gold-100 hover:bg-white/5 transition-colors ml-auto cursor-pointer"
              >
                <icons.close className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="pb-2">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
