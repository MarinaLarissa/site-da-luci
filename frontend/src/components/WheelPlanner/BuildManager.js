/**
 * Build Manager Component
 * Manages saved builds (load, delete, duplicate)
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardTitle,
  BuildList,
  BuildItem,
  BuildInfo,
  BuildName,
  BuildMeta,
  BuildActions,
  IconButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  Badge,
} from './WheelPlanner.styles';

const BuildManager = ({
  builds,
  currentBuildId,
  storageStats,
  onLoadBuild,
  onDeleteBuild,
  onDuplicateBuild,
}) => {
  const { t } = useTranslation();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (buildId) => {
    if (deleteConfirm === buildId) {
      onDeleteBuild(buildId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(buildId);
      // Reset confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <CardTitle style={{ margin: 0 }}>
          💾 {t('wheelPlanner.builds.title') || 'Saved Builds'}
        </CardTitle>
        <Badge $variant={storageStats.remaining > 0 ? 'success' : 'danger'}>
          {storageStats.total}/{storageStats.limit}
        </Badge>
      </div>

      {builds.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>📦</EmptyStateIcon>
          <EmptyStateText>
            {t('wheelPlanner.builds.empty') || 'No saved builds yet. Save your first build to get started!'}
          </EmptyStateText>
        </EmptyState>
      ) : (
        <BuildList>
          {builds.map((build) => (
            <BuildItem
              key={build.id}
              $active={build.id === currentBuildId}
              onClick={() => onLoadBuild(build.id)}
            >
              <BuildInfo>
                <BuildName>{build.name}</BuildName>
                <BuildMeta>
                  {build.vocation} • {build.points.used}/{build.points.total} {t('wheelPlanner.points.pts') || 'pts'}
                </BuildMeta>
              </BuildInfo>
              <BuildActions onClick={(e) => e.stopPropagation()}>
                <IconButton
                  onClick={() => onDuplicateBuild(build.id)}
                  title={t('wheelPlanner.builds.duplicate') || 'Duplicate'}
                  disabled={storageStats.remaining === 0}
                >
                  📋
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(build.id)}
                  title={deleteConfirm === build.id ? (t('wheelPlanner.builds.confirmDelete') || 'Click again to confirm') : (t('wheelPlanner.builds.delete') || 'Delete')}
                  style={{
                    background: deleteConfirm === build.id ? '#ef4444' : 'transparent',
                    borderColor: deleteConfirm === build.id ? '#ef4444' : '#4b5563',
                    color: deleteConfirm === build.id ? '#fff' : '#9ca3af',
                  }}
                >
                  {deleteConfirm === build.id ? '⚠️' : '🗑️'}
                </IconButton>
              </BuildActions>
            </BuildItem>
          ))}
        </BuildList>
      )}
    </Card>
  );
};

export default BuildManager;
