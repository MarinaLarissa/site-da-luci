/**
 * Scrape and add missing trivial creatures from TibiaWiki.
 * Handles name mappings for Portuguese creature names.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';
const DELAY_MS = 1000;

// Creatures to add with their wiki names and local names
const CREATURES_TO_ADD = [
  { localName: 'Horse (Grey)', wikiName: 'Horse (Grey)', id: 'horse-grey', category: 'normal', cp: 5 },
  { localName: 'Horse (Dark Brown)', wikiName: 'Horse (Dark Brown)', id: 'horse-dark-brown', category: 'normal', cp: 5 },
  { localName: 'Horse (Brown)', wikiName: 'Horse (Brown)', id: 'horse-brown', category: 'normal', cp: 5 },
  { localName: 'Muglex Clan Assassin', wikiName: 'Muglex Clan Assassin', id: 'muglex-clan-assassin', category: 'normal', cp: 5 },
  { localName: 'Muglex Clan Footman', wikiName: 'Muglex Clan Footman', id: 'muglex-clan-footman', category: 'normal', cp: 5 },
  { localName: 'White Deer', wikiName: 'White Deer', id: 'white-deer', category: 'normal', cp: 5 },
  { localName: 'Wisp', wikiName: 'Wisp', id: 'wisp', category: 'normal', cp: 5 },
  { localName: 'Imperial', wikiName: 'Imperial', id: 'imperial', category: 'rare', cp: 10 },
];

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
        } catch (err) { reject(err); }
      });
    }).on('error', reject);
  });
};

const parseInfobox = (wikitext) => {
  const result = {};

  // HP
  const hpMatch = wikitext.match(/\|\s*hp\s*=\s*(\d+)/i);
  if (hpMatch) result.hitpoints = parseInt(hpMatch[1]);

  // Location / spawn
  const spawnMatch = wikitext.match(/\|\s*spawn\s*=\s*([^\n|]+)/i) ||
                     wikitext.match(/\|\s*location\s*=\s*([^\n|]+)/i);
  if (spawnMatch) {
    let loc = spawnMatch[1].trim();
    // Clean wiki markup
    loc = loc.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
    loc = loc.replace(/\[\[([^\]]+)\]\]/g, '$1');
    loc = loc.replace(/<[^>]+>/g, '');
    loc = loc.replace(/\{\{[^}]*\}\}/g, '');
    const locations = loc.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0 && s !== '?');
    if (locations.length > 0) result.locations = locations;
  }

  // Resistances
  const resistances = {};
  const resMap = {
    physicalDmgMod: 'physical',
    fireDmgMod: 'fire',
    iceDmgMod: 'ice',
    energyDmgMod: 'energy',
    earthDmgMod: 'earth',
    holyDmgMod: 'holy',
    deathDmgMod: 'death',
  };
  for (const [wikiKey, localKey] of Object.entries(resMap)) {
    const regex = new RegExp(`\\|\\s*${wikiKey}\\s*=\\s*([\\d?]+)%?`, 'i');
    const match = wikitext.match(regex);
    if (match && match[1] !== '?') {
      resistances[localKey] = parseInt(match[1]);
    } else {
      resistances[localKey] = 100; // default
    }
  }
  result.elementalResistances = resistances;

  // killsToComplete for trivial = 500
  result.killsToComplete = 500;

  return result;
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
  console.log(`Current creatures: ${data.length}`);

  const newCreatures = [];

  for (const creature of CREATURES_TO_ADD) {
    // Check if already exists
    if (data.find(c => c.id === creature.id)) {
      console.log(`SKIP: ${creature.localName} (${creature.id}) - already exists`);
      continue;
    }

    console.log(`Fetching: ${creature.wikiName}...`);
    try {
      const wikitext = await fetchWikiText(creature.wikiName);

      if (!wikitext) {
        // Try alternate names
        const altNames = [
          creature.wikiName,
          creature.localName,
          creature.wikiName.replace(/ \([^)]+\)/, ''),
        ];
        let found = false;
        for (const alt of altNames) {
          if (alt === creature.wikiName) continue;
          console.log(`  Trying alternate: ${alt}`);
          const altText = await fetchWikiText(alt);
          if (altText) {
            const info = parseInfobox(altText);
            const entry = {
              id: creature.id,
              name: creature.localName,
              imageUrl: `/images/creatures/${creature.id}.gif`,
              charmPoints: creature.cp,
              difficulty: 'TRIVIAL',
              hitpoints: info.hitpoints || 0,
              creatureCategory: creature.category,
              locations: info.locations || ['Unknown'],
              elementalResistances: info.elementalResistances,
              killsToComplete: 500,
            };
            newCreatures.push(entry);
            console.log(`  OK: HP=${entry.hitpoints}, locations=${entry.locations.join(', ')}`);
            found = true;
            break;
          }
          await delay(DELAY_MS);
        }
        if (!found) {
          console.log(`  NOT FOUND on wiki. Adding with defaults.`);
          newCreatures.push({
            id: creature.id,
            name: creature.localName,
            imageUrl: `/images/creatures/${creature.id}.gif`,
            charmPoints: creature.cp,
            difficulty: 'TRIVIAL',
            hitpoints: 0,
            creatureCategory: creature.category,
            locations: ['Unknown'],
            elementalResistances: { physical: 100, fire: 100, ice: 100, energy: 100, earth: 100, holy: 100, death: 100 },
            killsToComplete: 500,
          });
        }
      } else {
        const info = parseInfobox(wikitext);
        const entry = {
          id: creature.id,
          name: creature.localName,
          imageUrl: `/images/creatures/${creature.id}.gif`,
          charmPoints: creature.cp,
          difficulty: 'TRIVIAL',
          hitpoints: info.hitpoints || 0,
          creatureCategory: creature.category,
          locations: info.locations || ['Unknown'],
          elementalResistances: info.elementalResistances,
          killsToComplete: 500,
        };
        newCreatures.push(entry);
        console.log(`  OK: HP=${entry.hitpoints}, locations=${entry.locations.join(', ')}`);
      }
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
      newCreatures.push({
        id: creature.id,
        name: creature.localName,
        imageUrl: `/images/creatures/${creature.id}.gif`,
        charmPoints: creature.cp,
        difficulty: 'TRIVIAL',
        hitpoints: 0,
        creatureCategory: creature.category,
        locations: ['Unknown'],
        elementalResistances: { physical: 100, fire: 100, ice: 100, energy: 100, earth: 100, holy: 100, death: 100 },
        killsToComplete: 500,
      });
    }
    await delay(DELAY_MS);
  }

  // Add new creatures to data (sorted alphabetically)
  const allData = [...data, ...newCreatures].sort((a, b) => a.name.localeCompare(b.name));
  console.log(`\nTotal after adding: ${allData.length} (added ${newCreatures.length})`);

  // Print new creatures
  console.log('\n=== New creatures added ===');
  newCreatures.forEach(c => {
    console.log(`  ${c.name} (${c.id}) | HP=${c.hitpoints} | ${c.creatureCategory} | CP=${c.charmPoints}`);
    console.log(`    Locations: ${c.locations.join(', ')}`);
    const r = c.elementalResistances;
    console.log(`    Resistances: phys=${r.physical}% fire=${r.fire}% ice=${r.ice}% energy=${r.energy}% earth=${r.earth}% holy=${r.holy}% death=${r.death}%`);
  });

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

  const creaturesStr = allData.map(formatCreature).join(',\n');
  const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesStr + '\n];' + footer;
  fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
  console.log('File updated.');
};

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
