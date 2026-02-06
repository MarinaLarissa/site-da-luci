/**
 * useKeyboardShortcuts Hook
 * Manages keyboard shortcuts for creature cards
 *
 * Shortcuts:
 * - Ctrl+Z: Undo last action
 * - Enter: Complete creature
 * - E: Edit kills
 * - P: Add to plan
 *
 * Only active when card is focused
 */

import { useEffect, useCallback } from 'react';

/**
 * Custom hook for keyboard shortcuts
 *
 * @param {Object} options
 * @param {Function} options.onComplete - Callback for Enter key (complete creature)
 * @param {Function} options.onEdit - Callback for E key (edit kills)
 * @param {Function} options.onPlan - Callback for P key (add to plan)
 * @param {Function} options.onUndo - Callback for Ctrl+Z (undo)
 * @param {boolean} options.enabled - Enable/disable shortcuts (default: true)
 * @param {React.RefObject} options.cardRef - Ref to card element (for focus detection)
 */
export const useKeyboardShortcuts = ({
  onComplete,
  onEdit,
  onPlan,
  onUndo,
  enabled = true,
  cardRef,
}) => {
  const handleKeyDown = useCallback(
    (event) => {
      // Only handle shortcuts if enabled
      if (!enabled) return;

      // Only handle shortcuts if card is focused (or if no cardRef provided)
      if (cardRef && cardRef.current && !cardRef.current.contains(document.activeElement)) {
        return;
      }

      // Check if input/textarea is focused (don't trigger shortcuts in input fields)
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      // Ctrl+Z: Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        if (onUndo) {
          onUndo();
        }
        return;
      }

      // Enter: Complete creature
      if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // E: Edit kills
      if (event.key === 'e' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        if (onEdit) {
          onEdit();
        }
        return;
      }

      // P: Add to plan
      if (event.key === 'p' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        event.preventDefault();
        if (onPlan) {
          onPlan();
        }
        return;
      }
    },
    [enabled, cardRef, onComplete, onEdit, onPlan, onUndo]
  );

  useEffect(() => {
    if (!enabled) return;

    // Attach global keyboard listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);

  /**
   * Get shortcut hints for tooltips
   */
  const getShortcutHints = useCallback(() => {
    return {
      complete: 'Enter',
      edit: 'E',
      plan: 'P',
      undo: 'Ctrl+Z',
    };
  }, []);

  return {
    getShortcutHints,
  };
};
