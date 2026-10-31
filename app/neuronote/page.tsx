"use client";

import { useEffect, useMemo, useState } from "react";
import { classifyNote, INTENT_LABELS, type NoteIntent } from "../../src/core/noteIntent";

type Note = {
  id: string;
  title: string;
  body: string;
  section: string;
  createdAt: string;
};

const STORE_KEY = "darkcone.neuronote.v1";
const SECTIONS = ["Philosophy 10", "Math 22", "Favorites", "Five-Year Plan"];

const SEED: Note[] = [
  {
    id: "seed-1",
    title: "Why does a proof feel finished?",
    body: "Question for Thursday: what makes an argument feel complete — the last line, or the moment nothing else can be added?",
    section: "Philosophy 10",
    createdAt: "2026-10-27T09:12:00.000Z",
  },
  {
    id: "seed-2",
    title: "Eigenvector shortcut",
    body: "Reference: chapter 6, page 214. Formula for the characteristic polynomial. Re-derive before the quiz.",
    section: "Math 22",
    createdAt: "2026-10-28T15:40:00.000Z",
  },
  {
    id: "seed-3",
    title: "Morning pages",
    body: "Felt scattered until I wrote the three things down. Realized the noise was just unmade decisions.",
    section: "Favorites",
    createdAt: "2026-10-29T07:05:00.000Z",
  },
  {
    id: "seed-4",
    title: "Five-year plan, first draft",
    body: "Plan: finish the degree, ship one research tool, keep the studio alive on two clients. Milestone every six months.",
    section: "Five-Year Plan",
    createdAt: "2026-10-30T18:22:00.000Z",
  },
];

