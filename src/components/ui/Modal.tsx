"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/icons";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
  hideHeader?: boolean;
  outsideControls?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  className = "",
  hideHeader = false,
  outsideControls,
}: ModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-abyss/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Wrapper para alojar el panel y controles externos (como flechas de galería) */}
          <div
            className={`relative z-10 w-full ${maxWidth} my-auto flex items-center justify-center`}
          >
            {outsideControls}

            {/* Modal Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`glass-panel relative w-full rounded-2xl shadow-card-elevated border border-gold-200/20 ${
                hideHeader ? "" : "p-6 sm:p-8"
              } ${className}`}
              role="dialog"
              aria-modal="true"
            >
              {/* Header: Title & Close Button */}
              {!hideHeader && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-parchment-darker">
                  {title && (
                    <div className="font-display text-xl sm:text-2xl text-parchment tracking-wide">
                      {title}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-parchment-muted/80 hover:text-gold-100 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <icons.close className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Body */}
              <div>{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
