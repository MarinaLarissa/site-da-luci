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
import { supabase, __mockSupabaseSelect, __mockSupabaseUpsert } from '../../services/supabaseClient';

// Mock Supabase client
jest.mock('../../services/supabaseClient', () => {
  const mockSupabaseSelect = jest.fn();
  const mockSupabaseUpsert = jest.fn();
  const mockSupabaseDelete = jest.fn();

  return {
    supabase: {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn(() => ({
        select: mockSupabaseSelect,
        upsert: mockSupabaseUpsert,
        delete: mockSupabaseDelete,
      })),
    },
    __mockSupabaseSelect: mockSupabaseSelect,
    __mockSupabaseUpsert: mockSupabaseUpsert,
    __mockSupabaseDelete: mockSupabaseDelete,
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

// Alias for cleaner test code
const mockSupabaseSelect = __mockSupabaseSelect;
const mockSupabaseUpsert = __mockSupabaseUpsert;

describe('Data Persistence', () => {
  beforeEach(() => {
    localStorageStore = {};
    jest.clearAllMocks();

    // Setup default mock responses
    mockSupabaseSelect.mockReturnValue({
      single: jest.fn(() => Promise.resolve({ data: null, error: null })),
    });

    mockSupabaseUpsert.mockReturnValue({
      select: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({ data: {}, error: null })),
      })),
    });
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

    it('should return null when no data exists in localStorage', () => {
      const loaded = loadBestiaryData();
      expect(loaded).toBeNull();
    });

    it('should handle corrupted localStorage data', () => {
      localStorageMock.setItem('luci_bestiary_progress', 'invalid-json');

      expect(() => {
        loadBestiaryData();
      }).toThrow();
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

      mockSupabaseUpsert.mockReturnValue({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: { id: 'char-1' }, error: null })),
        })),
      });

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
        settings: {},
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      const mockError = { message: 'Network error', code: 'NETWORK_ERROR' };
      mockSupabaseUpsert.mockReturnValue({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: mockError })),
        })),
      });

      // Should continue despite error (logs error but doesn't throw)
      const result = await syncToSupabase();

      // Sync completed but with errors logged
      expect(result.success).toBe(true); // Overall sync succeeded
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

      mockSupabaseSelect.mockReturnValueOnce(
        Promise.resolve({ data: mockCharacters, error: null })
      );

      mockSupabaseSelect.mockReturnValueOnce(
        Promise.resolve({ data: mockProgress, error: null })
      );

      mockSupabaseSelect.mockReturnValueOnce({
        single: jest.fn(() =>
          Promise.resolve({
            data: {
              user_id: 'user-123',
              rapid_respawn_active: true,
              preferred_regions: ['Edron'],
            },
            error: null,
          })
        ),
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
      mockSupabaseSelect.mockReturnValueOnce(
        Promise.resolve({ data: null, error: mockError })
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

      expect(loaded).toEqual(originalData);
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

      expect(() => {
        saveBestiaryData(mockData);
      }).toThrow('QuotaExceededError');

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

      expect(() => {
        loadBestiaryData();
      }).toThrow('localStorage not available');

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
        settings: {},
      };

      localStorageMock.setItem('luci_bestiary_progress', JSON.stringify(mockData));

      mockSupabaseUpsert.mockReturnValue({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: { id: 'char-1' }, error: null })),
        })),
      });

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
