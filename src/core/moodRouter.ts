export type MoodScore = { calm: number; focus: number; energy: number };
export type AgentRoute = { agent: "gold-ops" | "trade-flow" | "support"; reason: string };

export function routeByMood(m: MoodScore): AgentRoute {
  if (m.energy > 0.7) return { agent: "trade-flow", reason: "High energy → execution" };
  if (m.focus > 0.7)  return { agent: "gold-ops",   reason: "Focused → ops & detail" };
  return { agent: "support", reason: "Neutral → general support" };
}
