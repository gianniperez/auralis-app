"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import { icons } from "@/icons";

export default function AboutSection() {
  const tAbout = useTranslations("About");
  const pillars = tAbout.raw("firstSection.pillars") as Array<{
    heading: string;
    subheading: string;
    copy: string;
  }>;

  const pillarIcons = [
    <icons.pillar1 key="1" className="w-10 h-10 text-gold-200" />,
    <icons.pillar2 key="2" className="w-10 h-10 text-gold-200" />,
    <icons.pillar3 key="3" className="w-10 h-10 text-gold-200" />,
  ];

  return (
    <section
      id="about"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col gap-16 sm:gap-24"
      aria-label="Sobre Auralis"
    >
      {/* 1. Header & Los Tres Pilares */}
      <div className="flex flex-col items-center text-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            title={tAbout("firstSection.heading")}
            subtitle={tAbout("firstSection.copy")}
            as="h2"
            icon={true}
          />
        </motion.div>

        {/* 3 Pillars Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full mt-2">
          {/* Nebulosa Auralis de fondo detrás de las 3 cards */}
          <div
            className="absolute -inset-x-10 top-1/2 -translate-y-1/2 h-64 pointer-events-none -z-10 blur-3xl opacity-45"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(124, 78, 187, 0.35) 0%, rgba(237, 194, 158, 0.12) 55%, transparent 80%)",
            }}
          />

          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="holo-card-a rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden group"
            >
              {/* Glow interno sutil superior */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-28 rounded-full pointer-events-none blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124, 78, 187, 0.35) 0%, rgba(237, 194, 158, 0.15) 60%, transparent 100%)",
                }}
              />

              {/* Icon Container etéreo sin borde */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-all">
                <div className="absolute inset-0 rounded-full bg-gold-200/10 blur-md group-hover:bg-gold-200/25 transition-colors" />
                <div className="relative z-10 drop-shadow-[0_0_10px_rgba(237,194,158,0.5)]">
                  {pillarIcons[index]}
                </div>
              </div>

              {/* Texts */}
              <div className="flex flex-col gap-1.5 mt-2 relative z-10">
                <h3 className="font-display text-xl text-gold-50 tracking-wide">
                  {pillar.heading}
                </h3>
                <span className="text-xs uppercase tracking-wider text-gold-200/85 font-serif font-medium">
                  {pillar.subheading}
                </span>
              </div>

              <p
                className="text-sm font-serif text-parchment-muted leading-relaxed mt-1 relative z-10"
                dangerouslySetInnerHTML={{ __html: pillar.copy }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Versión Unificada Libre sobre las Estrellas (Gianni + Ratita + Relato Unificado) */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-2">
        {/* Lado Visual: Gianni y la Ratita libres sobre el cielo estrellado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex items-center justify-center relative min-h-[300px] sm:min-h-[360px]"
        >
          {/* Halo de luz mística central que las abraza a ambas */}
          <div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(237, 194, 158, 0.38) 0%, rgba(124, 78, 187, 0.48) 52%, transparent 78%)",
            }}
          />

          {/* Retrato de Gianni */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-72 h-72 sm:w-94 sm:h-94 z-10 bottom-6 sm:bottom-0 -ml-10 sm:-ml-20"
          >
            <Image
              src="/images/the-artist.png"
              alt="Gianni - Ilustradora y creadora de Auralis"
              fill
              sizes="(max-width: 768px) 250px, 320px"
              className="object-contain drop-shadow-[0_8px_30px_rgba(147,95,224,0.45)]"
              priority
            />
          </motion.div>

          {/* Ratita co-protagonista con separación respirada */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute right-2 sm:right-6 bottom-0 w-52 h-52 sm:w-60 sm:h-60 z-20"
          >
            <Image
              src="/images/the-soul.png"
              alt="El Alma de Auralis - Espíritu familiar"
              fill
              sizes="(max-width: 768px) 200px, 250px"
              className="object-contain drop-shadow-[0_8px_30px_rgba(237,194,158,0.6)]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Lado Narrativo: Relato unificado sin caja */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col gap-4 text-left"
        >
          <div className="flex items-center gap-2 text-gold-200 text-xs uppercase tracking-widest font-serif">
            <icons.gradLis className="w-4 h-4 text-gold-200" />
            <span>{tAbout("secondSection.badge")}</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gold-50 via-gold-100 to-gold-200 leading-tight">
            {tAbout("secondSection.heading")}
          </h3>

          <div
            className="text-sm sm:text-base text-parchment-muted font-serif leading-relaxed space-y-4 [&>i]:text-gold-50 [&>i]:font-medium [&>i]:not-italic [&>i]:pb-0.5 [&>i]:border-b [&>i]:border-amethyst-300/45"
            dangerouslySetInnerHTML={{
              __html: tAbout.raw("secondSection.copy"),
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
