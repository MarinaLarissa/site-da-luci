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

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

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
