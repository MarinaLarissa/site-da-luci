/**
 * Script para fazer scraping do TibiaWiki Bestiary
 * Extrai: dificuldade oficial, resistências elementais, kills necessárias
 *
 * Uso: node scrape-tibiawiki.js [creature-name]
 * Exemplo: node scrape-tibiawiki.js "Dragon"
 *
 * Para atualizar o bestiary.js completo, use:
 * node scrape-tibiawiki.js --update-all
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TIBIAWIKI_API = 'https://tibia.fandom.com/api.php';
const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');

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
 * Parse resistências elementais do wikitext
 * Formato esperado: |physicalDmgMod = 100 (ou outro valor)
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
 * Parse dificuldade oficial do bestiary
 * Formato esperado: |bestiaryclass = Harmless/Trivial/Easy/Medium/Hard/Challenging
 */
const parseOfficialDifficulty = (wikitext) => {
  const regex = /\|\s*bestiarylevel\s*=\s*([A-Za-z]+)/i;
  const match = wikitext.match(regex);

  if (match) {
    const difficulty = match[1].toUpperCase();
    // Validar contra dificuldades conhecidas
    const validDifficulties = ['HARMLESS', 'TRIVIAL', 'EASY', 'MEDIUM', 'HARD', 'CHALLENGING'];
    if (validDifficulties.includes(difficulty)) {
      return difficulty;
    }
  }

  return null; // Se não encontrar, retorna null
};

/**
 * Parse kills necessárias para completar bestiary
 * Formato esperado: |bestiaryoccurrence = Common (mapeamos para kills)
 */
const parseKillsToComplete = (wikitext) => {
  const regex = /\|\s*occurrence\s*=\s*([A-Za-z\s]+)/i;
  const match = wikitext.match(regex);

  if (match) {
    const occurrence = match[1].trim().toLowerCase();

    // Mapeamento de occurrence para kills (baseado no sistema oficial do Tibia)
    const occurrenceToKills = {
      'harmless': 25,
      'trivial': 250,
      'common': 500,
      'uncommon': 1000,
      'rare': 1000, // Rare creatures também precisam de 1000
      'very rare': 2500,
    };

    return occurrenceToKills[occurrence] || 500; // Default 500
  }

  return null;
};

/**
 * Extrai todos os dados de uma criatura
 */
const scrapeCreatureData = async (creatureName) => {
  try {
    console.log(`🔍 Fetching data for: ${creatureName}`);
    const wikitext = await fetchWikiData(creatureName);

    const data = {
      name: creatureName,
      elementalResistances: parseResistances(wikitext),
      officialDifficulty: parseOfficialDifficulty(wikitext),
      killsToComplete: parseKillsToComplete(wikitext),
    };

    console.log(`✅ Data extracted:`);
    console.log(`   - Official Difficulty: ${data.officialDifficulty || 'N/A'}`);
    console.log(`   - Kills to Complete: ${data.killsToComplete || 'N/A'}`);
    console.log(`   - Resistances:`, data.elementalResistances);

    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${creatureName}:`, error.message);
    return null;
  }
};

/**
 * Atualiza o arquivo bestiary.js com novos dados
 */
const updateBestiaryFile = async (creaturesToUpdate) => {
  try {
    // Ler arquivo bestiary.js atual
    const bestiaryContent = fs.readFileSync(BESTIARY_FILE, 'utf8');

    // Fazer backup
    const backupFile = BESTIARY_FILE.replace('.js', '.backup-wiki-update.js');
    fs.writeFileSync(backupFile, bestiaryContent, 'utf8');
    console.log(`💾 Backup created: ${backupFile}`);

    // Parse do array BESTIARY_DATA atual
    const dataMatch = bestiaryContent.match(/export const BESTIARY_DATA = \[([\s\S]*)\];/);
    if (!dataMatch) {
      throw new Error('Could not find BESTIARY_DATA in file');
    }

    const currentData = JSON.parse(`[${dataMatch[1]}]`);
    console.log(`📊 Found ${currentData.length} creatures in bestiary.js`);

    // Atualizar cada criatura
    let updatedCount = 0;
    for (const creature of currentData) {
      if (creaturesToUpdate && !creaturesToUpdate.includes(creature.name)) {
        continue; // Pular criaturas não solicitadas
      }

      const newData = await scrapeCreatureData(creature.name);

      if (newData) {
        // Adicionar novos campos
        if (newData.elementalResistances) {
          creature.elementalResistances = newData.elementalResistances;
        }
        if (newData.officialDifficulty) {
          creature.officialDifficulty = newData.officialDifficulty;
        }
        if (newData.killsToComplete) {
          creature.killsToComplete = newData.killsToComplete;
        }

        updatedCount++;
      }

      // Delay para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Recriar arquivo
    const header = bestiaryContent.split('export const BESTIARY_DATA = [')[0];
    const footer = '\n];';

    const creaturesJson = currentData.map((c, idx) => {
      const isLast = idx === currentData.length - 1;
      return `  ${JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')}${isLast ? '' : ','}`;
    }).join('\n');

    const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesJson + footer;

    fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
    console.log(`✅ Updated ${updatedCount} creatures in ${BESTIARY_FILE}`);

  } catch (error) {
    console.error('❌ Error updating bestiary file:', error.message);
    process.exit(1);
  }
};

/**
 * Main execution
 */
const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scrape-tibiawiki.js "Creature Name"    # Scrape single creature');
    console.log('  node scrape-tibiawiki.js --update-all       # Update all creatures in bestiary.js');
    return;
  }

  if (args[0] === '--update-all') {
    console.log('🌐 Updating all creatures from TibiaWiki...');
    await updateBestiaryFile(null); // null = atualizar todas
  } else {
    const creatureName = args[0];
    const data = await scrapeCreatureData(creatureName);

    if (data) {
      console.log('\n📋 Complete data:');
      console.log(JSON.stringify(data, null, 2));
    }
  }
};

main();
