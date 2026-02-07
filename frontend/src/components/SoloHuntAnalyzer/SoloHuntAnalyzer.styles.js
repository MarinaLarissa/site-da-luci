/**
 * Solo Hunt Analyzer Styled Components
 * Following LootSplitCalculator color scheme
 */

import styled from 'styled-components';
import {
  PageContainer,
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  FloatingHistoryButton,
  FloatingHistoryButtonIcon,
  FloatingHistoryButtonText,
} from '../common/styled';

// Shared components
export const SoloHuntAnalyzerContainer = PageContainer;
export const SoloHuntAnalyzerHeader = PageHeader;
export const SoloHuntAnalyzerTitle = PageHeaderTitle;
export const SoloHuntAnalyzerDescription = PageHeaderDescription;
export const SoloHuntAnalyzerHistoryButton = FloatingHistoryButton;
export const SoloHuntAnalyzerButtonIcon = FloatingHistoryButtonIcon;
export const SoloHuntAnalyzerButtonText = FloatingHistoryButtonText;

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
