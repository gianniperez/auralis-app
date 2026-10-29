"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface SparkItem {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  driftX1: number;
  driftX2: number;
  gradient: string;
  shadowColor: string;
}

interface SparksProps {
  count?: number;
  className?: string;
}

/**
 * Función pseudo-aleatoria determinista (PRNG puro).
 * Garantiza valores idénticos en SSR y cliente, eliminando errores de impureza
 * (Math.random) y evitando warnings de re-render con setState en useEffect.
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function Sparks({ count = 50, className = "" }: SparksProps) {
  // Pre-calcular partículas de forma determinista y pura
  const sparks = useMemo<SparkItem[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const r1 = pseudoRandom(i * 7 + 1);
      const r2 = pseudoRandom(i * 13 + 3);
      const r3 = pseudoRandom(i * 19 + 5);
      const r4 = pseudoRandom(i * 23 + 7);
      const r5 = pseudoRandom(i * 29 + 11);
      const r6 = pseudoRandom(i * 31 + 13);

      const isAmethyst = r1 < 0.15;
      const size = Number((r2 * 3.5 + 2).toFixed(2)); // tamaño en px redondeado
      const left = Number((r3 * 100).toFixed(2)); // 0% a 100% horizontal
      const duration = Number((r4 * 5 + 4.5).toFixed(2)); // duración en segundos
      const delay = Number((r5 * 6).toFixed(2)); // desfase
      const driftX1 = Number((r6 * 60 - 30).toFixed(2));
      const driftX2 = Number(((1 - r6) * 80 - 40).toFixed(2));

      return {
        id: i,
        size,
        left,
        duration,
        delay,
        driftX1,
        driftX2,
        gradient: isAmethyst
          ? "linear-gradient(135deg, #ded2ee 0%, #7c4ebb 100%)"
          : "linear-gradient(135deg, #fdf5e6 0%, #edc29e 60%, #e3a46e 100%)",
        shadowColor: isAmethyst
          ? "rgba(124, 78, 187, 0.85)"
          : "rgba(237, 194, 158, 0.85)",
      };
    });
  }, [count]);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[3] ${className}`}
      aria-hidden="true"
    >
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: spark.size,
            height: spark.size,
            left: `${spark.left}%`,
            bottom: "-5%",
            background: spark.gradient,
            filter: `blur(0.5px) drop-shadow(0 0 8px ${spark.shadowColor})`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: [0, "-125vh"],
            opacity: [0, 0.95, 0.85, 0],
            scale: [0, 1.2, 0.9, 0.4],
            x: [0, spark.driftX1, spark.driftX2],
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
