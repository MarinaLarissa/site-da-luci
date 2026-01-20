/**
 * Shared Textarea Component
 * Phase 4 ETAPA 32 - Consolidates duplicate textarea implementations
 */

import styled from 'styled-components';

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${props => props.$compact ? '12px' : '16px'};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: 2px solid ${({ theme, $error }) =>
    $error ? theme.colors.error : theme.colors.accent.goldMedium
  };
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${props => props.$monospace ? props.theme.fonts.mono : props.theme.fonts.base};
  font-size: 14px;
  min-height: ${props => props.$minHeight || '150px'};
  resize: ${props => props.$resize || 'none'};
  transition: border-color 0.3s ease;
  margin-bottom: ${props => props.$noMargin ? '0' : '16px'};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.bg.primary};
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 13px;
  }
`;

export default Textarea;
