/**
 * SetStatsPanel - Displays the summed stats of the current equipment set
 */

import { useMemo } from 'react';
import { calculateSetStats, STAT_LABELS, STAT_KEYS } from '../../data/equipment';
import {
  Card,
  CardTitle,
  StatsGrid,
  StatRow,
  StatLabel,
  StatValue,
} from './CharacterSetBuilder.styles';

export default function SetStatsPanel({ equipment }) {
  const stats = useMemo(() => calculateSetStats(equipment || {}), [equipment]);

  const displayStats = STAT_KEYS.filter((key) => stats[key] > 0);

  return (
    <Card>
      <CardTitle>Set Stats</CardTitle>
      {displayStats.length === 0 ? (
        <div style={{ color: '#6b7280', fontSize: '0.82rem', textAlign: 'center', padding: '0.5rem 0' }}>
          Equip items to see stats
        </div>
      ) : (
        <StatsGrid>
          {displayStats.map((key) => (
            <StatRow key={key}>
              <StatLabel>{STAT_LABELS[key]}</StatLabel>
              <StatValue $value={stats[key]}>+{stats[key]}</StatValue>
            </StatRow>
          ))}
        </StatsGrid>
      )}
    </Card>
  );
}
