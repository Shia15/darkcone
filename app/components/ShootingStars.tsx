"use client";
import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;                      // ✅ guard
    const ctx = canvas.getContext("2d");
    if (!ctx) return;                         // ✅ guard

    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = { x: number; y: number; vx: number; vy: number; life: number };
    const stars: Star[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6,
      vx: -2 - Math.random() * 2,
      vy: 1 + Math.random() * 2,
      life: 80 + Math.random() * 120,
    }));

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + 12, s.y - 6);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#E8B448";
        ctx.stroke();

        if (s.life <= 0 || s.x < -50 || s.y > canvas.height + 50) {
          s.x = window.innerWidth + Math.random() * 100;
          s.y = Math.random() * window.innerHeight * 0.5;
          s.vx = -2 - Math.random() * 2;
          s.vy = 1 + Math.random() * 2;
          s.life = 80 + Math.random() * 120;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 md:hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
