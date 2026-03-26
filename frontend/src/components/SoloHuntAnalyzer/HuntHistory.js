/**
 * Hunt History Component
 * Displays history of solo hunts with export/delete functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGPValue } from '../../utils/formatters';
import Button from '../common/Button';
import {
  SoloHuntHistoryOverlay,
  SoloHuntHistoryPanel,
  SoloHuntHistoryHeader,
  SoloHuntHistoryCloseButton,
  SoloHuntHistoryControls,
  SoloHuntHistoryCount,
  SoloHuntHistoryList,
  SoloHuntHistoryEmptyState,
  SoloHuntHistoryCard,
  SoloHuntHistorySummary,
  SoloHuntHistoryInfo,
  SoloHuntHistoryCharacter,
  SoloHuntHistoryDate,
  SoloHuntHistoryBalance,
  SoloHuntHistoryExpandButton,
  SoloHuntHistoryDetails,
  SoloHuntHistoryDetailsGrid,
  SoloHuntHistoryDetailItem,
  SoloHuntHistoryActions,
} from './HuntHistory.styles';

const HISTORY_STORAGE_KEY = 'solo-hunt-history';
const MAX_HISTORY_ITEMS = 50;

export default function HuntHistory({ isOpen, onClose, onAddHunt }) {
  const { t, i18n } = useTranslation();
  const [huntHistory, setHuntHistory] = useState([]);
  const [expandedHuntId, setExpandedHuntId] = useState(null);

  // Fallback locale if i18n.language is undefined
  const locale = i18n.language || 'pt-BR';

  // Load history from localStorage on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Reload history when modal opens (to sync with localStorage after save)
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  /**
   * Load hunt history from localStorage
   */
  const loadHistory = () => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate and filter out corrupted entries
        let validHunts = Array.isArray(parsed)
          ? parsed.filter(hunt => hunt && typeof hunt === 'object' && hunt.id)
          : [];
        // Migrate: rename legacy moneyMaked → moneyEarned
        let migrated = false;
        validHunts = validHunts.map(hunt => {
          if ('moneyMaked' in hunt) {
            const { moneyMaked, ...rest } = hunt;
            migrated = true;
            return { ...rest, moneyEarned: moneyMaked };
          }
          return hunt;
        });
        if (migrated) {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(validHunts));
        }
        setHuntHistory(validHunts);
      }
    } catch (error) {
      console.error('Error loading hunt history:', error);
      // Clear corrupted data
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHuntHistory([]);
    }
  };

  /**
   * Save a new hunt to history (called from parent)
   * Using useCallback to prevent unnecessary re-renders
   */
  const saveHunt = useCallback((huntData) => {
    // Validate hunt data before saving (prevent empty/invalid hunts)
    if (!huntData) {
      return;
    }

    if (!huntData.playerName || huntData.playerName.trim() === '') {
      return;
    }

    if (typeof huntData.loot !== 'number' ||
        typeof huntData.supplies !== 'number' ||
        typeof huntData.balance !== 'number') {
      return;
    }

    const newHunt = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...huntData,
    };

    setHuntHistory(prevHistory => {
      let updatedHistory = [newHunt, ...prevHistory];

      // Keep only last MAX_HISTORY_ITEMS
      if (updatedHistory.length > MAX_HISTORY_ITEMS) {
        updatedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      }

      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
        return updatedHistory;
      } catch (error) {
        console.error('Error saving hunt to history:', error);

        if (error.name === 'QuotaExceededError') {
          alert(t('huntHistory.errors.quotaExceeded'));
        } else {
          alert(t('huntHistory.errors.saveFailed'));
        }

        return prevHistory; // Return previous state on error
      }
    });
  }, [t]);

  /**
   * Delete a hunt from history
   */
  const handleDeleteHunt = (huntId) => {
    if (!window.confirm(t('huntHistory.confirmDelete'))) {
      return;
    }

    const updatedHistory = huntHistory.filter(hunt => hunt.id !== huntId);

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      setHuntHistory(updatedHistory);
      if (expandedHuntId === huntId) {
        setExpandedHuntId(null);
      }
    } catch (error) {
      console.error('Error deleting hunt:', error);
    }
  };

  /**
   * Clear all hunt history
   */
  const handleClearAll = () => {
    if (!window.confirm(t('huntHistory.confirmClearAll'))) {
      return;
    }

    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHuntHistory([]);
      setExpandedHuntId(null);
    } catch (error) {
      console.error('Error clearing hunt history:', error);
    }
  };

  /**
   * Export history to JSON file
   */
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(huntHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solo-hunt-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Toggle hunt details expansion
   */
  const toggleExpand = (huntId) => {
    setExpandedHuntId(expandedHuntId === huntId ? null : huntId);
  };

  // Expose saveHunt method to parent via prop
  useEffect(() => {
    if (onAddHunt) {
      onAddHunt(saveHunt);
    }
  }, [onAddHunt, saveHunt]);

  // ESC key handler to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <SoloHuntHistoryOverlay data-cy="solo-hunt-history" onClick={onClose}>
      <SoloHuntHistoryPanel onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <SoloHuntHistoryHeader>
          <h2>{t('huntHistory.title')}</h2>
          <SoloHuntHistoryCloseButton onClick={onClose} aria-label={t('huntHistory.closeButton')}>
            ✕
          </SoloHuntHistoryCloseButton>
        </SoloHuntHistoryHeader>

        {/* Controls */}
        <SoloHuntHistoryControls>
          {huntHistory.length > 0 && (
            <>
              <Button variant="primary" onClick={handleExportJSON} dataCy="hunt-history-button-export">
                📤 {t('huntHistory.controls.exportButton')}
              </Button>
              <Button variant="danger" onClick={handleClearAll} dataCy="hunt-history-button-clear-all">
                🗑️ {t('huntHistory.controls.clearAllButton')}
              </Button>
            </>
          )}
        </SoloHuntHistoryControls>

        {/* Hunt Count */}
        {huntHistory.length > 0 && (
          <SoloHuntHistoryCount>
            {t('huntHistory.huntCount', { count: huntHistory.length, max: MAX_HISTORY_ITEMS })}
          </SoloHuntHistoryCount>
        )}

        {/* Hunt List */}
        <SoloHuntHistoryList>
          {huntHistory.length === 0 ? (
            <SoloHuntHistoryEmptyState>
              <p>{t('huntHistory.emptyState')}</p>
            </SoloHuntHistoryEmptyState>
          ) : (
            huntHistory.filter(hunt => hunt && hunt.id).map((hunt) => (
              <SoloHuntHistoryCard key={hunt.id}>
                <SoloHuntHistorySummary onClick={() => toggleExpand(hunt.id)}>
                  <SoloHuntHistoryInfo>
                    <SoloHuntHistoryCharacter>{hunt.playerName || 'Unknown'}</SoloHuntHistoryCharacter>
                    <SoloHuntHistoryDate>
                      {hunt.timestamp ? new Date(hunt.timestamp).toLocaleString(locale) : 'N/A'}
                    </SoloHuntHistoryDate>
                  </SoloHuntHistoryInfo>
                  <SoloHuntHistoryBalance>
                    {formatGPValue(hunt.adjustedBalance || 0).formatted.includes('kk') ? (
                      <span
                        className={(hunt.adjustedBalance || 0) >= 0 ? 'positive' : 'negative'}
                        title={formatGPValue(hunt.adjustedBalance || 0).full}
                      >
                        {(hunt.adjustedBalance || 0) >= 0 ? '+' : ''}
                        {formatGPValue(hunt.adjustedBalance || 0).formatted} GP
                      </span>
                    ) : (
                      <span className={(hunt.adjustedBalance || 0) >= 0 ? 'positive' : 'negative'}>
                        {(hunt.adjustedBalance || 0) >= 0 ? '+' : ''}
                        {formatGPValue(hunt.adjustedBalance || 0).formatted} GP
                      </span>
                    )}
                  </SoloHuntHistoryBalance>
                  <SoloHuntHistoryExpandButton
                    aria-label={expandedHuntId === hunt.id ? t('huntHistory.collapseButton') : t('huntHistory.expandButton')}
                  >
                    {expandedHuntId === hunt.id ? '▼' : '▶'}
                  </SoloHuntHistoryExpandButton>
                </SoloHuntHistorySummary>

                {expandedHuntId === hunt.id && (
                  <SoloHuntHistoryDetails>
                    <SoloHuntHistoryDetailsGrid>
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.duration')}:</span>
                        <span className="value">{hunt.duration || 'N/A'}</span>
                      </SoloHuntHistoryDetailItem>
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.loot')}:</span>
                        {formatGPValue(hunt.loot || 0).formatted.includes('kk') ? (
                          <span className="value positive" title={formatGPValue(hunt.loot || 0).full}>
                            +{formatGPValue(hunt.loot || 0).formatted} GP
                          </span>
                        ) : (
                          <span className="value positive">+{formatGPValue(hunt.loot || 0).formatted} GP</span>
                        )}
                      </SoloHuntHistoryDetailItem>
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
                        {formatGPValue(hunt.supplies || 0).formatted.includes('kk') ? (
                          <span className="value negative" title={formatGPValue(hunt.supplies || 0).full}>
                            -{formatGPValue(hunt.supplies || 0).formatted} GP
                          </span>
                        ) : (
                          <span className="value negative">-{formatGPValue(hunt.supplies || 0).formatted} GP</span>
                        )}
                      </SoloHuntHistoryDetailItem>
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
                        {formatGPValue(hunt.balance || 0).formatted.includes('kk') ? (
                          <span className="value" title={formatGPValue(hunt.balance || 0).full}>
                            {formatGPValue(hunt.balance || 0).formatted} GP
                          </span>
                        ) : (
                          <span className="value">{formatGPValue(hunt.balance || 0).formatted} GP</span>
                        )}
                      </SoloHuntHistoryDetailItem>
                      {(hunt.totalCost || 0) > 0 && (
                        <SoloHuntHistoryDetailItem>
                          <span className="label">{t('soloHuntAnalyzer.results.finalBalance.additionalCost')}:</span>
                          {formatGPValue(hunt.totalCost || 0).formatted.includes('kk') ? (
                            <span className="value negative" title={formatGPValue(hunt.totalCost || 0).full}>
                              -{formatGPValue(hunt.totalCost || 0).formatted} GP
                            </span>
                          ) : (
                            <span className="value negative">-{formatGPValue(hunt.totalCost || 0).formatted} GP</span>
                          )}
                        </SoloHuntHistoryDetailItem>
                      )}
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.finalBalance.totalProfit')}:</span>
                        {formatGPValue(hunt.adjustedBalance || 0).formatted.includes('kk') ? (
                          <span
                            className={(hunt.adjustedBalance || 0) >= 0 ? 'value positive' : 'value negative'}
                            title={formatGPValue(hunt.adjustedBalance || 0).full}
                          >
                            {(hunt.adjustedBalance || 0) >= 0 ? '+' : ''}{formatGPValue(hunt.adjustedBalance || 0).formatted} GP
                          </span>
                        ) : (
                          <span className={(hunt.adjustedBalance || 0) >= 0 ? 'value positive' : 'value negative'}>
                            {(hunt.adjustedBalance || 0) >= 0 ? '+' : ''}{formatGPValue(hunt.adjustedBalance || 0).formatted} GP
                          </span>
                        )}
                      </SoloHuntHistoryDetailItem>
                      <SoloHuntHistoryDetailItem>
                        <span className="label">{t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}:</span>
                        {formatGPValue(hunt.profitPerHour || 0).formatted.includes('kk') ? (
                          <span className="value" title={formatGPValue(hunt.profitPerHour || 0).full}>
                            {formatGPValue(hunt.profitPerHour || 0).formatted} GP/h
                          </span>
                        ) : (
                          <span className="value">{formatGPValue(hunt.profitPerHour || 0).formatted} GP/h</span>
                        )}
                      </SoloHuntHistoryDetailItem>
                      {hunt.tcTotal !== null && hunt.tcTotal !== undefined && (
                        <SoloHuntHistoryDetailItem>
                          <span className="label">{t('soloHuntAnalyzer.results.finalBalance.tcTotal')}:</span>
                          <span className={hunt.tcTotal >= 0 ? 'value positive' : 'value negative'}>
                            {hunt.tcTotal >= 0 ? '+' : ''}{(hunt.tcTotal || 0).toLocaleString(locale)} TC
                          </span>
                        </SoloHuntHistoryDetailItem>
                      )}
                      {hunt.tcPerHour !== null && hunt.tcPerHour !== undefined && (
                        <SoloHuntHistoryDetailItem>
                          <span className="label">{t('soloHuntAnalyzer.results.finalBalance.tcPerHour')}:</span>
                          <span className="value">{(hunt.tcPerHour || 0).toLocaleString(locale)} TC/h</span>
                        </SoloHuntHistoryDetailItem>
                      )}
                      {hunt.moneyEarned !== null && hunt.moneyEarned !== undefined && (
                        <SoloHuntHistoryDetailItem>
                          <span className="label">💵 Money Earned:</span>
                          <span className={hunt.moneyEarned >= 0 ? 'value positive' : 'value negative'}>
                            ${(hunt.moneyEarned || 0).toFixed(2)}
                          </span>
                        </SoloHuntHistoryDetailItem>
                      )}
                    </SoloHuntHistoryDetailsGrid>

                    <SoloHuntHistoryActions>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteHunt(hunt.id)}
                        title={t('huntHistory.deleteButton')}
                        dataCy="hunt-history-button-delete"
                      >
                        🗑️ {t('huntHistory.deleteButton')}
                      </Button>
                    </SoloHuntHistoryActions>
                  </SoloHuntHistoryDetails>
                )}
              </SoloHuntHistoryCard>
            ))
          )}
        </SoloHuntHistoryList>
      </SoloHuntHistoryPanel>
    </SoloHuntHistoryOverlay>
  );
}

HuntHistory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddHunt: PropTypes.func,
};
