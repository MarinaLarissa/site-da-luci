/**
 * Shared Input Card Component
 * Used by both SoloHuntAnalyzer and LootSplitCalculator
 * to ensure 100% identical sizing and styling
 */

import styled from 'styled-components';

export const InputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  /* Responsive - Expand padding on larger screens */
  @media (min-width: 1400px) {
    padding: ${({ theme }) => theme.spacing.xxl};
  }

  /* Responsive - Smaller screens */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;
