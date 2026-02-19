/**
 * useCharacterSetBuilder Hook
 * State management for the Character Set Builder feature
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getCharacterSets,
  saveCharacterSet,
  deleteCharacterSet,
  duplicateCharacterSet,
  getSetStorageStats,
} from '../services/characterSetStorage';
import { SLOT_ORDER } from '../data/equipment';

const EMPTY_EQUIPMENT = () =>
  SLOT_ORDER.reduce((acc, slot) => ({ ...acc, [slot]: null }), {});

const createNewSet = (vocation = '') => ({
  id: null,
  name: 'New Set',
  vocation,
  equipment: EMPTY_EQUIPMENT(),
});

export const useCharacterSetBuilder = (characterId, characterVocation = '') => {
  const [savedSets, setSavedSets] = useState([]);
  const [currentSet, setCurrentSet] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [storageStats, setStorageStats] = useState({ total: 0, limit: 10, remaining: 10 });
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);

  // Load sets whenever characterId changes
  useEffect(() => {
    if (!characterId) {
      setSavedSets([]);
      setCurrentSet(null);
      setHasUnsavedChanges(false);
      return;
    }

    const sets = getCharacterSets(characterId);
    setSavedSets(sets);
    setStorageStats(getSetStorageStats(characterId));
    setCurrentSet(createNewSet(characterVocation));
    setHasUnsavedChanges(false);
  }, [characterId, characterVocation]);

  const refreshSets = useCallback(() => {
    if (!characterId) return;
    const sets = getCharacterSets(characterId);
    setSavedSets(sets);
    setStorageStats(getSetStorageStats(characterId));
  }, [characterId]);

  /**
   * Load a saved set into the editor
   */
  const loadSet = useCallback((set) => {
    setCurrentSet({ ...set, equipment: { ...set.equipment } });
    setHasUnsavedChanges(false);
    setError(null);
  }, []);

  /**
   * Create a blank set in the editor
   */
  const newSet = useCallback(() => {
    setCurrentSet(createNewSet(characterVocation));
    setHasUnsavedChanges(false);
    setError(null);
  }, [characterVocation]);

  /**
   * Update the name of the current set
   */
  const updateName = useCallback((name) => {
    setCurrentSet((prev) => (prev ? { ...prev, name } : prev));
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Equip an item to a slot (or clear the slot by passing null)
   */
  const equipItem = useCallback((slot, itemId) => {
    setCurrentSet((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        equipment: { ...prev.equipment, [slot]: itemId },
      };
    });
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Clear all slots in the current set
   */
  const clearEquipment = useCallback(() => {
    setCurrentSet((prev) => {
      if (!prev) return prev;
      return { ...prev, equipment: EMPTY_EQUIPMENT() };
    });
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Save the current set to storage
   */
  const saveSet = useCallback(() => {
    if (!characterId || !currentSet) {
      return { success: false, error: 'No character or set to save' };
    }

    const result = saveCharacterSet(characterId, currentSet);

    if (result.success) {
      // Update set with the returned ID
      setCurrentSet((prev) => (prev ? { ...prev, id: result.setId } : prev));
      setHasUnsavedChanges(false);
      setSaveMessage({ type: 'success', text: 'Set saved!' });
      setTimeout(() => setSaveMessage(null), 2500);
      refreshSets();
    } else {
      setError(result.error);
    }

    return result;
  }, [characterId, currentSet, refreshSets]);

  /**
   * Delete a saved set
   */
  const deleteSet = useCallback(
    (setId) => {
      if (!characterId) return false;

      // If the deleted set is currently loaded, reset to new
      if (currentSet?.id === setId) {
        setCurrentSet(createNewSet(characterVocation));
        setHasUnsavedChanges(false);
      }

      const success = deleteCharacterSet(characterId, setId);
      if (success) refreshSets();
      return success;
    },
    [characterId, currentSet, characterVocation, refreshSets]
  );

  /**
   * Duplicate a saved set
   */
  const duplicateSet = useCallback(
    (setId) => {
      if (!characterId) return { success: false };
      const result = duplicateCharacterSet(characterId, setId);
      if (result.success) refreshSets();
      return result;
    },
    [characterId, refreshSets]
  );

  return {
    // State
    currentSet,
    savedSets,
    hasUnsavedChanges,
    storageStats,
    error,
    saveMessage,
    // Actions
    loadSet,
    newSet,
    updateName,
    equipItem,
    clearEquipment,
    saveSet,
    deleteSet,
    duplicateSet,
  };
};
