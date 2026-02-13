/**
 * Fetch and add missing HARD and CHALLENGING creatures from TibiaWiki.
 * Uses MediaWiki API to get category members and creature data.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const EXCLUDED_FILE = path.join(__dirname, '../src/data/excludedFromBestiary.js');
const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';
const DELAY_MS = 600;

const fetchJSON = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (err) { reject(err); }
      });
    }).on('error', reject);
  });
};

const fetchAllCategoryMembers = async (category) => {
  let all = [];
  let cont = '';
  do {
    let url = `${TIBIAWIKI_API}?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=500&format=json`;
    if (cont) url += `&cmcontinue=${encodeURIComponent(cont)}`;
    const json = await fetchJSON(url);
    all = all.concat((json.query?.categorymembers || []).map(m => m.title));
    cont = json.continue?.cmcontinue || null;
  } while (cont);
  return all;
};

const fetchWikiText = async (pageName) => {
  const url = `${TIBIAWIKI_API}?action=parse&page=${encodeURIComponent(pageName)}&format=json&prop=wikitext`;
  const json = await fetchJSON(url);
  return json.parse?.wikitext?.['*'] || null;
};

const parseCreatureData = (wikitext) => {
  const result = {};

  // HP
  const hpMatch = wikitext.match(/\|\s*hp\s*=\s*(\d+)/i);
  if (hpMatch) result.hitpoints = parseInt(hpMatch[1]);

  // Location / spawn
  const spawnMatch = wikitext.match(/\|\s*spawn\s*=\s*([^\n|]+)/i) ||
                     wikitext.match(/\|\s*location\s*=\s*([^\n|]+)/i);
  if (spawnMatch) {
    let loc = spawnMatch[1].trim();
    loc = loc.replace(/\[https?:\/\/\S+\s+([^\]]+)\]/g, '$1');
    loc = loc.replace(/https?:\/\/\S+/g, '');
    loc = loc.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
    loc = loc.replace(/\[\[([^\]]+)\]\]/g, '$1');
    loc = loc.replace(/<[^>]+>/g, '');
    loc = loc.replace(/\{\{[^}]*\}\}/g, '');
    loc = loc.replace(/''/g, '');
    loc = loc.replace(/\(\s*\)/g, '');
    loc = loc.replace(/\(\s*$/g, '');
    loc = loc.replace(/\s{2,}/g, ' ');
    const locations = loc.split(/[,;]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s !== '?' && s.toLowerCase() !== 'unknown')
      .map(s => s.replace(/^and\s+/i, '').replace(/\.\s*$/, '').trim())
      .filter(s => s.length > 1);
    if (locations.length > 0) result.locations = locations;
  }

  // Resistances
  const resistances = {};
  const resMap = {
    physicalDmgMod: 'physical', fireDmgMod: 'fire', iceDmgMod: 'ice',
    energyDmgMod: 'energy', earthDmgMod: 'earth', holyDmgMod: 'holy', deathDmgMod: 'death',
  };
  for (const [wikiKey, localKey] of Object.entries(resMap)) {
    const regex = new RegExp(`\\|\\s*${wikiKey}\\s*=\\s*([\\d?]+)%?`, 'i');
    const match = wikitext.match(regex);
    if (match && match[1] !== '?') {
      resistances[localKey] = parseInt(match[1]);
    } else {
      resistances[localKey] = 100;
    }
  }
  result.elementalResistances = resistances;

  return result;
};

const toId = (name) => name.toLowerCase()
  .replace(/\s*\(creature\)/i, '')
  .replace(/'/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const main = async () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
  const data = eval(match[1]);

  // Load excluded IDs
  const excContent = fs.readFileSync(EXCLUDED_FILE, 'utf8');
  const excMatch = excContent.match(/export const EXCLUDED_CREATURE_IDS = \[([\s\S]*?)\];/);
  const excludedIds = [];
  if (excMatch) {
    const idRegex = /'([^']+)'/g;
    let m;
    while ((m = idRegex.exec(excMatch[1])) !== null) excludedIds.push(m[1]);
  }

  console.log(`Current creatures: ${data.length}`);
  const existingIds = new Set(data.map(c => c.id));
  const existingNames = new Set(data.map(c => c.name.toLowerCase()));

  const difficulties = [
    { category: 'Bestiary Hard Creatures', diff: 'HARD', cp: 50, kills: 2500 },
    { category: 'Bestiary Challenging Creatures', diff: 'CHALLENGING', cp: 100, kills: 5000 },
  ];

  let totalAdded = 0;

  for (const diffInfo of difficulties) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Fetching ${diffInfo.diff} creatures...`);

    const wikiCreatures = await fetchAllCategoryMembers(diffInfo.category);
    console.log(`Wiki has ${wikiCreatures.length} ${diffInfo.diff} creatures`);

    // Find missing ones
    const missing = wikiCreatures.filter(name => {
      const cleanName = name.replace(/\s*\(Creature\)/i, '');
      const id = toId(name);
      return !existingIds.has(id) && !existingNames.has(cleanName.toLowerCase()) && !excludedIds.includes(id);
    });

    console.log(`Missing (not excluded): ${missing.length}`);

    let added = 0;
    let failed = [];

    for (let i = 0; i < missing.length; i++) {
      const wikiName = missing[i];
      const cleanName = wikiName.replace(/\s*\(Creature\)/i, '');
      const id = toId(wikiName);
      const status = `[${i + 1}/${missing.length}]`;

      try {
        const wikitext = await fetchWikiText(wikiName);
        if (!wikitext) {
          console.log(`  MISS ${status} ${cleanName}`);
          failed.push(cleanName);
          await delay(DELAY_MS);
          continue;
        }

        const info = parseCreatureData(wikitext);
        const entry = {
          id,
          name: cleanName,
          imageUrl: `/images/creatures/${id}.gif`,
          charmPoints: diffInfo.cp,
          difficulty: diffInfo.diff,
          hitpoints: info.hitpoints || 0,
          creatureCategory: 'normal',
          locations: info.locations || ['Unknown'],
          elementalResistances: info.elementalResistances,
          killsToComplete: diffInfo.kills,
        };

        data.push(entry);
        existingIds.add(id);
        existingNames.add(cleanName.toLowerCase());
        added++;

        const hp = info.hitpoints || '?';
        const loc = (info.locations || ['Unknown']).slice(0, 2).join(', ');
        console.log(`  OK   ${status} ${cleanName} | HP=${hp} | ${loc}`);
      } catch (err) {
        console.log(`  ERR  ${status} ${cleanName}: ${err.message}`);
        failed.push(cleanName);
      }

      await delay(DELAY_MS);
    }

    console.log(`\n${diffInfo.diff}: Added ${added}, Failed ${failed.length}`);
    if (failed.length > 0) {
      console.log(`Failed: ${failed.join(', ')}`);
    }
    totalAdded += added;
  }

  // Sort alphabetically
  data.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`\nTotal creatures after: ${data.length} (added ${totalAdded})`);

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
};

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
