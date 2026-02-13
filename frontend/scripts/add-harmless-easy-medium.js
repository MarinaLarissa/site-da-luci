/**
 * Add missing HARMLESS, EASY, and MEDIUM creatures from TibiaWiki.
 * Also fixes EASY creatures that should be rare.
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
  const hpMatch = wikitext.match(/\|\s*hp\s*=\s*(\d+)/i);
  if (hpMatch) result.hitpoints = parseInt(hpMatch[1]);

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
      .map(s => s.trim().replace(/^and\s+/i, '').replace(/\.\s*$/, '').trim())
      .filter(s => s.length > 1 && s !== '?' && s.toLowerCase() !== 'unknown');
    if (locations.length > 0) result.locations = locations;
  }

  const resistances = {};
  const resMap = {
    physicalDmgMod: 'physical', fireDmgMod: 'fire', iceDmgMod: 'ice',
    energyDmgMod: 'energy', earthDmgMod: 'earth', holyDmgMod: 'holy', deathDmgMod: 'death',
  };
  for (const [wikiKey, localKey] of Object.entries(resMap)) {
    const regex = new RegExp(`\\|\\s*${wikiKey}\\s*=\\s*([\\d?]+)%?`, 'i');
    const match = wikitext.match(regex);
    resistances[localKey] = (match && match[1] !== '?') ? parseInt(match[1]) : 100;
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

  const excContent = fs.readFileSync(EXCLUDED_FILE, 'utf8');
  const excMatch = excContent.match(/export const EXCLUDED_CREATURE_IDS = \[([\s\S]*?)\];/);
  const excludedIds = new Set();
  if (excMatch) {
    const idRegex = /'([^']+)'/g;
    let m;
    while ((m = idRegex.exec(excMatch[1])) !== null) excludedIds.add(m[1]);
  }

  console.log(`Current creatures: ${data.length}`);
  const existingById = new Map(data.map(c => [c.id, c]));
  const existingByName = new Map(data.map(c => [c.name.toLowerCase(), c]));

  const findExisting = (wikiName) => {
    const cleanName = wikiName.replace(/\s*\(Creature\)/i, '');
    const id = toId(wikiName);
    return existingById.get(id) || existingByName.get(cleanName.toLowerCase()) || null;
  };

  const diffConfig = {
    HARMLESS: { cp: 1, rareCp: 5, kills: 250 },
    EASY: { cp: 15, rareCp: 30, kills: 1000 },
    MEDIUM: { cp: 25, rareCp: 50, kills: 1000 },
  };

  const categories = [
    { normal: 'Bestiary Harmless Creatures', rare: 'Bestiary Very Rare Harmless Creatures', diff: 'HARMLESS' },
    { normal: 'Bestiary Easy Creatures', rare: 'Bestiary Very Rare Easy Creatures', diff: 'EASY' },
    { normal: 'Bestiary Medium Creatures', rare: 'Bestiary Very Rare Medium Creatures', diff: 'MEDIUM' },
  ];

  let totalAdded = 0;
  let totalUpdated = 0;

  for (const cat of categories) {
    const conf = diffConfig[cat.diff];
    console.log(`\n${'='.repeat(50)}`);
    console.log(`${cat.diff} (CP: normal=${conf.cp}, rare=${conf.rareCp})`);

    // Fetch wiki categories
    const wikiNormal = await fetchAllCategoryMembers(cat.normal);
    await delay(300);
    let wikiRare = [];
    try { wikiRare = await fetchAllCategoryMembers(cat.rare); } catch(e) {}
    await delay(300);

    console.log(`Wiki: ${wikiNormal.length} normal, ${wikiRare.length} rare`);

    // 1. Fix existing creatures that should be rare
    const rareNames = new Set(wikiRare.map(n => n.replace(/\s*\(Creature\)/i, '').toLowerCase()));
    let updatedToRare = 0;
    for (const wikiName of wikiRare) {
      const existing = findExisting(wikiName);
      if (existing && existing.creatureCategory !== 'rare') {
        console.log(`  UPDATE -> rare: ${existing.name} (CP ${existing.charmPoints} -> ${conf.rareCp})`);
        existing.creatureCategory = 'rare';
        existing.charmPoints = conf.rareCp;
        updatedToRare++;
        totalUpdated++;
      }
    }
    if (updatedToRare > 0) console.log(`  Updated ${updatedToRare} to rare`);

    // 2. Add missing normal creatures
    let addedNormal = 0;
    for (let i = 0; i < wikiNormal.length; i++) {
      const wikiName = wikiNormal[i];
      const cleanName = wikiName.replace(/\s*\(Creature\)/i, '');
      const id = toId(wikiName);

      if (findExisting(wikiName)) continue;
      if (excludedIds.has(id)) continue;

      try {
        const wikitext = await fetchWikiText(wikiName);
        if (!wikitext) { console.log(`  MISS: ${cleanName}`); await delay(DELAY_MS); continue; }

        const info = parseCreatureData(wikitext);
        const entry = {
          id, name: cleanName,
          imageUrl: `/images/creatures/${id}.gif`,
          charmPoints: conf.cp,
          difficulty: cat.diff,
          hitpoints: info.hitpoints || 0,
          creatureCategory: 'normal',
          locations: info.locations || ['Unknown'],
          elementalResistances: info.elementalResistances,
          killsToComplete: conf.kills,
        };
        data.push(entry);
        existingById.set(id, entry);
        existingByName.set(cleanName.toLowerCase(), entry);
        addedNormal++;
        totalAdded++;

        const hp = info.hitpoints || '?';
        const loc = (info.locations || ['Unknown']).slice(0, 2).join(', ');
        console.log(`  ADD   [${addedNormal}] ${cleanName} | HP=${hp} | ${loc}`);
      } catch (err) {
        console.log(`  ERR: ${cleanName}: ${err.message}`);
      }
      await delay(DELAY_MS);
    }

    // 3. Add missing rare creatures (not excluded)
    let addedRare = 0;
    for (const wikiName of wikiRare) {
      const cleanName = wikiName.replace(/\s*\(Creature\)/i, '');
      const id = toId(wikiName);

      if (findExisting(wikiName)) continue;
      if (excludedIds.has(id)) continue;

      try {
        const wikitext = await fetchWikiText(wikiName);
        if (!wikitext) { console.log(`  MISS rare: ${cleanName}`); await delay(DELAY_MS); continue; }

        const info = parseCreatureData(wikitext);
        const entry = {
          id, name: cleanName,
          imageUrl: `/images/creatures/${id}.gif`,
          charmPoints: conf.rareCp,
          difficulty: cat.diff,
          hitpoints: info.hitpoints || 0,
          creatureCategory: 'rare',
          locations: info.locations || ['Unknown'],
          elementalResistances: info.elementalResistances,
          killsToComplete: conf.kills,
        };
        data.push(entry);
        existingById.set(id, entry);
        existingByName.set(cleanName.toLowerCase(), entry);
        addedRare++;
        totalAdded++;

        const hp = info.hitpoints || '?';
        console.log(`  ADD RARE [${addedRare}] ${cleanName} | HP=${hp} | CP=${conf.rareCp}`);
      } catch (err) {
        console.log(`  ERR rare: ${cleanName}: ${err.message}`);
      }
      await delay(DELAY_MS);
    }

    console.log(`\n${cat.diff}: Added ${addedNormal} normal + ${addedRare} rare, Updated ${updatedToRare} to rare`);
  }

  data.sort((a, b) => a.name.localeCompare(b.name));
  console.log(`\nTotal creatures: ${data.length} (added ${totalAdded}, updated ${totalUpdated})`);

  // Rebuild file
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
};

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
