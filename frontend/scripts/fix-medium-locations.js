const fs = require('fs');
const path = require('path');
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(match[1]);
const fixes = {
  'feversleep': { locations: ['Roshamuul Mines'] },
  'flying-book': { locations: ['Edron'] },
  'hero': { locations: ['Hero Cave (Edron)', 'Magician Quarter'] },
  'hydra': { locations: ['Tiquanda Hydra Mountain', 'Forbidden Lands', 'Deeper Banuta'] },
  'instable-breach-brood': { locations: ['Otherworld (Dwarf Bridge)'] },
  'instable-sparkion': { locations: ['Otherworld (Dwarf Bridge)'] },
  'lost-basher': { locations: ['Caves of the Lost', 'Lower Spike', 'Forsaken Mine'] },
  'lost-husher': { locations: ['Caves of the Lost', 'Lower Spike', 'Forsaken Mine'] },
  'lost-thrower': { locations: ['Caves of the Lost', 'Lower Spike', 'Forsaken Mine'] },
  'minotaur-invader': { locations: ['Underground Glooth Factory'] },
  'ink-splash': { locations: ['Fields of Glory'] },
  'hibernal-moth': { locations: ['Court of Winter'] },
  'lacewing-moth': { locations: ['Court of Summer'] },
  'yielothax': { locations: ['Yielothax Dimension'] },
  'rabid-wolf': { locations: ['Thais Wolf Den'] },
  'ragged-rabid-wolf': { locations: ['Thais Wolf Den'] },
  'werebadger': { locations: ['Grimvale', 'Edron Lycanthropes Cave'] },
  'wereboar': { locations: ['Grimvale', 'Edron Lycanthropes Cave'] },
  'werefox': { locations: ['Edron Lycanthropes Cave'] },
  'wyrm': { locations: ['Drefia Wyrm Lair', 'Vandura Wyrm Cave', 'Liberty Bay Wyrm Lair'] },
};
let fixed = 0;
data.forEach(c => {
  if (fixes[c.id]) {
    c.locations = fixes[c.id].locations;
    console.log(`${c.name}: ${c.locations.join(' | ')}`);
    fixed++;
  }
});
console.log(`Fixed ${fixed}`);
const header = content.split('export const BESTIARY_DATA = [')[0];
const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '';
const fieldOrder = ['id','name','imageUrl','charmPoints','difficulty','hitpoints','creatureCategory','locations','elementalResistances','killsToComplete'];
const formatCreature = (c) => {
  const lines = ['  {'];
  for (const key of fieldOrder) {
    if (c[key] !== undefined) {
      if (key === 'elementalResistances') {
        const r = c[key]; lines.push(`    "elementalResistances": {`);
        lines.push(`      "physical": ${r.physical},`); lines.push(`      "fire": ${r.fire},`);
        lines.push(`      "ice": ${r.ice},`); lines.push(`      "energy": ${r.energy},`);
        lines.push(`      "earth": ${r.earth},`); lines.push(`      "holy": ${r.holy},`);
        lines.push(`      "death": ${r.death}`); lines.push(`    },`);
      } else if (key === 'locations' && Array.isArray(c[key])) {
        if (c[key].length <= 2) { lines.push(`    "locations": [${c[key].map(l=>JSON.stringify(l)).join(', ')}],`); }
        else { lines.push(`    "locations": [`); c[key].forEach((l,i)=>{lines.push(`      ${JSON.stringify(l)}${i<c[key].length-1?',':''}`)}); lines.push(`    ],`); }
      } else { lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`); }
    }
  }
  for (const key of Object.keys(c)) { if (!fieldOrder.includes(key)) lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`); }
  lines[lines.length-1] = lines[lines.length-1].replace(/,$/,'');
  lines.push('  }'); return lines.join('\n');
};
fs.writeFileSync(BESTIARY_FILE, header+'export const BESTIARY_DATA = [\n'+data.map(formatCreature).join(',\n')+'\n];'+footer,'utf8');
console.log('Done');
