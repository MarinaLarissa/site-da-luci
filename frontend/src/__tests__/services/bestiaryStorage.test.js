/**
 * Unit Tests for bestiaryStorage service
 *
 * Tests cover:
 * - localStorage persistence
 * - Character CRUD operations
 * - Creature progress management
 * - Joi schema validation
 * - Import/Export functionality
 */

import {
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
} from '../../services/bestiaryStorage';

// Mock localStorage with proper implementation
let localStorageStore = {};

const localStorageMock = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, value) => {
    localStorageStore[key] = value;
  },
  removeItem: (key) => {
    delete localStorageStore[key];
  },
  clear: () => {
    localStorageStore = {};
  },
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock creatures for testing
const mockCreatures = [
  { id: 'dragon', name: 'Dragon', charmPoints: 15 },
  { id: 'demon', name: 'Demon', charmPoints: 25 },
  { id: 'rotworm', name: 'Rotworm', charmPoints: 5 },
];

describe('bestiaryStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageStore = {};
  });

  // ============== Load/Save Tests ==============

  describe('loadBestiaryData', () => {
    it('should return default storage when localStorage is empty', () => {
      const data = loadBestiaryData();

      expect(data).toHaveProperty('version', '1.0');
      expect(data).toHaveProperty('activeCharacter', null);
      expect(data).toHaveProperty('characters');
      expect(data).toHaveProperty('settings');
      expect(data.settings).toHaveProperty('rapidRespawnActive', false);
      expect(data.settings).toHaveProperty('preferredRegions');
    });

    it('should return stored data when localStorage has data', () => {
      const storedData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'test-id',
        characters: {},
        settings: { rapidRespawnActive: true, preferredRegions: ['Zao'] },
      };
      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(storedData));

      const data = loadBestiaryData();

      expect(data.activeCharacter).toBe('test-id');
      expect(data.settings.rapidRespawnActive).toBe(true);
    });

    it('should return default storage on parse error', () => {
      localStorageMock.setItem('luci_bestiary_progress', 'invalid json');

      const data = loadBestiaryData();

      expect(data).toHaveProperty('version', '1.0');
      expect(data.activeCharacter).toBeNull();
    });
  });

  describe('saveBestiaryData', () => {
    it('should save data to localStorage', () => {
      const data = {
        version: '1.0',
        activeCharacter: null,
        characters: {},
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      const result = saveBestiaryData(data);

      expect(result).toBe(true);
      const stored = JSON.parse(localStorageMock.getItem('luci_bestiary_progress'));
      expect(stored.version).toBe('1.0');
      expect(stored.activeCharacter).toBeNull();
    });

    it('should update lastUpdated timestamp', () => {
      const data = {
        version: '1.0',
        activeCharacter: null,
        characters: {},
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      saveBestiaryData(data);

      const stored = JSON.parse(localStorageMock.getItem('luci_bestiary_progress'));
      expect(stored).toHaveProperty('lastUpdated');
      expect(new Date(stored.lastUpdated)).toBeInstanceOf(Date);
    });
  });

  // ============== Character CRUD Tests ==============

  describe('createCharacter', () => {
    it('should create a new character with correct properties', () => {
      const character = createCharacter('Test Knight', 150, 'knight');

      expect(character).toHaveProperty('id');
      expect(character.name).toBe('Test Knight');
      expect(character.level).toBe(150);
      expect(character.vocation).toBe('knight');
      expect(character).toHaveProperty('createdAt');
      expect(character.creatures).toEqual({});
    });

    it('should set as active character if first character', () => {
      createCharacter('First Char', 100, 'paladin');

      const data = loadBestiaryData();
      expect(data.activeCharacter).not.toBeNull();
    });

    it('should not change active character if not first', () => {
      const first = createCharacter('First', 100, 'knight');
      createCharacter('Second', 200, 'druid');

      const data = loadBestiaryData();
      expect(data.activeCharacter).toBe(first.id);
    });
  });

  describe('updateCharacter', () => {
    it('should update character properties', () => {
      const character = createCharacter('Original', 100, 'knight');

      const updated = updateCharacter(character.id, {
        name: 'Updated Name',
        level: 200,
      });

      expect(updated.name).toBe('Updated Name');
      expect(updated.level).toBe(200);
      expect(updated.vocation).toBe('knight'); // Unchanged
    });

    it('should return null for non-existent character', () => {
      const result = updateCharacter('non-existent-id', { name: 'Test' });

      expect(result).toBeNull();
    });
  });

  describe('deleteCharacter', () => {
    it('should delete character from storage', () => {
      const character = createCharacter('To Delete', 100, 'sorcerer');

      const result = deleteCharacter(character.id);

      expect(result).toBe(true);
      expect(getAllCharacters()).toHaveLength(0);
    });

    it('should update active character when deleting active', () => {
      const first = createCharacter('First', 100, 'knight');
      const second = createCharacter('Second', 200, 'druid');
      setActiveCharacter(first.id);

      deleteCharacter(first.id);

      const data = loadBestiaryData();
      expect(data.activeCharacter).toBe(second.id);
    });

    it('should return false for non-existent character', () => {
      const result = deleteCharacter('non-existent-id');

      expect(result).toBe(false);
    });
  });

  describe('getAllCharacters', () => {
    it('should return empty array when no characters', () => {
      const characters = getAllCharacters();

      expect(characters).toEqual([]);
    });

    it('should return all characters as array', () => {
      createCharacter('Char 1', 100, 'knight');
      createCharacter('Char 2', 200, 'paladin');

      const characters = getAllCharacters();

      expect(characters).toHaveLength(2);
    });
  });

  describe('getActiveCharacter / setActiveCharacter', () => {
    it('should return null when no active character', () => {
      const active = getActiveCharacter();

      expect(active).toBeNull();
    });

    it('should return active character', () => {
      const character = createCharacter('Active', 100, 'knight');

      const active = getActiveCharacter();

      expect(active.id).toBe(character.id);
    });

    it('should change active character', () => {
      createCharacter('First', 100, 'knight');
      const second = createCharacter('Second', 200, 'druid');

      setActiveCharacter(second.id);

      expect(getActiveCharacter().id).toBe(second.id);
    });
  });

  // ============== Creature Progress Tests ==============

  describe('markCreatureCompleted', () => {
    it('should mark creature as completed', () => {
      const character = createCharacter('Test', 100, 'knight');

      markCreatureCompleted(character.id, 'dragon', true);

      expect(isCreatureCompleted(character.id, 'dragon')).toBe(true);
    });

    it('should mark creature as not completed', () => {
      const character = createCharacter('Test', 100, 'knight');
      markCreatureCompleted(character.id, 'dragon', true);

      markCreatureCompleted(character.id, 'dragon', false);

      expect(isCreatureCompleted(character.id, 'dragon')).toBe(false);
    });

    it('should add completedAt timestamp when completing', () => {
      const character = createCharacter('Test', 100, 'knight');

      markCreatureCompleted(character.id, 'dragon', true);

      const data = loadBestiaryData();
      expect(data.characters[character.id].creatures.dragon).toHaveProperty('completedAt');
    });
  });

  describe('markCreaturesCompleted', () => {
    it('should mark multiple creatures as completed', () => {
      const character = createCharacter('Test', 100, 'knight');

      markCreaturesCompleted(character.id, ['dragon', 'demon', 'rotworm'], true);

      expect(isCreatureCompleted(character.id, 'dragon')).toBe(true);
      expect(isCreatureCompleted(character.id, 'demon')).toBe(true);
      expect(isCreatureCompleted(character.id, 'rotworm')).toBe(true);
    });

    it('should accept single creature ID', () => {
      const character = createCharacter('Test', 100, 'knight');

      markCreaturesCompleted(character.id, 'dragon', true);

      expect(isCreatureCompleted(character.id, 'dragon')).toBe(true);
    });
  });

  describe('getCompletedCreatures', () => {
    it('should return empty array when no completed creatures', () => {
      const character = createCharacter('Test', 100, 'knight');

      const completed = getCompletedCreatures(character.id);

      expect(completed).toEqual([]);
    });

    it('should return array of completed creature IDs', () => {
      const character = createCharacter('Test', 100, 'knight');
      markCreatureCompleted(character.id, 'dragon', true);
      markCreatureCompleted(character.id, 'demon', true);
      markCreatureCompleted(character.id, 'rotworm', false);

      const completed = getCompletedCreatures(character.id);

      expect(completed).toContain('dragon');
      expect(completed).toContain('demon');
      expect(completed).not.toContain('rotworm');
    });
  });

  describe('getCharacterProgress', () => {
    it('should calculate progress correctly', () => {
      const character = createCharacter('Test', 100, 'knight');
      markCreatureCompleted(character.id, 'dragon', true);
      markCreatureCompleted(character.id, 'demon', true);

      const progress = getCharacterProgress(character.id, mockCreatures);

      expect(progress.completed).toBe(2);
      expect(progress.total).toBe(3);
      expect(progress.percentage).toBe(67); // 2/3 = 66.67% rounded
      expect(progress.charmPointsEarned).toBe(40); // 15 + 25
      expect(progress.charmPointsRemaining).toBe(5); // 45 - 40
    });

    it('should return zero progress for non-existent character', () => {
      const progress = getCharacterProgress('non-existent', mockCreatures);

      expect(progress.completed).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });

  // ============== Settings Tests ==============

  describe('getSettings / updateSettings', () => {
    it('should return default settings', () => {
      const settings = getSettings();

      expect(settings.rapidRespawnActive).toBe(false);
      expect(settings.preferredRegions).toEqual([]);
    });

    it('should update settings', () => {
      updateSettings({ rapidRespawnActive: true });

      const settings = getSettings();
      expect(settings.rapidRespawnActive).toBe(true);
    });
  });

  describe('toggleRapidRespawn', () => {
    it('should toggle rapid respawn setting', () => {
      expect(getSettings().rapidRespawnActive).toBe(false);

      toggleRapidRespawn();
      expect(getSettings().rapidRespawnActive).toBe(true);

      toggleRapidRespawn();
      expect(getSettings().rapidRespawnActive).toBe(false);
    });
  });

  describe('setPreferredRegions', () => {
    it('should set preferred regions', () => {
      setPreferredRegions(['Zao', 'Roshamuul']);

      expect(getSettings().preferredRegions).toEqual(['Zao', 'Roshamuul']);
    });
  });

  // ============== Import/Export Tests ==============

  describe('exportBestiaryData', () => {
    it('should export data as JSON string', () => {
      createCharacter('Export Test', 100, 'knight');

      const exported = exportBestiaryData();

      expect(typeof exported).toBe('string');
      const parsed = JSON.parse(exported);
      expect(parsed).toHaveProperty('version');
      expect(parsed).toHaveProperty('characters');
    });
  });

  describe('importBestiaryData', () => {
    it('should import valid data successfully', () => {
      const validData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: null,
        characters: {},
        settings: { rapidRespawnActive: true, preferredRegions: ['Zao'] },
      };

      const result = importBestiaryData(JSON.stringify(validData));

      expect(result.success).toBe(true);
      expect(getSettings().rapidRespawnActive).toBe(true);
    });

    it('should reject invalid JSON', () => {
      const result = importBestiaryData('invalid json');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject data with missing required fields', () => {
      const invalidData = {
        version: '1.0',
        // missing other required fields
      };

      const result = importBestiaryData(JSON.stringify(invalidData));

      expect(result.success).toBe(false);
    });

    it('should reject data with invalid character structure', () => {
      const invalidData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: null,
        characters: {
          'invalid-char': {
            // missing required fields
            name: 'Test',
          },
        },
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      const result = importBestiaryData(JSON.stringify(invalidData));

      expect(result.success).toBe(false);
    });

    it('should reject invalid vocation', () => {
      const invalidData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: null,
        characters: {
          'test-id': {
            id: 'test-id',
            name: 'Test',
            level: 100,
            vocation: 'invalid-vocation', // Invalid
            createdAt: new Date().toISOString(),
            creatures: {},
          },
        },
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      const result = importBestiaryData(JSON.stringify(invalidData));

      expect(result.success).toBe(false);
    });

    it('should reject level out of range', () => {
      const invalidData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: null,
        characters: {
          'test-id': {
            id: 'test-id',
            name: 'Test',
            level: 10000, // Out of range (max 9999)
            vocation: 'knight',
            createdAt: new Date().toISOString(),
            creatures: {},
          },
        },
        settings: { rapidRespawnActive: false, preferredRegions: [] },
      };

      const result = importBestiaryData(JSON.stringify(invalidData));

      expect(result.success).toBe(false);
    });
  });

  describe('clearBestiaryData', () => {
    it('should clear all data', () => {
      createCharacter('To Clear', 100, 'knight');

      clearBestiaryData();

      expect(localStorageMock.getItem('luci_bestiary_progress')).toBeNull();
      expect(getAllCharacters()).toHaveLength(0);
    });
  });
});
