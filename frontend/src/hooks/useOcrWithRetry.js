/**
 * useOcrWithRetry Hook
 * Provides OCR processing with automatic retry and exponential backoff
 */

import { useState, useCallback, useRef } from 'react';
import { extractTextFromImage } from '../services/ocrService';

/**
 * Custom hook for OCR processing with retry logic
 * @param {Object} options - Hook options
 * @param {number} options.maxRetries - Maximum retry attempts (default: 3)
 * @param {Function} options.onProgress - Progress callback (progress, retryCount)
 * @param {Function} options.onError - Error callback (error, retryCount)
 * @param {Function} options.onSuccess - Success callback (result)
 * @returns {Object} - { processOcr, isProcessing, progress, retryCount, error, cancel }
 */
export const useOcrWithRetry = ({
  maxRetries = 3,
  onProgress,
  onError,
  onSuccess,
} = {}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);

  // Use ref to track if processing was cancelled
  const cancelledRef = useRef(false);
  const currentRetryRef = useRef(0);

  /**
   * Calculate delay for exponential backoff
   * @param {number} attemptNumber - Current attempt number (0-based)
   * @returns {number} - Delay in milliseconds
   */
  const calculateBackoffDelay = (attemptNumber) => {
    // Exponential backoff: 1s, 2s, 4s
    return Math.pow(2, attemptNumber) * 1000;
  };

  /**
   * Wait for specified delay
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Process OCR with retry logic
   * @param {File} imageFile - Image file to process
   * @param {boolean} detectColor - Whether to detect colored creatures
   * @param {boolean} cropToCreatureList - Whether to crop to creature list area
   * @returns {Promise<Object>} - OCR result
   */
  const processOcr = useCallback(async (
    imageFile,
    detectColor = true,
    cropToCreatureList = true
  ) => {
    if (!imageFile) {
      const err = new Error('No image file provided');
      setError(err);
      return { success: false, error: err.message };
    }

    // Reset state
    setIsProcessing(true);
    setProgress(0);
    setRetryCount(0);
    setError(null);
    cancelledRef.current = false;
    currentRetryRef.current = 0;

    let lastError = null;

    // Retry loop
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      // Check if cancelled
      if (cancelledRef.current) {
        setIsProcessing(false);
        return { success: false, error: 'Cancelled by user' };
      }

      currentRetryRef.current = attempt;
      setRetryCount(attempt);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[useOcrWithRetry] Attempt ${attempt + 1}/${maxRetries + 1}`);
      }

      try {
        // Custom progress callback that includes retry info
        const progressCallback = (progressValue) => {
          setProgress(progressValue);
          if (onProgress) {
            onProgress(progressValue, attempt);
          }
        };

        // Attempt OCR processing
        const result = await extractTextFromImage(
          imageFile,
          progressCallback,
          detectColor,
          cropToCreatureList
        );

        // Check if cancelled during processing
        if (cancelledRef.current) {
          setIsProcessing(false);
          return { success: false, error: 'Cancelled by user' };
        }

        // Success
        if (result.success) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[useOcrWithRetry] Success on attempt ${attempt + 1}`);
          }

          setIsProcessing(false);
          setProgress(100);

          if (onSuccess) {
            onSuccess(result);
          }

          return result;
        }

        // OCR returned error (but no exception)
        lastError = new Error(result.error || 'OCR processing failed');

        if (process.env.NODE_ENV === 'development') {
          console.warn(`[useOcrWithRetry] Attempt ${attempt + 1} failed:`, result.error);
        }

      } catch (err) {
        lastError = err;

        if (process.env.NODE_ENV === 'development') {
          console.error(`[useOcrWithRetry] Attempt ${attempt + 1} exception:`, err);
        }
      }

      // If this was the last attempt, break
      if (attempt >= maxRetries) {
        break;
      }

      // Calculate backoff delay
      const delay = calculateBackoffDelay(attempt);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[useOcrWithRetry] Retrying in ${delay}ms...`);
      }

      // Call error callback (but not the last attempt)
      if (onError) {
        onError(lastError, attempt);
      }

      // Wait before retry
      await wait(delay);
    }

    // All attempts failed
    const finalError = lastError || new Error('OCR failed after all retries');

    if (process.env.NODE_ENV === 'development') {
      console.error(`[useOcrWithRetry] All ${maxRetries + 1} attempts failed`);
    }

    setError(finalError);
    setIsProcessing(false);

    // Call error callback for final failure
    if (onError) {
      onError(finalError, maxRetries);
    }

    return {
      success: false,
      error: finalError.message,
    };
  }, [maxRetries, onProgress, onError, onSuccess]);

  /**
   * Cancel ongoing processing
   */
  const cancel = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[useOcrWithRetry] Cancelled by user');
    }

    cancelledRef.current = true;
    setIsProcessing(false);
    setError(new Error('Cancelled by user'));
  }, []);

  return {
    processOcr,
    isProcessing,
    progress,
    retryCount,
    error,
    cancel,
  };
};

export default useOcrWithRetry;
