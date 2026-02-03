/**
 * CreatureCard Component
 * Displays individual creature information
 *
 * Performance: Memoized to prevent unnecessary re-renders
 * when parent updates but props haven't changed
 */

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getImageUrl, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';
import {
  Card,
  CompletedBadge,
  RapidBadge,
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
  RegionBadge,
  PlanButton,
  EditButton,
} from './CreatureCard.styles';

// Constants
const MAX_VISIBLE_LOCATIONS = 3;

const CreatureCard = ({
  creature,
  onToggleComplete,
  isCompleted,
  onTogglePlan,
  isInPlan,
  onEditKills,
}) => {
  const { t } = useTranslation();

  const handlePlanClick = (e) => {
    e.stopPropagation(); // Prevent card click
    onTogglePlan?.(creature.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card click
    onEditKills?.(creature.id);
  };

  const handleImageError = (e) => {
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to load image for ${creature.name}:`, creature.imageUrl);
    }
    // Set placeholder
    e.target.src = PLACEHOLDER_IMAGE;
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <Card $completed={isCompleted} onClick={() => onToggleComplete(creature.id)}>
      {isCompleted && (
        <CompletedBadge>
          ✓ {t('bestiaryPlanner.creature.completed')}
        </CompletedBadge>
      )}

      {creature.isRapidRecommended && (
        <RapidBadge>
          ⚡ {t('bestiaryPlanner.creature.rapidRecommended')}
        </RapidBadge>
      )}

      <CardTop>
        {creature.imageUrl && (
          <CreatureImage
            src={getImageUrl(creature.imageUrl)}
            alt={creature.name}
            loading="lazy"
            onError={handleImageError}
          />
        )}

        <CreatureInfo>
          <CardHeader>
            <CreatureName>{creature.name}</CreatureName>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {onEditKills && (
                <EditButton
                  onClick={handleEditClick}
                  aria-label={t('bestiaryPlanner.creature.editKills')}
                  title={t('bestiaryPlanner.creature.editKills')}
                >
                  ✎
                </EditButton>
              )}
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

          <LocationSection>
            <LocationLabel>{t('bestiaryPlanner.creature.locations')}</LocationLabel>
            {creature.killsRequired && (
              <Stat>
                <StatIcon>🎯</StatIcon>
                {creature.killsRequired} kills
              </Stat>
            )}
            <LocationList>
              {creature.locations.slice(0, MAX_VISIBLE_LOCATIONS).map((location, idx) => (
                <LocationChip key={idx}>{location}</LocationChip>
              ))}
              {creature.locations.length > MAX_VISIBLE_LOCATIONS && (
                <LocationChip>+{creature.locations.length - MAX_VISIBLE_LOCATIONS}</LocationChip>
              )}
            </LocationList>
          </LocationSection>
        </CreatureInfo>
      </CardTop>
    </Card>
  );
};

// Custom comparison function for memo
// Only re-render if creature id, isCompleted, isInPlan, or isRapidRecommended changed
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.creature.id === nextProps.creature.id &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.isInPlan === nextProps.isInPlan &&
    prevProps.creature.isRapidRecommended === nextProps.creature.isRapidRecommended
  );
};

CreatureCard.propTypes = {
  creature: PropTypes.shape({
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
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onTogglePlan: PropTypes.func,
  isInPlan: PropTypes.bool,
  onEditKills: PropTypes.func,
};

CreatureCard.defaultProps = {
  onTogglePlan: null,
  isInPlan: false,
  onEditKills: null,
};

export default memo(CreatureCard, areEqual);
