"use client";
import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let stars: {x:number,y:number,len:number,speed:number,alpha:number}[] = [];
    let w: number, h: number;

    function init() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: Math.random() * 100 + 20,
        speed: Math.random() * 6 + 3,
        alpha: Math.random() * 0.6 + 0.2
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y + s.len);
        grad.addColorStop(0, `rgba(232,180,72,${s.alpha})`);
        grad.addColorStop(1, "rgba(232,180,72,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y + s.len);
        ctx.stroke();
      });
    }

    function update() {
      stars.forEach(s => {
        s.x += -s.speed;
        s.y += s.speed;
        if (s.x < -50 || s.y > h + 50) {
          s.x = Math.random() * (w + 100);
          s.y = -20;
          s.len = Math.random() * 100 + 20;
          s.speed = Math.random() * 6 + 3;
          s.alpha = Math.random() * 0.6 + 0.2;
        }
      });
    }

    function animate() {
      draw();
      update();
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 md:hidden" />;
}
