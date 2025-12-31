/**
 * Hunt Utilities
 * Shared utilities for Solo Hunt Analyzer
 */

// Storage keys constants
export const STORAGE_KEYS = {
  TOKEN_PRICES: 'solo-hunt-token-prices',
  HUNT_HISTORY: 'solo-hunt-history',
  CONFIGURATIONS: 'solo-hunt-configurations',
};

/**
 * Parse duration string to hours
 * Supports formats: "HH:MMh" (hours) or "MM:SS" (minutes:seconds)
 *
 * @param {string} durationStr - Duration string to parse
 * @returns {number} Duration in hours
 *
 * @example
 * parseDurationToHours('2:30h') // 2.5 hours
 * parseDurationToHours('45:30') // 0.758 hours (45.5 minutes)
 */
export const parseDurationToHours = (durationStr) => {
  if (!durationStr) return 0;

  // Format "HH:MMh" (hours)
  if (durationStr.includes('h')) {
    const parts = durationStr.split(':');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parts[1] ? parseInt(parts[1].replace('h', ''), 10) : 0;
    return hours + minutes / 60;
  }

  // Format "MM:SS" (minutes:seconds)
  const parts = durationStr.split(':');
  const minutes = parseInt(parts[0], 10) || 0;
  const seconds = parts[1] ? parseInt(parts[1], 10) : 0;
  return (minutes + seconds / 60) / 60;
};

/**
 * Generate unique ID with counter to prevent collisions
 * More robust than Date.now() alone (prevents duplicates in same millisecond)
 *
 * @returns {string} Unique ID in format "timestamp-counter"
 *
 * @example
 * generateUniqueId() // "1704038400000-0"
 * generateUniqueId() // "1704038400000-1" (if called in same ms)
 */
let idCounter = 0;
export const generateUniqueId = () => {
  const timestamp = Date.now();
  const id = `${timestamp}-${idCounter++}`;

  // Reset counter periodically to prevent overflow
  if (idCounter > 9999) {
    idCounter = 0;
  }

  return id;
};

/**
 * Format number with locale
 * Helper to ensure consistent number formatting
 *
 * @param {number} value - Number to format
 * @param {string} locale - Locale string (e.g., 'pt-BR', 'en-US')
 * @returns {string} Formatted number
 */
export const formatNumber = (value, locale = 'pt-BR') => {
  return value.toLocaleString(locale);
};

/**
 * Format date with locale
 * Helper to ensure consistent date formatting
 *
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string (e.g., 'pt-BR', 'en-US')
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'pt-BR') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString(locale);
};
