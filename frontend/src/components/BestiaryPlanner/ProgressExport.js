import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getCompletionsByPeriod } from '../../services/progressHistoryStorage';
import { getPeriodDates } from '../../utils/chartDataUtils';
import { exportToCSV, exportToJSON } from '../../utils/exportUtils';
import {
  ExportContainer,
  ExportHeader,
  Title,
  Subtitle,
  ExportOptions,
  OptionGroup,
  OptionLabel,
  Select,
  FormatButtons,
  FormatButton,
  PreviewSection,
  PreviewLabel,
  PreviewBox,
  ExportActions,
  ExportButton,
  SuccessMessage,
  ErrorMessage,
} from './ProgressExport.styles';

/**
 * ProgressExport Component
 * Export progress data to CSV or JSON
 * Feature 4: Progress History
 */
const ProgressExport = ({ characterId }) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('30d');
  const [format, setFormat] = useState('csv');
  const [message, setMessage] = useState(null);

  // Get completions for selected period
  const completions = useMemo(() => {
    if (!characterId) return [];

    const { startDate, endDate } = getPeriodDates(period);
    return getCompletionsByPeriod(characterId, startDate, endDate);
  }, [characterId, period]);

  // Generate preview
  const preview = useMemo(() => {
    if (completions.length === 0) return 'No data to export';

    const previewData = completions.slice(0, 5);

    if (format === 'csv') {
      const lines = ['Date,Creature Name,Charm Points,Completed At'];
      previewData.forEach((c) => {
        const date = c.completedAt.split('T')[0];
        const time = new Date(c.completedAt).toLocaleString();
        lines.push(`${date},${c.name},${c.charmPoints},${time}`);
      });
      return lines.join('\n');
    }

    if (format === 'json') {
      const exportData = {
        exportedAt: new Date().toISOString(),
        totalCompletions: completions.length,
        completions: previewData.map((c) => ({
          date: c.completedAt.split('T')[0],
          creature: {
            id: c.id,
            name: c.name,
            charmPoints: c.charmPoints,
          },
          completedAt: c.completedAt,
        })),
      };
      return JSON.stringify(exportData, null, 2);
    }

    return '';
  }, [completions, format]);

  const handleExport = () => {
    if (completions.length === 0) {
      setMessage({
        type: 'error',
        text: 'No data to export',
      });
      return;
    }

    let success = false;

    if (format === 'csv') {
      success = exportToCSV(completions);
    } else if (format === 'json') {
      success = exportToJSON(completions);
    }

    if (success) {
      setMessage({
        type: 'success',
        text: t('bestiaryPlanner.progressHistory.export.success'),
      });
    } else {
      setMessage({
        type: 'error',
        text: t('bestiaryPlanner.progressHistory.export.error'),
      });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <ExportContainer>
      <ExportHeader>
        <Title>{t('bestiaryPlanner.progressHistory.export.title')}</Title>
        <Subtitle>{t('bestiaryPlanner.progressHistory.export.subtitle')}</Subtitle>
      </ExportHeader>

      <ExportOptions>
        <OptionGroup>
          <OptionLabel>{t('bestiaryPlanner.progressHistory.export.period')}</OptionLabel>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7d">
              {t('bestiaryPlanner.progressHistory.export.periods.7d')}
            </option>
            <option value="30d">
              {t('bestiaryPlanner.progressHistory.export.periods.30d')}
            </option>
            <option value="3m">
              {t('bestiaryPlanner.progressHistory.export.periods.3m')}
            </option>
            <option value="all">
              {t('bestiaryPlanner.progressHistory.export.periods.all')}
            </option>
          </Select>
        </OptionGroup>

        <OptionGroup>
          <OptionLabel>{t('bestiaryPlanner.progressHistory.export.format')}</OptionLabel>
          <FormatButtons>
            <FormatButton active={format === 'csv'} onClick={() => setFormat('csv')}>
              {t('bestiaryPlanner.progressHistory.export.formats.csv')}
            </FormatButton>
            <FormatButton active={format === 'json'} onClick={() => setFormat('json')}>
              {t('bestiaryPlanner.progressHistory.export.formats.json')}
            </FormatButton>
          </FormatButtons>
        </OptionGroup>
      </ExportOptions>

      <PreviewSection>
        <PreviewLabel>{t('bestiaryPlanner.progressHistory.export.preview')}</PreviewLabel>
        <PreviewBox>
          <pre>{preview}</pre>
        </PreviewBox>
      </PreviewSection>

      <ExportActions>
        <ExportButton onClick={handleExport} disabled={completions.length === 0}>
          {t('bestiaryPlanner.progressHistory.export.exportButton', {
            count: completions.length,
          })}
        </ExportButton>
      </ExportActions>

      {message && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}
    </ExportContainer>
  );
};

export default ProgressExport;
