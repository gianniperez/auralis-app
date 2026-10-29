"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { icons } from "@/icons";

const Sparks = dynamic(() => import("@/components/effects/Sparks"), {
  ssr: false,
});

interface HeroSectionProps {
  onOpenContact: () => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  const tHome = useTranslations("Home");

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      aria-label="Hero - Introducción a Auralis"
    >
      {/* 1–3. Background Hero Container con máscara de disolución suave hacia BackgroundStars */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.35) 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.35) 90%, transparent 100%)",
        }}
      >
        {/* 1. Background Hero Illustration */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.65, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.png"
            alt="Ilustración mística de Auralis"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_68%]"
          />
        </motion.div>

        {/* 2. Atmospheric Radial Vignette (más suave para no oscurecer en exceso el borde inferior) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 42%, rgba(14, 0, 34, 0.3) 76%, rgba(12, 5, 22, 0.65) 100%)",
          }}
        />
      </div>

      {/* 4. Magic Floating Sparks (Partículas Mágicas Ascendentes) */}
      <Sparks count={50} />

      {/* 5. Central Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-6 sm:pt-0 mb-60 md:mb-0 md:-mt-10">
        {/* Subtle Ornamental Crest */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 text-gold-200/80 text-xs sm:text-sm tracking-[0.25em] uppercase font-serif"
        >
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gold-200/60" />
          <span>{tHome("crest")}</span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gold-200/60" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display text-4xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1] pb-1 sm:pb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-gold-50 via-gold-100 to-gold-200 drop-shadow-[0_4px_24px_rgba(237,194,158,0.25)]"
          dangerouslySetInnerHTML={{
            __html:
              tHome.raw("heading") ||
              "Donde la imaginación se convierte en magia",
          }}
        />

        {/* Subtitle / Narrative Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-parchment-muted font-serif max-w-2xl [&>br]:hidden sm:[&>br]:inline px-2 sm:px-0"
          dangerouslySetInnerHTML={{
            __html:
              tHome.raw("copy") ||
              "Ilustraciones con alma, arte conceptual y portadas de fantasía tejidas a mano entre la luz y el misticismo.",
          }}
        />

        {/* Call to Action Buttons: "Crear mi obra" único en mobile, ambos en desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-3 sm:mt-6 w-full sm:w-auto"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenContact}
            className="sm:w-auto justify-center"
          >
            {tHome("contactCta") || "Crear mi obra"}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            href="#artworks"
            className="hidden! sm:inline-flex!"
          >
            {tHome("artworksCta") || "Explorar obras"}
          </Button>
        </motion.div>
      </div>

      {/* 5. Scroll Down Indicator: Microcopy "Explorar" + Hilo de Luz + Glifo Celestial Heráldico */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById("about");
          if (element) {
            const topOffset =
              element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
            window.history.pushState(null, "", "#about");
          }
        }}
        aria-label="Bajar a sección Sobre Auralis"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-18 sm:bottom-7 z-10 p-2 cursor-pointer flex flex-col items-center gap-1.5 group select-none"
      >
        {/* Microcopy Editorial de Scroll */}
        <span className="mb-2 sm:hidden text-[11px] sm:text-[11px] font-serif uppercase tracking-[0.28em] text-gold-200/70 group-hover:text-gold-100 transition-colors drop-shadow-[0_0_8px_rgba(237,194,158,0.4)]">
          {tHome("exploreScroll") || "Explorar"}
        </span>

        {/* Hilo de Luz Alquímico */}
        <div className="relative w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-gold-200/40 to-gold-200/90 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "150%"] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-gold-50 to-transparent shadow-[0_0_8px_#fdf5e6]"
          />
        </div>

        {/* Emblema Celestial de 3 Capas (Alas inferiores + Rombo + Punto estelar blanco) */}
        <motion.div
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: "easeInOut",
          }}
          className="relative flex flex-col items-center justify-center text-gold-200 transition-all duration-300 group-hover:scale-110 group-hover:text-gold-100"
        >
          {/* Halo místico de fondo */}
          <div className="absolute w-10 h-10 rounded-full bg-gold-200/20 blur-md pointer-events-none group-hover:bg-gold-200/35 transition-colors" />

          <icons.celestialChevron className="w-6 sm:w-7 h-auto text-gold-200 drop-shadow-[0_0_12px_rgba(237,194,158,0.75)]" />
        </motion.div>
      </motion.a>
    </section>
  );
}
