/**
 * Shared Page Container Component
 * Used by both SoloHuntAnalyzer and LootSplitCalculator
 * to ensure 100% identical sizing and spacing
 */

import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.sm};

  /* Responsive - Expand on larger screens */
  @media (min-width: 1920px) {
    max-width: 1850px;
    padding: ${({ theme }) => theme.spacing.md};
  }

  /* Responsive - Smaller screens */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
