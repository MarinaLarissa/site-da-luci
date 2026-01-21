/**
 * Styled components for DamageHealingSection
 * Migrated from DamageHealingSection.css
 */

import styled from 'styled-components';

export const DamageHealingSectionContainer = styled.div`
  margin-top: 2rem;
`;

export const DamageHealingSectionSubtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent.gold};

  /* Responsive adjustments */
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const DamageHealingSectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  /* Responsive adjustments */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
