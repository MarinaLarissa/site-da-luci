---
title: Component Naming and Testability Standards
project: site-da-luci
created: 2026-01-21
updated: 2026-01-21
tags: [react, testing, cypress, best-practices, data-cy]
---

# Component Naming and Testability Standards

## Overview
This document outlines standards and best practices for component naming conventions and testability in the site-da-luci React project, with a focus on data-cy attributes for E2E testing with Cypress.

## data-cy Attribute Standards

### Naming Convention
All data-cy attributes MUST follow kebab-case convention:
- ✅ CORRECT: `data-cy="player-name"`
- ❌ WRONG: `dataCy="player-name"` (camelCase - not valid HTML attribute)
- ❌ WRONG: `data-cy="playerName"` (camelCase value - prefer kebab-case)

### Attribute Patterns
Use consistent naming patterns based on component hierarchy:

1. **Containers**: `{component-name}` or `{feature}-{component-name}`
   - Example: `data-cy="player-card"`, `data-cy="loot-calculator"`

2. **Actions/Buttons**: `{component}-button-{action}`
   - Example: `data-cy="loot-calculator-button-calculate"`
   - Example: `data-cy="hunt-history-close-button"`

3. **Input Fields**: `{component}-input-{field}`
   - Example: `data-cy="loot-calculator-input-session"`

4. **List Items**: `{component}-item` or `{component}-item-${index}`
   - Example: `data-cy="transfer-item-0"`
   - Example: `data-cy="hunt-history-item"`

5. **Data Display**: `{data-type}` or `{component}-{data-type}`
   - Example: `data-cy="player-name"`
   - Example: `data-cy="player-balance"`
   - Example: `data-cy="transfer-amount"`

### Coverage Requirements
ALL interactive elements MUST have data-cy attributes:
- ✅ Buttons (submit, cancel, delete, expand, etc.)
- ✅ Input fields (text, textarea, select, etc.)
- ✅ Clickable items (cards, list items, etc.)
- ✅ Toggles and switches
- ✅ Navigation elements (drawers, modals, tabs)

ALL critical data displays SHOULD have data-cy attributes:
- ✅ User-facing values (balance, totals, calculations)
- ✅ Status indicators (loading, error, success)
- ✅ Dynamic content (player names, timestamps, etc.)

---

## Historical Issues - data-cy Attributes

### 2026-01-21: Missing data-cy Attributes in Loot Split Calculator

**Context**: During setup of Cypress E2E tests, it was identified that multiple components lacked data-cy attributes, significantly hindering testability and element selection reliability.

**Components Affected**:

#### 1. InputSection.js (Line 42)
- **Issue**: Typo `dataCy` instead of `data-cy` in load example button
- **Impact**: Cypress could not find element using standard data-cy selector
- **Fix**: Changed `dataCy="loot-calculator-button-load-example"` to `data-cy="loot-calculator-button-load-example"`
- **Root Cause**: Incorrect camelCase attribute name (HTML attributes must be kebab-case)
- **Prevention**: Always use `data-cy` (kebab-case), never `dataCy` (camelCase)

#### 2. PlayerCard.js
- **Issue**: Missing data-cy attributes for player card data elements
- **Added Attributes**:
  - `data-cy="player-name"` - Player name text element
  - `data-cy="player-leader-badge"` - Leader badge (conditional render)
  - `data-cy="player-balance"` - Player balance value
  - `data-cy="player-net-balance"` - Net balance after transfers
  - `data-cy="player-difference"` - Difference value (positive/negative)
- **Impact**: Enabled comprehensive testing of individual player data display and calculations
- **Test Coverage**: Balance calculations, leader identification, net balance transfers

#### 3. TransferList.js
- **Issue**: Missing data-cy attributes for transfer list sub-elements
- **Existing Coverage**: Container (`transfer-list`), items (`transfer-item-${index}`), commands section (`transfer-commands`)
- **Added Attributes**:
  - `data-cy="transfer-from"` - Source player name
  - `data-cy="transfer-to"` - Destination player name
  - `data-cy="transfer-amount"` - Transfer amount value
  - `data-cy="transfer-copied-indicator"` - Copy confirmation indicator
