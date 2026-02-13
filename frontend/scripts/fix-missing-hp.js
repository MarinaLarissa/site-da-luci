/**
 * Fix remaining creatures missing hitpoints by trying alternative wiki page names
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';

const fetchWikiText = (pageName) => {
  return new Promise((resolve, reject) => {
    const url = `${TIBIAWIKI_API}?action=parse&page=${encodeURIComponent(pageName)}&format=json&prop=wikitext`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.parse && json.parse.wikitext) {
            resolve(json.parse.wikitext['*']);
          } else {
            resolve(null);
          }
        } catch (err) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
};

const parseHP = (wikitext) => {
  const match = wikitext.match(/\|\s*hp\s*=\s*([0-9]+)/i);
  return match ? parseInt(match[1]) : null;
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// Manual HP values for creatures not on wiki or with different names
const manualHP = {
  'Fish': 25,
  'Northern Pike': 40,
};

// Alternative wiki page names to try
const altNames = {
  'Blooming Tower (Light Blue)': ['Blooming Tower'],
  'Blooming Tower (Red)': ['Blooming Tower'],
  'Blooming Tower (Violet)': ['Blooming Tower'],
  'Blooming Tower (Yellow)': ['Blooming Tower'],
  "Bonelord's Phylactery": ["Bonelord's Phylactery", "Bonelord Phylactery"],
};

const main = async () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
  const data = eval(match[1]);

  const missing = data.filter(c => !c.hitpoints);
  console.log(`Creatures missing HP: ${missing.length}\n`);

  const results = {};

  for (const creature of missing) {
    const name = creature.name;

    // Check manual values first
    if (manualHP[name]) {
      results[name] = { hp: manualHP[name], source: 'manual' };
      console.log(`  ${name}: HP=${manualHP[name]} (manual)`);
      continue;
    }

    // Try original name first, then alternatives
    const namesToTry = [name, ...(altNames[name] || [])];
    let found = false;

    for (const tryName of namesToTry) {
      const wikitext = await fetchWikiText(tryName);
      if (wikitext) {
        const hp = parseHP(wikitext);
        if (hp) {
          results[name] = { hp, source: `wiki:${tryName}` };
          console.log(`  ${name}: HP=${hp} (from "${tryName}")`);
          found = true;
          break;
        }
      }
      await delay(600);
    }

    if (!found) {
      // Try searching
      console.log(`  ${name}: NOT FOUND`);
      results[name] = null;
    }
  }

  console.log('\n=== Summary ===');
  const found = Object.entries(results).filter(([, v]) => v);
  const notFound = Object.entries(results).filter(([, v]) => !v);

  console.log(`Found: ${found.length}`);
  found.forEach(([name, { hp, source }]) => console.log(`  ${name}: ${hp} (${source})`));

  console.log(`\nNot found: ${notFound.length}`);
  notFound.forEach(([name]) => console.log(`  ${name}`));

  // Apply found HP values to the data
  if (found.length > 0) {
    for (const creature of data) {
      if (results[creature.name] && results[creature.name].hp) {
        creature.hitpoints = results[creature.name].hp;
      }
    }

    // Rebuild the file
    const header = content.split('export const BESTIARY_DATA = [')[0];
    const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
    const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '';

    const fieldOrder = [
      'id', 'name', 'imageUrl', 'charmPoints', 'difficulty', 'officialDifficulty',
      'hitpoints', 'respawnCategory', 'locations', 'region', 'elementalResistances',
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

    const creaturesStr = data.map(formatCreature).join(',\n');
    const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;
    fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
    console.log(`\nFile updated with ${found.length} new HP values.`);
  }
};

main().catch(console.error);
