/**
 * Styled components for SoloHuntResults
 * Migrated from SoloHuntResults.css
 * Following LootSplitCalculator design system
 */

import styled, { css } from 'styled-components';

export const SoloHuntResultsContainer = styled.div`
  margin-top: 24px;
`;

export const ResultsTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 24px;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ResultsIcon = styled.span`
  all: initial;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 28px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
`;

export const ResultCard = styled.div`
  background-color: #16213e;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(195, 155, 211, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(195, 155, 211, 0.15);
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #c39bd3;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(195, 155, 211, 0.2);
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: 16px;

    h3 {
      font-size: 18px;
    }
  }
`;

/* Session Info */
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 14px;
    color: #9e9e9e;
    font-weight: 500;
  }

  .value {
    font-size: 16px;
    color: #e0e0e0;
    font-weight: 600;
  }
`;

/* Stats Grid */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  text-align: center;

  ${({ $variant }) =>
    $variant === 'positive' &&
    css`
      background-color: rgba(76, 175, 80, 0.1);
      border: 1px solid rgba(76, 175, 80, 0.3);
    `}

  ${({ $variant }) =>
    $variant === 'negative' &&
    css`
      background-color: rgba(244, 67, 54, 0.1);
      border: 1px solid rgba(244, 67, 54, 0.3);
    `}

  ${({ $variant }) =>
    $variant === 'neutral' &&
    css`
      background-color: rgba(195, 155, 211, 0.1);
      border: 1px solid rgba(195, 155, 211, 0.3);
    `}

  ${({ $variant }) =>
    $variant === 'total-cost' &&
    css`
      background-color: rgba(244, 67, 54, 0.15);
      border: 2px solid rgba(244, 67, 54, 0.4);
    `}
`;

export const StatLabel = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  margin: 0 0 4px 0;
  text-align: center;
  width: 100%;
  display: block;

  ${({ $variant }) =>
    $variant === 'total-cost' &&
    css`
      font-weight: 600;
      font-size: 15px;
    `}
`;

export const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: center;

  ${({ $variant }) =>
    $variant === 'positive' &&
    css`
      color: #4caf50;
    `}

  ${({ $variant }) =>
    $variant === 'negative' &&
    css`
      color: #f44336;
    `}

  ${({ $variant }) =>
    $variant === 'neutral' &&
    css`
      color: #c39bd3;
    `}

  ${({ $variant }) =>
    $variant === 'total-cost' &&
    css`
      font-size: 22px;
      font-weight: 800;
      color: #f44336;
    `}
`;

/* Costs Breakdown */
export const CostsBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  color: #e0e0e0;

  ${({ $totalCost }) =>
    $totalCost &&
    css`
      margin-top: 8px;
      padding-top: 16px;
      border-top: 1px solid rgba(195, 155, 211, 0.3);
      font-weight: 700;
      font-size: 18px;
    `}
`;

export const CostValue = styled.span`
  font-weight: 600;
  color: #f44336;
`;

/* Final Balance */
export const FinalBalance = styled.div`
  text-align: center;

  ${({ $variant }) =>
    $variant === 'positive' &&
    css`
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
      border: 2px solid rgba(76, 175, 80, 0.3);
    `}

  ${({ $variant }) =>
    $variant === 'negative' &&
    css`
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%);
      border: 2px solid rgba(244, 67, 54, 0.3);
    `}

  h3 {
    font-size: 24px;
    border-bottom: none;
  }
`;

export const FinalBalanceValue = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin: 16px 0;

  ${({ $variant }) =>
    $variant === 'positive' &&
    css`
      color: #4caf50;
    `}

  ${({ $variant }) =>
    $variant === 'negative' &&
    css`
      color: #f44336;
    `}

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const ProfitPerHour = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #9e9e9e;
  margin-top: 8px;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

/* Combat Stats */
export const CombatStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CombatStat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: rgba(195, 155, 211, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(195, 155, 211, 0.2);

  .label {
    font-weight: 500;
    color: #9e9e9e;
  }

  .value {
    font-weight: 700;
    color: #c39bd3;
  }
`;

