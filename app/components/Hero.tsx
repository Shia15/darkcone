"use client";
import { motion } from "framer-motion";
import ShootingStars from "./ShootingStars";
import dynamic from "next/dynamic";

const CoinField3D = dynamic(() => import("./CoinField3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cosmic" />
      <ShootingStars />       {/* mobile-friendly background */}
      <CoinField3D />         {/* desktop depth */}
      <motion.div
        initial={{ opacity:0, y:16 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1, ease:"easeOut" }}
        className="relative text-center"
      >
        <div className="relative mx-auto w-40 h-40 mb-6">
          <img src="/darkcone-logo.svg" alt="DARKCONE Logo" className="w-full h-full" />
        </div>
        <h1 className="text-5xl font-bold text-gold-500 tracking-tight">DARKCONE</h1>
        <p className="mt-4 text-zinc-400">Precision systems. LATAM-first. Cosmic-calm UX.</p>
        <p className="text-sm text-zinc-500">ES: Sistemas de precisión, enfoque LATAM y UX serena.</p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="YOUR_DISCORD_INVITE" className="btn-gold rounded-xl bg-gold-500 px-5 py-3 font-medium text-ink shadow-glow hover:brightness-110">Join Discord</a>
          <a href="#work" className="rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-200 hover:border-zinc-500">View Work</a>
        </div>
      </motion.div>
    </section>
  );
}
