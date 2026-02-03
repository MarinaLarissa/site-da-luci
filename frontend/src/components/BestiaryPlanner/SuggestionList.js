/**
 * SuggestionList Component
 * Displays list of suggested creatures to hunt
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
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
  onEditKills,
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
            onEditKills={onEditKills}
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

SuggestionList.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      charmPoints: PropTypes.number.isRequired,
      estimatedHours: PropTypes.number.isRequired,
      difficulty: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      recommendedLevel: PropTypes.number.isRequired,
      locations: PropTypes.arrayOf(PropTypes.string).isRequired,
      imageUrl: PropTypes.string,
      isRapidRecommended: PropTypes.bool,
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onTogglePlan: PropTypes.func,
  onEditKills: PropTypes.func,
  isCreatureInPlan: PropTypes.func,
  isCreatureCompleted: PropTypes.func.isRequired,
  character: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  }),
};

SuggestionList.defaultProps = {
  onTogglePlan: null,
  onEditKills: null,
  isCreatureInPlan: null,
  character: null,
};

export default SuggestionList;
