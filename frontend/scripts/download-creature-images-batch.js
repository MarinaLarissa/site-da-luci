/**
 * Download de imagens de criaturas em lotes
 * Baixa imagens do TibiaWiki e salva localmente
 *
 * Uso:
 * - node download-creature-images-batch.js         # Processa próximo lote
 * - node download-creature-images-batch.js --reset # Reinicia do zero
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');
const PROGRESS_FILE = path.join(__dirname, 'image-download-progress.json');
const BATCH_SIZE = 50;
const DELAY_MS = 500; // Delay entre downloads

/**
 * Cria diretório de imagens se não existir
 */
const ensureImagesDir = () => {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log('📁 Created images directory:', IMAGES_DIR);
  }
};

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
 * Carrega lista de criaturas do bestiary
 */
const loadCreatures = () => {
  const content = fs.readFileSync(BESTIARY_FILE, 'utf8');
  const dataMatch = content.match(/export const BESTIARY_DATA = \[([\s\S]*)\];/);

  if (!dataMatch) {
    throw new Error('Could not find BESTIARY_DATA in file');
  }

  return JSON.parse(`[${dataMatch[1]}]`);
};

/**
 * Download de imagem
 */
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Seguir redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
};

/**
 * Gera nome de arquivo local
 */
const getLocalImagePath = (creatureId) => {
  return `/images/creatures/${creatureId}.gif`;
};

/**
 * Download de imagem de uma criatura
 */
const downloadCreatureImage = async (creature) => {
  try {
    const filename = `${creature.id}.gif`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Verificar se já existe
    if (fs.existsSync(filepath)) {
      return { success: true, cached: true };
    }

    // Download
    await downloadImage(creature.imageUrl, filepath);

    return { success: true, cached: false };
  } catch (error) {
    return { success: false, reason: error.message };
  }
};

/**
 * Atualiza URLs das imagens no bestiary.js
 */
const updateBestiaryImageUrls = (creatures) => {
  const bestiaryContent = fs.readFileSync(BESTIARY_FILE, 'utf8');

  // Criar backup
  const backupFile = BESTIARY_FILE.replace('.js', `.backup-images-${Date.now()}.js`);
  fs.copyFileSync(BESTIARY_FILE, backupFile);

  // Atualizar URLs para caminhos locais
  creatures.forEach(creature => {
    creature.imageUrl = getLocalImagePath(creature.id);
  });

  // Recriar arquivo
  const header = bestiaryContent.split('export const BESTIARY_DATA = [')[0];
  const footer = '\n];';

  const creaturesJson = creatures.map((c, idx) => {
    const isLast = idx === creatures.length - 1;
    return `  ${JSON.stringify(c, null, 2).replace(/\n/g, '\n  ')}${isLast ? '' : ','}`;
  }).join('\n');

  const newContent = header + 'export const BESTIARY_DATA = [\n' + creaturesJson + footer;

  fs.writeFileSync(BESTIARY_FILE, newContent, 'utf8');
};

/**
 * Main execution
 */
const main = async () => {
  const args = process.argv.slice(2);

  console.log('🖼️  Creature Image Downloader (50 per batch)\n');

  // Criar diretório de imagens
  ensureImagesDir();

  // Reset se solicitado
  if (args.includes('--reset')) {
    if (fs.existsSync(PROGRESS_FILE)) {
      fs.unlinkSync(PROGRESS_FILE);
      console.log('🔄 Progress reset!\n');
    }
  }

  // Carregar dados
  const progress = loadProgress();
  const creatures = loadCreatures();

  const totalCreatures = creatures.length;
  const remaining = totalCreatures - progress.currentIndex;

  console.log(`📊 Progress Status:`);
  console.log(`   Total creatures: ${totalCreatures}`);
  console.log(`   Already processed: ${progress.currentIndex}`);
  console.log(`   Remaining: ${remaining}`);
  console.log(`   Success: ${progress.successCount} | Failed: ${progress.failedCount}\n`);

  if (remaining === 0) {
    console.log('✅ All images have been downloaded!');
    console.log('\n📝 Updating bestiary.js with local image paths...');
    updateBestiaryImageUrls(creatures);
    console.log('✅ Bestiary updated with local image URLs!');
    return;
  }

  // Pegar próximo lote
  const endIndex = Math.min(progress.currentIndex + BATCH_SIZE, totalCreatures);
  const batch = creatures.slice(progress.currentIndex, endIndex);

  console.log(`🎯 Downloading batch: ${progress.currentIndex + 1} to ${endIndex}\n`);
  console.log('─'.repeat(60));

  let cachedCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const creature = batch[i];
    const globalIndex = progress.currentIndex + i + 1;

    console.log(`\n[${globalIndex}/${totalCreatures}] 🔍 ${creature.name}`);

    const result = await downloadCreatureImage(creature);

    if (result.success) {
      if (result.cached) {
        console.log(`   ⚡ Cached (already exists)`);
        cachedCount++;
      } else {
        console.log(`   ✅ Downloaded`);
      }
      progress.successCount++;
    } else {
      console.log(`   ❌ Failed: ${result.reason}`);
      progress.failed.push({ name: creature.name, id: creature.id, reason: result.reason });
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
  console.log(`   Downloaded: ${batch.length - cachedCount - (progress.failedCount - (progress.totalProcessed - batch.length))}`);
  console.log(`   Cached: ${cachedCount}`);
  console.log(`   Failed: ${progress.failed.filter((_, idx) => idx >= progress.totalProcessed - batch.length).length}`);

  // Atualizar progresso
  progress.currentIndex = endIndex;
  saveProgress(progress);

  console.log(`\n✅ Batch complete! Progress saved.`);

  if (endIndex < totalCreatures) {
    console.log(`\n💡 Run again to download next batch (${totalCreatures - endIndex} remaining)`);
  } else {
    console.log(`\n🎉 All images downloaded!`);
    console.log('\n📝 Updating bestiary.js with local image paths...');
    updateBestiaryImageUrls(creatures);
    console.log('✅ Bestiary updated with local image URLs!');
  }
};

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
