/**
 * Image Quality Analysis Utilities
 * Provides functions to analyze image quality before OCR processing
 */

/**
 * Quality thresholds for OCR processing
 */
export const QUALITY_THRESHOLDS = {
  MIN_RESOLUTION: { width: 800, height: 600 },
  OPTIMAL_RESOLUTION: { width: 1920, height: 1080 },
  MIN_BRIGHTNESS: 30,
  MAX_BRIGHTNESS: 225,
  OPTIMAL_BRIGHTNESS: { min: 80, max: 180 },
  MIN_CONTRAST: 50,
  OPTIMAL_CONTRAST: 100,
  MIN_SHARPNESS: 100,
  OPTIMAL_SHARPNESS: 200,
};

/**
 * Check image resolution
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {{passed: boolean, score: number, message: string, suggestion: string}}
 */
export const checkResolution = (width, height) => {
  const { MIN_RESOLUTION, OPTIMAL_RESOLUTION } = QUALITY_THRESHOLDS;

  const passed = width >= MIN_RESOLUTION.width && height >= MIN_RESOLUTION.height;

  // Calculate score (0-100)
  const widthRatio = width / OPTIMAL_RESOLUTION.width;
  const heightRatio = height / OPTIMAL_RESOLUTION.height;
  const avgRatio = (widthRatio + heightRatio) / 2;
  const score = Math.min(100, Math.round(avgRatio * 100));

  let message;
  let suggestion = '';

  if (!passed) {
    message = `Resolution too low (${width}x${height})`;
    suggestion = `Minimum required: ${MIN_RESOLUTION.width}x${MIN_RESOLUTION.height}`;
  } else if (score < 70) {
    message = `Low resolution (${width}x${height})`;
    suggestion = 'Consider taking screenshot in fullscreen mode';
  } else {
    message = `Good resolution (${width}x${height})`;
  }

  return { passed, score, message, suggestion };
};

/**
 * Calculate average brightness of image
 * @param {ImageData} imageData - Canvas ImageData object
 * @returns {{passed: boolean, score: number, message: string, suggestion: string}}
 */
export const checkBrightness = (imageData) => {
  const { data } = imageData;
  let totalBrightness = 0;
  const pixelCount = data.length / 4;

  // Calculate average brightness (luminance)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Luminance formula (perceived brightness)
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    totalBrightness += brightness;
  }

  const avgBrightness = totalBrightness / pixelCount;
  const { MIN_BRIGHTNESS, MAX_BRIGHTNESS, OPTIMAL_BRIGHTNESS } = QUALITY_THRESHOLDS;

  const passed = avgBrightness >= MIN_BRIGHTNESS && avgBrightness <= MAX_BRIGHTNESS;

  // Calculate score
  let score;
  if (avgBrightness >= OPTIMAL_BRIGHTNESS.min && avgBrightness <= OPTIMAL_BRIGHTNESS.max) {
    score = 100;
  } else if (avgBrightness < OPTIMAL_BRIGHTNESS.min) {
    score = Math.round((avgBrightness / OPTIMAL_BRIGHTNESS.min) * 100);
  } else {
    score = Math.round((1 - (avgBrightness - OPTIMAL_BRIGHTNESS.max) / (255 - OPTIMAL_BRIGHTNESS.max)) * 100);
  }
  score = Math.max(0, Math.min(100, score));

  let message;
  let suggestion = '';

  if (avgBrightness < MIN_BRIGHTNESS) {
    message = 'Image too dark';
    suggestion = 'Increase brightness or gamma settings';
  } else if (avgBrightness > MAX_BRIGHTNESS) {
    message = 'Image too bright';
    suggestion = 'Reduce brightness or avoid overexposed areas';
  } else if (avgBrightness < OPTIMAL_BRIGHTNESS.min) {
    message = 'Brightness below optimal';
    suggestion = 'Consider increasing brightness slightly';
  } else if (avgBrightness > OPTIMAL_BRIGHTNESS.max) {
    message = 'Brightness above optimal';
    suggestion = 'Consider reducing brightness slightly';
  } else {
    message = 'Good brightness';
  }

  return { passed, score, message, suggestion, value: Math.round(avgBrightness) };
};

/**
 * Calculate contrast (standard deviation of pixel values)
 * @param {ImageData} imageData - Canvas ImageData object
 * @returns {{passed: boolean, score: number, message: string, suggestion: string}}
 */
