/**
 * Solo Hunt Analyzer Styled Components
 * Following LootSplitCalculator color scheme
 */

import styled from 'styled-components';

export const AnalyzerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CalculatorHeader = styled.div`
  margin-bottom: 32px;
`;

export const CalculatorTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const CalculatorDescription = styled.p`
  color: #9E9E9E;
  font-size: 18px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const HistoryButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  min-width: 60px;
  height: 60px;
  padding: 0 1.2rem;
  background: linear-gradient(135deg, #c39bd3, #b388c7);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #b388c7, #9d6fb0);
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(195, 155, 211, 0.4);
  }

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    padding: 0;
    border-radius: 50%;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;

export const ButtonText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 24px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #c39bd3, #b388c7);
    color: #1a1a2e;

    &:hover:not(:disabled) {
      background-color: #b388c7;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(195, 155, 211, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: #16213e;
    color: #c39bd3;
    border: 1px solid rgba(195, 155, 211, 0.3);

    &:hover {
      background-color: rgba(195, 155, 211, 0.1);
      border-color: #c39bd3;
      transform: translateY(-2px);
    }
  `}

  @media (max-width: 768px) {
    width: 100%;
  }
`;
