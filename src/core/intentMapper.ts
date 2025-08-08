export type Intent = "contact" | "case-study" | "quote" | "join-discord";
const rules: [RegExp, Intent][] = [
  [/demo|case|work/i, "case-study"],
  [/price|quote|budget|cost/i, "quote"],
  [/discord|community|join/i, "join-discord"],
  [/contact|email|talk|meet/i, "contact"],
];

export function mapIntent(text: string): Intent {
  for (const [rx, intent] of rules) if (rx.test(text)) return intent;
  return "contact";
}
