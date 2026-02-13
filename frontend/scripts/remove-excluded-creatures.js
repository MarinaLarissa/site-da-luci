/**
 * Remove creatures from BESTIARY_DATA that exist in EXCLUDED_CREATURE_IDS.
 * This avoids confusion by keeping only valid bestiary creatures in the main data file.
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const EXCLUDED_FILE = path.join(__dirname, '../src/data/excludedFromBestiary.js');

// Parse excluded IDs from the file
const excludedContent = fs.readFileSync(EXCLUDED_FILE, 'utf8');
const excludedMatch = excludedContent.match(/export const EXCLUDED_CREATURE_IDS = \[([\s\S]*?)\];/);
if (!excludedMatch) {
  console.log('Could not find EXCLUDED_CREATURE_IDS');
  process.exit(1);
}

// Extract IDs from the array content
const excludedIds = [];
const idRegex = /'([^']+)'/g;
let m;
while ((m = idRegex.exec(excludedMatch[1])) !== null) {
  excludedIds.push(m[1]);
}
console.log(`Found ${excludedIds.length} excluded creature IDs`);

// Read bestiary data
const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
if (!match) {
  console.log('Could not find BESTIARY_DATA');
  process.exit(1);
}

const data = eval(match[1]);
console.log(`Total creatures before: ${data.length}`);

// Find which excluded creatures exist in the data
const toRemove = data.filter(c => excludedIds.includes(c.id));
console.log(`\nCreatures to remove (${toRemove.length}):`);
toRemove.forEach(c => {
  console.log(`  - ${c.name} (${c.id}) | ${c.difficulty} | ${c.creatureCategory} | CP=${c.charmPoints}`);
});

// Filter out excluded creatures
const filtered = data.filter(c => !excludedIds.includes(c.id));
console.log(`\nTotal creatures after: ${filtered.length}`);
console.log(`Removed: ${data.length - filtered.length}`);

// Rebuild file
const header = content.split('export const BESTIARY_DATA = [')[0];
const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '';

const fieldOrder = [
  'id', 'name', 'imageUrl', 'charmPoints', 'difficulty',
  'hitpoints', 'creatureCategory', 'locations', 'elementalResistances',
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

const creaturesStr = filtered.map(formatCreature).join(',\n');
const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;
fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
console.log('File updated.');
