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
│   ├── skills/              # Specialized skills for common tasks
│   │   ├── index.md
│   │   ├── README.md
│   │   └── (skills to be created)
│   ├── commands/            # Slash commands for quick workflows
│   │   ├── index.md
│   │   ├── README.md
│   │   └── (commands to be created)
│   ├── examples/            # Do's and Don'ts examples
│   │   ├── index.md
│   │   ├── README.md
│   │   └── (examples to be created)
│   ├── execution_plans/     # Implementation plans (10 tasks/200 tokens max)
│   │   ├── index.md
│   │   ├── README.md
│   │   └── (plans to be created)
│   ├── templates/           # Reusable code templates
│   │   ├── index.md
│   │   ├── README.md
│   │   └── (templates to be created)
│   ├── knowledge/           # Project-specific knowledge base
│   │   ├── react_patterns.md
│   │   ├── eslint_i18n_validation.md
│   │   ├── css_implementation_checklist.md
│   │   ├── i18n_best_practices.md
│   │   └── hardcoded-texts-to-translate.md
│   ├── checklists/          # Pre-session checklists
│   │   └── pre-session-i18n-checklist.md
│   ├── docs/                # Technical documentation
│   │   ├── cypress-testing-strategy.md
│   │   └── solo-hunt-formulas.md
│   ├── optimization/        # Performance optimization docs
│   │   └── react-mode-context-optimization.md
│   ├── logs/                # Session reports for this project
│   │   └── architect-report-YYYY-MM-DD-HHmm.md
│   ├── FILE_ORGANIZATION.md # This file
│   └── FILE_LOCATION_GUARDRAIL.md
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

## Actions Taken

### 2026-01-01
1. ✅ **Removed duplicate**: `Projetos\.claude\knowledge\react_patterns.md`
2. ✅ **Kept in project**: All knowledge files in `site-da-luci\.claude\knowledge\`
3. ✅ **Kept logs in project**: `site-da-luci\.claude\logs\`

### 2026-01-16 (Workflow Improvement - Etapa 1)
1. ✅ **Created structure**: Added 5 new folders (skills, commands, examples, execution_plans, templates)
2. ✅ **Added index.md**: Each folder has inventory tracking (frontmatter + table)
3. ✅ **Added README.md**: Each folder has usage instructions for AI and users
4. ✅ **Updated FILE_ORGANIZATION.md**: Documented complete directory structure

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

## New Structure Benefits (2026-01-16)

### Skills
- **Purpose**: Specialized knowledge for recurring tasks (i18n validation, component generation, CSS theming)
- **Benefit**: Consistent quality and patterns across implementations

### Commands
- **Purpose**: Quick workflows via slash commands (/implement, /validate-i18n, /generate-component)
- **Benefit**: Faster execution of common tasks

### Examples
- **Purpose**: Do's and Don'ts for React, i18n, CSS
- **Benefit**: Quick reference for best practices

### Execution Plans
- **Purpose**: Structured implementation plans (10 tasks/200 tokens max per step)
- **Benefit**: Reduced context loss, granular commits (1 step = 1 commit)

### Templates
- **Purpose**: Reusable boilerplate code (components, hooks, tests)
- **Benefit**: Faster scaffolding, consistent structure

---

**Last Updated**: 2026-01-16
**Decision By**: meta-improver Agent
**Status**: Active Policy for site-da-luci
