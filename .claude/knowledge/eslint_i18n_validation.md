# ESLint Configuration for i18n Validation

## Overview
This document describes the ESLint rules configured to prevent hardcoded strings in JSX, which helps avoid missing translation key errors.

## Problem Statement
**Recurring Issue**: Translation key errors occur when developers:
1. Hardcode strings in JSX (e.g., `<button>Histórico</button>`)
2. Use incorrect or non-existent translation keys
3. Display literal translation keys in the UI when keys are missing

**Example Error**:
```
soloHuntAnalyzer.itemCostManager.costSummary.totalCost
```
This literal string appeared in the UI because the translation key didn't exist.

## Solution: ESLint Rule `react/jsx-no-literals`

### Configuration
File: `.eslintrc.json`

```json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "react/jsx-no-literals": [
      "warn",
      {
        "noStrings": true,
        "ignoreProps": true,
        "noAttributeStrings": false
      }
    ]
  },
  "overrides": [
    {
      "files": ["**/*.test.js", "**/*.test.jsx"],
      "rules": {
        "react/jsx-no-literals": "off"
      }
    }
  ]
}
```

### Rule Options Explained

- **`"warn"`**: Shows warning instead of error (allows builds to continue)
- **`noStrings: true`**: Detects any string literals in JSX children
- **`ignoreProps: true`**: Allows strings in props (e.g., `className="btn"`)
- **`noAttributeStrings: false`**: Doesn't check attribute values

### What This Rule Detects

#### ❌ WRONG: Hardcoded strings (triggers warning)
```javascript
function Button() {
  return <button>Histórico</button>; // WARNING!
}

function Header() {
  return <h1>Welcome to the App</h1>; // WARNING!
}

function Message() {
  return <p>{"Loading..."}</p>; // WARNING!
}
```

#### ✅ CORRECT: Using translation function
```javascript
import { useTranslation } from 'react-i18next';

function Button() {
  const { t } = useTranslation();
  return <button>{t('huntHistory.title')}</button>; // OK
}

function Header() {
  const { t } = useTranslation();
  return <h1>{t('app.welcome')}</h1>; // OK
}

function Message() {
  const { t } = useTranslation();
  return <p>{t('common.loading')}</p>; // OK
}
```

### Exceptions (allowed by configuration)

#### Allowed: Strings in props
```javascript
// These are OK because ignoreProps: true
<div className="container">
<input type="text" placeholder="Enter name" />
<button aria-label="Close">×</button>
```

#### Allowed: Test files
```javascript
// Tests are excluded via overrides
it('renders the button', () => {
  expect(screen.getByText('Click me')).toBeInTheDocument(); // OK in tests
});
```

## Integration with Development Workflow

### 1. During Development
Developers see warnings immediately in their IDE and terminal:

```
Warning: Missing literal string 'Histórico'
  > 77 | <span className="btn-text">Histórico</span>
```

### 2. Before Commit
Run ESLint as part of pre-commit hooks:

```bash
npm run lint
```

### 3. CI/CD Pipeline
Add linting step to CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run ESLint
  run: npm run lint
```

## Fixing Violations

### Step 1: Identify hardcoded strings
Run ESLint to see all violations:
```bash
npx eslint src/ --ext .js,.jsx
```

### Step 2: Create translation keys
Add missing keys to both translation files:

**pt-BR/translation.json**:
```json
{
  "huntHistory": {
    "title": "Histórico"
  }
}
```

**en/translation.json**:
```json
{
  "huntHistory": {
    "title": "History"
  }
}
```

### Step 3: Replace hardcoded strings
```javascript
// Before
<span className="btn-text">Histórico</span>

// After
const { t } = useTranslation();
<span className="btn-text">{t('huntHistory.title')}</span>
```

## Validating Translation Keys Exist

### Recommended: Translation Key Validation Script

Create a script to validate all translation keys used in code actually exist:

```javascript
// scripts/validate-i18n.js
const fs = require('fs');
const glob = require('glob');

// Load translation files
const ptBR = require('../src/locales/pt-BR/translation.json');
const en = require('../src/locales/en/translation.json');

// Find all t() calls in code
const files = glob.sync('src/**/*.{js,jsx}');
const keyPattern = /t\(['"`]([^'"`]+)['"`]\)/g;

const usedKeys = new Set();
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = keyPattern.exec(content)) !== null) {
    usedKeys.add(match[1]);
  }
});

// Check if keys exist
const errors = [];
usedKeys.forEach(key => {
  if (!getNestedKey(ptBR, key)) {
    errors.push(`Missing in pt-BR: ${key}`);
  }
  if (!getNestedKey(en, key)) {
    errors.push(`Missing in en: ${key}`);
  }
});

if (errors.length > 0) {
  console.error('Translation validation failed:');
  errors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

function getNestedKey(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
```

Add to package.json:
```json
{
  "scripts": {
    "validate-i18n": "node scripts/validate-i18n.js"
  }
}
```

## Benefits

1. **Early Detection**: Catches hardcoded strings during development
2. **Prevents Regression**: Stops new hardcoded strings from being added
3. **Consistent i18n**: Enforces using translation system throughout app
4. **Better UX**: Users never see literal translation keys in the UI

## Related Issues

- **Issue**: HuntHistory.js showing `soloHuntAnalyzer.itemCostManager.costSummary.totalCost`
- **Root Cause**: Translation key didn't exist in translation files
- **Prevention**: This ESLint rule would have warned about any hardcoded strings, prompting earlier detection

## Maintenance

### Adding New Translations
1. Add key to both pt-BR and en translation files
2. Use `t()` function to reference the key
3. ESLint ensures no hardcoded strings slip through

### Updating Existing Translations
1. Update translation values in JSON files
2. No code changes needed
3. ESLint validates usage remains consistent

---

**Last Updated**: 2025-12-31
**Related Files**:
- [.eslintrc.json](../../frontend/.eslintrc.json)
- [pt-BR/translation.json](../../frontend/src/locales/pt-BR/translation.json)
- [en/translation.json](../../frontend/src/locales/en/translation.json)
