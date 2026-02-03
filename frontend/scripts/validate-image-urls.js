#!/usr/bin/env node

/**
 * Image URL Validation Script
 *
 * Validates that all creature image URLs in the codebase
 * use the getImageUrl() helper instead of direct imageUrl access
 *
 * Usage: node scripts/validate-image-urls.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const VIOLATIONS = [];

// Pattern to detect direct imageUrl usage in JSX
const DIRECT_IMAGE_URL_PATTERN = /src=\{[^}]*imageUrl[^}]*\}/g;
const SAFE_PATTERN = /getImageUrl\(/;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.match(DIRECT_IMAGE_URL_PATTERN);

  if (!matches) return;

  matches.forEach((match) => {
    // Check if this match uses getImageUrl()
    if (!SAFE_PATTERN.test(match)) {
      const lines = content.split('\n');
      const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;

      VIOLATIONS.push({
        file: path.relative(process.cwd(), filePath),
        line: lineNumber,
        code: match.trim(),
      });
    }
  });
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and test directories
      if (entry.name === 'node_modules' || entry.name === '__tests__') return;
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      // Only scan JS/JSX files
      if (/\.(js|jsx)$/.test(entry.name)) {
        scanFile(fullPath);
      }
    }
  });
}

console.log('🔍 Scanning for direct imageUrl usage...\n');

scanDirectory(SRC_DIR);

if (VIOLATIONS.length === 0) {
  console.log('✅ No violations found! All image URLs use getImageUrl() helper.\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${VIOLATIONS.length} violation(s):\n`);

  VIOLATIONS.forEach((violation, index) => {
    console.log(`${index + 1}. ${violation.file}:${violation.line}`);
    console.log(`   ${violation.code}`);
    console.log('   → Should use: getImageUrl(imageUrl)\n');
  });

  console.log('Please fix these violations by using the getImageUrl() helper.\n');
  process.exit(1);
}
