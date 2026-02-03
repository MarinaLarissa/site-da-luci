# Template: React Component with Styled-Components

---
**Last Updated**: 2026-02-03
**Purpose**: Boilerplate template for creating new React components in site-da-luci
**Standard**: styled-components + i18n + PropTypes + React.memo
**Based On**: Current project patterns (27 existing .styles.js files)

---

## 📁 Folder Structure

```
ComponentName/
├── index.js              # Main component file
└── ComponentName.styles.js  # Styled-components
```

**Why this structure?**
- ✅ Clear separation of concerns (logic vs styles)
- ✅ Easy to find styles (consistent naming)
- ✅ Supports tree-shaking (separate files)
- ✅ Follows project standard (all components use this pattern)

---

## 📄 Template: index.js

```javascript
/**
 * ComponentName component - [Brief description of what this component does]
 *
 * Features:
 * - [Key feature 1]
 * - [Key feature 2]
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ComponentNameContainer,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameBody,
  ComponentNameFooter,
} from './ComponentName.styles';

/**
 * ComponentName
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display
 * @param {ReactNode} props.children - Child elements
 * @param {Function} props.onAction - Callback when action is triggered
 * @returns {JSX.Element} Rendered component
 */
function ComponentName({ title, children, onAction }) {
  const { t } = useTranslation(); // i18n hook for translations

  // Event handlers
  const handleAction = () => {
    // Business logic here
    if (onAction) {
      onAction();
    }
  };

  return (
    <ComponentNameContainer data-cy="component-name-container">
      <ComponentNameHeader>
        <ComponentNameTitle data-cy="component-name-title">
          {title || t('componentName.defaultTitle')}
        </ComponentNameTitle>
      </ComponentNameHeader>

      <ComponentNameBody data-cy="component-name-body">
        {children}
      </ComponentNameBody>

      <ComponentNameFooter>
        <button
          onClick={handleAction}
          data-cy="component-name-action-button"
        >
          {t('componentName.actionButton')}
        </button>
      </ComponentNameFooter>
    </ComponentNameContainer>
  );
}

// PropTypes: Runtime type checking (helps catch bugs early)
ComponentName.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onAction: PropTypes.func,
};

// Default props (optional, but good for documentation)
ComponentName.defaultProps = {
  title: '',
  children: null,
  onAction: null,
};

// Export without memo if component is simple and re-renders are cheap
export default ComponentName;

// OR export with memo if component is complex or receives many props
// export default React.memo(ComponentName);
```

---

## 🎨 Template: ComponentName.styles.js

```javascript
/**
 * Styled components for ComponentName
 *
 * Naming convention: {ComponentName}{Element}
 * Example: ComponentNameContainer, ComponentNameTitle
 *
 * Why prefixed names?
 * - Easy to identify origin in DevTools
 * - Avoids naming conflicts (no generic "Container")
 * - Searchable in codebase
 */

import styled from 'styled-components';

// Main container - wraps the entire component
export const ComponentNameContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};

  /* Hover effects (optional) */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

// Header section
export const ComponentNameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

// Title - uses theme typography
export const ComponentNameTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

// Body section - main content area
export const ComponentNameBody = styled.div`
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Footer section (optional)
export const ComponentNameFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

// Example: Styled component with conditional props
export const ComponentNameStatus = styled.span`
  font-size: 14px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};

  /* $variant prop: use $ prefix to avoid passing to DOM */
  background-color: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors.status.success :
    $variant === 'error' ? theme.colors.status.error :
    theme.colors.status.info
  };

  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
```

---

## 💡 Usage Example

```javascript
import ComponentName from './components/ComponentName';

function App() {
  const handleAction = () => {
    console.log('Action triggered!');
  };

  return (
    <ComponentName
      title="My Custom Title"
      onAction={handleAction}
    >
      <p>This is the content inside the component</p>
    </ComponentName>
  );
}
```

---

## 🎯 Real-World Example: MiniCalculator

