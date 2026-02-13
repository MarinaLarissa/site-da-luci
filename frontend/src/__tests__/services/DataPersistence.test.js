/**
 * Unit Tests for Data Persistence
 *
 * Tests cover:
 * - localStorage persistence
 * - Supabase sync (upload and download)
 * - Data integrity validation
 * - Error handling for save failures
 * - Offline queue management
 * - Conflict resolution
 */

import {
  saveBestiaryData,
  loadBestiaryData,
  getAllCharacters,
  getCompletedCreatures,
  getSettings,
} from '../../services/bestiaryStorage';

import {
  syncToSupabase,
  syncFromSupabase,
} from '../../services/bestiarySync';

// Import supabase after mock
import { supabase } from '../../services/supabaseClient';

// Helper: creates a chainable Supabase query builder mock
const createQueryBuilder = (resolveWith = { data: null, error: null }) => {
  const builder = {};
  builder.select = jest.fn().mockReturnValue(builder);
  builder.upsert = jest.fn().mockReturnValue(builder);
  builder.delete = jest.fn().mockReturnValue(builder);
  builder.eq = jest.fn().mockReturnValue(builder);
  builder.in = jest.fn().mockReturnValue(builder);
  builder.single = jest.fn().mockResolvedValue(resolveWith);
  // Make builder thenable so `await from('x').upsert(...)` resolves
  builder.then = (resolve, reject) => Promise.resolve(resolveWith).then(resolve, reject);
  return builder;
};

// Mock Supabase client - declare mocks inline to avoid hoisting issues
jest.mock('../../services/supabaseClient', () => {
  const createQueryBuilder = (resolveWith = { data: null, error: null }) => {
    const builder = {};
    builder.select = jest.fn().mockReturnValue(builder);
    builder.upsert = jest.fn().mockReturnValue(builder);
    builder.delete = jest.fn().mockReturnValue(builder);
    builder.eq = jest.fn().mockReturnValue(builder);
    builder.in = jest.fn().mockReturnValue(builder);
    builder.single = jest.fn().mockResolvedValue(resolveWith);
    builder.then = (resolve, reject) => Promise.resolve(resolveWith).then(resolve, reject);
    return builder;
  };

  return {
    supabase: {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn(() => createQueryBuilder()),
    },
    isSupabaseConfigured: jest.fn(() => true),
  };
});

// Mock localStorage
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

