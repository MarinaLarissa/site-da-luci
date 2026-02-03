/**
 * Script to download creature images from TibiaWiki and store locally
 *
 * This script:
 * 1. Reads all creatures from bestiary.js
 * 2. Downloads each image from TibiaWiki
 * 3. Saves to public/images/creatures/
 * 4. Updates bestiary.js with local paths
 *
 * Usage: node scripts/download-creature-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BESTIARY_FILE = path.join(__dirname, '../src/data/bestiary.js');
const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');
const MAX_CONCURRENT = 5; // Download 5 images at a time
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

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
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath, attempt)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        if (attempt < RETRY_ATTEMPTS) {
          console.log(`  ⚠️  Status ${res.statusCode}, retrying (${attempt}/${RETRY_ATTEMPTS})...`);
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
        console.log(`  ⚠️  Network error, retrying (${attempt}/${RETRY_ATTEMPTS})...`);
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
 * Process downloads in batches
 */
const processBatch = async (batch, batchNum, totalBatches) => {
  console.log(`\n📦 Batch ${batchNum}/${totalBatches} (${batch.length} images)`);

  const results = await Promise.allSettled(
    batch.map(async ({ creature, url, filepath, filename }) => {
      try {
        // Check if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`  ✓ ${creature.name} (cached)`);
          return { success: true, creature, filename };
        }

        await downloadImage(url, filepath);
        console.log(`  ✓ ${creature.name}`);
        return { success: true, creature, filename };
      } catch (error) {
        console.log(`  ✗ ${creature.name}: ${error.message}`);
        return { success: false, creature, error: error.message };
      }
    })
  );

  const succeeded = results.filter(r => r.status === 'fulfilled' && r.value.success).map(r => r.value);
  const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success));

  return { succeeded, failed };
};

/**
 * Update bestiary.js with local image paths
 */
const updateBestiaryFile = (successfulDownloads) => {
  console.log('\n📝 Updating bestiary.js with local paths...');

  let content = fs.readFileSync(BESTIARY_FILE, 'utf8');

  // Create a map of creature ID to filename
  const imageMap = new Map(
    successfulDownloads.map(({ creature, filename }) => [creature.id, filename])
  );

  // Replace imageUrl values
  successfulDownloads.forEach(({ creature, filename }) => {
    // Match the creature's imageUrl field (handling both .gif and potential variations)
    const oldUrlPattern = new RegExp(
      `"imageUrl":\\s*"https://tibia\\.fandom\\.com/wiki/Special:FilePath/[^"]+\\.gif"`,
      'g'
    );

    const newUrl = `"imageUrl": "/images/creatures/${filename}"`;

    // Find and replace for this specific creature
    // We need to be more precise to avoid replacing wrong creatures
    const creaturePattern = new RegExp(
      `"id":\\s*"${creature.id}"[^}]*?"imageUrl":\\s*"[^"]+?"`,
      's'
    );

    const match = content.match(creaturePattern);
    if (match) {
      const oldImageUrl = match[0].match(/"imageUrl":\s*"[^"]+"/)[0];
      content = content.replace(oldImageUrl, newUrl);
    }
  });

  // Backup original file
  const backupFile = BESTIARY_FILE.replace('.js', '.backup-images.js');
  fs.copyFileSync(BESTIARY_FILE, backupFile);
  console.log(`💾 Backup saved: ${path.basename(backupFile)}`);

  // Write updated content
  fs.writeFileSync(BESTIARY_FILE, content, 'utf8');
  console.log(`✅ Updated bestiary.js with ${successfulDownloads.length} local image paths`);
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🖼️  Creature Image Downloader');
    console.log('============================\n');

    // Read bestiary data
    console.log('📖 Reading bestiary.js...');
    const bestiaryContent = fs.readFileSync(BESTIARY_FILE, 'utf8');

    // Extract BESTIARY_DATA array
    const dataMatch = bestiaryContent.match(/export const BESTIARY_DATA = \[([\s\S]*?)\];/);
    if (!dataMatch) {
      throw new Error('Could not find BESTIARY_DATA in bestiary.js');
    }

    const creaturesJson = '[' + dataMatch[1] + ']';
    const creatures = JSON.parse(creaturesJson);

    console.log(`✅ Found ${creatures.length} creatures\n`);

    // Prepare download tasks
    const downloadTasks = creatures
      .filter(c => c.imageUrl && c.imageUrl.includes('tibia.fandom.com'))
      .map(creature => {
        const filename = creature.imageUrl.split('/').pop();
        const filepath = path.join(IMAGES_DIR, filename);
        return {
          creature,
          url: creature.imageUrl,
          filepath,
          filename
        };
      });

    console.log(`📥 Downloading ${downloadTasks.length} images...`);
    console.log(`📁 Destination: ${IMAGES_DIR}`);
    console.log(`🔄 Concurrency: ${MAX_CONCURRENT} images at a time\n`);

    // Split into batches
    const batches = [];
    for (let i = 0; i < downloadTasks.length; i += MAX_CONCURRENT) {
      batches.push(downloadTasks.slice(i, i + MAX_CONCURRENT));
    }

    // Process all batches
    let allSucceeded = [];
    let allFailed = [];

    for (let i = 0; i < batches.length; i++) {
      const { succeeded, failed } = await processBatch(batches[i], i + 1, batches.length);
      allSucceeded = allSucceeded.concat(succeeded);
      allFailed = allFailed.concat(failed);

      // Small delay between batches to be respectful
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update bestiary.js
    if (allSucceeded.length > 0) {
      updateBestiaryFile(allSucceeded);
    }

    // Summary
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`✅ Succeeded: ${allSucceeded.length}`);
    console.log(`✗ Failed: ${allFailed.length}`);

    if (allFailed.length > 0) {
      console.log('\n❌ Failed downloads:');
      allFailed.slice(0, 10).forEach(f => {
        const creature = f.value?.creature || f.reason;
        const error = f.value?.error || 'Unknown error';
        console.log(`  - ${creature.name}: ${error}`);
      });
      if (allFailed.length > 10) {
        console.log(`  ... and ${allFailed.length - 10} more`);
      }
    }

    console.log('\n🎉 Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

main();
