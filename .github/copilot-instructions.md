# Copilot: How to contribute in this repository

## Mission
MARI-Core is a symbolic operating system for mood, logic, and intent routing. Output must be clear, typed, and aligned with the project’s narrative (calm, precise, purposeful).

## Tech & Layout
- Language: TypeScript (strict)
- Runtime: Node / Next.js when UI-facing
- Paths:
  - `/src/agents/*` agent logic
  - `/src/emotion/*` mood evaluation + state
  - `/src/controller/intentRouter.ts` intent/mood → agent routing
  - `/docs/*` architecture, diagrams (source of truth for concepts)

## Conventions
- **Commits**: `feat(scope): …`, `fix(scope): …`, `chore(doc): …`
- **Style**: Prettier default; keep functions small, pure where possible
- **Types**: Prefer explicit return types; no `any`
- **Errors**: Use discriminated unions: `{ ok: false, error: 'Reason' }`
- **Logs**: `logger.info({ mood, intent, agent }, 'routing')` (guarded by env flag)
- **Testing**: Vitest; name tests `*.spec.ts`. At least one test per new module.

## Guardrails
**Do**
- Extend existing agents; keep file structure stable
- Document public functions with 1–2 line JSDoc
- Add runtime checks for unrecognized mood/intent
- Respect accessibility in any UI code

**Don’t**
- Invent new top-level folders
- Add external deps without a one-line rationale
- Weaken typing (`any`, implicit `any`)
- Emit verbose logs in production code paths

## Key Types
```ts
export type Mood = 'serene' | 'focused' | 'charged' | 'reflective' | 'discerning';
export type Intent = 'explore' | 'clarify' | 'compose' | 'decide' | 'ship';

export interface RoutingInput { mood: Mood; intent: Intent; context?: Record<string, unknown>; }
export interface AgentResult { agent: string; rationale: string; }
```

## Routing Contract
- Function: `route({ mood, intent, context }): AgentResult`
- On unknown mood/intent → return explicit fallback agent + rationale.

## Example Tasks for Copilot
- “Add structured logging to `intentRouter.ts` printing `{ mood, intent, agent }` behind `DEBUG_ROUTING==='1'`.”
- “Create `src/emotion/moodLogic.ts` with `scoreMood(text)` and tests (rule‑based, no ML).”
- “Expand README ‘Contributor Onboarding’ referencing `/docs/Architecture_Reference.md` and `MARI_ClassDiagram.png`.”

## Definition of Done
- Build, lint, and tests pass
- Types are strict and documented
- Minimal diff; respects structure and narrative voice
