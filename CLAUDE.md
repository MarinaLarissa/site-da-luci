# CLAUDE.md - site-da-luci

## Project Overview
- **Stack**: React 19.2.3, styled-components, i18next, Supabase auth, React Router (HashRouter)
- **Hosting**: GitHub Pages (https://marinalarissa.github.io/site-da-luci)
- **Architecture**: React SPA (NO 6-layer architecture, NO multiagent ecosystem)
- **Execution mode**: Always self-execution. No agent delegation (Task tool N/A).

## Guardrails

### GR-1: Null Safety (Defensive Programming)
NEVER call methods on values that may be null/undefined without protection.
```javascript
// BAD:
value.toFixed(1)
items.map(...)

// GOOD:
(value ?? 0).toFixed(1)
items?.map(...) ?? []
```
Apply optional chaining (`?.`) and nullish coalescing (`??`) as standard practice.

### GR-2: No Hardcoded Secrets
NEVER hardcode API keys, tokens, or credentials in source files.
Use `process.env.REACT_APP_*` variables and `.env` files.
```javascript
// BAD:
const API_KEY = 'K87899142388957';

// GOOD:
const API_KEY = process.env.REACT_APP_OCR_SPACE_API_KEY || '';
```

### GR-3: Compact Log Format
Logs for this project MUST use the compact format (~50-80 lines max). DO NOT include:
- "Workflow Compliance" sections (always self-execution, always compliant)
- "Token Optimization (Phase 1.5)" sections (always N/A)
- "Chain-of-Verification" sections (always N/A for self-execution)
- "STOP-BEFORE-EDIT Guardrail" details (always permitted for React projects)
- Full JSON "Raw Data" blocks
- "Next Steps" or "Future Enhancements" (use BACKLOG.md instead)
- Excessive emojis (use only ✅ ❌ ⚠️ for status indicators)
- ASCII art or visual diagrams (describe in text instead)
- Speculative "MELHORIAS FUTURAS" sections

**Templates:**
- Single feature: `.claude/templates/COMPACT_LOG_TEMPLATE.md`
- Multi-feature session: `.claude/templates/SESSION_LOG_TEMPLATE.md`

**Required sections:**
1. Summary (type, duration, impact)
2. Changes (table format)
3. Tests (MUST include actual results, not just plans)
4. Metrics (use `npm run log-metrics` if available)

**Optional sections** (only if relevant):
- Context (problem/solution)
- Risks & Mitigations
- Next Steps (only concrete follow-ups)

### GR-4: Session-Based Logging
DO NOT create multiple log files for the same work session. Rules:
- **One work session = one log file** (~1-2 hours of related work)
- If multiple features/fixes in same session, use SESSION_LOG_TEMPLATE.md
- Group related tasks (e.g., "Bestiary Filter Overhaul" not 5 separate filter logs)
- NEVER create both "session-log" AND "architect-report" for the same work
- Log location: `site-da-luci/.claude/logs/`
- Naming: `[feature-name]-YYYY-MM-DD.md` or `session-YYYY-MM-DD-HHmm.md`

**Benefits:**
- Full context in one place (easier to review)
- Fewer files to manage (reduces clutter)
- Better understanding of related changes

### GR-5: Test-Before-Log Validation
Logs MUST include actual test results, not test plans.

**Workflow:**
1. Implement feature/fix
2. **Run tests:** `npm test` (unit + integration)
3. **Verify manually:** Check that feature works as expected
4. **Collect metrics:** `npm run log-metrics` (if available)
5. **THEN write log** with actual results

**Log format:**
```markdown
## Tests
✅ Unit tests: 74/74 passing
✅ Integration: 12/12 passing
✅ Manual verification:
  - [x] Feature works as expected
  - [x] No regressions detected
  - [x] Performance acceptable
```

**NEVER:**
- Create logs with unchecked test checkboxes `[ ]`
- Write "Tests needed" or "Recommended tests" sections
- Log changes that haven't been validated

**Why:** Prevents logging broken changes, ensures quality

### GR-6: Factual Logs Only
Logs document what WAS done, not what COULD be done.
- NO "Next Steps" sections (unless concrete follow-ups)
- NO "Future Enhancements" sections
- NO "Recommended Tests" sections (tests should be done, not suggested)
- Improvement ideas go to `BACKLOG.md` instead

### GR-7: BACKLOG.md for Improvement Proposals
When any agent or session identifies an improvement opportunity:
1. Add it to `BACKLOG.md` with the required format
2. Do NOT add it to log files
3. Include enough context for any future session to implement it

### GR-8: Minimal Emoji Usage
Use emojis ONLY for status indicators in logs:
- ✅ Success/Passed/Complete
- ❌ Failure/Error/Blocked
- ⚠️ Warning/Partial/Caution

**DO NOT use decorative emojis:**
- ❌ Section headers: `## 📝 OBJETIVO`, `## 🎨 VISUAL`, `## 🧪 TESTS`
- ❌ Bullets: `- 🚀 Feature`, `- 💡 Idea`, `- 🔧 Fix`
- ❌ Emphasis: `**🎯 GOAL**`, `**💪 DONE**`

**Use plain text instead:**
- ✅ `## Objective`, `## Visual Behavior`, `## Tests`
- ✅ `- Feature:`, `- Idea:`, `- Fix:`

**Why:** Reduces token usage, improves searchability, maintains professionalism

## Coding Conventions
- **Language**: JavaScript (ES6+), no TypeScript
- **Styling**: styled-components (co-located .styles.js files)
- **i18n**: All user-facing strings via i18next (pt-BR + en)
- **State**: React hooks (useState, useCallback, useMemo)
- **Routing**: React Router v6 with HashRouter
- **Auth**: Supabase (@supabase/supabase-js)
- **Testing**: Jest + React Testing Library + Cypress (E2E)

## Key Paths
- Frontend source: `frontend/src/`
- Components: `frontend/src/components/`
- Hooks: `frontend/src/hooks/`
- Services: `frontend/src/services/`
- Data: `frontend/src/data/`
- Translations: `frontend/src/locales/{pt-BR,en}/translation.json`
- Logs: `.claude/logs/`
- Backlog: `BACKLOG.md` (project root)
