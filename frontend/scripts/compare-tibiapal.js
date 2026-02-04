/**
 * Compara nossa lista de criaturas com a do TibiaPal
 * Identifica quais criaturas estão faltando
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const TIBIAPAL_URL = 'https://tibiapal.com/bestiary';
const CURRENT_CREATURES_FILE = path.join(__dirname, 'current-creatures.txt');

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
 * Parse das criaturas do TibiaPal
 */
const parseCreatures = (html) => {
  const creatures = new Set();

  // Regex para encontrar linhas da tabela
  const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gis;
  const cellRegex = /<td[^>]*>(.*?)<\/td>/gi;

  let match;
  while ((match = rowRegex.exec(html)) !== null) {
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

    // Validar estrutura: primeira célula é o nome da criatura
    if (cells.length >= 4) {
      const name = cells[0];

      // Ignorar header e linhas inválidas
      if (name && name !== 'Monster' && name !== '' && !name.toLowerCase().includes('total')) {
        creatures.add(name);
      }
    }
  }

  return Array.from(creatures).sort();
};

/**
 * Carrega lista de criaturas atuais
 */
const loadCurrentCreatures = () => {
  const content = fs.readFileSync(CURRENT_CREATURES_FILE, 'utf8');
  return content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🌐 Fetching TibiaPal bestiary...\n');
    const html = await fetchHtml(TIBIAPAL_URL);

    console.log('📊 Parsing creatures...\n');
    const tibiapalCreatures = parseCreatures(html);

    console.log(`✅ Found ${tibiapalCreatures.length} creatures on TibiaPal\n`);

    console.log('📖 Loading our current creatures...\n');
    const ourCreatures = loadCurrentCreatures();

    console.log(`✅ We have ${ourCreatures.length} creatures\n`);

    // Comparar
    const ourSet = new Set(ourCreatures.map(c => c.toLowerCase()));
    const missing = tibiapalCreatures.filter(c => !ourSet.has(c.toLowerCase()));

    console.log('─'.repeat(60));
    console.log(`\n📊 Comparison Results:\n`);
    console.log(`   TibiaPal: ${tibiapalCreatures.length} creatures`);
    console.log(`   Our list: ${ourCreatures.length} creatures`);
    console.log(`   Missing: ${missing.length} creatures\n`);

    if (missing.length > 0) {
      console.log('─'.repeat(60));
      console.log(`\n❌ Missing creatures (${missing.length}):\n`);

      missing.forEach((creature, idx) => {
        console.log(`   ${idx + 1}. ${creature}`);
      });

      // Salvar lista de faltantes
      const missingFile = path.join(__dirname, 'missing-from-tibiapal.txt');
      fs.writeFileSync(missingFile, missing.join('\n'), 'utf8');
      console.log(`\n💾 Missing creatures saved to: ${missingFile}`);
    } else {
      console.log('✅ No missing creatures! We have all creatures from TibiaPal.\n');
    }

    // Criaturas que temos mas TibiaPal não tem
    const tibiapalSet = new Set(tibiapalCreatures.map(c => c.toLowerCase()));
    const extra = ourCreatures.filter(c => !tibiapalSet.has(c.toLowerCase()));

    if (extra.length > 0) {
      console.log('\n─'.repeat(60));
      console.log(`\n➕ Extra creatures we have (${extra.length}):\n`);

      extra.slice(0, 20).forEach((creature, idx) => {
        console.log(`   ${idx + 1}. ${creature}`);
      });

      if (extra.length > 20) {
        console.log(`   ... and ${extra.length - 20} more`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();
