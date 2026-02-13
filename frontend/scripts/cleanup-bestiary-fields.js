/**
 * Remove deprecated fields from bestiary.js:
 * - officialDifficulty (redundant with difficulty)
 * - region (deprecated)
 * - estimatedHours (deprecated)
 * - recommendedLevel (deprecated)
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const content = fs.readFileSync(BESTIARY_FILE, 'utf8');

const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
if (!match) {
  console.log('Could not find BESTIARY_DATA');
  process.exit(1);
}

const data = eval(match[1]);
console.log(`Total creatures: ${data.length}`);

const removedFields = { officialDifficulty: 0, region: 0, estimatedHours: 0, recommendedLevel: 0 };

for (const c of data) {
  for (const field of Object.keys(removedFields)) {
    if (c[field] !== undefined) {
      delete c[field];
      removedFields[field]++;
    }
  }
}

console.log('Removed fields:', removedFields);

// Rebuild file
const header = content.split('export const BESTIARY_DATA = [')[0];
const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '\n\nexport const VALID_BESTIARY_DATA = filterValidBestiaryCreatures(BESTIARY_DATA);\n';

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

  // Extra fields not in order
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

const creaturesStr = data.map(formatCreature).join(',\n');
const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;

fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
console.log('Done! File updated.');
