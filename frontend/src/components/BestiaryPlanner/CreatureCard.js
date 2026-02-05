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
import { calculateDisplayStatus, getStatusColor, getStatusI18nKey, BestiaryStatus } from '../../utils/bestiaryStatusUtils';
import {
  Card,
  CompletedBadge,
  StatusBadge,
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
  ResistancesRow,
  ResistanceItem,
  ResistanceIcon,
  ResistanceValue,
  KillsSection,
} from './CreatureCard.styles';

// Constants
const MAX_VISIBLE_LOCATIONS = 3;

// Elemental resistance icons mapping
const ELEMENT_ICONS = {
  physical: '⚔️',
  fire: '🔥',
  ice: '❄️',
  energy: '⚡',
  earth: '🌿',
  holy: '✨',
  death: '💀',
};

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

  // Helper to render elemental resistances
  const renderResistances = () => {
    if (!creature.elementalResistances) return null;

    // Show ALL elements in fixed order (physical, fire, ice, energy, earth, holy, death)
    const elementOrder = ['physical', 'fire', 'ice', 'energy', 'earth', 'holy', 'death'];
    const allResistances = elementOrder
      .map(element => [element, creature.elementalResistances[element] ?? 100])
      .filter(([_, value]) => value != null);

    if (allResistances.length === 0) return null;

    return (
      <ResistancesRow>
        {allResistances.map(([element, value]) => (
          <ResistanceItem key={element}>
            <ResistanceIcon>{ELEMENT_ICONS[element] || '🛡️'}</ResistanceIcon>
            <ResistanceValue $value={value}>{value}%</ResistanceValue>
          </ResistanceItem>
        ))}
      </ResistancesRow>
    );
  };

  // Calculate display status
  const displayStatus = calculateDisplayStatus({
    isCompleted,
    currentKills: creature.currentKills,
    totalKills: creature.occurrence || creature.killsToComplete || 0,
  });

  return (
    <Card $completed={isCompleted} onClick={() => onToggleComplete(creature.id)}>
      {/* Status Badge */}
      {displayStatus.status === BestiaryStatus.COMPLETE && (
        <StatusBadge $color={getStatusColor(displayStatus.status)}>
          ✓ {t(getStatusI18nKey(displayStatus.status))}
        </StatusBadge>
      )}
      {displayStatus.status === BestiaryStatus.IN_PROGRESS && (
        <StatusBadge $color={getStatusColor(displayStatus.status)}>
          {t(getStatusI18nKey(displayStatus.status), { stage: displayStatus.stage })}
        </StatusBadge>
      )}
      {displayStatus.status === BestiaryStatus.UNKNOWN && (
        <StatusBadge $color={getStatusColor(displayStatus.status)}>
          ? {t(getStatusI18nKey(displayStatus.status))}
        </StatusBadge>
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
              <StatIcon>⚔️</StatIcon>
              <DifficultyBadge $difficulty={creature.difficulty}>
                {t(`bestiaryPlanner.difficulty.${creature.difficulty.toLowerCase()}`)}
              </DifficultyBadge>
            </Stat>
            <Stat>
              <StatIcon>📍</StatIcon>
              <RegionBadge>{creature.region}</RegionBadge>
            </Stat>
            {creature.hitpoints && (
              <Stat>
                <StatIcon>❤️</StatIcon>
                {creature.hitpoints.toLocaleString()} HP
              </Stat>
            )}
          </StatsRow>

          {renderResistances()}

          {/* Kills tracking section */}
          {(creature.currentKills != null || creature.killsToComplete || creature.bestiaryStage) && (
            <KillsSection>
              {creature.currentKills != null && (
                <Stat>
                  <StatIcon>🎯</StatIcon>
                  {creature.currentKills} / {creature.killsToComplete || '?'} kills
                </Stat>
              )}
              {creature.currentKills == null && creature.killsToComplete && (
                <Stat>
                  <StatIcon>🎯</StatIcon>
                  {creature.killsToComplete} kills {t('bestiaryPlanner.creature.toComplete')}
                </Stat>
              )}
              {creature.bestiaryStage && (
                <Stat>
                  <StatIcon>📊</StatIcon>
                  {creature.bestiaryStageComplete ? (
                    <span style={{ color: '#10b981' }}>✓ 3/3 {t('bestiaryPlanner.creature.complete')}</span>
                  ) : (
                    <span>{creature.bestiaryStage}/3 {t('bestiaryPlanner.creature.progress')}</span>
                  )}
                </Stat>
              )}
            </KillsSection>
          )}

          <LocationSection>
            <LocationLabel>{t('bestiaryPlanner.creature.locations')}</LocationLabel>
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
    difficulty: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string,
    isRapidRecommended: PropTypes.bool,
    hitpoints: PropTypes.number,
    elementalResistances: PropTypes.shape({
      physical: PropTypes.number,
      fire: PropTypes.number,
      ice: PropTypes.number,
      energy: PropTypes.number,
      earth: PropTypes.number,
      holy: PropTypes.number,
      death: PropTypes.number,
    }),
    currentKills: PropTypes.number,
    killsToComplete: PropTypes.number,
    bestiaryStage: PropTypes.number, // 1, 2, or 3 (from OCR or manual)
    bestiaryStageComplete: PropTypes.bool, // true if stage 3 (complete)
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
