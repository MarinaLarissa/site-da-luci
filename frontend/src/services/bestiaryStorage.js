/**
 * Bestiary Storage Service
 * Handles localStorage persistence for bestiary progress per character
 *
 * Feature 4 Update (Progress History):
 * - Integrated with progressHistoryStorage for long-term tracking
 *
 * Storage structure:
 * {
 *   version: '1.0',
 *   lastUpdated: 'ISO-date',
 *   activeCharacter: 'char-uuid-1',
 *   characters: {
 *     'char-uuid-1': {
 *       id: 'char-uuid-1',
 *       name: 'Knight Master',
 *       level: 350,
 *       vocation: 'knight',
 *       createdAt: 'ISO-date',
 *       creatures: {
 *         'dragon': { completed: true, completedAt: 'ISO-date' },
 *         'demon': { completed: false },
 *       }
 *     }
 *   },
 *   settings: {
 *     rapidRespawnActive: false,
 *     preferredRegions: ['Zao', 'Roshamuul']
 *   }
 * }
 */

import Joi from 'joi';

const STORAGE_KEY = 'luci_bestiary_progress';
const CURRENT_VERSION = '1.0';

/**
 * Joi Schema for bestiary data validation
 */
const creatureProgressSchema = Joi.object({
  completed: Joi.boolean().required(),
  completedAt: Joi.string().isoDate().optional(),
  kills: Joi.number().integer().min(0).optional(), // Manual kill count
});

const characterSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).max(100).required(),
  level: Joi.number().integer().min(1).max(9999).required(),
  vocation: Joi.string().valid('knight', 'paladin', 'sorcerer', 'druid').required(),
  createdAt: Joi.string().isoDate().required(),
  creatures: Joi.object().pattern(
    Joi.string(), // creature ID
    creatureProgressSchema
  ).required(),
});

const bestiaryDataSchema = Joi.object({
  version: Joi.string().required(),
  lastUpdated: Joi.string().isoDate().required(),
  activeCharacter: Joi.string().allow(null).required(),
  characters: Joi.object().pattern(
    Joi.string(), // character UUID
    characterSchema
  ).required(),
  settings: Joi.object({
    rapidRespawnActive: Joi.boolean().required(),
    preferredRegions: Joi.array().items(Joi.string()).required(),
  }).required(),
});

/**
 * Generate a simple UUID
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Get default storage structure
 */
const getDefaultStorage = () => ({
  version: CURRENT_VERSION,
  lastUpdated: new Date().toISOString(),
  activeCharacter: null,
  characters: {},
  settings: {
    rapidRespawnActive: false,
    preferredRegions: [],
  },
});

/**
 * Load data from localStorage
 */
export const loadBestiaryData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultStorage();
    }

    const data = JSON.parse(stored);

    // Migrate if needed (future-proofing)
    if (data.version !== CURRENT_VERSION) {
      return migrateData(data);
    }

    return data;
  } catch (error) {
    console.error('Error loading bestiary data:', error);
    return getDefaultStorage();
  }
};

/**
 * Save data to localStorage
 */
export const saveBestiaryData = (data) => {
  try {
    const toSave = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch (error) {
    console.error('Error saving bestiary data:', error);
    return false;
  }
};

/**
 * Migrate data from older versions
 */
const migrateData = (oldData) => {
  // For now, just return default with a console warning
  console.warn('Migrating bestiary data from version:', oldData.version);
  return getDefaultStorage();
};

// ============== Character Management ==============

/**
 * Create a new character
 */
export const createCharacter = (name, level = 1, vocation = 'knight') => {
  const data = loadBestiaryData();
  const id = generateUUID();

  const newCharacter = {
    id,
    name,
    level,
    vocation,
    createdAt: new Date().toISOString(),
    creatures: {},
  };

  data.characters[id] = newCharacter;

  // Set as active if it's the first character
  if (!data.activeCharacter) {
    data.activeCharacter = id;
  }

  saveBestiaryData(data);
  return newCharacter;
};

/**
 * Update a character
 */
export const updateCharacter = (characterId, updates) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    console.error('Character not found:', characterId);
    return null;
  }

  data.characters[characterId] = {
    ...data.characters[characterId],
    ...updates,
  };

  saveBestiaryData(data);
  return data.characters[characterId];
};

