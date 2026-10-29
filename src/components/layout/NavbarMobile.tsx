"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/icons";
import { NavItem } from "@/data/navigation";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";

export interface NavbarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
  onSelectSection: (id: string) => void;
  onOpenContact: () => void;
  locale?: "es" | "en";
}

export default function NavbarMobile({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onSelectSection,
  onOpenContact,
  locale = "es",
}: NavbarMobileProps) {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop con desenfoque cósmico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-abyss/95 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Halo místico de fondo */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124, 78, 187, 0.4) 0%, rgba(237, 194, 158, 0.2) 60%, transparent 100%)",
            }}
          />

          {/* Header Mobile Interno (Logo + Botón Cerrar) */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-4 border-b border-gold-200/10">
            <div className="flex items-center gap-2">
              <icons.isologo className="w-8 h-8 text-gold-200 drop-shadow-glow-gold" />
              <span className="font-display text-xl tracking-wide bg-gradient-to-r from-gold-200 to-gold-100 bg-clip-text text-transparent">
                Auralis
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gold-200/80 hover:text-gold-100 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <icons.close className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Menú de Navegación Editorial en Pantalla Completa */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 flex-1 flex flex-col justify-center px-7 sm:px-8 pt-2 pb-16 sm:pb-20 overflow-y-auto"
          >
            {/* Links Editoriales con Iconos Místicos y Tipografía Caligráfica */}
            <div className="flex flex-col gap-5 sm:gap-6 pt-2 pb-8">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                const IconComponent = icons[item.iconName];

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 + 0.1, duration: 0.35 }}
                    onClick={() => {
                      onSelectSection(item.id);
                      onClose();
                    }}
                    className="flex items-center justify-between group text-left cursor-pointer py-1"
                  >
                    <div className="flex items-center gap-4">
                      {IconComponent && (
                        <IconComponent
                          className={`w-6 h-6 transition-colors ${
                            isActive
                              ? "text-gold-100 drop-shadow-[0_0_8px_rgba(237,194,158,0.6)]"
                              : "text-gold-200/60 group-hover:text-gold-100"
                          }`}
                        />
                      )}
                      <span
                        className={`font-display text-2xl sm:text-3xl tracking-wide transition-colors ${
                          isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-gold-50 via-gold-100 to-gold-200"
                            : "text-gold-200/60 group-hover:text-gold-100"
                        }`}
                      >
                        {item.label[locale]}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="active-mobile-dot"
                        className="flex items-center gap-1.5 text-gold-200"
                      >
                        <icons.gradLis className="w-5 h-5 text-gold-200 drop-shadow-glow-gold" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Parte Inferior Elevada: CTA Principal + Redes Sociales */}
            <div className="flex flex-col gap-5 pt-6 pb-2 border-t border-gold-200/15 mt-14">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
              >
                {locale === "es" ? "Crear mi obra" : "Create My Artwork"}
              </Button>

              <div className="flex flex-col items-center gap-2.5">
                <span className="text-[11px] font-serif text-parchment-dark tracking-widest uppercase">
                  {locale === "es" ? "Conectemos" : "Let’s Connect"}
                </span>
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
