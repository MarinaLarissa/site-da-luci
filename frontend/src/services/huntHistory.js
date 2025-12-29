/**
 * Hunt History Service
 * Manages local storage of hunt history with 62-hunt limit
 */

import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tibia_hunt_history';
const MAX_HUNTS = 62;
const SCHEMA_VERSION = '1.0';

/**
 * Calculate damage and healing percentages for players
 * @param {Array} players - Array of player objects
 * @returns {Array} Players with added percentage fields
 */
export function calculateStats(players) {
  const totalDamage = players.reduce((sum, p) => sum + (p.damage || 0), 0);
  const totalHealing = players.reduce((sum, p) => sum + (p.healing || 0), 0);

  return players.map(player => ({
    ...player,
    damagePercent: totalDamage > 0
      ? parseFloat(((player.damage / totalDamage) * 100).toFixed(1))
      : 0,
    healingPercent: totalHealing > 0
      ? parseFloat(((player.healing / totalHealing) * 100).toFixed(1))
      : 0
  }));
}

/**
 * Get all hunts from localStorage
 * @returns {Object} Hunt history object with hunts array and metadata
 */
export function getAllHunts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        hunts: [],
        metadata: {
          totalHunts: 0,
          lastUpdated: Date.now(),
          version: SCHEMA_VERSION
        }
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load hunt history:', error);
    return {
      hunts: [],
      metadata: {
        totalHunts: 0,
        lastUpdated: Date.now(),
        version: SCHEMA_VERSION
      }
    };
  }
}

/**
 * Save a new hunt to localStorage (maintains 62-hunt limit)
 * @param {Object} huntData - Hunt calculation results
 * @param {string} rawInput - Optional raw input text for debugging
 * @returns {boolean} Success status
 */
export function saveHunt(huntData, rawInput = null) {
  try {
    const history = getAllHunts();

    // Calculate stats (damage/healing percentages)
    const playersWithStats = calculateStats(huntData.players);

    // Create hunt entry
    const huntEntry = {
      id: uuidv4(),
      timestamp: Date.now(),
      date: new Date().toISOString(),
      summary: {
        totalBalance: huntData.summary.totalBalance || 0,
        totalBalanceFormatted: huntData.summary.totalBalanceFormatted || '',
        fairShare: huntData.summary.fairShare || 0,
        fairShareFormatted: huntData.summary.fairShareFormatted || '',
        profitPerHour: huntData.summary.profitPerHour || 0,
        profitPerHourFormatted: huntData.summary.profitPerHourFormatted || '',
        duration: huntData.summary.duration || 0,
        activePlayers: huntData.summary.activePlayers || 0
      },
      players: playersWithStats,
      transfers: huntData.transfers || [],
      rawInput: rawInput,
      version: SCHEMA_VERSION
    };

    // Add to beginning of array (newest first)
    history.hunts.unshift(huntEntry);

    // Enforce 62-hunt limit (remove oldest if exceeded)
    if (history.hunts.length > MAX_HUNTS) {
      history.hunts = history.hunts.slice(0, MAX_HUNTS);
    }

    // Update metadata
    history.metadata = {
      totalHunts: history.hunts.length,
      lastUpdated: Date.now(),
      version: SCHEMA_VERSION
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Failed to save hunt:', error);
    return false;
  }
}

/**
 * Delete a specific hunt by ID
 * @param {string} huntId - UUID of hunt to delete
 * @returns {boolean} Success status
 */
export function deleteHunt(huntId) {
  try {
    const history = getAllHunts();
    history.hunts = history.hunts.filter(hunt => hunt.id !== huntId);

    // Update metadata
    history.metadata = {
      totalHunts: history.hunts.length,
      lastUpdated: Date.now(),
      version: SCHEMA_VERSION
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Failed to delete hunt:', error);
    return false;
  }
}

/**
 * Clear all hunt history
 * @returns {boolean} Success status
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
}

/**
 * Export hunts as JSON based on options
 * @param {Object} options - Export options
 * @param {string} options.type - 'all', 'lastN', or 'dateRange'
 * @param {number} options.count - Number of last hunts (for type 'lastN')
 * @param {Date} options.startDate - Start date (for type 'dateRange')
 * @param {Date} options.endDate - End date (for type 'dateRange')
 * @returns {Object} Filtered hunt history
 */
export function exportJSON(options = { type: 'all' }) {
  const history = getAllHunts();

  let filteredHunts = [...history.hunts];

  switch (options.type) {
    case 'lastN':
      if (options.count && options.count > 0) {
        filteredHunts = history.hunts.slice(0, options.count);
      }
      break;

    case 'dateRange':
      if (options.startDate && options.endDate) {
        const start = new Date(options.startDate).getTime();
        const end = new Date(options.endDate).getTime();
        filteredHunts = history.hunts.filter(hunt => {
          return hunt.timestamp >= start && hunt.timestamp <= end;
        });
      }
      break;

    case 'all':
    default:
      // Return all hunts (already copied above)
      break;
  }

  return {
    hunts: filteredHunts,
    metadata: {
      totalHunts: filteredHunts.length,
      exportedAt: new Date().toISOString(),
      exportType: options.type,
      version: SCHEMA_VERSION
    }
  };
}

/**
 * Download JSON file
 * @param {Object} data - Data to download
 * @param {string} filename - Filename (default: hunt-history-YYYY-MM-DD.json)
 */
export function downloadJSON(data, filename = null) {
  const defaultFilename = `hunt-history-${new Date().toISOString().split('T')[0]}.json`;
  const finalFilename = filename || defaultFilename;

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
