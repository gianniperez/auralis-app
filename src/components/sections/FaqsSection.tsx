"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { icons } from "@/icons";

interface FaqQuestion {
  heading: string;
  copy: string;
}

interface FaqCategory {
  heading: string;
  questions: FaqQuestion[];
}

interface FaqsSectionProps {
  onOpenContact?: () => void;
}

export default function FaqsSection({ onOpenContact }: FaqsSectionProps) {
  const tFaqs = useTranslations("Faqs");
  const categories = tFaqs.raw("faqsList") as FaqCategory[];

  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(0);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<string | null>(
    "0-0",
  );

  const categoryIcons = [
    <icons.faq1 key="1" className="w-5 h-5 text-gold-200" />,
    <icons.faq2 key="2" className="w-5 h-5 text-gold-200" />,
    <icons.faq3 key="3" className="w-5 h-5 text-gold-200" />,
    <icons.faq4 key="4" className="w-5 h-5 text-gold-200" />,
    <icons.faq5 key="5" className="w-5 h-5 text-gold-200" />,
  ];

  const toggleCategory = (idx: number) => {
    setOpenCategoryIndex((prev) => (prev === idx ? null : idx));
  };

  const toggleQuestion = (catIdx: number, qIdx: number) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenQuestionIndex((prev) => (prev === key ? null : key));
  };

  return (
    <section
      id="faqs"
      className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col items-center gap-12"
      aria-label="Preguntas Frecuentes"
    >
      {/* 1. Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.8 }}
      >
        <Heading
          title={tFaqs("heading") || "Preguntas Frecuentes"}
          subtitle={
            tFaqs("copy") ||
            "¿Tienes alguna duda sobre comisiones, plazos o pagos? Encuentra aquí todas las respuestas."
          }
          as="h2"
          icon={true}
        />
      </motion.div>

      {/* 2. FAQ Categories Accordion: Limpio y Sobrio */}
      <div className="relative w-full flex flex-col gap-4">
        {categories.map((category, catIdx) => {
          const isCategoryOpen = openCategoryIndex === catIdx;

          return (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                isCategoryOpen
                  ? "holo-card-a"
                  : "glass-panel border border-gold-200/15 hover:border-gold-200/35"
              }`}
            >
              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleCategory(catIdx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-gold-200/5 transition-colors select-none"
                aria-expanded={isCategoryOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Ícono de categoría libre y limpio sin caja rígida */}
                  <div className="text-gold-200 shrink-0">
                    {categoryIcons[catIdx] || (
                      <icons.star className="w-5 h-5 text-gold-200" />
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-gold-50 tracking-wide">
                    {category.heading}
                  </h3>
                </div>

                {/* Botón + / - con aro sutil */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isCategoryOpen
                      ? "border border-gold-200/60 bg-gold-200/15 text-gold-100"
                      : "border border-gold-200/25 text-gold-200/80 bg-abyss/60"
                  }`}
                >
                  {isCategoryOpen ? (
                    <icons.sub className="w-3.5 h-3.5" />
                  ) : (
                    <icons.add className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {/* Category Questions */}
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-gold-200/15 px-5 sm:px-6 pb-5 pt-3 flex flex-col gap-3"
                  >
                    {category.questions.map((q, qIdx) => {
                      const questionKey = `${catIdx}-${qIdx}`;
                      const isQuestionOpen = openQuestionIndex === questionKey;

                      return (
                        <div
                          key={qIdx}
                          className={`rounded-xl overflow-hidden transition-all ${
                            isQuestionOpen
                              ? "border border-amethyst-300/40 bg-amethyst-500/35 shadow-[0_0_15px_-4px_rgba(124,78,187,0.3)]"
                              : "border border-gold-200/10 bg-abyss/45 hover:border-gold-200/25"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleQuestion(catIdx, qIdx)}
                            className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gold-200/5 transition-colors select-none"
                            aria-expanded={isQuestionOpen}
                          >
                            <span className="font-serif text-sm sm:text-base text-parchment font-medium pr-4">
                              {q.heading}
                            </span>
                            <span className="text-gold-200/80 shrink-0 text-xs">
                              {isQuestionOpen ? (
                                <icons.sub className="w-3 h-3" />
                              ) : (
                                <icons.add className="w-3 h-3" />
                              )}
                            </span>
                          </button>

                          <AnimatePresence>
                            {isQuestionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden px-4 pb-4 pt-1 text-xs sm:text-sm font-serif text-parchment-muted leading-relaxed border-t border-amethyst-300/15 [&>b]:text-gold-100 [&>b]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: q.copy }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Final Conversion CTA Banner: Caja con borde doradito sutil como antes */}
      {onOpenContact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7 }}
          className="w-full mt-6 glass-panel rounded-2xl p-8 sm:p-10 border border-gold-200/20 flex flex-col items-center text-center gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-200/50 to-transparent" />
          <icons.gradLis className="w-6 h-6 text-gold-200" />
          <h3 className="font-display text-2xl sm:text-3xl text-gold-50 tracking-wide">
            {tFaqs("bottomCtaHeading")}
          </h3>
          <p className="text-sm sm:text-base font-serif text-parchment-muted max-w-lg leading-relaxed">
            {tFaqs("bottomCtaCopy")}
          </p>
          <div className="mt-2">
            <Button variant="primary" size="lg" onClick={onOpenContact}>
              {tFaqs("bottomCtaButton")}
            </Button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
