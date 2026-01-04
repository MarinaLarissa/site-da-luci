# i18n Best Practices & Translation Gap Prevention

## Purpose
This document provides guidelines and strategies to prevent translation gaps in React components, ensuring all user-facing text is properly internationalized.

## Incident Report - 2025-12-31
**Issue**: SessionDataInput component had 11+ hardcoded Portuguese strings that weren't translated.
**Root Cause**: Direct implementation without i18n checklist verification.
**Impact**: English-speaking users would see Portuguese text, breaking internationalization.
**Resolution**: All strings moved to translation.json files with proper i18n keys.

---

## 🔍 Detection Strategy

### Pattern 1: Hardcoded JSX Text
```jsx
// ❌ BAD - Hardcoded string
<h2>Dados da Sessão</h2>

// ✅ GOOD - Translated
<h2>{t('soloHuntAnalyzer.sessionInput.title')}</h2>
```

### Pattern 2: Hardcoded Placeholders
```jsx
// ❌ BAD
<input placeholder="Cole aqui os dados..." />

// ✅ GOOD
<input placeholder={t('soloHuntAnalyzer.sessionInput.placeholder')} />
```

### Pattern 3: Hardcoded Button Labels
```jsx
// ❌ BAD
<button>Processar Dados</button>

// ✅ GOOD
<button>{t('soloHuntAnalyzer.sessionInput.parseButton')}</button>
```

### Pattern 4: Hardcoded Titles/Tooltips
```jsx
// ❌ BAD
<div title="Clique para expandir">

// ✅ GOOD
<div title={t('common.clickToExpand')}>
```

---

## ✅ Code Review Checklist

Before merging any PR that adds/modifies React components:

- [ ] **Import Check**: Component imports `useTranslation` from 'react-i18next'
- [ ] **Hook Usage**: Component declares `const { t } = useTranslation()`
- [ ] **JSX Text**: No hardcoded Portuguese/English strings in JSX
- [ ] **Attributes**: All `placeholder`, `title`, `aria-label` use `t()`
- [ ] **Translation Files**: Both `pt-BR/translation.json` and `en/translation.json` updated
- [ ] **Key Structure**: Translation keys follow project naming convention
- [ ] **Build Test**: Run `npm run build` to verify no i18n errors

---

## 📝 Translation Key Naming Convention

Follow this hierarchical structure:

```
{component}.{section}.{subsection?}.{element}
```

### Examples:
```json
{
  "soloHuntAnalyzer": {
    "sessionInput": {
      "title": "Dados da Sessão",
      "parseButton": "Processar Dados",
      "parsedSessionInfo": {
        "player": "Jogador:",
        "duration": "Duração:"
      }
    }
  }
}
```

### Rules:
1. Use **camelCase** for keys (not snake_case or kebab-case)
2. Group related strings under common parent
3. Keep hierarchy max 4 levels deep
4. Use descriptive names (not generic like "text1", "label2")

---

## 🛠️ Automated Detection Script

Create this script as `scripts/detect-hardcoded-strings.sh`:

```bash
#!/bin/bash

echo "🔍 Scanning for potential hardcoded strings in React components..."

# Patterns that might indicate hardcoded strings (adjust as needed)
PATTERNS=(
  "Dados da"
  "Cole aqui"
  "Processar"
  "Carregar"
  "Adicionar"
  "Excluir"
  "Confirmar"
  "Cancelar"
)

FOUND_ISSUES=0

for pattern in "${PATTERNS[@]}"; do
  MATCHES=$(grep -rn --include="*.js" --include="*.jsx" --exclude-dir=node_modules \
    "$pattern" site-da-luci/frontend/src/components 2>/dev/null)

  if [ -n "$MATCHES" ]; then
    echo "⚠️  Found potential hardcoded string: '$pattern'"
    echo "$MATCHES"
    echo ""
    FOUND_ISSUES=1
  fi
done

if [ $FOUND_ISSUES -eq 0 ]; then
  echo "✅ No obvious hardcoded strings detected!"
else
  echo "❌ Found potential hardcoded strings. Please review and translate."
  exit 1
fi
```

**Usage**:
```bash
chmod +x scripts/detect-hardcoded-strings.sh
./scripts/detect-hardcoded-strings.sh
```

---

## 📋 Component Template

Use this template when creating new components:

