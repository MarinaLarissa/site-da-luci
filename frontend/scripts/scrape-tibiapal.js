/**
 * Script para fazer scraping do TibiaPal Bestiary
 * Extrai: nome, dificuldade, charm points, tempo estimado
 * Adiciona imageUrl do TibiaWiki
 *
 * Uso: node scrape-tibiapal.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TIBIAPAL_URL = 'https://tibiapal.com/bestiary';
const OUTPUT_FILE = path.join(__dirname, '../src/data/bestiary.js');

/**
 * Faz requisição HTTPS e retorna o HTML
 */
const fetchHtml = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

/**
 * Gera URL da imagem do TibiaWiki
 */
const getImageUrl = (creatureName) => {
  const formattedName = creatureName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');

  return `https://tibia.fandom.com/wiki/Special:FilePath/${formattedName}.gif`;
};

/**
 * Parse do HTML do TibiaPal
 * Estrutura esperada: tabela com colunas [Monster, Points, Difficulty, Suggested Spawn]
 */
const parseCreatures = (html) => {
  const creatures = [];

  // Identificar seções (1x Respawn, Rapid Respawn, Rare)
  let currentRespawnCategory = 'normal';
  const sections = [
    { name: '1x Respawn', category: 'normal' },
    { name: 'Rapid Respawn', category: 'rapid' },
    { name: 'Rare', category: 'rare' },
  ];

  // Processar cada seção
  sections.forEach(section => {
    // Encontrar a seção no HTML
    const sectionRegex = new RegExp(`${section.name}[\\s\\S]*?<table[^>]*>([\\s\\S]*?)<\\/table>`, 'i');
    const sectionMatch = html.match(sectionRegex);

    if (!sectionMatch) return;

    const tableHtml = sectionMatch[1];
    currentRespawnCategory = section.category;

    // Regex para encontrar linhas da tabela
    const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gis;
    const cellRegex = /<td[^>]*>(.*?)<\/td>/gi;

    let match;
    while ((match = rowRegex.exec(tableHtml)) !== null) {
      const row = match[1];
      const cells = [];

      let cellMatch;
      while ((cellMatch = cellRegex.exec(row)) !== null) {
        // Remove HTML tags e pega apenas texto
        const cellContent = cellMatch[1]
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .trim();
        cells.push(cellContent);
      }

      // Validar estrutura: [Monster, Points, Difficulty, Suggested Spawn]
      if (cells.length >= 4) {
        const name = cells[0];
        const charmPoints = parseInt(cells[1]) || 0;
        const difficultyRaw = cells[2];
        const location = cells[3];

        // Ignorar header e linhas inválidas
        if (name && name !== 'Monster' && name !== '' && !name.toLowerCase().includes('boss')) {
          // Mapear dificuldade
          let difficulty = 'MEDIUM';
          let estimatedHours = 3.5;

          const diffLower = difficultyRaw.toLowerCase();
          if (diffLower.includes('easy')) {
            difficulty = 'EASY';
            estimatedHours = 1;
          } else if (diffLower.includes('hard')) {
            difficulty = 'HARD';
            estimatedHours = 7;
          }

          // Inferir nível recomendado por charm points (rough estimate)
          let recommendedLevel = 100;
          if (charmPoints >= 30) recommendedLevel = 200;
          else if (charmPoints >= 15) recommendedLevel = 150;
          else if (charmPoints >= 10) recommendedLevel = 100;
          else if (charmPoints >= 5) recommendedLevel = 50;
          else recommendedLevel = 20;

          // Criar objeto criatura
          const creature = {
            id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            name: name,
            imageUrl: getImageUrl(name),
            charmPoints: charmPoints,
            difficulty: difficulty,
            estimatedHours: estimatedHours,
            respawnCategory: currentRespawnCategory,
            locations: location ? [location] : ['Unknown'],
            region: inferRegion(location),
            recommendedLevel: recommendedLevel,
          };

          creatures.push(creature);
        }
      }
    }
  });

  return creatures;
};

/**
 * Inferir região baseado na localização
 */
