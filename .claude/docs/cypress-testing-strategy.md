# Cypress Testing Strategy - site-da-luci

## 🎯 Objectives

- **Simple & Direct**: MUCH simpler than nex-web-test
- **General Flows**: Focus on main user journeys, not edge cases
- **Minimal data-cy**: Only on critical interaction points
- **AAA Pattern**: All tests follow Arrange-Act-Assert
- **English Only**: All test names, data-cy, comments in English
- **Avoid Complexity**: Keep it simple, add complexity only when truly needed

---

## 📊 Test Scope

### ✅ In Scope (Main Flows)
1. **Loot Split Calculator**
   - Input session data → Calculate → View results
   - Transfer list display

2. **Solo Hunt Analyzer**
   - Parse session → Add custom items → Calculate final balance
   - Ring Bis / Imbuements flow
   - View adjusted results

3. **Language Toggle**
   - Switch PT-BR ↔ EN
   - Verify translations

4. **Hunt History**
   - Save hunt → View history → Delete hunt

### ❌ Out of Scope (Too Specific)
- Token price validation edge cases
- Detailed error message testing
- Configuration save/load (low priority)
- Responsive design (visual testing)
- Individual tooltip texts

---

## 🏗️ Project Structure

```
site-da-luci/
├── cypress/
│   ├── e2e/
│   │   ├── loot-split-calculator.cy.js
│   │   ├── solo-hunt-analyzer.cy.js
│   │   └── language-toggle.cy.js
│   ├── fixtures/
│   │   ├── session-data.json           # Sample Tibia session data
│   │   └── solo-hunt-session.json
│   ├── support/
│   │   ├── commands.js                 # Custom commands (minimal)
│   │   └── e2e.js
│   └── cypress.config.js
└── frontend/
    └── src/
        └── components/                 # Add data-cy here
```

---

## 🎨 data-cy Naming Convention

**Pattern**: `{component}-{element}-{action?}`

**Examples**:
- `loot-calculator-input-session` (where user pastes session data)
- `loot-calculator-button-calculate` (calculate button)
- `solo-hunt-button-add-ringbis` (add Ring Bis button)
- `solo-hunt-input-gt-price` (Gold Token price input)
- `hunt-history-button-open` (open history drawer)
- `language-toggle-button` (language switcher)

**Rules**:
- ✅ Kebab-case always
- ✅ Descriptive but concise
- ✅ Component prefix for context
- ❌ Don't add to every element, only critical ones

---

## 🧪 Test Structure (AAA Pattern)

```javascript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // ARRANGE: Setup initial state
    cy.visit('/');
    cy.get('[data-cy="input-field"]').clear();

    // ACT: Perform action
    cy.get('[data-cy="input-field"]').type('test data');
    cy.get('[data-cy="button-submit"]').click();

    // ASSERT: Verify outcome
    cy.get('[data-cy="result-display"]')
      .should('be.visible')
      .and('contain', 'Expected Result');
  });
});
```

**No excessive comments** - test name should be self-explanatory.

---

## 📝 Example: Loot Split Calculator Test

```javascript
describe('Loot Split Calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should calculate loot split from session data', () => {
    // ARRANGE
    cy.fixture('session-data.json').then((sessionData) => {
      // ACT
      cy.get('[data-cy="loot-calculator-input-session"]')
        .type(sessionData.validSession, { delay: 0 });

      cy.get('[data-cy="loot-calculator-button-calculate"]').click();

      // ASSERT
      cy.get('[data-cy="loot-calculator-results"]').should('be.visible');
      cy.get('[data-cy="transfer-list"]').should('exist');
      cy.contains('Player A').should('be.visible');
    });
  });
});
```

---

## 📦 Fixtures

### session-data.json
```json
{
  "validSession": "Session data: 01-Jan-2026 15:00 CET\nSession: 2:30h\n\nPlayer A\n\tLoot: 1,245,000\n\tSupplies: 187,500\n\tBalance: 1,057,500\n\nPlayer B\n\tLoot: 980,000\n\tSupplies: 150,000\n\tBalance: 830,000"
}
```

### solo-hunt-session.json
```json
{
  "validSoloSession": "Session data: 01-Jan-2026 15:00 CET\nSession: 3:32h\n\nMarina\n\tLoot: 1,245,000\n\tSupplies: 187,500\n\tBalance: 1,057,500\n\tDamage: 2,450,000\n\tHealing: 345,000"
}
```

---

## 🔧 Custom Commands (Minimal)

Only add if truly reused across multiple tests.

```javascript
// cypress/support/commands.js

// Example: Fill session data (if used in 3+ tests)
Cypress.Commands.add('fillSessionData', (sessionData) => {
  cy.get('[data-cy="loot-calculator-input-session"]')
    .clear()
    .type(sessionData, { delay: 0 });
});

// Example: Add Ring Bis (if used in 3+ tests)
Cypress.Commands.add('addRingBis', () => {
  cy.get('[data-cy="solo-hunt-button-add-ringbis"]').click();
});
```

**Rule**: Only create custom commands if used in **3 or more tests**.

---

## 🎯 data-cy Placement Guide

### Priority 1 (MUST HAVE):
- Main input fields (session data textarea)
- Primary action buttons (Calculate, Parse, Add Item)
- Results containers (to verify calculations)
- Navigation elements (language toggle, history button)

### Priority 2 (NICE TO HAVE):
- Modal action buttons (Add Imbuement, Save Configuration)
- Form inputs inside modals (GT price, ST price)
- History drawer elements

### Priority 3 (OPTIONAL):
- Individual list items (only if testing specific item removal)
- Tooltip triggers (only if testing tooltip content)

---

## 📈 Testing Philosophy

**KISS Principle** (Keep It Simple, Stupid):
1. Start with happy path only
2. Add edge cases **only if bugs happen** in production
3. Don't test framework behavior (React, i18next)
4. Don't test CSS/styling (unless critical UX)
5. Focus on **user value**, not code coverage

**Progressive Enhancement**:
- Phase 1: Main flows working (Loot Split, Solo Hunt)
- Phase 2: Add language toggle + history
- Phase 3: Add more scenarios **only if needed**

---

## 🚀 Getting Started

### 1. Install Cypress
```bash
cd frontend
npm install --save-dev cypress
```

### 2. Add Scripts to package.json
```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:test": "start-server-and-test start http://localhost:3000 cy:run"
  }
}
```

### 3. Initialize Cypress
```bash
npx cypress open
```

### 4. Add data-cy to Components
Follow Priority 1 list above.

### 5. Write First Test
Start with `loot-split-calculator.cy.js`.

---

## ✅ Quality Gates

**Before Merging Tests**:
- [ ] Tests follow AAA pattern
- [ ] No hardcoded waits (`cy.wait(5000)`) - use assertions instead
- [ ] data-cy used (not classes or IDs)
- [ ] Test names are descriptive in English
- [ ] No excessive comments (self-explanatory code)

**CI Integration** (Later):
```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on: [pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          working-directory: ./frontend
          start: npm start
          wait-on: 'http://localhost:3000'
```

---

## 📚 Reference

**Cypress Best Practices**: https://docs.cypress.io/guides/references/best-practices
**AAA Pattern**: Arrange-Act-Assert (standard testing pattern)
**nex-web-test Comparison**: site-da-luci tests are **80% simpler** - focus on main flows only

---

**Document Version**: 1.0
**Last Updated**: 2026-01-01
**Complexity Level**: ⭐ SIMPLE (vs nex-web-test ⭐⭐⭐⭐⭐ COMPLEX)
