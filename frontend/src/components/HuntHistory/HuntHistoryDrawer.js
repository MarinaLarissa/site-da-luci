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
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  DrawerTitle,
  CloseButton,
  DrawerContent,
  HuntCountInfo,
  CountText,
  LimitWarning,
  HuntListSection,
  ListSectionTitle,
  HuntList,
  EmptyState,
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
      {isOpen && <DrawerOverlay onClick={onClose} />}

      {/* Drawer */}
      <DrawerContainer $isOpen={isOpen}>
        <DrawerHeader>
          <DrawerTitle>
            📜 {t('huntHistory.title')}
          </DrawerTitle>
          <CloseButton
            onClick={onClose}
            aria-label={t('huntHistory.closeButton')}
          >
            ✕
          </CloseButton>
        </DrawerHeader>

        <DrawerContent>
          {/* Hunt count info */}
          <HuntCountInfo>
            <CountText>
              {t('huntHistory.huntCount', { count: hunts.length, max: 62 })}
            </CountText>
            {hunts.length >= 62 && (
              <LimitWarning>
                ⚠️ {t('huntHistory.limitWarning')}
              </LimitWarning>
            )}
          </HuntCountInfo>

          {/* Controls */}
          <HuntHistoryControls
            exportOptions={exportOptions}
            onUpdateExportOptions={onUpdateExportOptions}
            onExport={onExport}
            onClearHistory={onClearHistory}
            totalHunts={hunts.length}
          />

          {/* Hunt list */}
          <HuntListSection>
            <ListSectionTitle>{t('huntHistory.listTitle')}</ListSectionTitle>
            {hunts.length === 0 ? (
              <EmptyState>
                <p>{t('huntHistory.emptyState')}</p>
              </EmptyState>
            ) : (
              <HuntList>
                {hunts.map(hunt => (
                  <HuntHistoryItem
                    key={hunt.id}
                    hunt={hunt}
                    onDelete={onDeleteHunt}
                  />
                ))}
              </HuntList>
            )}
          </HuntListSection>
        </DrawerContent>
      </DrawerContainer>
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
