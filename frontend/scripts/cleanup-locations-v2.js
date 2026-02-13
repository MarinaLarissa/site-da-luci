/**
 * Second pass cleanup - remove "Mapper Coords" remnants and other artifacts.
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');

const cleanLocation = (loc) => {
  let s = loc;
  // Remove "Mapper Coords" and surrounding junk
  s = s.replace(/\(?Mapper Coords[^)]*\)?/g, '');
  // Remove "Raid#..." wiki internal link fragments
  s = s.replace(/Raid#[^\s,;.)]+/g, '');
  // Remove "Forsaken Mine/..." fragments -> "Forsaken Mine"
  s = s.replace(/Forsaken Mine\/\w+/g, 'Forsaken Mine');
  // Remove "Tiquanda/Water Elemental Cave" -> "Tiquanda Water Elemental Cave"
  s = s.replace(/Tiquanda\/Water Elemental Cave/g, 'Tiquanda Water Elemental Cave');
  // Remove "Jaccus_Maxxen..." URL-encoded fragments
  s = s.replace(/Jaccus_Maxxen%27s_Dungeon#Third_Room/g, "Jaccus Maxxen's Dungeon");
  // Clean up orphaned parentheses
  s = s.replace(/\(\s*\)/g, '');
  s = s.replace(/\(\s*$/g, '');
  // Clean up multiple spaces
  s = s.replace(/\s{2,}/g, ' ');
  // Trim
  s = s.replace(/^[\s,;.]+/, '').replace(/[\s,;.]+$/, '');
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

  const origStr = JSON.stringify(creature.locations);
  creature.locations = creature.locations
    .map(cleanLocation)
    .filter(l => l.length > 0 && l !== 'Unknown' && l !== '?');

  if (creature.locations.length === 0) creature.locations = ['Unknown'];

  if (JSON.stringify(creature.locations) !== origStr) {
    cleanedCount++;
    console.log(`Cleaned: ${creature.name}`);
    creature.locations.forEach(l => console.log(`  -> ${l}`));
  }
});

console.log(`\nCleaned ${cleanedCount} entries`);

// Check remaining dirty
let remaining = 0;
data.forEach(c => {
  if (c.locations) {
    c.locations.forEach(l => {
      if (l.match(/\[\[|\{\{|https?:|Mapper/i)) {
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
