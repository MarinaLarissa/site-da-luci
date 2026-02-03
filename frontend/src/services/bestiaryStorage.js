/**
 * Bestiary Storage Service
 * Handles localStorage persistence for bestiary progress per character
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

const STORAGE_KEY = 'luci_bestiary_progress';
const CURRENT_VERSION = '1.0';

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
 */
export const markCreatureCompleted = (characterId, creatureId, completed = true) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    console.error('Character not found:', characterId);
    return false;
  }

  data.characters[characterId].creatures[creatureId] = {
    completed,
    ...(completed && { completedAt: new Date().toISOString() }),
  };

  saveBestiaryData(data);
  return true;
};

/**
 * Mark multiple creatures as completed
 */
export const markCreaturesCompleted = (characterId, creatureIds, completed = true) => {
  const data = loadBestiaryData();

  if (!data.characters[characterId]) {
    console.error('Character not found:', characterId);
    return false;
  }

  creatureIds.forEach((creatureId) => {
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
 * Import data from JSON
 */
export const importBestiaryData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);

    // Validate structure
    if (!data.version || !data.characters) {
      throw new Error('Invalid data structure');
    }

    saveBestiaryData(data);
    return { success: true };
  } catch (error) {
    console.error('Error importing bestiary data:', error);
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
  getCharacterProgress,
  getSettings,
  updateSettings,
  toggleRapidRespawn,
  setPreferredRegions,
  exportBestiaryData,
  importBestiaryData,
  clearBestiaryData,
};
