# File Organization Policy - site-da-luci

## Structure Decision

### ✅ RECOMMENDED: Project-Specific .claude Directory

**Rationale:**
- `site-da-luci` is a React project WITHOUT 6-layer architecture (unlike nex-web-test)
- Knowledge base files are specific to this project:
  - `react_patterns.md` - React patterns in context of this project
  - `eslint_i18n_validation.md` - i18n validation specific to this project
  - `css_implementation_checklist.md` - CSS checklist specific to this project's dark theme
- Logs should stay with the project they document
- Keeps project portable and self-contained

### Directory Structure

```
site-da-luci/
├── .claude/
│   ├── knowledge/           # Project-specific knowledge base
│   │   ├── react_patterns.md
│   │   ├── eslint_i18n_validation.md
│   │   └── css_implementation_checklist.md
│   └── logs/                # Session reports for this project
│       └── architect-report-YYYY-MM-DD-HHmm.md
├── frontend/
│   ├── scripts/
│   │   └── validate-i18n.js
│   ├── .eslintrc.json
│   └── ...
└── ...
```

### Comparison with nex-web-test Structure

| Aspect | nex-web-test | site-da-luci |
|--------|--------------|--------------|
| Architecture | 6-layer (complex) | React (simple) |
| Knowledge Base | `Projetos\.claude\` (shared) + `nex-web-test\.claude\` (read-only) | `site-da-luci\.claude\` (self-contained) |
| Logs | `Projetos\.claude\logs\` (global workspace) | `site-da-luci\.claude\logs\` (project-specific) |
| Agents | `Projetos\.claude\agents\` (shared multi-agent system) | N/A (uses shared agents when needed) |
| Portability | Lower (depends on global .claude) | Higher (self-contained) |

## FILE_POLICY.md Interpretation

The `Projetos\.claude\FILE_POLICY.md` is specific to **nex-web-test** workflow:
- **nex-web-test**: Has complex 6-layer architecture requiring strict separation
- **site-da-luci**: Simple React project can use project-specific `.claude/`

## Actions Taken (2026-01-01)

1. ✅ **Removed duplicate**: `Projetos\.claude\knowledge\react_patterns.md`
2. ✅ **Kept in project**: All knowledge files in `site-da-luci\.claude\knowledge\`
3. ✅ **Kept logs in project**: `site-da-luci\.claude\logs\`

## When to Use Global vs Project-Specific

### Use `Projetos\.claude\` (Global) When:
- Working on **nex-web-test** (6-layer architecture project)
- Knowledge applies to **multiple projects** (e.g., general Cypress patterns)
- Agents/commands are **shared across projects**

### Use `site-da-luci\.claude\` (Project-Specific) When:
- Knowledge is **specific to site-da-luci** (e.g., i18n validation, CSS dark theme)
- Logs document **site-da-luci sessions**
- Want **project portability** (can move project folder independently)

## Future Recommendations

### If More Projects Are Added:
1. Each project gets its own `.claude/` if it has specific knowledge/patterns
2. Truly shared knowledge (applicable to ALL projects) goes in `Projetos\.claude\knowledge\`
3. Agents remain in `Projetos\.claude\agents\` (shared multi-agent system)

### If site-da-luci Grows Complex:
- Consider migrating to 6-layer architecture
- Then follow nex-web-test policy (split global/project .claude)

---

**Last Updated**: 2026-01-01
**Decision By**: Architect Agent
**Status**: Active Policy for site-da-luci
