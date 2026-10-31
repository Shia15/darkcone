"use client";

import { useState } from "react";
import Link from "next/link";
import { SYSTEMS, type SystemEntry } from "../../src/systems";

function Badge({ children, tone }: { children: React.ReactNode; tone: "amber" | "neutral" | "red" }) {
  const tones = {
    amber: "border-amber-400/40 text-amber-300",
    neutral: "border-neutral-700 text-neutral-400",
    red: "border-red-500/40 text-red-300",
  } as const;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Row({ entry, active, onSelect }: { entry: SystemEntry; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
        active
          ? "border-amber-400/50 bg-neutral-900/70"
          : "border-neutral-800/70 bg-neutral-900/30 hover:border-neutral-700"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-100">{entry.name}</span>
        {entry.mode === "in-app" ? <Badge tone="amber">in-app</Badge> : <Badge tone="neutral">separate deploy</Badge>}
        {!entry.verified && <Badge tone="red">domain unconfirmed</Badge>}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-neutral-500">{entry.tagline}</p>
    </button>
  );
}

export default function SystemsPage() {
  const [slug, setSlug] = useState<string>(SYSTEMS[0].slug);
  const active = SYSTEMS.find((s) => s.slug === slug) ?? SYSTEMS[0];

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300/70">Systems</p>
        <h1 className="mt-2 text-3xl font-semibold text-neutral-100">One entry point, every build.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
          Systems rebuilt inside this app open as routes. Systems that live on their own Vercel
          deployment are embedded below. Nothing here changes those deployments.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-2">
          {SYSTEMS.map((s) => (
            <Row key={s.slug} entry={s} active={s.slug === active.slug} onSelect={() => setSlug(s.slug)} />
          ))}
        </div>

        <section className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-medium text-neutral-100">{active.name}</h2>
            <span className="text-xs text-neutral-500">
              {active.kind === "next" ? "Next.js" : active.kind === "static" ? "Static site" : active.kind === "python" ? "Python" : "Unknown stack"}
            </span>
            {active.mode === "in-app" ? (
              <Link
                href={active.href}
                className="ml-auto rounded-lg border border-amber-400/40 px-3 py-1.5 text-xs text-amber-300 hover:border-amber-400/70 hover:text-amber-200"
              >
                Open full page
              </Link>
            ) : (
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className="ml-auto rounded-lg border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:border-amber-400/40 hover:text-amber-200"
              >
                Open standalone ↗
              </a>
            )}
          </div>

          {active.note && (
            <p className="mt-3 rounded-xl border border-neutral-800/70 bg-neutral-900/40 px-4 py-3 text-xs leading-relaxed text-neutral-400">
              {active.note}
            </p>
          )}

          {active.mode === "in-app" ? (
            <div className="mt-5 rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-8 text-center">
              <p className="text-sm text-neutral-300">{active.name} runs as a route in this deployment.</p>
              <Link
                href={active.href}
                className="mt-4 inline-flex rounded-xl border border-amber-400/30 bg-neutral-900/40 px-5 py-2.5 text-sm text-amber-300 hover:border-amber-400/60"
              >
                Go to {active.name}
              </Link>
            </div>
          ) : (
            <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-900/30">
              <iframe
                key={active.slug}
                src={active.href}
                title={active.name}
                loading="lazy"
                className="h-[70vh] w-full bg-neutral-950"
              />
            </div>
          )}

          {active.repo && (
            <p className="mt-4 text-xs text-neutral-500">
              Source:{" "}
              <a href={active.repo} target="_blank" rel="noreferrer" className="text-amber-300/80 hover:text-amber-200">
                {active.repo.replace("https://github.com/", "")}
              </a>
            </p>
          )}
        </section>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-neutral-500">
        A single Vercel site can serve Next.js routes and static paths on one domain. A Python service
        and any repo whose source is not in the account stay as separate deployments, linked or embedded.
      </p>
    </main>
  );
}
