/**
 * Check which creatures are missing images locally.
 * Lists creatures whose image file doesn't exist in public/images/creatures/
 */
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');

const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(match[1]);

const existingImages = new Set(fs.readdirSync(IMAGES_DIR).map(f => f.toLowerCase()));

const missing = [];
data.forEach(c => {
  // imageUrl is like "/images/creatures/acid-blob.gif" or similar
  const filename = c.imageUrl.split('/').pop();
  if (!existingImages.has(filename.toLowerCase())) {
    missing.push({ id: c.id, name: c.name, imageUrl: c.imageUrl, expectedFile: filename });
  }
});

console.log(`Total creatures: ${data.length}`);
console.log(`Total images: ${existingImages.size}`);
console.log(`Missing images: ${missing.length}`);

if (missing.length > 0) {
  console.log('\nMissing:');
  missing.forEach(m => console.log(`  ${m.name} -> ${m.expectedFile}`));
}
