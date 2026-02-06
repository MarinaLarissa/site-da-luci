/**
 * Progress History Storage Service
 * Tracks bestiary completions over long period (up to 1 year)
 *
 * Feature 4: Progress History
 * - Stores completion history beyond 7 days (up to 1 year)
 * - Provides aggregated statistics (streaks, averages, projections)
 * - Automatic cleanup of data older than 1 year
 */

const STORAGE_KEY_PREFIX = 'progress_history_';
const MAX_HISTORY_DAYS = 365;

/**
 * Get storage key for character's progress history
 */
const getStorageKey = (characterId) => {
  return `${STORAGE_KEY_PREFIX}${characterId}`;
};

/**
 * Get default storage structure
 */
const getDefaultStorage = (characterId) => ({
  version: '1.0',
  characterId,
  history: {}, // { "2026-02-05": [{ id, name, charmPoints, completedAt }] }
  lastUpdated: new Date().toISOString(),
});

/**
 * Load progress history from localStorage
 */
const loadHistory = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    const data = localStorage.getItem(key);

    if (!data) {
      return getDefaultStorage(characterId);
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading progress history:', error);
    return getDefaultStorage(characterId);
  }
};

/**
 * Save progress history to localStorage
 */
const saveHistory = (data) => {
  try {
    const key = getStorageKey(data.characterId);
    const toSave = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(toSave));
    return true;
  } catch (error) {
    console.error('Error saving progress history:', error);
    return false;
  }
};

/**
 * Get date key (YYYY-MM-DD)
 */
const getDateKey = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

/**
 * Save a completion to history
 * @param {string} characterId - Character UUID
 * @param {Object} creatureData - { id, name, charmPoints }
 * @returns {boolean} - Success status
 */
export const saveCompletion = (characterId, creatureData) => {
  try {
    const data = loadHistory(characterId);
    const dateKey = getDateKey();

    // Initialize array for this date if needed
    if (!data.history[dateKey]) {
      data.history[dateKey] = [];
    }

    // Add completion with timestamp
    data.history[dateKey].push({
      id: creatureData.id,
      name: creatureData.name,
      charmPoints: creatureData.charmPoints,
      completedAt: new Date().toISOString(),
    });

    saveHistory(data);

    // Clean old history (> 1 year)
    cleanOldHistory(characterId);

    return true;
  } catch (error) {
    console.error('Error saving completion:', error);
    return false;
  }
};

/**
 * Get completions for a specific period
 * @param {string} characterId - Character UUID
 * @param {Date} startDate - Start date (inclusive)
 * @param {Date} endDate - End date (inclusive)
 * @returns {Array} - Array of completions
 */
export const getCompletionsByPeriod = (characterId, startDate, endDate) => {
  try {
    const data = loadHistory(characterId);
    const completions = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    Object.entries(data.history).forEach(([dateKey, dayCompletions]) => {
      const date = new Date(dateKey);
      if (date >= start && date <= end) {
        completions.push(...dayCompletions);
      }
    });

    // Sort by completedAt descending (most recent first)
    return completions.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  } catch (error) {
    console.error('Error getting completions by period:', error);
    return [];
  }
};

/**
 * Calculate current and max streak
 * @param {string} characterId - Character UUID
 * @returns {Object} - { current: number, max: number }
 */
export const calculateStreak = (characterId) => {
  try {
    const data = loadHistory(characterId);
    const dates = Object.keys(data.history).sort().reverse(); // Descending order

    if (dates.length === 0) {
      return { current: 0, max: 0 };
    }

    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let expectedDate = new Date();

    // Calculate current streak (from today backwards)
    for (const dateKey of dates) {
      const date = new Date(dateKey);
      const expectedKey = getDateKey(expectedDate);

      if (dateKey === expectedKey) {
        currentStreak++;
        tempStreak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        // Gap detected, current streak ends
        if (currentStreak === 0) {
          // No current streak yet, keep counting for max
          tempStreak = 1;
          expectedDate = new Date(date);
          expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
          // Current streak already counted, just break
          break;
        }
      }

      maxStreak = Math.max(maxStreak, tempStreak);
    }

    maxStreak = Math.max(maxStreak, currentStreak);

    return { current: currentStreak, max: maxStreak };
  } catch (error) {
    console.error('Error calculating streak:', error);
    return { current: 0, max: 0 };
  }
};

