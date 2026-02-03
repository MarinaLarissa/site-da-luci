/**
 * SessionPlanner Component
 * Displays and manages the hunt session plan (creatures selected for current hunt)
 */

import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodayStats } from '../../services/dailyProgressStorage';
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
  TodaySummary,
  TodayTitle,
  TodayCreatureList,
  TodayCreatureItem,
} from './SessionPlanner.styles';

const SessionPlanner = ({ creatures, characterId, onRemoveCreature, onClearPlan, onCompleteCreature }) => {
  const { t } = useTranslation();
  const [todayStats, setTodayStats] = useState({ count: 0, totalCharmPoints: 0, creatures: [] });

  // Load today's stats
  useEffect(() => {
    if (characterId) {
      const stats = getTodayStats(characterId);
      setTodayStats(stats);
    }
  }, [characterId, creatures]); // Re-load when creatures change (after completion)

  // Calculate totals
  const totalCharmPoints = creatures.reduce((sum, c) => sum + (c.charmPoints || 0), 0);
  const totalHours = creatures.reduce((sum, c) => sum + (c.estimatedHours || 0), 0);

  return (
    <PlannerPanel>
      <PlannerHeader>
        <PlannerTitle>📅 {t('bestiaryPlanner.sessionPlanner.title')}</PlannerTitle>
        {(creatures.length > 0 || todayStats.count > 0) && (
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
                <CreatureInfo onClick={() => onCompleteCreature?.(creature.id)}>
                  <CreatureName>{creature.name}</CreatureName>
                  <CreatureStats>
                    {creature.charmPoints} CP • {creature.estimatedHours}h
                  </CreatureStats>
                </CreatureInfo>
                <RemoveButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCreature(creature.id);
                  }}
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

      {/* Today's Completions Summary */}
      {todayStats.count > 0 && (
        <TodaySummary>
          <TodayTitle>
            ✅ {t('bestiaryPlanner.sessionPlanner.todayCompleted')}
          </TodayTitle>
          <StatsFooter style={{ paddingTop: '0.5rem', borderTop: 'none' }}>
            <StatItem>
              <StatLabel>{t('bestiaryPlanner.sessionPlanner.completedToday')}</StatLabel>
              <StatValue>{todayStats.count}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>{t('bestiaryPlanner.sessionPlanner.pointsEarned')}</StatLabel>
              <StatValue>{todayStats.totalCharmPoints} CP</StatValue>
            </StatItem>
          </StatsFooter>
          {todayStats.creatures.length > 0 && (
            <TodayCreatureList>
              {todayStats.creatures.map((creature, idx) => (
                <TodayCreatureItem key={`${creature.id}-${idx}`}>
                  {creature.name} <span>+{creature.charmPoints} CP</span>
                </TodayCreatureItem>
              ))}
            </TodayCreatureList>
          )}
        </TodaySummary>
      )}
    </PlannerPanel>
  );
};

export default memo(SessionPlanner);
