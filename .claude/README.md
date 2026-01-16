# .claude - site-da-luci

Estrutura de conhecimento, skills, templates e workflows para o projeto **site-da-luci**.

---

## 📁 Estrutura

```
.claude/
├── skills/              ⚙️  Specialized skills for common tasks
├── commands/            🚀  Slash commands for quick workflows
├── examples/            📖  Do's and Don'ts examples
├── execution_plans/     📋  Implementation plans (10 tasks/200 tokens max)
├── templates/           📝  Reusable code templates
├── knowledge/           🧠  Project-specific knowledge base
├── checklists/          ✅  Pre-session checklists
├── docs/                📚  Technical documentation
├── optimization/        ⚡  Performance optimization docs
└── logs/                📊  Session reports
```

---

## 🎯 Quick Navigation

### For Implementation Tasks

1. **Before Starting** → Check [execution_plans/](execution_plans/README.md)
2. **Need a Skill?** → Browse [skills/](skills/index.md)
3. **Need a Template?** → Browse [templates/](templates/index.md)
4. **Need Examples?** → Check [examples/](examples/index.md)
5. **Quick Command?** → See [commands/](commands/index.md)

### For Knowledge Base

- **React Patterns** → [knowledge/react_patterns.md](knowledge/react_patterns.md)
- **i18n Best Practices** → [knowledge/i18n_best_practices.md](knowledge/i18n_best_practices.md)
- **CSS Checklist** → [knowledge/css_implementation_checklist.md](knowledge/css_implementation_checklist.md)
- **ESLint i18n Validation** → [knowledge/eslint_i18n_validation.md](knowledge/eslint_i18n_validation.md)

---

## 🔄 Workflow: How to Use This Structure

### Scenario 1: Implementing a New Feature

```
1. Create execution plan
   → Use templates/template_execution_plan.md
   → Save in execution_plans/[numero]-[feature-name].md

2. Check relevant skills
   → skills/react-component-generator/ (if creating component)
   → skills/i18n-validator/ (if using translations)
   → skills/css-theme-implementer/ (if styling)

3. Use templates
   → templates/template_react_component.md (for components)
   → templates/template_react_hook.md (for hooks)

4. Check examples
   → examples/react-component-dos-donts.md
   → examples/i18n-dos-donts.md
   → examples/css-dos-donts.md

5. Implement step by step
   → Follow execution plan
   → 1 step = 1 commit
   → Update plan after each step
```

### Scenario 2: Validating i18n

```
1. Run command
   → /validate-i18n [path]
   OR
   → Use skill: skills/i18n-validator/SKILL.md

2. Check checklist
   → checklists/pre-session-i18n-checklist.md

3. Fix issues
   → Follow examples/i18n-dos-donts.md
```

### Scenario 3: Creating a Component

```
1. Use command
   → /generate-component [ComponentName]
   OR
   → Use skill: skills/react-component-generator/SKILL.md

2. Use template
   → templates/template_react_component.md

3. Check examples
   → examples/react-component-dos-donts.md

4. Validate
   → No hardcoded texts (i18n-validator)
   → CSS follows patterns (css-dos-donts)
```

---

## 📚 Key Concepts

### Skills
**Specialized knowledge for recurring tasks**

Skills are comprehensive guides (300+ lines) that document:
- Purpose and context
- Code patterns and conventions
- Common workflows
- Best practices (DO's and DON'Ts)
- Quick reference

**When to use**: For complex tasks requiring detailed knowledge

**Example**: Creating a complete test suite with proper structure

---

### Commands
**Quick workflows via slash commands**

Commands are shortcuts (50-100 lines) that:
- Define syntax and usage
- Document workflow steps
- Reference skills/agents used
- Provide examples

**When to use**: For frequent, simple tasks

**Example**: `/validate-i18n src/components`

---

### Examples
**Do's and Don'ts reference**

Examples show:
- ✅ Correct patterns (with explanation)
- ❌ Incorrect patterns (with explanation)
- Before/after comparisons

**When to use**: Quick reference during implementation

**Example**: "Should I use inline styles or CSS-in-JS?"

