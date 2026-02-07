/**
 * Shared Page Header Components
 * Used by all main pages (SoloHuntAnalyzer, LootSplitCalculator, etc.)
 * to ensure 100% identical styling and spacing
 */

import styled from 'styled-components';

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const PageHeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const PageHeaderDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  margin: 0;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
