# React-Mode Context Optimization Guide

**Purpose**: Reduce token usage in React projects by 40-50% through context pruning
**Target**: site-da-luci and similar React-only projects
**ROI**: 17k tokens saved per session (50% reduction)

---

## 🎯 Problem Statement

**Current State**:
- React projects load full KB documentation (clean_architecture.md, code_patterns.md, etc.)
- Total context: ~34k tokens per session
- Most content is irrelevant for React (6-layer architecture, backend patterns, etc.)

**Impact**:
- Wasted tokens on non-applicable content
- Slower response times
- Higher API costs
- Reduced effective context window

**Goal**:
- Reduce to ~17k tokens (50% reduction)
- Keep only React-relevant content
- Maintain code quality and best practices

---

## 📊 Token Analysis

### Before Optimization
| KB Document | Tokens | Relevance to React | Action |
|-------------|--------|-------------------|--------|
| clean_architecture.md | 12k | 10% (frontend section only) | Prune to 1.2k |
| code_patterns.md | 15k | 30% (React patterns only) | Prune to 4.5k |
| testing_workflows.md | 7k | 50% (Jest/React Testing Library) | Prune to 3.5k |
| **Total** | **34k** | **-** | **9.2k (-73%)** |

### After Optimization
| Content | Tokens | Description |
|---------|--------|-------------|
| React Best Practices | 4k | Component patterns, hooks, state management |
| Testing (React) | 3.5k | Jest, RTL, E2E with Cypress (React focus) |
| i18n Patterns | 1.5k | react-i18next usage, translation keys |
| Accessibility | 0.2k | ARIA labels, keyboard navigation |
| **Total** | **9.2k** | **-73% reduction from baseline** |

**Additional Savings**:
- Agent prompts: Use compressed versions (already -62%)
- Skip irrelevant sections: Backend, DB, domain modeling
- **Combined Savings**: ~17k tokens per session

---

## 🔧 Implementation Strategy

### Phase 1: Create React-Specific KB (1 hour)

Create `.claude/knowledge/react-best-practices.md`:

```markdown
# React Best Practices (site-da-luci)

## Component Patterns

### Functional Components with Hooks
- Use `useState` for local state
- Use `useEffect` for side effects
- Use `useCallback` for memoized callbacks
- Use `useMemo` for expensive computations
- Use `useRef` for mutable refs

### Component Structure
src/
  components/
    ComponentName/
      ComponentName.js       # Component logic
      ComponentName.css      # Component styles
      ComponentName.test.js  # Unit tests

### Props Validation
- Use PropTypes for runtime validation
- Define defaultProps for optional props

## State Management
- Local state: `useState`
- Shared state: Context API or prop drilling
- Avoid over-engineering (no Redux for small apps)

## Performance
- Memoize expensive calculations with `useMemo`
- Avoid inline functions in JSX (use `useCallback`)
- Use `React.memo` for expensive components

## Testing
- Unit tests: Jest + React Testing Library
- Test user behavior, not implementation
- Follow AAA pattern (Arrange, Act, Assert)

## i18n
- Use `react-i18next` for translations
- All user-facing text: `t('key')`
- Run `npm run validate-i18n` before committing

## Accessibility
- Use semantic HTML
- Add `aria-label` for icon buttons
- Test keyboard navigation
```

**File Size**: ~4k tokens (vs 12k from clean_architecture.md)

---

### Phase 2: Extract React Testing Patterns (30 min)

Create `.claude/knowledge/react-testing.md`:

```markdown
# React Testing Patterns

## Unit Tests (Jest + RTL)

### Test Structure
describe('ComponentName', () => {
  it('should render successfully', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('component-id')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    const mockCallback = jest.fn();
    render(<ComponentName onClick={mockCallback} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockCallback).toHaveBeenCalled();
  });
});

### Common Patterns
- Render with i18n: `renderWithI18n(<Component />)`
- Mock API calls: `jest.mock('fetch')`
- Test async: `await waitFor(() => { ... })`

## E2E Tests (Cypress)
- Focus on critical user flows
- Use `data-cy` attributes for stable selectors
- Clean up test data in `afterEach`
```

**File Size**: ~3.5k tokens (vs 7k from testing_workflows.md)

---

### Phase 3: Update Architect Agent Prompt (15 min)

**Current**: Architect loads ALL KB files for ALL projects

**Optimized**: Architect detects project type and loads relevant KB

