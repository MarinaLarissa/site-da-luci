/**
 * Daily Progress Storage Service
 * Tracks bestiary completions per day for progress statistics
 *
 * Feature 4 Update (Progress History):
 * - Extended retention from 7 days to 1 year
 * - Added getHistoricalData() for long-term queries
 */

const STORAGE_KEY_PREFIX = 'daily_bestiary_progress_';

/**
 * Get today's date string (YYYY-MM-DD)
 */
const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get storage key for character's daily progress
 */
const getStorageKey = (characterId) => {
  return `${STORAGE_KEY_PREFIX}${characterId}`;
};

/**
 * Get today's completed creatures for a character
 */
export const getTodayCompletions = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);
    const todayKey = getTodayKey();

    // Return today's completions or empty array
    return parsed[todayKey] || [];
  } catch (error) {
    console.error('Error reading daily progress:', error);
    return [];
  }
};

/**
 * Add a completed creature to today's progress
 */
export const addTodayCompletion = (characterId, creatureData) => {
  try {
    const key = getStorageKey(characterId);
    const todayKey = getTodayKey();

    // Get existing data
    let data = {};
    const existing = localStorage.getItem(key);
    if (existing) {
      data = JSON.parse(existing);
    }

    // Initialize today's array if needed
    if (!data[todayKey]) {
      data[todayKey] = [];
    }

    // Add completion with timestamp
    data[todayKey].push({
      id: creatureData.id,
      name: creatureData.name,
      charmPoints: creatureData.charmPoints,
      completedAt: new Date().toISOString(),
    });

    // Save back
    localStorage.setItem(key, JSON.stringify(data));

    // Clean old data (keep only last 7 days)
    cleanOldData(characterId);

    return true;
  } catch (error) {
    console.error('Error adding daily completion:', error);
    return false;
  }
};

/**
 * Clean old data (keep only last 1 year instead of 7 days)
 * MODIFIED for Feature 4: Progress History
 */
const cleanOldData = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) return;

    const parsed = JSON.parse(data);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Filter out old entries (> 1 year)
    const filtered = {};
    Object.keys(parsed).forEach((dateKey) => {
      const date = new Date(dateKey);
      if (date >= oneYearAgo) {
        filtered[dateKey] = parsed[dateKey];
      }
    });

    localStorage.setItem(key, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error cleaning old data:', error);
  }
};

/**
 * Get statistics for today
 */
export const getTodayStats = (characterId) => {
  const completions = getTodayCompletions(characterId);

  return {
    count: completions.length,
    totalCharmPoints: completions.reduce((sum, c) => sum + c.charmPoints, 0),
    creatures: completions,
  };
};

/**
 * Clear all daily progress for a character
 */
export const clearDailyProgress = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing daily progress:', error);
    return false;
  }
};

/**
 * Get historical data for specified number of days
 * ADDED for Feature 4: Progress History
 * @param {string} characterId - Character UUID
 * @param {number} days - Number of days to retrieve (default: 365)
 * @returns {Array} - Array of { date, completions }
 */
export const getHistoricalData = (characterId, days = 365) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Filter entries within specified days
    const filtered = Object.entries(parsed)
      .filter(([dateKey]) => {
        const date = new Date(dateKey);
        return date >= cutoffDate;
      })
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)); // Sort descending

    return filtered.map(([date, completions]) => ({
      date,
      completions,
    }));
  } catch (error) {
    console.error('Error reading historical data:', error);
    return [];
  }
};
