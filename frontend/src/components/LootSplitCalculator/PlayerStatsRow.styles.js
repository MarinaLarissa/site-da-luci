/**
 * Styled components for PlayerStatsRow
 * Migrated from PlayerStatsRow.css
 */

import styled from 'styled-components';

export const StatsRowContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  /* Mobile: hide PlayerStatsRow, use separate sections instead */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const PlayerCardWrapper = styled.div`
  flex: 1;
  padding-left: 2rem; /* Left indentation as requested */
`;

export const DamageHealingCardWrapper = styled.div`
  flex: 1;
`;
