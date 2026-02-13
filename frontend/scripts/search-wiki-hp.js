/**
 * Search TibiaWiki for creatures not found by exact name
 */
const https = require('https');

const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const creatures = [
  'An Eye', 'Billdodger', 'Blight Spitter', 'Blightling',
  'Blood Guardian', 'Blood Pool', 'Blooming Tower (Light Blue)',
  'Blooming Tower (Red)', 'Blooming Tower (Violet)', 'Blooming Tower (Yellow)',
  'Bone Bear', 'Bone Overlord', 'Bonelord Totem', "Bonelord's Phylactery",
  'Bound Ape', 'Bound Cave Spider', 'Bound Iks Aucar', 'Bright Crystal',
  'Charged Imp', 'Court Warlock', 'Dangerous Apparatus', 'Decaying Totem',
  'Digestive Ooze'
];

const main = async () => {
  for (const name of creatures) {
    const searchUrl = `${TIBIAWIKI_API}?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json&srlimit=3`;
    const result = await fetch(searchUrl);

    const hits = result.query?.search || [];
    if (hits.length > 0) {
      console.log(`${name}:`);
      hits.forEach(h => console.log(`  -> "${h.title}"`));

      // Try to get HP from first result
      const pageUrl = `${TIBIAWIKI_API}?action=parse&page=${encodeURIComponent(hits[0].title)}&format=json&prop=wikitext`;
      const pageResult = await fetch(pageUrl);
      const wikitext = pageResult.parse?.wikitext?.['*'] || '';
      const hpMatch = wikitext.match(/\|\s*hp\s*=\s*([0-9]+)/i);
      if (hpMatch) {
        console.log(`  HP = ${hpMatch[1]}`);
      } else {
        console.log(`  HP not found in page`);
      }
    } else {
      console.log(`${name}: no results`);
    }
    await delay(800);
  }
};

main().catch(console.error);
