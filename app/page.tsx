// app/page.tsx
import Link from "next/link";

function SoftGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,.12),rgba(0,0,0,0))]"
    />
  );
}

function CTA({
  href = "#contact",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-neutral-900/40 px-5 py-3 text-amber-300 shadow-[0_0_40px_-12px_rgba(251,191,36,.35)] transition hover:scale-[1.02] hover:border-amber-400/60 hover:text-amber-200"
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
        <path fill="currentColor" d="M13 5l7 7l-7 7v-4H4v-6h9z" />
      </svg>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="relative">
      <SoftGlow />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
        <p className="mb-3 text-sm uppercase tracking-[0.22em] text-amber-300/70">
          Darkcone
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight text-neutral-100 sm:text-6xl">
          Interfaces that feel <span className="text-amber-300">alive</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-neutral-400">
          Emotionally intelligent UI aligning meaning, flow, and integrity.
          Designed for clarity. Built for momentum.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTA>Request a demo</CTA>
          <Link
            href="#work"
            className="text-sm font-medium text-neutral-300 underline-offset-4 hover:text-white hover:underline"
          >
            See the work
          </Link>
        </div>

        {/* logo/coin rule: full visibility, never clipped */}
        <div className="mt-14 flex items-center gap-6">
          <span className="text-xs text-neutral-500">Trusted by early partners</span>
          <div className="h-px w-28 bg-neutral-800" />
        </div>
      </section>

      {/* VALUE */}
      <section id="value" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Symbolic → Real", "Translate emotional systems into production code."],
            ["Zero-drag UX", "Frictionless flows, micro-interactions, clarity at speed."],
            ["Future-proof", "Typed, tested, accessible, CI-driven delivery."],
          ].map(([title, blurb]) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6"
            >
              <h3 className="mb-2 text-lg font-medium text-neutral-100">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-neutral-100">Recent work</h2>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Snapshots of the interface we sketched yesterday. Replace with real captures or an R3F scene.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="aspect-video rounded-2xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900 to-black" />
          <div className="aspect-video rounded-2xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900 to-black" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900/80 py-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Darkcone. All rights reserved.
      </footer>
    </main>
  );
}