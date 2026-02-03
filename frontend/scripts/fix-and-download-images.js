/**
 * Fix Image Names and Download Missing Images
 * Tries variations of creature names to find correct images on TibiaWiki
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/creatures');
const MAX_RETRIES = 3;

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * Test if a URL exists
 */
const testUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
};

/**
 * Download an image
 */
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status: ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
};

/**
 * Generate name variations for problematic names
 */
const generateNameVariations = (originalName) => {
  const variations = [];
  const nameWithoutExt = originalName.replace('.gif', '');

  // Original
  variations.push(originalName);

  // Handle parentheses - swap order (e.g., "Nomad_(blue)" -> "Blue_Nomad")
  const parenMatch = nameWithoutExt.match(/^(.+?)_\((.+?)\)$/);
  if (parenMatch) {
    const [, baseName, modifier] = parenMatch;
    // Capitalize first letter of modifier
    const capitalizedModifier = modifier.charAt(0).toUpperCase() + modifier.slice(1);
    variations.push(`${capitalizedModifier}_${baseName}.gif`);
    variations.push(`${modifier}_${baseName}.gif`);
    // Without parentheses
    variations.push(`${baseName}_${capitalizedModifier}.gif`);
    variations.push(`${baseName}_${modifier}.gif`);
  }

  // Handle slashes - try with underscores
  if (nameWithoutExt.includes('/')) {
    variations.push(nameWithoutExt.replace(/\//g, '_') + '.gif');
    variations.push(nameWithoutExt.replace(/\//g, '-') + '.gif');
    variations.push(nameWithoutExt.replace(/\//g, '') + '.gif');
  }

  // Handle "Of" capitalization issues
  if (nameWithoutExt.includes('_Of_')) {
    variations.push(nameWithoutExt.replace(/_Of_/g, '_of_') + '.gif');
  }
  if (nameWithoutExt.includes('_of_')) {
    variations.push(nameWithoutExt.replace(/_of_/g, '_Of_') + '.gif');
  }

  // Remove duplicate variations
  return [...new Set(variations)];
};

/**
 * Try to download image with name variations
 */
const tryDownloadWithVariations = async (originalName) => {
  const variations = generateNameVariations(originalName);
  console.log(`\n📝 Trying ${variations.length} variations for: ${originalName}`);

  for (const variation of variations) {
    const url = `https://tibia.fandom.com/wiki/Special:FilePath/${variation}`;
    const exists = await testUrl(url);

    if (exists) {
      console.log(`  ✓ Found: ${variation}`);
      const filename = variation.replace(/[()\/]/g, '_');
      const filepath = path.join(IMAGES_DIR, filename);

      try {
        await downloadImage(url, filepath);
        console.log(`  ✓ Downloaded as: ${filename}`);
        return { success: true, originalName, downloadedAs: filename, url: variation };
      } catch (error) {
        console.log(`  ✗ Failed to download ${variation}: ${error.message}`);
      }
    }
  }

  console.log(`  ✗ No valid variation found`);
  return { success: false, originalName };
};

/**
 * Main execution
 */
const main = async () => {
  console.log('🔧 Image Name Fixer and Downloader');
  console.log('===================================\n');

  // List of problematic images
  const problematicImages = [
    'Butterfly_(purple/blue/red).gif',
    'Nomad_(blue).gif',
    'Nomad_(female).gif',
    'Novice_Of_The_Cult.gif',
    'Acolyte_Of_The_Cult.gif',
    'Adept_Of_The_Cult.gif',
    'Enlightened_Of_The_Cult.gif',
    'Minotaur_Cult_Propher.gif', // Possible typo: should be "Prophet"
    'Menancing_Carnivor.gif', // Possible typo: should be "Menacing"
  ];

  // Also try common typos
  const typoVariations = [
    { from: 'Propher', to: 'Prophet' },
    { from: 'Menancing', to: 'Menacing' },
  ];

  // Add typo variations to the list
  problematicImages.forEach(img => {
    typoVariations.forEach(({ from, to }) => {
      if (img.includes(from)) {
        problematicImages.push(img.replace(from, to));
      }
    });
  });

  const results = [];

  for (const imageName of problematicImages) {
    const result = await tryDownloadWithVariations(imageName);
    results.push(result);
    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n\n📊 Summary');
  console.log('==========');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successfully downloaded: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\n✅ Downloaded:');
    successful.forEach(r => {
      console.log(`  - ${r.originalName} -> ${r.downloadedAs}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed (images not found on TibiaWiki):');
    failed.forEach(r => {
      console.log(`  - ${r.originalName}`);
    });
  }

  console.log('\n🎉 Done!');
};

main();
