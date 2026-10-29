"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import servicesData from "@/data/services.json";
import stepsData from "@/data/steps.json";
import { Service, Step } from "@/types";
import { icons } from "@/icons";

interface ServicesSectionProps {
  locale?: "es" | "en";
  onSelectService: (serviceTitle: string) => void;
}

export default function ServicesSection({
  locale = "es",
  onSelectService,
}: ServicesSectionProps) {
  const tServices = useTranslations("Services");
  const tWorkflow = useTranslations("Workflow");

  const services = servicesData as Service[];
  const steps = stepsData as Step[];

  // 1. Estado para el servicio seleccionado (Selector interactivo)
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const activeService =
    services.find((s) => s._id === selectedServiceId) || services[0];

  const activeTitle =
    locale === "en" ? activeService.title.en : activeService.title.es;
  const activeDesc =
    locale === "en"
      ? activeService.description.en
      : activeService.description.es;
  const activeCost =
    locale === "en" ? activeService.cost.en : activeService.cost.es;
  const activeDuration =
    locale === "en" ? activeService.duration.en : activeService.duration.es;

  // 2. Timeline Unificado: Un único <path> continuo medido dinámicamente + progreso suave
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const svgTrackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [timelineGeometry, setTimelineGeometry] = useState<{
    width: number;
    totalHeight: number;
    d: string;
    starYs: number[];
    botYs: number[];
    starFractions: number[];
    stepEndFractions: number[];
  }>({
    width: 0,
    totalHeight: 0,
    d: "",
    starYs: [],
    botYs: [],
    starFractions: [],
    stepEndFractions: [],
  });

  const smoothProgress = useSpring(0, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.0005,
  });

  const [progressValue, setProgressValue] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setProgressValue(latest);
  });

  const measureTimeline = useCallback(() => {
    const containerEl = timelineContainerRef.current;
    if (!containerEl) return;

    const totalHeight = containerEl.clientHeight;
    const N = steps.length;
    if (totalHeight <= 0 || N === 0) return;

    const isMobile = window.innerWidth < 768;
    const trackEl = svgTrackRef.current;
    const W = isMobile ? 0 : (trackEl?.clientWidth ?? 0);

    // En Mobile: el progreso es vertical lineal directo a lo largo de totalHeight
    if (isMobile) {
      const starYs: number[] = [];
      const botYs: number[] = [];
      const starFractions: number[] = [];
      const stepEndFractions: number[] = [];

      for (let i = 0; i < N; i++) {
        const stepEl = stepRefs.current[i];
        const topY = stepEl ? stepEl.offsetTop : (i * totalHeight) / N;
        const rowH = stepEl ? stepEl.offsetHeight : totalHeight / N;
        const botY = topY + rowH;
        const midY = topY + rowH / 2;

        starYs.push(midY);
        botYs.push(botY);
        starFractions.push(midY / totalHeight);
        stepEndFractions.push(botY / totalHeight);
      }

      setTimelineGeometry({
        width: 0,
        totalHeight,
        d: "",
        starYs,
        botYs,
        starFractions,
        stepEndFractions,
      });
      return;
    }

    if (W <= 0) return;

    const R = 40; // Radio de las curvas del timeline
    const arcLen = (Math.PI / 2) * R;

    let d = `M ${W / 2} 0`;
    let cumLen = 0;

    const starYs: number[] = [];
    const botYs: number[] = [];
    const starCumLens: number[] = [];
    const stepEndCumLens: number[] = [];

    for (let i = 0; i < N; i++) {
      const stepEl = stepRefs.current[i];
      const topY = stepEl ? stepEl.offsetTop : (i * totalHeight) / N;
      const rowH = stepEl ? stepEl.offsetHeight : totalHeight / N;
      const botY = topY + rowH;
      const midY = topY + rowH / 2;

      const isEven = i % 2 === 0;
      const isFirst = i === 0;
      const isLast = i === N - 1;

      if (isFirst) {
        // Tramo horizontal inicial desde el centro superior hasta la primera curva derecha
        d += ` L ${W - R} ${topY}`;
        cumLen += Math.max(0, W / 2 - R);
      }

      // Curva superior (derecha en pares, izquierda en impares)
      if (isEven) {
        d += ` A ${R} ${R} 0 0 1 ${W} ${topY + R}`;
      } else {
        d += ` A ${R} ${R} 0 0 0 0 ${topY + R}`;
      }
      cumLen += arcLen;

      // Posición exacta de la estrella a mitad de la recta vertical
      const distToStar = Math.max(0, midY - (topY + R));
      starYs.push(midY);
      starCumLens.push(cumLen + distToStar);

      // Recta vertical completa del paso
      if (isEven) {
        d += ` L ${W} ${botY - R}`;
      } else {
        d += ` L 0 ${botY - R}`;
      }
      cumLen += Math.max(0, botY - R - (topY + R));

      // Curva inferior
      if (isEven) {
        d += ` A ${R} ${R} 0 0 1 ${W - R} ${botY}`;
      } else {
        d += ` A ${R} ${R} 0 0 0 ${R} ${botY}`;
      }
      cumLen += arcLen;

      // Puente horizontal inferior hacia el siguiente paso (o cierre al centro en el último)
      if (isLast) {
        d += ` L ${W / 2} ${botY}`;
        cumLen += Math.max(0, W / 2 - R);
      } else {
        if (isEven) {
          d += ` L ${R} ${botY}`;
        } else {
          d += ` L ${W - R} ${botY}`;
        }
        cumLen += Math.max(0, W - 2 * R);
      }

      botYs.push(botY);
      stepEndCumLens.push(cumLen);
    }

    const totalLen = Math.max(1, cumLen);
    setTimelineGeometry({
      width: W,
      totalHeight,
      d,
      starYs,
      botYs,
      starFractions: starCumLens.map((l) => l / totalLen),
      stepEndFractions: stepEndCumLens.map((l) => l / totalLen),
    });
  }, [steps.length]);

  useEffect(() => {
    measureTimeline();
    const containerEl = timelineContainerRef.current;
    if (!containerEl) return;

    const ro = new ResizeObserver(() => {
      measureTimeline();
    });
    ro.observe(containerEl);
    stepRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    window.addEventListener("resize", measureTimeline);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureTimeline);
    };
  }, [measureTimeline, locale]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const containerEl = timelineContainerRef.current;
      if (!containerEl || timelineGeometry.totalHeight <= 0) return;

      const rect = containerEl.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.72 - rect.top;

      if (triggerY <= 0) {
        smoothProgress.set(0);
        return;
      }
      if (triggerY >= timelineGeometry.totalHeight) {
        smoothProgress.set(1);
        return;
      }

      // Puntos de control verticales -> fracción exacta sobre el único <path>
      const landmarks: Array<{ y: number; frac: number }> = [{ y: 0, frac: 0 }];
      for (let i = 0; i < timelineGeometry.starYs.length; i++) {
        landmarks.push({
          y: timelineGeometry.starYs[i],
          frac: timelineGeometry.starFractions[i],
        });
        landmarks.push({
          y: timelineGeometry.botYs[i],
          frac: timelineGeometry.stepEndFractions[i],
        });
      }

      let targetFrac = 0;
      for (let k = 0; k < landmarks.length - 1; k++) {
        const curr = landmarks[k];
        const next = landmarks[k + 1];
        if (triggerY >= curr.y && triggerY <= next.y) {
          const span = Math.max(1, next.y - curr.y);
          const t = (triggerY - curr.y) / span;
          targetFrac = curr.frac + t * (next.frac - curr.frac);
          break;
        }
      }

      smoothProgress.set(Math.max(0, Math.min(1, targetFrac)));
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [timelineGeometry, smoothProgress]);

  return (
    <section
      id="services"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col gap-16 sm:gap-24"
      aria-label="Servicios y Proceso Creativo"
    >
      {/* =====================================================================
          1. SECCIÓN DE SERVICIOS Y COMISIONES (Medallones + Card 50/50 limpia)
          ===================================================================== */}
      <div className="flex flex-col items-center text-center gap-8 sm:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            title={tServices("heading") || "Servicios & Comisiones"}
            subtitle={tServices("copy")}
            as="h2"
            icon={true}
          />
        </motion.div>

        {/* Selector de Medallones Circulares con un único borde Gold limpio */}
        <div className="w-full flex items-start justify-start md:justify-center overflow-x-auto no-scrollbar py-8 px-4 gap-5 sm:gap-8 -my-4">
          {services.map((service) => {
            const isSelected = service._id === selectedServiceId;
            const title = locale === "en" ? service.title.en : service.title.es;

            return (
              <div
                key={service._id}
                onClick={() => setSelectedServiceId(service._id)}
                className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group select-none"
              >
                {/* Medallón Circular con un solo borde Gold */}
                <div
                  className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? "scale-110 border-2 border-gold-100 shadow-[0_0_25px_rgba(237,194,158,0.65)]"
                      : "opacity-65 hover:opacity-100 hover:scale-105 border border-gold-200/35 hover:border-gold-200/70"
                  }`}
                >
                  <Image
                    src={service.imageUrl}
                    alt={title}
                    fill
                    sizes="100px"
                    className="object-cover object-center"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity ${
                      isSelected
                        ? "bg-transparent"
                        : "bg-abyss/35 group-hover:bg-transparent"
                    }`}
                  />
                </div>

                {/* Título de la Categoría debajo del Medallón */}
                <span
                  className={`text-xs sm:text-sm font-serif tracking-wide text-center max-w-[115px] transition-colors leading-tight ${
                    isSelected
                      ? "text-gold-50 font-medium drop-shadow-[0_0_8px_rgba(237,194,158,0.5)]"
                      : "text-parchment-muted group-hover:text-gold-200"
                  }`}
                >
                  {title}
                </span>

                {/* Flecha Celestial hacia abajo */}
                <div
                  className={`transition-all duration-300 text-gold-200 -mt-1 ${
                    isSelected
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <icons.celestialChevron className="w-5 h-4 drop-shadow-[0_0_8px_rgba(237,194,158,0.75)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Protagonista 50/50 con Ilustración 1:1 Integrada de Borde a Borde */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-gold-200/15 hover:border-gold-200/35 glass-panel text-left group transition-all"
          >
            {/* Destello astral superior sutil estilo Auralis */}
            <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold-200/50 to-transparent pointer-events-none z-20" />

            {/* Columna Izquierda (50%): Imagen 1:1 integrada de borde a borde en la card */}
            <div className="md:col-span-6 relative aspect-square w-full h-full overflow-hidden bg-abyss/80 border-b md:border-b-0 md:border-r border-gold-200/15">
              <Image
                src={activeService.imageUrl}
                alt={activeTitle}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Columna Derecha (50%): Detalles del Servicio, Meta Box y CTA */}
            <div className="md:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 relative z-10">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-gold-50 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {activeTitle}
                </h3>
                <div className="w-16 h-px bg-gradient-to-r from-gold-200/60 to-transparent" />
                <p className="text-sm sm:text-base font-serif text-parchment-muted leading-relaxed mt-1">
                  {activeDesc}
                </p>
              </div>

              {/* Caja Meta-Group (Inversión + Plazo) y Botón Primary */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white/[0.03] border border-gold-200/15 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between gap-2 text-xs sm:text-sm font-serif">
                    <span className="text-gold-200/90 font-medium">
                      {tServices("cost") || "Inversión estimada:"}
                    </span>
                    <span className="text-gold-50 font-semibold text-right">
                      {activeCost}
                    </span>
                  </div>

                  <div className="h-px w-full bg-gold-200/10" />

                  <div className="flex items-baseline justify-between gap-2 text-xs sm:text-sm font-serif">
                    <span className="text-gold-200/90 font-medium">
                      {tServices("duration") || "Tiempo de entrega:"}
                    </span>
                    <span className="text-parchment-muted text-right">
                      {activeDuration}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs font-serif text-parchment-dark leading-relaxed px-1">
                  {tServices("paymentNote")}
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onSelectService(activeTitle)}
                >
                  {tServices("cta") || "Solicitar presupuesto"}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================================
          2. MI PROCESO CREATIVO: Timeline Progresivo con Scroll
          ===================================================================== */}
      <div className="flex flex-col items-center text-center gap-10 sm:gap-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            title={tWorkflow("heading") || "Mi Proceso Creativo"}
            subtitle={
              tWorkflow("copy") ||
              "Cada gran obra comienza con una chispa de inspiración. Trabajaremos paso a paso para asegurar que el resultado final sea exactamente como lo imaginaste."
            }
            as="h2"
            icon={false}
          />
        </motion.div>

        {/* Contenedor del Timeline Serpenteante Unificado */}
        <div
          ref={timelineContainerRef}
          className="relative w-full max-w-5xl mx-auto flex flex-col"
        >
          {/* =========================================================
              DESKTOP: UN ÚNICO <SVG> Y UN ÚNICO <PATH> CONTINUO
              ========================================================= */}
          <div
            ref={svgTrackRef}
            className="hidden md:block absolute inset-y-0 left-[4%] right-[4%] pointer-events-none z-20"
          >
            {timelineGeometry.d && (
              <>
                <svg
                  width={timelineGeometry.width}
                  height={timelineGeometry.totalHeight}
                  viewBox={`0 0 ${timelineGeometry.width} ${timelineGeometry.totalHeight}`}
                  fill="none"
                  className="w-full h-full overflow-visible"
                >
                  {/* 1. Línea Base continua (#4a3e4d) */}
                  <path
                    d={timelineGeometry.d}
                    stroke="#4a3e4d"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* 2. Línea Dorada Activa continua (un solo trazo de principio a fin) */}
                  <motion.path
                    d={timelineGeometry.d}
                    stroke="#edc29e"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    style={{ pathLength: smoothProgress }}
                    className="drop-shadow-[0_0_8px_rgba(237,194,158,0.65)]"
                  />
                </svg>

                {/* Pétalo de inicio arriba al centro */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-30">
                  <icons.sheet
                    className={`w-3 h-7 transition-colors duration-300 ${
                      progressValue > 0.005
                        ? "text-gold-200 drop-shadow-[0_0_8px_#edc29e]"
                        : "text-[#4a3e4d]"
                    }`}
                  />
                </div>

                {/* Brillitos (Estrellas) directamente por encima de la línea continua, sin círculo bg-abyss que corte la línea */}
                {steps.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  const starY = timelineGeometry.starYs[idx] ?? 0;
                  const threshold = timelineGeometry.starFractions[idx] ?? 1;
                  const isStarLit = progressValue >= threshold - 0.008;

                  return (
                    <div
                      key={`desktop-star-${step._id}`}
                      style={{ top: `${starY}px` }}
                      className={`absolute z-30 flex items-center justify-center ${
                        isEven
                          ? "right-0 translate-x-1/2 -translate-y-1/2"
                          : "left-0 -translate-x-1/2 -translate-y-1/2"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: isStarLit ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative flex items-center justify-center"
                      >
                        <icons.star
                          className={`w-7 h-7 transition-colors duration-250 ${
                            isStarLit
                              ? "text-gold-200 drop-shadow-[0_0_8px_#edc29e]"
                              : "text-[#4a3e4d]"
                          }`}
                        />
                      </motion.div>
                    </div>
                  );
                })}

                {/* Pétalo de cierre abajo al centro */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 -rotate-90 z-30">
                  <icons.sheet
                    className={`w-3 h-7 transition-colors duration-300 ${
                      progressValue >= 0.985
                        ? "text-gold-200 drop-shadow-[0_0_8px_#edc29e]"
                        : "text-[#4a3e4d]"
                    }`}
                  />
                </div>
              </>
            )}
          </div>

          {/* =========================================================
              MOBILE: UNA SOLA LÍNEA CONTINUA VERTICAL CON BRILLITOS ENCIMA
              ========================================================= */}
          <div className="md:hidden absolute top-0 bottom-0 left-3 w-[2px] bg-[#4a3e4d] pointer-events-none z-20">
            <motion.div
              style={{
                scaleY: smoothProgress,
                transformOrigin: "top",
              }}
              className="w-full h-full bg-gold-200 shadow-[0_0_8px_#edc29e]"
            />
          </div>

          {steps.map((step, index) => {
            const title = locale === "en" ? step.title.en : step.title.es;
            const desc =
              locale === "en" ? step.description.en : step.description.es;

            const isEven = index % 2 === 0;
            const threshold = timelineGeometry.starFractions[index] ?? 1;
            const isActive = progressValue >= threshold - 0.02;

            return (
              <div
                key={step._id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="relative w-full py-8 sm:py-11 px-4 sm:px-[9%] z-10"
              >
                {/* Brillito Móvil directamente por encima de la línea vertical sin corte oscuro */}
                <div className="md:hidden absolute top-1/2 left-3 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-none">
                  <icons.star
                    className={`w-5 h-5 transition-colors duration-250 ${
                      isActive
                        ? "text-gold-200 drop-shadow-[0_0_6px_#edc29e]"
                        : "text-[#4a3e4d]"
                    }`}
                  />
                </div>

                {/* =========================================================
                    CONTENIDO DEL PASO (Imagen + Texto alternados)
                    ========================================================= */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center pl-6 md:pl-0">
                  {/* Imagen del paso (aspect-[16/10] como en el diseño original de auralis-app) */}
                  <div
                    className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-abyss/90 border transition-colors duration-500 shadow-xl md:col-span-6 ${
                      isActive ? "border-gold-200/40" : "border-gold-200/15"
                    } ${isEven ? "md:order-1" : "md:order-2"}`}
                  >
                    <Image
                      src={step.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 pointer-events-none" />
                  </div>

                  {/* Texto del paso */}
                  <div
                    className={`flex flex-col gap-3 text-left md:col-span-6 ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl tracking-wide flex items-baseline gap-2.5">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-gold-200 drop-shadow-[0_0_12px_rgba(217,70,239,0.45)]">
                        0{index + 1}.
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f472b6] to-gold-200">
                        {title.replace(/^0\d\.\s*/, "")}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base font-serif text-parchment-muted leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
