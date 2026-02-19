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

// Cache and rate limiting configuration
const OCR_MONTHLY_LIMIT = 25000;
const OCR_WARNING_THRESHOLD = 20000; // 80% of monthly limit

/**
 * Generate a lightweight fingerprint from a base64 image string.
 * Uses a combination of length, sampled char codes, and a simple hash
 * to create a stable identifier without processing the full base64.
 * @param {string} base64Image - Full base64 image string (including data: prefix)
 * @returns {string} - Hex fingerprint string
 */
const generateImageHash = (base64Image) => {
  const str = base64Image;
  const len = str.length;

  // Sample ~200 positions spread across the string for a stable fingerprint
  const sampleCount = 200;
  const step = Math.max(1, Math.floor(len / sampleCount));
  let hash = len; // Include length in hash to distinguish differently-sized images

  for (let i = 0; i < len; i += step) {
    const code = str.charCodeAt(i);
    // djb2-style hash: hash * 31 + charCode (using bitwise for performance)
    hash = ((hash << 5) - hash + code) | 0;
  }

  // Convert to unsigned hex string
  return (hash >>> 0).toString(16).padStart(8, '0') + '_' + len.toString(36);
};

/**
 * Get the current month key for request counting (format: YYYY-MM)
 * @returns {string}
 */
const getCurrentMonthKey = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}`;
};

/**
 * Get the localStorage key for the current month's request counter
 * @returns {string}
 */
const getRequestCounterKey = () => `ocr_requests_${getCurrentMonthKey()}`;

/**
 * Get the number of OCR API requests made this month
 * @returns {number}
 */
export const getMonthlyRequestCount = () => {
  try {
    const count = localStorage.getItem(getRequestCounterKey());
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
};

/**
 * Increment the monthly request counter by 1
 */
const incrementRequestCounter = () => {
  try {
    const key = getRequestCounterKey();
    const current = getMonthlyRequestCount();
    localStorage.setItem(key, String(current + 1));
  } catch {
    // localStorage unavailable - silently ignore
  }
};

/**
 * Check if the monthly usage is at or above the warning threshold
 * @returns {{ nearLimit: boolean, count: number, limit: number, threshold: number }}
 */
export const getUsageStatus = () => {
  const count = getMonthlyRequestCount();
  return {
    nearLimit: count >= OCR_WARNING_THRESHOLD,
    count,
    limit: OCR_MONTHLY_LIMIT,
    threshold: OCR_WARNING_THRESHOLD,
  };
};

/**
 * Retrieve a cached OCR result for the given image hash, if it exists
 * @param {string} hash - Image fingerprint from generateImageHash
 * @returns {{ text: string, confidence: number } | null}
 */
const getCachedResult = (hash) => {
  try {
    const key = `ocr_cache_${hash}`;
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch {
    return null;
  }
};

/**
 * Store an OCR result in localStorage cache
 * @param {string} hash - Image fingerprint
 * @param {{ text: string, confidence: number }} result - OCR result to cache
 */
const setCachedResult = (hash, result) => {
  try {
    const key = `ocr_cache_${hash}`;
    localStorage.setItem(key, JSON.stringify(result));
  } catch {
    // localStorage quota exceeded or unavailable - silently ignore
  }
};

// Quality thresholds (exported for use by components)
export const QUALITY_THRESHOLDS = {
  MIN_RESOLUTION: { width: 800, height: 600 },
  MIN_BRIGHTNESS: 30,
  MAX_BRIGHTNESS: 225,
  MIN_CONTRAST: 50,
  MIN_SHARPNESS: 100,
};

/**
 * Call OCR.space API to extract text from image.
 * Uses localStorage cache to avoid duplicate requests for the same image.
 * Tracks monthly request count and warns when near the free-tier limit.
 * @param {string} base64Image - Base64 encoded image (with data: prefix)
 * @returns {Promise<{text: string, confidence: number, fromCache: boolean}>}
 */
const callOcrSpaceApi = async (base64Image) => {
  // Check cache first
  const hash = generateImageHash(base64Image);
  const cached = getCachedResult(hash);
  if (cached) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[callOcrSpaceApi] Cache hit for hash ${hash}`);
    }
    return { ...cached, fromCache: true };
  }

  // Warn if approaching monthly limit before making the request
  const usage = getUsageStatus();
  if (usage.nearLimit) {
    console.warn(
      `[OCR] Monthly usage warning: ${usage.count}/${usage.limit} requests used this month. ` +
      `Threshold is ${usage.threshold} (80%).`
    );
  }

  return _callOcrSpaceApiRaw(base64Image, hash);
};

/**
 * Internal: perform the actual HTTP call to OCR.space, cache the result,
 * and increment the monthly counter.
 * @param {string} base64Image
 * @param {string} hash - Pre-computed image fingerprint
 * @returns {Promise<{text: string, confidence: number, fromCache: boolean}>}
 */
const _callOcrSpaceApiRaw = async (base64Image, hash) => {
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

  const ocrResult = {
    text: parsedText.ParsedText || '',
    confidence: parsedText.TextOverlay?.Lines?.reduce((sum, line) => {
      const lineConf = line.Words?.reduce((s, w) => s + (w.WordConfidence || 0), 0) || 0;
      return sum + lineConf / (line.Words?.length || 1);
    }, 0) / (parsedText.TextOverlay?.Lines?.length || 1) || 0,
  };

  // Cache result and track usage
  setCachedResult(hash, ocrResult);
  incrementRequestCounter();

  if (process.env.NODE_ENV === 'development') {
    const newCount = getMonthlyRequestCount();
    console.log(`[callOcrSpaceApi] API call made. Monthly count: ${newCount}/${OCR_MONTHLY_LIMIT}`);
  }

  return { ...ocrResult, fromCache: false };
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

      // Apply 200% zoom to improve OCR accuracy for small text (stages like "1/3")
      // OCR.space free tier has 1024 KB limit
      const zoomFactor = cropToCreatureList ? 2.0 : 1.0;
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
