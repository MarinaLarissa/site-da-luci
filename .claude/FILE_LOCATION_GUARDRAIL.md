# File Location Guardrail

**Purpose**: Ensure all site-da-luci-specific knowledge, documentation, and optimization files are stored within the project's `.claude` folder for version control and team collaboration.

**Last Updated**: 2026-01-04
**Owner**: Architect Agent

---

## Problem Statement

Previously, site-da-luci-specific files were created in the parent `.claude` folder (`c:\Users\NEXLAB\Documents\Projetos\.claude`), which:
- ❌ Are not version-controlled with the project
- ❌ Not accessible to future contributors or team members
- ❌ Mixed with other project files (nex-web-test, etc.)
- ❌ Risk being lost during project migration or deployment

---

## Solution: Project-Specific .claude Folder

All site-da-luci-specific files MUST be stored in:
```
c:\Users\NEXLAB\Documents\Projetos\site-da-luci\.claude\
```

This ensures:
- ✅ Version control via git
- ✅ Team accessibility
- ✅ Clear project ownership
- ✅ Portability across environments

---

## File Location Rules

### ALWAYS Create in site-da-luci/.claude/

**React-specific files**:
- ✅ React component patterns
- ✅ React hooks documentation
- ✅ React testing strategies
- ✅ Frontend optimization guides

**i18n/Translation files**:
- ✅ i18n best practices
- ✅ Translation checklists
- ✅ Hardcoded text reports
- ✅ i18n validator scripts
- ✅ Language-specific guides

**Site-da-luci domain knowledge**:
- ✅ Tibia game mechanics documentation
- ✅ Loot split calculator logic
- ✅ Solo hunt analyzer workflows
- ✅ Imbuement efficiency formulas
- ✅ Ring Bis mechanics

**Performance & Optimization**:
- ✅ Context optimization strategies (e.g., `react-mode-context-optimization.md`)
- ✅ Bundle size analysis
- ✅ Component performance baselines
- ✅ CSS variable extractors

**Logs & Reports**:
- ✅ Architect execution reports for site-da-luci work
- ✅ Feature implementation logs
- ✅ Bug fix documentation

**Checklists & Templates**:
- ✅ Pre-session checklists (e.g., `pre-session-i18n-checklist.md`)
- ✅ Unit test templates
- ✅ Component scaffolding templates

**Utilities & Scripts**:
- ✅ Clipboard utilities
- ✅ CSS extractors
- ✅ i18n validators
- ✅ Custom build scripts

### ALWAYS Create in Parent .claude/ (Generic)

**Multi-project files**:
- ✅ Agent definitions (architect.md, feature-implementer.md, etc.)
- ✅ Clean Architecture documentation (applies to nex-web-test AND future 6-layer projects)
- ✅ Domain glossary (cross-project terminology)
- ✅ Generic code patterns (applicable to any project)
- ✅ Testing workflows (generic E2E, unit testing strategies)

**Ecosystem-wide baselines**:
- ✅ Performance baselines for agents (not project-specific)
- ✅ Meta-Improver changelog (tracks all projects)
- ✅ Workflow efficiency analysis (cross-project metrics)

**Decisions (ADRs)**:
- ✅ ADRs for nex-web-test (e.g., `adr-001-fail-safe-defaults-cep-intercept.md`)
- ❌ ADRs for site-da-luci → Should go in `site-da-luci/.claude/decisions/`

---

## Decision Tree for Agents

When creating a new file, ask:

```
┌─────────────────────────────────────────┐
│  Does this file mention React,          │
│  i18n, or site-da-luci-specific logic?  │
└──────────────┬──────────────────────────┘
               │
         ┌─────┴─────┐
         │           │
        YES          NO
         │           │
         ▼           ▼
  ┌──────────┐  ┌──────────────────┐
  │ site-da- │  │ Does it apply to │
  │  luci    │  │ MULTIPLE projects│
  │ .claude/ │  │ (nex-web-test,   │
  └──────────┘  │ site-da-luci)?   │
                └─────┬────────────┘
                      │
                ┌─────┴─────┐
                │           │
               YES          NO
                │           │
                ▼           ▼
         ┌──────────┐  ┌──────────┐
         │  Parent  │  │ UNSURE:  │
         │ .claude/ │  │ ASK USER │
         └──────────┘  └──────────┘
```

---

## Examples

### ✅ CORRECT Placement

