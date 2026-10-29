"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { icons } from "@/icons";
import { Artwork } from "@/types";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | null;
  onPrev?: () => void;
  onNext?: () => void;
  locale?: "es" | "en";
}

export default function LightboxModal({
  isOpen,
  onClose,
  artwork,
  onPrev,
  onNext,
  locale = "es",
}: LightboxModalProps) {
  const tArtworks = useTranslations("Artworks");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!artwork) return null;

  const artworkTitle =
    locale === "en"
      ? artwork.title.en || "Original Illustration"
      : artwork.title.es || "Ilustración Original";
  const artworkDescription =
    locale === "en"
      ? artwork.description.en ||
        "Digital illustration crafted in the Auralis universe, focusing on atmosphere, lighting, and narrative expression."
      : artwork.description.es ||
        "Ilustración digital creada en el universo de Auralis, cuidando cada detalle de atmósfera, iluminación y expresión narrativa.";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      hideHeader={true}
      className="rounded-3xl overflow-hidden border border-gold-200/30 shadow-[0_0_55px_rgba(33,17,71,0.85)]"
      outsideControls={
        <>
          {/* Flecha Celestial Izquierda (A los lados de toda la card en Desktop) */}
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Anterior ilustración"
              className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 z-30 p-2 text-gold-200/75 hover:text-gold-50 hover:scale-110 transition-all cursor-pointer select-none"
            >
              <icons.celestialChevron className="w-7 h-6 rotate-90 drop-shadow-[0_0_10px_rgba(237,194,158,0.65)]" />
            </button>
          )}

          {/* Flecha Celestial Derecha (A los lados de toda la card en Desktop) */}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Siguiente ilustración"
              className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 z-30 p-2 text-gold-200/75 hover:text-gold-50 hover:scale-110 transition-all cursor-pointer select-none"
            >
              <icons.celestialChevron className="w-7 h-6 -rotate-90 drop-shadow-[0_0_10px_rgba(237,194,158,0.65)]" />
            </button>
          )}
        </>
      }
    >
      <div className="relative grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:h-[min(580px,82vh)] overflow-y-auto md:overflow-hidden">
        {/* Botón de cierre pequeño y tranquilo en Mobile */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="md:hidden absolute top-3.5 right-3.5 z-30 w-7 h-7 rounded-full flex items-center justify-center bg-abyss/75 text-parchment-muted/80 hover:text-gold-100 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <icons.close className="w-3 h-3" />
        </button>

        {/* Columna Izquierda (7 cols): Lienzo con bordes redondeados en la imagen */}
        <div className="md:col-span-7 relative aspect-square md:aspect-auto w-full h-full min-h-0 bg-[#06020a]/90 flex items-center justify-center p-4 sm:p-7 border-b md:border-b-0 md:border-r border-gold-200/15 select-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={artwork.imageUrl}
              alt={artworkTitle}
              width={1200}
              height={1200}
              sizes="(max-width: 1024px) 92vw, 640px"
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>

          {/* Flechas Celestiales Laterales en Mobile/Tablet (sin borde) */}
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Anterior ilustración"
              className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2 text-gold-200/85 hover:text-gold-50 transition-transform active:scale-95 cursor-pointer"
            >
              <icons.celestialChevron className="w-6 h-5 rotate-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Siguiente ilustración"
              className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold-200/85 hover:text-gold-50 transition-transform active:scale-95 cursor-pointer"
            >
              <icons.celestialChevron className="w-6 h-5 -rotate-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
            </button>
          )}
        </div>

        {/* Columna Derecha (5 cols): Ficha Editorial de la Obra */}
        <div className="relative md:col-span-5 h-full min-h-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-surface/90 to-abyss/95 text-left overflow-y-auto">
          {/* Botón de cierre en Desktop integrado en la esquina superior derecha */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="hidden md:flex absolute top-5 right-5 z-20 w-8 h-8 rounded-full items-center justify-center text-parchment-muted/70 hover:text-gold-100 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <icons.close className="w-3.5 h-3.5" />
          </button>

          {/* Cuerpo principal: Título protagonista y Narrativa */}
          <div className="flex flex-col gap-4 md:pr-8 pt-1">
            {/* Título y Ornamento */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl sm:text-3xl text-gold-50 tracking-wide leading-snug">
                {artworkTitle}
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-gold-200/60 to-transparent" />
            </div>

            {/* Descripción de la Obra */}
            <p className="text-sm sm:text-base font-serif text-parchment-muted leading-relaxed">
              {artworkDescription}
            </p>
          </div>

          {/* Pie de Ficha: Tags de categoría asentados prolijamente en la base */}
          <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-gold-200/15">
            {artwork.tags
              .filter((t) => t !== "All")
              .map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-serif rounded-full bg-amethyst-500/80 border border-gold-200/25 text-gold-200 tracking-wide"
                >
                  {tArtworks(`tags.${tag}`)}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
