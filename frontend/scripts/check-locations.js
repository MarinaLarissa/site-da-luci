const fs = require('fs');
const path = require('path');
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const c = fs.readFileSync(BESTIARY_FILE, 'utf8');
const m = c.match(/export const BESTIARY_DATA = (\[[\s\S]*\]);/);
const d = eval(m[1]);
const unknown = d.filter(x => x.locations && x.locations.length === 1 && x.locations[0] === 'Unknown');
const hasLoc = d.filter(x => x.locations && !(x.locations.length === 1 && x.locations[0] === 'Unknown'));
console.log('Total creatures: ' + d.length);
console.log('With locations: ' + hasLoc.length);
console.log('Still Unknown: ' + unknown.length);
if (unknown.length > 0) {
  unknown.forEach(x => console.log('  ' + x.name));
}
