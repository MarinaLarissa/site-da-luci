/**
 * Clean up wiki markup from scraped locations in bestiary data.
 * Removes [[links]], {{templates}}, [urls], and orphaned punctuation.
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');

const cleanLocation = (loc) => {
  let s = loc;
  // Remove [url text] external links -> keep text
  s = s.replace(/\[https?:\/\/\S+\s+([^\]]+)\]/g, '$1');
  // Remove remaining raw URLs
  s = s.replace(/https?:\/\/\S+/g, '');
  // Remove [[Link|Display]] -> Display
  s = s.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  // Remove [[Link]] -> Link
  s = s.replace(/\[\[([^\]]+)\]\]/g, '$1');
  // Remove {{...}} templates (including nested content)
  s = s.replace(/\{\{[^}]*\}\}/g, '');
  // Remove remaining [[ and ]]
  s = s.replace(/\[\[/g, '');
  s = s.replace(/\]\]/g, '');
  // Remove remaining {{ and }}
  s = s.replace(/\{\{/g, '');
  s = s.replace(/\}\}/g, '');
  // Remove ''text'' italic markup
  s = s.replace(/''/g, '');
  // Clean up orphaned parens: "(  )" or "( ," etc.
  s = s.replace(/\(\s*[,;.]?\s*\)/g, '');
  // Remove trailing ( or (only-whitespace
  s = s.replace(/\(\s*$/g, '');
  // Clean up double spaces, commas, etc.
  s = s.replace(/\s{2,}/g, ' ');
  s = s.replace(/,\s*,/g, ',');
  s = s.replace(/,\s*\./g, '.');
  // Trim punctuation/spaces from start and end
  s = s.replace(/^[\s,;]+/, '').replace(/[\s,;]+$/, '');
  // Remove trailing period if it makes the string cleaner
  s = s.replace(/\.\s*$/, '');
  return s.trim();
};

const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
if (!match) {
  console.log('Could not find BESTIARY_DATA');
  process.exit(1);
}

const data = eval(match[1]);
let cleanedCount = 0;

data.forEach(creature => {
  if (!creature.locations) return;

  const newLocs = [];
  creature.locations.forEach(loc => {
    const cleaned = cleanLocation(loc);
    if (cleaned.length > 0 && cleaned !== 'Unknown' && cleaned !== '?') {
      newLocs.push(cleaned);
    }
  });

  // Check if any location was actually changed
  const origStr = JSON.stringify(creature.locations);
  creature.locations = newLocs.length > 0 ? newLocs : ['Unknown'];
  if (JSON.stringify(creature.locations) !== origStr) {
    cleanedCount++;
    console.log(`Cleaned: ${creature.name}`);
    creature.locations.forEach(l => console.log(`  -> ${l}`));
  }
});

console.log(`\nCleaned ${cleanedCount} creature locations`);

// Check for any remaining dirty entries
let remaining = 0;
data.forEach(c => {
  if (c.locations) {
    c.locations.forEach(l => {
      if (l.match(/\[\[|\{\{|https?:|Mapper/)) {
        remaining++;
        console.log(`STILL DIRTY: ${c.name} -> ${l.substring(0, 100)}`);
      }
    });
  }
});
console.log(`Remaining dirty: ${remaining}`);

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
          c[key].forEach((loc, idx) => {
            const comma = idx < c[key].length - 1 ? ',' : '';
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

const creaturesStr = data.map(formatCreature).join(',\n');
const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;
fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
console.log('File updated.');