### MiniCalculator/index.js
```javascript
/**
 * MiniCalculator component - Simple calculator for quick calculations
 *
 * Features:
 * - Addition and subtraction
 * - Displays result with formatting
 * - Resets on clear button
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils/formatters';
import {
  MiniCalculatorContainer,
  MiniCalculatorDisplay,
  MiniCalculatorResult,
  MiniCalculatorButtons,
  MiniCalculatorButton,
  MiniCalculatorClearButton,
} from './MiniCalculator.styles';

function MiniCalculator({ initialValue, onResultChange }) {
  const { t } = useTranslation();
  const [result, setResult] = useState(initialValue || 0);

  const handleAdd = (value) => {
    const newResult = result + value;
    setResult(newResult);
    if (onResultChange) {
      onResultChange(newResult);
    }
  };

  const handleSubtract = (value) => {
    const newResult = result - value;
    setResult(newResult);
    if (onResultChange) {
      onResultChange(newResult);
    }
  };

  const handleClear = () => {
    setResult(0);
    if (onResultChange) {
      onResultChange(0);
    }
  };

  return (
    <MiniCalculatorContainer data-cy="mini-calculator">
      <MiniCalculatorDisplay>
        <MiniCalculatorResult data-cy="mini-calculator-result">
          {formatNumber(result)}
        </MiniCalculatorResult>
      </MiniCalculatorDisplay>

      <MiniCalculatorButtons>
        <MiniCalculatorButton
          onClick={() => handleAdd(10)}
          data-cy="mini-calculator-add-10"
        >
          {t('calculator.add')} 10
        </MiniCalculatorButton>

        <MiniCalculatorButton
          onClick={() => handleSubtract(10)}
          data-cy="mini-calculator-subtract-10"
        >
          {t('calculator.subtract')} 10
        </MiniCalculatorButton>

        <MiniCalculatorClearButton
          onClick={handleClear}
          data-cy="mini-calculator-clear"
        >
          {t('calculator.clear')}
        </MiniCalculatorClearButton>
      </MiniCalculatorButtons>
    </MiniCalculatorContainer>
  );
}

MiniCalculator.propTypes = {
  initialValue: PropTypes.number,
  onResultChange: PropTypes.func,
};

MiniCalculator.defaultProps = {
  initialValue: 0,
  onResultChange: null,
};

export default React.memo(MiniCalculator);
```

### MiniCalculator.styles.js
```javascript
/**
 * Styled components for MiniCalculator
 */

import styled from 'styled-components';

export const MiniCalculatorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 2px solid ${({ theme }) => theme.colors.accent.goldLight};
  max-width: 300px;
`;

export const MiniCalculatorDisplay = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.input};
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 16px;
  text-align: right;
`;

export const MiniCalculatorResult = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.accent.gold};
  font-family: 'Courier New', monospace;
`;

export const MiniCalculatorButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MiniCalculatorButton = styled.button`
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.accent.gold};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.goldDark};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const MiniCalculatorClearButton = styled(MiniCalculatorButton)`
  background-color: ${({ theme }) => theme.colors.status.error};

  &:hover {
    background-color: ${({ theme }) => theme.colors.status.errorDark};
  }
`;
```

---

## ✅ Checklist for New Components

Before creating a new component, check:

- [ ] **Naming**: PascalCase (e.g., `UserProfile`, not `userProfile`)
- [ ] **Folder**: Component-specific folder (`ComponentName/`)
- [ ] **Files**: `index.js` + `ComponentName.styles.js`
- [ ] **Imports**: styled-components, PropTypes, useTranslation (if needed)
- [ ] **PropTypes**: All props have type checking
- [ ] **data-cy**: Add data-cy attributes for testing (especially on interactive elements and calculated values)
- [ ] **i18n**: Use `t('key')` for all user-facing text (no hardcoded strings)
- [ ] **Theme**: Use theme variables (colors, spacing, typography) - never hardcode
- [ ] **Memo**: Use `React.memo()` if component is complex or receives many props
- [ ] **Comments**: Explain WHY, not WHAT (code explains what, comments explain why)

---

## 🚫 Common Pitfalls to Avoid

1. **Generic Styled Component Names**
   ```javascript
   // ❌ BAD
   export const Container = styled.div`...`;
   export const Title = styled.h2`...`;

   // ✅ GOOD
   export const UserProfileContainer = styled.div`...`;
   export const UserProfileTitle = styled.h2`...`;
   ```

2. **Hardcoded Text**
   ```javascript
   // ❌ BAD
   <button>Click Me</button>

   // ✅ GOOD
   <button>{t('componentName.buttonLabel')}</button>
   ```

3. **Inline Styles**
   ```javascript
   // ❌ BAD
   <div style={{ color: '#FFD700', padding: '16px' }}>...</div>

   // ✅ GOOD
   <ComponentNameHighlight>...</ComponentNameHighlight>
   // with styled-component using theme
   ```

4. **Missing data-cy Attributes**
   ```javascript
   // ❌ BAD
   <div>{calculatedValue}</div>

   // ✅ GOOD
   <div data-cy="component-name-calculated-value">{calculatedValue}</div>
   ```

5. **Prop Drilling (3+ levels deep)**
   ```javascript
   // ❌ BAD
   <GrandParent prop={value}>
     <Parent prop={value}>
       <Child prop={value} />  // prop drilled through 3 levels

   // ✅ GOOD
   // Use Context API or state management for deeply nested props
   ```

---

## 📚 See Also

- **React Patterns**: `.claude/knowledge/react_patterns.md`
- **data-cy Naming**: `.claude/knowledge/data-cy-naming-conventions.md`
- **Existing Components**: `frontend/src/components/` (27 examples)
- **Theme Variables**: `frontend/src/styles/theme.js`

---

## 🔄 Updates

| Date | Change | Reason |
|------|--------|--------|
| 2026-02-03 | Template created | Plano MINI (EP-001-R2) - Etapa 1 |

---

**Encoding**: UTF-8 | **Line Endings**: LF