/* Additional Costs Layout */
export const AdditionalCostsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CostsEquation = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(195, 155, 211, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(195, 155, 211, 0.2);
  overflow: visible;
  position: relative;

  /* Desktop optimization */
  @media (min-width: 1920px) {
    gap: 10px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
    align-items: stretch;
    overflow: visible;
  }
`;

export const CostComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 6px 10px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  min-width: 110px;
  min-height: 60px;
  flex-grow: 1;
  flex-shrink: 1;
  align-items: center;
  justify-content: center;

  /* Desktop optimization */
  @media (min-width: 1920px) {
    min-width: 120px;
  }

  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1919px) {
    min-width: 105px;
  }
`;

export const TotalCostComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  padding: 8px 12px;
  min-width: 120px;
  min-height: 60px;
  flex-grow: 1;
  border-radius: 6px;
  align-items: center;
  justify-content: center;

  /* Desktop optimization */
  @media (min-width: 1920px) {
    min-width: 130px;
  }

  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1919px) {
    min-width: 115px;
  }
`;

export const CostLabel = styled.div`
  font-size: 11px;
  color: #9e9e9e;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;

  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1919px) {
    font-size: 10px;
  }
`;

export const CostValueText = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f44336;
  line-height: 1.3;

  ${({ $isTotal }) =>
    $isTotal &&
    css`
      font-size: 15px;
      font-weight: 800;
    `}

  /* Medium screens */
  @media (min-width: 769px) and (max-width: 1919px) {
    font-size: 13px;

    ${({ $isTotal }) =>
      $isTotal &&
      css`
        font-size: 14px;
      `}
  }
`;

export const CostOperator = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #c39bd3;
  margin: 0 2px;
  flex-shrink: 0;

  /* Responsive */
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CostPerHourSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: rgba(195, 155, 211, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(195, 155, 211, 0.25);

  .cost-label {
    font-size: 14px;
    text-transform: none;
    letter-spacing: normal;
  }

  .cost-value {
    font-size: 18px;
  }
`;

/* Final Balance Grid Layout */
export const FinalBalanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const BalanceColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Tooltip wrapper inside balance-column */
  > .tooltip-container {
    display: block;
    width: 100%;
  }

  /* Ensure balance-item inside tooltip has full width */
  > .tooltip-container > .balance-item {
    width: 100%;
  }
`;

export const BalanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(195, 155, 211, 0.1);
  width: 100%;
`;

export const BalanceLabel = styled.div`
  font-size: 14px;
  color: #9e9e9e;
  font-weight: 500;
`;

export const BalanceValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #e0e0e0;

  &.negative {
    color: #f44336;
  }

  &.positive {
    color: #4caf50;
  }
`;

/* Final Balance Highlights */
export const FinalBalanceHighlights = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(195, 155, 211, 0.3);

  /* Tooltip wrapper inside highlights */
  > div {
    display: flex;
    flex: 1 1 180px;
    min-width: 180px;
    max-width: 280px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    > div {
      min-width: 100%;
      max-width: 100%;
    }
  }
`;

export const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  width: 100%;
  background-color: rgba(195, 155, 211, 0.08);
  border-radius: 12px;
  border: 2px solid rgba(195, 155, 211, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(195, 155, 211, 0.2);
  }

  ${({ $main }) =>
    $main &&
    css`
      background: linear-gradient(135deg, rgba(195, 155, 211, 0.15) 0%, rgba(195, 155, 211, 0.08) 100%);
      border: 3px solid #c39bd3;
      box-shadow: 0 4px 12px rgba(195, 155, 211, 0.3);
    `}
`;

export const HighlightLabel = styled.div`
  font-size: 13px;
  color: #9e9e9e;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-align: center;
`;

export const HighlightValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  text-align: center;

  ${({ $main }) =>
    $main &&
    css`
      font-size: 36px;
    `}

  ${({ $variant }) =>
    $variant === 'positive' &&
    css`
      color: #4caf50;
    `}

  ${({ $variant }) =>
    $variant === 'negative' &&
    css`
      color: #f44336;
    `}

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 24px;

    ${({ $main }) =>
      $main &&
      css`
        font-size: 28px;
      `}
  }
`;