const INTENT_STYLE: Record<NoteIntent, { bg: string; fg: string }> = {
  question: { bg: "rgba(236,72,153,0.12)", fg: "#be185d" },
  plan: { bg: "rgba(251,146,60,0.14)", fg: "#c2410c" },
  reference: { bg: "rgba(56,189,248,0.14)", fg: "#0369a1" },
  reflection: { bg: "rgba(52,211,153,0.16)", fg: "#047857" },
  task: { bg: "rgba(192,38,211,0.12)", fg: "#a21caf" },
  capture: { bg: "rgba(120,113,108,0.14)", fg: "#57534e" },
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "undated";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function NeuronotePage() {
  const [notes, setNotes] = useState<Note[]>(SEED);
  const [loaded, setLoaded] = useState(false);
  const [section, setSection] = useState<string>("All notes");
  const [query, setQuery] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftSection, setDraftSection] = useState(SECTIONS[0]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Note[];
        if (Array.isArray(parsed) && parsed.length > 0) setNotes(parsed);
      }
    } catch {
      // Corrupt or unavailable storage: keep the seed notes rather than invent state.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(notes));
    } catch {
      // Private mode or quota: notes stay in memory for this session.
    }
  }, [notes, loaded]);

  const route = useMemo(() => classifyNote(`${draftTitle} ${draftBody}`), [draftTitle, draftBody]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const n of notes) map[n.section] = (map[n.section] ?? 0) + 1;
    return map;
  }, [notes]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes
      .filter((n) => (section === "All notes" ? true : n.section === section))
      .filter((n) => (q ? `${n.title} ${n.body}`.toLowerCase().includes(q) : true))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [notes, section, query]);

  const canSave = draftBody.trim().length > 0;

  function saveNote() {
    if (!canSave) return;
    const title = draftTitle.trim() || draftBody.trim().split("\n")[0].slice(0, 60);
    const note: Note = {
      id: newId(),
      title,
      body: draftBody.trim(),
      section: draftSection,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setDraftTitle("");
    setDraftBody("");
  }

  function removeNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <main style={{ minHeight: "100vh", background: "#fff7f2", color: "#3b2a2a", fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#ec4899", fontWeight: 700 }}>
            Neuronote
          </div>
          <h1 style={{ margin: "0.6rem 0 0.4rem", fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 800, color: "#3b2a2a", letterSpacing: "-0.01em" }}>
            Notes that know what they are.
          </h1>
          <p style={{ margin: 0, maxWidth: 620, color: "#7c5c5c", lineHeight: 1.6 }}>
            Sunrise-themed notebooks for classes, favourites and the five-year plan. Every note is read locally and tagged by intent. Nothing leaves this browser.
          </p>
        </header>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "minmax(0, 1fr)" }}>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {/* Sidebar */}
            <aside style={{ background: "white", borderRadius: 20, border: "1px solid #f6d7c8", padding: "1.25rem", alignSelf: "start" }}>
              <h2 style={{ margin: "0 0 0.75rem", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b45309" }}>
                Notebooks
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                {["All notes", ...SECTIONS].map((s) => {
                  const active = s === section;
                  const count = s === "All notes" ? notes.length : counts[s] ?? 0;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setSection(s)}
                        style={{
                          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                          gap: 8, padding: "0.55rem 0.7rem", borderRadius: 12, cursor: "pointer",
                          border: active ? "1px solid #f9a8d4" : "1px solid transparent",
                          background: active ? "linear-gradient(135deg, #fff1f6, #fff7ed)" : "transparent",
                          color: active ? "#be185d" : "#6b4f4f", fontSize: 14, fontWeight: active ? 700 : 500,
                          textAlign: "left",
                        }}
                      >
                        <span>{s}</span>
                        <span style={{ fontSize: 12, color: "#b08968" }}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px dashed #f6d7c8" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#b45309", marginBottom: 6 }}>
                  Intent routing
                </div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "#7c5c5c" }}>
                  Question · Plan · Reference · Reflection · Task · Capture. Classified on this device from the words you write. Unmatched notes stay raw captures.
                </p>
              </div>
            </aside>

            {/* Composer */}
            <section style={{ background: "white", borderRadius: 20, border: "1px solid #f6d7c8", padding: "1.25rem" }}>
              <h2 style={{ margin: "0 0 0.9rem", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b45309" }}>
                New note
              </h2>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Title (optional)"
                style={{
                  width: "100%", padding: "0.65rem 0.8rem", borderRadius: 12,
                  border: "1px solid #f3d9cb", background: "#fffdfb", fontSize: 14, color: "#3b2a2a",
                  outlineColor: "#f9a8d4", marginBottom: 10,
                }}
              />
              <textarea
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                placeholder="Write it down…"
                rows={5}
                style={{
                  width: "100%", padding: "0.65rem 0.8rem", borderRadius: 12,
                  border: "1px solid #f3d9cb", background: "#fffdfb", fontSize: 14, color: "#3b2a2a",
                  outlineColor: "#f9a8d4", resize: "vertical", lineHeight: 1.55,
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 10 }}>
                <select
                  value={draftSection}
                  onChange={(e) => setDraftSection(e.target.value)}
                  style={{ padding: "0.5rem 0.65rem", borderRadius: 10, border: "1px solid #f3d9cb", background: "#fffdfb", fontSize: 13, color: "#3b2a2a" }}
                >
                  {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <span style={{
                  fontSize: 12, fontWeight: 700, padding: "0.3rem 0.6rem", borderRadius: 999,
                  background: INTENT_STYLE[route.intent].bg, color: INTENT_STYLE[route.intent].fg,
                }}>
                  {INTENT_LABELS[route.intent]}
                </span>
                <span style={{ fontSize: 11.5, color: "#9c7c7c" }}>{route.reason}</span>

                <button
                  type="button"
                  onClick={saveNote}
                  disabled={!canSave}
                  style={{
                    marginLeft: "auto", padding: "0.55rem 1.1rem", borderRadius: 12, border: "none",
                    background: canSave ? "linear-gradient(135deg, #fb923c, #ec4899)" : "#f1ded4",
                    color: canSave ? "white" : "#a8897f", fontWeight: 700, fontSize: 13,
                    cursor: canSave ? "pointer" : "default",
                  }}
                >
                  Save note
                </button>
              </div>
            </section>
          </div>

          {/* Notes */}
          <section>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#3b2a2a" }}>
                {section}
              </h2>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes"
                style={{
                  marginLeft: "auto", padding: "0.5rem 0.75rem", borderRadius: 10,
                  border: "1px solid #f3d9cb", background: "white", fontSize: 13, color: "#3b2a2a", minWidth: 180,
                }}
              />
            </div>

            {visible.length === 0 ? (
              <p style={{ color: "#9c7c7c", fontSize: 14 }}>No notes here yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
                {visible.map((n) => {
                  const r = classifyNote(`${n.title} ${n.body}`);
                  const style = INTENT_STYLE[r.intent];
                  return (
                    <article key={n.id} style={{
                      background: "white", borderRadius: 18, border: "1px solid #f6d7c8",
                      padding: "1rem 1.1rem", display: "flex", flexDirection: "column", gap: 8,
                      boxShadow: "0 10px 30px -22px rgba(190,24,93,0.5)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.22rem 0.5rem", borderRadius: 999, background: style.bg, color: style.fg }}>
                          {INTENT_LABELS[r.intent]}
                        </span>
                        <span style={{ fontSize: 11, color: "#b08968", marginLeft: "auto" }}>{formatDate(n.createdAt)}</span>
                      </div>
                      <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: "#3b2a2a", lineHeight: 1.35 }}>{n.title}</h3>
                      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "#6b4f4f", whiteSpace: "pre-wrap" }}>{n.body}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto", paddingTop: 4 }}>
                        <span style={{ fontSize: 11.5, color: "#b45309" }}>{n.section}</span>
                        <button
                          type="button"
                          onClick={() => removeNote(n.id)}
                          style={{ marginLeft: "auto", border: "none", background: "transparent", color: "#c98b8b", fontSize: 12, cursor: "pointer", padding: 0 }}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <footer style={{ marginTop: "2.5rem", fontSize: 12, color: "#b08968", lineHeight: 1.7 }}>
          Stored in this browser only (localStorage). Read-only by design: no accounts, no network calls, no telemetry.
        </footer>
      </div>
    </main>
  );
}
