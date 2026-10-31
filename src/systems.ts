export type SystemKind = "next" | "static" | "python" | "unknown";

export type SystemEntry = {
  slug: string;
  name: string;
  tagline: string;
  /** "in-app" runs inside this deployment. "external" is a separate deployment. */
  mode: "in-app" | "external";
  href: string;
  /** true when the URL came from a repo/README field, false when it is the default Vercel domain guess. */
  verified: boolean;
  kind: SystemKind;
  repo?: string;
  note?: string;
};

export const SYSTEMS: SystemEntry[] = [
  {
    slug: "realm",
    name: "Children's Realm",
    tagline: "Five pattern-stories, one constellation. Computer Brains is readable now.",
    mode: "in-app",
    href: "/realm",
    verified: true,
    kind: "next",
    repo: "https://github.com/Shia15/aether-cosmos",
    note: "Ported from aether-cosmos artifacts/aether into this app.",
  },
  {
    slug: "neuronote",
    name: "Neuronote",
    tagline: "Sunrise notebooks with on-device intent tagging.",
    mode: "in-app",
    href: "/neuronote",
    verified: true,
    kind: "next",
    repo: "https://github.com/Shia15/neuronote",
    note: "Rebuilt here: the neuronote repo holds docs and a capability manifest, no app source.",
  },
  {
    slug: "aether-state",
    name: "AETHER State",
    tagline: "Single-page state console (index.html + app.js + styles.css).",
    mode: "external",
    href: "https://aether-state.vercel.app",
    verified: false,
    kind: "static",
    repo: "https://github.com/Shia15/-FINAL-AETHER-STATE-SOURCE-OF-TRUTH-",
    note: "Vanilla JS build. Domain assumed from the project name.",
  },
  {
    slug: "aether-cla",
    name: "AETHER CLA",
    tagline: "Coherence / CLA explainer site.",
    mode: "external",
    href: "https://aether-cla.vercel.app",
    verified: true,
    kind: "static",
    repo: "https://github.com/Shia15/AETHER-CLA",
  },
  {
    slug: "rootex",
    name: "Rootex",
    tagline: "Rootex 1.0.0 static build.",
    mode: "external",
    href: "https://rootex.vercel.app",
    verified: true,
    kind: "static",
    repo: "https://github.com/Shia15/Rootex",
  },
  {
    slug: "aether-antikythera",
    name: "AETHER Antikythera",
    tagline: "Flask service (app.py + requirements.txt).",
    mode: "external",
    href: "https://aether-antikythera.vercel.app",
    verified: false,
    kind: "python",
    repo: "https://github.com/Shia15/aether-antikythera",
    note: "Python needs its own runtime or a serverless function; it cannot be mounted as a static path here.",
  },
  {
    slug: "seamilk",
    name: "Seamilk",
    tagline: "Vercel project with no matching GitHub repo in this account.",
    mode: "external",
    href: "https://seamilk.vercel.app",
    verified: false,
    kind: "unknown",
    note: "Source not found in the Shia15 repo list.",
  },
  {
    slug: "darkcone",
    name: "Darkcone",
    tagline: "This site: the shell every in-app system renders inside.",
    mode: "external",
    href: "https://darkcone-shias-projects-51ab68e6.vercel.app",
    verified: true,
    kind: "next",
    repo: "https://github.com/Shia15/darkcone",
    note: "Production domain reported by the Vercel CLI. darkcone.vercel.app is not this project.",
  },
];
