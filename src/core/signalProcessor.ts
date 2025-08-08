export type Signal = { text: string; locale?: string };
export type SignalOut = { text: string; tokens: number; sentiment: number };

export function processSignal(s: Signal): SignalOut {
  const text = s.text.trim();
  const tokens = Math.ceil(text.length / 4);
  const sentiment = Math.max(-1, Math.min(1, (text.match(/\b(good|great|love)\b/gi)?.length ?? 0) * 0.2));
  return { text, tokens, sentiment };
}
