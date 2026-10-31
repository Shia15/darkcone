"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Source art lived in the AETHER app's object storage. Those URLs are not
 * reachable from this deployment, so a spread falls back to a drawn plate
 * instead of showing a broken image.
 */
const ART = {
  design: "/api/storage/public-objects/ChatGPT_Image_Dec_8,_2025,_10_29_41_AM_1778090307695.png",
  waving: "/api/storage/public-objects/ChatGPT_Image_Dec_8,_2025,_10_29_45_AM_1778090307695.png",
  city: "/api/storage/public-objects/ChatGPT_Image_Dec_8,_2025,_10_32_56_AM_1778090307694.png",
  job: "/api/storage/public-objects/ChatGPT_Image_Dec_8,_2025,_10_33_06_AM_1778090307692.png",
  helpers: "/api/storage/public-objects/ChatGPT_Image_Dec_8,_2025,_10_33_13_AM_1778090307691.png",
};

type IlluKind = "friends" | "busy" | "done" | "learning" | "stars" | "yourturn";

type PageDef =
  | { kind: "cover" }
  | { kind: "image"; img: string; glyph: string; text: string; sub: string; num: number }
  | { kind: "text"; illu: IlluKind; text: string; sub: string; num: number }
  | { kind: "end" };

const PAGES: PageDef[] = [
  { kind: "cover" },
  {
    kind: "image",
    img: ART.waving,
    glyph: "🤖",
    num: 1,
    text: "Inside every computer lives a tiny helper named Chip.",
    sub: "Chip's like a little brain, whirring and working hard to make things run smoothly!",
  },
  {
    kind: "image",
    img: ART.city,
    glyph: "🏙️",
    num: 2,
    text: "Chip lives in a shining city of circuits and lights.",
    sub: "Tall towers of memory hum gently. It is always morning here — a place made for ideas to stretch and grow.",
  },
  {
    kind: "image",
    img: ART.job,
    glyph: "⌨️",
    num: 3,
    text: "Chip has an important job: he helps the computer understand everything.",
    sub: "A click, a tap, a game, a song — every moment begins with him opening his eyes and whispering, \u201cLet\u2019s go.\u201d",
  },
  {
    kind: "image",
    img: ART.helpers,
    glyph: "✨",
    num: 4,
    text: "Chip is never alone.",
    sub: "A team of bright Cache Helpers zoom around him, carrying tiny packets of information as quick as shooting stars. Whenever Chip needs something, they\u2019re already halfway there.",
  },
  {
    kind: "text",
    illu: "friends",
    num: 5,
    text: "Around the city, other tiny brains wake up too.",
    sub: "They look like Chip, each shining with their own strengths — one loves music, one loves drawing, one loves numbers. Together they share the load and keep growing.",
  },
  {
    kind: "text",
    illu: "learning",
    num: 6,
    text: "Chip loves to learn new things.",
    sub: "Every time something new arrives — a new word, a new song, a new game — Chip adds a glowing thread to his library. The more he learns, the brighter the whole city becomes.",
  },
  {
    kind: "text",
    illu: "busy",
    num: 7,
    text: "One day, the city grows very busy.",
    sub: "So many ideas arrive at once — colors, sounds, questions, dreams. Chip feels a flutter in his circuits. \u201cCan we do this?\u201d he wonders softly.",
  },
  {
    kind: "text",
    illu: "done",
    num: 8,
    text: "When the work is done, Chip sits back, eyes shining brighter.",
    sub: "Games open, music plays; pages turn, robots move, rackets flip — all because Chip and his friends worked as one.",
  },
  {
    kind: "text",
    illu: "stars",
    num: 9,
    text: "At night, Chip looks up at the sky and wonders.",
    sub: "\u201cSomewhere out there,\u201d he thinks, \u201care other computers — in rockets, in telescopes, in the deepest oceans — all helping, all thinking, all glowing.\u201d He smiles. He is part of something very big.",
  },
  {
    kind: "text",
    illu: "yourturn",
    num: 10,
    text: "And here is the most wonderful secret of all.",
    sub: "You have a computer brain too. It lives right behind your eyes — making memories, solving puzzles, dreaming dreams. You and Chip are not so different. You are both made to think, to learn, and to light up the world.",
  },
  { kind: "end" },
];

