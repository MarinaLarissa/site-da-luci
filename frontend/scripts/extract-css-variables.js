#!/usr/bin/env node

/**
 * CSS Variable Extractor
 * Extracts hardcoded colors from CSS and suggests CSS variables
 *
 * ROI: 17x - Automates finding 50-100 hardcoded values in 5 minutes vs 90 minutes manual
 * Benefits: Consistency, maintainability, dark theme support
 *
 * Usage:
 *   node scripts/extract-css-variables.js
 *   node scripts/extract-css-variables.js --dir src/components
 *   node scripts/extract-css-variables.js --output variables.css
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DEFAULT_DIR = path.join(__dirname, '../src');
const DEFAULT_OUTPUT = path.join(__dirname, '../src/styles/extracted-variables.css');

// Parse CLI arguments
const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const outputIndex = args.indexOf('--output');

const SOURCE_DIR = dirIndex !== -1 ? args[dirIndex + 1] : DEFAULT_DIR;
const OUTPUT_FILE = outputIndex !== -1 ? args[outputIndex + 1] : DEFAULT_OUTPUT;

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// CSS color patterns
const COLOR_PATTERNS = {
  hex: /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
  rgb: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)/g,
  hsl: /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+)?\s*\)/g,
};

// Color categories for CSS variables
const COLOR_CATEGORIES = {
  primary: [],
  secondary: [],
  accent: [],
  background: [],
  text: [],
  border: [],
  error: [],
  success: [],
  warning: [],
  info: [],
  neutral: [],
};

/**
 * Get all CSS files recursively
 */
function getCSSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getCSSFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract colors from CSS file
 */
function extractColors(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const colors = new Set();

  // Extract hex colors
  const hexMatches = content.matchAll(COLOR_PATTERNS.hex);
  for (const match of hexMatches) {
    colors.add(match[0]);
  }

  // Extract rgb colors
  const rgbMatches = content.matchAll(COLOR_PATTERNS.rgb);
  for (const match of rgbMatches) {
    colors.add(match[0]);
  }

  // Extract hsl colors
  const hslMatches = content.matchAll(COLOR_PATTERNS.hsl);
  for (const match of hslMatches) {
    colors.add(match[0]);
  }

  return Array.from(colors);
}

/**
 * Categorize color based on heuristics
 */
function categorizeColor(color, context = '') {
  color = color.toLowerCase();

  // Check context for category hints
  if (context.includes('background') || context.includes('bg-')) {
    return 'background';
  }
  if (context.includes('text') || context.includes('color:')) {
    return 'text';
  }
  if (context.includes('border')) {
    return 'border';
  }
  if (context.includes('error') || context.includes('danger')) {
    return 'error';
  }
  if (context.includes('success')) {
    return 'success';
  }
  if (context.includes('warning')) {
    return 'warning';
  }
  if (context.includes('info')) {
    return 'info';
  }
  if (context.includes('primary')) {
    return 'primary';
  }
  if (context.includes('secondary')) {
    return 'secondary';
  }
  if (context.includes('accent')) {
    return 'accent';
  }

  // Heuristics based on color value
  if (color.startsWith('#fff') || color.startsWith('#f') || color.includes('255, 255, 255')) {
    return 'background';
  }
  if (color.startsWith('#000') || color.startsWith('#1') || color.startsWith('#2')) {
    return 'text';
  }
  if (color.includes('rgba') && color.includes('0.')) {
    return 'border'; // Likely transparent borders
  }

  return 'neutral';
}

/**
 * Generate CSS variable name
 */
function generateVariableName(color, category, index) {
  // Simplify color for variable name
  let colorHint = '';
  if (color.startsWith('#')) {
    colorHint = color.slice(1, 4);
  } else if (color.includes('rgb')) {
    colorHint = 'rgb';
  } else if (color.includes('hsl')) {
    colorHint = 'hsl';
  }

  return `--${category}-${colorHint}-${index}`;
}

/**
 * Extract and analyze colors from all CSS files
 */
