/**
 * Styled components for InputSection
 * Migrated from InputSection.css
 */

import styled from 'styled-components';

// ETAPA 33: Migrated to shared Typography and ButtonGroup components
export { SectionTitle, SectionDescription, ButtonGroup } from '../common/styled';
export { InputCard as InputSectionContainer } from '../common/styled';

export const InputSectionLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// TextAreaStyled removed - now using shared Textarea component from common/styled

export const InputSectionHelpText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
`;

// SectionTitle, SectionDescription, and ButtonGroup removed - now using shared components (imported above)
