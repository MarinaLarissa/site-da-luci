/**
 * Batch Image Downloader for Creatures
 * Downloads images in batches of 50 to prevent memory issues and show progress
 *
 * Usage: node scripts/download-creature-images-batch.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');
const BATCH_SIZE = 50;
const MAX_CONCURRENT = 5;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * Download an image from URL
 */
const downloadImage = (url, filepath, attempt = 1) => {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath, attempt)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        if (attempt < RETRY_ATTEMPTS) {
          setTimeout(() => {
            downloadImage(url, filepath, attempt + 1)
              .then(resolve)
              .catch(reject);
          }, RETRY_DELAY);
          return;
        }
        return reject(new Error(`Status: ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', (err) => {
      if (attempt < RETRY_ATTEMPTS) {
        setTimeout(() => {
          downloadImage(url, filepath, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, RETRY_DELAY);
      } else {
        reject(err);
      }
    });
  });
};

/**
 * Process a single batch
 */
const processBatch = async (batch) => {
  const results = await Promise.allSettled(
    batch.map(async ({ creature, url, filepath, filename }) => {
      try {
        if (fs.existsSync(filepath)) {
          return { success: true, creature, filename, cached: true };
        }

        await downloadImage(url, filepath);
        return { success: true, creature, filename, cached: false };
      } catch (error) {
        return { success: false, creature, error: error.message };
      }
    })
  );

  const succeeded = results.filter(r => r.status === 'fulfilled' && r.value.success).map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

  return { succeeded, failed };
};

/**
 * Update bestiary.js with local image paths for a batch
 */
const updateBestiaryFileBatch = (successfulDownloads) => {
  let content = fs.readFileSync(BESTIARY_FILE, 'utf8');

  successfulDownloads.forEach(({ creature, filename }) => {
    const creaturePattern = new RegExp(
      `("id":\\s*"${creature.id}"[^}]*?"imageUrl":\\s*)"https://tibia\\.fandom\\.com/wiki/Special:FilePath/[^"]+\\.gif"`,
      's'
    );

    const match = content.match(creaturePattern);
    if (match) {
      const newUrl = `${match[1]}"/images/creatures/${filename}"`;
      content = content.replace(creaturePattern, newUrl);
    }
  });

  fs.writeFileSync(BESTIARY_FILE, content, 'utf8');
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🖼️  Batch Creature Image Downloader');
    console.log('===================================\n');

    // Read bestiary data
    console.log('📖 Reading bestiary.js...');
    const bestiaryContent = fs.readFileSync(BESTIARY_FILE, 'utf8');
    const dataMatch = bestiaryContent.match(/export const BESTIARY_DATA = \[([\s\S]*?)\];/);

    if (!dataMatch) {
      throw new Error('Could not find BESTIARY_DATA in bestiary.js');
    }

    const creaturesJson = '[' + dataMatch[1] + ']';
    const creatures = JSON.parse(creaturesJson);

    // Filter only creatures with TibiaWiki URLs (not yet downloaded)
    const downloadTasks = creatures
      .filter(c => c.imageUrl && c.imageUrl.includes('tibia.fandom.com'))
      .map(creature => {
        const filename = creature.imageUrl.split('/').pop();
        const filepath = path.join(IMAGES_DIR, filename);
        return { creature, url: creature.imageUrl, filepath, filename };
      });

    const totalTasks = downloadTasks.length;
    console.log(`✅ Found ${creatures.length} creatures total`);
    console.log(`📥 ${totalTasks} images need to be downloaded\n`);

    if (totalTasks === 0) {
      console.log('🎉 All images already downloaded!');
      return;
    }

    // Create backup before starting
    const backupFile = BESTIARY_FILE.replace('.js', `.backup-${Date.now()}.js`);
    fs.copyFileSync(BESTIARY_FILE, backupFile);
    console.log(`💾 Backup created: ${path.basename(backupFile)}\n`);

    // Process in batches
    let allSucceeded = [];
    let allFailed = [];
    let processedCount = 0;

    const totalBatches = Math.ceil(totalTasks / BATCH_SIZE);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const start = batchIndex * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, totalTasks);
      const batch = downloadTasks.slice(start, end);

      console.log(`\n📦 Batch ${batchIndex + 1}/${totalBatches} (${batch.length} images)`);
      console.log('─'.repeat(50));

      // Process batch in chunks of MAX_CONCURRENT
      const chunks = [];
      for (let i = 0; i < batch.length; i += MAX_CONCURRENT) {
        chunks.push(batch.slice(i, i + MAX_CONCURRENT));
      }

      let batchSucceeded = [];
      let batchFailed = [];

      for (const chunk of chunks) {
        const { succeeded, failed } = await processBatch(chunk);
        batchSucceeded = batchSucceeded.concat(succeeded);
        batchFailed = batchFailed.concat(failed);

        // Show progress for each chunk
        succeeded.forEach(s => {
          processedCount++;
          const status = s.cached ? '✓ (cached)' : '✓';
          console.log(`  ${status} ${s.creature.name} [${processedCount}/${totalTasks}]`);
        });

        failed.forEach(f => {
          processedCount++;
          const creature = f.value?.creature || f.reason;
          console.log(`  ✗ ${creature.name} [${processedCount}/${totalTasks}]`);
        });
      }

      allSucceeded = allSucceeded.concat(batchSucceeded);
      allFailed = allFailed.concat(batchFailed);

      // Update bestiary.js after each batch
      if (batchSucceeded.length > 0) {
        const newDownloads = batchSucceeded.filter(s => !s.cached);
        if (newDownloads.length > 0) {
          updateBestiaryFileBatch(newDownloads);
          console.log(`\n  💾 Updated ${newDownloads.length} paths in bestiary.js`);
        }
      }

      // Progress summary
      const progress = ((batchIndex + 1) / totalBatches * 100).toFixed(1);
      console.log(`\n  Progress: ${progress}% (${allSucceeded.length} success, ${allFailed.length} failed)`);

      // Small delay between batches
      if (batchIndex < totalBatches - 1) {
        console.log('  ⏳ Waiting 2 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Final summary
    console.log('\n\n📊 Final Summary');
    console.log('================');
    console.log(`✅ Successfully downloaded: ${allSucceeded.filter(s => !s.cached).length}`);
    console.log(`📁 Already cached: ${allSucceeded.filter(s => s.cached).length}`);
    console.log(`❌ Failed: ${allFailed.length}`);
    console.log(`📁 Total images in folder: ${fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.gif')).length}`);

    if (allFailed.length > 0 && allFailed.length <= 10) {
      console.log('\n❌ Failed downloads:');
      allFailed.forEach(f => {
        const creature = f.value?.creature || f.reason;
        const error = f.value?.error || 'Unknown error';
        console.log(`  - ${creature.name}: ${error}`);
      });
    }

    console.log('\n🎉 Batch download complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

main();
