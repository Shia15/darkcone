"use client";
import { useState } from "react";

export default function ContactFunnel() {
  const [step, setStep] = useState(1);
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-2xl font-semibold text-gold-500">Start a project</h2>
      {step === 1 && (
        <div className="mt-6 grid gap-4">
          <input className="rounded-xl border border-zinc-700 bg-transparent px-4 py-3" placeholder="What's your goal?" />
          <input className="rounded-xl border border-zinc-700 bg-transparent px-4 py-3" placeholder="Timeline (e.g., 4–6 weeks)" />
          <input className="rounded-xl border border-zinc-700 bg-transparent px-4 py-3" placeholder="Budget range (USD/MXN/BRL)" />
          <button onClick={() => setStep(2)} className="btn-gold rounded-xl bg-gold-500 px-5 py-3 font-medium text-ink shadow-glow hover:brightness-110 w-fit">Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="mt-6 grid gap-3">
          <a className="rounded-xl border border-zinc-700 px-5 py-3 hover:border-zinc-500" href="YOUR_WHATSAPP_LINK">WhatsApp</a>
          <a className="rounded-xl border border-zinc-700 px-5 py-3 hover:border-zinc-500" href="YOUR_DISCORD_INVITE">Discord</a>
          <a className="rounded-xl border border-zinc-700 px-5 py-3 hover:border-zinc-500" href="YOUR_SCHEDULER_LINK">Book a call</a>
        </div>
      )}
    </section>
  );
}
