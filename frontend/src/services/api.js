/**
 * API Service for communicating with backend
 */

import axios from 'axios';

// Determine API base URL based on environment
const getBaseURL = () => {
  // In production, use the environment variable or fallback to Render URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://site-da-luci-api.onrender.com/api';
  }
  // In development, use proxy (configured in package.json)
  return '/api';
};

// Create axios instance with default config
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Calculate loot split from raw TIBIA text
 * @param {string} rawText - Raw loot data from TIBIA client
 * @returns {Promise<Object>} API response with summary, players, transfers
 */
export async function calculateLootSplit(rawText) {
  try {
    const response = await api.post('/loot-split/calculate', { rawText });
    return response.data;
  } catch (error) {
    // Transform API error into user-friendly message
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.error?.message || 'Server error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      // Other errors
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

/**
 * Calculate solo hunt balance with custom item costs
 * @param {Object} parsedSession - Parsed session data
 * @param {Array} customItems - Custom items with costs
 * @param {Object} prices - Token and coin prices
 * @returns {Promise<Object>} API response with calculation results
 */
export async function calculateSoloHunt(parsedSession, customItems, prices) {
  try {
    const response = await api.post('/solo-hunt/calculate', {
      parsedSession,
      customItems,
      goldTokenPrice: prices.goldTokenPrice,
      silverTokenPrice: prices.silverTokenPrice,
      tibiaCoinPrice: prices.tibiaCoinPrice,
    });
    return response.data;
  } catch (error) {
    // Transform API error into user-friendly message (same pattern as calculateLootSplit)
    if (error.response) {
      // Server responded with error
      const errorMessage = error.response.data?.error || 'Server error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      // Other errors (including timeout)
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default api;
