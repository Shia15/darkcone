export default function Modules() {
  const modules = [
    { title: "Signal Processor", desc: "Normalize inputs and score sentiment/tokens." },
    { title: "Memory Parser", desc: "Extract tags and entities for context." },
    { title: "Mood Router", desc: "Route flows by focus/energy profile." },
    { title: "Intent Mapper", desc: "Utterances → intents → handlers." },
  ];
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-2xl font-semibold text-gold-500">Modules</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <div key={m.title} className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-600 transition">
            <div className="text-gold-500 font-medium">{m.title}</div>
            <p className="mt-2 text-sm text-zinc-400">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
