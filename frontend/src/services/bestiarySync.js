/**
 * Bestiary Sync Service
 * Handles bidirectional sync between localStorage and Supabase
 *
 * Features:
 * - Auto-sync on auth state change
 * - Conflict resolution (last-write-wins + merge)
 * - Offline queue
 * - Status tracking
 */

import { supabase } from './supabaseClient';
import {
  loadBestiaryData,
  saveBestiaryData,
  getAllCharacters,
  getCompletedCreatures,
  getSettings,
} from './bestiaryStorage';

// Sync status enum
export const SYNC_STATUS = {
  IDLE: 'idle',
  SYNCING: 'syncing',
  SYNCED: 'synced',
  OFFLINE: 'offline',
  ERROR: 'error',
  CONFLICT: 'conflict',
};

// Offline queue key
const OFFLINE_QUEUE_KEY = 'bestiary_offline_queue';

/**
 * Sync from localStorage to Supabase (Upload)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const syncToSupabase = async () => {
  try {
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const characters = getAllCharacters();

    // Sync each character
    for (const character of characters) {
      // Upsert character
      const { error: charError } = await supabase
        .from('bestiary_characters')
        .upsert(
          {
            id: character.id,
            user_id: user.id,
            name: character.name,
            level: character.level,
            vocation: character.vocation,
            updated_at: character.updatedAt || new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (charError) {
        console.error('Error syncing character:', charError);
        continue;
      }

      // Sync progress for this character
      const completedCreatures = getCompletedCreatures(character.id);

      if (completedCreatures.length > 0) {
        const progressRecords = completedCreatures.map((creatureId) => ({
          character_id: character.id,
          creature_id: creatureId,
          completed: true,
          completed_at: character.creatures?.[creatureId]?.completedAt || new Date().toISOString(),
        }));

        const { error: progressError } = await supabase
          .from('bestiary_progress')
          .upsert(progressRecords, { onConflict: 'character_id,creature_id' });

        if (progressError) {
          console.error('Error syncing progress:', progressError);
        }
      }
    }

    // Sync settings
    const settings = getSettings();
    const { error: settingsError } = await supabase
      .from('bestiary_settings')
      .upsert(
        {
          user_id: user.id,
          rapid_respawn_active: settings.rapidRespawnActive,
          preferred_regions: settings.preferredRegions,
        },
        { onConflict: 'user_id' }
      );

    if (settingsError) {
      console.error('Error syncing settings:', settingsError);
      return { success: false, error: settingsError.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Sync to Supabase failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sync from Supabase to localStorage (Download)
 * @param {boolean} mergeStrategy - If true, merge; if false, replace
 * @returns {Promise<{success: boolean, conflicts?: array, error?: string}>}
 */
