/**
 * Update Creature Hitpoints Script
 * Fetches HP data from TibiaWikiApi and updates bestiary.js
 *
 * Usage: node scripts/updateCreatureHitpoints.js
 */

const fs = require('fs');
const path = require('path');

// TibiaWikiApi endpoint
const API_URL = 'https://tibiawiki.dev/api/creatures?expand=true';

// Paths
const BESTIARY_PATH = path.join(__dirname, '../frontend/src/data/bestiary.js');
const BACKUP_PATH = path.join(__dirname, '../frontend/src/data/bestiary.backup.js');
const REPORT_PATH = path.join(__dirname, '../.claude/logs/hp-update-report.md');

/**
 * Normalize creature name to ID format (kebab-case)
 */
function normalizeNameToId(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Fetch creatures from TibiaWikiApi
 */
async function fetchCreaturesFromApi() {
  console.log('🔍 Fetching creatures from TibiaWikiApi...');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Fetched ${data.length} creatures from API`);

    return data;
  } catch (error) {
    console.error('❌ Error fetching from API:', error.message);
    throw error;
  }
}

/**
 * Build HP map from API data
 */
function buildHpMap(apiCreatures) {
  const hpMap = new Map();
  let validCount = 0;
  let unknownCount = 0;

  apiCreatures.forEach(creature => {
    if (!creature.name || !creature.hp) return;

    const id = normalizeNameToId(creature.name);
    const hp = creature.hp;

    // Skip unknown HP values
    if (hp === '?' || hp === 'unknown' || hp === '') {
      unknownCount++;
      return;
    }

    // Parse HP (should be numeric string)
    const hpValue = parseInt(hp, 10);
    if (isNaN(hpValue) || hpValue <= 0) {
      console.warn(`⚠️  Invalid HP for ${creature.name}: ${hp}`);
      return;
    }

    hpMap.set(id, {
      name: creature.name,
      hp: hpValue,
      apiName: creature.actualname || creature.name,
    });
    validCount++;
  });

  console.log(`📊 HP Map built: ${validCount} valid, ${unknownCount} unknown`);
  return hpMap;
}

/**
 * Update bestiary.js file with HP data
 */
function updateBestiaryFile(hpMap) {
  console.log('\n📝 Reading bestiary.js...');

  // Create backup
  if (fs.existsSync(BESTIARY_PATH)) {
    fs.copyFileSync(BESTIARY_PATH, BACKUP_PATH);
    console.log(`💾 Backup created: ${BACKUP_PATH}`);
  }

  // Read file
  let content = fs.readFileSync(BESTIARY_PATH, 'utf8');
  const originalContent = content;

  // Statistics
  let matchedCount = 0;
  let notFoundCount = 0;
  let alreadyHasHp = 0;
  const notFoundCreatures = [];
  const updatedCreatures = [];

  // Parse bestiary entries (regex to find creature objects)
  const creatureRegex = /"id":\s*"([^"]+)"/g;
  let match;
  const bestiaryIds = [];

  while ((match = creatureRegex.exec(content)) !== null) {
    bestiaryIds.push(match[1]);
  }

  console.log(`📦 Found ${bestiaryIds.length} creatures in bestiary.js`);

  // Update each creature
  bestiaryIds.forEach(id => {
    const hpData = hpMap.get(id);

    if (!hpData) {
      notFoundCount++;
      notFoundCreatures.push(id);
      return;
    }

    // Find this creature's object in the file
    const creatureObjectRegex = new RegExp(
      `(\\{[^}]*"id":\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*\\})`,
      'gs'
    );

    const creatureMatch = creatureObjectRegex.exec(content);
    if (!creatureMatch) {
      console.warn(`⚠️  Could not find object for ${id}`);
      return;
    }

    const creatureObject = creatureMatch[0];

    // Check if already has hitpoints
    if (/"hitpoints":\s*\d+/.test(creatureObject)) {
      alreadyHasHp++;
      return;
    }

    // Add hitpoints field after killsToComplete
    const updatedObject = creatureObject.replace(
      /"killsToComplete":\s*(\d+)/,
      `"killsToComplete": $1,\n    "hitpoints": ${hpData.hp}`
    );

    // If killsToComplete not found, try after officialDifficulty
    let finalUpdatedObject = updatedObject;
    if (updatedObject === creatureObject) {
      finalUpdatedObject = creatureObject.replace(
        /"officialDifficulty":\s*"([^"]+)"/,
        `"officialDifficulty": "$1",\n    "hitpoints": ${hpData.hp}`
      );
    }

    if (finalUpdatedObject !== creatureObject) {
      content = content.replace(creatureObject, finalUpdatedObject);
      matchedCount++;
      updatedCreatures.push({ id, name: hpData.name, hp: hpData.hp });
    }
  });

  // Write updated file
  if (content !== originalContent) {
    fs.writeFileSync(BESTIARY_PATH, content, 'utf8');
    console.log(`\n✅ File updated successfully!`);
  } else {
    console.log(`\n⚠️  No changes made to file`);
  }

  // Generate report
  generateReport({
    totalBestiary: bestiaryIds.length,
    totalApiCreatures: hpMap.size,
    matchedCount,
    alreadyHasHp,
    notFoundCount,
    notFoundCreatures,
    updatedCreatures,
  });

  return {
    matchedCount,
    notFoundCount,
    alreadyHasHp,
  };
}

/**
 * Generate markdown report
 */
function generateReport(stats) {
  const report = `# HP Update Report
**Date:** ${new Date().toISOString().split('T')[0]}
**Script:** updateCreatureHitpoints.js

---

## 📊 Summary

| Metric | Count | % |
|--------|-------|---|
| Total creatures in bestiary.js | ${stats.totalBestiary} | 100% |
| Total creatures with HP from API | ${stats.totalApiCreatures} | - |
| **Updated with new HP** | **${stats.matchedCount}** | **${((stats.matchedCount / stats.totalBestiary) * 100).toFixed(1)}%** |
| Already had HP | ${stats.alreadyHasHp} | ${((stats.alreadyHasHp / stats.totalBestiary) * 100).toFixed(1)}% |
| Not found in API | ${stats.notFoundCount} | ${((stats.notFoundCount / stats.totalBestiary) * 100).toFixed(1)}% |
| **Total with HP after update** | **${stats.matchedCount + stats.alreadyHasHp}** | **${(((stats.matchedCount + stats.alreadyHasHp) / stats.totalBestiary) * 100).toFixed(1)}%** |

---

## ✅ Successfully Updated (${stats.matchedCount})

${stats.updatedCreatures.slice(0, 20).map(c => `- ${c.name} (${c.id}): ${c.hp} HP`).join('\n')}
${stats.updatedCreatures.length > 20 ? `\n... and ${stats.updatedCreatures.length - 20} more` : ''}

---

## ❌ Not Found in API (${stats.notFoundCount})

${stats.notFoundCreatures.slice(0, 50).map(id => `- ${id}`).join('\n')}
${stats.notFoundCreatures.length > 50 ? `\n... and ${stats.notFoundCreatures.length - 50} more` : ''}

---

## 🔍 Next Steps

${stats.notFoundCount > 0 ? `
1. **Manual Review Required:**
   - ${stats.notFoundCount} creatures not found in TibiaWikiApi
   - May need manual HP lookup from TibiaWiki
   - Or creature name mismatch (ID vs API name)
` : ''}

2. **Verify Changes:**
   - Check \`bestiary.backup.js\` if rollback needed
   - Review updated creatures in bestiary.js
   - Test in browser

3. **Commit:**
   - \`git add frontend/src/data/bestiary.js\`
   - \`git commit -m "feat: add HP data for ${stats.matchedCount} creatures via TibiaWikiApi"\`

---

**Generated:** ${new Date().toISOString()}
`;

  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`\n📄 Report generated: ${REPORT_PATH}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting HP update process...\n');

  try {
    // Step 1: Fetch from API
    const apiCreatures = await fetchCreaturesFromApi();

    // Step 2: Build HP map
    const hpMap = buildHpMap(apiCreatures);

    // Step 3: Update bestiary.js
    const stats = updateBestiaryFile(hpMap);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 HP Update Complete!');
    console.log('='.repeat(50));
    console.log(`✅ Updated: ${stats.matchedCount} creatures`);
    console.log(`⏭️  Already had HP: ${stats.alreadyHasHp} creatures`);
    console.log(`❌ Not found: ${stats.notFoundCount} creatures`);
    console.log(`📊 Total coverage: ${stats.matchedCount + stats.alreadyHasHp}/${stats.matchedCount + stats.alreadyHasHp + stats.notFoundCount} (${(((stats.matchedCount + stats.alreadyHasHp) / (stats.matchedCount + stats.alreadyHasHp + stats.notFoundCount)) * 100).toFixed(1)}%)`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { main };
