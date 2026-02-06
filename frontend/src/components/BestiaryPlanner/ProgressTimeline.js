import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProgressData } from '../../hooks/useProgressData';
import {
  TimelineContainer,
  TimelineHeader,
  Title,
  TimelineList,
  DateGroup,
  DateHeader,
  DateLabel,
  DateStats,
  CompletionsList,
  CompletionItem,
  CompletionDot,
  CompletionContent,
  CreatureName,
  CompletionMeta,
  CharmPointsBadge,
  LoadMoreButton,
  EmptyState,
} from './ProgressTimeline.styles';

/**
 * ProgressTimeline Component
 * Vertical timeline of completions grouped by date
 * Feature 4: Progress History
 */
const ProgressTimeline = ({ characterId }) => {
  const { t } = useTranslation();
  const [displayLimit, setDisplayLimit] = useState(50);
  const { timeline, isLoading } = useProgressData(characterId, 'all');

  if (isLoading) {
    return (
      <TimelineContainer>
        <EmptyState>Loading timeline...</EmptyState>
      </TimelineContainer>
    );
  }

  if (!timeline || timeline.length === 0) {
    return (
      <TimelineContainer>
        <EmptyState>{t('bestiaryPlanner.progressHistory.timeline.noData')}</EmptyState>
      </TimelineContainer>
    );
  }

  // Group completions by date and apply display limit
  const displayedTimeline = timeline.slice(0, displayLimit);
  const hasMore = timeline.length > displayLimit;

  // Format date label
  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateKey = date.toISOString().split('T')[0];
    const todayKey = today.toISOString().split('T')[0];
    const yesterdayKey = yesterday.toISOString().split('T')[0];

    if (dateKey === todayKey) return t('bestiaryPlanner.progressHistory.timeline.today');
    if (dateKey === yesterdayKey) return t('bestiaryPlanner.progressHistory.timeline.yesterday');

    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const loadMore = () => {
    setDisplayLimit((prev) => prev + 50);
  };

  return (
    <TimelineContainer>
      <TimelineHeader>
        <Title>{t('bestiaryPlanner.progressHistory.timeline.title')}</Title>
      </TimelineHeader>

      <TimelineList>
        {displayedTimeline.map(({ date, completions }) => (
          <DateGroup key={date}>
            <DateHeader>
              <DateLabel>{formatDateLabel(date)}</DateLabel>
              <DateStats>
                {completions.length} {t('bestiaryPlanner.progressHistory.timeline.completions')}
              </DateStats>
            </DateHeader>

            <CompletionsList>
              {completions.map((completion, idx) => (
                <CompletionItem key={`${completion.id}-${completion.completedAt}-${idx}`}>
                  <CompletionDot />
                  <CompletionContent>
                    <CreatureName>{completion.name}</CreatureName>
                    <CompletionMeta>
                      {completion.charmPoints} CP · {formatTime(completion.completedAt)}
                    </CompletionMeta>
                  </CompletionContent>
                  <CharmPointsBadge>{completion.charmPoints}</CharmPointsBadge>
                </CompletionItem>
              ))}
            </CompletionsList>
          </DateGroup>
        ))}
      </TimelineList>

      {hasMore && (
        <LoadMoreButton onClick={loadMore}>
          {t('bestiaryPlanner.progressHistory.timeline.loadMore')}
        </LoadMoreButton>
      )}
    </TimelineContainer>
  );
};

export default ProgressTimeline;
