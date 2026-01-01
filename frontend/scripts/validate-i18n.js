#!/usr/bin/env node

/**
 * Translation Key Validation Script
 *
 * This script validates that all translation keys used in the codebase
 * actually exist in both pt-BR and en translation files.
 *
 * Purpose: Prevent runtime errors where literal translation keys
 * are displayed to users (e.g., "soloHuntAnalyzer.itemCostManager.costSummary.totalCost")
 *
 * Usage:
 *   node scripts/validate-i18n.js
 *   npm run validate-i18n
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Load translation file and return parsed JSON
 */
function loadTranslationFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`${colors.red}Error loading translation file: ${filePath}${colors.reset}`);
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Get nested value from object using dot notation path
 * Example: getNestedValue(obj, 'a.b.c') returns obj.a.b.c
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current?.[key];
  }, obj);
}

/**
 * Find all .js and .jsx files in directory recursively
 * Excludes node_modules, build, and test files
 */
function findSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, build, coverage, etc.
      if (!['node_modules', 'build', 'coverage', 'dist', '.git'].includes(file)) {
        findSourceFiles(filePath, fileList);
      }
    } else if (stat.isFile()) {
      // Include .js and .jsx files, exclude test files
      if (/\.(js|jsx)$/.test(file) && !/\.(test|spec)\.(js|jsx)$/.test(file)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Extract all translation keys from source file
 * Matches patterns: t('key'), t("key"), t(`key`)
 */
function extractTranslationKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = new Set();

  // Pattern matches: t('key'), t("key"), t(`key`)
  // Captures the key inside quotes/backticks
  const patterns = [
    /\bt\s*\(\s*['"]([^'"]+)['"]\s*\)/g,  // t('key') or t("key")
    /\bt\s*\(\s*`([^`]+)`\s*\)/g,         // t(`key`)
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const key = match[1];
      // Skip template literals with variables (e.g., `key.${variable}`)
      if (!key.includes('${')) {
        keys.add(key);
      }
    }
  });

  return Array.from(keys);
}

/**
 * Main validation function
 */
function validateTranslations() {
  console.log(`${colors.cyan}===========================================`);
  console.log(`Translation Key Validation`);
  console.log(`===========================================${colors.reset}\n`);

  // Define paths
  const srcDir = path.join(__dirname, '..', 'src');
  const ptBRPath = path.join(srcDir, 'locales', 'pt-BR', 'translation.json');
  const enPath = path.join(srcDir, 'locales', 'en', 'translation.json');

  // Load translation files
  console.log(`${colors.gray}Loading translation files...${colors.reset}`);
  const ptBR = loadTranslationFile(ptBRPath);
  const en = loadTranslationFile(enPath);
  console.log(`${colors.green}✓${colors.reset} Loaded pt-BR translation`);
  console.log(`${colors.green}✓${colors.reset} Loaded en translation\n`);

  // Find all source files
  console.log(`${colors.gray}Scanning source files...${colors.reset}`);
  const sourceFiles = findSourceFiles(srcDir);
  console.log(`${colors.green}✓${colors.reset} Found ${sourceFiles.length} source files\n`);

  // Extract all translation keys used in code
  console.log(`${colors.gray}Extracting translation keys from code...${colors.reset}`);
  const usedKeys = new Map(); // Map<key, Set<filePath>>

  sourceFiles.forEach(filePath => {
    const keys = extractTranslationKeys(filePath);
    keys.forEach(key => {
      if (!usedKeys.has(key)) {
        usedKeys.set(key, new Set());
      }
      usedKeys.get(key).add(filePath);
    });
  });

  console.log(`${colors.green}✓${colors.reset} Found ${usedKeys.size} unique translation keys\n`);

  // Validate keys exist in both translation files
  console.log(`${colors.gray}Validating translation keys...${colors.reset}\n`);

  const errors = [];
  const warnings = [];

  usedKeys.forEach((files, key) => {
    const existsInPtBR = getNestedValue(ptBR, key) !== undefined;
    const existsInEn = getNestedValue(en, key) !== undefined;

    if (!existsInPtBR || !existsInEn) {
      const fileList = Array.from(files).map(f =>
        path.relative(srcDir, f)
      );

      if (!existsInPtBR && !existsInEn) {
        errors.push({
          key,
          missing: 'both',
          files: fileList,
        });
      } else if (!existsInPtBR) {
        errors.push({
          key,
          missing: 'pt-BR',
          files: fileList,
        });
      } else {
        errors.push({
          key,
          missing: 'en',
          files: fileList,
        });
      }
    }
  });

  // Check for unused keys in translation files (warning only)
  function getAllKeys(obj, prefix = '') {
    let keys = [];
    Object.keys(obj).forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    });
    return keys;
  }

  const allPtBRKeys = getAllKeys(ptBR);
  const allEnKeys = getAllKeys(en);
  const usedKeysArray = Array.from(usedKeys.keys());

  const unusedPtBRKeys = allPtBRKeys.filter(key => !usedKeysArray.includes(key));
  const unusedEnKeys = allEnKeys.filter(key => !usedKeysArray.includes(key));

  // Report results
  console.log(`${colors.cyan}===========================================`);
  console.log(`Validation Results`);
  console.log(`===========================================${colors.reset}\n`);

  if (errors.length === 0) {
    console.log(`${colors.green}✓ All translation keys are valid!${colors.reset}\n`);
    console.log(`${colors.gray}Summary:${colors.reset}`);
    console.log(`  - Total keys in pt-BR: ${allPtBRKeys.length}`);
    console.log(`  - Total keys in en: ${allEnKeys.length}`);
    console.log(`  - Keys used in code: ${usedKeys.size}`);
    console.log(`  - Missing keys: ${colors.green}0${colors.reset}\n`);

    // Show unused keys as warnings (optional)
    if (unusedPtBRKeys.length > 0) {
      console.log(`${colors.yellow}⚠ Warning: ${unusedPtBRKeys.length} unused keys in pt-BR${colors.reset}`);
      console.log(`${colors.gray}(These keys exist in translation files but are not used in code)${colors.reset}\n`);
    }

    process.exit(0);
  } else {
    console.log(`${colors.red}✗ Found ${errors.length} missing translation key(s)${colors.reset}\n`);

    errors.forEach((error, index) => {
      console.log(`${colors.red}${index + 1}.${colors.reset} Key: ${colors.yellow}${error.key}${colors.reset}`);

      if (error.missing === 'both') {
        console.log(`   Missing in: ${colors.red}pt-BR and en${colors.reset}`);
      } else {
        console.log(`   Missing in: ${colors.red}${error.missing}${colors.reset}`);
      }

      console.log(`   Used in:`);
      error.files.forEach(file => {
        console.log(`     ${colors.gray}-${colors.reset} ${file}`);
      });
      console.log('');
    });

    console.log(`${colors.cyan}===========================================`);
    console.log(`Action Required`);
    console.log(`===========================================${colors.reset}\n`);

    console.log('Add the missing keys to the translation files:\n');

    errors.forEach(error => {
      const keyParts = error.key.split('.');
      const lastKey = keyParts[keyParts.length - 1];

      if (error.missing === 'both' || error.missing === 'pt-BR') {
        console.log(`${colors.gray}// src/locales/pt-BR/translation.json${colors.reset}`);
        console.log(`"${lastKey}": "Tradução em português aqui"\n`);
      }

      if (error.missing === 'both' || error.missing === 'en') {
        console.log(`${colors.gray}// src/locales/en/translation.json${colors.reset}`);
        console.log(`"${lastKey}": "English translation here"\n`);
      }
    });

    process.exit(1);
  }
}

// Run validation
validateTranslations();
