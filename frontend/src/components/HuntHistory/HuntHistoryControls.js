/**
 * Hunt History Controls component
 * Export and management controls for hunt history
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  HuntHistoryControlsContainer,
  HuntHistoryControlsSection,
  HuntHistoryControlsTitle,
  HuntHistoryControlsExportTypeSelector,
  HuntHistoryControlsRadioLabel,
  HuntHistoryControlsInputGroup,
  HuntHistoryControlsNumberInput,
  HuntHistoryControlsInputHint,
  HuntHistoryControlsDateRangeInputs,
  HuntHistoryControlsInputLabel,
  HuntHistoryControlsDateInput,
  HuntHistoryControlsExportButton,
  HuntHistoryControlsClearAllButton,
  HuntHistoryControlsWarningText,
} from './HuntHistoryControls.styles';

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
    <HuntHistoryControlsContainer data-cy="hunt-history-controls">
      <HuntHistoryControlsSection>
        <HuntHistoryControlsTitle>{t('huntHistory.controls.exportTitle')}</HuntHistoryControlsTitle>

        <HuntHistoryControlsExportTypeSelector>
          <HuntHistoryControlsRadioLabel>
            <input
              type="radio"
              name="exportType"
              value="all"
              checked={exportOptions.type === 'all'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportAll')} ({totalHunts})</span>
          </HuntHistoryControlsRadioLabel>

          <HuntHistoryControlsRadioLabel>
            <input
              type="radio"
              name="exportType"
              value="lastN"
              checked={exportOptions.type === 'lastN'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportLastN')}</span>
          </HuntHistoryControlsRadioLabel>
          {exportOptions.type === 'lastN' && (
            <HuntHistoryControlsInputGroup>
              <HuntHistoryControlsNumberInput
                type="number"
                min="1"
                max={totalHunts}
                value={exportOptions.count}
                onChange={handleCountChange}
              />
              <HuntHistoryControlsInputHint>{t('huntHistory.controls.huntsLabel')}</HuntHistoryControlsInputHint>
            </HuntHistoryControlsInputGroup>
          )}

          <HuntHistoryControlsRadioLabel>
            <input
              type="radio"
              name="exportType"
              value="dateRange"
              checked={exportOptions.type === 'dateRange'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportDateRange')}</span>
          </HuntHistoryControlsRadioLabel>
          {exportOptions.type === 'dateRange' && (
            <HuntHistoryControlsDateRangeInputs>
              <HuntHistoryControlsInputGroup>
                <HuntHistoryControlsInputLabel>{t('huntHistory.controls.startDate')}:</HuntHistoryControlsInputLabel>
                <HuntHistoryControlsDateInput
                  type="date"
                  value={exportOptions.startDate || ''}
                  onChange={handleStartDateChange}
                />
              </HuntHistoryControlsInputGroup>
              <HuntHistoryControlsInputGroup>
                <HuntHistoryControlsInputLabel>{t('huntHistory.controls.endDate')}:</HuntHistoryControlsInputLabel>
                <HuntHistoryControlsDateInput
                  type="date"
                  value={exportOptions.endDate || ''}
                  onChange={handleEndDateChange}
                />
              </HuntHistoryControlsInputGroup>
            </HuntHistoryControlsDateRangeInputs>
          )}
        </HuntHistoryControlsExportTypeSelector>

        <HuntHistoryControlsExportButton onClick={onExport}>
          📥 {t('huntHistory.controls.exportButton')}
        </HuntHistoryControlsExportButton>
      </HuntHistoryControlsSection>

      <HuntHistoryControlsSection $dangerZone>
        <HuntHistoryControlsTitle>{t('huntHistory.controls.dangerZone')}</HuntHistoryControlsTitle>
        <HuntHistoryControlsClearAllButton onClick={handleClearHistory}>
          🗑️ {t('huntHistory.controls.clearAllButton')}
        </HuntHistoryControlsClearAllButton>
        <HuntHistoryControlsWarningText>{t('huntHistory.controls.clearWarning')}</HuntHistoryControlsWarningText>
      </HuntHistoryControlsSection>
    </HuntHistoryControlsContainer>
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
