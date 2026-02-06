/**
 * OCR Service
 * Processes bestiary screenshots using OCR.space API
 *
 * OCR.space is much better for small text like Tibia UI compared to Tesseract.js
 * Free tier: 25,000 requests/month
 */

// OCR.space API configuration
const OCR_SPACE_API_KEY = process.env.REACT_APP_OCR_SPACE_API_KEY || '';
const OCR_SPACE_URL = 'https://api.ocr.space/parse/image';

// Quality thresholds (exported for use by components)
export const QUALITY_THRESHOLDS = {
  MIN_RESOLUTION: { width: 800, height: 600 },
  MIN_BRIGHTNESS: 30,
  MAX_BRIGHTNESS: 225,
  MIN_CONTRAST: 50,
  MIN_SHARPNESS: 100,
};

/**
 * Call OCR.space API to extract text from image
 * @param {string} base64Image - Base64 encoded image
 * @returns {Promise<{text: string, confidence: number}>}
 */
const callOcrSpaceApi = async (base64Image) => {
  const formData = new FormData();
  // OCR.space expects the FULL base64 string WITH prefix (data:image/png;base64,...)
  formData.append('base64Image', base64Image);
  formData.append('apikey', OCR_SPACE_API_KEY);
  formData.append('language', 'eng');
  formData.append('isOverlayRequired', 'false');
  formData.append('detectOrientation', 'true');
  formData.append('scale', 'true'); // Auto-scale for better accuracy
  formData.append('OCREngine', '2'); // Engine 2 is better for small text

  const response = await fetch(OCR_SPACE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OCR API error: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.IsErroredOnProcessing) {
    throw new Error(result.ErrorMessage?.[0] || 'OCR processing failed');
  }

  if (!result.ParsedResults || result.ParsedResults.length === 0) {
    throw new Error('No text found in image');
  }

  const parsedText = result.ParsedResults[0];

  return {
    text: parsedText.ParsedText || '',
    confidence: parsedText.TextOverlay?.Lines?.reduce((sum, line) => {
      const lineConf = line.Words?.reduce((s, w) => s + (w.WordConfidence || 0), 0) || 0;
      return sum + lineConf / (line.Words?.length || 1);
    }, 0) / (parsedText.TextOverlay?.Lines?.length || 1) || 0,
  };
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
 * @param {boolean} cropToCreatureList - Whether to crop to creature list area (default: true)
 * @returns {Promise<{processedImage: string, originalImageData?: ImageData}>} - Processed image data
 */
const preprocessImage = async (imageFile, detectColor = false, cropToCreatureList = true) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Calculate crop dimensions for creature list area
      // The creature grid is in the center of the Cyclopedia/Bestiary window
      // Focus on the area with creature icons and names
      let cropX = 0;
      let cropY = 0;
      let cropWidth = img.width;
      let cropHeight = img.height;

      if (cropToCreatureList) {
        // Crop PRECISELY to the bestiary window (based on typical Tibia UI layout)
        // Width: ~67% of screen (exact bestiary window width)
        cropWidth = Math.floor(img.width * 0.67);
        // Start at 24% from left (bestiary window left edge)
        cropX = Math.floor(img.width * 0.24);

        // Height: Bestiary window from top menu to bottom (64% of height)
        // Start at 20% from top (skip top game UI)
        cropY = Math.floor(img.height * 0.20);
        // Use 64% of height (bestiary window height)
        cropHeight = Math.floor(img.height * 0.64);
      }

      // Apply 150% zoom to improve OCR accuracy while keeping file size under 1MB
      // OCR.space free tier has 1024 KB limit
      const zoomFactor = cropToCreatureList ? 1.5 : 1.0;
      const finalWidth = Math.floor(cropWidth * zoomFactor);
      const finalHeight = Math.floor(cropHeight * zoomFactor);

      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Draw cropped and zoomed image with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,  // Source rectangle (crop area)
        0, 0, finalWidth, finalHeight          // Destination rectangle (zoomed)
      );

      // For color detection, save original image data
      const originalImageData = detectColor ?
        ctx.getImageData(0, 0, canvas.width, canvas.height) : null;

      // OCR.space works better with original colors, so no grayscale/contrast
      // Use JPEG with 92% quality to reduce file size (much smaller than PNG)
      // OCR.space free tier limit: 1024 KB
      let processedImage = canvas.toDataURL('image/jpeg', 0.92);

      // If still too large, reduce quality further
      const base64Length = processedImage.length * 0.75; // Approximate byte size
      if (base64Length > 1024 * 1024) {
        // Try 85% quality
        processedImage = canvas.toDataURL('image/jpeg', 0.85);
      }

      resolve({
        processedImage,
        originalImageData,
      });
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(imageFile);
  });
};

