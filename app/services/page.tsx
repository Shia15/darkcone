// app/services/page.tsx
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Services – Darkcone",
  description: "From emotion → code. Interfaces that feel alive.",
};

const services: { title: string; blurb: string; points: string[] }[] = [
  {
    title: "Discovery & Mapping",
    blurb:
      "Clarify goals, audiences, signals. Translate brand emotion into interaction principles.",
    points: ["Interviews", "UX heuristics", "Emotional toneboard", "Success metrics"],
  },
  {
    title: "Emotion → Code System",
    blurb:
      "Operationalize mood, intent, and flow into typed modules you can ship & test.",
    points: ["Mood/intent models", "Routing logic", "Design tokens", "Accessibility"],
  },
  {
    title: "Interface Build",
    blurb:
      "Production-grade Next.js, Tailwind, and component systems with CI/QA from day one.",
    points: ["SSR/ISR pages", "R3F scene hooks", "Design system", "E2E + a11y checks"],
  },
  {
    title: "Delivery & Enablement",
    blurb:
      "Docs, handoff, and contributor onboarding—so your team can move fast without losing soul.",
    points: ["README playbooks", "Onboarding docs", "Storybook (optional)", "Vercel deploys"],
  },
];

const addons = [
  "3D coin scenes (R3F)",
  "Case-study storytelling",
  "Analytics events & KPIs",
  "Performance budgets",
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <Reveal as="h1" className="text-3xl font-semibold text-neutral-100 sm:text-5xl">
        Services
      </Reveal>
      <Reveal delay={80} className="mt-4 max-w-2xl text-neutral-400">
        We bridge symbolism and software—turning emotional clarity into reliable, testable
        interfaces. Choose a lane or run the full arc end‑to‑end.
      </Reveal>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal
            key={s.title}
            delay={120 + i * 60}
            className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6"
          >
            <h3 className="text-lg font-medium text-neutral-100">{s.title}</h3>
            <p className="mt-2 text-sm text-neutral-400">{s.blurb}</p>
            <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-neutral-300/90">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="mt-12">
        <Reveal as="h2" className="text-xl font-semibold text-neutral-100">
          Add‑ons
        </Reveal>
        <div className="mt-4 flex flex-wrap gap-3">
          {addons.map((a, i) => (
            <Reveal
              key={a}
              delay={140 + i * 70}
              className="rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-300"
            >
              {a}
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal
        delay={160}
        className="mt-16 rounded-2xl border border-amber-400/25 bg-neutral-900/40 p-6 text-neutral-200"
      >
        <div className="text-lg font-medium text-neutral-100">
          Ready when you are.
        </div>
        <p className="mt-1 text-sm text-neutral-400">
          Tell us what you’re building and we’ll propose a path that protects momentum and quality.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block rounded-xl border border-amber-400/30 bg-neutral-900/60 px-5 py-3 text-amber-300 shadow-[0_0_40px_-12px_rgba(251,191,36,.35)] transition hover:scale-[1.02] hover:border-amber-400/60 hover:text-amber-200"
        >
          Request a demo
        </a>
      </Reveal>
    </main>
  );
}
