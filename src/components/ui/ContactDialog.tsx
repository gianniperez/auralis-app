"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Drawer from "./Drawer";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import { icons } from "@/icons";

const CONTACT_EMAIL = "auralis.inbox@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/auralisart_";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: "es" | "en";
  initialService?: string;
}

const SERVICE_OPTIONS_ES = [
  "Diseño de Personajes",
  "Retratos Fantásticos",
  "RPG & Arte de Videojuegos",
  "Portada para Libros",
  "Paisajes & Worldbuilding",
  "Consulta General / Otro",
];

const SERVICE_OPTIONS_EN = [
  "Character Design",
  "Fantasy Portraits",
  "RPG & Video Game Art",
  "Book Cover Illustration",
  "Landscapes & Worldbuilding",
  "General Inquiry / Other",
];

export default function ContactDialog({
  isOpen,
  onClose,
  locale = "es",
  initialService = "",
}: ContactDialogProps) {
  const options = locale === "en" ? SERVICE_OPTIONS_EN : SERVICE_OPTIONS_ES;
  const defaultOption = options[options.length - 1];

  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService || defaultOption);
  const [prevInitialService, setPrevInitialService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sincronizar service cuando cambie initialService durante el render
  if (initialService && initialService !== prevInitialService) {
    setPrevInitialService(initialService);
    setService(initialService);
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cerrar el desplegable custom al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
        }),
      });

      const data = await res.json();

      // Si no hay API key configurada todavía, abre mailto transparente como respaldo
      if (data.fallbackMailto) {
        const subject = encodeURIComponent(
          `✦ Encargo Auralis de ${name} (${service})`,
        );
        const body = encodeURIComponent(
          `Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\n\nDetalles:\n${message}`,
        );
        window.open(
          `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
          "_blank",
        );
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error(err);
      const subject = encodeURIComponent(
        `✦ Encargo Auralis de ${name} (${service})`,
      );
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\n\nDetalles:\n${message}`,
      );
      window.open(
        `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
        "_blank",
      );
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  const formContent = (
    <div className="flex flex-col gap-4 pt-1">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-8 gap-4"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-gold-100">
              <icons.success className="w-8 h-8 text-gold-100" />
            </div>
            <h4 className="font-display text-2xl text-gold-100">
              {locale === "en" ? "Message Sent!" : "¡Mensaje Enviado!"}
            </h4>
            <p className="text-sm font-serif text-parchment-muted max-w-sm">
              {locale === "en"
                ? "Your message has been received. I usually reply within a few hours (and always in under 24 hours) to start shaping your vision."
                : "He recibido tu mensaje. Suelo responder en pocas horas (y siempre en menos de 24 hs) para comenzar a darle forma a tu idea."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-xs sm:text-sm font-serif text-parchment-muted leading-relaxed">
              {locale === "en"
                ? "Tell me about your character, project, or inquiry. I usually reply within a few hours (always under 24h)."
                : "Cuéntame sobre tu personaje, proyecto o consulta. Suelo responder en pocas horas (siempre en menos de 24 hs)."}
            </p>

            {/* Fila 1: Nombre y Email en 2 columnas para reducir altura y fricción */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Input
                id="c-name"
                label={locale === "en" ? "Name" : "Nombre"}
                placeholder={locale === "en" ? "Ex: Gianni" : "Ej: Gianni"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                id="c-email"
                type="email"
                label="Email"
                placeholder={
                  locale === "en" ? "you@email.com" : "tu@correo.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Fila 2: Selector de Tipo de Encargo Custom (sin el menú nativo de Windows) */}
            <div
              ref={dropdownRef}
              className="relative flex flex-col gap-1.5 text-left"
            >
              <label
                id="c-service-label"
                className="text-xs font-serif text-parchment-muted tracking-wide"
              >
                {locale === "en" ? "Commission Type" : "Tipo de encargo"}
              </label>

              <button
                type="button"
                aria-labelledby="c-service-label"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && isDropdownOpen) {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                  }
                }}
                className={`glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-serif flex items-center justify-between text-left cursor-pointer select-none ${
                  isDropdownOpen ? "glass-input-active" : ""
                }`}
              >
                <span className="truncate pr-3 text-parchment">{service}</span>
                <icons.celestialChevron
                  className={`w-4 h-3.5 text-gold-200 shrink-0 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 py-1.5 rounded-xl bg-[#12091c]/95 backdrop-blur-xl border border-gold-200/30 shadow-[0_14px_35px_rgba(0,0,0,0.85)] overflow-hidden"
                  >
                    {options.map((opt) => {
                      const isSelected = service === opt;
                      return (
                        <li key={opt} role="option" aria-selected={isSelected}>
                          <button
                            type="button"
                            onClick={() => {
                              setService(opt);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2 text-xs sm:text-sm font-serif text-left flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-amethyst-300/25 text-gold-50 font-medium"
                                : "text-parchment-muted hover:bg-white/[0.06] hover:text-gold-100"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && (
                              <icons.star className="w-3.5 h-3.5 text-gold-200 drop-shadow-[0_0_6px_#edc29e]" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Fila 3: Mensaje / Idea con sugerencia de links integrada */}
            <Textarea
              id="c-message"
              label={
                locale === "en" ? "Your idea or inquiry" : "Tu idea o consulta"
              }
              placeholder={
                locale === "en"
                  ? "Describe your character, scene, or project. Feel free to paste reference links (Pinterest, Drive) here..."
                  : "Describe tu personaje, escena o proyecto. Si tienes enlaces de referencia (Pinterest, Drive), puedes pegarlos aquí..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />

            {/* Botón Principal Protagonista */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSending}
              className="mt-1 w-full justify-center"
            >
              {isSending
                ? locale === "en"
                  ? "Sending..."
                  : "Enviando..."
                : locale === "en"
                  ? "Send Message"
                  : "Enviar mensaje"}
            </Button>

            {/* Pie de contacto directo: Microcopy guía + Email copiable e Instagram DM */}
            <div className="flex flex-col items-center gap-2.5 pt-3.5 mt-0.5 border-t border-gold-200/15">
              <span className="text-[11px] font-serif text-parchment tracking-wide">
                {locale === "en"
                  ? "Prefer to reach out directly? Contact me via:"
                  : "¿Prefieres escribirme directo? Contáctame por:"}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-serif">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title={
                    locale === "en"
                      ? "Click to copy email address"
                      : "Clic para copiar dirección de correo"
                  }
                  className="inline-flex items-center gap-1.5 text-parchment-muted hover:text-gold-100 transition-colors cursor-pointer group"
                >
                  <icons.email className="w-3.5 h-3.5 text-gold-200/80 group-hover:text-gold-100 transition-colors" />
                  <span className="underline decoration-gold-200/35 underline-offset-4 group-hover:decoration-gold-200">
                    {CONTACT_EMAIL}
                  </span>
                  {copiedEmail && (
                    <span className="text-[10px] text-gold-200 font-medium px-1.5 py-0.5 rounded bg-gold-200/10 border border-gold-200/25">
                      {locale === "en" ? "Copied!" : "¡Copiado!"}
                    </span>
                  )}
                </button>

                <span className="text-gold-200/25 select-none">•</span>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-parchment-muted hover:text-gold-100 transition-colors group"
                >
                  <icons.instagram className="w-3.5 h-3.5 text-gold-200/80 group-hover:text-gold-100 transition-colors" />
                  <span className="underline decoration-gold-200/35 underline-offset-4 group-hover:decoration-gold-200">
                    @auralisart_
                  </span>
                </a>
              </div>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );

  const dialogTitle =
    locale === "en"
      ? "Let’s Bring Your Idea to Life"
      : "Démosle vida a tu idea";

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title={dialogTitle}>
        {formContent}
      </Drawer>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dialogTitle}>
      {formContent}
    </Modal>
  );
}
