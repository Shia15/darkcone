export type NoteIntent =
  | "question"
  | "plan"
  | "reference"
  | "reflection"
  | "task"
  | "capture";

export type NoteRoute = {
  intent: NoteIntent;
  confidence: number;
  matched: string[];
  reason: string;
};

type Rule = { intent: NoteIntent; rx: RegExp; reason: string };

const RULES: Rule[] = [
  { intent: "question", rx: /\b(why|how|what|when|who|which|does|is it|can i|\?)\b/gi, reason: "Interrogative phrasing" },
  { intent: "task", rx: /\b(todo|to-do|need to|must|remember to|finish|submit|due)\b/gi, reason: "Action item phrasing" },
  { intent: "plan", rx: /\b(plan|roadmap|goal|by (monday|friday|next)|five-year|semester|schedule|milestone)\b/gi, reason: "Forward-looking phrasing" },
  { intent: "reference", rx: /\b(definition|formula|theorem|citation|source|quote|ref|page \d+|chapter)\b/gi, reason: "Lookup phrasing" },
  { intent: "reflection", rx: /\b(felt|feeling|realized|thinking about|wonder|grateful|struggle)\b/gi, reason: "Reflective phrasing" },
];

/**
 * Deterministic, local classification. No network calls, no invented content:
 * if nothing matches, the note is treated as a plain capture.
 */
export function classifyNote(text: string): NoteRoute {
  const body = text.trim();
  if (!body) {
    return { intent: "capture", confidence: 0, matched: [], reason: "Empty note" };
  }

  const hits: { intent: NoteIntent; reason: string; terms: string[] }[] = [];
  for (const rule of RULES) {
    const terms = body.match(rule.rx);
    if (terms && terms.length > 0) {
      hits.push({ intent: rule.intent, reason: rule.reason, terms: Array.from(new Set(terms.map((t) => t.toLowerCase()))) });
    }
  }

  if (hits.length === 0) {
    return { intent: "capture", confidence: 0.2, matched: [], reason: "No rule matched; kept as raw capture" };
  }

  hits.sort((a, b) => b.terms.length - a.terms.length);
  const top = hits[0];
  const total = hits.reduce((sum, h) => sum + h.terms.length, 0);

  return {
    intent: top.intent,
    confidence: Math.min(1, top.terms.length / Math.max(total, 1)),
    matched: top.terms,
    reason: top.reason,
  };
}

export const INTENT_LABELS: Record<NoteIntent, string> = {
  question: "Question",
  plan: "Plan",
  reference: "Reference",
  reflection: "Reflection",
  task: "Task",
  capture: "Capture",
};
