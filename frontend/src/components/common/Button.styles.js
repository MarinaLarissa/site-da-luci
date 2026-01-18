/**
 * Styled components for Button
 * Migrated from Button.css
 */

import styled, { css } from 'styled-components';

const primaryStyles = css`
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  color: #1a1a2e;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(195, 155, 211, 0.4);
  }
`;

const secondaryStyles = css`
  background-color: #2d2d44;
  color: #c39bd3;
  border: 2px solid #c39bd3;

  &:hover:not(:disabled) {
    background-color: #3a3a55;
    transform: translateY(-2px);
  }
`;

const dangerStyles = css`
  background-color: #f44336;
  color: white;

  &:hover:not(:disabled) {
    background-color: #d32f2f;
    transform: translateY(-2px);
  }
`;

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'secondary':
      return secondaryStyles;
    case 'danger':
      return dangerStyles;
    case 'primary':
    default:
      return primaryStyles;
  }
};

export const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => getVariantStyles($variant)}
`;
