"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { icons } from "@/icons";
import { navItems } from "@/data/navigation";
import Button from "../ui/Button";
import NavbarMobile from "./NavbarMobile";

export interface NavbarProps {
  onOpenContact?: () => void;
  locale?: "es" | "en";
}

export default function Navbar({ onOpenContact, locale = "es" }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Enable glass background after scrolling down slightly
      setIsScrolled(currentScrollY > 20);

      // Smart Sticky Headroom logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Detect active section based on scroll offset
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-surface/75 backdrop-blur-[16px] py-3 shadow-card-elevated"
              : "bg-transparent py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo & Brand Name */}
            <div className="w-44 shrink-0 flex items-center">
              <Link
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hero");
                }}
                className="flex items-center gap-2.5 group cursor-pointer select-none"
              >
                <icons.isologo className="w-8 h-8 sm:w-10 sm:h-10 text-gold-200 transition-transform duration-300 group-hover:scale-110 drop-shadow-glow-gold" />
                <span className="font-display text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-gold-200 to-gold-100 bg-clip-text text-transparent">
                  Auralis
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links (Centrado Óptico) */}
            <nav className="hidden md:flex items-center justify-center flex-1 gap-7 lg:gap-9">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative py-1 text-sm font-serif tracking-wide transition-colors cursor-pointer select-none ${
                      isActive
                        ? "text-gold-100 font-medium"
                        : "text-parchment-muted hover:text-parchment"
                    }`}
                  >
                    <span>{item.label[locale]}</span>

                    {/* Indicador de link activo: Glow radial + Flor de lis + Línea dorada pegada abajo */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-26 aspect-[186/96] pointer-events-none z-0"
                      >
                        <icons.activeBar2 className="w-full h-full block text-gold-200" />
                        <span className="absolute bottom-0 inset-x-1.5 h-[1.5px] bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: CTA Button (Desktop) + Mobile Menu Trigger */}
            <div className="w-auto md:w-44 shrink-0 flex items-center justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={onOpenContact}
                className="hidden! md:inline-flex!"
              >
                {locale === "es" ? "Crear mi obra" : "Create My Artwork"}
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú"
                className="md:hidden p-2 text-gold-200 hover:text-gold-100 transition-colors cursor-pointer"
              >
                <icons.menu className="w-6 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <NavbarMobile
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenContact={onOpenContact ?? (() => {})}
        locale={locale}
      />
    </>
  );
}
