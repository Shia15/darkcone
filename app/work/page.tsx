// app/work/page.tsx
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Work – Darkcone",
  description: "Recent interfaces and experiments.",
};

const filters = ["All", "Interfaces", "3D/Scenes", "Systems"];

const projects = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  tag: i % 3 === 0 ? "Interfaces" : i % 3 === 1 ? "3D/Scenes" : "Systems",
}));

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <Reveal as="h1" className="text-3xl font-semibold text-neutral-100 sm:text-5xl">
        Work
      </Reveal>
      <Reveal delay={80} className="mt-4 max-w-2xl text-neutral-400">
        A rotating gallery of builds and studies. Swap in real captures or live scenes.
      </Reveal>

      {/* Filters (non-functional placeholder for now) */}
      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((f, i) => (
          <Reveal
            key={f}
            delay={120 + i * 70}
            className="cursor-default rounded-full border border-neutral-800/70 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-300"
          >
            {f}
          </Reveal>
        ))}
      </div>

      {/* Grid */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.id}
            delay={150 + i * 70}
            className="aspect-video rounded-2xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900 to-black p-4"
          >
            <div className="flex h-full w-full items-end justify-between">
              <div className="text-neutral-300">
                <div className="text-sm uppercase tracking-wider text-neutral-500">{p.tag}</div>
                <div className="text-lg font-medium text-neutral-100">{p.title}</div>
              </div>
              <div className="text-sm text-amber-300">View →</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Featured case study */}
      <Reveal
        delay={160}
        className="mt-12 rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6"
      >
        <div className="text-sm uppercase tracking-wider text-neutral-500">
          Featured case study
        </div>
        <div className="mt-1 text-2xl font-semibold text-neutral-100">AETHER Interface OS</div>
        <p className="mt-2 max-w-3xl text-neutral-400">
          Building symbolic mood and intent routing into a production UI system. Narrative design,
          typed runtime, and contributor onboarding.
        </p>
        <div className="mt-4 aspect-video rounded-xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900 to-black" />
      </Reveal>

      {/* Contact strip */}
      <Reveal
        delay={180}
        className="mt-12 rounded-2xl border border-amber-400/25 bg-neutral-900/40 p-6 text-neutral-200"
      >
        <div className="text-lg font-medium text-neutral-100">
          Have a vision? Let’s build.
        </div>
        <a
          href="/contact"
          className="mt-3 inline-block rounded-xl border border-amber-400/30 bg-neutral-900/60 px-5 py-3 text-amber-300 transition hover:scale-[1.02] hover:border-amber-400/60 hover:text-amber-200"
        >
          Start a conversation
        </a>
      </Reveal>
    </main>
  );
}