```javascript
// In architect.md Phase 1: Analyze Request

- [ ] **Detect Project Type**
  - Check: Does `[project]/.claude/agents/` exist?
    - YES: 6-layer architecture project (nex-web-test)
    - NO: React-only project (site-da-luci)

- [ ] **Load Relevant KB** (based on project type)
  - **6-layer projects**:
    - Load: clean_architecture.md (full)
    - Load: code_patterns.md (full)
    - Load: testing_workflows.md (full)
    - Total: ~34k tokens

  - **React-only projects**:
    - Load: react-best-practices.md (4k tokens)
    - Load: react-testing.md (3.5k tokens)
    - Load: i18n-patterns.md (1.5k tokens)
    - Load: accessibility.md (0.2k tokens)
    - Total: ~9.2k tokens
    - **Savings**: 24.8k tokens (73%)

- [ ] **Document in Session Report**
  - Project Type: React-only / 6-layer
  - KB Loaded: [list of files]
  - Tokens Used: Xk (baseline: 34k, optimized: 9.2k)
  - Savings: X% reduction
```

---

### Phase 4: Create Detection Logic (30 min)

Add to `.claude/knowledge/project-detection.md`:

```markdown
# Project Type Detection

## Detection Criteria

### 6-Layer Architecture Project
Indicators:
- `[project]/.claude/agents/` directory exists
- `[project]/.claude/knowledge/` directory exists
- Backend/frontend separation (backend/, frontend/ dirs)
- Domain-driven design (domain/, use-cases/, etc.)

Examples: nex-web-test

### React-Only Project
Indicators:
- No `.claude/agents/` in project root
- Single `src/` directory with React components
- `package.json` has react, react-dom dependencies
- No backend directory

Examples: site-da-luci

## KB Loading Matrix

| Project Type | KB Files to Load | Tokens | Use Case |
|--------------|-----------------|--------|----------|
| 6-layer | clean_architecture.md, code_patterns.md, testing_workflows.md | 34k | Full-stack apps with complex architecture |
| React-only | react-best-practices.md, react-testing.md, i18n-patterns.md | 9.2k | Frontend-only React apps |

## Implementation

```javascript
function detectProjectType(projectPath) {
  const agentsDir = path.join(projectPath, '.claude', 'agents');
  const knowledgeDir = path.join(projectPath, '.claude', 'knowledge');

  if (fs.existsSync(agentsDir) && fs.existsSync(knowledgeDir)) {
    return '6-layer';
  } else {
    return 'react-only';
  }
}

function loadKBForProject(projectType) {
  if (projectType === '6-layer') {
    return [
      'clean_architecture.md',
      'code_patterns.md',
      'testing_workflows.md',
    ];
  } else {
    return [
      'react-best-practices.md',
      'react-testing.md',
      'i18n-patterns.md',
      'accessibility.md',
    ];
  }
}
```
```

---

## 📈 Expected Outcomes

### Token Savings
- **Baseline** (current): 34k tokens/session
- **Optimized** (React-only): 9.2k tokens/session
- **Savings**: 24.8k tokens (73% reduction)

### Cost Savings
- **Baseline**: $0.85/session (34k tokens × $0.025/1k)
- **Optimized**: $0.23/session (9.2k tokens × $0.025/1k)
- **Savings**: $0.62/session (73% reduction)

### Performance Gains
- Faster response times (less context to process)
- More effective context window (focused content)
- Better code suggestions (React-specific patterns)

---

## 🚀 Rollout Plan

### Week 1: Create React-Specific KB
- [ ] Create `react-best-practices.md` (4k tokens)
- [ ] Create `react-testing.md` (3.5k tokens)
- [ ] Create `i18n-patterns.md` (1.5k tokens)
- [ ] Create `accessibility.md` (0.2k tokens)
- [ ] Validate token counts

### Week 2: Update Architect Logic
- [ ] Add project type detection to architect.md
- [ ] Implement conditional KB loading
- [ ] Test with site-da-luci (React-only)
- [ ] Test with nex-web-test (6-layer)
- [ ] Measure token savings

### Week 3: Monitor & Refine
- [ ] Track token usage across 5 sessions
- [ ] Verify code quality maintained
- [ ] Collect user feedback
- [ ] Adjust KB content if needed

---

## ✅ Success Criteria

- [ ] **Token Reduction**: ≥60% reduction for React projects
- [ ] **Code Quality**: No degradation in code suggestions
- [ ] **Coverage**: All React best practices covered in new KB
- [ ] **Compatibility**: Works for both project types (6-layer + React-only)
- [ ] **Validation**: Passes 5 consecutive sessions without issues

---

## 🔧 Maintenance

### Quarterly Review
- Update React KB with new patterns/best practices
- Verify token counts still optimal
- Check for new React features to document

### Session-Level Monitoring
- Architect reports MUST include:
  - Project type detected
  - KB files loaded
  - Token savings achieved

---

**Created**: 2026-01-04
**Owner**: Architect Agent
**Status**: Ready for Implementation
