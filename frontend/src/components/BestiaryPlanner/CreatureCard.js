/**
 * CreatureCard Component
 * Displays individual creature information
 *
 * Performance: Memoized to prevent unnecessary re-renders
 * when parent updates but props haven't changed
 *
 * Feature 2 Update (Quick Actions Inline):
 * - Removed click handler from card (no longer toggles completion on click)
 * - Integrated CreatureCardActions component for explicit action buttons
 * - Added keyboard shortcuts support
 */

import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getImageUrl, PLACEHOLDER_IMAGE } from '../../utils/imageUtils';
import { calculateDisplayStatus, getStatusColor, getStatusI18nKey, BestiaryStatus } from '../../utils/bestiaryStatusUtils';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import CreatureCardActions from './CreatureCardActions';
import SelectionCheckbox from './SelectionCheckbox';
import {
  Card,
  StatusBadge,
  RapidBadge,
  CardTop,
  CardImageRow,
  CreatureImage,
  CardActions,
  CreatureName,
  CardStatsRow,
  CardDetails,
  CharmPointsBadge,
  Stat,
  StatIcon,
  DifficultyBadge,
  RegionBadge,
  ResistancesColumn,
  ResistanceItem,
  ResistanceIcon,
  ResistanceValue,
  KillsSection,
  LocationSection,
  LocationLabel,
  LocationList,
  LocationChip,
  LocationMore,
  LocationTooltip,
  TooltipLocationList,
} from './CreatureCard.styles';

