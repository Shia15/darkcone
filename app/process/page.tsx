// app/process/page.tsx
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Process – Darkcone",
  description: "Align → Map → Compose → Build → Launch.",
};

const steps = [
  ["Align", "Goals, constraints, audiences, and the emotional brief."],
  ["Map", "From symbolism to structure: states, signals, and flows."],
  ["Compose", "Design tokens, components, and narrative copy."],
  ["Build", "Next.js system with testing, a11y, and CI/CD."],
  ["Launch", "Handoff, docs, and enablement so your team moves fast."],
];

export default function ProcessPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <Reveal as="h1" className="text-3xl font-semibold text-neutral-100 sm:text-5xl">
        Process
      </Reveal>
      <Reveal delay={80} className="mt-4 max-w-2xl text-neutral-400">
        A proven arc that respects momentum while protecting quality.
      </Reveal>

      <section className="mt-10 grid gap-6 md:grid-cols-5">
        {steps.map(([t, d], i) => (
          <Reveal
            key={t}
            delay={120 + i * 70}
            className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-5"
          >
            <div className="text-sm uppercase tracking-wider text-neutral-500">
              Step {i + 1}
            </div>
            <div className="mt-1 text-lg font-medium text-neutral-100">{t}</div>
            <p className="mt-1 text-sm text-neutral-400">{d}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal delay={120} className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6">
          <div className="text-xl font-semibold text-neutral-100">Timeline</div>
          <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-neutral-300/90">
            <li>Week 1: Discovery & alignment</li>
            <li>Week 2–3: Mapping & composition</li>
            <li>Week 4–5: Build & polish</li>
            <li>Week 6: Launch & enablement</li>
          </ul>
        </Reveal>
        <Reveal delay={180} className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6">
          <div className="text-xl font-semibold text-neutral-100">Tooling</div>
          <p className="mt-2 text-sm text-neutral-400">
            Next.js • TypeScript • Tailwind • R3F (optional) • Vitest/Playwright • Axe a11y • Vercel
            • GitHub Actions
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300/90">
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-3 py-2">CI/CD</div>
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-3 py-2">Accessibility</div>
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-3 py-2">Testing</div>
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-3 py-2">Performance</div>
          </div>
        </Reveal>
      </section>

      <Reveal delay={200} className="mt-14 rounded-2xl border border-amber-400/25 bg-neutral-900/40 p-6">
        <div className="text-lg font-medium text-neutral-100">Let’s align on your arc.</div>
        <a
          href="/contact"
          className="mt-3 inline-block rounded-xl border border-amber-400/30 bg-neutral-900/60 px-5 py-3 text-amber-300 transition hover:scale-[1.02] hover:border-amber-400/60 hover:text-amber-200"
        >
          Book an intro
        </a>
      </Reveal>
    </main>
  );
}
