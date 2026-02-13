/**
 * Compare bestiary data against TibiaWiki category pages.
 * Uses MediaWiki API to get ALL category members for each difficulty.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';

const fetchCategoryMembers = (category, continueFrom = '') => {
  return new Promise((resolve, reject) => {
    let url = `${TIBIAWIKI_API}?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=500&format=json`;
    if (continueFrom) url += `&cmcontinue=${encodeURIComponent(continueFrom)}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const members = (json.query?.categorymembers || []).map(m => m.title);
          const cont = json.continue?.cmcontinue || null;
          resolve({ members, cont });
        } catch (err) { reject(err); }
      });
    }).on('error', reject);
  });
};

const fetchAllCategoryMembers = async (category) => {
  let all = [];
  let cont = '';
  do {
    const result = await fetchCategoryMembers(category, cont);
    all = all.concat(result.members);
    cont = result.cont;
  } while (cont);
  return all;
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const main = async () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
  const data = eval(match[1]);

  console.log(`Current bestiary: ${data.length} creatures\n`);

  const categories = [
    { normal: 'Bestiary Harmless Creatures', rare: 'Bestiary Very Rare Harmless Creatures', diff: 'HARMLESS', expNormal: 15, expRare: 1 },
    { normal: 'Bestiary Trivial Creatures', rare: 'Bestiary Very Rare Trivial Creatures', diff: 'TRIVIAL', expNormal: 46, expRare: 4 },
    { normal: 'Bestiary Easy Creatures', rare: 'Bestiary Very Rare Easy Creatures', diff: 'EASY', expNormal: 151, expRare: 8 },
    { normal: 'Bestiary Medium Creatures', rare: 'Bestiary Very Rare Medium Creatures', diff: 'MEDIUM', expNormal: 285, expRare: 25 },
    { normal: 'Bestiary Hard Creatures', rare: 'Bestiary Very Rare Hard Creatures', diff: 'HARD', expNormal: 187, expRare: 0 },
    { normal: 'Bestiary Challenging Creatures', rare: 'Bestiary Very Rare Challenging Creatures', diff: 'CHALLENGING', expNormal: 56, expRare: 0 },
  ];

  const EXCLUDED_FILE = path.join(__dirname, '../src/data/excludedFromBestiary.js');
  const excContent = fs.readFileSync(EXCLUDED_FILE, 'utf8');
  const excMatch = excContent.match(/export const EXCLUDED_CREATURE_IDS = \[([\s\S]*?)\];/);
  const excludedIds = [];
  if (excMatch) {
    const idRegex = /'([^']+)'/g;
    let m;
    while ((m = idRegex.exec(excMatch[1])) !== null) excludedIds.push(m[1]);
  }

  const toId = (name) => name.toLowerCase()
    .replace(/\s*\(creature\)/i, '')
    .replace(/[^a-z0-9\s()-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, function(c) { return c === '(' ? '-' : ''; })
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  for (const cat of categories) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${cat.diff}`);
    console.log(`${'='.repeat(60)}`);

    // Fetch normal
    console.log(`Fetching ${cat.normal}...`);
    const wikiNormal = await fetchAllCategoryMembers(cat.normal);
    await delay(500);

    // Fetch rare
    let wikiRare = [];
    console.log(`Fetching ${cat.rare}...`);
    try {
      wikiRare = await fetchAllCategoryMembers(cat.rare);
    } catch (e) { /* category may not exist */ }
    await delay(500);

    console.log(`Wiki: ${wikiNormal.length} normal, ${wikiRare.length} rare`);
    console.log(`Expected: ${cat.expNormal} normal, ${cat.expRare} rare`);

    // Compare with our data
    const ourCreatures = data.filter(c => c.difficulty === cat.diff);
    const ourNormal = ourCreatures.filter(c => c.creatureCategory !== 'rare');
    const ourRare = ourCreatures.filter(c => c.creatureCategory === 'rare');
    console.log(`Ours: ${ourNormal.length} normal, ${ourRare.length} rare`);

    // Find missing normal
    const ourNames = ourCreatures.map(c => c.name.toLowerCase());
    const ourIds = ourCreatures.map(c => c.id);

    const missingNormal = wikiNormal.filter(wn => {
      const cleanName = wn.replace(/\s*\(Creature\)/i, '').toLowerCase();
      const id = toId(wn);
      return !ourNames.includes(cleanName) && !ourIds.includes(id) &&
        !ourNames.some(n => n === cleanName || n.includes(cleanName) || cleanName.includes(n));
    });

    const missingRare = wikiRare.filter(wr => {
      const cleanName = wr.replace(/\s*\(Creature\)/i, '').toLowerCase();
      const id = toId(wr);
      return !ourNames.includes(cleanName) && !ourIds.includes(id) &&
        !ourNames.some(n => n === cleanName || n.includes(cleanName) || cleanName.includes(n));
    });

    if (missingNormal.length > 0) {
      console.log(`\nMISSING NORMAL (${missingNormal.length}):`);
      missingNormal.forEach(name => {
        const id = toId(name);
        const isExcluded = excludedIds.includes(id);
        console.log(`  ${name}${isExcluded ? ' [EXCLUDED]' : ''}`);
      });
    }

    if (missingRare.length > 0) {
      console.log(`\nMISSING RARE (${missingRare.length}):`);
      missingRare.forEach(name => {
        const id = toId(name);
        const isExcluded = excludedIds.includes(id);
        console.log(`  ${name}${isExcluded ? ' [EXCLUDED]' : ''}`);
      });
    }

    // Find creatures in our data but NOT in wiki
    const wikiAllNames = [...wikiNormal, ...wikiRare].map(n => n.replace(/\s*\(Creature\)/i, '').toLowerCase());
    const extra = ourCreatures.filter(c => {
      return !wikiAllNames.includes(c.name.toLowerCase()) &&
        !wikiAllNames.some(w => w === c.name.toLowerCase() || w.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(w));
    });
    if (extra.length > 0) {
      console.log(`\nEXTRA in our data (not in wiki):`);
      extra.forEach(c => console.log(`  ${c.name} (${c.id}) | ${c.creatureCategory}`));
    }
  }
};

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
