/**
 * Styled components for HuntHistory (SoloHuntAnalyzer)
 * Migrated from HuntHistory.css
 * Following LootSplitCalculator design system
 */

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const SoloHuntHistoryOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

export const SoloHuntHistoryPanel = styled.div`
  background-color: #0f1620;
  width: 500px;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.3s ease;
  display: flex;
  flex-direction: column;

  /* Responsive */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SoloHuntHistoryHeader = styled.div`
  background-color: #16213e;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(195, 155, 211, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #c39bd3;
    margin: 0;
  }
`;

export const SoloHuntHistoryCloseButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #c39bd3;
    transform: rotate(90deg);
  }
`;

export const SoloHuntHistoryControls = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  border-bottom: 1px solid rgba(195, 155, 211, 0.1);
`;

export const SoloHuntHistoryCount = styled.div`
  padding: 12px 24px;
  font-size: 13px;
  color: #9e9e9e;
  font-style: italic;
  border-bottom: 1px solid rgba(195, 155, 211, 0.1);
`;

export const SoloHuntHistoryList = styled.div`
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
`;

export const SoloHuntHistoryEmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #9e9e9e;

  p {
    font-size: 15px;
    line-height: 1.6;
  }
`;

export const SoloHuntHistoryCard = styled.div`
  background-color: #16213e;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid rgba(195, 155, 211, 0.2);
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(195, 155, 211, 0.4);
  }
`;

export const SoloHuntHistorySummary = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(195, 155, 211, 0.05);
  }

  /* Responsive */
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SoloHuntHistoryInfo = styled.div`
  flex: 1;

  /* Responsive */
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const SoloHuntHistoryCharacter = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 4px;
`;

export const SoloHuntHistoryDate = styled.div`
  font-size: 13px;
  color: #9e9e9e;
`;

export const SoloHuntHistoryBalance = styled.div`
  font-size: 18px;
  font-weight: 700;

  .positive {
    color: #4caf50;
  }

  .negative {
    color: #f44336;
  }

  /* Responsive */
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const SoloHuntHistoryExpandButton = styled.button`
  background: none;
  border: none;
  color: #c39bd3;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s ease;
`;

export const SoloHuntHistoryDetails = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(195, 155, 211, 0.1);
  background-color: rgba(195, 155, 211, 0.02);
`;

export const SoloHuntHistoryDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SoloHuntHistoryDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 12px;
    color: #9e9e9e;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 15px;
    font-weight: 600;
    color: #e0e0e0;
  }

  .value.positive {
    color: #4caf50;
  }

  .value.negative {
    color: #f44336;
  }
`;

export const SoloHuntHistoryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
