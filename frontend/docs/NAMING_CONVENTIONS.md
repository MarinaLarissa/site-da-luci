# Naming Conventions - Site da Luci

**Version**: 1.0.0
**Last Updated**: 2026-01-20
**Status**: Active

This document defines the naming conventions for styled-components and data-cy attributes in the Site da Luci project.

---

## Table of Contents

1. [Styled-Components Naming](#styled-components-naming)
2. [data-cy Attribute Naming](#data-cy-attribute-naming)
3. [Exceptions](#exceptions)
4. [Examples by Feature](#examples-by-feature)
5. [Migration Checklist](#migration-checklist)

---

## Styled-Components Naming

### General Pattern

All styled-components MUST follow this naming pattern:

```
[ComponentName][ElementDescription][ElementType]
```

**Components**:
- `ComponentName`: The React component file name (e.g., `PlayerCard`, `LootSplitCalculator`)
- `ElementDescription`: Descriptive name of the element's purpose (e.g., `Header`, `Stats`, `Button`)
- `ElementType` (optional): HTML element type if not obvious (e.g., `Container`, `Grid`, `Input`)

### ✅ CORRECT Examples

```javascript
// PlayerCard.styles.js
export const PlayerCardContainer = styled.div`
export const PlayerCardHeader = styled.div`
export const PlayerCardName = styled.h3`
export const PlayerCardStats = styled.div`
export const PlayerCardExpandButton = styled.button`

// DamageHealingCard.styles.js
export const DamageHealingCardContainer = styled.div`
export const DamageHealingCardTitle = styled.h4`
export const DamageHealingCardValue = styled.span`
export const DamageHealingCardProgressBar = styled.div`

// InputSection.styles.js
export const InputSectionContainer = styled.div`
export const InputSectionTitle = styled.h3`
export const InputSectionTextarea = styled.textarea`
export const InputSectionButtonGroup = styled.div`
export const InputSectionButton = styled.button`
```

### ❌ INCORRECT Examples

```javascript
// ❌ Too generic - which Container?
export const Container = styled.div`

// ❌ Missing component prefix
export const Title = styled.h3`
export const Textarea = styled.textarea`
export const Button = styled.button`

// ❌ Not specific enough
export const CardContainer = styled.div`  // Which card?
export const SectionContainer = styled.div`  // Which section?
```

### Why This Matters

**Before (Generic)**:
```
DevTools: <CardContainer> <CardContainer> <CardContainer>
```
You cannot identify which CardContainer is causing the issue.

**After (Specific)**:
```
DevTools: <PlayerCardContainer> <DamageHealingCardContainer> <ResultsCardContainer>
```
Immediately clear which component has the issue.

### Benefits

1. **Easier Debugging**: DevTools shows clear component names
2. **Code Navigation**: IDE search shows exact component origin
3. **Code Reviews**: Reviewers understand context without opening files
4. **Refactoring**: Clear dependencies between components
5. **Onboarding**: New developers understand structure quickly

---

## data-cy Attribute Naming

### General Pattern

All `data-cy` attributes MUST follow this naming pattern:

```
[feature]-[element-type]-[action/description]
```

**Parts**:
- `feature`: The main feature/page (kebab-case)
- `element-type`: Type of element (button, input, result, value, etc.)
- `action/description`: What the element does or represents (kebab-case)

### Feature Names

| Feature | data-cy prefix |
|---------|----------------|
| LootSplitCalculator | `loot-calculator` |
| SoloHuntAnalyzer | `solo-hunt` |
| ImbuementCalculator | `imbuement-calc` |
| HuntHistory (Drawer) | `hunt-history` |
| Sidebar | `sidebar` |
| LanguageSelector | `language` |

### Element Types

| Type | Usage |
|------|-------|
| `button` | Buttons and clickable actions |
| `input` | Text/number input fields |
| `textarea` | Textarea elements |
| `dropdown` | Select dropdowns |
| `checkbox` | Checkboxes |
| `toggle` | Toggle switches |
| `modal` | Modal dialogs |
| `drawer` | Slide-out drawers |
| `result` | Calculated result displays |
| `value` | Static value displays |
| `stat` | Statistics displays |
| `card` | Clickable cards |
| `item` | List items |
| `container` | Main container elements |

### ✅ CORRECT Examples

```javascript
// Buttons
data-cy="loot-calculator-button-calculate"
data-cy="loot-calculator-button-clear"
data-cy="solo-hunt-button-analyze"
data-cy="imbuement-calc-button-compare"
data-cy="hunt-history-button-open"
data-cy="hunt-history-button-close"

// Inputs
data-cy="solo-hunt-input-gt-price"
data-cy="solo-hunt-input-session-time"
data-cy="imbuement-calc-input-gt-price"

// Textareas
data-cy="loot-calculator-textarea-session-data"
data-cy="solo-hunt-textarea-loot-data"

// Calculated Results
data-cy="loot-calculator-result-profit"
data-cy="loot-calculator-result-total-loot"
data-cy="solo-hunt-result-balance"
data-cy="solo-hunt-result-waste"
data-cy="imbuement-calc-result-total-cost"

// Stats
data-cy="player-card-stat-damage"
data-cy="player-card-stat-healing"
data-cy="player-card-stat-loot"

// Containers
data-cy="loot-calculator-container"
data-cy="solo-hunt-results-container"
data-cy="transfer-list-container"
```

### ❌ INCORRECT Examples

```javascript
// ❌ Too generic
data-cy="button"
data-cy="input1"
data-cy="result"

// ❌ Not descriptive
data-cy="btn-calc"
data-cy="res1"

// ❌ Wrong format (not kebab-case)
data-cy="lootCalculatorButton"
data-cy="solo_hunt_input"
```

### Why This Matters

**Test Reliability**:
```javascript
// ❌ Fragile - depends on CSS classes
cy.get('.button-primary').click()

// ✅ Reliable - specific data-cy
cy.get('[data-cy="loot-calculator-button-calculate"]').click()
```

**Test Readability**:
```javascript
// ❌ Hard to understand
cy.get('[data-cy="btn1"]').should('contain', '1000')

// ✅ Self-documenting
cy.get('[data-cy="loot-calculator-result-profit"]').should('contain', '1000')
```

### Benefits

1. **E2E Test Stability**: Tests don't break when CSS changes
2. **Test Readability**: Clear what element is being tested
3. **Debug Speed**: Easy to find elements in Cypress debugger
4. **Team Communication**: Clear naming for QA and developers
5. **Regression Prevention**: Easy to write comprehensive tests

---

## Exceptions

### Shared Components (common/styled/)

Components in `frontend/src/components/common/styled/` are **reusable across the app** and MAY use generic names:

```javascript
// ✅ ALLOWED in common/styled/
export const Card = styled.div`
export const CardHeader = styled.div`
export const CardBody = styled.div`

export const ModalOverlay = styled.div`
export const ModalContent = styled.div`

export const SectionTitle = styled.h2`
export const PageTitle = styled.h1`
```

**Rationale**: These are designed to be generic and imported by name.

### Theme and Global Styles

Theme tokens and global styles do not require component prefixes:

```javascript
// theme.js
export const theme = {
  colors: { primary: '#c39bd3' },
  spacing: { sm: '8px' }
}

// GlobalStyles.js
export const GlobalStyles = createGlobalStyle`
  body { margin: 0; }
`
```

### Visual-Only Components

Components that are purely visual feedback (no interaction) MAY omit data-cy:

```javascript
// LoadingSpinner.js - visual feedback only
<SpinnerContainer>
  <Spinner /> {/* No data-cy needed */}
</SpinnerContainer>

// Tooltip.js - hover UI only
<TooltipContainer> {/* No data-cy needed */}
  <TooltipContent>Help text</TooltipContent>
</TooltipContainer>
```

---

## Examples by Feature

### LootSplitCalculator

**Styled-Components**:
```javascript
// LootSplitCalculator.styles.js
export const LootSplitCalculatorContainer = styled.div`
export const LootSplitCalculatorHeader = styled.div`
export const LootSplitCalculatorTitle = styled.h1`

// PlayerCard.styles.js
export const PlayerCardContainer = styled.div`
export const PlayerCardHeader = styled.div`
export const PlayerCardName = styled.div`
export const PlayerCardStats = styled.div`

// ResultsSection.styles.js
export const ResultsContainer = styled.div`
export const SummaryGrid = styled.div`
export const SummaryCard = styled.div`
export const SummaryLabel = styled.div`
export const SummaryValue = styled.div`
```

**data-cy**:
```javascript
// Main container
<LootSplitCalculatorContainer data-cy="loot-calculator-container">

// Input
<Textarea data-cy="loot-calculator-textarea-session-data" />

// Actions
<Button dataCy="loot-calculator-button-calculate">Calculate</Button>
<Button dataCy="loot-calculator-button-clear">Clear</Button>

// Results
<SummaryValue data-cy="loot-calculator-result-total-balance">
  {summary.totalBalanceFormatted}
</SummaryValue>
<SummaryValue data-cy="loot-calculator-result-fair-share">
  {summary.fairShareFormatted}
</SummaryValue>
<SummaryValue data-cy="loot-calculator-result-profit-per-hour">
  {summary.profitPerHourFormatted}
</SummaryValue>

// Player stats
<StatValue data-cy="player-card-stat-damage">{player.damage}</StatValue>
<StatValue data-cy="player-card-stat-healing">{player.healing}</StatValue>
<StatValue data-cy="player-card-stat-loot">{player.loot} GP</StatValue>

// Transfers
<TransferAmount data-cy="transfer-list-amount">{transfer.amount} GP</TransferAmount>
```

### SoloHuntAnalyzer

**Styled-Components**:
```javascript
// SoloHuntAnalyzer.styles.js
export const SoloHuntAnalyzerContainer = styled.div`
export const SoloHuntAnalyzerHeader = styled.div`
export const SoloHuntAnalyzerTitle = styled.h1`

// SoloHuntResults.styles.js
export const SoloHuntResultsContainer = styled.div`
export const ResultsTitle = styled.div`
export const ResultCard = styled.div`
export const InfoGrid = styled.div`
export const InfoItem = styled.div`

// ItemCostManager.styles.js
export const ItemCostManagerContainer = styled.div`
export const TokenPricesSection = styled.div`
export const TokenPriceRow = styled.div`
export const ItemsTable = styled.div`
```

**data-cy**:
```javascript
// Inputs
<Textarea data-cy="solo-hunt-textarea-session-data" />
<input data-cy="solo-hunt-input-gt-price" />

// Actions
<Button dataCy="solo-hunt-button-analyze">Analyze</Button>
<Button dataCy="solo-hunt-button-clear">Clear</Button>

// Results
<span className="value" data-cy="solo-hunt-result-character-name">{player.name}</span>
<span className="value" data-cy="solo-hunt-result-duration">{session.duration}</span>
<span className="value positive" data-cy="solo-hunt-result-loot">+{loot} GP</span>
<span className="value negative" data-cy="solo-hunt-result-supplies">-{supplies} GP</span>
<span className="value neutral" data-cy="solo-hunt-result-balance">{balance} GP</span>

// Cost breakdown
<CostValueText data-cy="solo-hunt-result-cost-gp">-{costGP} GP</CostValueText>
<CostValueText data-cy="solo-hunt-result-cost-gt">-{costGT} GP</CostValueText>
<CostValueText data-cy="solo-hunt-result-total-cost" $isTotal>-{totalCost} GP</CostValueText>

// Final highlights
<HighlightValue data-cy="solo-hunt-result-final-balance" $main>
  {finalBalance} GP
</HighlightValue>
<HighlightValue data-cy="solo-hunt-result-profit-per-hour">
  {profitPerHour} GP/h
</HighlightValue>
```

### ImbuementCalculator

**Styled-Components**:
```javascript
// ImbuementCalculator.styles.js
export const ImbuementCalculatorContainer = styled.div`
export const ImbuementCalculatorHeader = styled.div`
export const ImbuementCalculatorTitle = styled.h1`

// ImbuementBlock.styles.js
export const ImbuementBlockContainer = styled.div`
export const ImbuementBlockTitle = styled.h3`
export const ImbuementBlockDescription = styled.span`
export const ImbuementBlockPrices = styled.div`
export const ImbuementBlockCalculations = styled.div`
```

**data-cy**:
```javascript
// Input
<input data-cy="imbuement-calc-input-gt-price" />

// Actions
<Button dataCy="imbuement-calc-button-calculate">Calculate</Button>
<Button dataCy="imbuement-calc-button-compare">Compare</Button>

// Results
<CostValue data-cy="imbuement-calc-cost-basic">{cost.basic} GP</CostValue>
<CostValue data-cy="imbuement-calc-cost-intricate">{cost.intricate} GP</CostValue>
<CostValue data-cy="imbuement-calc-cost-powerful">{cost.powerful} GP</CostValue>
<CostValue data-cy="imbuement-calc-total-cost">{totalCost} GP</CostValue>
```

### HuntHistory (Drawer)

**Styled-Components**:
```javascript
// HuntHistoryDrawer.styles.js
export const DrawerOverlay = styled.div`  // ✅ Specific to drawer, not generic
export const DrawerContainer = styled.div`
export const DrawerHeader = styled.div`
export const DrawerTitle = styled.h2`
export const DrawerContent = styled.div`

// HuntHistoryItem.styles.js
export const HuntItemContainer = styled.div`
export const HuntItemHeader = styled.div`
export const HuntItemMain = styled.div`
export const HuntItemDetails = styled.div`
export const HuntItemActions = styled.div`
```

**data-cy**:
```javascript
// Drawer
<DrawerOverlay data-cy="hunt-history-drawer-overlay" onClick={onClose}>
  <DrawerContainer data-cy="hunt-history-drawer">
    <CloseButton data-cy="hunt-history-button-close">×</CloseButton>
  </DrawerContainer>
</DrawerOverlay>

// Items
<HuntItemContainer data-cy="hunt-history-item">
  <DeleteButton data-cy="hunt-history-item-button-delete">Delete</DeleteButton>
  <ExpandButton data-cy="hunt-history-item-button-expand">Expand</ExpandButton>
</HuntItemContainer>
```

### Sidebar

**Styled-Components**:
```javascript
// Sidebar.styles.js
export const SidebarContainer = styled.div`  // Or SidebarNav
export const SidebarHeader = styled.div`
export const SidebarTitle = styled.h1`
export const SidebarNav = styled.nav`
export const SidebarNavItem = styled.div`
export const SidebarNavIcon = styled.span`
export const SidebarNavLabel = styled.span`
export const SidebarFooter = styled.div`
```

**data-cy**:
```javascript
<SidebarNav>
  <SidebarNavItem data-cy="sidebar-nav-loot-calculator">
    Loot Calculator
  </SidebarNavItem>
  <SidebarNavItem data-cy="sidebar-nav-solo-hunt">
    Solo Hunt Analyzer
  </SidebarNavItem>
  <SidebarNavItem data-cy="sidebar-nav-imbuement">
    Imbuement Calculator
  </SidebarNavItem>
</SidebarNav>
```

### Common Components

**Button.js**:
```javascript
// Button.js - accepts dataCy prop
export default function Button({ children, dataCy, ...props }) {
  return (
    <StyledButton data-cy={dataCy} {...props}>
      {children}
    </StyledButton>
  );
}

// Usage
<Button dataCy="loot-calculator-button-calculate" onClick={onCalculate}>
  {t('calculate')}
</Button>
```

---

## Migration Checklist

When adding a new component, ensure:

### Styled-Components

- [ ] All styled-components have component name prefix
- [ ] No generic names (Container, Title, Header) without prefix
- [ ] Names are descriptive and unambiguous
- [ ] DevTools inspection shows clear component names
- [ ] Exceptions only for shared components in `common/styled/`

### data-cy Attributes

- [ ] All buttons have `data-cy`
- [ ] All inputs/textareas have `data-cy`
- [ ] All dropdowns/selects have `data-cy`
- [ ] All calculated results have `data-cy`
- [ ] All interactive elements have `data-cy`
- [ ] Names follow `[feature]-[type]-[description]` pattern
- [ ] Names are kebab-case (not camelCase or snake_case)

### Code Review

Before submitting a PR:

- [ ] Run `npm run lint` (passes)
- [ ] Run `npm run build` (passes)
- [ ] DevTools shows descriptive component names
- [ ] All interactive elements testable via data-cy
- [ ] No generic styled-component names in non-shared components

---

## Enforcement

### ESLint (Future)

Consider adding custom ESLint rules to enforce:
```javascript
// eslint-plugin-styled-components-naming (hypothetical)
"styled-components-naming/require-component-prefix": "error"
```

### Code Review Checklist

Reviewers should check:
1. ✅ Styled-components have component prefixes
2. ✅ Interactive elements have data-cy
3. ✅ data-cy names are descriptive
4. ✅ No generic names outside shared components

### Documentation Updates

When adding new features:
1. Update this document with new feature examples
2. Add feature name to data-cy prefix table
3. Document any new exceptions

---

## References

- **Styled-Components Docs**: https://styled-components.com/
- **Cypress Best Practices**: https://docs.cypress.io/guides/references/best-practices
- **Project PDI**: `c:\Users\NEXLAB\Documents\Projetos\site-da-luci\PDI.md`

---

**Last Review**: 2026-01-20
**Next Review**: Quarterly or when adding major features
