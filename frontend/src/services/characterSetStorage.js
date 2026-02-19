/**
 * Character Set Builder Storage Service
 * Handles localStorage persistence for equipment sets per character
 *
 * Storage structure:
 * {
 *   version: '1.0',
 *   lastUpdated: 'ISO-date',
 *   sets: {
 *     'char-uuid-1': [
 *       {
 *         id: 'set-uuid-1',
 *         name: 'Boss Hunting Set',
 *         vocation: 'knight',
 *         createdAt: 'ISO-date',
 *         equipment: {
 *           head: 'gnome_helmet',
 *           body: 'falcon_plate',
 *           legs: 'falcon_greaves',
 *           feet: 'falcon_boots',
 *           weapon: 'falcon_longsword',
 *           offhand: 'falcon_shield',
 *           ring: 'might_ring',
 *           amulet: 'falcon_amulet',
 *         }
 *       }
 *     ]
 *   }
 * }
 */

import Joi from 'joi';
import { generateUUID } from '../utils/uuid';

const STORAGE_KEY = 'luci_character_sets';
const CURRENT_VERSION = '1.0';
const MAX_SETS_PER_CHARACTER = 10;

const equipmentSchema = Joi.object({
  head: Joi.string().allow(null).optional(),
  body: Joi.string().allow(null).optional(),
  legs: Joi.string().allow(null).optional(),
  feet: Joi.string().allow(null).optional(),
  weapon: Joi.string().allow(null).optional(),
  offhand: Joi.string().allow(null).optional(),
  ring: Joi.string().allow(null).optional(),
  amulet: Joi.string().allow(null).optional(),
});

const setSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).max(100).required(),
  vocation: Joi.string().valid('knight', 'paladin', 'sorcerer', 'druid', '').optional(),
  createdAt: Joi.string().isoDate().required(),
  equipment: equipmentSchema.required(),
});

const storageSchema = Joi.object({
  version: Joi.string().required(),
  lastUpdated: Joi.string().isoDate().required(),
  sets: Joi.object().pattern(
    Joi.string(),
    Joi.array().items(setSchema).max(MAX_SETS_PER_CHARACTER)
  ).required(),
});


const getDefaultStorage = () => ({
  version: CURRENT_VERSION,
  lastUpdated: new Date().toISOString(),
  sets: {},
});

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStorage();

    const parsed = JSON.parse(raw);
    const { error } = storageSchema.validate(parsed);
    if (error) {
      console.warn('Invalid character set storage schema, resetting:', error.message);
      return getDefaultStorage();
    }

    return parsed;
  } catch (error) {
    console.error('Error loading character set data:', error);
    return getDefaultStorage();
  }
};

const saveData = (data) => {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving character set data:', error);
    return false;
  }
};

/**
 * Get all sets for a character
 */
export const getCharacterSets = (characterId) => {
  if (!characterId) return [];
  const data = loadData();
  return data.sets[characterId] || [];
};

/**
 * Get a specific set by ID
 */
export const getCharacterSet = (characterId, setId) => {
  if (!characterId || !setId) return null;
  const sets = getCharacterSets(characterId);
  return sets.find((s) => s.id === setId) || null;
};

/**
 * Save a set (create or update)
 * @returns {Object} { success, setId, error }
 */
export const saveCharacterSet = (characterId, set) => {
  if (!characterId) {
    return { success: false, error: 'Character ID is required' };
  }

  const data = loadData();
  const characterSets = data.sets[characterId] || [];

  const existingIndex = set.id ? characterSets.findIndex((s) => s.id === set.id) : -1;

  if (existingIndex >= 0) {
    // Update existing
    const setId = set.id;
    characterSets[existingIndex] = {
      ...set,
      id: setId,
      updatedAt: new Date().toISOString(),
    };
    data.sets[characterId] = characterSets;
    const saved = saveData(data);
    return { success: saved, setId, error: saved ? null : 'Failed to save' };
  } else {
    // Create new
    if (characterSets.length >= MAX_SETS_PER_CHARACTER) {
      return {
        success: false,
        error: `Maximum of ${MAX_SETS_PER_CHARACTER} sets per character reached`,
      };
    }

    const setId = generateUUID();
    const newSet = {
      ...set,
      id: setId,
      createdAt: new Date().toISOString(),
    };
    characterSets.push(newSet);
    data.sets[characterId] = characterSets;
    const saved = saveData(data);
    return { success: saved, setId, error: saved ? null : 'Failed to save' };
  }
};

/**
 * Delete a set
 */
export const deleteCharacterSet = (characterId, setId) => {
  if (!characterId || !setId) return false;

  const data = loadData();
  const characterSets = data.sets[characterId] || [];
  const updated = characterSets.filter((s) => s.id !== setId);

  if (updated.length === characterSets.length) return false;

  data.sets[characterId] = updated;
  return saveData(data);
};

/**
 * Duplicate a set
 */
export const duplicateCharacterSet = (characterId, setId) => {
  if (!characterId || !setId) {
    return { success: false, error: 'Character ID and Set ID are required' };
  }

  const original = getCharacterSet(characterId, setId);
  if (!original) {
    return { success: false, error: 'Set not found' };
  }

  return saveCharacterSet(characterId, {
    ...original,
    id: null,
    name: `${original.name} (Copy)`,
  });
};

/**
 * Get storage stats for a character
 */
export const getSetStorageStats = (characterId) => {
  const sets = getCharacterSets(characterId);
  return {
    total: sets.length,
    limit: MAX_SETS_PER_CHARACTER,
    remaining: MAX_SETS_PER_CHARACTER - sets.length,
  };
};

/**
 * Export sets to JSON
 */
export const exportSets = (characterId) => {
  const sets = getCharacterSets(characterId);
  return JSON.stringify(sets, null, 2);
};
