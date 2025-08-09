// components/Reveal.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  className = "",
}: {
  as?: any;
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(true)),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={`reveal ${on ? "reveal--on" : ""} ${className}`}
      style={{ ["--reveal-delay" as any]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
