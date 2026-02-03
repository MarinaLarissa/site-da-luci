/**
 * CreatureCard Component
 * Displays individual creature information
 *
 * Performance: Memoized to prevent unnecessary re-renders
 * when parent updates but props haven't changed
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CompletedBadge,
  CardHeader,
  CreatureName,
  CharmPointsBadge,
  StatsRow,
  Stat,
  StatIcon,
  DifficultyBadge,
  LocationSection,
  LocationLabel,
  LocationList,
  LocationChip,
  EfficiencyScore,
  EfficiencyLabel,
  EfficiencyValue,
  RegionBadge,
} from './CreatureCard.styles';

const CreatureCard = ({ creature, onToggleComplete, isCompleted }) => {
  const { t } = useTranslation();

  return (
    <Card $completed={isCompleted} onClick={() => onToggleComplete(creature.id)}>
      {isCompleted && (
        <CompletedBadge>
          ✓ {t('bestiaryPlanner.creature.completed')}
        </CompletedBadge>
      )}

      <CardHeader>
        <CreatureName>{creature.name}</CreatureName>
        <CharmPointsBadge>{creature.charmPoints} CP</CharmPointsBadge>
      </CardHeader>

      <StatsRow>
        <Stat>
          <StatIcon>⏱️</StatIcon>
          {creature.estimatedHours}h
        </Stat>
        <Stat>
          <StatIcon>⚔️</StatIcon>
          <DifficultyBadge $difficulty={creature.difficulty}>
            {t(`bestiaryPlanner.difficulty.${creature.difficulty.toLowerCase()}`)}
          </DifficultyBadge>
        </Stat>
        <Stat>
          <StatIcon>📍</StatIcon>
          <RegionBadge>{creature.region}</RegionBadge>
        </Stat>
        <Stat>
          <StatIcon>🎯</StatIcon>
          Lvl {creature.recommendedLevel}+
        </Stat>
      </StatsRow>

      {creature.efficiencyScore && (
        <EfficiencyScore>
          <EfficiencyLabel>{t('bestiaryPlanner.creature.efficiency')}</EfficiencyLabel>
          <EfficiencyValue>{creature.efficiencyScore.toFixed(2)}</EfficiencyValue>
        </EfficiencyScore>
      )}

      <LocationSection>
        <LocationLabel>{t('bestiaryPlanner.creature.locations')}</LocationLabel>
        <LocationList>
          {creature.locations.slice(0, 3).map((location, idx) => (
            <LocationChip key={idx}>{location}</LocationChip>
          ))}
          {creature.locations.length > 3 && (
            <LocationChip>+{creature.locations.length - 3}</LocationChip>
          )}
        </LocationList>
      </LocationSection>
    </Card>
  );
};

// Custom comparison function for memo
// Only re-render if creature id, isCompleted, or efficiencyScore changed
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.creature.id === nextProps.creature.id &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.creature.efficiencyScore === nextProps.creature.efficiencyScore
  );
};

export default memo(CreatureCard, areEqual);
