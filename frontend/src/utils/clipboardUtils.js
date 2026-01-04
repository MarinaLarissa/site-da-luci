/**
 * Clipboard Utilities
 * Shared clipboard operations with fallbacks for legacy browsers
 *
 * ROI: Eliminates 30 lines of duplicated code per feature
 * Used by: ImbuementCalculator, ItemCostManager, and future components
 */

/**
 * Copy text to clipboard with fallback
 * @param {string} text - Text to copy
 * @param {Function} onSuccess - Callback on successful copy (optional)
 * @param {Function} onError - Callback on error (optional)
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function copyToClipboard(text, onSuccess, onError) {
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      if (onSuccess) onSuccess();
      return true;
    }

    // Fallback: document.execCommand (deprecated but widely supported)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      if (onSuccess) onSuccess();
      return true;
    } else {
      throw new Error('execCommand copy failed');
    }
  } catch (error) {
    console.error('Copy failed:', error);
    if (onError) onError(error);
    return false;
  }
}

/**
 * Copy object as JSON to clipboard
 * @param {Object} obj - Object to copy as JSON
 * @param {Function} onSuccess - Callback on successful copy (optional)
 * @param {Function} onError - Callback on error (optional)
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function copyObjectToClipboard(obj, onSuccess, onError) {
  try {
    const jsonString = JSON.stringify(obj, null, 2);
    return await copyToClipboard(jsonString, onSuccess, onError);
  } catch (error) {
    console.error('Copy object failed:', error);
    if (onError) onError(error);
    return false;
  }
}

/**
 * Read text from clipboard with fallback
 * @param {Function} onSuccess - Callback with text on successful read (optional)
 * @param {Function} onError - Callback on error (optional)
 * @param {string} promptMessage - Message to show in manual fallback prompt (optional)
 * @returns {Promise<string|null>} - Clipboard text or null if failed
 */
export async function readFromClipboard(onSuccess, onError, promptMessage = 'Clipboard API not available. Please paste the content here:') {
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
      const text = await navigator.clipboard.readText();
      if (onSuccess) onSuccess(text);
      return text;
    }

    // Fallback: window.prompt (last resort)
    const text = window.prompt(promptMessage);
    if (text) {
      if (onSuccess) onSuccess(text);
      return text;
    } else {
      throw new Error('User cancelled prompt');
    }
  } catch (error) {
    console.error('Read clipboard failed:', error);
    if (onError) onError(error);
    return null;
  }
}

/**
 * Read JSON object from clipboard with fallback
 * @param {Function} onSuccess - Callback with parsed object on successful read (optional)
 * @param {Function} onError - Callback on error (optional)
 * @param {string} promptMessage - Message to show in manual fallback prompt (optional)
 * @returns {Promise<Object|null>} - Parsed object or null if failed
 */
export async function readObjectFromClipboard(onSuccess, onError, promptMessage = 'Clipboard API not available. Please paste the JSON data here:') {
  try {
    const text = await readFromClipboard(null, null, promptMessage);
    if (!text) {
      throw new Error('No text read from clipboard');
    }

    const obj = JSON.parse(text);
    if (onSuccess) onSuccess(obj);
    return obj;
  } catch (error) {
    console.error('Read object from clipboard failed:', error);
    if (onError) onError(error);
    return null;
  }
}

/**
 * Check if Clipboard API is available
 * @returns {boolean} - True if Clipboard API is available
 */
export function isClipboardAvailable() {
  return !!(navigator.clipboard && window.isSecureContext);
}

/**
 * Example Usage:
 *
 * // Copy text
 * await copyToClipboard('Hello World',
 *   () => alert('Copied!'),
 *   (err) => alert('Copy failed: ' + err.message)
 * );
 *
 * // Copy object
 * await copyObjectToClipboard({ foo: 'bar' },
 *   () => console.log('Object copied!'),
 *   (err) => console.error('Failed:', err)
 * );
 *
 * // Read text
 * const text = await readFromClipboard(
 *   (text) => console.log('Read:', text),
 *   (err) => console.error('Failed:', err)
 * );
 *
 * // Read object
 * const obj = await readObjectFromClipboard(
 *   (obj) => console.log('Parsed:', obj),
 *   (err) => console.error('Failed:', err),
 *   'Please paste JSON data:'
 * );
 *
 * // Check availability
 * if (isClipboardAvailable()) {
 *   // Use modern API
 * } else {
 *   // Show warning about fallback
 * }
 */

/**
 * React Hook: useClipboard
 * Optional hook for easier integration with React components
 */
export function useClipboard() {
  const copy = async (text) => {
    return await copyToClipboard(text);
  };

  const copyObject = async (obj) => {
    return await copyObjectToClipboard(obj);
  };

  const read = async (promptMessage) => {
    return await readFromClipboard(null, null, promptMessage);
  };

  const readObject = async (promptMessage) => {
    return await readObjectFromClipboard(null, null, promptMessage);
  };

  const isAvailable = isClipboardAvailable();

  return {
    copy,
    copyObject,
    read,
    readObject,
    isAvailable,
  };
}
