# Cypress E2E Testing Guide - Site da Luci

## Overview
This directory contains end-to-end (E2E) tests for the Site da Luci application using Cypress.

## Directory Structure
```
cypress/
├── e2e/
│   └── loot-split/
│       └── loot-split-calculator.cy.js  # Loot Split Calculator tests
├── fixtures/
│   └── example-session.json             # Test data fixtures
├── support/
│   ├── commands.js                      # Custom Cypress commands
│   └── e2e.js                           # Global test configuration
└── README.md                            # This file
```

## Running Tests

### Prerequisites
1. Install Cypress dependency:
   ```bash
   npm install --save-dev cypress
   ```

2. Start the frontend application:
   ```bash
   npm run frontend:dev
   ```
   App should be running on `http://localhost:3000`

### Run Tests

**Interactive Mode** (Cypress UI):
```bash
npx cypress open
```

**Headless Mode** (CI/CD):
```bash
npx cypress run
```

**Run Specific Test File**:
```bash
npx cypress run --spec "cypress/e2e/loot-split/loot-split-calculator.cy.js"
```

## Test Coverage

### Loot Split Calculator
- **P0: Happy Path**: Calculate split correctly for 3 players
- **P0: Validation**: Empty input handling, button states
- **P1: Edge Cases**: Load example data, calculate after loading
- **P1: I18n**: PT-BR and EN translations
- **P1: Hunt History**: Open history drawer
- **P2: Error Handling**: Invalid session data

## Writing Tests

### Naming Conventions

**Test Files**: `[feature-name].cy.js`
- Example: `loot-split-calculator.cy.js`

**data-cy Attributes**: Use kebab-case
- Format: `[feature]-[component]-[action]`
- Examples:
  - `loot-calculator` (main container)
  - `loot-calculator-input-session` (textarea)
  - `loot-calculator-button-calculate` (button)
  - `summary-total-balance` (result card)

### Test Structure (AAA Pattern)

All tests follow the **Arrange-Act-Assert** pattern:

```javascript
it('should do something', () => {
  // Arrange: Set up test conditions
  cy.visit('/');
  cy.fixture('example-session').then((data) => {

    // Act: Perform user actions
    cy.pasteLootData(data.sessionData);
    cy.get('[data-cy="loot-calculator-button-calculate"]').click();

    // Assert: Verify expected outcomes
    cy.waitForCalculation();
    cy.get('[data-cy="loot-calculator-results"]').should('be.visible');
  });
});
```

### Custom Commands

Custom commands are defined in `cypress/support/commands.js`:

**cy.setLanguage(language)**
- Set i18n language (PT-BR or EN)
- Example: `cy.setLanguage('pt-BR')`

**cy.pasteLootData(lootData)**
- Paste session data into textarea
- Example: `cy.pasteLootData(sessionData)`

**cy.waitForCalculation()**
- Wait for calculation to complete and results to appear
- Example: `cy.waitForCalculation()`

## Fixtures

Test data is stored in `cypress/fixtures/`:

**example-session.json**: Sample TIBIA session data
- Contains session data string (3 players)
- Expected results for assertions (totalBalance, fairShare, players)

## data-cy Attributes Checklist

### Existing data-cy Attributes (Already Implemented)
✅ `loot-calculator` - Main container
✅ `loot-calculator-input-session` - Textarea
✅ `loot-calculator-button-calculate` - Calculate button
✅ `hunt-history-button-open` - Hunt history button
✅ `loot-calculator-results` - Results container
✅ `player-list` - Player list container
✅ `summary-total-balance` - Total balance card
✅ `summary-fair-share` - Fair share card
✅ `summary-profit-per-hour` - Profit/hour card
✅ `summary-duration` - Duration card
✅ `summary-active-players` - Active players card

### Missing data-cy Attributes (Recommendations)

**InputSection** (`frontend/src/components/LootSplitCalculator/InputSection.js`):
- Line 42: `dataCy="loot-calculator-button-load-example"` → Should be `data-cy` (typo fix)

**PlayerCard** (`frontend/src/components/LootSplitCalculator/PlayerCard.js`):
- Add: `data-cy="player-card-{index}"` to player cards for individual player assertions

**TransferList** (`frontend/src/components/LootSplitCalculator/TransferList.js`):
- Add: `data-cy="transfer-list"` to container
- Add: `data-cy="transfer-item-{index}"` to individual transfers
- Add: `data-cy="copy-transfers-button"` to copy button

**HuntHistoryDrawer** (`frontend/src/components/HuntHistory/HuntHistoryDrawer.js`):
- Add: `data-cy="hunt-history-drawer"` to drawer container
- Add: `data-cy="hunt-history-close-button"` to close button
- Add: `data-cy="hunt-item-{index}"` to individual hunt cards

**ErrorMessage** (`frontend/src/components/common/ErrorMessage.js`):
- Add: `data-cy="error-message"` to error display

**LoadingSpinner** (`frontend/src/components/common/LoadingSpinner.js`):
- Add: `data-cy="loading-spinner"` to loading indicator

## Best Practices

### 1. Use data-cy Attributes (NOT classes/IDs)
❌ Bad: `cy.get('.button-primary')`
✅ Good: `cy.get('[data-cy="loot-calculator-button-calculate"]')`

### 2. Follow AAA Pattern
- **Arrange**: Set up test state
- **Act**: Perform user action
- **Assert**: Verify outcome

### 3. Use Fixtures for Test Data
```javascript
cy.fixture('example-session').then((data) => {
  cy.pasteLootData(data.sessionData);
});
```

### 4. Wait for Async Operations
```javascript
cy.get('[data-cy="loot-calculator-button-calculate"]').click();
cy.waitForCalculation(); // Custom command
```

### 5. Test User Behavior (NOT Implementation Details)
Focus on what users do, not internal code logic.

### 6. Keep Tests Independent
Each test should run in isolation without dependencies on other tests.

## Troubleshooting

### Tests Fail Locally
1. Ensure frontend is running: `npm run frontend:dev`
2. Check baseUrl in `cypress.config.js` matches your local setup
3. Clear browser data: `npx cypress open` → Settings → Clear data

### Backend Connection Issues
If tests fail due to backend errors:
1. Ensure backend is running: `npm run backend:dev`
2. Check proxy configuration in `frontend/package.json`: `"proxy": "http://localhost:3001"`

### Language-Specific Assertions
Use regex for language-agnostic assertions:
```javascript
cy.contains(/carregar exemplo|load example/i).click();
```

## Adding New Tests

1. **Create test file**: `cypress/e2e/[feature]/[test-name].cy.js`
2. **Add data-cy attributes** to components being tested
3. **Create fixtures** for test data (if needed)
4. **Write tests** following AAA pattern
5. **Add custom commands** (if reusable logic exists)
6. **Update this README** with new test coverage

## CI/CD Integration

To run Cypress in CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm install

- name: Run Cypress tests
  run: npm run frontend:dev & npx cypress run --headless
```

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

---

**Last Updated**: 2026-01-21
**Maintained By**: Site da Luci Team
