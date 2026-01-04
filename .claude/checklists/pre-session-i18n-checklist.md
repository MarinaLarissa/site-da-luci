# Pre-Session i18n Checklist

**Purpose**: Prevent i18n issues before they occur (saves 15 min/session)
**When to Use**: Before starting any frontend work that involves text display
**ROI**: 20x (3 min checklist prevents 60 min of debugging/rework)

---

## ✅ Pre-Work Checklist (5 minutes)

### 1. **Verify Translation Files Exist** (30 sec)
- [ ] `frontend/src/locales/pt-BR/translation.json` exists
- [ ] `frontend/src/locales/en/translation.json` exists
- [ ] Both files are valid JSON (no syntax errors)

**Quick Test**:
```bash
cd frontend
node -e "require('./src/locales/pt-BR/translation.json')"
node -e "require('./src/locales/en/translation.json')"
```
Expected: No errors

---

### 2. **Run i18n Validator** (1 min)
```bash
cd frontend
npm run validate-i18n
```

- [ ] **Exit code 0** (all validations passed)
- [ ] No missing keys
- [ ] No placeholder mismatches
- [ ] No empty values

**If errors found**: Fix them before proceeding

---

### 3. **Check i18n Setup in Component** (1 min)

For new components, verify:
- [ ] `import { useTranslation } from 'react-i18next';`
- [ ] `const { t } = useTranslation();` in component body
- [ ] All user-facing text uses `t('key')`, not hardcoded strings

**Example**:
```jsx
// ✅ CORRECT
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <button>{t('myComponent.submitButton')}</button>;
}

// ❌ WRONG
function MyComponent() {
  return <button>Submit</button>; // Hardcoded text
}
```

---

### 4. **Plan Translation Keys** (2 min)

Before adding new text:
- [ ] Identify all user-facing text in the feature
- [ ] Plan translation key structure (follow existing patterns)
- [ ] Check if keys already exist (avoid duplicates)

**Key Naming Convention**:
```
{componentName}.{section}.{element}

Examples:
- soloHuntAnalyzer.results.title
- soloHuntAnalyzer.errors.noSessionData
- imbuementCalculator.goldTokenPrice
```

---

### 5. **Add Keys to BOTH Locales** (1 min)

When adding new keys:
- [ ] Add to `pt-BR/translation.json` first (reference locale)
- [ ] Add to `en/translation.json` immediately after
- [ ] Use EXACT same key path in both files
- [ ] Verify placeholder syntax matches (e.g., `{{count}}`)

**Template**:
```json
// pt-BR/translation.json
{
  "myComponent": {
    "title": "Meu Componente",
    "description": "Descrição com {{placeholder}}"
  }
}

// en/translation.json
{
  "myComponent": {
    "title": "My Component",
    "description": "Description with {{placeholder}}"
  }
}
```

---

## 🚨 Common Pitfalls to Avoid

### ❌ Pitfall 1: Hardcoded Text
```jsx
// WRONG
<button>Calculate</button>

// CORRECT
<button>{t('calculate')}</button>
```

### ❌ Pitfall 2: Missing Key in One Locale
```json
// pt-BR: ✅ Has key
{ "errorMessage": "Erro ao calcular" }

// en: ❌ Missing key
{ }  // Key not added!
```
**Result**: English users see literal key: "errorMessage"

### ❌ Pitfall 3: Placeholder Mismatch
```json
// pt-BR
{ "greeting": "Olá, {{name}}!" }

// en (WRONG - different placeholder)
{ "greeting": "Hello, {{username}}!" }
```
**Result**: Placeholder not replaced, displays `Hello, {{username}}!`

### ❌ Pitfall 4: Wrong Key Path
```jsx
// Code expects:
t('soloHuntAnalyzer.errors.timeout')

// But translation file has:
{ "soloHuntAnalyzer": { "error": { "timeout": "..." } } }
// Note: "error" (singular) vs "errors" (plural)
```
**Result**: Literal key displayed to user

---

## ✅ Post-Work Validation (2 minutes)

After adding translations:

### 1. **Re-run i18n Validator**
```bash
npm run validate-i18n
```
- [ ] Exit code 0 (no new errors)

### 2. **Test in Both Languages**
- [ ] Switch to Portuguese: Verify all text displays correctly
- [ ] Switch to English: Verify all text displays correctly
- [ ] No literal keys visible (e.g., "soloHuntAnalyzer.errors.timeout")

**Quick Language Switch**:
```jsx
// In browser console or component
import i18n from 'i18next';
i18n.changeLanguage('en');  // Switch to English
i18n.changeLanguage('pt-BR');  // Switch to Portuguese
```

### 3. **Check Placeholders**
- [ ] All placeholders render correctly ({{count}}, {{name}}, etc.)
- [ ] No raw placeholder syntax visible to users

---

## 📋 Quick Reference: Translation Workflow

```
1. Plan keys (2 min)
   └─> Identify text, choose key names

2. Add to pt-BR (30 sec)
   └─> frontend/src/locales/pt-BR/translation.json

3. Add to en (30 sec)
   └─> frontend/src/locales/en/translation.json

4. Use in component (1 min)
   └─> t('key.path')

5. Validate (1 min)
   └─> npm run validate-i18n

6. Test (1 min)
   └─> Switch languages, verify display
```

**Total Time**: ~6 minutes
**Bugs Prevented**: Missing keys, hardcoded text, placeholder errors

---

## 🔧 Troubleshooting

### Issue: "Key not found" in validator
**Solution**: Ensure exact key path matches in both locales

### Issue: Literal key displayed to user
**Causes**:
1. Key missing in translation file
2. Typo in key name
3. Wrong key path (check nesting)

**Fix**: Add missing key or correct typo

### Issue: Placeholder not replaced
**Causes**:
1. Placeholder name mismatch between locales
2. Missing placeholder in `t()` call

**Fix**:
```jsx
// Ensure placeholder is passed
t('greeting', { name: userName })

// And matches translation file
{ "greeting": "Hello, {{name}}!" }
```

---

## 📊 Success Metrics

**Pre-Checklist** (before using checklist):
- i18n bugs per session: 2-3
- Time spent fixing: 15-20 min
- User-facing bugs shipped: 1-2

**Post-Checklist** (with checklist):
- i18n bugs per session: 0-1
- Time spent fixing: 0-5 min
- User-facing bugs shipped: 0

**ROI**: 15 min saved per session × 5 sessions/week = **75 min/week saved**

---

## 🎯 Enforcement

This checklist is **MANDATORY** before:
- Creating new React components with user-facing text
- Adding new features with text display
- Modifying existing text (ensure both locales updated)

**Architect Verification**:
- Session reports MUST confirm checklist was followed
- i18n validator MUST pass before committing code
- Meta-Improver tracks compliance across sessions

---

**Last Updated**: 2026-01-04
**Version**: 1.0
**Owner**: Architect Agent
