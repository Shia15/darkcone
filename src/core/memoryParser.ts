export type Memory = { tags: string[]; entities: string[] };

export function parseMemory(text: string): Memory {
  const tags = Array.from(new Set((text.match(/#[\w-]+/g) ?? []).map(t => t.toLowerCase())));
  const entities = Array.from(new Set((text.match(/\b[A-Z][a-z]{2,}\b/g) ?? [])));
  return { tags, entities };
}