const inferRegion = (location) => {
  if (!location) return 'Mainland';

  const loc = location.toLowerCase();

  if (loc.includes('zao')) return 'Zao';
  if (loc.includes('roshamuul')) return 'Roshamuul';
  if (loc.includes('yalahar')) return 'Yalahar';
  if (loc.includes('edron')) return 'Edron';
  if (loc.includes('ankrahmun') || loc.includes('darama')) return 'Ankrahmun';
  if (loc.includes('port hope') || loc.includes('banuta')) return 'Port Hope';
  if (loc.includes('liberty bay') || loc.includes('nargor')) return 'Liberty Bay';
  if (loc.includes('darashia')) return 'Darashia';
  if (loc.includes('carlin')) return 'Carlin';
  if (loc.includes('thais')) return 'Thais';
  if (loc.includes('venore')) return 'Venore';
  if (loc.includes('feru')) return 'Ferumbras Ascension';
  if (loc.includes('otherworld')) return 'Otherworld';

  return 'Mainland';
};

/**
 * Gera o conteúdo do arquivo bestiary.js
 */
const generateBestiaryFile = (creatures) => {
  const header = `/**
 * Bestiary data based on TibiaPal reference
 *
 * Difficulty levels (based on time to complete):
 * - EASY: Less than 2 hours
 * - MEDIUM: 2-5 hours
 * - HARD: More than 5 hours
 *
 * Charm Points by creature class:
 * - Bosses (rare): 50 points
 * - Very Rare: 30 points
 * - Rare: 25 points
 * - Uncommon: 15 points
 * - Common: 5-10 points
 * - Very Common: 1 point
 */

export const DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const DIFFICULTY_HOURS = {
  [DIFFICULTY.EASY]: { min: 0, max: 2, average: 1 },
  [DIFFICULTY.MEDIUM]: { min: 2, max: 5, average: 3.5 },
  [DIFFICULTY.HARD]: { min: 5, max: 10, average: 7 },
};

export const RESPAWN_CATEGORY = {
  NORMAL: 'normal',
  RAPID: 'rapid',
  RARE: 'rare',
};

export const REGIONS = {
  MAINLAND: 'Mainland',
  VENORE: 'Venore',
  THAIS: 'Thais',
  CARLIN: 'Carlin',
  DARASHIA: 'Darashia',
  LIBERTY_BAY: 'Liberty Bay',
  PORT_HOPE: 'Port Hope',
  ANKRAHMUN: 'Ankrahmun',
  EDRON: 'Edron',
  YALAHAR: 'Yalahar',
  ZAO: 'Zao',
  ROSHAMUUL: 'Roshamuul',
  FERUMBRAS_ASCENSION: 'Ferumbras Ascension',
  OTHERWORLD: 'Otherworld',
};

export const BESTIARY_DATA = [
`;

  const creaturesJson = creatures.map((c, idx) => {
    const isLast = idx === creatures.length - 1;
    return `  ${JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')}${isLast ? '' : ','}`;
  }).join('\n');

  const footer = `
];
`;

  return header + creaturesJson + footer;
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🌐 Fetching TibiaPal bestiary...');
    const html = await fetchHtml(TIBIAPAL_URL);

    console.log('📊 Parsing creatures...');
    const creatures = parseCreatures(html);

    console.log(`✅ Found ${creatures.length} creatures`);

    if (creatures.length === 0) {
      console.log('⚠️  No creatures found. The HTML structure might have changed.');
      console.log('💡 Consider using a browser scraping tool like Puppeteer.');
      return;
    }

    console.log('📝 Generating bestiary.js...');
    const fileContent = generateBestiaryFile(creatures);

    // Backup do arquivo antigo
    if (fs.existsSync(OUTPUT_FILE)) {
      const backupFile = OUTPUT_FILE.replace('.js', '.backup.js');
      fs.copyFileSync(OUTPUT_FILE, backupFile);
      console.log(`💾 Backup saved to: ${backupFile}`);
    }

    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
    console.log(`✅ File saved: ${OUTPUT_FILE}`);
    console.log(`📦 Total creatures: ${creatures.length}`);

    // Amostra
    console.log('\n📋 Sample (first 5):');
    creatures.slice(0, 5).forEach(c => {
      console.log(`  - ${c.name} (${c.charmPoints} CP, ${c.difficulty})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();
