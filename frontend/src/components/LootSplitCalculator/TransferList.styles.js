/**
 * Styled components for TransferList
 * Migrated from TransferList.css
 */

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TransferListContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const ListTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent.gold};
  font-weight: 600;
`;

export const TransferInstruction = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  text-align: center;
  font-style: italic;
`;

export const NoTransfers = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: 16px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.successLight};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.success};
`;

export const TransferItems = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: 20px;
`;

export const TransferItem = styled.div`
  display: grid;
  grid-template-columns: 2fr auto 2fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: rgba(195, 155, 211, 0.5);
    background-color: ${({ theme }) => theme.colors.bg.tertiary};
    box-shadow: 0 2px 8px rgba(195, 155, 211, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  ${({ $copied, theme }) =>
    $copied &&
    `
    background-color: ${theme.colors.successLight};
    border-color: ${theme.colors.success};
  `}

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const TransferFrom = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  text-align: right;

  /* Responsive */
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const TransferTo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
`;

export const TransferArrow = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.accent.gold};

  /* Responsive */
  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

export const TransferAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.gold};
  text-align: right;
`;

export const TransferCopiedIndicator = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: ${({ theme }) => theme.colors.success};
  font-size: 14px;
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.sm};
  animation: ${fadeIn} 0.2s ease-in;
`;

export const TransferCommands = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
`;

export const CommandsTitle = styled.h4`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-weight: 600;
`;

export const CommandsText = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;