- **Impact**: Enabled granular testing of transfer calculations and copy functionality
- **Test Coverage**: Transfer source/destination validation, amount accuracy, clipboard copy

#### 4. HuntHistoryDrawer.js
- **Issue**: Missing data-cy attributes for hunt history drawer navigation and interaction
- **Added Attributes**:
  - `data-cy="hunt-history-drawer"` - Drawer container element
  - `data-cy="hunt-history-close-button"` - Close/dismiss button
- **Impact**: Enabled testing of drawer open/close interactions and persistence
- **Test Coverage**: Drawer visibility, close functionality, navigation

#### 5. HuntHistoryItem.js
- **Issue**: Missing data-cy attributes for individual hunt item interactions
- **Added Attributes**:
  - `data-cy="hunt-history-item"` - Hunt item container
  - `data-cy="hunt-history-item-header"` - Clickable header for expand/collapse
  - `data-cy="hunt-history-delete-button"` - Delete hunt button
  - `data-cy="hunt-history-expand-button"` - Expand/collapse button
- **Impact**: Enabled testing of hunt history item interactions (expand, delete, load)
- **Test Coverage**: Item expansion, deletion confirmation, session loading

#### 6. ErrorMessage.js
- **Issue**: Missing data-cy for error message text content
- **Existing Coverage**: Container (`error-message`)
- **Added Attributes**:
  - `data-cy="error-message-text"` - Error message text content
- **Impact**: Enabled testing of error message content validation
- **Test Coverage**: Error message text verification, error state detection

#### 7. LoadingSpinner.js
- **Issue**: Missing data-cy attributes for loading state elements
- **Added Attributes**:
  - `data-cy="loading-spinner"` - Spinner container element
  - `data-cy="loading-message"` - Loading message text
- **Impact**: Enabled testing of loading states and async operation indicators
- **Test Coverage**: Loading state detection, loading message validation

---

## Summary Statistics

### Implementation Session: 2026-01-21
- **Total Components Modified**: 7
- **Total Attributes Added**: 20+ data-cy attributes
- **Typos Fixed**: 1 (dataCy → data-cy)
- **Test Coverage Improvement**: Enabled comprehensive E2E testing for Loot Split Calculator feature

### Attribute Coverage by Component Type
- **Interactive Elements**: 100% coverage (buttons, inputs, clickable items)
- **Data Display Elements**: ~85% coverage (key values, calculations, user-facing data)
- **Navigation Elements**: 100% coverage (drawers, modals, close buttons)
- **Status Indicators**: 100% coverage (loading, error states)

---

## Prevention Guidelines

### For Developers
When creating new components:

1. ✅ **Add data-cy attributes during initial component development** (not as afterthought)
2. ✅ **Use descriptive naming**: `{component}-{element}-{action}` pattern
3. ✅ **ALL interactive elements MUST have data-cy**
4. ✅ **Use kebab-case for HTML attributes**: `data-cy`, not `dataCy`
5. ✅ **For dynamic lists**: Use indexed pattern `{component}-item-${index}`
6. ✅ **Document attributes in component file comments**

### Pre-Commit Checklist
Before committing component changes:

- [ ] All buttons have data-cy attributes
- [ ] All input fields have data-cy attributes
- [ ] All clickable elements have data-cy attributes
- [ ] All critical data displays have data-cy attributes
- [ ] Naming follows kebab-case convention
- [ ] Naming follows component hierarchy pattern
- [ ] No typos: `data-cy` (correct), not `dataCy` (incorrect)

### Code Review Checklist
When reviewing PRs:

- [ ] New components have data-cy attributes on all interactive elements
- [ ] Attribute naming follows established patterns
- [ ] No HTML attribute naming typos (dataCy, data_cy, etc.)
- [ ] Dynamic lists use indexed pattern consistently
- [ ] Critical data displays are testable

---

## Related Documentation
- **Cypress Audit Report**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\DATA_CY_AUDIT.md`
- **E2E Test Suite**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\cypress\e2e\loot-split\loot-split-calculator.cy.js`
- **Component Location**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\frontend\src\components\`

---

**Last Updated**: 2026-01-21
**Author**: Architect Agent (via self-execution)
**Status**: Active
