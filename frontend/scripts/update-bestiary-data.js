/**
 * Script to update bestiary.js with missing data from TibiaWiki
 * - Fetches missing hitpoints and elementalResistances
 * - Removes deprecated fields (estimatedHours, recommendedLevel)
 *
 * Usage: node frontend/scripts/update-bestiary-data.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';
const DELAY_MS = 800;

const fetchWikiText = (creatureName) => {
  return new Promise((resolve, reject) => {
    const url = `${TIBIAWIKI_API}?action=parse&page=${encodeURIComponent(creatureName)}&format=json&prop=wikitext`;

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
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
};

const parseHitpoints = (wikitext) => {
  const regex = /\|\s*hp\s*=\s*([0-9]+)/i;
  const match = wikitext.match(regex);
  return match ? parseInt(match[1]) : null;
};

const parseResistances = (wikitext) => {
  const mapping = {
    physicalDmgMod: 'physical',
    fireDmgMod: 'fire',
    iceDmgMod: 'ice',
    energyDmgMod: 'energy',
    earthDmgMod: 'earth',
    holyDmgMod: 'holy',
    deathDmgMod: 'death',
  };

  const resistances = {};
  let found = false;

  Object.entries(mapping).forEach(([wikiKey, ourKey]) => {
    const regex = new RegExp(`\\|\\s*${wikiKey}\\s*=\\s*([0-9]+)%?`, 'i');
    const match = wikitext.match(regex);
    if (match) {
      resistances[ourKey] = parseInt(match[1]);
      found = true;
    } else {
      resistances[ourKey] = 100;
    }
  });

  return found ? resistances : null;
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const main = async () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
  if (!match) {
    console.log('Could not find BESTIARY_DATA');
    process.exit(1);
  }

  const data = eval(match[1]);
  console.log(`Total creatures: ${data.length}`);

  // Find creatures needing scraping
  const needsHP = data.filter(c => !c.hitpoints);
  const needsResistances = data.filter(c => !c.elementalResistances);
  const needsScraping = data.filter(c => !c.hitpoints || !c.elementalResistances);

  console.log(`Missing hitpoints: ${needsHP.length}`);
  console.log(`Missing resistances: ${needsResistances.length}`);
  console.log(`Total to scrape: ${needsScraping.length}`);

  // Scrape missing data
  let scraped = 0;
  let failed = [];

  for (const creature of needsScraping) {
    try {
      const wikitext = await fetchWikiText(creature.name);

      if (!wikitext) {
        failed.push(creature.name);
        console.log(`  MISS ${creature.name} - page not found`);
        await delay(DELAY_MS);
        continue;
      }

      if (!creature.hitpoints) {
        const hp = parseHitpoints(wikitext);
        if (hp) {
          creature.hitpoints = hp;
        }
      }

      if (!creature.elementalResistances) {
        const res = parseResistances(wikitext);
        if (res) {
          creature.elementalResistances = res;
        }
      }

      scraped++;
      const status = `[${scraped}/${needsScraping.length}]`;
      console.log(`  OK ${status} ${creature.name} - HP: ${creature.hitpoints || '?'}`);

    } catch (err) {
      failed.push(creature.name);
      console.log(`  ERR ${creature.name}: ${err.message}`);
    }

    await delay(DELAY_MS);
  }

  // Remove deprecated fields from ALL creatures
  let deprecatedRemoved = 0;
  for (const creature of data) {
    if (creature.estimatedHours !== undefined) {
      delete creature.estimatedHours;
      deprecatedRemoved++;
    }
    if (creature.recommendedLevel !== undefined) {
      delete creature.recommendedLevel;
    }
  }

  console.log(`\nDeprecated fields removed from: ${deprecatedRemoved} creatures`);

  if (failed.length > 0) {
    console.log(`\nFailed to scrape (${failed.length}):`);
    failed.forEach(n => console.log(`  - ${n}`));
  }

  // Rebuild the file
  const header = content.split('export const BESTIARY_DATA = [')[0];

  // Build each creature with consistent field ordering
  const fieldOrder = [
    'id', 'name', 'imageUrl', 'charmPoints', 'difficulty', 'officialDifficulty',
    'hitpoints', 'respawnCategory', 'locations', 'region', 'elementalResistances',
    'killsToComplete'
  ];

  const formatCreature = (c) => {
    const lines = ['  {'];

    // First output ordered fields
    for (const key of fieldOrder) {
      if (c[key] !== undefined) {
        const val = JSON.stringify(c[key]);
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
          if (c[key].length === 1) {
            lines.push(`    "locations": [${JSON.stringify(c[key][0])}],`);
          } else {
            lines.push(`    "locations": [`);
            c[key].forEach((loc, i) => {
              const comma = i < c[key].length - 1 ? ',' : '';
              lines.push(`      ${JSON.stringify(loc)}${comma}`);
            });
            lines.push(`    ],`);
          }
        } else {
          lines.push(`    ${JSON.stringify(key)}: ${val},`);
        }
      }
    }

    // Then any extra fields not in the order list
    for (const key of Object.keys(c)) {
      if (!fieldOrder.includes(key) && key !== 'estimatedHours' && key !== 'recommendedLevel') {
        lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(c[key])},`);
      }
    }

    // Remove trailing comma from last property
    const lastIdx = lines.length - 1;
    lines[lastIdx] = lines[lastIdx].replace(/,$/, '');

    lines.push('  }');
    return lines.join('\n');
  };

  const creaturesStr = data.map(formatCreature).join(',\n');
  // Preserve everything after the BESTIARY_DATA array closing
  const footerMatch = content.match(/\];\s*(\/\*\*[\s\S]*)?$/);
  const footer = footerMatch ? footerMatch[0].replace(/^\];/, '') : '\n\nexport const VALID_BESTIARY_DATA = filterValidBestiaryCreatures(BESTIARY_DATA);\n';
  const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;

  // Backup
  const backupFile = BESTIARY_FILE + '.backup';
  fs.writeFileSync(backupFile, content, 'utf8');
  console.log(`Backup saved to: ${backupFile}`);

  fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');

  // Final stats
  const stillMissingHP = data.filter(c => !c.hitpoints).length;
  const stillMissingRes = data.filter(c => !c.elementalResistances).length;
  console.log(`\nFinal stats:`);
  console.log(`  Still missing HP: ${stillMissingHP}`);
  console.log(`  Still missing resistances: ${stillMissingRes}`);
  console.log(`  Done!`);
};

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
