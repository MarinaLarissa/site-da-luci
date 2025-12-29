/**
 * Hunt History Controls component
 * Export and management controls for hunt history
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './HuntHistoryControls.css';

export default function HuntHistoryControls({
  exportOptions,
  onUpdateExportOptions,
  onExport,
  onClearHistory,
  totalHunts
}) {
  const { t } = useTranslation();

  const handleTypeChange = (e) => {
    onUpdateExportOptions({ type: e.target.value });
  };

  const handleCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    onUpdateExportOptions({ count: isNaN(value) ? 1 : value });
  };

  const handleStartDateChange = (e) => {
    onUpdateExportOptions({ startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    onUpdateExportOptions({ endDate: e.target.value });
  };

  const handleClearHistory = () => {
    if (window.confirm(t('huntHistory.confirmClearAll'))) {
      onClearHistory();
    }
  };

  return (
    <div className="hunt-history-controls">
      <div className="controls-section">
        <h4 className="controls-title">{t('huntHistory.controls.exportTitle')}</h4>

        <div className="export-type-selector">
          <label className="radio-label">
            <input
              type="radio"
              name="exportType"
              value="all"
              checked={exportOptions.type === 'all'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportAll')} ({totalHunts})</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="exportType"
              value="lastN"
              checked={exportOptions.type === 'lastN'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportLastN')}</span>
          </label>
          {exportOptions.type === 'lastN' && (
            <div className="input-group">
              <input
                type="number"
                min="1"
                max={totalHunts}
                value={exportOptions.count}
                onChange={handleCountChange}
                className="number-input"
              />
              <span className="input-hint">{t('huntHistory.controls.huntsLabel')}</span>
            </div>
          )}

          <label className="radio-label">
            <input
              type="radio"
              name="exportType"
              value="dateRange"
              checked={exportOptions.type === 'dateRange'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportDateRange')}</span>
          </label>
          {exportOptions.type === 'dateRange' && (
            <div className="date-range-inputs">
              <div className="input-group">
                <label className="input-label">{t('huntHistory.controls.startDate')}:</label>
                <input
                  type="date"
                  value={exportOptions.startDate || ''}
                  onChange={handleStartDateChange}
                  className="date-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">{t('huntHistory.controls.endDate')}:</label>
                <input
                  type="date"
                  value={exportOptions.endDate || ''}
                  onChange={handleEndDateChange}
                  className="date-input"
                />
              </div>
            </div>
          )}
        </div>

        <button className="btn-export" onClick={onExport}>
          📥 {t('huntHistory.controls.exportButton')}
        </button>
      </div>

      <div className="controls-section danger-zone">
        <h4 className="controls-title">{t('huntHistory.controls.dangerZone')}</h4>
        <button className="btn-clear-all" onClick={handleClearHistory}>
          🗑️ {t('huntHistory.controls.clearAllButton')}
        </button>
        <p className="warning-text">{t('huntHistory.controls.clearWarning')}</p>
      </div>
    </div>
  );
}

HuntHistoryControls.propTypes = {
  exportOptions: PropTypes.shape({
    type: PropTypes.string.isRequired,
    count: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }).isRequired,
  onUpdateExportOptions: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  totalHunts: PropTypes.number.isRequired
};
