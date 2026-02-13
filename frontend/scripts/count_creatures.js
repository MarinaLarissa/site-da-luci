const fs = require('fs');

const content = fs.readFileSync('./frontend/src/data/bestiary.js', 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
if (!match) { console.log('Could not find BESTIARY_DATA'); process.exit(1); }
const data = eval(match[1]);

console.log('Total creatures:', data.length);
console.log('\n=== Counts by Difficulty x Rarity ===');

const counts = {};
data.forEach(c => {
  const diff = c.difficulty || 'UNKNOWN';
  const rarity = c.creatureCategory || 'normal';
  counts[rarity + '|' + diff] = (counts[rarity + '|' + diff] || 0) + 1;
});

const diffs = ['HARMLESS', 'TRIVIAL', 'EASY', 'MEDIUM', 'HARD', 'CHALLENGING', 'UNKNOWN'];
const expected = {
  'normal|HARMLESS': 15, 'normal|TRIVIAL': 46, 'normal|EASY': 151, 'normal|MEDIUM': 285, 'normal|HARD': 187, 'normal|CHALLENGING': 56,
  'rare|HARMLESS': 1, 'rare|TRIVIAL': 4, 'rare|EASY': 8, 'rare|MEDIUM': 25, 'rare|HARD': 0, 'rare|CHALLENGING': 0
};

let totalNormal = 0, totalRare = 0;
for (const d of diffs) {
  const n = counts['normal|' + d] || 0;
  const r = counts['rare|' + d] || 0;
  const expN = expected['normal|' + d] || 0;
  const expR = expected['rare|' + d] || 0;
  totalNormal += n;
  totalRare += r;
  if (n > 0 || r > 0 || expN > 0 || expR > 0) {
    const diffN = expN - n;
    const diffR = expR - r;
    console.log(`${d}:`);
    console.log(`  Normal: ${n} (expected ${expN}, ${diffN > 0 ? 'missing ' + diffN : diffN === 0 ? 'OK' : 'extra ' + Math.abs(diffN)})`);
    console.log(`  Rare:   ${r} (expected ${expR}, ${diffR > 0 ? 'missing ' + diffR : diffR === 0 ? 'OK' : 'extra ' + Math.abs(diffR)})`);
  }
}
console.log(`\nTotal normal: ${totalNormal} (expected 740, ${740 - totalNormal > 0 ? 'missing ' + (740 - totalNormal) : 'OK'})`);
console.log(`Total rare: ${totalRare} (expected 38, ${38 - totalRare > 0 ? 'missing ' + (38 - totalRare) : 'OK'})`);
console.log(`Grand total: ${totalNormal + totalRare} (expected 778, ${778 - totalNormal - totalRare > 0 ? 'missing ' + (778 - totalNormal - totalRare) : 'OK'})`);

// Charm points
let cpNormal = 0, cpRare = 0;
data.forEach(c => {
  if (c.creatureCategory === 'rare') cpRare += c.charmPoints;
  else cpNormal += c.charmPoints;
});
console.log(`\n=== Current Charm Points ===`);
console.log(`Normal: ${cpNormal} (expected 24585)`);
console.log(`Rare: ${cpRare} (expected 1535)`);
console.log(`Total: ${cpNormal + cpRare} (expected 26120)`);

// List rare creatures
console.log('\n=== All Rare Creatures ===');
data.filter(c => c.creatureCategory === 'rare').forEach(c => {
  console.log(`  ${c.name} | ${c.difficulty} | CP=${c.charmPoints}`);
});