/**
 * Delete a character
 */
export const deleteCharacter = (characterId) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    console.error('Character not found:', characterId);
    return false;
  }

  delete data.characters[characterId];

  // Update active character if needed
  if (data.activeCharacter === characterId) {
    const remainingIds = Object.keys(data.characters);
    data.activeCharacter = remainingIds.length > 0 ? remainingIds[0] : null;
  }

  saveBestiaryData(data);
  return true;
};

/**
 * Get all characters
 */
export const getAllCharacters = () => {
  const data = loadBestiaryData();
  return Object.values(data.characters);
};

/**
 * Get active character
 */
export const getActiveCharacter = () => {
  const data = loadBestiaryData();
  if (!data.activeCharacter) return null;
  return data.characters[data.activeCharacter] || null;
};

/**
 * Set active character
 */
export const setActiveCharacter = (characterId) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    console.error('Character not found:', characterId);
    return false;
  }

  data.activeCharacter = characterId;
  saveBestiaryData(data);
  return true;
};

// ============== Creature Progress Management ==============

/**
 * Mark a creature as completed for a character
 * Now delegates to markCreaturesCompleted for code reuse
 */
export const markCreatureCompleted = (characterId, creatureId, completed = true) => {
  return markCreaturesCompleted(characterId, creatureId, completed);
};

/**
 * Mark multiple creatures as completed (consolidated with single version)
 */
export const markCreaturesCompleted = (characterId, creatureIds, completed = true) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Character not found:', characterId);
    }
    return false;
  }

  // Convert single ID to array for uniform processing
  const idsArray = Array.isArray(creatureIds) ? creatureIds : [creatureIds];

  idsArray.forEach((creatureId) => {
    data.characters[characterId].creatures[creatureId] = {
      completed,
      ...(completed && { completedAt: new Date().toISOString() }),
    };
  });

  saveBestiaryData(data);
  return true;
};

/**
 * Get completed creatures for a character
 */
export const getCompletedCreatures = (characterId) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    return [];
  }

  const creatures = data.characters[characterId].creatures;
  return Object.keys(creatures).filter((id) => creatures[id].completed);
};

/**
 * Check if a creature is completed for a character
 */
export const isCreatureCompleted = (characterId, creatureId) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    return false;
  }

  const creature = data.characters[characterId].creatures[creatureId];
  return creature?.completed || false;
};

/**
 * Update kill count for a creature (manual entry)
 * @param {string} characterId - Character UUID
 * @param {string} creatureId - Creature ID
 * @param {number} kills - Number of kills
 * @param {number} occurrence - Total kills needed for completion (from BESTIARY_DATA)
 * @returns {boolean} - Success status
 */
export const updateCreatureKills = (characterId, creatureId, kills, occurrence) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Character not found:', characterId);
    }
    return false;
  }

  // Ensure kills is valid
  const validKills = Math.max(0, Math.min(kills, occurrence));

  // Check if should auto-complete
  const shouldComplete = validKills >= occurrence;

  data.characters[characterId].creatures[creatureId] = {
    completed: shouldComplete,
    kills: validKills,
    ...(shouldComplete && { completedAt: new Date().toISOString() }),
  };

  saveBestiaryData(data);
  return true;
};

/**
 * Get kill count for a creature
 * @param {string} characterId - Character UUID
 * @param {string} creatureId - Creature ID
 * @returns {number} - Number of kills (0 if not started)
 */
export const getCreatureKills = (characterId, creatureId) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    return 0;
  }

  const creature = data.characters[characterId].creatures[creatureId];
  return creature?.kills || 0;
};

