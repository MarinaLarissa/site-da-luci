/**
 * Hunt History Drawer component
 * Sidebar/drawer containing hunt history list and controls
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import HuntHistoryItem from './HuntHistoryItem';
import HuntHistoryControls from './HuntHistoryControls';
import './HuntHistoryDrawer.css';

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
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <div className={`hunt-history-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">
            📜 {t('huntHistory.title')}
          </h2>
          <button
            className="btn-close-drawer"
            onClick={onClose}
            aria-label={t('huntHistory.closeButton')}
          >
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {/* Hunt count info */}
          <div className="hunt-count-info">
            <span className="count-text">
              {t('huntHistory.huntCount', { count: hunts.length, max: 62 })}
            </span>
            {hunts.length >= 62 && (
              <span className="limit-warning">
                ⚠️ {t('huntHistory.limitWarning')}
              </span>
            )}
          </div>

          {/* Controls */}
          <HuntHistoryControls
            exportOptions={exportOptions}
            onUpdateExportOptions={onUpdateExportOptions}
            onExport={onExport}
            onClearHistory={onClearHistory}
            totalHunts={hunts.length}
          />

          {/* Hunt list */}
          <div className="hunt-list-section">
            <h3 className="list-section-title">{t('huntHistory.listTitle')}</h3>
            {hunts.length === 0 ? (
              <div className="empty-state">
                <p>{t('huntHistory.emptyState')}</p>
              </div>
            ) : (
              <div className="hunt-list">
                {hunts.map(hunt => (
                  <HuntHistoryItem
                    key={hunt.id}
                    hunt={hunt}
                    onDelete={onDeleteHunt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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
