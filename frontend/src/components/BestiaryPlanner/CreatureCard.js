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
  CardTop,
  CreatureImage,
  CreatureInfo,
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
  PlanButton,
} from './CreatureCard.styles';

const CreatureCard = ({
  creature,
  onToggleComplete,
  isCompleted,
  onTogglePlan,
  isInPlan,
}) => {
  const { t } = useTranslation();

  const handlePlanClick = (e) => {
    e.stopPropagation(); // Prevent card click
    onTogglePlan?.(creature.id);
  };

  return (
    <Card $completed={isCompleted} onClick={() => onToggleComplete(creature.id)}>
      {isCompleted && (
        <CompletedBadge>
          ✓ {t('bestiaryPlanner.creature.completed')}
        </CompletedBadge>
      )}

      <CardTop>
        {creature.imageUrl && (
          <CreatureImage
            src={creature.imageUrl}
            alt={creature.name}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        <CreatureInfo>
          <CardHeader>
            <CreatureName>{creature.name}</CreatureName>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {onTogglePlan && (
                <PlanButton
                  onClick={handlePlanClick}
                  $isInPlan={isInPlan}
                  aria-label={
                    isInPlan
                      ? t('bestiaryPlanner.sessionPlanner.removeFromPlan')
                      : t('bestiaryPlanner.sessionPlanner.addToPlan')
                  }
                >
                  {isInPlan ? '✓' : '+'}
                </PlanButton>
              )}
              <CharmPointsBadge>{creature.charmPoints} CP</CharmPointsBadge>
            </div>
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
        </CreatureInfo>
      </CardTop>
    </Card>
  );
};

// Custom comparison function for memo
// Only re-render if creature id, isCompleted, efficiencyScore, or isInPlan changed
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.creature.id === nextProps.creature.id &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.isInPlan === nextProps.isInPlan &&
    prevProps.creature.efficiencyScore === nextProps.creature.efficiencyScore
  );
};

export default memo(CreatureCard, areEqual);
