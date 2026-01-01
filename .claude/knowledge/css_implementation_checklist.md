# CSS Implementation Checklist

## Purpose
This checklist ensures CSS consistency across components by requiring developers to review reference implementations before writing new styles.

## The Problem
**Recurring Pattern**: When implementing new components or updating existing ones, developers sometimes:
1. Create new CSS without checking existing patterns
2. Use inconsistent color values across similar components
3. Duplicate CSS patterns instead of reusing existing styles
4. Break visual consistency across the application

**Real Example**:
- LootSplitCalculator's HuntHistoryDrawer used light theme colors
- SoloHuntAnalyzer's HuntHistory used dark theme colors
- Both components serve the same purpose but looked completely different
- Required manual reconciliation to standardize colors

## Solution: Reference Component CSS Workflow

### Before Writing Any CSS

Use this checklist EVERY time you need to implement or modify CSS:

#### ✅ Step 1: Identify Reference Component
Ask yourself: "Is there a similar component in the codebase?"

Examples:
- Adding a drawer? → Check existing drawer implementations
- Creating a modal? → Check existing modal CSS
- Building a card? → Check existing card components
- Styling a form? → Check existing form components

#### ✅ Step 2: Read Reference Component CSS
**MANDATORY**: Read the complete CSS file of the reference component.

**Tools to use:**
```bash
# Find similar components
find src/components -name "*.css" | grep -i "drawer"
find src/components -name "*.css" | grep -i "modal"

# Read the reference CSS
cat src/components/SoloHuntAnalyzer/HuntHistory.css
```

**What to look for:**
- Color scheme (backgrounds, text, borders)
- Spacing patterns (padding, margin, gap)
- Typography (font sizes, weights, line heights)
- Animation/transition patterns
- Responsive breakpoints
- Layout structure (flexbox/grid patterns)

#### ✅ Step 3: Document Reference Components
In your implementation plan, explicitly list reference components:

```markdown
## Reference Components
- Primary: src/components/SoloHuntAnalyzer/HuntHistory.css
- Secondary: src/components/LootSplitCalculator/LootSplitCalculator.css
- Colors: src/utils.css (color variables)
```

#### ✅ Step 4: Extract Design Tokens
Before writing CSS, list the design tokens from reference:

```css
/* From HuntHistory.css - Dark Theme Pattern */
--background-primary: #0f1620
--background-secondary: #16213e
--accent-color: #c39bd3
--text-primary: #E0E0E0
--text-secondary: #9E9E9E
--border-color: rgba(195, 155, 211, 0.2)
--spacing-sm: 12px
--spacing-md: 16px
--spacing-lg: 24px
```

#### ✅ Step 5: Implement Using Reference Patterns
Copy patterns from reference, then adapt:

```css
/* Reference Pattern from HuntHistory.css */
.hunt-history-panel {
  background-color: #0f1620;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
}

/* Your Implementation - SAME PATTERN */
.my-new-drawer {
  background-color: #0f1620; /* ✅ Same background */
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5); /* ✅ Same shadow */
  animation: slideIn 0.3s ease; /* ✅ Same animation */
}
```

#### ✅ Step 6: Cross-Reference Color Usage
Use this table from reference components:

| Element | Color | Usage |
|---------|-------|-------|
| Main Background | `#0f1620` | Drawer/panel background |
| Header Background | `#16213e` | Header sections |
| Accent | `#c39bd3` | Titles, highlights, borders |
| Primary Text | `#E0E0E0` | Main content text |
| Secondary Text | `#9E9E9E` | Labels, metadata |
| Border | `rgba(195, 155, 211, 0.2)` | Dividers, card borders |

#### ✅ Step 7: Validate Before Committing
Before committing CSS changes, run this validation:

**Visual Check:**
- [ ] Colors match reference component
- [ ] Spacing is consistent with reference
- [ ] Animations match reference timing
- [ ] Responsive behavior mirrors reference

**Code Check:**
- [ ] Read reference CSS file
- [ ] Used same color values (not "similar" - EXACT)
- [ ] Used same spacing patterns
- [ ] Used same class naming conventions

## Common CSS Patterns in This Project

### Dark Theme Colors (Standard)
```css
/* Primary Background */
background: #0f1620;

/* Secondary Background (headers, cards) */
background: #16213e;

/* Accent Purple */
color: #c39bd3;
border-color: #c39bd3;

/* Text Colors */
color: #E0E0E0; /* Primary text */
color: #9E9E9E; /* Secondary text */

/* Borders */
border: 1px solid rgba(195, 155, 211, 0.2);

/* Shadows */
box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
```

