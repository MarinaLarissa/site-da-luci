const fs = require('fs');
const path = require('path');
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(match[1]);

const fixes = {
  'hand-of-cursed-fate': { locations: ['Pits of Inferno'] },
  'hellhound': { locations: ['Pits of Inferno'] },
  'juggernaut': { locations: ['Pits of Inferno', 'Demon Forge'] },
  'lost-berserker': { locations: ['Warzone 2'] },
  'makara': { locations: ['Temple of the Moon Goddess'] },
  'naga-archer': { locations: ['Temple of the Moon Goddess'] },
  'naga-warrior': { locations: ['Temple of the Moon Goddess'] },
  'phantasm': { locations: ['Pits of Inferno'] },
  'shock-head': { locations: ['Lower Roshamuul'] },
  'sight-of-surrender': { locations: ['Dark Grounds', 'Guzzlemaw Valley'] },
  'terrorsleep': { locations: ['Roshamuul Mines'] },
  'guzzlemaw': { locations: ['Guzzlemaw Valley', 'Upper Roshamuul'] },
  'son-of-verminor': { locations: ['Pits of Inferno', 'Demon Forge'] },
  'hellhunter-inferniarch': { locations: ['Azzilon Castle'] },
  'night-harpy': { locations: ['Ingol'] },
  'raubritter-chastener': { locations: ['Haunted Territories'] },
  'raubritter-marksman': { locations: ['Haunted Territories'] },
  'raubritter-skirmisher': { locations: ['Haunted Territories'] },
  'spellreaper-inferniarch': { locations: ['Azzilon Castle'] },
};

let fixed = 0;
data.forEach(c => {
  if (fixes[c.id]) {
    const before = c.locations.join(' | ');
    c.locations = fixes[c.id].locations;
    console.log(`${c.name}: ${before} -> ${c.locations.join(' | ')}`);
    fixed++;
  }
});

// Also fix any locations ending with incomplete text
data.forEach(c => {
  if (!c.locations) return;
  c.locations = c.locations
    .map(l => l.replace(/\(\s*down\s*$/, '').replace(/\(\s*$/, '').trim())
    .filter(l => l.length > 1);
  if (c.locations.length === 0) c.locations = ['Unknown'];
});

console.log(`Fixed ${fixed} entries`);

// Rebuild
const header = content.split('export const BESTIARY_DATA = [')[0];
const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '';
const fieldOrder = ['id','name','imageUrl','charmPoints','difficulty','hitpoints','creatureCategory','locations','elementalResistances','killsToComplete'];
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
          c[key].forEach((loc, idx) => { lines.push(`      ${JSON.stringify(loc)}${idx < c[key].length - 1 ? ',' : ''}`); });
          lines.push(`    ],`);
        }
      } else {
        lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`);
      }
    }
  }
  for (const key of Object.keys(c)) { if (!fieldOrder.includes(key)) lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`); }
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  lines.push('  }');
  return lines.join('\n');
};
const creaturesStr = data.map(formatCreature).join(',\n');
fs.writeFileSync(BESTIARY_FILE, header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer, 'utf8');
console.log('File updated.');
