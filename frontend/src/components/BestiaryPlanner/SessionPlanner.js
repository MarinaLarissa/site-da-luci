/**
 * SessionPlanner Component
 * Displays and manages the hunt session plan (creatures selected for current hunt)
 */

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PlannerPanel,
  PlannerHeader,
  PlannerTitle,
  PlannerActions,
  ClearButton,
  PlannerList,
  PlannerItem,
  CreatureInfo,
  CreatureName,
  CreatureStats,
  RemoveButton,
  EmptyState,
  EmptyIcon,
  EmptyText,
  StatsFooter,
  StatItem,
  StatLabel,
  StatValue,
} from './SessionPlanner.styles';

const SessionPlanner = ({ creatures, characterId, onRemoveCreature, onClearPlan }) => {
  const { t } = useTranslation();

  // Calculate totals
  const totalCharmPoints = creatures.reduce((sum, c) => sum + (c.charmPoints || 0), 0);
  const totalHours = creatures.reduce((sum, c) => sum + (c.estimatedHours || 0), 0);

  return (
    <PlannerPanel>
      <PlannerHeader>
        <PlannerTitle>📅 {t('bestiaryPlanner.sessionPlanner.title')}</PlannerTitle>
        {creatures.length > 0 && (
          <PlannerActions>
            <ClearButton onClick={onClearPlan}>
              {t('bestiaryPlanner.sessionPlanner.clearButton')}
            </ClearButton>
          </PlannerActions>
        )}
      </PlannerHeader>

      {creatures.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyText>{t('bestiaryPlanner.sessionPlanner.emptyState')}</EmptyText>
        </EmptyState>
      ) : (
        <>
          <PlannerList>
            {creatures.map((creature) => (
              <PlannerItem key={creature.id}>
                <CreatureInfo>
                  <CreatureName>{creature.name}</CreatureName>
                  <CreatureStats>
                    {creature.charmPoints} CP • {creature.estimatedHours}h
                  </CreatureStats>
                </CreatureInfo>
                <RemoveButton
                  onClick={() => onRemoveCreature(creature.id)}
                  aria-label={t('bestiaryPlanner.sessionPlanner.removeAria', { name: creature.name })}
                >
                  ✕
                </RemoveButton>
              </PlannerItem>
            ))}
          </PlannerList>

          <StatsFooter>
            <StatItem>
              <StatLabel>{t('bestiaryPlanner.sessionPlanner.totalCreatures')}</StatLabel>
              <StatValue>{creatures.length}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>{t('bestiaryPlanner.sessionPlanner.totalCharmPoints')}</StatLabel>
              <StatValue>{totalCharmPoints} CP</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>{t('bestiaryPlanner.sessionPlanner.totalTime')}</StatLabel>
              <StatValue>{totalHours.toFixed(1)}h</StatValue>
            </StatItem>
          </StatsFooter>
        </>
      )}
    </PlannerPanel>
  );
};

export default memo(SessionPlanner);
