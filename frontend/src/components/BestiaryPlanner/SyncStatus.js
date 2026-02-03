/**
 * SyncStatus Component
 * Displays sync status, offline queue, and manual sync button
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useBestiarySync } from '../../hooks/useBestiarySync';
import { SYNC_STATUS } from '../../services/bestiarySync';
import {
  SyncContainer,
  SyncBadge,
  SyncIcon,
  SyncLabel,
  SyncButton,
  SyncDetails,
  SyncTime,
  OfflineQueue,
  Tooltip,
} from './SyncStatus.styles';

const SyncStatus = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    syncStatus,
    lastSyncTime,
    offlineQueueSize,
    isOnline,
    manualSync,
    isSyncing,
  } = useBestiarySync();

  // Don't show sync status if user is not authenticated
  if (!user) {
    return null;
  }

  // Get icon and color based on status
  const getStatusDisplay = () => {
    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return { icon: '🔄', color: 'blue', label: t('bestiaryPlanner.sync.syncing') };
      case SYNC_STATUS.SYNCED:
        return { icon: '✓', color: 'green', label: t('bestiaryPlanner.sync.synced') };
      case SYNC_STATUS.OFFLINE:
        return { icon: '📡', color: 'gray', label: t('bestiaryPlanner.sync.offline') };
      case SYNC_STATUS.ERROR:
        return { icon: '⚠', color: 'red', label: t('bestiaryPlanner.sync.error') };
      default:
        return { icon: '○', color: 'gray', label: t('bestiaryPlanner.sync.idle') };
    }
  };

  const statusDisplay = getStatusDisplay();

  // Format last sync time
  const formatSyncTime = () => {
    if (!lastSyncTime) return t('bestiaryPlanner.sync.neverSynced');

    const now = new Date();
    const syncDate = new Date(lastSyncTime);
    const diffMs = now - syncDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return t('bestiaryPlanner.sync.justNow');
    if (diffMins < 60) return t('bestiaryPlanner.sync.minsAgo', { count: diffMins });

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t('bestiaryPlanner.sync.hoursAgo', { count: diffHours });

    const diffDays = Math.floor(diffHours / 24);
    return t('bestiaryPlanner.sync.daysAgo', { count: diffDays });
  };

  const handleManualSync = async () => {
    if (!isSyncing && isOnline) {
      await manualSync();
    }
  };

  return (
    <SyncContainer>
      <SyncBadge $status={statusDisplay.color}>
        <SyncIcon $spinning={isSyncing}>{statusDisplay.icon}</SyncIcon>
        <SyncLabel>{statusDisplay.label}</SyncLabel>
      </SyncBadge>

      <SyncDetails>
        <SyncTime>{formatSyncTime()}</SyncTime>
        {offlineQueueSize > 0 && (
          <OfflineQueue>
            <Tooltip>
              {t('bestiaryPlanner.sync.queuePending', { count: offlineQueueSize })}
            </Tooltip>
            📤 {offlineQueueSize}
          </OfflineQueue>
        )}
      </SyncDetails>

      <SyncButton
        onClick={handleManualSync}
        disabled={isSyncing || !isOnline}
        $isOnline={isOnline}
        title={isOnline ? t('bestiaryPlanner.sync.manualSync') : t('bestiaryPlanner.sync.offline')}
      >
        {isSyncing ? '⏳' : '🔄'}
      </SyncButton>
    </SyncContainer>
  );
};

export default memo(SyncStatus);
