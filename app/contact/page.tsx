// app/contact/page.tsx
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Contact – Darkcone",
  description: "Tell us what you’re building.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <Reveal as="h1" className="text-3xl font-semibold text-neutral-100 sm:text-5xl">
        Tell us what you’re building.
      </Reveal>
      <Reveal delay={80} className="mt-3 max-w-2xl text-neutral-400">
        We’ll reply with a short proposal and suggested next steps within 1–2 business days.
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {/* Form */}
        <Reveal delay={120} className="md:col-span-2 rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6">
          <form className="grid gap-4" action="#" method="post">
            <label className="grid gap-1 text-sm">
              <span className="text-neutral-300">Name</span>
              <input className="rounded-lg border border-neutral-800/70 bg-neutral-950 px-3 py-2 text-neutral-200 outline-none focus:border-amber-400/50" name="name" required />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-neutral-300">Email</span>
              <input type="email" className="rounded-lg border border-neutral-800/70 bg-neutral-950 px-3 py-2 text-neutral-200 outline-none focus:border-amber-400/50" name="email" required />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-neutral-300">Timeline</span>
              <input className="rounded-lg border border-neutral-800/70 bg-neutral-950 px-3 py-2 text-neutral-200 outline-none focus:border-amber-400/50" name="timeline" placeholder="e.g., 6–8 weeks" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-neutral-300">Budget (optional)</span>
              <input className="rounded-lg border border-neutral-800/70 bg-neutral-950 px-3 py-2 text-neutral-200 outline-none focus:border-amber-400/50" name="budget" placeholder="$" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-neutral-300">Goals</span>
              <textarea className="min-h-[120px] rounded-lg border border-neutral-800/70 bg-neutral-950 px-3 py-2 text-neutral-200 outline-none focus:border-amber-400/50" name="goals" placeholder="What are we building? What matters most?" />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-xl border border-amber-400/30 bg-neutral-900/60 px-5 py-3 text-amber-300 transition hover:scale-[1.02] hover:border-amber-400/60 hover:text-amber-200"
            >
              Send
            </button>
          </form>
        </Reveal>

        {/* Details */}
        <Reveal delay={160} className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6">
          <div className="text-lg font-medium text-neutral-100">Details</div>
          <ul className="mt-3 grid gap-2 text-sm text-neutral-300/90">
            <li>Email: hello@darkcone.example</li>
            <li>Calendar: link on request</li>
            <li>Location: Remote-first</li>
          </ul>
          <div className="mt-5 text-sm text-neutral-500">
            We care about clarity, accessibility, and momentum. No spam, no fluff.
          </div>
        </Reveal>
      </div>
    </main>
  );
}
