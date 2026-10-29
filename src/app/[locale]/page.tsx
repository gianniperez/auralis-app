"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundStars from "@/components/effects/BackgroundStars";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import ServicesSection from "@/components/sections/ServicesSection";
import FaqsSection from "@/components/sections/FaqsSection";
import ContactDialog from "@/components/ui/ContactDialog";

export default function Home() {
  const currentLocale = useLocale() as "es" | "en";

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenContact = (serviceTitle?: string) => {
    setSelectedService(serviceTitle || "");
    setIsContactOpen(true);
  };

  return (
    <>
      {/* 1. Global Atmospheric Star Particles & Drift */}
      <BackgroundStars />

      {/* 2. Smart Sticky Navbar with next-intl */}
      <Navbar
        onOpenContact={() => handleOpenContact()}
        locale={currentLocale}
      />

      {/* 3. Main Landing Narrative Flow */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <HeroSection onOpenContact={() => handleOpenContact()} />

        {/* About Section (Pilares, El Alma con la Ratita, La Artista Gianni) */}
        <AboutSection />

        {/* Gallery Section (Curated Preview + Lightbox Modal) */}
        <GallerySection locale={currentLocale} />

        {/* Services & Creative Process Timeline (01 to 04) */}
        <ServicesSection
          locale={currentLocale}
          onSelectService={(service) => handleOpenContact(service)}
        />

        {/* FAQs Section */}
        <FaqsSection onOpenContact={() => handleOpenContact()} />
      </main>

      {/* 4. Contact Dialog (Modal on Desktop / Bottom Sheet Drawer on Mobile) */}
      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        locale={currentLocale}
        initialService={selectedService}
      />

      {/* 5. Global Footer */}
      <Footer locale={currentLocale} />
    </>
  );
}