### Spacing Scale
```css
/* Use these consistent spacing values */
gap: 12px; /* Small gaps between elements */
gap: 16px; /* Medium gaps */
gap: 24px; /* Large gaps */

padding: 16px 24px; /* Standard padding */
padding: 20px 24px; /* Header padding */
```

### Animation Patterns
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 0.3s ease;

/* Slide In (from right) */
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
animation: slideIn 0.3s ease;

/* Hover Transitions */
transition: color 0.3s ease, transform 0.2s ease;
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  .panel { width: 100%; }
  .grid { grid-template-columns: 1fr; }
}
```

## Utility Classes

### When to Use Utility Classes
The project has utility classes in `src/utils.css`:

**Use utilities for:**
- Spacing (margins, padding)
- Display (flex, grid)
- Text alignment
- Common layout patterns

**Example:**
```javascript
<div className="d-flex justify-between align-center gap-12">
  <span className="text-bold">Label</span>
  <span className="text-secondary">Value</span>
</div>
```

### When to Write Custom CSS
Write custom CSS for:
- Component-specific styles
- Complex layouts
- Themed backgrounds/colors
- Animations

## Anti-Patterns to Avoid

### ❌ DON'T: Guess color values
```css
/* WRONG - slightly different purple */
color: #c49bd4;

/* CORRECT - exact color from reference */
color: #c39bd3;
```

### ❌ DON'T: Create new spacing values
```css
/* WRONG - random spacing */
padding: 18px 22px;

/* CORRECT - standard spacing */
padding: 16px 24px;
```

### ❌ DON'T: Skip reading reference CSS
```
Developer: "I'll just eyeball the colors"
Result: Inconsistent UI, rework required
```

### ✅ DO: Follow the checklist
```
Developer: "Let me read HuntHistory.css first"
Result: Consistent implementation on first try
```

## Quick Reference Guide

### Finding Reference Components

| What You're Building | Reference Component | CSS File |
|---------------------|-------------------|----------|
| Side drawer/panel | HuntHistory | `SoloHuntAnalyzer/HuntHistory.css` |
| Modal/overlay | ItemCostManager | `SoloHuntAnalyzer/ItemCostManager.css` |
| Results display | SoloHuntResults | `SoloHuntAnalyzer/SoloHuntResults.css` |
| Form inputs | LootSplitCalculator | `LootSplitCalculator/LootSplitCalculator.css` |
| Cards | HuntHistory | `SoloHuntAnalyzer/HuntHistory.css` (hunt-card) |

### Design Token Reference

```css
/* Copy this template when starting new CSS */
:root {
  /* Backgrounds */
  --bg-primary: #0f1620;
  --bg-secondary: #16213e;

  /* Colors */
  --accent: #c39bd3;
  --success: #4CAF50;
  --danger: #f44336;
  --warning: #ff9800;

  /* Text */
  --text-primary: #E0E0E0;
  --text-secondary: #9E9E9E;

  /* Spacing */
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Borders */
  --border-color: rgba(195, 155, 211, 0.2);
  --border-radius: 8px;
}
```

## Enforcement

### Code Review Checklist
Reviewers should verify:
- [ ] Developer referenced similar component CSS
- [ ] Colors match existing theme exactly
- [ ] Spacing follows established patterns
- [ ] No duplicate CSS patterns
- [ ] Utility classes used where appropriate

### Architecture Agent Validation
When calling the architect agent for CSS work:

**Required information in request:**
```
Reference components reviewed:
- [Component name and file path]

Design tokens used:
- Background: #0f1620
- Accent: #c39bd3
- etc.

Justification for any new CSS patterns:
- [If deviating from reference, explain why]
```

## Benefits

1. **Consistency**: All similar components look and feel the same
2. **Speed**: Less time deciding on colors/spacing
3. **Quality**: Fewer iterations and rework
4. **Maintainability**: Easier to update theme globally
5. **Onboarding**: New developers understand patterns quickly

## Related Documents

- [React Patterns](./react_patterns.md) - Component implementation patterns
- [ESLint i18n Validation](./eslint_i18n_validation.md) - Translation validation
- [utils.css](../../frontend/src/utils.css) - Utility classes

---

**Last Updated**: 2025-12-31
**Status**: Active guideline for all CSS implementation