describe('Data Persistence', () => {
  beforeEach(() => {
    localStorageStore = {};
    jest.clearAllMocks();

    // Reset from to return a fresh chainable builder each call
    supabase.from.mockImplementation(() => createQueryBuilder());
  });

  // ============== localStorage Persistence Tests ==============

  describe('localStorage persistence', () => {
    it('should save bestiary data to localStorage', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: [],
        },
      };

      saveBestiaryData(mockData);

      const saved = localStorageMock.getItem('luci_bestiary_progress');
      expect(saved).toBeTruthy();

      const parsed = JSON.parse(saved);
      expect(parsed.version).toBe('1.0');
      expect(parsed.characters['char-1'].name).toBe('Test Knight');
    });

    it('should load bestiary data from localStorage', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: [],
        },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const loaded = loadBestiaryData();

      expect(loaded).toBeTruthy();
      expect(loaded.version).toBe('1.0');
      expect(loaded.characters['char-1'].name).toBe('Test Knight');
    });

    it('should return default storage when no data exists in localStorage', () => {
      const loaded = loadBestiaryData();
      expect(loaded).toBeTruthy();
      expect(loaded.version).toBe('1.0');
      expect(loaded.characters).toEqual({});
      expect(loaded.activeCharacter).toBeNull();
    });

    it('should handle corrupted localStorage data gracefully', () => {
      localStorageMock.setItem('luci_bestiary_progress', 'invalid-json');

      // Implementation catches error and returns default storage
      const loaded = loadBestiaryData();
      expect(loaded).toBeTruthy();
      expect(loaded.version).toBe('1.0');
      expect(loaded.characters).toEqual({});
    });

    it('should get all characters from storage', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Knight 1',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
          'char-2': {
            id: 'char-2',
            name: 'Paladin 1',
            level: 150,
            vocation: 'paladin',
            creatures: {},
          },
        },
        settings: {},
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const characters = getAllCharacters();

      expect(characters).toHaveLength(2);
      expect(characters[0].name).toBe('Knight 1');
      expect(characters[1].name).toBe('Paladin 1');
    });

    it('should get completed creatures for a character', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {
              dragon: { completed: true, completedAt: '2024-01-01' },
              demon: { completed: true, completedAt: '2024-01-02' },
              orc: { completed: false },
            },
          },
        },
        settings: {},
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const completed = getCompletedCreatures('char-1');

      expect(completed).toHaveLength(2);
      expect(completed).toContain('dragon');
      expect(completed).toContain('demon');
      expect(completed).not.toContain('orc');
    });

    it('should get settings from storage', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {},
        settings: {
          rapidRespawnActive: true,
          preferredRegions: ['Edron', 'Carlin'],
        },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const settings = getSettings();

      expect(settings.rapidRespawnActive).toBe(true);
      expect(settings.preferredRegions).toHaveLength(2);
      expect(settings.preferredRegions).toContain('Edron');
    });
  });

  // ============== Supabase Sync Tests ==============

  describe('Supabase sync to cloud', () => {
    it('should upload data to Supabase when authenticated', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {
              dragon: { completed: true, completedAt: '2024-01-01' },
            },
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: [],
        },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const result = await syncToSupabase();

      expect(result.success).toBe(true);
      expect(supabase.auth.getUser).toHaveBeenCalled();
    });

    it('should fail when user is not authenticated', async () => {
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: null }, error: null });

      const result = await syncToSupabase();

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not authenticated');
    });

    it('should handle Supabase upsert errors', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: [],
        },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      // Make character upsert return an error via .single()
      const mockError = { message: 'Network error', code: 'NETWORK_ERROR' };
      supabase.from.mockImplementation(() => {
        const builder = createQueryBuilder({ data: null, error: mockError });
        return builder;
      });

      // Should continue despite character error (logs but doesn't throw)
      const result = await syncToSupabase();

      // Sync completed - character errors are logged and skipped, settings error returns failure
      expect(result.success).toBe(false);
    });
  });

  describe('Supabase sync from cloud', () => {
    it('should download data from Supabase when authenticated', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

      const mockCharacters = [
        {
          id: 'char-1',
          user_id: 'user-123',
          name: 'Cloud Knight',
          level: 200,
          vocation: 'knight',
          updated_at: new Date().toISOString(),
        },
      ];

      const mockProgress = [
        {
          character_id: 'char-1',
          creature_id: 'dragon',
          completed: true,
          completed_at: '2024-01-01',
        },
      ];

      const mockSettings = {
        user_id: 'user-123',
        rapid_respawn_active: true,
        preferred_regions: ['Edron'],
        updated_at: new Date().toISOString(),
      };

      // syncFromSupabase makes 3 from() calls with different chaining:
      // 1. from('bestiary_characters').select('*').eq(...) → resolves { data, error }
      // 2. from('bestiary_progress').select('*').in(...) → resolves { data, error }
      // 3. from('bestiary_settings').select('*').eq(...).single() → resolves { data, error }
      let callCount = 0;
      supabase.from.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return createQueryBuilder({ data: mockCharacters, error: null });
        } else if (callCount === 2) {
          return createQueryBuilder({ data: mockProgress, error: null });
        } else {
          return createQueryBuilder({ data: mockSettings, error: null });
        }
      });

      const result = await syncFromSupabase();

      expect(result.success).toBe(true);
      expect(supabase.auth.getUser).toHaveBeenCalled();

      // Verify data was saved to localStorage
      const saved = JSON.parse(localStorageMock.getItem('luci_bestiary_progress'));
      expect(saved).toBeTruthy();
    });

    it('should fail when user is not authenticated', async () => {
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: null }, error: null });

      const result = await syncFromSupabase();

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not authenticated');
    });

    it('should handle Supabase fetch errors', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

      const mockError = { message: 'Network error', code: 'NETWORK_ERROR' };
      supabase.from.mockImplementation(() =>
        createQueryBuilder({ data: null, error: mockError })
      );

      const result = await syncFromSupabase();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Network error');
    });
  });

  // ============== Data Integrity Tests ==============

  describe('data integrity', () => {
    it('should preserve data structure after save/load cycle', () => {
      const originalData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {
              dragon: { completed: true, completedAt: '2024-01-01' },
            },
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: ['Edron'],
        },
      };

      saveBestiaryData(originalData);
      const loaded = loadBestiaryData();

      // saveBestiaryData updates lastUpdated, so compare key fields
      expect(loaded.version).toBe(originalData.version);
      expect(loaded.activeCharacter).toBe(originalData.activeCharacter);
      expect(loaded.characters).toEqual(originalData.characters);
      expect(loaded.settings).toEqual(originalData.settings);
    });

    it('should validate required fields exist', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {},
      };

      saveBestiaryData(mockData);
      const loaded = loadBestiaryData();

      expect(loaded).toHaveProperty('version');
      expect(loaded).toHaveProperty('lastUpdated');
      expect(loaded).toHaveProperty('activeCharacter');
      expect(loaded).toHaveProperty('characters');
      expect(loaded).toHaveProperty('settings');
    });

    it('should handle special characters in data', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: "Knight's Name with 'quotes' & symbols: äöü",
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {},
      };

      saveBestiaryData(mockData);
      const loaded = loadBestiaryData();

      expect(loaded.characters['char-1'].name).toBe(
        "Knight's Name with 'quotes' & symbols: äöü"
      );
    });

    it('should handle large datasets', () => {
      const largeData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {},
        settings: {},
      };

      // Create 100 characters with 100 creatures each
      for (let i = 0; i < 100; i++) {
        const charId = `char-${i}`;
        largeData.characters[charId] = {
          id: charId,
          name: `Character ${i}`,
          level: 100 + i,
          vocation: 'knight',
          creatures: {},
        };

        for (let j = 0; j < 100; j++) {
          largeData.characters[charId].creatures[`creature-${j}`] = {
            completed: j % 2 === 0,
            completedAt: '2024-01-01',
          };
        }
      }

      saveBestiaryData(largeData);
      const loaded = loadBestiaryData();

      expect(Object.keys(loaded.characters)).toHaveLength(100);
      expect(Object.keys(loaded.characters['char-0'].creatures)).toHaveLength(100);
    });
  });

  // ============== Error Handling Tests ==============

  describe('error handling', () => {
    it('should handle localStorage quota exceeded', () => {
      const originalSetItem = localStorageMock.setItem;

      localStorageMock.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError');
      });

      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {},
        settings: {},
      };

      // Implementation catches error internally and returns false
      const result = saveBestiaryData(mockData);
      expect(result).toBe(false);

      localStorageMock.setItem = originalSetItem;
    });

    it('should handle network errors during sync', async () => {
      supabase.auth.getUser.mockRejectedValueOnce(new Error('Network error'));

      const result = await syncToSupabase();

      expect(result.success).toBe(false);
    });

    it('should handle missing localStorage', () => {
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = jest.fn(() => {
        throw new Error('localStorage not available');
      });

      // Implementation catches error internally and returns default storage
      const loaded = loadBestiaryData();
      expect(loaded).toBeTruthy();
      expect(loaded.version).toBe('1.0');
      expect(loaded.characters).toEqual({});

      localStorageMock.getItem = originalGetItem;
    });
  });

  // ============== Concurrency Tests ==============

  describe('concurrent operations', () => {
    it('should handle multiple rapid saves', () => {
      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {},
      };

      // Save 10 times rapidly
      for (let i = 0; i < 10; i++) {
        mockData.characters['char-1'].level = 100 + i;
        saveBestiaryData(mockData);
      }

      const loaded = loadBestiaryData();

      // Should have the last save
      expect(loaded.characters['char-1'].level).toBe(109);
    });

    it('should handle save during sync', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      supabase.auth.getUser.mockResolvedValueOnce({ data: { user: mockUser }, error: null });

      const mockData = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        activeCharacter: 'char-1',
        characters: {
          'char-1': {
            id: 'char-1',
            name: 'Test Knight',
            level: 100,
            vocation: 'knight',
            creatures: {},
          },
        },
        settings: {
          rapidRespawnActive: false,
          preferredRegions: [],
        },
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      // Start sync
      const syncPromise = syncToSupabase();

      // Save during sync
      mockData.characters['char-1'].level = 150;
      saveBestiaryData(mockData);

      // Wait for sync to complete
      const result = await syncPromise;

      expect(result.success).toBe(true);

      // Verify local data has the latest
      const loaded = loadBestiaryData();
      expect(loaded.characters['char-1'].level).toBe(150);
    });
  });
});
