/**
 * useBestiaryPlanner hook
 * Manages bestiary planner state and calculates optimal hunting suggestions
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { BESTIARY_DATA, VALID_BESTIARY_DATA } from '../data/bestiary';
import * as bestiaryStorageDefault from '../services/bestiaryStorage';
import { estimateTimeToComplete, calculateEfficiencyScore as calculateEfficiencyScoreUtil } from '../utils/timeEstimator';

/**
 * Efficiency calculation (HP-based)
 * Score = charmPoints / estimatedHours_HP
 */
const calculateEfficiencyScore = (creature, settings, characterLevel, currentKills = 0) => {
  const timeEstimate = estimateTimeToComplete(creature, currentKills);
  const estimatedHours = timeEstimate.hours;

  if (!estimatedHours || estimatedHours <= 0) {
    return (creature.charmPoints / 5) * 0.5;
  }

  return calculateEfficiencyScoreUtil(creature.charmPoints, estimatedHours);
};

/**
 * Main hook
 * @param {Object} storageService - Optional storage service for dependency injection (for testing)
 */
export const useBestiaryPlanner = (storageService = bestiaryStorageDefault) => {
  const [character, setCharacter] = useState(null);
  const [completedCreatureIds, setCompletedCreatureIds] = useState([]);
  const [settings, setSettings] = useState({});
  const [filters, setFilters] = useState({
    difficulty: [], // EASY, MEDIUM, HARD
    location: '', // Single location filter (string, not array)
    creatureCategory: [],
    minCharmPoints: 0, // Legacy - kept for backwards compatibility
    charmPointsFilter: [], // New: array of specific CP values to filter
    searchTerm: '',
    showCompleted: false, // Show only completed creatures
  });

  // Load character and settings from localStorage
  useEffect(() => {
    const activeChar = storageService.getActiveCharacter();
    setCharacter(activeChar);

    if (activeChar) {
      const completed = storageService.getCompletedCreatures(activeChar.id);
      setCompletedCreatureIds(completed);
    }

    const loadedSettings = storageService.getSettings();
    setSettings(loadedSettings);
  }, [storageService]);

  // Refresh completed creatures when character changes
  const refreshProgress = useCallback(() => {
    if (character) {
      // Capture character ID to avoid race conditions
      const characterId = character.id;
      const completed = storageService.getCompletedCreatures(characterId);
      setCompletedCreatureIds(completed);
    }
  }, [character, storageService]);

  // Reload character data from storage (after switching characters or updates)
  const reloadCharacter = useCallback(() => {
    const activeChar = storageService.getActiveCharacter();
    setCharacter(activeChar);

    if (activeChar) {
      const completed = storageService.getCompletedCreatures(activeChar.id);
      setCompletedCreatureIds(completed);
    }

    const loadedSettings = storageService.getSettings();
    setSettings(loadedSettings);
  }, [storageService]);

  // Get incomplete creatures (using filtered data without excluded creatures)
  const incompleteCreatures = useMemo(() => {
    return VALID_BESTIARY_DATA.filter((c) => !completedCreatureIds.includes(c.id));
  }, [completedCreatureIds]);

  // Get completed creatures (using filtered data without excluded creatures)
  const completedCreatures = useMemo(() => {
    return VALID_BESTIARY_DATA.filter((c) => completedCreatureIds.includes(c.id));
  }, [completedCreatureIds]);

  // Apply filters
  const filteredCreatures = useMemo(() => {
    // Choose which set of creatures to filter based on showCompleted flag
    const baseCreatures = filters?.showCompleted ? completedCreatures : incompleteCreatures;

    return baseCreatures.filter((creature) => {
      // Difficulty filter
      if (filters?.difficulty?.length > 0 && !filters.difficulty.includes(creature.difficulty)) {
        return false;
      }

      // Location filter (check if creature spawns in the selected location)
      if (filters?.location && filters.location !== '') {
        const hasMatchingLocation = creature.locations.some(loc => {
          // Normalize both for comparison
          const normalizedCreatureLoc = loc.trim();
          const normalizedFilterLoc = filters.location.trim();

          // Handle special replacements
          if (normalizedCreatureLoc.toLowerCase() === 'all over tiquanda') {
            return normalizedFilterLoc === 'Tiquanda';
          }
          if (normalizedCreatureLoc.toLowerCase() === 'all over zao') {
            return normalizedFilterLoc === 'Zao';
          }

          return normalizedCreatureLoc === normalizedFilterLoc;
        });
        if (!hasMatchingLocation) {
          return false;
        }
      }

      // Creature category filter (normal/rare)
      if (
        filters?.creatureCategory?.length > 0 &&
        !filters.creatureCategory.includes(creature.creatureCategory)
      ) {
        return false;
      }

      // Charm points filter (new checkbox-based)
      if (filters?.charmPointsFilter && filters.charmPointsFilter.length > 0) {
        if (!filters.charmPointsFilter.includes(creature.charmPoints)) {
          return false;
        }
      }
      // Legacy min charm points filter (fallback)
      else if (creature.charmPoints < (filters?.minCharmPoints || 0)) {
        return false;
      }

      // Search term filter
      if (filters?.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        const nameMatch = creature.name.toLowerCase().includes(term);
        const locationMatch = creature.locations.some((loc) =>
          loc.toLowerCase().includes(term)
        );
        return nameMatch || locationMatch;
      }

      return true;
    });
  }, [incompleteCreatures, completedCreatures, filters]);

  // Calculate suggestions (sorted by efficiency)
  const suggestions = useMemo(() => {
    const characterLevel = character?.level || 100;

    return filteredCreatures
      .map((creature) => {
        const currentKills = character ? bestiaryStorageDefault.getCreatureKills(character.id, creature.id) : 0;

        return {
          ...creature,
          currentKills,
          killsToComplete: creature.killsToComplete,
          efficiencyScore: calculateEfficiencyScore(creature, settings, characterLevel, currentKills),
        };
      })
      .sort((a, b) => {
        // Sort by efficiency score (primary)
        const efficiencyDiff = b.efficiencyScore - a.efficiencyScore;
        if (Math.abs(efficiencyDiff) > 0.01) {
          return efficiencyDiff;
        }
        // If efficiency is equal, sort by charm points (secondary)
        const charmDiff = b.charmPoints - a.charmPoints;
        if (charmDiff !== 0) {
          return charmDiff;
        }
        // If both are equal, sort by name (tertiary)
        return a.name.localeCompare(b.name);
      });
  }, [filteredCreatures, settings, character]);

  // Get top N suggestions
  const getTopSuggestions = useCallback(
    (n = 10) => {
      return suggestions.slice(0, n);
    },
    [suggestions]
  );

  // Toggle creature completion
  const toggleCreatureCompletion = useCallback(
    (creatureId) => {
      if (!character) return;

      const isCompleted = completedCreatureIds.includes(creatureId);
      storageService.markCreatureCompleted(character.id, creatureId, !isCompleted);
      refreshProgress();
    },
    [character, completedCreatureIds, refreshProgress, storageService]
  );

  // Mark multiple creatures as completed
  const markMultipleCompleted = useCallback(
    (creatureIds) => {
      if (!character) return;

      storageService.markCreaturesCompleted(character.id, creatureIds, true);
      refreshProgress();
    },
    [character, refreshProgress, storageService]
  );

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      difficulty: [],
      location: '',
      creatureCategory: [],
      minCharmPoints: 0,
      charmPointsFilter: [],
      searchTerm: '',
      showCompleted: false,
    });
  }, []);

  // Get progress statistics (using filtered data without excluded creatures)
  const progress = useMemo(() => {
    if (!character) {
      return {
        completed: 0,
        total: VALID_BESTIARY_DATA.length,
        percentage: 0,
        charmPointsEarned: 0,
        charmPointsRemaining: 0,
      };
    }

    return storageService.getCharacterProgress(character.id, VALID_BESTIARY_DATA);
  }, [character, storageService]);

  // Get creature by ID (pure function, no need for useCallback)
  // Note: Still uses full BESTIARY_DATA to allow looking up excluded creatures if needed
  const getCreatureById = (creatureId) => {
    return BESTIARY_DATA.find((c) => c.id === creatureId);
  };

  // Check if creature is completed
  const isCreatureCompleted = useCallback(
    (creatureId) => {
      return completedCreatureIds.includes(creatureId);
    },
    [completedCreatureIds]
  );

  // Get time to complete all remaining (HP-based)
  const getTotalRemainingTime = useCallback(() => {
    return incompleteCreatures.reduce((sum, c) => {
      const estimate = estimateTimeToComplete(c, 0);
      return sum + (estimate.hours || 0);
    }, 0);
  }, [incompleteCreatures]);

  // Get charm points per hour for remaining
  const getAverageCharmPointsPerHour = useCallback(() => {
    if (incompleteCreatures.length === 0) return null;

    const totalCharmPoints = incompleteCreatures.reduce((sum, c) => sum + c.charmPoints, 0);
    const totalHours = incompleteCreatures.reduce((sum, c) => {
      const estimate = estimateTimeToComplete(c, 0);
      return sum + (estimate.hours || 0);
    }, 0);

    return totalHours > 0 ? totalCharmPoints / totalHours : null;
  }, [incompleteCreatures]);

  return {
    // State
    character,
    completedCreatureIds,
    settings,
    filters,

    // Computed
    incompleteCreatures,
    filteredCreatures,
    suggestions,
    progress,

    // Actions
    setCharacter,
    setSettings,
    toggleCreatureCompletion,
    markMultipleCompleted,
    updateFilters,
    resetFilters,
    refreshProgress,
    reloadCharacter,
    getTopSuggestions,
    getCreatureById,
    isCreatureCompleted,
    getTotalRemainingTime,
    getAverageCharmPointsPerHour,
  };
};

export default useBestiaryPlanner;
