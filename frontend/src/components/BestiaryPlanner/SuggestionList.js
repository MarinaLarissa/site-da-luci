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
  selectionMode,
  isCreatureSelected,
  onToggleSelection,
  onSelectAll,
  onSelectNone,
  onEnterSelectionMode,
  onToggleCompare,
  isCreatureInComparison,
  compareDisabled,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <ListTitle>{t('bestiaryPlanner.suggestions.title')}</ListTitle>
          <ResultsCount>
            {t('bestiaryPlanner.suggestions.count', { count: suggestions.length })}
          </ResultsCount>
        </div>

        {/* Selection controls */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {!selectionMode && onEnterSelectionMode && suggestions.length > 0 && (
            <button
              onClick={onEnterSelectionMode}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #764ba2, #667eea)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {t('bestiaryPlanner.selection.enterMode')}
            </button>
          )}

          {selectionMode && (
            <>
              <button
                onClick={onSelectAll}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#374151',
                  color: '#e5e7eb',
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#4b5563';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#374151';
                }}
              >
                {t('bestiaryPlanner.selection.selectAll')}
              </button>

              <button
                onClick={onSelectNone}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  color: '#9ca3af',
                  border: '1px solid #4b5563',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#374151';
                  e.target.style.color = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#9ca3af';
                }}
              >
                {t('bestiaryPlanner.selection.selectNone')}
              </button>
            </>
          )}
        </div>
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
            selectionMode={selectionMode}
            isSelected={isCreatureSelected?.(creature.id) || false}
            onToggleSelection={onToggleSelection}
            onToggleCompare={onToggleCompare}
            isInComparison={isCreatureInComparison?.(creature.id) || false}
            compareDisabled={compareDisabled && !isCreatureInComparison?.(creature.id)}
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
      difficulty: PropTypes.string.isRequired,
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
  selectionMode: PropTypes.bool,
  isCreatureSelected: PropTypes.func,
  onToggleSelection: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectNone: PropTypes.func,
  onEnterSelectionMode: PropTypes.func,
  onToggleCompare: PropTypes.func,
  isCreatureInComparison: PropTypes.func,
  compareDisabled: PropTypes.bool,
};

SuggestionList.defaultProps = {
  onTogglePlan: null,
  onEditKills: null,
  isCreatureInPlan: null,
  character: null,
  selectionMode: false,
  isCreatureSelected: null,
  onToggleSelection: null,
  onSelectAll: null,
  onSelectNone: null,
  onEnterSelectionMode: null,
  onToggleCompare: null,
  isCreatureInComparison: null,
  compareDisabled: false,
};

export default SuggestionList;
