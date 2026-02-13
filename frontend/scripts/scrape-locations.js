/**
 * Scrape missing creature locations from TibiaWiki.
 * Looks at the "Fixed Locations" section in the creature wiki page.
 *
 * Usage: node frontend/scripts/scrape-locations.js
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

/**
 * Parse "spawn" or "location" fields from TibiaWiki wikitext.
 * The field is usually called "spawn" or "location" in the creature infobox.
 */
const parseLocations = (wikitext) => {
  // Try multiple location field patterns from TibiaWiki infobox
  const patterns = [
    /\|\s*spawn\s*=\s*([^\n|]+)/i,
    /\|\s*location\s*=\s*([^\n|]+)/i,
    /\|\s*spawntype\s*=\s*([^\n|]+)/i,
  ];

  for (const regex of patterns) {
    const match = wikitext.match(regex);
    if (match) {
      const raw = match[1].trim();
      if (raw && raw !== '?' && raw.toLowerCase() !== 'unknown') {
        return parseLocationString(raw);
      }
    }
  }

  // Try to find "Fixed Locations" section
  const fixedLocMatch = wikitext.match(/==\s*Fixed Locations?\s*==\s*\n([\s\S]*?)(?:\n==|$)/i);
  if (fixedLocMatch) {
    const section = fixedLocMatch[1].trim();
    if (section && section !== '?' && section.toLowerCase() !== 'unknown') {
      return parseLocationSection(section);
    }
  }

  return null;
};

/**
 * Parse a location string, removing wiki markup
 */
const parseLocationString = (raw) => {
  // Remove wiki links [[Place|display]] -> display or Place
  let cleaned = raw.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  cleaned = cleaned.replace(/\[\[([^\]]+)\]\]/g, '$1');
  // Remove other wiki markup
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/\{\{[^}]+\}\}/g, '');

  // Split by common delimiters
  const locations = cleaned.split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s !== '?' && s.toLowerCase() !== 'unknown');

  return locations.length > 0 ? locations : null;
};

/**
 * Parse a "Fixed Locations" wiki section
 */
const parseLocationSection = (section) => {
  // Remove wiki markup
  let cleaned = section.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  cleaned = cleaned.replace(/\[\[([^\]]+)\]\]/g, '$1');
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  cleaned = cleaned.replace(/\{\{[^}]+\}\}/g, '');

  // Split into lines and extract location names
  const lines = cleaned.split('\n')
    .map(l => l.replace(/^\*\s*/, '').trim())
    .filter(l => l.length > 0 && l !== '?' && l.toLowerCase() !== 'unknown');

  return lines.length > 0 ? lines : null;
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

  // Find creatures with Unknown locations
  const needsLocations = data.filter(c =>
    !c.locations || c.locations.length === 0 ||
    (c.locations.length === 1 && c.locations[0] === 'Unknown')
  );

  console.log(`Creatures with Unknown locations: ${needsLocations.length}`);

  let found = 0;
  let failed = [];
  let notFound = [];

  for (let i = 0; i < needsLocations.length; i++) {
    const creature = needsLocations[i];
    const status = `[${i + 1}/${needsLocations.length}]`;

    try {
      const wikitext = await fetchWikiText(creature.name);

      if (!wikitext) {
        notFound.push(creature.name);
        console.log(`  MISS ${status} ${creature.name} - page not found`);
        await delay(DELAY_MS);
        continue;
      }

      const locations = parseLocations(wikitext);

      if (locations) {
        creature.locations = locations;
        found++;
        console.log(`  OK   ${status} ${creature.name} -> ${locations.join(', ')}`);
      } else {
        notFound.push(creature.name);
        console.log(`  NONE ${status} ${creature.name} - no location data found`);
      }
    } catch (err) {
      failed.push(creature.name);
      console.log(`  ERR  ${status} ${creature.name}: ${err.message}`);
    }

    await delay(DELAY_MS);
  }

  console.log(`\nResults:`);
  console.log(`  Found locations: ${found}`);
  console.log(`  No location data: ${notFound.length}`);
  console.log(`  Errors: ${failed.length}`);

  if (notFound.length > 0) {
    console.log(`\nCreatures without location data (${notFound.length}):`);
    notFound.forEach(n => console.log(`  - ${n}`));
  }

  if (failed.length > 0) {
    console.log(`\nFailed to scrape (${failed.length}):`);
    failed.forEach(n => console.log(`  - ${n}`));
  }

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
  console.log('\nFile updated.');
};

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
