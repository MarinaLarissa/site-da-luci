/**
 * SuggestionList Component
 * Displays list of suggested creatures to hunt
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreatureCard from './CreatureCard';
import {
  ListContainer,
  ListHeader,
  ListTitle,
  ResultsCount,
  CreatureGrid,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  LoadMoreButton,
} from './SuggestionList.styles';

const SuggestionList = ({
  suggestions,
  onToggleComplete,
  onTogglePlan,
  isCreatureInPlan,
  isCreatureCompleted,
  character,
}) => {
  const { t } = useTranslation();
  const [displayCount, setDisplayCount] = useState(20);

  const displayedSuggestions = suggestions.slice(0, displayCount);
  const hasMore = suggestions.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 20);
  };

  if (suggestions.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyIcon>🎉</EmptyIcon>
          <EmptyTitle>{t('bestiaryPlanner.suggestions.empty.title')}</EmptyTitle>
          <EmptyText>{t('bestiaryPlanner.suggestions.empty.description')}</EmptyText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>{t('bestiaryPlanner.suggestions.title')}</ListTitle>
        <ResultsCount>
          {t('bestiaryPlanner.suggestions.count', { count: suggestions.length })}
        </ResultsCount>
      </ListHeader>

      <CreatureGrid>
        {displayedSuggestions.map((creature) => (
          <CreatureCard
            key={creature.id}
            creature={creature}
            onToggleComplete={onToggleComplete}
            onTogglePlan={onTogglePlan}
            isInPlan={isCreatureInPlan?.(creature.id) || false}
            isCompleted={isCreatureCompleted(creature.id)}
          />
        ))}
      </CreatureGrid>

      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore}>
          {t('bestiaryPlanner.suggestions.loadMore', { count: Math.min(20, suggestions.length - displayCount) })}
        </LoadMoreButton>
      )}
    </ListContainer>
  );
};

export default SuggestionList;
