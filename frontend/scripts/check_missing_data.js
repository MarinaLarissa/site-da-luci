const fs = require('fs');
const content = fs.readFileSync('./frontend/src/data/bestiary.js', 'utf8');
const match = content.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const data = eval(match[1]);

const missingHP = [];
const missingResistances = [];
const missingKills = [];
const hasDeprecated = [];

data.forEach(c => {
  if (!c.hitpoints) missingHP.push(c);
  if (!c.elementalResistances) missingResistances.push(c);
  if (!c.killsToComplete) missingKills.push(c);
  if (c.estimatedHours || c.recommendedLevel) hasDeprecated.push(c);
});

if (missingHP.length > 0) {
  console.log(`=== Missing hitpoints (${missingHP.length}) ===`);
  missingHP.forEach(c => console.log(`  ${c.name} | ${c.officialDifficulty} | ${c.respawnCategory}`));
}

if (missingResistances.length > 0) {
  console.log(`\n=== Missing elementalResistances (${missingResistances.length}) ===`);
  missingResistances.forEach(c => console.log(`  ${c.name} | ${c.officialDifficulty} | ${c.respawnCategory}`));
}

if (missingKills.length > 0) {
  console.log(`\n=== Missing killsToComplete (${missingKills.length}) ===`);
  missingKills.forEach(c => console.log(`  ${c.name} | ${c.officialDifficulty} | ${c.respawnCategory}`));
}

if (hasDeprecated.length > 0) {
  console.log(`\n=== Still has deprecated fields (${hasDeprecated.length}) ===`);
  hasDeprecated.forEach(c => {
    const fields = [];
    if (c.estimatedHours) fields.push('estimatedHours=' + c.estimatedHours);
    if (c.recommendedLevel) fields.push('recommendedLevel=' + c.recommendedLevel);
    console.log(`  ${c.name} | ${fields.join(', ')}`);
  });
}

if (missingHP.length === 0 && missingResistances.length === 0 && missingKills.length === 0 && hasDeprecated.length === 0) {
  console.log('All creatures have complete data!');
}
