/**
 * useMultipleOcrProcessing Hook
 * Manages parallel OCR processing of multiple images with queue control
 */

import { useState, useCallback, useRef } from 'react';
import { extractTextFromImage } from '../services/ocrService';
import { parseOcrText } from '../utils/bestiaryOcrParser';

/**
 * Custom hook for processing multiple images with parallel control
 * @param {Object} options - Hook options
 * @param {number} options.maxParallel - Maximum parallel processes (default: 3)
 * @param {Function} options.onProgress - Progress callback (globalProgress, imageStatuses)
 * @param {Function} options.onComplete - Complete callback (results)
 * @param {Function} options.onError - Error callback (errors)
 * @returns {Object} - { processMultiple, isProcessing, globalProgress, results, imageStatuses, cancel, retryFailed }
 */
const useMultipleOcrProcessing = ({
  maxParallel = 3,
  onProgress,
  onComplete,
  onError,
} = {}) => {
  // State management
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [imageStatuses, setImageStatuses] = useState(new Map());

  // Refs for queue management
  const queueRef = useRef([]);
  const activeRef = useRef(new Set());
  const cancelledRef = useRef(false);
  const completedCountRef = useRef(0);
  const totalImagesRef = useRef(0);
  const imageProgressRef = useRef(new Map());

  /**
   * Generate unique file ID
   * @param {File} file - File object
   * @returns {string} - Unique ID
   */
  const generateFileId = (file) => {
    return `${file.name}_${file.size}_${file.lastModified}`;
  };

  /**
   * Update global progress based on individual image progress
   */
  const updateGlobalProgress = useCallback(() => {
    if (totalImagesRef.current === 0) {
      setGlobalProgress(0);
      return;
    }

    let totalProgress = 0;
    imageProgressRef.current.forEach(progress => {
      totalProgress += progress;
    });

    const global = Math.round(totalProgress / totalImagesRef.current);
    setGlobalProgress(global);

    if (onProgress) {
      onProgress(global, imageStatuses);
    }
  }, [imageStatuses, onProgress]);

  /**
   * Update individual image status
   * @param {string} fileId - File ID
   * @param {string} status - Status ('queued' | 'processing' | 'completed' | 'error')
   * @param {number} progress - Progress percentage (0-100)
   * @param {Object} result - OCR result
   * @param {Error} error - Error object
   */
  const updateImageStatus = useCallback((fileId, status, progress = 0, result = null, error = null) => {
    setImageStatuses(prev => {
      const newMap = new Map(prev);
      newMap.set(fileId, {
        status,
        progress,
        result,
        error,
      });
      return newMap;
    });

    // Update progress ref
    if (progress !== undefined) {
      imageProgressRef.current.set(fileId, progress);
    }

    // Calculate and update global progress
    updateGlobalProgress();
  }, [updateGlobalProgress]);

  /**
   * Process a single image
   * @param {File} file - Image file
   * @param {string} fileId - Unique file ID
   * @returns {Promise<Object>} - Result object
   */
  const processSingleImage = useCallback(async (file, fileId) => {
    try {
      // Update status to processing
      updateImageStatus(fileId, 'processing', 0);

      // Custom progress callback for this image
      const progressCallback = (progress) => {
        updateImageStatus(fileId, 'processing', progress);
      };

      // Extract text from image using OCR service
      const result = await extractTextFromImage(
        file,
        progressCallback,
        true,  // detectColor
        true   // cropToCreatureList
      );

      // Check if cancelled
      if (cancelledRef.current) {
        return { fileId, fileName: file.name, success: false, cancelled: true };
      }

      // Check if OCR was successful
      if (!result.success) {
        throw new Error(result.error || 'OCR processing failed');
      }

      // Parse OCR text to extract creatures
      const parsed = parseOcrText(result.text, 0.75);

      // Update status to completed
      updateImageStatus(fileId, 'completed', 100, parsed);

      return {
        fileId,
        fileName: file.name,
        success: true,
        matched: parsed.matched,
        unmatched: parsed.unmatched,
        totalFound: parsed.totalFound,
        confidence: result.confidence,
      };

    } catch (error) {
      // Update status to error
      updateImageStatus(fileId, 'error', 0, null, error);

      return {
        fileId,
        fileName: file.name,
        success: false,
        error: error.message,
      };
    } finally {
      // Remove from active set
      activeRef.current.delete(fileId);
      completedCountRef.current++;
    }
  }, [updateImageStatus]);

  /**
   * Consolidate results from multiple images
   * @param {Array<Object>} allResults - Array of individual results
   * @returns {Object} - Consolidated result
   */
  const consolidateResults = useCallback((allResults) => {
    const matchedMap = new Map(); // By creature.id
    const unmatchedSet = new Set(); // By creature name (stringified)
    const errors = [];

    allResults.forEach(result => {
      // Collect errors
      if (!result.success) {
        if (!result.cancelled) {
          errors.push({
            fileId: result.fileId,
            fileName: result.fileName,
            error: result.error,
          });
        }
        return;
      }

      // Process matched creatures
      result.matched?.forEach(match => {
        const creatureId = match.creature.id;
        const existing = matchedMap.get(creatureId);

        // Keep the one with higher stage
        if (!existing || match.stage > existing.stage) {
          matchedMap.set(creatureId, match);
        }
      });

      // Process unmatched creatures (deduplicate by name)
      result.unmatched?.forEach(unmatched => {
        const key = JSON.stringify({ name: unmatched.name, stage: unmatched.stage });
        unmatchedSet.add(key);
      });
    });

    const consolidated = {
      matched: Array.from(matchedMap.values()),
      unmatched: Array.from(unmatchedSet).map(s => JSON.parse(s)),
      totalFound: matchedMap.size + unmatchedSet.size,
      errors,
    };

    // Call onError callback if there are errors
    if (errors.length > 0 && onError) {
      onError(errors);
    }

    return consolidated;
  }, [onError]);

  /**
   * Process queue - manage parallel execution
   */
  const processQueue = useCallback(async () => {
    while (queueRef.current.length > 0 && !cancelledRef.current) {
      // Wait until we have available slots
      while (activeRef.current.size >= maxParallel && !cancelledRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Check if cancelled or queue is empty
      if (cancelledRef.current || queueRef.current.length === 0) {
        break;
      }

      // Get next file from queue
      const { file, fileId } = queueRef.current.shift();

      // Add to active set
      activeRef.current.add(fileId);

      // Process image (non-blocking)
      processSingleImage(file, fileId).then(result => {
        // Add to results
        setResults(prev => [...prev, result]);

        // Update global progress
        updateGlobalProgress();

        // Check if all completed
        if (completedCountRef.current === totalImagesRef.current) {
          setIsProcessing(false);

          // Call onComplete callback
          if (onComplete) {
            const allResults = [...results, result];
            const consolidated = consolidateResults(allResults);
            onComplete(consolidated);
          }
        }
      });
    }

    // If cancelled, finish remaining active processes
    if (cancelledRef.current) {
      // Wait for active processes to finish
      while (activeRef.current.size > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setIsProcessing(false);
    }
  }, [maxParallel, processSingleImage, updateGlobalProgress, onComplete, results, consolidateResults]);

  /**
   * Process multiple images
   * @param {Array<File>} files - Array of image files
   * @returns {Promise<void>}
   */
  const processMultiple = useCallback(async (files) => {
    if (!files || files.length === 0) {
      return;
    }

    // Reset state
    cancelledRef.current = false;
    completedCountRef.current = 0;
    totalImagesRef.current = files.length;
    imageProgressRef.current.clear();
    setIsProcessing(true);
    setGlobalProgress(0);
    setResults([]);

    // Initialize image statuses
    const initialStatuses = new Map();
    const queue = [];

    files.forEach(file => {
      const fileId = generateFileId(file);
      initialStatuses.set(fileId, {
        status: 'queued',
        progress: 0,
        result: null,
        error: null,
      });
      queue.push({ file, fileId });
      imageProgressRef.current.set(fileId, 0);
    });

    setImageStatuses(initialStatuses);
    queueRef.current = queue;
    activeRef.current.clear();

    // Start processing queue
    await processQueue();

  }, [processQueue]);

  /**
   * Cancel all pending processing
   */
  const cancel = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[useMultipleOcrProcessing] Cancelled by user');
    }

    cancelledRef.current = true;
    queueRef.current = [];
  }, []);

  /**
   * Retry failed images
   * Note: Currently not fully implemented - requires storing file references
   */
  const retryFailed = useCallback(async () => {
    // This would require storing file references in the state
    // For simplicity, we're not implementing this in v1
    console.warn('Retry failed: Feature not yet implemented. Please re-upload failed images.');
  }, []);

  return {
    processMultiple,
    isProcessing,
    globalProgress,
    results,
    imageStatuses,
    cancel,
    retryFailed,
  };
};

export default useMultipleOcrProcessing;
