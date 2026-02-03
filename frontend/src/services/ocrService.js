/**
 * OCR Service
 * Processes bestiary screenshots using Tesseract.js
 */

import { createWorker } from 'tesseract.js';

/**
 * Initialize Tesseract worker
 * @returns {Promise<Worker>}
 */
const initializeWorker = async () => {
  const worker = await createWorker('eng', 1, {
    logger: (m) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[OCR]', m);
      }
    },
  });

  // Configure for better accuracy on game UI
  await worker.setParameters({
    tessedit_pageseg_mode: '11', // Sparse text. Find as much text as possible
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ()-/✓✔',
  });

  return worker;
};

/**
 * Detect if a region of the image has color (not grayscale/black)
 * @param {ImageData} imageData - Image data to analyze
 * @param {number} x - Starting x coordinate
 * @param {number} y - Starting y coordinate
 * @param {number} width - Width of region
 * @param {number} height - Height of region
 * @returns {boolean} - True if region has color
 */
const hasColorInRegion = (imageData, x, y, width, height) => {
  const data = imageData.data;
  const imgWidth = imageData.width;
  let colorPixels = 0;
  let totalPixels = 0;

  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      const px = Math.min(x + dx, imgWidth - 1);
      const py = Math.min(y + dy, imageData.height - 1);
      const i = (py * imgWidth + px) * 4;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Check if pixel has significant color variation (not grayscale)
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      if (maxDiff > 30) {
        colorPixels++;
      }
      totalPixels++;
    }
  }

  // If more than 5% of pixels have color, consider it colored
  return colorPixels / totalPixels > 0.05;
};

/**
 * Preprocess image for better OCR accuracy
 * @param {File} imageFile - The image file to process
 * @param {boolean} detectColor - Whether to detect colored creatures (default: false)
 * @returns {Promise<{processedImage: string, originalImageData?: ImageData}>} - Processed image data
 */
const preprocessImage = async (imageFile, detectColor = false) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const originalImageData = detectColor ?
        ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      const data = imageData.data;

      // Convert to grayscale and increase contrast for OCR
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Increase contrast (simple threshold)
        const threshold = 128;
        const value = avg > threshold ? 255 : 0;

        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
      }

      ctx.putImageData(imageData, 0, 0);
      resolve({
        processedImage: canvas.toDataURL('image/png'),
        originalImageData,
      });
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

/**
 * Extract text from bestiary screenshot
 * @param {File} imageFile - The screenshot image file
 * @param {Function} onProgress - Progress callback (optional)
 * @param {boolean} detectColor - Whether to detect colored creatures (default: true)
 * @returns {Promise<{success: boolean, text?: string, confidence?: number, originalImageData?: ImageData, error?: string}>}
 */
export const extractTextFromImage = async (imageFile, onProgress, detectColor = true) => {
  let worker;

  try {
    // Validate file
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      return { success: false, error: 'Invalid image file' };
    }

    // Preprocess image for better OCR
    const { processedImage, originalImageData } = await preprocessImage(imageFile, detectColor);

    // Initialize worker
    worker = await initializeWorker();

    // Perform OCR
    // Note: onProgress callback is handled in initializeWorker's global logger
    // to avoid Worker cloning issues
    const { data } = await worker.recognize(processedImage);

    // Terminate worker
    await worker.terminate();

    return {
      success: true,
      text: data.text,
      confidence: data.confidence,
      originalImageData,
    };
  } catch (error) {
    console.error('OCR Error:', error);

    if (worker) {
      await worker.terminate();
    }

    return {
      success: false,
      error: error.message || 'Failed to process image',
    };
  }
};

/**
 * Validate if image looks like a Tibia bestiary screenshot
 * Basic heuristics based on common UI elements
 * @param {string} text - OCR extracted text
 * @returns {boolean}
 */
export const validateBestiaryScreenshot = (text) => {
  if (!text) return false;

  const lowerText = text.toLowerCase();

  // Common bestiary UI elements
  const bestiaryKeywords = [
    'bestiary',
    'creature',
    'kills',
    'progress',
    'charm points',
    'charm',
  ];

  // Check if at least 2 keywords are present
  const matchCount = bestiaryKeywords.filter((keyword) =>
    lowerText.includes(keyword)
  ).length;

  return matchCount >= 2;
};

/**
 * Detect if creatures in a region have color
 * Exported for use by parser/components
 * @param {ImageData} imageData - Image data to analyze
 * @param {number} x - Starting x coordinate
 * @param {number} y - Starting y coordinate
 * @param {number} width - Width of region
 * @param {number} height - Height of region
 * @returns {boolean} - True if region has color
 */
export const detectColorInRegion = hasColorInRegion;