/**
 * Preprocess image with quality check
 * @param {File} imageFile - Image file to preprocess
 * @param {boolean} detectColor - Whether to detect colored creatures
 * @param {boolean} cropToCreatureList - Whether to crop to creature list area
 * @returns {Promise<{processedImage: string, originalImageData?: ImageData, cropRegion: Object}>}
 */
export const preprocessWithQualityCheck = async (imageFile, detectColor = true, cropToCreatureList = true) => {
  try {
    const { processedImage, originalImageData } = await preprocessImage(
      imageFile,
      detectColor,
      cropToCreatureList
    );

    // Calculate crop region for preview
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });

    const cropRegion = cropToCreatureList ? {
      x: Math.floor(img.width * 0.24),
      y: Math.floor(img.height * 0.20),
      width: Math.floor(img.width * 0.67),
      height: Math.floor(img.height * 0.64),
    } : {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height,
    };

    return {
      processedImage,
      originalImageData,
      cropRegion,
    };
  } catch (error) {
    console.error('[preprocessWithQualityCheck] Error:', error);
    throw error;
  }
};

/**
 * Extract text from bestiary screenshot
 * @param {File} imageFile - The screenshot image file
 * @param {Function} onProgress - Progress callback (optional)
 * @param {boolean} detectColor - Whether to detect colored creatures (default: true)
 * @param {boolean} cropToCreatureList - Whether to crop to creature list area (default: true)
 * @returns {Promise<{success: boolean, text?: string, confidence?: number, originalImageData?: ImageData, processedImage?: string, cropRegion?: Object, error?: string}>}
 */
export const extractTextFromImage = async (imageFile, onProgress, detectColor = true, cropToCreatureList = true) => {
  const startTime = Date.now();

  try {
    // Validate file
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      console.error('[extractTextFromImage] Invalid image file');
      return { success: false, error: 'Invalid image file' };
    }

    // Report progress (preprocessing)
    if (onProgress) onProgress(25);

    // Preprocess image for better OCR (crop and zoom)
    const { processedImage, originalImageData, cropRegion } = await preprocessWithQualityCheck(
      imageFile,
      detectColor,
      cropToCreatureList
    );

    // Report progress (calling API)
    if (onProgress) onProgress(50);

    // Perform OCR using OCR.space API
    const { text, confidence } = await callOcrSpaceApi(processedImage);

    // Report progress (complete)
    if (onProgress) onProgress(100);

    const duration = Date.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[extractTextFromImage] Success in ${duration}ms, confidence: ${confidence}`);
    }

    return {
      success: true,
      text,
      confidence,
      originalImageData,
      processedImage, // Include cropped image for preview
      cropRegion, // Include crop region for preview modal
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[extractTextFromImage] Error after ${duration}ms:`, error);

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
 * @param {boolean} isCropped - Whether image was cropped to creature area
 * @returns {boolean}
 */
export const validateBestiaryScreenshot = (text, isCropped = false) => {
  if (!text) return false;

  const lowerText = text.toLowerCase();

  // If cropped, look for progress patterns (1/3, 2/3, etc.) and creature indicators
  if (isCropped) {
    // Progress pattern: X/3 or X / 3 (common in bestiary)
    const progressPattern = /\d+\s*\/\s*3/;
    const hasProgress = progressPattern.test(text);

    // Unknown creatures indicator
    const hasUnknown = lowerText.includes('unknown') || text.includes('?');

    // Any text at all (cropped area should have creature names)
    const hasText = text.trim().length > 10;

    // Accept if has progress markers OR unknown markers OR substantial text
    return hasProgress || hasUnknown || hasText;
  }

  // Original validation for full screenshots
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
