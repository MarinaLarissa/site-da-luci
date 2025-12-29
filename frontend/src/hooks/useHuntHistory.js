/**
 * Custom hook for managing hunt history state
 */

import { useState, useEffect } from 'react';
import {
  getAllHunts,
  deleteHunt as deleteHuntService,
  clearHistory as clearHistoryService,
  exportJSON,
  downloadJSON
} from '../services/huntHistory';

export function useHuntHistory() {
  const [hunts, setHunts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    type: 'all', // 'all', 'lastN', 'dateRange'
    count: 10,
    startDate: null,
    endDate: null
  });

  // Load hunts on mount
  useEffect(() => {
    loadHunts();
  }, []);

  /**
   * Load all hunts from localStorage
   */
  const loadHunts = () => {
    const history = getAllHunts();
    setHunts(history.hunts);
  };

  /**
   * Delete a specific hunt
   * @param {string} huntId - UUID of hunt to delete
   */
  const deleteHunt = (huntId) => {
    const success = deleteHuntService(huntId);
    if (success) {
      loadHunts(); // Refresh list
    }
    return success;
  };

  /**
   * Clear all hunt history
   */
  const clearHistory = () => {
    const success = clearHistoryService();
    if (success) {
      setHunts([]);
    }
    return success;
  };

  /**
   * Export hunts as JSON and trigger download
   */
  const handleExportJSON = () => {
    const data = exportJSON(exportOptions);
    downloadJSON(data);
  };

  /**
   * Toggle drawer open/close
   */
  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  /**
   * Update export options
   * @param {Object} newOptions - Partial export options to update
   */
  const updateExportOptions = (newOptions) => {
    setExportOptions(prev => ({ ...prev, ...newOptions }));
  };

  return {
    hunts,
    drawerOpen,
    exportOptions,
    toggleDrawer,
    deleteHunt,
    clearHistory,
    handleExportJSON,
    updateExportOptions,
    loadHunts // Expose for manual refresh
  };
}
