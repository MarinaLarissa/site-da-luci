import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProgressData } from '../../hooks/useProgressData';
import {
  StatisticsContainer,
  StatisticsHeader,
  Title,
  Subtitle,
  StatisticsGrid,
  StatCard,
  StatIcon,
  StatLabel,
  StatValue,
  StatUnit,
  EmptyState,
} from './ProgressStatistics.styles';

/**
 * ProgressStatistics Component
 * Aggregated statistics cards
 * Feature 4: Progress History
 */
const ProgressStatistics = ({ characterId }) => {
  const { t } = useTranslation();
  const { statistics, isLoading } = useProgressData(characterId, '30d');

  if (isLoading) {
    return (
      <StatisticsContainer>
        <EmptyState>Loading statistics...</EmptyState>
      </StatisticsContainer>
    );
  }

  if (!statistics || statistics.totalCompletions === 0) {
    return (
      <StatisticsContainer>
        <EmptyState>{t('bestiaryPlanner.progressHistory.statistics.noData')}</EmptyState>
      </StatisticsContainer>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <StatisticsContainer>
      <StatisticsHeader>
        <Title>{t('bestiaryPlanner.progressHistory.statistics.title')}</Title>
        <Subtitle>{t('bestiaryPlanner.progressHistory.statistics.subtitle')}</Subtitle>
      </StatisticsHeader>

      <StatisticsGrid>
        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatLabel>{t('bestiaryPlanner.progressHistory.statistics.dailyAverage')}</StatLabel>
          <StatValue>{statistics.dailyAverage}</StatValue>
          <StatUnit>{t('bestiaryPlanner.progressHistory.statistics.dailyAverageUnit')}</StatUnit>
        </StatCard>

        <StatCard>
          <StatIcon>🔥</StatIcon>
          <StatLabel>{t('bestiaryPlanner.progressHistory.statistics.maxStreak')}</StatLabel>
          <StatValue>{statistics.streak.max}</StatValue>
          <StatUnit>{t('bestiaryPlanner.progressHistory.statistics.maxStreakUnit')}</StatUnit>
        </StatCard>

        <StatCard>
          <StatIcon>💪</StatIcon>
          <StatLabel>{t('bestiaryPlanner.progressHistory.statistics.currentStreak')}</StatLabel>
          <StatValue>{statistics.streak.current}</StatValue>
          <StatUnit>{t('bestiaryPlanner.progressHistory.statistics.maxStreakUnit')}</StatUnit>
        </StatCard>

        <StatCard>
          <StatIcon>⭐</StatIcon>
          <StatLabel>
            {t('bestiaryPlanner.progressHistory.statistics.mostProductiveDay')}
          </StatLabel>
          <StatValue>
            {statistics.mostProductiveDay ? statistics.mostProductiveDay.count : 0}
          </StatValue>
          <StatUnit>
            {statistics.mostProductiveDay
              ? formatDate(statistics.mostProductiveDay.date)
              : '-'}
          </StatUnit>
        </StatCard>

        <StatCard>
          <StatIcon>💎</StatIcon>
          <StatLabel>
            {t('bestiaryPlanner.progressHistory.statistics.totalCharmPoints')}
          </StatLabel>
          <StatValue>{statistics.totalCharmPoints}</StatValue>
          <StatUnit>
            {t('bestiaryPlanner.progressHistory.statistics.totalCharmPointsUnit')}
          </StatUnit>
        </StatCard>

        <StatCard>
          <StatIcon>📈</StatIcon>
          <StatLabel>Total Completions</StatLabel>
          <StatValue>{statistics.totalCompletions}</StatValue>
          <StatUnit>in last 30 days</StatUnit>
        </StatCard>
      </StatisticsGrid>
    </StatisticsContainer>
  );
};

export default ProgressStatistics;
