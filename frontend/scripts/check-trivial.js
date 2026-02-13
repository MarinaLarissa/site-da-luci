const fs = require('fs');
const path = require('path');
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const c = fs.readFileSync(BESTIARY_FILE, 'utf8');
const m = c.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(m[1]);

// User's complete list of Trivial creatures
const userList = [
  'Agrestic Chicken',
  'Badger',
  'Bat',
  'Black Sheep',
  'Bog Frog',
  'Bug',
  'Cave Parrot',
  'Cave Rat',
  'Chicken',
  'Corrupted Ghost',
  'Corrupted Skeleton',
  'Deer',
  'Dromedary',
  'Fish',
  'Flamingo',
  'Fox',
  'Frost Troll',
  'Goblin',
  'Green Frog',
  'Grynch Clan Goblin',
  'Horse (Cinza)',
  'Horse (Marrom Escuro)',
  'Horse (Marrom)',
  'Island Troll',
  'Muglex Clan Assassin',
  'Muglex Clan Footman',
  'Parrot',
  'Penguin',
  'Pig',
  'Poison Spider',
  'Rabbit',
  'Rat',
  'Sandcrawler',
  'Seagull',
  'Sheep',
  'Silver Rabbit',
  'Skunk',
  'Snake',
  'Spider',
  'Squirrel',
  'Troll',
  'Undead Jester',
  'Wasp',
  'White Deer',
  'Wild Horse',
  'Winter Wolf',
  'Wisp',
  'Wolf',
  'Imperial', // not in the list above but mentioned as rare
];

const rares = ['Grynch Clan Goblin', 'Imperial', 'Undead Jester', 'Wild Horse'];

console.log(`User's list: ${userList.length} total trivial creatures`);
console.log(`  Rare: ${rares.length} (${rares.join(', ')})`);
console.log(`  Normal: ${userList.length - rares.length}`);
console.log(`  Expected: 46 normal + 4 rare = 50`);
console.log(`  Match: ${userList.length - rares.length} normal + ${rares.length} rare = ${userList.length}`);
console.log();

// Get current trivial creatures in data
const currentTrivial = data.filter(c => c.difficulty === 'TRIVIAL');
console.log(`Current TRIVIAL in bestiary: ${currentTrivial.length}`);
const currentNames = currentTrivial.map(c => c.name);

// Find missing creatures
const missing = [];
const present = [];
userList.forEach(name => {
  // Try exact match first, then partial match
  const found = data.find(c =>
    c.name === name ||
    c.name.toLowerCase() === name.toLowerCase() ||
    c.name.replace(/\s*\([^)]*\)/g, '').toLowerCase() === name.replace(/\s*\([^)]*\)/g, '').toLowerCase()
  );
  if (found) {
    present.push({ listed: name, inData: found.name, id: found.id, diff: found.difficulty, cat: found.creatureCategory });
  } else {
    missing.push(name);
  }
});

console.log(`\n=== Already in bestiary (${present.length}) ===`);
present.forEach(p => {
  const isRare = rares.includes(p.listed) ? ' [RARE]' : '';
  const wrongDiff = p.diff !== 'TRIVIAL' ? ` *** WRONG DIFFICULTY: ${p.diff}` : '';
  console.log(`  ${p.listed} -> ${p.inData} (${p.id}) | ${p.diff} | ${p.cat}${isRare}${wrongDiff}`);
});

console.log(`\n=== Missing from bestiary (${missing.length}) ===`);
missing.forEach(name => {
  const isRare = rares.includes(name) ? ' [RARE]' : '';
  console.log(`  ${name}${isRare}`);
});

// Also check: current TRIVIAL creatures that are NOT in user's list
const notInUserList = currentTrivial.filter(c => {
  return !userList.some(name =>
    c.name === name ||
    c.name.toLowerCase() === name.toLowerCase() ||
    c.name.replace(/\s*\([^)]*\)/g, '').toLowerCase() === name.replace(/\s*\([^)]*\)/g, '').toLowerCase()
  );
});
if (notInUserList.length > 0) {
  console.log(`\n=== In bestiary as TRIVIAL but NOT in user's list (${notInUserList.length}) ===`);
  notInUserList.forEach(c => {
    console.log(`  ${c.name} (${c.id}) | ${c.creatureCategory}`);
  });
}
