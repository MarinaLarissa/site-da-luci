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
    tessedit_pageseg_mode: '6', // Assume a single uniform block of text
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ()-/',
  });

  return worker;
};

/**
 * Preprocess image for better OCR accuracy
 * @param {File} imageFile - The image file to process
 * @returns {Promise<string>} - Base64 data URL of processed image
 */
const preprocessImage = async (imageFile) => {
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
      const data = imageData.data;

      // Convert to grayscale and increase contrast
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
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

/**
 * Extract text from bestiary screenshot
 * @param {File} imageFile - The screenshot image file
 * @param {Function} onProgress - Progress callback (optional)
 * @returns {Promise<{success: boolean, text?: string, confidence?: number, error?: string}>}
 */
export const extractTextFromImage = async (imageFile, onProgress) => {
  let worker;

  try {
    // Validate file
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      return { success: false, error: 'Invalid image file' };
    }

    // Preprocess image for better OCR
    const processedImage = await preprocessImage(imageFile);

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
