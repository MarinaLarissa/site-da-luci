/**
 * Styled components for LoadingSpinner
 * Migrated from LoadingSpinner.css
 */

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => theme.colors.accent.goldLight};
  border-top-color: ${({ theme }) => theme.colors.accent.gold};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingMessage = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.accent.gold};
  font-size: 16px;
  font-weight: 500;
`;
