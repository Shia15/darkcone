"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/realm", label: "Children's Realm" },
  { href: "/neuronote", label: "Neuronote" },
];

export default function SiteNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-900/80 bg-neutral-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
        <Link href="/" className="text-xs uppercase tracking-[0.22em] text-amber-300/80 hover:text-amber-200">
          Darkcone
        </Link>
        <div className="flex flex-1 flex-wrap items-center gap-5 text-sm">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? "text-amber-300" : "text-neutral-400 hover:text-neutral-100"}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/contact"
          className="rounded-lg border border-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:border-amber-400/40 hover:text-amber-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
