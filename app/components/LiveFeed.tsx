"use client";
import { useEffect, useState } from "react";

type Event = { time: string; msg: string };

export default function LiveFeed() {
  const [events, setEvents] = useState<Event[]>([{ time: new Date().toLocaleTimeString(), msg: "System boot" }]);

  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) => [{ time: new Date().toLocaleTimeString(), msg: "Pulse: ok" }, ...prev.slice(0, 14)]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold text-gold-500">Live System Feed</h2>
        <div className="text-xs text-zinc-500">Last pulse updates every 3s</div>
      </div>
      <div className="mt-6 rounded-2xl border border-zinc-800 p-5">
        <ul className="space-y-2 text-sm">
          {events.map((e, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-zinc-500 w-24">{e.time}</span>
              <span className="text-zinc-200">{e.msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
