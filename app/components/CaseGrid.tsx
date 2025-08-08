export default function CaseGrid() {
  const cases = [
    { title: "Fintech LATAM Launch", metric: "+178% leads", detail: "SEO + perf + funnel" },
    { title: "Infra Site Revamp", metric: "<1s LCP", detail: "Edge cache + image pipeline" },
    { title: "Marketplace Growth", metric: "2.3x conv.", detail: "UX+i18n+trust layer" }
  ];
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-semibold text-gold-500">Selected Work</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map(c => (
          <div key={c.title} className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition">
            <div className="text-zinc-200 font-medium">{c.title}</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold-600/40 px-3 py-1 text-xs text-gold-500">
              {c.metric}
            </div>
            <p className="mt-3 text-sm text-zinc-400">{c.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