export const syncFromSupabase = async (mergeStrategy = true) => {
  try {
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const localData = loadBestiaryData();
    const conflicts = [];

    // Fetch characters from Supabase
    const { data: remoteCharacters, error: charError } = await supabase
      .from('bestiary_characters')
      .select('*')
      .eq('user_id', user.id);

    if (charError) {
      return { success: false, error: charError.message };
    }

    // Fetch all progress
    const characterIds = remoteCharacters.map((c) => c.id);
    const { data: remoteProgress, error: progressError } = await supabase
      .from('bestiary_progress')
      .select('*')
      .in('character_id', characterIds);

    if (progressError) {
      return { success: false, error: progressError.message };
    }

    // Fetch settings
    const { data: remoteSettings, error: settingsError } = await supabase
      .from('bestiary_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (settingsError && settingsError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (OK for first sync)
      return { success: false, error: settingsError.message };
    }

    // Build merged data
    const mergedData = { ...localData };

    if (mergeStrategy) {
      // MERGE STRATEGY: Combine local + remote (union)

      // Merge characters
      remoteCharacters.forEach((remoteChar) => {
        const localChar = localData.characters[remoteChar.id];

        if (!localChar) {
          // New character from remote - add it
          mergedData.characters[remoteChar.id] = {
            id: remoteChar.id,
            name: remoteChar.name,
            level: remoteChar.level,
            vocation: remoteChar.vocation,
            createdAt: remoteChar.created_at,
            updatedAt: remoteChar.updated_at,
            creatures: {},
          };
        } else {
          // Character exists locally - check for conflicts
          const remoteUpdated = new Date(remoteChar.updated_at);
          const localUpdated = new Date(localChar.updatedAt || localChar.createdAt);

          if (remoteUpdated > localUpdated) {
            // Remote is newer - use remote data
            mergedData.characters[remoteChar.id] = {
              ...localChar,
              name: remoteChar.name,
              level: remoteChar.level,
              vocation: remoteChar.vocation,
              updatedAt: remoteChar.updated_at,
            };
          }
          // else: Local is newer - keep local data
        }
      });

      // Merge progress (union of completed creatures)
      remoteProgress.forEach((progressItem) => {
        const charId = progressItem.character_id;
        if (mergedData.characters[charId]) {
          if (!mergedData.characters[charId].creatures) {
            mergedData.characters[charId].creatures = {};
          }

          mergedData.characters[charId].creatures[progressItem.creature_id] = {
            completed: progressItem.completed,
            completedAt: progressItem.completed_at,
          };
        }
      });

      // Merge settings (last-write-wins)
      if (remoteSettings) {
        const remoteUpdated = new Date(remoteSettings.updated_at);
        const localUpdated = new Date(localData.lastUpdated || 0);

        if (remoteUpdated > localUpdated) {
          mergedData.settings = {
            rapidRespawnActive: remoteSettings.rapid_respawn_active,
            preferredRegions: remoteSettings.preferred_regions,
          };
        }
      }
    } else {
      // REPLACE STRATEGY: Remote overwrites local
      mergedData.characters = {};

      remoteCharacters.forEach((remoteChar) => {
        mergedData.characters[remoteChar.id] = {
          id: remoteChar.id,
          name: remoteChar.name,
          level: remoteChar.level,
          vocation: remoteChar.vocation,
          createdAt: remoteChar.created_at,
          updatedAt: remoteChar.updated_at,
          creatures: {},
        };
      });

      remoteProgress.forEach((progressItem) => {
        const charId = progressItem.character_id;
        if (mergedData.characters[charId]) {
          mergedData.characters[charId].creatures[progressItem.creature_id] = {
            completed: progressItem.completed,
            completedAt: progressItem.completed_at,
          };
        }
      });

      if (remoteSettings) {
        mergedData.settings = {
          rapidRespawnActive: remoteSettings.rapid_respawn_active,
          preferredRegions: remoteSettings.preferred_regions,
        };
      }
    }

    // Save merged data to localStorage
    saveBestiaryData(mergedData);

    return { success: true, conflicts };
  } catch (error) {
    console.error('Sync from Supabase failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Bidirectional sync (download then upload)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const bidirectionalSync = async () => {
  // First download from Supabase (merge with local)
  const downloadResult = await syncFromSupabase(true);
  if (!downloadResult.success) {
    return downloadResult;
  }

  // Then upload to Supabase (ensures remote has latest)
  const uploadResult = await syncToSupabase();
  return uploadResult;
};

/**
 * Setup auto-sync on auth state change
 * @param {Function} onStatusChange - Callback for status updates
 */
export const setupAutoSync = (onStatusChange) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      onStatusChange?.(SYNC_STATUS.SYNCING);

      const result = await bidirectionalSync();

      if (result.success) {
        onStatusChange?.(SYNC_STATUS.SYNCED);
      } else {
        onStatusChange?.(SYNC_STATUS.ERROR);
      }
    } else if (event === 'SIGNED_OUT') {
      onStatusChange?.(SYNC_STATUS.IDLE);
    }
  });

  return authListener;
};

// =====================================================
// OFFLINE QUEUE
// =====================================================

/**
 * Add operation to offline queue
 * @param {Object} operation - Operation to queue
 */
export const addToOfflineQueue = (operation) => {
  try {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    queue.push({
      ...operation,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Error adding to offline queue:', error);
  }
};

/**
 * Process offline queue (retry pending operations)
 * @returns {Promise<{success: boolean, processed: number, failed: number}>}
 */
export const processOfflineQueue = async () => {
  try {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    if (queue.length === 0) {
      return { success: true, processed: 0, failed: 0 };
    }

    let processed = 0;
    let failed = 0;
    const remainingQueue = [];

    for (const operation of queue) {
      try {
        // Retry the operation
        if (operation.type === 'character') {
          await supabase.from('bestiary_characters').upsert(operation.data);
          processed++;
        } else if (operation.type === 'progress') {
          await supabase.from('bestiary_progress').upsert(operation.data);
          processed++;
        } else if (operation.type === 'settings') {
          await supabase.from('bestiary_settings').upsert(operation.data);
          processed++;
        }
      } catch (error) {
        console.error('Failed to process queued operation:', error);
        failed++;
        remainingQueue.push(operation);
      }
    }

    // Save remaining queue
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(remainingQueue));

    return { success: true, processed, failed };
  } catch (error) {
    console.error('Error processing offline queue:', error);
    return { success: false, processed: 0, failed: 0, error: error.message };
  }
};

/**
 * Clear offline queue
 */
export const clearOfflineQueue = () => {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
};

/**
 * Get offline queue size
 * @returns {number}
 */
export const getOfflineQueueSize = () => {
  try {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    return queue.length;
  } catch (error) {
    return 0;
  }
};
