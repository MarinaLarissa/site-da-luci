/**
 * Styled components for App
 * Migrated from App.css
 */

import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.primary};

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopControls = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 1000;

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.bg.primary} 0%,
    #1a1a2e 100%
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* Responsive */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.accent.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent.hover};
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: 0.8rem;
  }
`;
