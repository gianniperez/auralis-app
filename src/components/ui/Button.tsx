"use client";

import { useState, ReactNode, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import Sparkles from "../effects/Sparkles";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "reliquary"
  | "gem-primary"
  | "gem-secondary"
  | "astral";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  sparkles?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * 1. Corner filigree for Reliquary frame
 */
const ReliquaryCorner = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3.5 h-3.5 text-gold-200 pointer-events-none transition-all duration-300 ${className}`}
  >
    {/* Outer L bracket */}
    <path
      d="M1 19 L1 5 C1 2.8 2.8 1 5 1 L19 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Inner delicate halo */}
    <path
      d="M4 19 L4 7 C4 5.3 5.3 4 7 4 L19 4"
      stroke="#fdf5e6"
      strokeWidth="0.8"
      strokeOpacity="0.7"
      strokeLinecap="round"
    />
    {/* Diamond star at vertex */}
    <path d="M4 1 L6 3.5 L4 6 L2 3.5 Z" fill="#fdf5e6" />
    <circle cx="4" cy="3.5" r="0.8" fill="#ffffff" />
  </svg>
);

/**
 * 2. Heraldic bracket for Astral variant
 */
const AstralBracket = ({ isRight = false }: { isRight?: boolean }) => (
  <svg
    viewBox="0 0 16 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3 h-6 text-gold-200 transition-all duration-300 shrink-0 ${
      isRight ? "scale-x-[-1]" : ""
    }`}
  >
    <path
      d="M14 2 C6 6, 2 11, 2 16 C2 21, 6 26, 14 30"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M11 6 C6 10, 5 13, 5 16 C5 19, 6 22, 11 26"
      stroke="#fdf5e6"
      strokeWidth="0.75"
      strokeOpacity="0.6"
      strokeLinecap="round"
    />
    <circle cx="2" cy="16" r="1.5" fill="#fdf5e6" />
  </svg>
);

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  sparkles = true,
  disabled = false,
  className = "",
  children,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Size padding
  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs tracking-wider",
    md: "px-6 py-2.5 text-sm tracking-wide",
    lg: "px-8 py-3.5 text-base tracking-wide font-medium",
  };

  const gemClipPath =
    "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)";

  // =========================================================================
  // Content Inner Renderers per Variant
  // =========================================================================

  const renderContent = () => {
    // -------------------------------------------------------------
    // OPCIÓN 1: RELIQUARY (Marco de Orfebrería SVG con Esquinas)
    // -------------------------------------------------------------
    if (variant === "reliquary") {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Sparkles reactivos */}
          {sparkles && <Sparkles active={isHovered && !disabled} />}

          {/* 4 Esquinas de Orfebrería SVG */}
          <div className="absolute top-1 left-1">
            <ReliquaryCorner
              className={
                isHovered
                  ? "text-gold-100 scale-110 drop-shadow-[0_0_8px_#edc29e]"
                  : "text-gold-200/90"
              }
            />
          </div>
          <div className="absolute top-1 right-1 scale-x-[-1]">
            <ReliquaryCorner
              className={
                isHovered
                  ? "text-gold-100 scale-110 drop-shadow-[0_0_8px_#edc29e]"
                  : "text-gold-200/90"
              }
            />
          </div>
          <div className="absolute bottom-1 left-1 scale-y-[-1]">
            <ReliquaryCorner
              className={
                isHovered
                  ? "text-gold-100 scale-110 drop-shadow-[0_0_8px_#edc29e]"
                  : "text-gold-200/90"
              }
            />
          </div>
          <div className="absolute bottom-1 right-1 -scale-100">
            <ReliquaryCorner
              className={
                isHovered
                  ? "text-gold-100 scale-110 drop-shadow-[0_0_8px_#edc29e]"
                  : "text-gold-200/90"
              }
            />
          </div>

          {/* Líneas perimetrales de oro con micro-diamantes centrales */}
          <span className="absolute top-[5px] inset-x-5 h-px bg-gradient-to-r from-transparent via-gold-200/70 to-transparent" />
          <span className="absolute bottom-[5px] inset-x-5 h-px bg-gradient-to-r from-transparent via-gold-200/70 to-transparent" />
          <span className="absolute inset-y-5 left-[5px] w-px bg-gradient-to-b from-transparent via-gold-200/70 to-transparent" />
          <span className="absolute inset-y-5 right-[5px] w-px bg-gradient-to-b from-transparent via-gold-200/70 to-transparent" />

          {/* Pequeños rombos heráldicos en el centro superior e inferior */}
          <span className="absolute top-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold-100 shadow-[0_0_6px_#edc29e]" />
          <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-gold-100 shadow-[0_0_6px_#edc29e]" />

          {/* Shimmer interno en vaivén */}
          <div className="absolute inset-2 rounded-lg overflow-hidden pointer-events-none">
            {isHovered && (
              <motion.span
                initial={{ x: "-130%" }}
                animate={{ x: ["-130%", "210%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-3/4 h-full skew-x-[-25deg]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 0%, rgba(237,194,158,0.1) 20%, rgba(253,245,230,0.65) 50%, rgba(237,194,158,0.1) 80%, transparent 100%)",
                }}
              />
            )}
          </div>

          {/* Contenido con luz dorada */}
          <div className="relative z-10 flex items-center justify-center gap-2 px-3 py-1 text-gold-50 drop-shadow-[0_0_10px_rgba(237,194,158,0.7)]">
            {icon && iconPosition === "left" && (
              <span className="shrink-0">{icon}</span>
            )}
            <span className="font-serif tracking-wide">{children}</span>
            {icon && iconPosition === "right" && (
              <span className="shrink-0">{icon}</span>
            )}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // RUNA OCTOGONAL BISELADA (Dúo 2: Primary y Secondary Definitivos)
    // -------------------------------------------------------------
    if (
      variant === "primary" ||
      variant === "gem-primary" ||
      variant === "secondary" ||
      variant === "gem-secondary"
    ) {
      const isPrimary = variant === "primary" || variant === "gem-primary";
      return (
        <div className="relative inline-flex items-center justify-center w-full h-full">
          {/* Sparkles reactivos fuera del clipPath para no ser recortados */}
          {sparkles && (
            <Sparkles
              active={isHovered && !disabled}
              colors={
                isPrimary
                  ? ["#ffffff", "#fdf5e6", "#edc29e"]
                  : ["#ffffff", "#fdf5e6", "#edc29e"]
              }
            />
          )}

          {/* Marco Biselado Octogonal */}
          <div
            className="relative p-[1.5px] w-full h-full transition-transform duration-300"
            style={{
              clipPath: gemClipPath,
              background: isPrimary
                ? "linear-gradient(135deg, #edc29e 0%, #7c4ebb 50%, #fdf5e6 100%)"
                : "linear-gradient(135deg, #fdf5e6 0%, #edc29e 50%, #c59267 100%)",
            }}
          >
            {/* Cuerpo interior con el mismo corte achaflanado */}
            <div
              className={`relative flex items-center justify-center gap-2.5 ${sizeClasses[size]} overflow-hidden`}
              style={{
                clipPath: gemClipPath,
                background: isPrimary
                  ? "linear-gradient(180deg, #1c0e2e 0%, #0c0414 100%)"
                  : "rgba(18, 9, 28, 0.75)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Shimmer especular atravesando las facetas */}
              {isHovered && (
                <motion.span
                  initial={{ x: "-130%" }}
                  animate={{ x: ["-130%", "210%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-2/3 h-full skew-x-[-30deg] pointer-events-none"
                  style={{
                    background: isPrimary
                      ? "linear-gradient(115deg, transparent, rgba(147,95,224,0.4) 40%, rgba(253,245,230,0.6) 60%, transparent)"
                      : "linear-gradient(115deg, transparent, rgba(237,194,158,0.3) 30%, rgba(253,245,230,0.8) 50%, transparent)",
                  }}
                />
              )}

              {icon && iconPosition === "left" && (
                <span className="relative z-10 shrink-0">{icon}</span>
              )}
              <span
                className={`relative z-10 font-serif ${
                  isPrimary
                    ? "text-gold-50 drop-shadow-[0_0_8px_rgba(168,121,230,0.7)] font-medium"
                    : "text-parchment hover:text-gold-100 drop-shadow-[0_0_6px_rgba(237,194,158,0.4)] font-medium"
                }`}
              >
                {children}
              </span>
              {icon && iconPosition === "right" && (
                <span className="relative z-10 shrink-0">{icon}</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // OPCIÓN: ASTRAL BRACKETS (Corchetes Flotantes con Constelación)
    // -------------------------------------------------------------
    if (variant === "astral") {
      const astralPadding = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-xs sm:text-sm",
        lg: "px-7 py-3 text-sm sm:text-base",
      };

      return (
        <div
          className={`relative inline-flex items-center gap-3 group ${astralPadding[size]}`}
        >
          {/* Corchete Izquierdo que se expande al hover */}
          <motion.div
            animate={
              isHovered ? { x: -6, opacity: 1 } : { x: 0, opacity: 0.75 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AstralBracket isRight={false} />
          </motion.div>

          {/* Texto Central */}
          <div className="relative flex items-center gap-2 text-parchment group-hover:text-gold-100 font-serif transition-colors">
            {icon && iconPosition === "left" && (
              <span className="shrink-0">{icon}</span>
            )}
            <span className="tracking-widest uppercase font-medium">
              {children}
            </span>
            {icon && iconPosition === "right" && (
              <span className="shrink-0">{icon}</span>
            )}
          </div>

          {/* Corchete Derecho que se expande al hover */}
          <motion.div
            animate={isHovered ? { x: 6, opacity: 1 } : { x: 0, opacity: 0.75 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AstralBracket isRight={true} />
          </motion.div>

          {/* Línea horizontal de constelación inferior que se dibuja al hover */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute -bottom-1 inset-x-6 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent pointer-events-none"
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // GHOST (Limpio, sin borde en hover, sutil brillo áureo)
    // -------------------------------------------------------------
    return (
      <>
        {icon && iconPosition === "left" && (
          <span className="relative z-10 mr-2">{icon}</span>
        )}
        <span className="relative z-10 font-serif">{children}</span>
        {icon && iconPosition === "right" && (
          <span className="relative z-10 ml-2">{icon}</span>
        )}
      </>
    );
  };

  // Base styling for standard variants
  const standardClasses = {
    primary:
      "bg-transparent p-0 drop-shadow-[0_0_12px_rgba(124,78,187,0.35)] hover:drop-shadow-[0_0_24px_rgba(147,95,224,0.65)]",
    secondary:
      "bg-transparent p-0 drop-shadow-[0_0_12px_rgba(237,194,158,0.3)] hover:drop-shadow-[0_0_22px_rgba(237,194,158,0.6)]",
    ghost:
      "bg-transparent text-parchment-muted hover:text-gold-100 hover:bg-surface/30 backdrop-blur-sm rounded-xl",
    reliquary:
      "bg-gradient-to-b from-[#180a29] to-[#080210] p-1 border border-gold-200/40 hover:border-gold-200/80 shadow-[0_0_24px_rgba(33,17,71,0.8)] hover:shadow-[0_0_32px_rgba(237,194,158,0.35)] rounded-lg",
    "gem-primary":
      "bg-transparent p-0 drop-shadow-[0_0_12px_rgba(124,78,187,0.35)] hover:drop-shadow-[0_0_24px_rgba(147,95,224,0.65)]",
    "gem-secondary":
      "bg-transparent p-0 drop-shadow-[0_0_12px_rgba(237,194,158,0.3)] hover:drop-shadow-[0_0_22px_rgba(237,194,158,0.6)]",
    astral: "bg-transparent hover:bg-surface/25 rounded-full",
  };

  const isCustomWrapper =
    variant === "primary" ||
    variant === "secondary" ||
    variant.startsWith("gem-") ||
    variant === "astral";
  const finalSize = isCustomWrapper ? "" : sizeClasses[size];

  // Link wrapper
  if (href && !disabled) {
    const isAnchor = href.startsWith("#");

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
      }
      if (isAnchor) {
        e.preventDefault();
        const targetId = href.replace(/^#/, "");
        const element = document.getElementById(targetId);
        if (element) {
          const topOffset =
            element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    };

    return (
      <Link
        href={href}
        className={`inline-block ${className}`}
        onClick={handleClick}
      >
        <motion.span
          className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-visible will-change-transform transition-all duration-300 ${standardClasses[variant]} ${finalSize}`}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderContent()}
        </motion.span>
      </Link>
    );
  }

  // Button wrapper
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-visible will-change-transform transition-all duration-300 ${standardClasses[variant]} ${finalSize} ${
        disabled ? "opacity-45 cursor-not-allowed pointer-events-none" : ""
      } ${className}`}
      whileHover={disabled ? undefined : { scale: 1.04, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...(props as HTMLMotionProps<"button">)}
    >
      {renderContent()}
    </motion.button>
  );
}
