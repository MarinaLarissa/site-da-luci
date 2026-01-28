/**
 * Hunt History Drawer component
 * Sidebar/drawer containing hunt history list and controls
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import HuntHistoryItem from './HuntHistoryItem';
import HuntHistoryControls from './HuntHistoryControls';
import {
  HuntHistoryDrawerOverlay,
  HuntHistoryDrawerContainer,
  HuntHistoryDrawerHeader,
  HuntHistoryDrawerTitle,
  HuntHistoryDrawerCloseButton,
  HuntHistoryDrawerContent,
  HuntHistoryDrawerHuntCountInfo,
  HuntHistoryDrawerCountText,
  HuntHistoryDrawerLimitWarning,
  HuntHistoryDrawerHuntListSection,
  HuntHistoryDrawerListSectionTitle,
  HuntHistoryDrawerHuntList,
  HuntHistoryDrawerEmptyState,
} from './HuntHistoryDrawer.styles';

export default function HuntHistoryDrawer({
  isOpen,
  onClose,
  hunts,
  exportOptions,
  onUpdateExportOptions,
  onExport,
  onDeleteHunt,
  onClearHistory
}) {
  const { t } = useTranslation();

  return (
    <>
      {/* Overlay */}
      {isOpen && <HuntHistoryDrawerOverlay onClick={onClose} data-cy="hunt-history-drawer-overlay" />}

      {/* Drawer */}
      <HuntHistoryDrawerContainer $isOpen={isOpen} data-cy="hunt-history-drawer">
        <HuntHistoryDrawerHeader>
          <HuntHistoryDrawerTitle>
            📜 {t('huntHistory.title')}
          </HuntHistoryDrawerTitle>
          <HuntHistoryDrawerCloseButton
            onClick={onClose}
            aria-label={t('huntHistory.closeButton')}
            data-cy="hunt-history-drawer-close-button"
          >
            ✕
          </HuntHistoryDrawerCloseButton>
        </HuntHistoryDrawerHeader>

        <HuntHistoryDrawerContent>
          {/* Hunt count info */}
          <HuntHistoryDrawerHuntCountInfo>
            <HuntHistoryDrawerCountText>
              {t('huntHistory.huntCount', { count: hunts.length, max: 62 })}
            </HuntHistoryDrawerCountText>
            {hunts.length >= 62 && (
              <HuntHistoryDrawerLimitWarning>
                ⚠️ {t('huntHistory.limitWarning')}
              </HuntHistoryDrawerLimitWarning>
            )}
          </HuntHistoryDrawerHuntCountInfo>

          {/* Controls */}
          <HuntHistoryControls
            exportOptions={exportOptions}
            onUpdateExportOptions={onUpdateExportOptions}
            onExport={onExport}
            onClearHistory={onClearHistory}
            totalHunts={hunts.length}
          />

          {/* Hunt list */}
          <HuntHistoryDrawerHuntListSection>
            <HuntHistoryDrawerListSectionTitle>{t('huntHistory.listTitle')}</HuntHistoryDrawerListSectionTitle>
            {hunts.length === 0 ? (
              <HuntHistoryDrawerEmptyState>
                <p>{t('huntHistory.emptyState')}</p>
              </HuntHistoryDrawerEmptyState>
            ) : (
              <HuntHistoryDrawerHuntList>
                {hunts.map(hunt => (
                  <HuntHistoryItem
                    key={hunt.id}
                    hunt={hunt}
                    onDelete={onDeleteHunt}
                  />
                ))}
              </HuntHistoryDrawerHuntList>
            )}
          </HuntHistoryDrawerHuntListSection>
        </HuntHistoryDrawerContent>
      </HuntHistoryDrawerContainer>
    </>
  );
}

HuntHistoryDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hunts: PropTypes.array.isRequired,
  exportOptions: PropTypes.object.isRequired,
  onUpdateExportOptions: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onDeleteHunt: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};
