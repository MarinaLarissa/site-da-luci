/**
 * Solo Hunt Analyzer Styled Components
 * Following LootSplitCalculator color scheme
 */

import styled from 'styled-components';

export const SoloHuntAnalyzerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  /* Responsive */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SoloHuntAnalyzerHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const SoloHuntAnalyzerTitle = styled.h1`
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

export const SoloHuntAnalyzerDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;
  margin: 0;

  /* Responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SoloHuntAnalyzerHistoryButton = styled.button`
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

export const SoloHuntAnalyzerButtonIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;

export const SoloHuntAnalyzerButtonText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;

  /* Responsive - Hide text on mobile, show icon only */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SoloHuntAnalyzerActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SoloHuntAnalyzerButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
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

  /* Responsive */
  @media (max-width: 768px) {
    width: 100%;
  }
`;
