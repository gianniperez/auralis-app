"use client";

import Image from "next/image";
import Link from "next/link";
import { icons } from "@/icons";
import SocialLinks from "../ui/SocialLinks";

export interface FooterProps {
  locale?: "es" | "en";
}

export default function Footer({ locale = "es" }: FooterProps) {
  return (
    <footer className="relative w-full border-t border-gold-200/20 pt-12 sm:pt-16 pb-10 sm:pb-12 mt-12 sm:mt-16 bg-gradient-to-b from-[#130824]/95 via-[#0a0413]/98 to-[#040108] backdrop-blur-md">
      {/* lis-divider montado a caballo exactamente sobre el borde superior del footer */}
      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex justify-center">
        <Image
          src="/images/lis-divider.png"
          alt="Flor de Lis Auralis"
          width={480}
          height={48}
          className="hidden sm:block sm:w-72 md:w-[380px] h-auto object-contain drop-shadow-[0_0_15px_rgba(237,194,158,0.45)]"
          priority
        />
        <Image
          src="/images/lis-divider-mobile.png"
          alt="Flor de Lis Auralis"
          width={480}
          height={48}
          className="block sm:hidden w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(237,194,158,0.45)]"
          priority
        />
      </div>

      {/* Background Soft Glow bajo el ornamento */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-36 pointer-events-none z-0 opacity-45"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(237, 194, 158, 0.25) 0%, rgba(124, 78, 187, 0.12) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Brand Imagotype */}
        <Link
          href="#hero"
          className="inline-flex items-center justify-center mb-3 sm:mb-4 group select-none cursor-pointer"
          aria-label="Auralis - Volver al inicio"
        >
          <icons.imagotype className="w-36 sm:w-48 h-auto text-gold-100 transition-all duration-300 group-hover:scale-105 group-hover:text-gold-100 drop-shadow-[0_0_15px_rgba(237,194,158,0.4)]" />
        </Link>

        {/* Social Links */}
        <div className="mb-5 sm:mb-6">
          <SocialLinks iconSize="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </div>

        {/* Decorative Divider */}
        <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold-200/40 to-transparent mb-4 sm:mb-5" />

        {/* Copyright & Credits */}
        <div className="text-[11px] sm:text-xs font-serif text-parchment-dark tracking-wide flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
          <span>
            © {new Date().getFullYear()} Auralis.{" "}
            {locale === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </span>
          <span className="hidden sm:inline text-parchment-darker">•</span>
          <span>
            {locale === "es"
              ? "Ilustrado con amor por Gianni"
              : "Illustrated with love by Gianni"}
          </span>
        </div>
      </div>
    </footer>
  );
}
