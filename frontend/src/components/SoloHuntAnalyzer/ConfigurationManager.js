/**
 * Configuration Manager Component
 * Allows users to save/load item configurations with custom names
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGPValue } from '../../utils/formatters';
import Button from '../common/Button';
import { ModalOverlay, ModalContent } from '../common/styled';
import {
  ConfigurationManagerContainer,
  ConfigHeader,
  ConfigDescription,
  ConfigControls,
  ConfigLoadSection,
  ConfigSelect,
  DangerButtonSmall,
  SecondaryButtonSmall,
  DangerButton,
  ConfigCount,
  ConfigPreview,
  PreviewLabel,
  PreviewList,
  FormGroup,
  ConfigNameInput,
  ModalActions,
} from './ConfigurationManager.styles';

const STORAGE_KEY = 'solo-hunt-configurations';

export default function ConfigurationManager({
  customItems,
  setCustomItems,
  goldTokenPrice,
  setGoldTokenPrice,
  silverTokenPrice,
  setSilverTokenPrice,
}) {
  const { t } = useTranslation();
  const [configurations, setConfigurations] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [configName, setConfigName] = useState('');
  const [selectedConfigId, setSelectedConfigId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingConfigId, setEditingConfigId] = useState(null);
  const [editingConfigName, setEditingConfigName] = useState('');

  // Load configurations from localStorage on mount
  useEffect(() => {
    loadConfigurations();
  }, []);

  /**
   * Load all saved configurations from localStorage
   */
  const loadConfigurations = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfigurations(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading configurations:', error);
      setConfigurations([]);
    }
  };

  /**
   * Save current configuration to localStorage
   */
  const handleSaveConfiguration = () => {
    if (!configName.trim()) {
      return;
    }

    const newConfig = {
      id: Date.now(),
      name: configName.trim(),
      items: customItems,
      goldTokenPrice,
      silverTokenPrice,
      createdAt: new Date().toISOString(),
    };

    const updatedConfigs = [...configurations, newConfig];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs));
      setConfigurations(updatedConfigs);
      setConfigName('');
      setShowSaveModal(false);
    } catch (error) {
      console.error('Error saving configuration:', error);

      if (error.name === 'QuotaExceededError') {
        alert(t('soloHuntAnalyzer.configManager.errors.quotaExceeded'));
      } else {
        alert(t('soloHuntAnalyzer.configManager.errors.saveFailed'));
      }
    }
  };

  /**
   * Load a saved configuration
   */
  const handleLoadConfiguration = (configId) => {
    const config = configurations.find(c => c.id === parseInt(configId, 10));
    if (!config) return;

    setCustomItems(config.items);
    setGoldTokenPrice(config.goldTokenPrice);
    setSilverTokenPrice(config.silverTokenPrice);
    setSelectedConfigId(configId);
  };

  /**
   * Delete a configuration
   */
  const handleDeleteConfiguration = (configId) => {
    if (!window.confirm(t('soloHuntAnalyzer.configManager.confirmDelete'))) {
      return;
    }

    const updatedConfigs = configurations.filter(c => c.id !== configId);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs));
      setConfigurations(updatedConfigs);
      if (selectedConfigId === configId.toString()) {
        setSelectedConfigId('');
      }
    } catch (error) {
      console.error('Error deleting configuration:', error);
    }
  };

  /**
   * Clear all configurations
   */
  const handleClearAll = () => {
    if (!window.confirm(t('soloHuntAnalyzer.configManager.confirmClearAll'))) {
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
      setConfigurations([]);
      setSelectedConfigId('');
    } catch (error) {
      console.error('Error clearing configurations:', error);
    }
  };

  /**
   * Duplicate a configuration
   */
  const handleDuplicateConfiguration = (configId) => {
    const config = configurations.find(c => c.id === configId);
    if (!config) return;

    const duplicatedConfig = {
      id: Date.now(),
      name: `${config.name} (Copy)`,
      items: config.items,
      goldTokenPrice: config.goldTokenPrice,
      silverTokenPrice: config.silverTokenPrice,
      createdAt: new Date().toISOString(),
    };

    const updatedConfigs = [...configurations, duplicatedConfig];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs));
      setConfigurations(updatedConfigs);
    } catch (error) {
      console.error('Error duplicating configuration:', error);

      if (error.name === 'QuotaExceededError') {
        alert(t('soloHuntAnalyzer.configManager.errors.quotaExceeded'));
      } else {
        alert(t('soloHuntAnalyzer.configManager.errors.saveFailed'));
      }
    }
  };

  /**
   * Open edit modal for a configuration
   */
  const handleOpenEditModal = (configId) => {
    const config = configurations.find(c => c.id === configId);
    if (!config) return;

    setEditingConfigId(configId);
    setEditingConfigName(config.name);
    setShowEditModal(true);
  };

  /**
   * Save edited configuration name
   */
  const handleSaveEditedName = () => {
    if (!editingConfigName.trim()) {
      return;
    }

    const updatedConfigs = configurations.map(config =>
      config.id === editingConfigId
        ? { ...config, name: editingConfigName.trim() }
        : config
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs));
      setConfigurations(updatedConfigs);
      setShowEditModal(false);
      setEditingConfigId(null);
      setEditingConfigName('');
    } catch (error) {
      console.error('Error editing configuration:', error);

      if (error.name === 'QuotaExceededError') {
        alert(t('soloHuntAnalyzer.configManager.errors.quotaExceeded'));
      } else {
        alert(t('soloHuntAnalyzer.configManager.errors.saveFailed'));
      }
    }
  };

  return (
    <ConfigurationManagerContainer>
      <ConfigHeader>
        <h3>{t('soloHuntAnalyzer.configManager.title')}</h3>
        <ConfigDescription>
          {t('soloHuntAnalyzer.configManager.description')}
        </ConfigDescription>
      </ConfigHeader>

      <ConfigControls>
        {/* Save Configuration Button */}
        <Button
          variant="primary"
          onClick={() => setShowSaveModal(true)}
          disabled={customItems.length === 0}
          dataCy="config-manager-button-save"
        >
          💾 {t('soloHuntAnalyzer.configManager.saveButton')}
        </Button>

        {/* Load Configuration Dropdown */}
        {configurations.length > 0 && (
          <ConfigLoadSection>
            <ConfigSelect
              value={selectedConfigId}
              onChange={(e) => handleLoadConfiguration(e.target.value)}
            >
              <option value="">{t('soloHuntAnalyzer.configManager.selectConfig')}</option>
              {configurations.map(config => (
                <option key={config.id} value={config.id}>
                  {config.name} ({new Date(config.createdAt).toLocaleDateString()})
                </option>
              ))}
            </ConfigSelect>

            {selectedConfigId && (
              <>
                <SecondaryButtonSmall
                  onClick={() => handleOpenEditModal(parseInt(selectedConfigId, 10))}
                  title={t('soloHuntAnalyzer.configManager.editButton')}
                >
                  ✏️
                </SecondaryButtonSmall>
                <SecondaryButtonSmall
                  onClick={() => handleDuplicateConfiguration(parseInt(selectedConfigId, 10))}
                  title={t('soloHuntAnalyzer.configManager.duplicateButton')}
                >
                  📋
                </SecondaryButtonSmall>
                <DangerButtonSmall
                  onClick={() => handleDeleteConfiguration(parseInt(selectedConfigId, 10))}
                  title={t('soloHuntAnalyzer.configManager.deleteButton')}
                >
                  🗑️
                </DangerButtonSmall>
              </>
            )}
          </ConfigLoadSection>
        )}

        {/* Clear All Button */}
        {configurations.length > 0 && (
          <DangerButton onClick={handleClearAll}>
            {t('soloHuntAnalyzer.configManager.clearAllButton')}
          </DangerButton>
        )}
      </ConfigControls>

      {/* Configuration Count */}
      {configurations.length > 0 && (
        <ConfigCount>
          {t('soloHuntAnalyzer.configManager.savedCount', { count: configurations.length })}
        </ConfigCount>
      )}

      {/* Save Configuration Modal */}
      {showSaveModal && (
        <ModalOverlay
          onClick={() => setShowSaveModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.configManager.closeModal')}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="save-config-modal-title"
            aria-modal="true"
          >
            <h3 id="save-config-modal-title">
              {t('soloHuntAnalyzer.configManager.saveModal.title')}
            </h3>

            <FormGroup>
              <label htmlFor="config-name-input">
                {t('soloHuntAnalyzer.configManager.saveModal.nameLabel')}:
              </label>
              <ConfigNameInput
                id="config-name-input"
                type="text"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder={t('soloHuntAnalyzer.configManager.saveModal.namePlaceholder')}
                maxLength={50}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && configName.trim()) {
                    handleSaveConfiguration();
                  }
                }}
              />
            </FormGroup>

            <ConfigPreview>
              <PreviewLabel>
                {t('soloHuntAnalyzer.configManager.saveModal.preview')}:
              </PreviewLabel>
              <PreviewList>
                <li>📦 {customItems.length} {t('soloHuntAnalyzer.configManager.saveModal.itemsCount')}</li>
                {goldTokenPrice > 0 && (
                  <li>GT: {formatGPValue(goldTokenPrice).formatted} GP</li>
                )}
                {silverTokenPrice > 0 && (
                  <li>ST: {formatGPValue(silverTokenPrice).formatted} GP</li>
                )}
              </PreviewList>
            </ConfigPreview>

            <ModalActions>
              <Button
                variant="primary"
                onClick={handleSaveConfiguration}
                disabled={!configName.trim()}
                dataCy="config-manager-button-save-confirm"
              >
                {t('soloHuntAnalyzer.configManager.saveModal.confirmButton')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowSaveModal(false);
                  setConfigName('');
                }}
                dataCy="config-manager-button-save-cancel"
              >
                {t('soloHuntAnalyzer.configManager.saveModal.cancelButton')}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Edit Configuration Modal */}
      {showEditModal && (
        <ModalOverlay
          onClick={() => setShowEditModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.configManager.closeModal')}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="edit-config-modal-title"
            aria-modal="true"
          >
            <h3 id="edit-config-modal-title">
              {t('soloHuntAnalyzer.configManager.editModal.title')}
            </h3>

            <FormGroup>
              <label htmlFor="edit-config-name-input">
                {t('soloHuntAnalyzer.configManager.editModal.nameLabel')}:
              </label>
              <ConfigNameInput
                id="edit-config-name-input"
                type="text"
                value={editingConfigName}
                onChange={(e) => setEditingConfigName(e.target.value)}
                placeholder={t('soloHuntAnalyzer.configManager.editModal.namePlaceholder')}
                maxLength={50}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && editingConfigName.trim()) {
                    handleSaveEditedName();
                  }
                }}
              />
            </FormGroup>

            <ModalActions>
              <Button
                variant="primary"
                onClick={handleSaveEditedName}
                disabled={!editingConfigName.trim()}
                dataCy="config-manager-button-edit-confirm"
              >
                {t('soloHuntAnalyzer.configManager.editModal.confirmButton')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingConfigId(null);
                  setEditingConfigName('');
                }}
                dataCy="config-manager-button-edit-cancel"
              >
                {t('soloHuntAnalyzer.configManager.editModal.cancelButton')}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </ConfigurationManagerContainer>
  );
}

ConfigurationManager.propTypes = {
  customItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      priceType: PropTypes.oneOf(['GP', 'GT', 'ST']).isRequired,
      itemDuration: PropTypes.number, // optional for custom items
    })
  ).isRequired,
  setCustomItems: PropTypes.func.isRequired,
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
  silverTokenPrice: PropTypes.number.isRequired,
  setSilverTokenPrice: PropTypes.func.isRequired,
};
