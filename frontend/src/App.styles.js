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

export const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.bg.primary} 0%,
    #1a1a2e 100%
  );
  min-height: 100vh;

  /* Responsive */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
