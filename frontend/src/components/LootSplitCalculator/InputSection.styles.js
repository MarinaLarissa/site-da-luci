/**
 * Styled components for InputSection
 * Migrated from InputSection.css
 */

import styled from 'styled-components';

// ETAPA 33: Migrated to shared Typography components
export { SectionTitle, SectionDescription } from '../common/styled';

export const InputContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// TextAreaStyled removed - now using shared Textarea component from common/styled

export const HelpText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
`;

// SectionTitle and SectionDescription removed - now using shared components (imported above)

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
