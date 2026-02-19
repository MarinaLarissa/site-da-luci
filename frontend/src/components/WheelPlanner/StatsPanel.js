/**
 * Stats Panel Component
 * Displays calculated stats from the current build
 */

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card, CardTitle, Divider } from './WheelPlanner.styles';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  padding: 0.75rem;
  background: #111827;
  border-radius: 0.375rem;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => {
    if (props.$positive && props.$value > 0) return '#10b981';
    if (props.$value > 0) return '#667eea';
    return '#6b7280';
  }};
`;

const ResistancesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ResistanceBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ResistanceIcon = styled.span`
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
`;

const ResistanceInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResistanceName = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
  text-transform: capitalize;
`;

const ResistanceValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$value > 0 ? '#10b981' : '#6b7280'};
`;

const ResistanceProgress = styled.div`
  height: 6px;
  background: #1f2937;
  border-radius: 3px;
  margin-top: 0.25rem;
  overflow: hidden;
`;

const ResistanceProgressFill = styled.div`
  height: 100%;
  width: ${props => Math.min(props.$value * 2, 100)}%; /* Scale: 50% resistance = 100% bar */
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s;
`;

const SpellsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SpellItem = styled.div`
  padding: 0.75rem;
  background: #111827;
  border: 1px solid #667eea;
  border-radius: 0.375rem;
  color: #e5e7eb;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SpellIcon = styled.span`
  font-size: 1.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const RESISTANCE_ICONS = {
  physical: '⚔️',
  fire: '🔥',
  ice: '❄️',
  energy: '⚡',
  earth: '🌿',
  holy: '✨',
  death: '💀',
};

const fmt = (v, decimals = 0) =>
  v > 0 ? `+${v.toFixed(decimals)}` : v.toFixed(decimals);

const StatsPanel = ({ build }) => {
  const { t } = useTranslation();

  if (!build || !build.stats) {
    return (
      <Card>
        <CardTitle>📊 {t('wheelPlanner.stats.title') || 'Stats'}</CardTitle>
        <EmptyState>{t('wheelPlanner.stats.empty') || 'No stats to display'}</EmptyState>
      </Card>
    );
  }

  const { stats } = build;

  const rows = [
    { label: 'HP',               value: stats.hp,         decimals: 0 },
    { label: 'Mana',             value: stats.mana,        decimals: 0 },
    { label: 'Capacity',         value: stats.capacity,    decimals: 0 },
    { label: 'HP Regen Burst',   value: stats.hpRegen,     decimals: 1, suffix: '%' },
    { label: 'MP Regen Burst',   value: stats.manaRegen,   decimals: 1, suffix: '%' },
    { label: 'Mitigation',       value: stats.mitigation,  decimals: 2, suffix: '%' },
  ];

  const hasAny = rows.some((r) => r.value > 0);

  return (
    <Card>
      <CardTitle>📊 {t('wheelPlanner.stats.title') || 'Stats'}</CardTitle>

      {!hasAny ? (
        <EmptyState>Aloque pontos na roda para ver os stats acumulados.</EmptyState>
      ) : (
        <StatsGrid>
          {rows.filter((r) => r.value > 0).map(({ label, value, decimals, suffix = '' }) => (
            <StatItem key={label}>
              <StatLabel>{label}</StatLabel>
              <StatValue $positive $value={value}>
                {fmt(value, decimals)}{suffix}
              </StatValue>
            </StatItem>
          ))}
        </StatsGrid>
      )}

      <Divider />
      <EmptyState style={{ fontSize: '0.72rem', padding: '0.5rem' }}>
        Stats de Dedication Perks (por ponto). Conviction e Revelation Perks são exibidos no painel da roda.
      </EmptyState>
    </Card>
  );
};

export default StatsPanel;
