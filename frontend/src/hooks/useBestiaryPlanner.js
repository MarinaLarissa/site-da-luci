/**
 * useBestiaryPlanner hook
 * Manages bestiary planner state and calculates optimal hunting suggestions
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { BESTIARY_DATA, VALID_BESTIARY_DATA } from '../data/bestiary';
import * as bestiaryStorageDefault from '../services/bestiaryStorage';

/**
 * Efficiency calculation
 * Score = (charmPoints / estimatedHours) * modifiers
 *
 * Modifiers:
 * - Rapid respawn active: +30% for creatures with rapid respawn category
 * - Preferred region: +20%
 * - Lower level recommendation (character level > recommended level + 50): +10%
 */
const calculateEfficiencyScore = (creature, settings, characterLevel) => {
  const baseScore = creature.charmPoints / creature.estimatedHours;

  let modifier = 1.0;

  // Rapid respawn bonus
  if (settings.rapidRespawnActive && creature.respawnCategory === 'rapid') {
    modifier += 0.3;
  }

  // Preferred region bonus
  if (settings.preferredRegions.includes(creature.region)) {
    modifier += 0.2;
  }

  // Over-leveled bonus (easier kills)
  if (characterLevel > creature.recommendedLevel + 50) {
    modifier += 0.1;
  }

  return baseScore * modifier;
};

/**
 * Main hook
 * @param {Object} storageService - Optional storage service for dependency injection (for testing)
 */
export const useBestiaryPlanner = (storageService = bestiaryStorageDefault) => {
  const [character, setCharacter] = useState(null);
  const [completedCreatureIds, setCompletedCreatureIds] = useState([]);
  const [settings, setSettings] = useState({ rapidRespawnActive: false, preferredRegions: [] });
  const [filters, setFilters] = useState({
    difficulty: [], // EASY, MEDIUM, HARD
    region: [],
    respawnCategory: [],
    minCharmPoints: 0,
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
    const baseCreatures = filters.showCompleted ? completedCreatures : incompleteCreatures;

    return baseCreatures.filter((creature) => {
      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(creature.difficulty)) {
        return false;
      }

      // Region filter
      if (filters.region.length > 0 && !filters.region.includes(creature.region)) {
        return false;
      }

      // Respawn category filter
      if (
        filters.respawnCategory.length > 0 &&
        !filters.respawnCategory.includes(creature.respawnCategory)
      ) {
        return false;
      }

      // Charm points filter
      if (creature.charmPoints < filters.minCharmPoints) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
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
    const hasRapidFilter = filters.respawnCategory.includes('rapid');

    return filteredCreatures
      .map((creature) => ({
        ...creature,
        efficiencyScore: calculateEfficiencyScore(creature, settings, characterLevel),
        isRapidRecommended: hasRapidFilter && creature.respawnCategory === 'rapid',
      }))
      .sort((a, b) => {
        // When rapid filter is active, prioritize rapid creatures
        if (hasRapidFilter) {
          if (a.isRapidRecommended && !b.isRapidRecommended) return -1;
          if (!a.isRapidRecommended && b.isRapidRecommended) return 1;
        }
        // Then sort by efficiency
        return b.efficiencyScore - a.efficiencyScore;
      });
  }, [filteredCreatures, settings, character, filters.respawnCategory]);

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
      region: [],
      respawnCategory: [],
      minCharmPoints: 0,
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
  }, [character, completedCreatureIds, storageService]);

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

  // Get time to complete all remaining
  const getTotalRemainingTime = useCallback(() => {
    return incompleteCreatures.reduce((sum, c) => sum + c.estimatedHours, 0);
  }, [incompleteCreatures]);

  // Get charm points per hour for remaining
  const getAverageCharmPointsPerHour = useCallback(() => {
    if (incompleteCreatures.length === 0) return null;

    const totalCharmPoints = incompleteCreatures.reduce((sum, c) => sum + c.charmPoints, 0);
    const totalHours = incompleteCreatures.reduce((sum, c) => sum + c.estimatedHours, 0);

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
