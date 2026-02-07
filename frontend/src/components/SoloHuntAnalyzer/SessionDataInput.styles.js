/**
 * Styled components for SessionDataInput
 * Migrated from SessionDataInput.css
 * Following LootSplitCalculator/InputSection color scheme
 */

import styled from 'styled-components';

// ETAPA 33-35: Migrated to shared Typography and ButtonGroup components
export { SectionTitle, SectionDescription } from '../common/styled';
export { ButtonGroup as SessionDataInputActions } from '../common/styled';
export { InputCard as SessionDataInputContainer } from '../common/styled';

// SessionTextarea removed - now using shared Textarea component from common/styled
// SessionDataInputActions removed - now using shared ButtonGroup (aliased above)

export const SessionDataInputParsedInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.hover};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const SessionDataInputParsedTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 18px;
  font-weight: 600;
`;

export const SessionDataInputSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  /* Responsive */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SessionDataInputSummaryItem = styled.p`
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;
