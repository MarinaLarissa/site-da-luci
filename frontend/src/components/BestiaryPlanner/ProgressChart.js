import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleChart from './SimpleChart';
import { useProgressData } from '../../hooks/useProgressData';
import {
  ChartContainer,
  ChartHeader,
  ChartTitle,
  PeriodTabs,
  PeriodTab,
  ChartFooter,
  Stat,
  StatLabel,
  StatValue,
  LoadingSpinner,
  EmptyState,
} from './ProgressChart.styles';

/**
 * ProgressChart Component
 * Shows charm points over time with period selection
 * Feature 4: Progress History
 */
const ProgressChart = ({ characterId }) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('30d');
  const { chartData, statistics, isLoading } = useProgressData(characterId, period);

  if (isLoading) {
    return (
      <ChartContainer>
        <LoadingSpinner>{t('bestiaryPlanner.progressHistory.chart.loading')}</LoadingSpinner>
      </ChartContainer>
    );
  }

  const hasData = chartData && chartData.length > 0;

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>{t('bestiaryPlanner.progressHistory.chart.title')}</ChartTitle>
        <PeriodTabs>
          <PeriodTab active={period === '7d'} onClick={() => setPeriod('7d')}>
            {t('bestiaryPlanner.progressHistory.chart.periods.7d')}
          </PeriodTab>
          <PeriodTab active={period === '30d'} onClick={() => setPeriod('30d')}>
            {t('bestiaryPlanner.progressHistory.chart.periods.30d')}
          </PeriodTab>
          <PeriodTab active={period === '3m'} onClick={() => setPeriod('3m')}>
            {t('bestiaryPlanner.progressHistory.chart.periods.3m')}
          </PeriodTab>
          <PeriodTab active={period === 'all'} onClick={() => setPeriod('all')}>
            {t('bestiaryPlanner.progressHistory.chart.periods.all')}
          </PeriodTab>
        </PeriodTabs>
      </ChartHeader>

      {hasData ? (
        <>
          <SimpleChart data={chartData} type="area" color="#667eea" showGrid showTooltip />

          <ChartFooter>
            <Stat>
              <StatLabel>{t('bestiaryPlanner.progressHistory.chart.total')}</StatLabel>
              <StatValue>{statistics?.totalCharmPoints || 0} CP</StatValue>
            </Stat>
            <Stat>
              <StatLabel>{t('bestiaryPlanner.progressHistory.chart.dailyAverage')}</StatLabel>
              <StatValue>{statistics?.dailyAverage || 0} CP</StatValue>
            </Stat>
          </ChartFooter>
        </>
      ) : (
        <EmptyState>{t('bestiaryPlanner.progressHistory.chart.noData')}</EmptyState>
      )}
    </ChartContainer>
  );
};

export default ProgressChart;