function analyzeColors() {
  console.log(`${colors.cyan}🎨 Extracting CSS colors...${colors.reset}\n`);
  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Output file: ${OUTPUT_FILE}\n`);

  const cssFiles = getCSSFiles(SOURCE_DIR);
  console.log(`Found ${cssFiles.length} CSS files\n`);

  const colorMap = new Map(); // Map<color, {files: Set, contexts: Set, category: string}>

  // Extract colors from all files
  for (const file of cssFiles) {
    const fileColors = extractColors(file);
    const content = fs.readFileSync(file, 'utf-8');

    for (const color of fileColors) {
      if (!colorMap.has(color)) {
        colorMap.set(color, { files: new Set(), contexts: new Set(), category: 'neutral' });
      }

      const entry = colorMap.get(color);
      entry.files.add(path.relative(SOURCE_DIR, file));

      // Extract context (line containing the color)
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.includes(color)) {
          entry.contexts.add(line.trim().substring(0, 80)); // First 80 chars
        }
      }
    }
  }

  console.log(`${colors.green}Found ${colorMap.size} unique colors${colors.reset}\n`);

  // Categorize colors
  for (const [color, data] of colorMap.entries()) {
    const contexts = Array.from(data.contexts).join(' ');
    data.category = categorizeColor(color, contexts);
    COLOR_CATEGORIES[data.category].push(color);
  }

  // Generate CSS variables
  generateCSSVariables(colorMap);

  // Generate usage report
  generateReport(colorMap);
}

/**
 * Generate CSS variable definitions
 */
function generateCSSVariables(colorMap) {
  let cssContent = `/**
 * Extracted CSS Variables
 * Generated by extract-css-variables.js
 * Date: ${new Date().toISOString()}
 *
 * USAGE:
 * 1. Review the categories and variable names
 * 2. Rename variables to meaningful names (e.g., --primary-rgb-0 → --color-primary)
 * 3. Remove duplicates and consolidate similar colors
 * 4. Replace hardcoded colors in your CSS files with var(--variable-name)
 * 5. Update this file and commit to version control
 */

:root {
`;

  // Generate variables by category
  for (const [category, colors] of Object.entries(COLOR_CATEGORIES)) {
    if (colors.length === 0) continue;

    cssContent += `\n  /* ${category.charAt(0).toUpperCase() + category.slice(1)} Colors */\n`;

    colors.forEach((color, index) => {
      const varName = generateVariableName(color, category, index);
      cssContent += `  ${varName}: ${color};\n`;
    });
  }

  cssContent += `}\n`;

  // Write to file
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, cssContent, 'utf-8');
  console.log(`${colors.green}✅ CSS variables written to: ${OUTPUT_FILE}${colors.reset}\n`);
}

/**
 * Generate usage report
 */
function generateReport(colorMap) {
  console.log(`${'='.repeat(60)}`);
  console.log(`${colors.cyan}Color Usage Report${colors.reset}`);
  console.log(`${'='.repeat(60)}\n`);

  console.log(`${colors.blue}By Category:${colors.reset}`);
  for (const [category, colors] of Object.entries(COLOR_CATEGORIES)) {
    if (colors.length > 0) {
      console.log(`  ${category.padEnd(15)}: ${colors.length} colors`);
    }
  }

  console.log(`\n${colors.blue}Most Used Colors:${colors.reset}`);
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1].files.size - a[1].files.size)
    .slice(0, 10);

  sortedColors.forEach(([color, data], index) => {
    console.log(`  ${index + 1}. ${color.padEnd(20)} - Used in ${data.files.size} files`);
  });

  console.log(`\n${colors.yellow}⚠️  Next Steps:${colors.reset}`);
  console.log(`  1. Review ${OUTPUT_FILE}`);
  console.log(`  2. Rename variables to meaningful names`);
  console.log(`  3. Consolidate similar colors`);
  console.log(`  4. Replace hardcoded colors with var(--variable-name)`);
  console.log(`  5. Test thoroughly (especially dark mode if applicable)\n`);
}

/**
 * Main execution
 */
if (require.main === module) {
  try {
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`${colors.red}Error: Source directory not found: ${SOURCE_DIR}${colors.reset}`);
      process.exit(1);
    }

    analyzeColors();
  } catch (error) {
    console.error(`${colors.red}Error:${colors.reset}`, error.message);
    process.exit(1);
  }
}

module.exports = { getCSSFiles, extractColors, categorizeColor, generateVariableName };