/**
 * Import creatures with progress from OCR
 * @param {string} characterId - Character UUID
 * @param {Array<{creatureId: string, stage: number|null, isComplete: boolean, minimumKills: number|null}>} creaturesData - Array of creatures with progress
 * @returns {boolean} - Success status
 */
export const importCreaturesWithProgress = (characterId, creaturesData) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Character not found:', characterId);
    }
    return false;
  }

  creaturesData.forEach(({ creatureId, stage, isComplete, minimumKills }) => {
    // If complete, mark as completed
    if (isComplete) {
      data.characters[characterId].creatures[creatureId] = {
        completed: true,
        completedAt: new Date().toISOString(),
      };
    } else if (stage && minimumKills !== null) {
      // If in progress, save the minimum kills achieved
      data.characters[characterId].creatures[creatureId] = {
        completed: false,
        kills: minimumKills,
      };
    }
  });

  saveBestiaryData(data);
  return true;
};

/**
 * Get progress statistics for a character
 */
export const getCharacterProgress = (characterId, allCreatures) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    return {
      completed: 0,
      total: allCreatures.length,
      percentage: 0,
      charmPointsEarned: 0,
      charmPointsRemaining: 0,
    };
  }

  const characterCreatures = data.characters[characterId].creatures;
  const completedIds = Object.keys(characterCreatures).filter(
    (id) => characterCreatures[id].completed
  );

  const completed = completedIds.length;
  const total = allCreatures.length;

  const charmPointsEarned = allCreatures
    .filter((c) => completedIds.includes(c.id))
    .reduce((sum, c) => sum + c.charmPoints, 0);

  const totalCharmPoints = allCreatures.reduce((sum, c) => sum + c.charmPoints, 0);
  const charmPointsRemaining = totalCharmPoints - charmPointsEarned;

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
    charmPointsEarned,
    charmPointsRemaining,
  };
};

// ============== Settings Management ==============

/**
 * Get settings
 */
export const getSettings = () => {
  const data = loadBestiaryData();
  return data.settings;
};

/**
 * Update settings
 */
export const updateSettings = (updates) => {
  const data = loadBestiaryData();
  data.settings = {
    ...data.settings,
    ...updates,
  };
  saveBestiaryData(data);
  return data.settings;
};

/**
 * Toggle rapid respawn event
 */
export const toggleRapidRespawn = () => {
  const data = loadBestiaryData();
  data.settings.rapidRespawnActive = !data.settings.rapidRespawnActive;
  saveBestiaryData(data);
  return data.settings.rapidRespawnActive;
};

/**
 * Set preferred regions
 */
export const setPreferredRegions = (regions) => {
  const data = loadBestiaryData();
  data.settings.preferredRegions = regions;
  saveBestiaryData(data);
  return regions;
};

// ============== Import/Export ==============

/**
 * Export all data as JSON
 */
export const exportBestiaryData = () => {
  const data = loadBestiaryData();
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from JSON with Joi validation
 */
export const importBestiaryData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);

    // Validate with Joi schema
    const { error, value } = bestiaryDataSchema.validate(data, {
      abortEarly: false, // Show all errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message).join(', ');
      throw new Error(`Schema validation failed: ${errorMessages}`);
    }

    saveBestiaryData(value);
    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error importing bestiary data:', error);
    }
    return { success: false, error: error.message };
  }
};

/**
 * Clear all data
 */
export const clearBestiaryData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export default {
  loadBestiaryData,
  saveBestiaryData,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getAllCharacters,
  getActiveCharacter,
  setActiveCharacter,
  markCreatureCompleted,
  markCreaturesCompleted,
  getCompletedCreatures,
  isCreatureCompleted,
  updateCreatureKills,
  getCreatureKills,
  importCreaturesWithProgress,
  getCharacterProgress,
  getSettings,
  updateSettings,
  toggleRapidRespawn,
  setPreferredRegions,
  exportBestiaryData,
  importBestiaryData,
  clearBestiaryData,
};