| File                                      | Location                                    | Reason                                  |
|-------------------------------------------|---------------------------------------------|-----------------------------------------|
| `pre-session-i18n-checklist.md`           | `site-da-luci/.claude/checklists/`          | i18n-specific, site-da-luci workflow    |
| `react-mode-context-optimization.md`      | `site-da-luci/.claude/optimization/`        | React-specific optimization             |
| `hardcoded-texts-to-translate.md`         | `site-da-luci/.claude/knowledge/`           | Translation report for site-da-luci     |
| `architect-report-2026-01-04-1800.md`     | `site-da-luci/.claude/logs/`                | Execution log for site-da-luci work     |
| `clipboardUtils.js` (template)            | `site-da-luci/frontend/src/utils/`          | Code belongs in src/, not .claude       |
| `css-variable-extractor.js`               | `site-da-luci/frontend/scripts/`            | Build script for site-da-luci           |
| `clean_architecture.md`                   | `parent/.claude/knowledge/`                 | Generic, applies to nex-web-test        |
| `architect.md`                            | `parent/.claude/agents/`                    | Multi-project agent definition          |

### ❌ INCORRECT Placement (Before Guardrail)

| File                                      | Wrong Location                | Correct Location                            |
|-------------------------------------------|-------------------------------|---------------------------------------------|
| `pre-session-i18n-checklist.md`           | `parent/.claude/checklists/`  | `site-da-luci/.claude/checklists/`          |
| `react-mode-context-optimization.md`      | `parent/.claude/optimization/`| `site-da-luci/.claude/optimization/`        |
| `hardcoded-texts-to-translate.md`         | `parent/.claude/knowledge/`   | `site-da-luci/.claude/knowledge/`           |
| `architect-report-2026-01-04-1800.md`     | `parent/.claude/logs/`        | `site-da-luci/.claude/logs/`                |

---

## Agent Responsibility

### Architect Agent
- **MUST** consult this guardrail before creating ANY new file in `.claude` folders
- **MUST** ask user if uncertain about file placement
- **MUST** update this guardrail if new categories emerge

### Feature-Implementer Agent
- Creates code files (`.js`, `.jsx`, etc.) in `src/` → No guardrail needed
- If creating documentation → Refer to Architect

### Reviewer Agent
- Reviews code placement during PR review
- Flags files in wrong `.claude` location

### Meta-Improver Agent
- Tracks compliance with this guardrail in session reports
- Reports violations to Architect for correction

---

## Enforcement Checklist

Before committing to git, verify:
- [ ] All React-specific files in `site-da-luci/.claude/`?
- [ ] All i18n-specific files in `site-da-luci/.claude/`?
- [ ] All site-da-luci domain knowledge in `site-da-luci/.claude/`?
- [ ] All site-da-luci logs in `site-da-luci/.claude/logs/`?
- [ ] Generic multi-project files in `parent/.claude/`?
- [ ] Agent definitions (*.md) in `parent/.claude/agents/`?

---

## Migration History

**2026-01-04**: Migrated the following files from `parent/.claude/` to `site-da-luci/.claude/`:

1. **Optimization**:
   - `optimization/react-mode-context-optimization.md`

2. **Checklists**:
   - `checklists/pre-session-i18n-checklist.md`

3. **Knowledge**:
   - `knowledge/hardcoded-texts-to-translate.md`
   - `knowledge/i18n_best_practices.md`

4. **Logs**:
   - `logs/architect-report-2026-01-01-0300.md`
   - `logs/architect-report-2026-01-01-0315.md`
   - `logs/architect-report-2026-01-02-1430.md`
   - `logs/architect-report-2026-01-03-1630.md`
   - `logs/architect-report-2026-01-03-1700.md`
   - `logs/architect-report-2026-01-04-1800.md`

**Note**: Original files remain in `parent/.claude/` as backup. Can be deleted after verification.

---

## Future Considerations

### When site-da-luci/.claude/ Becomes Too Large
If `.claude/` folder exceeds 50 files or 10MB:
- Consider creating subdirectories by feature (e.g., `knowledge/solo-hunt/`, `knowledge/imbuement/`)
- Archive old logs to `.claude/logs/archive/`
- Move rarely-used files to `.claude/archive/`

### Multi-Repo Future
If site-da-luci splits into separate repos (frontend-only, backend-only):
- Frontend repo gets: React patterns, i18n files, frontend optimization
- Backend repo gets: API documentation, backend optimization
- Shared repo gets: Domain glossary, shared utilities

---

## Version History

- **v1.0** (2026-01-04): Initial guardrail creation with migration from parent .claude folder

---

**Status**: Active
**Enforcement**: Mandatory for all agents
**Review Schedule**: Quarterly or when new file categories emerge
