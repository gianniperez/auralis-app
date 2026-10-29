"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import TagBadge from "@/components/ui/TagBadge";
import LightboxModal from "@/components/ui/LightboxModal";
import artworksData from "@/data/artworks.json";
import { Artwork, ArtworkTag } from "@/types";
import { icons } from "@/icons";

const ITEMS_PER_PAGE = 8;

interface GallerySectionProps {
  locale?: "es" | "en";
}

export default function GallerySection({ locale = "es" }: GallerySectionProps) {
  const tArtworks = useTranslations("Artworks");

  const [activeTag, setActiveTag] = useState<ArtworkTag>("All");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const tags: ArtworkTag[] = [
    "All",
    "Character Design",
    "Portraits",
    "RPG & Video Game Art",
    "Book Cover Illustration",
    "Landscapes",
  ];

  // Filter artworks based on active tag
  const filteredArtworks = useMemo(() => {
    const list = artworksData as Artwork[];
    if (activeTag === "All") return list;
    return list.filter((art) => art.tags.includes(activeTag));
  }, [activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE));

  // Sliced items according to current page
  const visibleArtworks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArtworks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArtworks, currentPage]);

  // Navigation inside Lightbox
  const currentIndex = selectedArtwork
    ? filteredArtworks.findIndex((a) => a._id === selectedArtwork._id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
    } else {
      setSelectedArtwork(filteredArtworks[filteredArtworks.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredArtworks.length - 1) {
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
    } else {
      setSelectedArtwork(filteredArtworks[0]);
    }
  };

  return (
    <section
      id="artworks"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col items-center gap-10"
      aria-label="Galería de Ilustraciones"
    >
      {/* 1. Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <Heading
          title={tArtworks("heading") || "Ilustraciones"}
          subtitle={
            tArtworks("copy") ||
            "Adéntrate en los universos de Auralis: personajes, escenas y paisajes creados a partir de la imaginación."
          }
          as="h2"
          icon={true}
        />
      </motion.div>

      {/* 2. Filter Pills: Fila horizontal en desktop y scroll suave táctil en mobile */}
      <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2 px-1 gap-2">
        {tags.map((tag) => (
          <TagBadge
            key={tag}
            label={tArtworks(`tags.${tag}`)}
            active={activeTag === tag}
            className="shrink-0"
            onClick={() => {
              setActiveTag(tag);
              setCurrentPage(1);
            }}
          />
        ))}
      </div>

      {/* 3. Artworks Grid: 2 columnas en mobile y 4 en desktop */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full mt-2 sm:mt-4"
      >
        <AnimatePresence mode="popLayout">
          {visibleArtworks.map((art, index) => (
            <motion.div
              key={art._id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setSelectedArtwork(art)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden glass-panel border border-gold-200/15 hover:border-gold-200/50 hover:shadow-[0_0_25px_rgba(124,78,187,0.35)] transition-all"
            >
              {/* Aspect Ratio Box: 1:1 cuadrado simétrico perfecto */}
              <div className="relative aspect-square w-full overflow-hidden bg-abyss/80">
                <Image
                  src={art.imageUrl}
                  alt={locale === "en" ? art.title.en || "Artwork" : art.title.es || "Ilustración"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Hover Aura & Magnifying Icon en Desktop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amethyst-500/25 backdrop-blur-[2px]">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-abyss/85 border border-gold-200/50 flex items-center justify-center text-gold-100 shadow-[0_0_20px_rgba(237,194,158,0.5)]">
                    <icons.fullscreen className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Paginación usando estilos de globals.css (números con borde, flechas celestiales libres) */}
      {totalPages > 1 && (
        <nav
          aria-label={locale === "en" ? "Gallery Pagination" : "Paginación de galería"}
          className="flex items-center justify-center gap-2 sm:gap-3 mt-4 select-none"
        >
          {/* Flecha Celestial Anterior (sin borde) */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            aria-label={locale === "en" ? "Previous page" : "Página anterior"}
            className="p-2 flex items-center justify-center text-gold-200/80 hover:text-gold-50 hover:scale-110 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <icons.celestialChevron className="w-5 h-4 rotate-90 drop-shadow-[0_0_8px_rgba(237,194,158,0.65)]" />
          </button>

          {/* Números de página (con borde) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={isActive ? "page" : undefined}
                className={`w-10 h-10 rounded-full font-serif text-sm flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? "holo-pill-active text-gold-50 font-semibold"
                    : "glass-panel border border-gold-200/20 text-parchment-muted hover:text-gold-100 hover:border-gold-200/45"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Flecha Celestial Siguiente (sin borde) */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            aria-label={locale === "en" ? "Next page" : "Página siguiente"}
            className="p-2 flex items-center justify-center text-gold-200/80 hover:text-gold-50 hover:scale-110 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <icons.celestialChevron className="w-5 h-4 -rotate-90 drop-shadow-[0_0_8px_rgba(237,194,158,0.65)]" />
          </button>
        </nav>
      )}

      {/* 5. Lightbox Modal */}
      <LightboxModal
        isOpen={Boolean(selectedArtwork)}
        onClose={() => setSelectedArtwork(null)}
        artwork={selectedArtwork}
        onPrev={handlePrev}
        onNext={handleNext}
        locale={locale}
      />
    </section>
  );
}
