---
name: log-compact
description: Generate compact log from git diff and test results
enabled: true
tags: [logging, automation, productivity]
---

# /log-compact - Automated Compact Log Generator

Generate a compact, standardized log file from current changes, test results, and metrics.

## Usage

```bash
/log-compact [session-name]
```

**Examples:**
- `/log-compact bestiary-filters` → Creates `bestiary-filters-2026-02-07.md`
- `/log-compact bug-fix-auth` → Creates `bug-fix-auth-2026-02-07.md`
- `/log-compact` → Creates `session-2026-02-07-HHmm.md` (default)

## What It Does

1. **Analyzes Changes:**
   - Runs `git diff --stat` to get file changes
   - Identifies files modified, lines added/removed

2. **Runs Tests:**
   - Executes `npm test` (from frontend/)
   - Captures test results (passing/failing/total)

3. **Collects Metrics:**
   - Runs `npm run log-metrics` (if available)
   - Gets bundle size, coverage, build stats

4. **Generates Log:**
   - Uses COMPACT_LOG_TEMPLATE.md or SESSION_LOG_TEMPLATE.md
   - Fills in actual data (not placeholders)
   - Saves to `.claude/logs/[name]-YYYY-MM-DD.md`

5. **Validates:**
   - Ensures tests have run (no unchecked boxes)
   - Includes only factual data (no speculation)
   - Follows GR-3 through GR-8 guidelines

## Template Selection

**Single feature/fix** → COMPACT_LOG_TEMPLATE.md
- 1 focused change
- ~50-80 lines
- Quick to write

**Multi-feature session** → SESSION_LOG_TEMPLATE.md
- 2+ related changes
- Grouped context
- Clearer overview

## Output Location

`site-da-luci/.claude/logs/[name]-YYYY-MM-DD.md`

## Implementation

When invoked, perform these steps:

### Step 1: Analyze Git Changes
```bash
cd frontend
git diff --stat HEAD
git diff --name-status HEAD
```

Parse output to extract:
- Files changed (count)
- Insertions (+N)
- Deletions (-N)
- File paths and descriptions

### Step 2: Run Tests
```bash
cd frontend
npm test -- --ci --coverage --passWithNoTests
```

Capture:
- Tests passing: X
- Tests failing: Y
- Total tests: X+Y
- Coverage % (if available)

### Step 3: Collect Metrics
```bash
cd frontend
npm run log-metrics
```

Capture:
- Bundle size (KB)
- Build time (optional, slow)
- Git stats

### Step 4: Determine Template
```javascript
const changedFiles = gitStats.files_changed;
const useSessionTemplate = changedFiles >= 3 || args.includes('--session');
const template = useSessionTemplate
  ? '.claude/templates/SESSION_LOG_TEMPLATE.md'
  : '.claude/templates/COMPACT_LOG_TEMPLATE.md';
```

### Step 5: Fill Template
Replace placeholders:
- `[Feature/Fix Name]` → session name (from arg)
- `YYYY-MM-DD` → current date
- `[X]m` → calculated from timestamps
- Tables → fill with actual data
- Test checkboxes → mark ✅/❌ based on results

### Step 6: Save & Notify
```javascript
const filename = `${sessionName}-${date}.md`;
const filepath = `.claude/logs/${filename}`;
fs.writeFileSync(filepath, filledTemplate);
console.log(`✅ Log saved: ${filepath}`);
```

## Quality Gates

Before saving, verify:
- [ ] All test sections have actual results (no `[ ]` unchecked boxes)
- [ ] Metrics table has real data (no placeholders)
- [ ] File changes table lists actual files
- [ ] No "Next Steps" or "Future Enhancements" sections
- [ ] Emoji usage limited to ✅ ❌ ⚠️
- [ ] Log size ≤ 100 lines (compact) or ≤ 200 lines (session)

## Error Handling

**If tests fail:**
```markdown
## Tests
❌ Unit tests: 68/74 passing (6 failing)
```
Still create log, but mark with ⚠️ status.

**If git diff empty:**
Ask user: "No changes detected. Create log anyway? [y/N]"

**If metrics script missing:**
Skip metrics section, note in log:
```markdown
## Metrics
*(Metrics collection not available - run `npm run log-metrics` manually)*
```

## Configuration

Optional: Create `.claude/log-compact.config.json`:
```json
{
  "defaultTemplate": "compact",
  "includeMetrics": true,
  "runTests": true,
  "outputDir": ".claude/logs/",
  "fileNameFormat": "{name}-{date}.md"
}
```

## Benefits

- **Speed:** 10-15 min → 1-2 min per log
- **Consistency:** Always follows template
- **Accuracy:** Real data, not estimates
- **Quality:** Enforces test validation
- **Compliance:** Follows all GR-* guidelines

## Example Output

```markdown
# Bestiary Filter Overhaul - 2026-02-07

## Summary
**Type:** Feature
**Duration:** 27m
**Impact:** Location-based filtering added, 5 UX improvements

## Changes
| File | Lines | Description |
|------|-------|-------------|
| FilterPanel.js | +45 -30 | Replaced region dropdown with location multi-select |
| useBestiaryPlanner.js | +20 -15 | Updated filter logic for array matching |

**Total:** 2 files changed, +65 insertions, -45 deletions

## Tests
✅ Unit tests: 74/74 passing
✅ Integration: 12/12 passing
✅ Manual verification:
  - [x] All filters working correctly
  - [x] No regressions detected

## Metrics
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Bundle size | 248KB | 250KB | +2KB (+0.8%) |
| Test coverage | 78.4% | 78.4% | 0% |

**Status:** ✅ Complete
```

## Notes

- First version: Focus on git diff + test results
- Future: Add AI summarization of changes
- Future: Integrate with commit hooks (auto-log after commit)

---

**Priority:** P1 (High value, saves significant time)
**Complexity:** Medium (shell scripting + template filling)
**ROI:** ~200 min/year saved (20 logs × 10 min each)