---

### Execution Plans
**Structured implementation plans**

Plans define:
- Executive summary
- Current state analysis
- Goals and success criteria
- Steps (10 tasks/200 tokens max)
- Progress tracking

**When to use**: Before implementing any non-trivial feature

**Example**: "Add dark theme to entire app"

---

### Templates
**Reusable boilerplate code**

Templates provide:
- Complete code structure
- Commented sections
- Usage examples
- Validation checklist

**When to use**: Scaffolding new files/components

**Example**: Creating a new React component

---

## 🔗 Cross-References

### Skills → Templates
- `skills/react-component-generator/` uses `templates/template_react_component.md`
- `skills/css-theme-implementer/` references CSS patterns in `knowledge/css_implementation_checklist.md`
- `skills/i18n-validator/` uses `knowledge/i18n_best_practices.md`

### Commands → Skills
- `/implement` creates execution plan from `templates/template_execution_plan.md`
- `/validate-i18n` uses `skills/i18n-validator/`
- `/generate-component` uses `skills/react-component-generator/`

### Examples → Knowledge
- `examples/react-component-dos-donts.md` references `knowledge/react_patterns.md`
- `examples/i18n-dos-donts.md` references `knowledge/i18n_best_practices.md`
- `examples/css-dos-donts.md` references `knowledge/css_implementation_checklist.md`

### Execution Plans → Everything
- Plans reference relevant skills
- Plans use templates
- Plans follow examples
- Plans stored in `execution_plans/`

---

## 📊 Status (2026-01-16)

| Folder | Status | Items | Next Steps |
|--------|--------|-------|------------|
| skills/ | 🟡 Structure Ready | 0/3 planned | Create i18n-validator, react-component-generator, css-theme-implementer |
| commands/ | 🟡 Structure Ready | 0/5 planned | Create /implement, /validate-i18n, /generate-component |
| examples/ | 🟡 Structure Ready | 0/5 planned | Create react, i18n, css dos-donts |
| execution_plans/ | 🟡 Structure Ready | 0 plans | Create template first |
| templates/ | 🟡 Structure Ready | 0/5 planned | Create execution_plan, react_component, react_hook templates |
| knowledge/ | ✅ Active | 5 files | Maintain and update |
| checklists/ | ✅ Active | 1 checklist | Add more as needed |
| docs/ | ✅ Active | 2 docs | Add more as needed |

**Legend**: ✅ Active | 🟡 Structure Ready | 🔵 In Progress | ❌ Blocked

---

## 🎯 Next Steps (Workflow Improvement Plan)

### Etapa 2: Create Execution Plan Template
- [ ] Create `templates/template_execution_plan.md`
- [ ] Define structure (10 tasks/200 tokens limit)
- [ ] Add validation checklist
- [ ] Test with this plan

### Etapa 3-5: Create Skills
- [ ] `skills/i18n-validator/SKILL.md`
- [ ] `skills/react-component-generator/SKILL.md`
- [ ] `skills/css-theme-implementer/SKILL.md`

### Etapa 6: Create Examples
- [ ] `examples/react-component-dos-donts.md`
- [ ] `examples/i18n-dos-donts.md`
- [ ] `examples/css-dos-donts.md`

### Etapa 7: Create Templates
- [ ] `templates/template_react_component.md`
- [ ] `templates/template_react_hook.md`
- [ ] `templates/template_cypress_test.md`

---

## 📖 Documentation

- [File Organization Policy](FILE_ORGANIZATION.md) - Directory structure and rationale
- [File Location Guardrail](FILE_LOCATION_GUARDRAIL.md) - Where to place files

---

## 🔍 Index Files

Each folder has an `index.md` for inventory tracking:
- [skills/index.md](skills/index.md)
- [commands/index.md](commands/index.md)
- [examples/index.md](examples/index.md)
- [execution_plans/index.md](execution_plans/index.md)
- [templates/index.md](templates/index.md)

---

**Last Updated**: 2026-01-16
**Created By**: meta-improver Agent (Workflow Improvement - Etapa 1)
**Status**: Structure Complete, Content In Progress
