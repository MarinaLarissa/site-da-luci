/**
 * useUndoAction Hook
 * Manages undo stack for creature actions (complete/plan/edit)
 *
 * Features:
 * - Stack of last 5 actions per character
 * - Auto-timeout after 10 seconds
 * - Persists to localStorage
 */

import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_UNDO_STACK_SIZE = 5;
const UNDO_TIMEOUT_MS = 10000; // 10 seconds

const getStorageKey = (characterId) => `bestiary_undo_stack_${characterId}`;

/**
 * Load undo stack from localStorage
 */
const loadUndoStack = (characterId) => {
  if (!characterId) return [];

  try {
    const stored = localStorage.getItem(getStorageKey(characterId));
    if (stored) {
      const stack = JSON.parse(stored);
      // Filter out expired actions (older than 10 seconds)
      const now = Date.now();
      return stack.filter(action => now - action.timestamp < UNDO_TIMEOUT_MS);
    }
  } catch (error) {
    console.error('Failed to load undo stack:', error);
  }

  return [];
};

/**
 * Save undo stack to localStorage
 */
const saveUndoStack = (characterId, stack) => {
  if (!characterId) return;

  try {
    localStorage.setItem(getStorageKey(characterId), JSON.stringify(stack));
  } catch (error) {
    console.error('Failed to save undo stack:', error);
  }
};

/**
 * Custom hook for managing undo actions
 */
export const useUndoAction = (characterId) => {
  const [undoStack, setUndoStack] = useState(() => loadUndoStack(characterId));
  const timeoutRefs = useRef({});

  // Save to localStorage whenever stack changes
  useEffect(() => {
    if (characterId) {
      saveUndoStack(characterId, undoStack);
    }
  }, [characterId, undoStack]);

  // Clear expired timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  /**
   * Add action to undo stack
   * @param {Object} action - Action object { type, data, undo }
   *   - type: 'complete' | 'plan' | 'editKills'
   *   - data: { creatureId, creatureName, ... } (action-specific data)
   *   - undo: Function to execute to undo the action
   */
  const performAction = useCallback((action) => {
    const actionWithTimestamp = {
      ...action,
      id: `${Date.now()}_${Math.random()}`,
      timestamp: Date.now(),
    };

    setUndoStack((prevStack) => {
      // Add new action to the top
      const newStack = [actionWithTimestamp, ...prevStack];

      // Keep only last 5 actions
      const trimmedStack = newStack.slice(0, MAX_UNDO_STACK_SIZE);

      return trimmedStack;
    });

    // Set timeout to remove action after 10 seconds
    const timeoutId = setTimeout(() => {
      setUndoStack((prevStack) =>
        prevStack.filter(a => a.id !== actionWithTimestamp.id)
      );
      delete timeoutRefs.current[actionWithTimestamp.id];
    }, UNDO_TIMEOUT_MS);

    timeoutRefs.current[actionWithTimestamp.id] = timeoutId;
  }, []);

  /**
   * Undo the most recent action
   */
  const undo = useCallback(() => {
    if (undoStack.length === 0) return null;

    const [mostRecentAction, ...remainingStack] = undoStack;

    // Clear timeout for this action
    if (timeoutRefs.current[mostRecentAction.id]) {
      clearTimeout(timeoutRefs.current[mostRecentAction.id]);
      delete timeoutRefs.current[mostRecentAction.id];
    }

    // Execute undo function
    if (mostRecentAction.undo && typeof mostRecentAction.undo === 'function') {
      mostRecentAction.undo();
    }

    // Remove action from stack
    setUndoStack(remainingStack);

    return mostRecentAction;
  }, [undoStack]);

  /**
   * Check if undo is available
   */
  const canUndo = undoStack.length > 0;

  /**
   * Get the most recent action (for displaying in toast)
   */
  const getMostRecentAction = useCallback(() => {
    return undoStack.length > 0 ? undoStack[0] : null;
  }, [undoStack]);

  /**
   * Clear all undo history (e.g., when switching characters)
   */
  const clearUndoStack = useCallback(() => {
    // Clear all timeouts
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};

    setUndoStack([]);
  }, []);

  return {
    undoStack,
    performAction,
    undo,
    canUndo,
    getMostRecentAction,
    clearUndoStack,
  };
};
