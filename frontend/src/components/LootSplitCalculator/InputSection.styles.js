/**
 * Styled components for InputSection
 * Migrated from InputSection.css
 */

import styled from 'styled-components';

export const InputContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.secondary};
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

export const TextAreaStyled = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.primary};
  border: 2px solid ${({ theme }) => theme.colors.accent.goldLight};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const HelpText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-style: italic;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