// Constants
const MAX_VISIBLE_LOCATIONS = 2;

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
  selectionMode,
  isSelected,
  onToggleSelection,
}) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  // Keyboard shortcuts (Enter = complete, E = edit, P = plan)
  useKeyboardShortcuts({
    onComplete: () => onToggleComplete(creature.id),
    onEdit: onEditKills ? () => onEditKills(creature.id) : null,
    onPlan: onTogglePlan ? () => onTogglePlan(creature.id) : null,
    enabled: true,
    cardRef,
  });

  const handleImageError = (e) => {
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Failed to load image for ${creature.name}:`, creature.imageUrl);
    }
    // Set placeholder
    e.target.src = PLACEHOLDER_IMAGE;
    e.target.onerror = null; // Prevent infinite loop
  };

  // Helper to get all resistances
  const getAllResistances = () => {
    if (!creature.elementalResistances) return [];

    // Show ALL elements in fixed order (physical, fire, ice, energy, earth, holy, death)
    const elementOrder = ['physical', 'fire', 'ice', 'energy', 'earth', 'holy', 'death'];
    return elementOrder
      .map(element => [element, creature.elementalResistances[element] ?? 100])
      .filter(([_, value]) => value != null);
  };

  // Helper to render a single resistance item
  const renderResistanceItem = ([element, value]) => (
    <ResistanceItem key={element}>
      <ResistanceIcon>{ELEMENT_ICONS[element] || '🛡️'}</ResistanceIcon>
      <ResistanceValue $value={value}>{value}%</ResistanceValue>
    </ResistanceItem>
  );

  // Calculate display status
  const displayStatus = calculateDisplayStatus({
    isCompleted,
    currentKills: creature.currentKills,
    totalKills: creature.killsToComplete || 0,
  });

  // Get all resistances and split into 3 columns
  const allResistances = getAllResistances();
  const resistancesPerColumn = Math.ceil(allResistances.length / 3);
  const resistancesCol1 = allResistances.slice(0, resistancesPerColumn);
  const resistancesCol2 = allResistances.slice(resistancesPerColumn, resistancesPerColumn * 2);
  const resistancesCol3 = allResistances.slice(resistancesPerColumn * 2);

  return (
    <Card ref={cardRef} $completed={isCompleted} $selected={isSelected} tabIndex={0}>
      {/* Selection Checkbox (visible only in selection mode) */}
      {selectionMode && (
        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10 }}>
          <SelectionCheckbox
            checked={isSelected}
            onChange={() => onToggleSelection?.(creature.id)}
            ariaLabel={`Select ${creature.name}`}
          />
        </div>
      )}

      {/* Status Badge - Only show for In Progress (Complete is now shown via action button) */}
      {displayStatus.status === BestiaryStatus.IN_PROGRESS && (
        <StatusBadge $color={getStatusColor(displayStatus.status)}>
          {t(getStatusI18nKey(displayStatus.status), { stage: displayStatus.stage })}
        </StatusBadge>
      )}
      {/* Unknown badge removed - not useful for users */}

      {creature.isRapidRecommended && (
        <RapidBadge>
          ⚡ {t('bestiaryPlanner.creature.rapidRecommended')}
        </RapidBadge>
      )}

      <CardTop>
        {/* Linha 1: Imagem + Actions */}
        <CardImageRow>
          {creature.imageUrl && (
            <CreatureImage
              src={getImageUrl(creature.imageUrl)}
              alt={creature.name}
              loading="lazy"
              onError={handleImageError}
            />
          )}
          <CardActions>
            <CharmPointsBadge>{creature.charmPoints} CP</CharmPointsBadge>
            <CreatureCardActions
              onComplete={() => onToggleComplete(creature.id)}
              onEdit={onEditKills ? () => onEditKills(creature.id) : null}
              onPlan={onTogglePlan ? () => onTogglePlan(creature.id) : null}
              isCompleted={isCompleted}
              isInPlan={isInPlan}
            />
          </CardActions>
        </CardImageRow>

        {/* Nome */}
        <CreatureName>{creature.name}</CreatureName>

        {/* Dificuldade + Região */}
        <CardStatsRow>
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
        </CardStatsRow>

        {/* Kills tracking section */}
        {(creature.currentKills != null || creature.killsToComplete || creature.bestiaryStage) && (
          <KillsSection>
            {creature.currentKills != null && creature.killsToComplete && (
              <Stat>
                <StatIcon>🎯</StatIcon>
                {creature.currentKills} / {creature.killsToComplete} kills
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

        {/* Resistências em 3 colunas */}
        <CardDetails>
          <ResistancesColumn>
            {resistancesCol1.map(renderResistanceItem)}
          </ResistancesColumn>

          <ResistancesColumn>
            {resistancesCol2.map(renderResistanceItem)}
          </ResistancesColumn>

          <ResistancesColumn>
            {resistancesCol3.map(renderResistanceItem)}
          </ResistancesColumn>
        </CardDetails>

        {/* Locations - horizontal single line with tooltip */}
        {creature.locations && creature.locations.length > 0 && (
          <LocationSection>
            <LocationLabel>📍</LocationLabel>
            <LocationList>
              {creature.locations.slice(0, MAX_VISIBLE_LOCATIONS).map((location, index) => (
                <LocationChip key={index}>{location}</LocationChip>
              ))}
            </LocationList>
            {creature.locations.length > MAX_VISIBLE_LOCATIONS && (
              <>
                <LocationMore title={creature.locations.slice(MAX_VISIBLE_LOCATIONS).join(', ')}>
                  +{creature.locations.length - MAX_VISIBLE_LOCATIONS}
                </LocationMore>
                <LocationTooltip>
                  <TooltipLocationList>
                    {creature.locations.slice(MAX_VISIBLE_LOCATIONS).map((location, index) => (
                      <div key={index}>• {location}</div>
                    ))}
                  </TooltipLocationList>
                </LocationTooltip>
              </>
            )}
          </LocationSection>
        )}
      </CardTop>
    </Card>
  );
};

// Custom comparison function for memo
// Only re-render if creature id, isCompleted, isInPlan, isRapidRecommended, or selection changed
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.creature.id === nextProps.creature.id &&
    prevProps.isCompleted === nextProps.isCompleted &&
    prevProps.isInPlan === nextProps.isInPlan &&
    prevProps.creature.isRapidRecommended === nextProps.creature.isRapidRecommended &&
    prevProps.selectionMode === nextProps.selectionMode &&
    prevProps.isSelected === nextProps.isSelected
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
  selectionMode: PropTypes.bool,
  isSelected: PropTypes.bool,
  onToggleSelection: PropTypes.func,
};

CreatureCard.defaultProps = {
  onTogglePlan: null,
  isInPlan: false,
  onEditKills: null,
  selectionMode: false,
  isSelected: false,
  onToggleSelection: null,
};

export default memo(CreatureCard, areEqual);
