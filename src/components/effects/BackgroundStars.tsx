"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Paleta mística Auralis
    const starColors = ["#ffffff", "#fdf5e6", "#edc29e", "#d8b4fe"];
    const particleColors = [
      "rgba(237, 194, 158, ", // Dorado Auralis
      "rgba(253, 245, 230, ", // Luz estelar blanca/marfil
      "rgba(168, 127, 251, ", // Violeta celestial
      "rgba(196, 142, 103, ", // Oro cálido
    ];

    let stars: Star[] = [];
    const particles: Particle[] = [];
    const MAX_PARTICLES = width < 768 ? 40 : 85;
    const STAR_COUNT = width < 768 ? 170 : 350;

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.5 + 0.25,
          alpha: Math.random() * 0.5 + 0.25,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    initStars();

    const spawnParticle = (startY?: number): Particle => {
      const colorBase =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.15), // Flotan hacia arriba suavemente
        alpha: 0,
        maxAlpha: Math.random() * 0.6 + 0.25,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        color: colorBase,
      };
    };

    // Inicializar partículas repartidas
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(spawnParticle());
    }

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Renderizar Estrellas Titilantes
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const currentAlpha = Math.max(
          0.1,
          Math.min(1, star.baseAlpha + twinkle * 0.35)
        );

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Destello de 4 puntas ocasional para las estrellas más grandes
        if (star.size > 1.6 && twinkle > 0.6) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2.5, star.y);
          ctx.lineTo(star.x + star.size * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2.5);
          ctx.lineTo(star.x, star.y + star.size * 2.5);
          ctx.stroke();
        }
      }

      // 2. Renderizar Polvo Mágico / Partículas en Movimiento
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in y Fade out suave
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else if (progress > 0.8) {
          p.alpha = ((1 - progress) / 0.2) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }

        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Si muere o sale de la pantalla, renace abajo
        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = spawnParticle(height + 10);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Canvas animado de estrellas titilantes y partículas cósmicas vivas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Sutil halo etéreo en el fondo para dar calidez y profundidad violeta/dorada */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-45"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(124, 78, 187, 0.16) 0%, rgba(33, 17, 71, 0.08) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}