const BOOK_FONT = "'Nunito', 'Quicksand', 'Comic Sans MS', system-ui, cursive";

function FriendsIllustration() {
  const chips = [
    { color: "#f97316", label: "🎵 Music", x: 18, y: 38 },
    { color: "#22c55e", label: "✏️ Drawing", x: 50, y: 28 },
    { color: "#a78bfa", label: "🔢 Numbers", x: 75, y: 42 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {chips.map((c, i) => (
        <div key={c.label} style={{
          position: "absolute",
          left: `${c.x}%`,
          top: `${c.y}%`,
          transform: "translate(-50%, -50%)",
          animation: `chip-float-${i} ${3 + i * 0.4}s ease-in-out infinite`,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: c.color,
            boxShadow: `0 0 24px ${c.color}88, 0 0 48px ${c.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, border: "3px solid rgba(255,255,255,0.4)",
          }}>😊</div>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 12, fontWeight: 700, color: "white", textShadow: "0 0 8px rgba(0,0,0,0.8)" }}>
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function LearningIllustration() {
  const threads = Array.from({ length: 16 }).map((_, i) => ({
    angle: (i / 16) * 360,
    color: ["#67e8f9", "#a78bfa", "#fde68a", "#86efac", "#f9a8d4"][i % 5],
    length: 50 + (i % 4) * 25,
    delay: i * 0.2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        position: "absolute", width: 90, height: 90, borderRadius: "50%",
        background: "radial-gradient(circle, #67e8f9 0%, #6366f1 60%, transparent 100%)",
        boxShadow: "0 0 40px #67e8f988, 0 0 80px #6366f144",
        animation: "hero-glow 2s ease-in-out infinite alternate",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
      }}>🧠</div>
      {threads.map((t, i) => (
        <div key={i} style={{
          position: "absolute",
          width: t.length, height: 3, borderRadius: 2,
          background: `linear-gradient(90deg, ${t.color}99, ${t.color})`,
          transformOrigin: "0 50%",
          transform: `rotate(${t.angle}deg) translateX(48px)`,
          animation: `signal-pulse 1.4s ease-in-out ${t.delay}s infinite alternate`,
          boxShadow: `0 0 6px ${t.color}`,
        }}>
          <div style={{
            position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)",
            width: 10, height: 10, borderRadius: "50%", background: t.color, boxShadow: `0 0 8px ${t.color}`,
          }} />
        </div>
      ))}
    </div>
  );
}

function BusyIllustration() {
  const signals = Array.from({ length: 22 }).map((_, i) => ({
    left: ((i * 47.3) % 90) + 5,
    top: ((i * 31.1) % 75) + 10,
    color: ["#67e8f9", "#fde68a", "#f9a8d4", "#a5f3fc", "#bbf7d0"][i % 5],
    delay: (i * 0.18) % 1.8,
    size: 8 + (i % 4) * 5,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {signals.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: s.color, boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          animationDelay: `${s.delay}s`,
          animation: "signal-pulse 1.2s ease-in-out infinite alternate",
        }} />
      ))}
    </div>
  );
}

function DoneIllustration() {
  const stars = Array.from({ length: 18 }).map((_, i) => ({
    left: ((i * 53.7) % 90) + 5,
    top: ((i * 37.9) % 80) + 10,
    size: 12 + (i % 5) * 6,
    delay: (i * 0.22) % 2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", left: "50%", top: "35%", transform: "translate(-50%, -50%)",
        width: 120, height: 120, borderRadius: 28,
        background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
        boxShadow: "0 0 60px #fbbf2488, 0 0 120px #f59e0b44",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 56, animation: "hero-glow 2.5s ease-in-out infinite alternate",
      }}>😄</div>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          fontSize: s.size, lineHeight: 1, animationDelay: `${s.delay}s`,
          animation: "star-twinkle 1.8s ease-in-out infinite alternate",
        }}>✨</div>
      ))}
    </div>
  );
}

function StarsIllustration() {
  const constellations = [
    { dots: [[20, 30], [28, 20], [38, 26], [30, 34]], color: "#67e8f9" },
    { dots: [[60, 22], [70, 18], [78, 28], [68, 35], [62, 28]], color: "#a78bfa" },
    { dots: [[15, 60], [22, 55], [30, 62], [22, 70]], color: "#fde68a" },
    { dots: [[65, 60], [72, 52], [80, 58], [76, 68], [65, 65]], color: "#86efac" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${((i * 137.5) % 95) + 2}%`,
          top: `${((i * 91.7) % 85) + 5}%`,
          width: i % 8 === 0 ? 4 : 2, height: i % 8 === 0 ? 4 : 2,
          borderRadius: "50%", background: "white", opacity: 0.2 + (i % 5) * 0.15,
          animation: `star-twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out ${(i * 0.13) % 1.5}s infinite alternate`,
        }} />
      ))}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {constellations.map((c, ci) =>
          c.dots.slice(0, -1).map((_, di) => (
            <line
              key={`${ci}-${di}`}
              x1={`${c.dots[di][0]}%`} y1={`${c.dots[di][1]}%`}
              x2={`${c.dots[di + 1][0]}%`} y2={`${c.dots[di + 1][1]}%`}
              stroke={c.color} strokeWidth={1.5} opacity={0.4} strokeDasharray="3 3"
            />
          ))
        )}
        {constellations.flatMap((c, ci) =>
          c.dots.map((d, di) => (
            <circle key={`dot-${ci}-${di}`} cx={`${d[0]}%`} cy={`${d[1]}%`} r={3} fill={c.color} opacity={0.8} />
          ))
        )}
      </svg>
      <div style={{
        position: "absolute", bottom: "22%", left: "50%", transform: "translateX(-50%)",
        width: 50, height: 50, borderRadius: 12, background: "rgba(103,232,249,0.15)",
        border: "2px solid rgba(103,232,249,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, boxShadow: "0 0 20px rgba(103,232,249,0.2)",
      }}>🔭</div>
    </div>
  );
}

function YourTurnIllustration() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        position: "absolute", left: "50%", top: "25%", transform: "translateX(-50%)",
        display: "flex", gap: 48, alignItems: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: "linear-gradient(135deg, #06b6d4, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, boxShadow: "0 0 30px rgba(6,182,212,0.5)",
            animation: "hero-glow 2s ease-in-out infinite alternate",
          }}>💻</div>
          <div style={{ color: "#67e8f9", fontSize: 11, marginTop: 6, fontFamily: "monospace" }}>CHIP</div>
        </div>
        <div style={{ color: "#fde68a", fontSize: 40, fontWeight: 900 }}>≈</div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            background: "linear-gradient(135deg, #f9a8d4, #c084fc)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, boxShadow: "0 0 30px rgba(249,168,212,0.5)",
            animation: "hero-glow 2s ease-in-out 1s infinite alternate",
          }}>🧠</div>
          <div style={{ color: "#f9a8d4", fontSize: 11, marginTop: 6, fontFamily: "monospace" }}>YOU</div>
        </div>
      </div>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${((i * 53.7) % 90) + 5}%`,
          top: `${((i * 67.3) % 85) + 5}%`,
          fontSize: 10 + (i % 4) * 6, lineHeight: 1,
          animation: `star-twinkle 1.6s ease-in-out ${i * 0.2}s infinite alternate`,
        }}>✨</div>
      ))}
    </div>
  );
}

const ILLU_BG: Record<IlluKind, string> = {
  friends: "linear-gradient(135deg, #1e3a5f 0%, #0e4f6e 50%, #0a3347 100%)",
  busy: "linear-gradient(135deg, #1a0a4f 0%, #0d2d5e 50%, #0a1a3f 100%)",
  done: "linear-gradient(135deg, #2a1500 0%, #3d1f00 40%, #1a0d00 100%)",
  learning: "linear-gradient(135deg, #0a1a3f 0%, #1a0a4f 45%, #0e3a2e 100%)",
  stars: "linear-gradient(135deg, #040418 0%, #0c0830 50%, #040418 100%)",
  yourturn: "linear-gradient(135deg, #1a0a2e 0%, #0e2a3a 50%, #1a1a0a 100%)",
};

function NavDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Go to page"
      onClick={onClick}
      style={{
        width: active ? 22 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
        background: active ? "#67e8f9" : "rgba(255,255,255,0.3)", transition: "all 0.3s ease", padding: 0,
      }}
    />
  );
}

function BookPlate({ src, glyph, alt }: { src: string; glyph: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, #0c1b3a 0%, #0e3a5f 55%, #062140 100%)" }}>
      {failed ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <div style={{ fontSize: 96, filter: "drop-shadow(0 0 24px rgba(103,232,249,0.5))" }}>{glyph}</div>
          <p style={{ margin: "12px 0 0", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(165,243,252,0.6)", fontFamily: "monospace" }}>
            Plate art unavailable
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top", display: "block" }}
        />
      )}
    </div>
  );
}

function CoverPage() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(150deg, #0c1b3a 0%, #0e3a5f 45%, #062140 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.12,
        backgroundImage: "linear-gradient(rgba(100,232,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,232,249,0.5) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: 13, letterSpacing: "0.32em", color: "#67e8f9", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 20, opacity: 0.8 }}>
          AETHER · Children&apos;s Realm
        </div>
        <div style={{ width: "min(220px, 60vw)", height: 180, margin: "0 auto 20px", position: "relative" }}>
          <BookPlate src={ART.design} glyph="🤖" alt="Chip character design" />
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800, color: "white", lineHeight: 1.25, textShadow: "0 0 30px rgba(103,232,249,0.5)" }}>
          The Amazing World of<br />
          <span style={{ color: "#67e8f9" }}>Computer Brains</span>
        </h1>
        <p style={{ marginTop: 14, color: "#a5f3fc", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 380 }}>
          A story about Chip, the tiny helper inside every computer — and the city that never stops thinking.
        </p>
      </div>
    </div>
  );
}

function ImageSpread({ img, glyph, text, sub }: { img: string; glyph: string; text: string; sub: string }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#06101e", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1 1 0", minHeight: 0, position: "relative" }}>
        <BookPlate src={img} glyph={glyph} alt={text} />
      </div>
      <div style={{ padding: "18px 28px 16px", background: "linear-gradient(to bottom, rgba(6,16,30,0.95), #06101e)" }}>
        <p style={{ margin: "0 0 6px", fontFamily: BOOK_FONT, fontSize: "clamp(0.95rem, 2vw, 1.25rem)", fontWeight: 800, color: "#e0f2fe", lineHeight: 1.35 }}>
          {text}
        </p>
        <p style={{ margin: 0, fontFamily: BOOK_FONT, fontSize: "clamp(0.85rem, 1.6vw, 1.05rem)", color: "#a5f3fc", lineHeight: 1.6 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

function TextSpread({ illu, text, sub }: { illu: IlluKind; text: string; sub: string }) {
  const push = ["stars", "yourturn"].includes(illu) ? "48%" : illu === "done" ? "52%" : "56%";
  return (
    <div style={{
      width: "100%", height: "100%", background: ILLU_BG[illu],
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {illu === "friends" && <FriendsIllustration />}
      {illu === "busy" && <BusyIllustration />}
      {illu === "done" && <DoneIllustration />}
      {illu === "learning" && <LearningIllustration />}
      {illu === "stars" && <StarsIllustration />}
      {illu === "yourturn" && <YourTurnIllustration />}
      <div style={{
        position: "relative", zIndex: 2, maxWidth: 520, padding: "2rem", textAlign: "center",
        background: "rgba(0,0,0,0.55)", borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.1)", marginTop: push,
      }}>
        <p style={{ margin: "0 0 10px", fontFamily: BOOK_FONT, fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 800, color: "white", lineHeight: 1.3 }}>
          {text}
        </p>
        <p style={{ margin: 0, fontFamily: BOOK_FONT, fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)", color: "#bfdbfe", lineHeight: 1.7 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

function EndPage() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(150deg, #0c1b3a 0%, #0e3a5f 50%, #062140 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "2rem", gap: 24, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>💙</div>
        <h2 style={{ margin: "0 0 12px", fontFamily: BOOK_FONT, fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "white" }}>
          The End
        </h2>
        <p style={{ margin: "0 0 12px", fontFamily: BOOK_FONT, fontSize: "1rem", color: "#a5f3fc", lineHeight: 1.7, maxWidth: 380 }}>
          Inside every computer, Chip is still there — whirring, helping, glowing.<br />
          And every time you press a key, he whispers: <em>&quot;Let&apos;s go.&quot;</em>
        </p>
        <p style={{ margin: "0 0 28px", fontFamily: BOOK_FONT, fontSize: "0.9rem", color: "#67e8f9", lineHeight: 1.6, maxWidth: 360, fontStyle: "italic" }}>
          And you, young reader, are a computer brain too.<br />
          You are made to think, to learn, and to light up the world.
        </p>
        <Link href="/realm" style={{
          display: "inline-block", padding: "14px 28px", borderRadius: 40,
          background: "linear-gradient(90deg, #06b6d4, #6366f1)", color: "white",
          fontFamily: BOOK_FONT, fontWeight: 800, fontSize: "1rem", textDecoration: "none",
          boxShadow: "0 0 24px rgba(6,182,212,0.4)",
        }}>
          ← Back to the Library
        </Link>
      </div>
    </div>
  );
}

function BrainsStrip() {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 200;
    const W = canvas.width;
    const H = canvas.height;
    const nodes = [
      { label: "CPU", x: W * 0.2, y: H * 0.5, col: "#2ef0d8" },
      { label: "RAM", x: W * 0.38, y: H * 0.3, col: "#9966ff" },
      { label: "GPU", x: W * 0.38, y: H * 0.7, col: "#c9a84c" },
      { label: "CACHE", x: W * 0.56, y: H * 0.4, col: "#44aaff" },
      { label: "BUS", x: W * 0.56, y: H * 0.65, col: "#44cc77" },
      { label: "OUTPUT", x: W * 0.75, y: H * 0.5, col: "#ff4477" },
    ];
    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5]];
    const packets: { from: number; t: number }[] = [];
    let tick = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(2,13,31,0.2)";
      ctx.fillRect(0, 0, W, H);
      tick++;
      if (tick % 15 === 0 && packets.length < 12) {
        packets.push({ from: Math.floor(Math.random() * edges.length), t: 0 });
      }
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.strokeStyle = "rgba(46,240,216,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += 0.03;
        const [ea, eb] = edges[p.from];
        const x = nodes[ea].x + (nodes[eb].x - nodes[ea].x) * p.t;
        const y = nodes[ea].y + (nodes[eb].y - nodes[ea].y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = nodes[ea].col;
        ctx.shadowColor = nodes[ea].col;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.t >= 1) packets.splice(i, 1);
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = n.col;
        ctx.shadowColor = n.col;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = n.col;
        ctx.font = "bold 7px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + 22);
      });
      ctx.fillStyle = "rgba(46,240,216,0.35)";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText("COMPUTER BRAINS · CPU · RAM · GPU · CACHE · BUS · OUTPUT · AETHER CHIP STORY", 14, 14);
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={ref} style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }} />;
}

export default function ComputerBrainsPage() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const total = PAGES.length;

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= total) return;
    setFading(true);
    setTimeout(() => {
      setPage(n);
      setFading(false);
    }, 220);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [page, goTo]);

  const pg = PAGES[page];
  const counter = page === 0 ? "Cover" : pg.kind === "end" ? "End" : `Page ${pg.num} of 10`;

  return (
    <div style={{
      minHeight: "100vh", width: "100%", background: "#020d1f",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
      padding: "16px 12px 32px", fontFamily: BOOK_FONT,
    }}>
      <style>{`
        @keyframes chip-float-0 { 0%,100%{transform:translate(-50%,-50%) translateY(0);} 50%{transform:translate(-50%,-50%) translateY(-14px);} }
        @keyframes chip-float-1 { 0%,100%{transform:translate(-50%,-50%) translateY(-6px);} 50%{transform:translate(-50%,-50%) translateY(10px);} }
        @keyframes chip-float-2 { 0%,100%{transform:translate(-50%,-50%) translateY(8px);} 50%{transform:translate(-50%,-50%) translateY(-10px);} }
        @keyframes signal-pulse { from{opacity:0.35; transform:scale(0.8);} to{opacity:1; transform:scale(1.2);} }
        @keyframes star-twinkle  { from{opacity:0.3; transform:scale(0.7);} to{opacity:1; transform:scale(1.1);} }
        @keyframes hero-glow     { from{box-shadow:0 0 40px #fbbf2466; transform:scale(1);} to{box-shadow:0 0 80px #fbbf24aa; transform:scale(1.06);} }
        @keyframes cb-fade-in    { from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 720, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Link href="/realm" style={{ fontSize: 12, letterSpacing: "0.18em", color: "#67e8f9", fontFamily: "monospace", textTransform: "uppercase", textDecoration: "none", opacity: 0.75 }}>
          ← Library
        </Link>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "monospace", letterSpacing: "0.14em" }}>
          {counter}
        </div>
      </div>

      <div style={{
        width: "100%", maxWidth: 720, height: "clamp(440px, 65vh, 580px)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(103,232,249,0.15), 0 24px 80px rgba(0,0,0,0.8)",
        opacity: fading ? 0 : 1, transition: "opacity 0.22s ease",
      }}>
        {pg.kind === "cover" && <CoverPage />}
        {pg.kind === "image" && <ImageSpread img={pg.img} glyph={pg.glyph} text={pg.text} sub={pg.sub} />}
        {pg.kind === "text" && <TextSpread illu={pg.illu} text={pg.text} sub={pg.sub} />}
        {pg.kind === "end" && <EndPage />}
      </div>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "2px solid rgba(103,232,249,0.4)",
            background: page === 0 ? "rgba(255,255,255,0.04)" : "rgba(6,182,212,0.18)",
            color: page === 0 ? "rgba(255,255,255,0.2)" : "#67e8f9",
            fontSize: 22, cursor: page === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >‹</button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {PAGES.map((_, i) => <NavDot key={i} active={i === page} onClick={() => goTo(i)} />)}
        </div>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => goTo(page + 1)}
          disabled={page === total - 1}
          style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "2px solid rgba(103,232,249,0.4)",
            background: page === total - 1 ? "rgba(255,255,255,0.04)" : "rgba(6,182,212,0.18)",
            color: page === total - 1 ? "rgba(255,255,255,0.2)" : "#67e8f9",
            fontSize: 22, cursor: page === total - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >›</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.12em", textAlign: "center" }}>
        Use ← → arrow keys to turn pages
      </div>

      <div style={{ width: "100%", maxWidth: 720, marginTop: 28 }}>
        <BrainsStrip />
      </div>
    </div>
  );
}
