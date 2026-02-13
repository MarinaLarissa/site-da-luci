/**
 * Fix difficulty values by copying officialDifficulty from the git version
 * before it was removed.
 */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');

// Get original file from git
const originalContent = execSync('git show HEAD:frontend/src/data/bestiary.js', { encoding: 'utf8' });
const originalMatch = originalContent.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const originalData = eval(originalMatch[1]);

// Build map: id -> officialDifficulty
const officialDiffMap = {};
let diffCount = 0;
for (const c of originalData) {
  if (c.officialDifficulty) {
    officialDiffMap[c.id] = c.officialDifficulty;
  }
}

// Read current file
const currentContent = fs.readFileSync(BESTIARY_FILE, 'utf8');
const currentMatch = currentContent.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const currentData = eval(currentMatch[1]);

// Fix difficulty from officialDifficulty
let fixed = 0;
for (const c of currentData) {
  const correct = officialDiffMap[c.id];
  if (correct && c.difficulty !== correct) {
    console.log(`  ${c.name}: ${c.difficulty} -> ${correct}`);
    c.difficulty = correct;
    fixed++;
  }
}

console.log(`\nFixed ${fixed} creatures`);

if (fixed === 0) {
  console.log('Nothing to fix');
  process.exit(0);
}

// Rebuild file
const header = currentContent.split('export const BESTIARY_DATA = [')[0];
const footerMatch = currentContent.match(/\];\s*(\/\*\*[\s\S]*)?$/);
const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '';

const fieldOrder = [
  'id', 'name', 'imageUrl', 'charmPoints', 'difficulty',
  'hitpoints', 'respawnCategory', 'locations', 'elementalResistances',
  'killsToComplete'
];

const formatCreature = (c) => {
  const lines = ['  {'];
  for (const key of fieldOrder) {
    if (c[key] !== undefined) {
      if (key === 'elementalResistances') {
        const r = c[key];
        lines.push(`    "elementalResistances": {`);
        lines.push(`      "physical": ${r.physical},`);
        lines.push(`      "fire": ${r.fire},`);
        lines.push(`      "ice": ${r.ice},`);
        lines.push(`      "energy": ${r.energy},`);
        lines.push(`      "earth": ${r.earth},`);
        lines.push(`      "holy": ${r.holy},`);
        lines.push(`      "death": ${r.death}`);
        lines.push(`    },`);
      } else if (key === 'locations' && Array.isArray(c[key])) {
        if (c[key].length <= 2) {
          lines.push(`    "locations": [${c[key].map(l => JSON.stringify(l)).join(', ')}],`);
        } else {
          lines.push(`    "locations": [`);
          c[key].forEach((loc, i) => {
            const comma = i < c[key].length - 1 ? ',' : '';
            lines.push(`      ${JSON.stringify(loc)}${comma}`);
          });
          lines.push(`    ],`);
        }
      } else {
        lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`);
      }
    }
  }
  for (const key of Object.keys(c)) {
    if (!fieldOrder.includes(key)) {
      lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`);
    }
  }
  const lastIdx = lines.length - 1;
  lines[lastIdx] = lines[lastIdx].replace(/,$/, '');
  lines.push('  }');
  return lines.join('\n');
};

const creaturesStr = currentData.map(formatCreature).join(',\n');
const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;
fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
console.log('File updated.');