```jsx
/**
 * ComponentName
 * Description of what this component does
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ComponentName.css';

export default function ComponentName({ prop1, prop2 }) {
  const { t } = useTranslation();

  return (
    <div className="component-name">
      <h2>{t('componentName.title')}</h2>
      <p>{t('componentName.description')}</p>

      <button onClick={handleAction}>
        {t('componentName.actionButton')}
      </button>
    </div>
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func.isRequired,
};
```

**Remember to add corresponding keys in both translation files!**

---

## 🚨 Pre-Commit Hook (Optional)

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# Run i18n check before commit
./scripts/detect-hardcoded-strings.sh

if [ $? -ne 0 ]; then
  echo "❌ Commit blocked: Fix hardcoded strings before committing."
  exit 1
fi

echo "✅ i18n check passed!"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

## 📊 Translation Coverage Report

Create `scripts/translation-coverage.js`:

```javascript
const fs = require('fs');
const path = require('path');

const ptBR = require('../site-da-luci/frontend/src/locales/pt-BR/translation.json');
const en = require('../site-da-luci/frontend/src/locales/en/translation.json');

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (let key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(flattenKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const ptKeys = new Set(flattenKeys(ptBR));
const enKeys = new Set(flattenKeys(en));

console.log('📊 Translation Coverage Report\n');
console.log(`pt-BR keys: ${ptKeys.size}`);
console.log(`en keys: ${enKeys.size}\n`);

// Find missing keys
const missingInEn = [...ptKeys].filter(k => !enKeys.has(k));
const missingInPt = [...enKeys].filter(k => !ptKeys.has(k));

if (missingInEn.length > 0) {
  console.log('❌ Keys in pt-BR but missing in en:');
  missingInEn.forEach(k => console.log(`  - ${k}`));
  console.log('');
}

if (missingInPt.length > 0) {
  console.log('❌ Keys in en but missing in pt-BR:');
  missingInPt.forEach(k => console.log(`  - ${k}`));
  console.log('');
}

if (missingInEn.length === 0 && missingInPt.length === 0) {
  console.log('✅ All translation keys are in sync!');
} else {
  process.exit(1);
}
```

**Usage**:
```bash
node scripts/translation-coverage.js
```

---

## 🎯 Action Items for Future Implementations

### For Developers:
1. **Before Starting**: Copy component template from this document
2. **During Development**: Use `t()` for ALL user-facing text
3. **Before PR**: Run translation coverage script
4. **In PR Description**: Confirm "i18n checklist completed"

### For Code Reviewers:
1. Check for `useTranslation` import
2. Verify no hardcoded strings in JSX
3. Confirm both pt-BR and en files updated
4. Test language toggle (if available)

### For Architects:
1. Run `detect-hardcoded-strings.sh` before generating report
2. Include i18n verification in STOP-BEFORE-EDIT checklist
3. Document any i18n gaps in architect reports

---

## 📚 Common Mistakes to Avoid

### Mistake 1: Forgetting Attributes
```jsx
// ❌ Missing placeholder translation
<input placeholder="Digite aqui..." />

// ✅ Translated
<input placeholder={t('form.inputPlaceholder')} />
```

### Mistake 2: Hardcoded in String Interpolation
```jsx
// ❌ Mixing translated and hardcoded
<p>{t('greeting')} na plataforma</p>

// ✅ Full translation with variable
<p>{t('greetingWithPlatform', { platform: 'TIBIA' })}</p>
```

### Mistake 3: Only Translating One Language
```jsx
// ❌ Only adding to pt-BR
// translation.json (pt-BR): { "button": "Clique aqui" }
// translation.json (en): { } ← Missing!

// ✅ Add to both
// pt-BR: { "button": "Clique aqui" }
// en: { "button": "Click here" }
```

---

## 🔄 Workflow Integration

### Development Workflow:
```
1. Create component
2. Add i18n keys to both pt-BR and en files
3. Implement component using t()
4. Run npm run build (verify no errors)
5. Run translation-coverage.js script
6. Submit PR with i18n checklist
```

### CI/CD Integration (Recommended):
Add to `.github/workflows/ci.yml`:
```yaml
- name: Check Translation Coverage
  run: node scripts/translation-coverage.js
```

---

## 📖 References

- [react-i18next Documentation](https://react.i18next.com/)
- Project Pattern: Check `SessionDataInput.js` for complete example
- Translation Files: `site-da-luci/frontend/src/locales/{pt-BR,en}/translation.json`

---

**Last Updated**: 2025-12-31
**Version**: 1.0
**Maintainer**: Architect Agent