/**
 * Hunt History Component
 * Displays history of solo hunts with export/delete functionality
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './HuntHistory.css';

const HISTORY_STORAGE_KEY = 'solo-hunt-history';
const MAX_HISTORY_ITEMS = 50;

export default function HuntHistory({ isOpen, onClose, onAddHunt }) {
  const { t } = useTranslation();
  const [huntHistory, setHuntHistory] = useState([]);
  const [expandedHuntId, setExpandedHuntId] = useState(null);

  // Load history from localStorage on mount
  useEffect(() => {
    loadHistory();
  }, []);

  /**
   * Load hunt history from localStorage
   */
  const loadHistory = () => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setHuntHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading hunt history:', error);
      setHuntHistory([]);
    }
  };

  /**
   * Save a new hunt to history (called from parent)
   */
  const saveHunt = (huntData) => {
    const newHunt = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...huntData,
    };

    let updatedHistory = [newHunt, ...huntHistory];

    // Keep only last MAX_HISTORY_ITEMS
    if (updatedHistory.length > MAX_HISTORY_ITEMS) {
      updatedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
    }

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      setHuntHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving hunt to history:', error);
    }
  };

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
  }, [onAddHunt, huntHistory]);

  if (!isOpen) return null;

  return (
    <div className="hunt-history-overlay" onClick={onClose}>
      <div className="hunt-history-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="hunt-history-header">
          <h2>{t('huntHistory.title')}</h2>
          <button className="btn-close" onClick={onClose} aria-label={t('huntHistory.closeButton')}>
            ✕
          </button>
        </div>

        {/* Controls */}
        <div className="hunt-history-controls">
          {huntHistory.length > 0 && (
            <>
              <button className="btn btn-primary" onClick={handleExportJSON}>
                📤 {t('huntHistory.controls.exportButton')}
              </button>
              <button className="btn btn-danger" onClick={handleClearAll}>
                🗑️ {t('huntHistory.controls.clearAllButton')}
              </button>
            </>
          )}
        </div>

        {/* Hunt Count */}
        {huntHistory.length > 0 && (
          <div className="hunt-count">
            {t('huntHistory.huntCount', { count: huntHistory.length, max: MAX_HISTORY_ITEMS })}
          </div>
        )}

        {/* Hunt List */}
        <div className="hunt-history-list">
          {huntHistory.length === 0 ? (
            <div className="empty-state">
              <p>{t('huntHistory.emptyState')}</p>
            </div>
          ) : (
            huntHistory.map((hunt) => (
              <div key={hunt.id} className="hunt-card">
                <div className="hunt-summary" onClick={() => toggleExpand(hunt.id)}>
                  <div className="hunt-info">
                    <div className="hunt-character">{hunt.playerName}</div>
                    <div className="hunt-date">
                      {new Date(hunt.timestamp).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="hunt-balance">
                    <span className={hunt.adjustedBalance >= 0 ? 'positive' : 'negative'}>
                      {hunt.adjustedBalance >= 0 ? '+' : ''}
                      {hunt.adjustedBalance.toLocaleString('pt-BR')} GP
                    </span>
                  </div>
                  <button
                    className="btn-expand"
                    aria-label={expandedHuntId === hunt.id ? t('huntHistory.collapseButton') : t('huntHistory.expandButton')}
                  >
                    {expandedHuntId === hunt.id ? '▼' : '▶'}
                  </button>
                </div>

                {expandedHuntId === hunt.id && (
                  <div className="hunt-details">
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.duration')}:</span>
                        <span className="value">{hunt.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.loot')}:</span>
                        <span className="value positive">+{hunt.loot.toLocaleString('pt-BR')} GP</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
                        <span className="value negative">-{hunt.supplies.toLocaleString('pt-BR')} GP</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
                        <span className="value">{hunt.balance.toLocaleString('pt-BR')} GP</span>
                      </div>
                      {hunt.totalCost > 0 && (
                        <div className="detail-item">
                          <span className="label">{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCost')}:</span>
                          <span className="value negative">-{hunt.totalCost.toLocaleString('pt-BR')} GP</span>
                        </div>
                      )}
                      <div className="detail-item">
                        <span className="label">{t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}:</span>
                        <span className="value">{hunt.profitPerHour.toLocaleString('pt-BR')} GP/h</span>
                      </div>
                    </div>

                    <div className="hunt-actions">
                      <button
                        className="btn btn-danger-small"
                        onClick={() => handleDeleteHunt(hunt.id)}
                        title={t('huntHistory.deleteButton')}
                      >
                        🗑️ {t('huntHistory.deleteButton')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

HuntHistory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddHunt: PropTypes.func,
};
