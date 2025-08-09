## Using GitHub Copilot in this repo

1. **Context load:** Open the following files first so Copilot learns structure:
   - `/docs/Architecture_Reference.md`
   - `/src/controller/intentRouter.ts`
   - `/src/emotion/*` (mood evaluation)

2. **Prompt style:** Be precise, reference filenames and functions. Example:
   > Add structured logging to `src/controller/intentRouter.ts` that logs `{ mood, intent, agent }` only when `process.env.DEBUG_ROUTING==='1'`. Return the chosen agent and rationale unchanged. Create `src/controller/intentRouter.spec.ts` with a fallback test.

3. **Commit messages:** Use `feat|fix|chore(scope): message`.

4. **Review checklist:**
   - [ ] No `any`
   - [ ] Explicit return types
   - [ ] Tests updated/added
   - [ ] Docs touched if behavior changed

5. **Common prompts**
   - “Generate discriminated union errors for routing edge cases.”
   - “Add `scoreMood(text)` stub with TODOs and unit tests.”
   - “Draft contributor onboarding that points to diagrams in `/docs`.”
