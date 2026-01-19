/**
 * Hunt History Controls component
 * Export and management controls for hunt history
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ControlsContainer,
  ControlsSection,
  ControlsTitle,
  ExportTypeSelector,
  RadioLabel,
  InputGroup,
  NumberInput,
  InputHint,
  DateRangeInputs,
  InputLabel,
  DateInput,
  ExportButton,
  ClearAllButton,
  WarningText,
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
    <ControlsContainer>
      <ControlsSection>
        <ControlsTitle>{t('huntHistory.controls.exportTitle')}</ControlsTitle>

        <ExportTypeSelector>
          <RadioLabel>
            <input
              type="radio"
              name="exportType"
              value="all"
              checked={exportOptions.type === 'all'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportAll')} ({totalHunts})</span>
          </RadioLabel>

          <RadioLabel>
            <input
              type="radio"
              name="exportType"
              value="lastN"
              checked={exportOptions.type === 'lastN'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportLastN')}</span>
          </RadioLabel>
          {exportOptions.type === 'lastN' && (
            <InputGroup>
              <NumberInput
                type="number"
                min="1"
                max={totalHunts}
                value={exportOptions.count}
                onChange={handleCountChange}
              />
              <InputHint>{t('huntHistory.controls.huntsLabel')}</InputHint>
            </InputGroup>
          )}

          <RadioLabel>
            <input
              type="radio"
              name="exportType"
              value="dateRange"
              checked={exportOptions.type === 'dateRange'}
              onChange={handleTypeChange}
            />
            <span>{t('huntHistory.controls.exportDateRange')}</span>
          </RadioLabel>
          {exportOptions.type === 'dateRange' && (
            <DateRangeInputs>
              <InputGroup>
                <InputLabel>{t('huntHistory.controls.startDate')}:</InputLabel>
                <DateInput
                  type="date"
                  value={exportOptions.startDate || ''}
                  onChange={handleStartDateChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLabel>{t('huntHistory.controls.endDate')}:</InputLabel>
                <DateInput
                  type="date"
                  value={exportOptions.endDate || ''}
                  onChange={handleEndDateChange}
                />
              </InputGroup>
            </DateRangeInputs>
          )}
        </ExportTypeSelector>

        <ExportButton onClick={onExport}>
          📥 {t('huntHistory.controls.exportButton')}
        </ExportButton>
      </ControlsSection>

      <ControlsSection $dangerZone>
        <ControlsTitle>{t('huntHistory.controls.dangerZone')}</ControlsTitle>
        <ClearAllButton onClick={handleClearHistory}>
          🗑️ {t('huntHistory.controls.clearAllButton')}
        </ClearAllButton>
        <WarningText>{t('huntHistory.controls.clearWarning')}</WarningText>
      </ControlsSection>
    </ControlsContainer>
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
