/**
 * useBulkSelection Hook
 * Manages bulk selection state for bestiary creatures
 *
 * Features:
 * - Multiple creature selection using Set (performance)
 * - Selection mode toggle
 * - Select all, select none, select filtered
 * - Maximum 100 creatures limit
 * - LocalStorage persistence per character
 */

import { useState, useCallback, useEffect } from 'react';

const MAX_SELECTION = 100;
const STORAGE_KEY_PREFIX = 'luci_bulk_selection_';

/**
 * Get storage key for character
 */
const getStorageKey = (characterId) => {
  return `${STORAGE_KEY_PREFIX}${characterId}`;
};

/**
 * Load selection from localStorage
 */
const loadSelection = (characterId) => {
  if (!characterId) return new Set();

  try {
    const stored = localStorage.getItem(getStorageKey(characterId));
    if (stored) {
      const array = JSON.parse(stored);
      return new Set(array);
    }
  } catch (error) {
    console.error('Error loading bulk selection:', error);
  }

  return new Set();
};

/**
 * Save selection to localStorage
 */
const saveSelection = (characterId, selectedIds) => {
  if (!characterId) return;

  try {
    const array = Array.from(selectedIds);
    localStorage.setItem(getStorageKey(characterId), JSON.stringify(array));
  } catch (error) {
    console.error('Error saving bulk selection:', error);
  }
};

/**
 * useBulkSelection hook
 * @param {string} characterId - Character UUID
 * @returns {Object} - Bulk selection state and actions
 */
export const useBulkSelection = (characterId) => {
  const [selectedIds, setSelectedIds] = useState(() => loadSelection(characterId));
  const [selectionMode, setSelectionMode] = useState(false);

  // Load selection when character changes
  useEffect(() => {
    setSelectedIds(loadSelection(characterId));
  }, [characterId]);

  // Save selection when it changes
  useEffect(() => {
    if (characterId) {
      saveSelection(characterId, selectedIds);
    }
  }, [characterId, selectedIds]);

  /**
   * Toggle selection for a single creature
   */
  const toggleSelection = useCallback(
    (creatureId) => {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(creatureId)) {
          // Deselect
          newSet.delete(creatureId);
        } else {
          // Select (check limit)
          if (newSet.size >= MAX_SELECTION) {
            console.warn(`Maximum selection limit reached: ${MAX_SELECTION}`);
            return prev; // Don't modify
          }
          newSet.add(creatureId);
        }

        return newSet;
      });
    },
    []
  );

  /**
   * Select all creatures from a list
   */
  const selectAll = useCallback((creatures) => {
    const creatureIds = creatures.map((c) => c.id);
    const limitedIds = creatureIds.slice(0, MAX_SELECTION);

    setSelectedIds(new Set(limitedIds));

    if (creatureIds.length > MAX_SELECTION) {
      console.warn(`Selection limited to ${MAX_SELECTION} creatures`);
    }
  }, []);

  /**
   * Select filtered creatures (from current filter)
   */
  const selectFiltered = useCallback((filteredCreatures) => {
    const creatureIds = filteredCreatures.map((c) => c.id);
    const limitedIds = creatureIds.slice(0, MAX_SELECTION);

    setSelectedIds(new Set(limitedIds));

    if (creatureIds.length > MAX_SELECTION) {
      console.warn(`Selection limited to ${MAX_SELECTION} creatures`);
    }
  }, []);

  /**
   * Clear selection
   */
  const selectNone = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  /**
   * Enter selection mode
   */
  const enterSelectionMode = useCallback(() => {
    setSelectionMode(true);
  }, []);

  /**
   * Exit selection mode
   */
  const exitSelectionMode = useCallback(() => {
    setSelectionMode(false);
    selectNone();
  }, [selectNone]);

  /**
   * Check if a creature is selected
   */
  const isSelected = useCallback(
    (creatureId) => {
      return selectedIds.has(creatureId);
    },
    [selectedIds]
  );

  /**
   * Get count of selected creatures
   */
  const selectedCount = selectedIds.size;

  /**
   * Get selected creature IDs as array
   */
  const getSelectedIds = useCallback(() => {
    return Array.from(selectedIds);
  }, [selectedIds]);

  /**
   * Check if selection limit is reached
   */
  const isLimitReached = selectedCount >= MAX_SELECTION;

  return {
    // State
    selectedIds,
    selectionMode,
    selectedCount,
    isLimitReached,

    // Actions
    toggleSelection,
    selectAll,
    selectFiltered,
    selectNone,
    enterSelectionMode,
    exitSelectionMode,
    isSelected,
    getSelectedIds,
  };
};

export default useBulkSelection;
