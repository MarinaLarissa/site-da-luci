/**
 * Fix specific location entries that have incomplete or overly verbose text.
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');

const fixes = {
  'troll-guard': ['Rookgaard'],
  'grynch-clan-goblin': ['Various Tibian cities (event raid)'],
  'ghastly-dragon': ['Ghastly Dragon Lair', 'Corruption Hole', 'Razachai', 'Zao Palace', 'Deeper Banuta'],
  'calamary': ['Fiehonja', 'Ancient Ancestorial Grounds', 'Deepling Outpost', 'Deepling Temple Complex', 'Drowned Library'],
  'bog-frog': ['Shadowthorn', 'Drefia', 'Lake Equivocolao'],
  'cave-rat': ['Almost everywhere in Tibia', 'Greenshore', 'Port Hope', 'Ankrahmun'],
  'rat': ['Rookgaard and Mainland', 'Most sewers and caves near towns'],
  'dark-magician': ['Hero Cave (Edron)', 'Magician Tower', 'Dark Cathedral', 'Yalahar Magician Quarter'],
  'dark-torturer': ['Pits of Inferno', 'Vengoth'],
  'defiler': ['Pits of Inferno'],
  'iron-servant': ['Edron'],
  'green-frog': ['Meriana', 'Shattered Isles', 'Port Hope caves'],
  'minotaur-mage': ['Cyclopolis', 'Mintwallin', 'Maze of Lost Souls', 'Dark Pyramid', 'Folda', 'Kazordoon', 'Plains of Havoc'],
  'squidgy-slime': ['Horestis Tomb'],
  'ladybug': ['The Hive surface'],
};

const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(match[1]);

let fixed = 0;
data.forEach(c => {
  if (fixes[c.id]) {
    console.log(`Fixed: ${c.name}`);
    console.log(`  Before: ${c.locations.join(' | ')}`);
    c.locations = fixes[c.id];
    console.log(`  After:  ${c.locations.join(' | ')}`);
    fixed++;
  }
});

console.log(`\nFixed ${fixed} entries`);

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
