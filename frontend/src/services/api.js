/**
 * API Service for communicating with backend
 */

import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api', // Proxy will redirect to http://localhost:3001/api
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

export default api;
