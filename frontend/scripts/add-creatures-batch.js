/**
 * Adiciona criaturas ao bestiary em lotes de 50
 * Mantém arquivo de controle para continuar de onde parou
 *
 * Uso:
 * - node add-creatures-batch.js         # Processa próximo lote de 50
 * - node add-creatures-batch.js --reset # Reinicia do zero
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MISSING_CREATURES_FILE = path.join(__dirname, 'missing-creatures.txt');
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const PROGRESS_FILE = path.join(__dirname, 'import-progress.json');
const BATCH_SIZE = 50;
const DELAY_MS = 1000;

const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';

/**
 * Carrega progresso salvo
 */
const loadProgress = () => {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return {
    currentIndex: 0,
    totalProcessed: 0,
    successCount: 0,
    failedCount: 0,
    failed: [],
    lastUpdated: null
  };
};

/**
 * Salva progresso
 */
const saveProgress = (progress) => {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
};

/**
 * Lê lista de criaturas faltantes
 */
const loadMissingCreatures = () => {
  const content = fs.readFileSync(MISSING_CREATURES_FILE, 'utf8');
  return content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
};

/**
 * Faz requisição à API do TibiaWiki
 */
const fetchWikiData = (creatureName) => {
  return new Promise((resolve, reject) => {
    const url = `${TIBIAWIKI_API}?action=parse&page=${encodeURIComponent(creatureName)}&format=json&prop=wikitext`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.parse && json.parse.wikitext) {
            resolve(json.parse.wikitext['*']);
          } else {
            reject(new Error(`Page not found: ${creatureName}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
};

/**
 * Parse resistências elementais
 */
const parseResistances = (wikitext) => {
  const resistances = {
    physical: 100,
    fire: 100,
    ice: 100,
    energy: 100,
    earth: 100,
    holy: 100,
    death: 100,
  };

  const resistanceMapping = {
    physicalDmgMod: 'physical',
    fireDmgMod: 'fire',
    iceDmgMod: 'ice',
    energyDmgMod: 'energy',
    earthDmgMod: 'earth',
    holyDmgMod: 'holy',
    deathDmgMod: 'death',
  };

  Object.entries(resistanceMapping).forEach(([wikiKey, ourKey]) => {
    const regex = new RegExp(`\\|\\s*${wikiKey}\\s*=\\s*([0-9]+)%?`, 'i');
    const match = wikitext.match(regex);
    if (match) {
      resistances[ourKey] = parseInt(match[1]);
    }
  });

  return resistances;
};

/**
 * Parse dificuldade oficial
 */
const parseOfficialDifficulty = (wikitext) => {
  const regex = /\|\s*bestiarylevel\s*=\s*([A-Za-z]+)/i;
  const match = wikitext.match(regex);

  if (match) {
    const difficulty = match[1].toUpperCase();
    const validDifficulties = ['HARMLESS', 'TRIVIAL', 'EASY', 'MEDIUM', 'HARD', 'CHALLENGING'];
    if (validDifficulties.includes(difficulty)) {
      return difficulty;
    }
  }

  return 'MEDIUM'; // Default
};

/**
 * Parse kills necessárias
 */
const parseKillsToComplete = (wikitext) => {
  const regex = /\|\s*occurrence\s*=\s*([A-Za-z\s]+)/i;
  const match = wikitext.match(regex);

  if (match) {
    const occurrence = match[1].trim().toLowerCase();
    const occurrenceToKills = {
      'harmless': 25,
      'trivial': 250,
      'common': 500,
      'uncommon': 1000,
      'rare': 1000,
      'very rare': 2500,
    };
    return occurrenceToKills[occurrence] || 500;
  }

  return 500; // Default
};

/**
 * Parse charm points
 */
const parseCharmPoints = (wikitext) => {
  const regex = /\|\s*bestiarypoints\s*=\s*([0-9]+)/i;
  const match = wikitext.match(regex);
  return match ? parseInt(match[1]) : 5; // Default 5
};

/**
 * Parse experiência
 */
const parseExperience = (wikitext) => {
  const regex = /\|\s*exp\s*=\s*([0-9]+)/i;
  const match = wikitext.match(regex);
  return match ? parseInt(match[1]) : 0;
};

/**
 * Gera ID da criatura
 */
const generateId = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Gera URL da imagem
 */
const getImageUrl = (creatureName) => {
  const formattedName = creatureName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');
  return `https://tibia.fandom.com/wiki/Special:FilePath/${formattedName}.gif`;
};

/**
 * Scrape dados de uma criatura
 */
const scrapeCreature = async (creatureName) => {
  try {
    const wikitext = await fetchWikiData(creatureName);

    // Verificar se é uma criatura válida (tem bestiarylevel)
    const hasBestiary = /\|\s*bestiarylevel\s*=/i.test(wikitext);
    if (!hasBestiary) {
      return { success: false, reason: 'Not a bestiary creature' };
    }

    const creature = {
      id: generateId(creatureName),
      name: creatureName,
      imageUrl: getImageUrl(creatureName),
      charmPoints: parseCharmPoints(wikitext),
      difficulty: parseOfficialDifficulty(wikitext),
      officialDifficulty: parseOfficialDifficulty(wikitext),
      respawnCategory: 'normal',
      locations: ['Unknown'],
      region: 'Mainland',
      elementalResistances: parseResistances(wikitext),
      killsToComplete: parseKillsToComplete(wikitext),
    };

    return { success: true, creature };
  } catch (error) {
    return { success: false, reason: error.message };
  }
};

/**
 * Adiciona criaturas ao bestiary.js
 */
const addCreaturesToBestiary = (creatures) => {
  const bestiaryContent = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const dataMatch = bestiaryContent.match(/export const BESTIARY_DATA = \[([\s\S]*)\];/);

  if (!dataMatch) {
    throw new Error('Could not find BESTIARY_DATA in file');
  }

  const currentData = JSON.parse(`[${dataMatch[1]}]`);

  // Adicionar novas criaturas
  creatures.forEach(creature => {
    // Verificar se já existe
    const exists = currentData.some(c => c.id === creature.id);
    if (!exists) {
      currentData.push(creature);
    }
  });

  // Ordenar por nome
  currentData.sort((a, b) => a.name.localeCompare(b.name));

  // Recriar arquivo
  const header = bestiaryContent.split('export const BESTIARY_DATA = [')[0];
  const footer = '\n];';

  const creaturesJson = currentData.map((c, idx) => {
    const isLast = idx === currentData.length - 1;
    return `  ${JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')}${isLast ? '' : ','}`;
  }).join('\n');

  const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesJson + footer;

  // Criar backup
  const backupFile = BESTIARY_FILE.replace('.js', `.backup-${Date.now()}.js`);
  fs.copyFileSync(BESTIARY_FILE, backupFile);

  fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');

  return currentData.length;
};

/**
 * Main execution
 */
const main = async () => {
  const args = process.argv.slice(2);

  console.log('📦 Batch Creature Importer (50 per batch)\n');

  // Reset se solicitado
  if (args.includes('--reset')) {
    if (fs.existsSync(PROGRESS_FILE)) {
      fs.unlinkSync(PROGRESS_FILE);
      console.log('🔄 Progress reset!\n');
    }
  }

  // Carregar progresso
  const progress = loadProgress();
  const missingCreatures = loadMissingCreatures();

  const totalMissing = missingCreatures.length;
  const remaining = totalMissing - progress.currentIndex;

  console.log(`📊 Progress Status:`);
  console.log(`   Total missing: ${totalMissing}`);
  console.log(`   Already processed: ${progress.currentIndex}`);
  console.log(`   Remaining: ${remaining}`);
  console.log(`   Success: ${progress.successCount} | Failed: ${progress.failedCount}\n`);

  if (remaining === 0) {
    console.log('✅ All creatures have been processed!');
    return;
  }

  // Pegar próximo lote
  const endIndex = Math.min(progress.currentIndex + BATCH_SIZE, totalMissing);
  const batch = missingCreatures.slice(progress.currentIndex, endIndex);

  console.log(`🎯 Processing batch: ${progress.currentIndex + 1} to ${endIndex}\n`);
  console.log('─'.repeat(60));

  const successfulCreatures = [];

  for (let i = 0; i < batch.length; i++) {
    const creatureName = batch[i];
    const globalIndex = progress.currentIndex + i + 1;

    console.log(`\n[${globalIndex}/${totalMissing}] 🔍 ${creatureName}`);

    const result = await scrapeCreature(creatureName);

    if (result.success) {
      console.log(`   ✅ Success (${result.creature.charmPoints} CP, ${result.creature.officialDifficulty})`);
      successfulCreatures.push(result.creature);
      progress.successCount++;
    } else {
      console.log(`   ❌ Failed: ${result.reason}`);
      progress.failed.push({ name: creatureName, reason: result.reason });
      progress.failedCount++;
    }

    progress.totalProcessed++;

    // Delay entre requisições
    if (i < batch.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`\n📝 Batch Summary:`);
  console.log(`   Successful: ${successfulCreatures.length}`);
  console.log(`   Failed: ${batch.length - successfulCreatures.length}`);

  // Adicionar criaturas bem-sucedidas ao bestiary
  if (successfulCreatures.length > 0) {
    const totalCreatures = addCreaturesToBestiary(successfulCreatures);
    console.log(`\n💾 Added ${successfulCreatures.length} creatures to bestiary.js`);
    console.log(`   Total creatures now: ${totalCreatures}`);
  }

  // Atualizar progresso
  progress.currentIndex = endIndex;
  saveProgress(progress);

  console.log(`\n✅ Batch complete! Progress saved.`);

  if (endIndex < totalMissing) {
    console.log(`\n💡 Run again to process next batch (${totalMissing - endIndex} remaining)`);
  } else {
    console.log(`\n🎉 All creatures processed!`);
  }
};

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
