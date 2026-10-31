"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Book = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  glyph: string;
  accent: string;
  href?: string;
};

const BOOKS: Book[] = [
  {
    id: "computer-brains",
    title: "The Amazing World of Computer Brains",
    subtitle: "Curious circuits & thinking machines",
    gradient: "linear-gradient(135deg, #67e8f9 0%, #38bdf8 50%, #6366f1 100%)",
    glyph: "◈",
    accent: "#06b6d4",
    href: "/realm/computer-brains",
  },
  {
    id: "boho-bloom",
    title: "Boho Bloom",
    subtitle: "Magical Garden Dreams",
    gradient: "linear-gradient(135deg, #f9a8d4 0%, #fbcfe8 35%, #c084fc 100%)",
    glyph: "❀",
    accent: "#ec4899",
  },
  {
    id: "zoom-the-zipper",
    title: "Zoom the Zipper",
    subtitle: "Adventures in Fast Fun Ideas",
    gradient: "linear-gradient(135deg, #fde68a 0%, #fb923c 50%, #ef4444 100%)",
    glyph: "⚡",
    accent: "#f97316",
  },
  {
    id: "chaos-to-code",
    title: "From Chaos to Code",
    subtitle: "How order emerges from the noise",
    gradient: "linear-gradient(135deg, #c084fc 0%, #818cf8 40%, #34d399 100%)",
    glyph: "✦",
    accent: "#a78bfa",
  },
  {
    id: "flow-notebook",
    title: "The Flow Notebook",
    subtitle: "Ari & Flow's cozy adventure in thinking",
    gradient: "linear-gradient(135deg, #a7f3d0 0%, #5eead4 45%, #38bdf8 100%)",
    glyph: "✿",
    accent: "#14b8a6",
  },
];

type Sparkle = { id: number; left: number; size: number };

function RealmConstellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 260;
    const W = canvas.width;
    const H = canvas.height;

    const nodes = [
      { x: W * 0.15, y: H * 0.5, col: "#ff69b4", label: "Computer\nBrains", phase: 0 },
      { x: W * 0.35, y: H * 0.5, col: "#a78bfa", label: "Boho\nBloom", phase: 1.2 },
      { x: W * 0.55, y: H * 0.5, col: "#00ffcc", label: "Zoom the\nZipper", phase: 2.1 },
      { x: W * 0.75, y: H * 0.5, col: "#fbbf24", label: "Flow\nNotebook", phase: 0.7 },
    ];

    const stars: { x: number; y: number; r: number; phase: number }[] = [];
    for (let i = 0; i < 60; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2, phase: Math.random() * Math.PI * 2 });
    }

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(10,0,31,0.2)";
      ctx.fillRect(0, 0, W, H);
      t++;

      stars.forEach((s) => {
        const a = 0.4 + 0.4 * Math.sin(t * 0.03 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      nodes.forEach((b, i) => {
        const pulse = 1 + 0.12 * Math.sin(t * 0.04 + b.phase);
        const g = ctx.createRadialGradient(b.x, b.y, 4, b.x, b.y, 32 * pulse);
        g.addColorStop(0, b.col + "cc");
        g.addColorStop(0.5, b.col + "44");
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.rect(b.x - 18 * pulse, b.y - 24 * pulse, 36 * pulse, 48 * pulse);
        ctx.fillStyle = g;
        ctx.shadowColor = b.col;
        ctx.shadowBlur = 22 * pulse;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = b.col;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = b.col;
        ctx.font = "bold 8px ui-monospace, monospace";
        ctx.textAlign = "center";
        b.label.split("\n").forEach((ln, li) => ctx.fillText(ln, b.x, b.y - 4 + li * 11));

        if (i < nodes.length - 1) {
          const b2 = nodes[i + 1];
          const pkt = (t * 0.018 + i * 0.6) % 1;
          const px = b.x + (b2.x - b.x) * pkt;
          const py = b.y + (b2.y - b.y) * pkt;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.shadowColor = "#fff";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
          const g2 = ctx.createLinearGradient(b.x, b.y, b2.x, b2.y);
          g2.addColorStop(0, b.col + "55");
          g2.addColorStop(1, b2.col + "55");
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b2.x, b2.y);
          ctx.strokeStyle = g2;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      ctx.fillStyle = "rgba(255,105,180,0.45)";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText("AETHER CHILDREN'S REALM · LEARNING IN LAYERS · IMAGINATION → KNOWLEDGE", 14, 18);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={ref} style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }} />;
}

export default function RealmPage() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let id = 0;
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const interval = setInterval(() => {
      const s: Sparkle = { id: id++, left: Math.random() * 100, size: 12 + Math.random() * 22 };
      setSparkles((prev) => [...prev.slice(-30), s]);
      const t = setTimeout(() => {
        timeouts.delete(t);
        setSparkles((prev) => prev.filter((p) => p.id !== s.id));
      }, 6000);
      timeouts.add(t);
    }, 380);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#0a001f",
        color: "#fff",
        fontFamily: "'Comic Sans MS', 'Quicksand', system-ui, cursive",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes glow-title {
          from { text-shadow: 0 0 20px #ff69b4, 0 0 40px #ff69b4; }
          to { text-shadow: 0 0 35px #00ffff, 0 0 70px #00ffff, 0 0 90px #ff69b4; }
        }
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(100vh) scale(0) rotate(0deg); }
          15% { opacity: 1; }
          50% { transform: translateY(40vh) scale(1) rotate(180deg); }
          100% { opacity: 0; transform: translateY(-10vh) scale(0.4) rotate(360deg); }
        }
        @keyframes neb-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 20px); }
        }
        .realm-card { position: relative; transition: transform 0.5s ease, box-shadow 0.5s ease; }
        .realm-card:hover { transform: translateY(-22px) scale(1.06); }
        .realm-card:hover .conic-glow { opacity: 1; }
        .conic-glow {
          position: absolute; inset: -2px; border-radius: 34px; opacity: 0;
          background: conic-gradient(from 0deg, #ff69b4, #00ffff, #c084fc, #ff69b4);
          transition: opacity 0.7s ease; z-index: 0; filter: blur(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .realm-card, .realm-card:hover { transition: none; transform: none; }
        }
      `}</style>

      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,100,255,0.35) 0%, transparent 55%),
          radial-gradient(ellipse 70% 50% at 80% 70%, rgba(100,200,255,0.40) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 50%, rgba(192,132,252,0.18) 0%, transparent 60%),
          linear-gradient(180deg, #0a001f 0%, #1a0033 50%, #0a001f 100%)
        `,
        animation: "neb-drift 22s ease-in-out infinite",
        filter: "blur(2px)",
      }} />

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 137.508) % 100}%`,
            top: `${(i * 91.7) % 100}%`,
            width: i % 6 === 0 ? 3 : 1.5,
            height: i % 6 === 0 ? 3 : 1.5,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#fbcfe8" : "white",
            opacity: 0.2 + (i % 5) * 0.13,
            boxShadow: i % 6 === 0 ? `0 0 8px ${i % 2 === 0 ? "#ff69b4" : "#67e8f9"}` : "none",
          }} />
        ))}
      </div>

      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {sparkles.map((s) => (
          <div key={s.id} style={{
            position: "absolute",
            left: `${s.left}vw`,
            bottom: 0,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, white 0%, #ff69b4 50%, transparent 70%)",
            borderRadius: "50%",
            animation: "float-up 6s linear forwards",
            filter: "blur(0.5px)",
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "2rem 1rem 4rem" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto 1rem", padding: "0 1rem" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,105,180,0.08)",
            border: "1px solid rgba(255,105,180,0.28)",
            borderRadius: 8,
            padding: "0.3rem 1rem",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#ff69b4",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, monospace",
          }}>
            Library · live
          </div>
        </div>

        <div style={{ maxWidth: 1500, margin: "0 auto 1.5rem", padding: "0 1rem" }}>
          <div style={{
            background: "rgba(10,0,31,0.85)",
            border: "1px solid rgba(255,105,180,0.15)",
            borderLeft: "3px solid #ff69b4",
            borderRadius: 10,
            padding: 20,
          }}>
            <h2 style={{ fontSize: 18, color: "#fff", margin: "0 0 6px" }}>
              Four books · one constellation
            </h2>
            <p style={{ fontSize: 12, color: "rgba(255,200,230,0.6)", margin: "0 0 14px", lineHeight: 1.65 }}>
              Glowing book nodes joined by photon streams. Open a book to read it page by page.
            </p>
            <RealmConstellation />
          </div>
        </div>

        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
          textAlign: "center",
          margin: "1.5rem 0 0.5rem",
          fontWeight: 800,
          letterSpacing: "0.02em",
          animation: "glow-title 4s infinite alternate",
        }}>
          AETHER Children&apos;s Realm
        </h1>
        <p style={{
          textAlign: "center",
          fontSize: "1.1rem",
          color: "#fbcfe8",
          maxWidth: 640,
          margin: "0 auto 2rem",
          lineHeight: 1.6,
          textShadow: "0 0 12px rgba(255,105,180,0.4)",
        }}>
          A library of glowing books, gentle creatures, and pattern-stories for young minds learning to see the layers of the world.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          padding: "1rem",
          maxWidth: 1500,
          margin: "0 auto",
        }}>
          {BOOKS.map((b) => {
            const card = (
              <div style={{ position: "relative", zIndex: 1, background: "rgba(0,0,40,0.7)", borderRadius: 32, overflow: "hidden" }}>
                <div style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: b.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    fontSize: "8rem",
                    color: "rgba(255,255,255,0.92)",
                    textShadow: `0 0 30px ${b.accent}, 0 0 60px rgba(255,255,255,0.4)`,
                  }}>
                    {b.glyph}
                  </div>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      left: `${(i * 31.7) % 95}%`,
                      top: `${(i * 53.3) % 95}%`,
                      width: 4 + (i % 3) * 2,
                      height: 4 + (i % 3) * 2,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.7)",
                      boxShadow: "0 0 8px white",
                    }} />
                  ))}
                  <div style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: b.href ? "rgba(6,182,212,0.9)" : "rgba(0,0,0,0.55)",
                    color: b.href ? "white" : "rgba(255,255,255,0.55)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    {b.href ? "Read now ›" : "Ported next"}
                  </div>
                </div>

                <div style={{ padding: "1.4rem 1.2rem 1.6rem", textAlign: "center", background: "rgba(0,0,0,0.6)" }}>
                  <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700, color: "white", textShadow: `0 0 12px ${b.accent}`, lineHeight: 1.25 }}>
                    {b.title}
                  </h3>
                  <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem", color: "#fbcfe8", opacity: 0.9 }}>
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );

            const shellStyle = {
              background: "rgba(0, 0, 40, 0.7)",
              borderRadius: 32,
              overflow: "hidden",
              boxShadow: "0 15px 50px rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              cursor: b.href ? "pointer" : "default",
              opacity: b.href ? 1 : 0.75,
            } as const;

            return b.href ? (
              <Link key={b.id} href={b.href} style={{ textDecoration: "none", display: "block" }}>
                <div className="realm-card" style={shellStyle}>
                  <div className="conic-glow" />
                  {card}
                </div>
              </Link>
            ) : (
              <div key={b.id} className="realm-card" style={shellStyle}>
                <div className="conic-glow" />
                {card}
              </div>
            );
          })}
        </div>

        <div style={{
          textAlign: "center",
          marginTop: "3rem",
          fontSize: "0.85rem",
          color: "rgba(251, 207, 232, 0.6)",
          fontFamily: "ui-monospace, monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          AETHER Seasons · Children&apos;s Realm · Pattern-stories for ages 5–10
        </div>
      </div>
    </div>
  );
}
