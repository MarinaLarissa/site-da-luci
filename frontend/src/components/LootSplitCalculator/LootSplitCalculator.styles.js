/**
 * Styled components for LootSplitCalculator
 * Migrated from LootSplitCalculator.css
 */

import styled from 'styled-components';

export const LootSplitCalculatorContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};

  /* Responsive - Expand on larger screens */
  @media (min-width: 1920px) {
    max-width: 1850px;
    padding: ${({ theme }) => theme.spacing.xl};
  }

  /* Responsive - Smaller screens */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const LootSplitCalculatorHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const LootSplitCalculatorTitle = styled.h1`
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

export const LootSplitCalculatorDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  margin: 0;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const LootSplitCalculatorFloatingButton = styled.button`
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

  /* Responsive */
  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    padding: 0;
    border-radius: 50%;
  }
`;

export const LootSplitCalculatorButtonIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;

export const LootSplitCalculatorButtonText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;

  /* Responsive - Hide text on mobile, show icon only */
  @media (max-width: 768px) {
    display: none;
  }
`;
