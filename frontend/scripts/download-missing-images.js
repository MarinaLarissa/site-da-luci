/**
 * Download missing creature images from TibiaWiki.
 * Checks which images are missing locally and downloads them.
 * Uses Special:FilePath/{CreatureName}.gif from tibia.fandom.com
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');
const DELAY_MS = 300;
const MAX_CONCURRENT = 5;

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const doRequest = (reqUrl, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      const mod = reqUrl.startsWith('https') ? https : require('http');
      mod.get(reqUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return doRequest(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Status: ${res.statusCode}`));
        }
        const stream = fs.createWriteStream(filepath);
        res.pipe(stream);
        stream.on('finish', () => { stream.close(); resolve(); });
        stream.on('error', reject);
      }).on('error', reject);
    };
    doRequest(url);
  });
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * Convert creature name to TibiaWiki image filename.
 * TibiaWiki uses "Creature_Name.gif" format.
 */
const nameToWikiFilename = (name) => {
  return name
    .replace(/'/g, '%27')
    .replace(/ /g, '_')
    + '.gif';
};

/**
 * Generate name variations for hard-to-find images.
 */
const getNameVariations = (name) => {
  const variations = [name];

  // If name has parentheses like "Horse (Brown)", try "Horse_(Brown)"
  // TibiaWiki sometimes uses different formats

  // Try removing "(Creature)" suffix
  if (name.includes('(') && name.includes(')')) {
    const withoutParens = name.replace(/\s*\([^)]+\)/, '').trim();
    variations.push(withoutParens);
  }

  // Try with "Creature" disambiguation
  variations.push(`${name} (Creature)`);

  return [...new Set(variations)];
};

const main = async () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
  const data = eval(match[1]);

  const existingImages = new Set(fs.readdirSync(IMAGES_DIR).map(f => f.toLowerCase()));

  const missing = data.filter(c => {
    const filename = c.imageUrl.split('/').pop();
    return !existingImages.has(filename.toLowerCase());
  });

  console.log(`Total creatures: ${data.length}`);
  console.log(`Missing images: ${missing.length}`);

  if (missing.length === 0) {
    console.log('All images present!');
    return;
  }

  let downloaded = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < missing.length; i += MAX_CONCURRENT) {
    const batch = missing.slice(i, i + MAX_CONCURRENT);
    const results = await Promise.allSettled(batch.map(async (creature) => {
      const targetFile = creature.imageUrl.split('/').pop();
      const filepath = path.join(IMAGES_DIR, targetFile);

      const variations = getNameVariations(creature.name);

      for (const nameVar of variations) {
        const wikiFilename = nameToWikiFilename(nameVar);
        const url = `https://tibia.fandom.com/wiki/Special:FilePath/${wikiFilename}`;

        try {
          await downloadImage(url, filepath);
          console.log(`  OK: ${creature.name} (${targetFile})`);
          return true;
        } catch (e) {
          // Try next variation
        }
      }

      throw new Error(`Not found for: ${creature.name}`);
    }));

    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') {
        downloaded++;
      } else {
        failed++;
        failures.push(batch[idx].name);
        console.log(`  FAIL: ${batch[idx].name} - ${r.reason.message}`);
      }
    });

    if (i + MAX_CONCURRENT < missing.length) await delay(DELAY_MS);
  }

  console.log(`\nDone! Downloaded: ${downloaded}, Failed: ${failed}`);
  if (failures.length > 0) {
    console.log('\nFailed creatures:');
    failures.forEach(n => console.log(`  - ${n}`));
  }
};

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
