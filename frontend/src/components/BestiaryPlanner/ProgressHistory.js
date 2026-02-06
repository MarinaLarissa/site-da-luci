import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProgressChart from './ProgressChart';
import ProgressTimeline from './ProgressTimeline';
import ProgressStatistics from './ProgressStatistics';
import ProgressExport from './ProgressExport';
import {
  HistoryModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  TabsContainer,
  TabsList,
  Tab,
  TabContent,
} from './ProgressHistory.styles';

/**
 * ProgressHistory Component
 * Main orchestrator with tabs (Charts, Timeline, Statistics, Export)
 * Feature 4: Progress History
 */
const ProgressHistory = ({ isOpen, onClose, characterId }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('charts');

  // Reset to charts tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('charts');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <HistoryModal>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('bestiaryPlanner.progressHistory.title')}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close">
            ✕
          </CloseButton>
        </ModalHeader>

        <TabsContainer>
          <TabsList>
            <Tab active={activeTab === 'charts'} onClick={() => setActiveTab('charts')}>
              📊 {t('bestiaryPlanner.progressHistory.tabs.charts')}
            </Tab>
            <Tab active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>
              📅 {t('bestiaryPlanner.progressHistory.tabs.timeline')}
            </Tab>
            <Tab active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')}>
              📈 {t('bestiaryPlanner.progressHistory.tabs.statistics')}
            </Tab>
            <Tab active={activeTab === 'export'} onClick={() => setActiveTab('export')}>
              📥 {t('bestiaryPlanner.progressHistory.tabs.export')}
            </Tab>
          </TabsList>

          <TabContent>
            {activeTab === 'charts' && <ProgressChart characterId={characterId} />}
            {activeTab === 'timeline' && <ProgressTimeline characterId={characterId} />}
            {activeTab === 'statistics' && <ProgressStatistics characterId={characterId} />}
            {activeTab === 'export' && <ProgressExport characterId={characterId} />}
          </TabContent>
        </TabsContainer>
      </ModalContent>
    </HistoryModal>
  );
};

export default ProgressHistory;