/**
 * Get aggregated statistics
 * @param {string} characterId - Character UUID
 * @param {number} days - Number of days to analyze (default: 30)
 * @returns {Object} - Statistics object
 */
export const getStatistics = (characterId, days = 30) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const completions = getCompletionsByPeriod(characterId, startDate, endDate);

    if (completions.length === 0) {
      return {
        dailyAverage: 0,
        totalCompletions: 0,
        totalCharmPoints: 0,
        mostProductiveDay: null,
        streak: { current: 0, max: 0 },
      };
    }

    // Group by date for daily stats
    const byDate = {};
    completions.forEach((c) => {
      const dateKey = c.completedAt.split('T')[0];
      if (!byDate[dateKey]) {
        byDate[dateKey] = { count: 0, charmPoints: 0 };
      }
      byDate[dateKey].count++;
      byDate[dateKey].charmPoints += c.charmPoints;
    });

    // Daily average
    const dailyAverage = parseFloat((completions.length / days).toFixed(2));

    // Total charm points
    const totalCharmPoints = completions.reduce((sum, c) => sum + c.charmPoints, 0);

    // Most productive day
    let mostProductiveDay = null;
    let maxCount = 0;
    Object.entries(byDate).forEach(([date, stats]) => {
      if (stats.count > maxCount) {
        maxCount = stats.count;
        mostProductiveDay = { date, count: stats.count };
      }
    });

    // Streak
    const streak = calculateStreak(characterId);

    return {
      dailyAverage,
      totalCompletions: completions.length,
      totalCharmPoints,
      mostProductiveDay,
      streak,
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return {
      dailyAverage: 0,
      totalCompletions: 0,
      totalCharmPoints: 0,
      mostProductiveDay: null,
      streak: { current: 0, max: 0 },
    };
  }
};

/**
 * Get historical data for specified number of days
 * @param {string} characterId - Character UUID
 * @param {number} days - Number of days to retrieve (default: 365)
 * @returns {Array} - Array of { date, completions }
 */
export const getHistoricalData = (characterId, days = 365) => {
  try {
    const data = loadHistory(characterId);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered = Object.entries(data.history)
      .filter(([dateKey]) => {
        const date = new Date(dateKey);
        return date >= cutoffDate;
      })
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)); // Descending

    return filtered.map(([date, completions]) => ({
      date,
      completions,
    }));
  } catch (error) {
    console.error('Error getting historical data:', error);
    return [];
  }
};

/**
 * Clean old history (> 1 year)
 * @param {string} characterId - Character UUID
 */
const cleanOldHistory = (characterId) => {
  try {
    const data = loadHistory(characterId);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);

    // Filter out old entries
    const filtered = {};
    Object.keys(data.history).forEach((dateKey) => {
      const date = new Date(dateKey);
      if (date >= cutoffDate) {
        filtered[dateKey] = data.history[dateKey];
      }
    });

    data.history = filtered;
    saveHistory(data);
  } catch (error) {
    console.error('Error cleaning old history:', error);
  }
};

/**
 * Clear all history for a character
 * @param {string} characterId - Character UUID
 * @returns {boolean} - Success status
 */
export const clearHistory = (characterId) => {
  try {
    const key = getStorageKey(characterId);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};

export default {
  saveCompletion,
  getCompletionsByPeriod,
  calculateStreak,
  getStatistics,
  getHistoricalData,
  clearHistory,
};
