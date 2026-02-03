/**
 * useBestiarySync Hook
 * Manages sync status and provides sync functions to components
 *
 * Features:
 * - Auto-sync on auth state change
 * - Manual sync trigger
 * - Sync status tracking
 * - Offline queue management
 */

import { useState, useEffect, useCallback } from 'react';
import {
  SYNC_STATUS,
  bidirectionalSync,
  syncToSupabase,
  syncFromSupabase,
  setupAutoSync,
  processOfflineQueue,
  getOfflineQueueSize,
} from '../services/bestiarySync';
import { supabase } from '../services/supabaseClient';

export const useBestiarySync = () => {
  const [syncStatus, setSyncStatus] = useState(SYNC_STATUS.IDLE);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [offlineQueueSize, setOfflineQueueSize] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Update offline queue size
  const updateQueueSize = useCallback(() => {
    const size = getOfflineQueueSize();
    setOfflineQueueSize(size);
  }, []);

  // Manual sync trigger
  const manualSync = useCallback(async () => {
    if (!isOnline) {
      setSyncStatus(SYNC_STATUS.OFFLINE);
      return { success: false, error: 'Offline' };
    }

    setSyncStatus(SYNC_STATUS.SYNCING);

    try {
      // Process offline queue first
      if (offlineQueueSize > 0) {
        await processOfflineQueue();
        updateQueueSize();
      }

      // Perform bidirectional sync
      const result = await bidirectionalSync();

      if (result.success) {
        setSyncStatus(SYNC_STATUS.SYNCED);
        setLastSyncTime(new Date());
      } else {
        setSyncStatus(SYNC_STATUS.ERROR);
      }

      return result;
    } catch (error) {
      setSyncStatus(SYNC_STATUS.ERROR);
      return { success: false, error: error.message };
    }
  }, [isOnline, offlineQueueSize, updateQueueSize]);

  // Upload only (useful for saving changes)
  const uploadOnly = useCallback(async () => {
    if (!isOnline) {
      setSyncStatus(SYNC_STATUS.OFFLINE);
      return { success: false, error: 'Offline' };
    }

    setSyncStatus(SYNC_STATUS.SYNCING);

    try {
      const result = await syncToSupabase();

      if (result.success) {
        setSyncStatus(SYNC_STATUS.SYNCED);
        setLastSyncTime(new Date());
      } else {
        setSyncStatus(SYNC_STATUS.ERROR);
      }

      return result;
    } catch (error) {
      setSyncStatus(SYNC_STATUS.ERROR);
      return { success: false, error: error.message };
    }
  }, [isOnline]);

  // Download only (useful for refreshing data)
  const downloadOnly = useCallback(async (mergeStrategy = true) => {
    if (!isOnline) {
      setSyncStatus(SYNC_STATUS.OFFLINE);
      return { success: false, error: 'Offline' };
    }

    setSyncStatus(SYNC_STATUS.SYNCING);

    try {
      const result = await syncFromSupabase(mergeStrategy);

      if (result.success) {
        setSyncStatus(SYNC_STATUS.SYNCED);
        setLastSyncTime(new Date());
      } else {
        setSyncStatus(SYNC_STATUS.ERROR);
      }

      return result;
    } catch (error) {
      setSyncStatus(SYNC_STATUS.ERROR);
      return { success: false, error: error.message };
    }
  }, [isOnline]);

  // Setup effects
  useEffect(() => {
    // Setup auto-sync on auth state change
    const authListener = setupAutoSync((status) => {
      setSyncStatus(status);
      if (status === SYNC_STATUS.SYNCED) {
        setLastSyncTime(new Date());
      }
    });

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus(SYNC_STATUS.IDLE);

      // Auto-sync when coming back online
      manualSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus(SYNC_STATUS.OFFLINE);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial queue size
    updateQueueSize();

    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Perform initial sync
        manualSync();
      }
    });

    // Cleanup
    return () => {
      authListener?.subscription?.unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Status
    syncStatus,
    lastSyncTime,
    offlineQueueSize,
    isOnline,

    // Actions
    manualSync,
    uploadOnly,
    downloadOnly,
    updateQueueSize,

    // Helpers
    isSyncing: syncStatus === SYNC_STATUS.SYNCING,
    isSynced: syncStatus === SYNC_STATUS.SYNCED,
    hasError: syncStatus === SYNC_STATUS.ERROR,
    isOffline: !isOnline || syncStatus === SYNC_STATUS.OFFLINE,
  };
};
