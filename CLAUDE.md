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
Logs for this project MUST use the compact format (~50 lines max). DO NOT include:
- "Workflow Compliance" sections (always self-execution, always compliant)
- "Token Optimization (Phase 1.5)" sections (always N/A)
- "Chain-of-Verification" sections (always N/A for self-execution)
- "STOP-BEFORE-EDIT Guardrail" details (always permitted for React projects)
- Full JSON "Raw Data" blocks
- "Next Steps" or "Future Enhancements" (use BACKLOG.md instead)

**Compact Log Template**:
```markdown
# Session Log - [YYYY-MM-DD HH:MM]

## Summary
**Task**: [description] | **Duration**: Xmin | **Result**: SUCCESS/FAILED

## Changes
| File | Action | Description |
|------|--------|-------------|
| path/to/file.js | Modified | Brief description |

## Issues (P0/P1 only)
- [issue description and resolution, if any]

## Metrics
Files: X created, Y modified | Build: PASSED/FAILED | Errors: N
```

### GR-4: One Task = One Log
DO NOT create multiple log files for the same work. Rules:
- One session of work = one log file
- If multiple small tasks in one session, combine into a single log
- NEVER create both "session-log" AND "architect-report" for the same work
- Log location: `site-da-luci/.claude/logs/`

### GR-5: Factual Logs Only
Logs document what WAS done, not what COULD be done.
- NO "Next Steps" sections
- NO "Future Enhancements" sections
- NO "Recommended Tests" sections (tests should be done, not suggested)
- Improvement ideas go to `BACKLOG.md` instead

### GR-6: BACKLOG.md for Improvement Proposals
When any agent or session identifies an improvement opportunity:
1. Add it to `BACKLOG.md` with the required format
2. Do NOT add it to log files
3. Include enough context for any future session to implement it

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