export const checkContrast = (imageData) => {
  const { data } = imageData;
  const pixelCount = data.length / 4;

  // Calculate mean brightness first
  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    totalBrightness += brightness;
  }
  const meanBrightness = totalBrightness / pixelCount;

  // Calculate standard deviation (contrast measure)
  let varianceSum = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    varianceSum += Math.pow(brightness - meanBrightness, 2);
  }
  const stdDev = Math.sqrt(varianceSum / pixelCount);

  const { MIN_CONTRAST, OPTIMAL_CONTRAST } = QUALITY_THRESHOLDS;
  const passed = stdDev >= MIN_CONTRAST;

  // Calculate score (0-100)
  const score = Math.min(100, Math.round((stdDev / OPTIMAL_CONTRAST) * 100));

  let message;
  let suggestion = '';

  if (!passed) {
    message = 'Very low contrast';
    suggestion = 'Image appears washed out - increase contrast or use better lighting';
  } else if (score < 70) {
    message = 'Low contrast';
    suggestion = 'Consider increasing contrast for better OCR accuracy';
  } else {
    message = 'Good contrast';
  }

  return { passed, score, message, suggestion, value: Math.round(stdDev) };
};

/**
 * Detect image blur using Laplacian variance
 * @param {ImageData} imageData - Canvas ImageData object
 * @returns {{passed: boolean, score: number, message: string, suggestion: string}}
 */
export const checkBlur = (imageData) => {
  const { data, width, height } = imageData;

  // Convert to grayscale
  const gray = new Float32Array(width * height);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    gray[i / 4] = brightness;
  }

  // Apply Laplacian operator (edge detection)
  let laplacianSum = 0;
  let edgeCount = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;

      // Laplacian kernel
      const laplacian = Math.abs(
        -1 * gray[idx - width - 1] + -1 * gray[idx - width] + -1 * gray[idx - width + 1] +
        -1 * gray[idx - 1]         +  8 * gray[idx]         + -1 * gray[idx + 1] +
        -1 * gray[idx + width - 1] + -1 * gray[idx + width] + -1 * gray[idx + width + 1]
      );

      laplacianSum += laplacian * laplacian;
      edgeCount++;
    }
  }

  // Variance of Laplacian (blur metric)
  const variance = laplacianSum / edgeCount;

  const { MIN_SHARPNESS, OPTIMAL_SHARPNESS } = QUALITY_THRESHOLDS;
  const passed = variance >= MIN_SHARPNESS;

  // Calculate score (0-100)
  const score = Math.min(100, Math.round((variance / OPTIMAL_SHARPNESS) * 100));

  let message;
  let suggestion = '';

  if (!passed) {
    message = 'Image appears blurry';
    suggestion = 'Take a sharper screenshot or reduce motion blur';
  } else if (score < 70) {
    message = 'Slight blur detected';
    suggestion = 'Consider taking a sharper screenshot for better results';
  } else {
    message = 'Good sharpness';
  }

  return { passed, score, message, suggestion, value: Math.round(variance) };
};

/**
 * Load image file and extract ImageData
 * @param {File} imageFile - Image file to load
 * @returns {Promise<{imageData: ImageData, width: number, height: number}>}
 */
const loadImageData = (imageFile) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      resolve({
        imageData,
        width: canvas.width,
        height: canvas.height,
      });
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
};

/**
 * Analyze complete image quality
 * @param {File} imageFile - Image file to analyze
 * @returns {Promise<{overallScore: number, passed: boolean, checks: Object, suggestions: string[]}>}
 */
export const analyzeImageQuality = async (imageFile) => {
  try {
    const { imageData, width, height } = await loadImageData(imageFile);

    // Run all quality checks
    const resolutionCheck = checkResolution(width, height);
    const brightnessCheck = checkBrightness(imageData);
    const contrastCheck = checkContrast(imageData);
    const blurCheck = checkBlur(imageData);

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      resolutionCheck.score * 0.3 +
      brightnessCheck.score * 0.25 +
      contrastCheck.score * 0.25 +
      blurCheck.score * 0.2
    );

    // Check if all critical tests passed
    const passed = resolutionCheck.passed && brightnessCheck.passed &&
                   contrastCheck.passed && blurCheck.passed;

    // Collect all suggestions
    const suggestions = [
      resolutionCheck.suggestion,
      brightnessCheck.suggestion,
      contrastCheck.suggestion,
      blurCheck.suggestion,
    ].filter(s => s !== '');

    return {
      overallScore,
      passed,
      checks: {
        resolution: resolutionCheck,
        brightness: brightnessCheck,
        contrast: contrastCheck,
        blur: blurCheck,
      },
      suggestions,
    };
  } catch (error) {
    console.error('Image quality analysis failed:', error);
    throw error;
  }
};
