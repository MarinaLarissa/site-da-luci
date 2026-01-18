/**
 * Styled components for Sidebar
 * Migrated from Sidebar.css
 */

import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  border-right: 2px solid ${({ theme }) => theme.colors.accent.gold};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;

  /* Responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent.gold};
  }
`;

export const SidebarHeader = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
`;

export const SidebarTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #c39bd3 0%, #b388c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const SidebarSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin: 8px 0 0 0;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 20px 0;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  opacity: ${({ $disabled }) => ($disabled ? '0.4' : '1')};

  /* Active state */
  ${({ $active, theme }) =>
    $active &&
    `
    background-color: ${theme.colors.accent.goldLight};
    border-left-color: ${theme.colors.accent.gold};
  `}

  /* Hover state (only for enabled and non-active items) */
  ${({ $disabled, $active, theme }) =>
    !$disabled &&
    !$active &&
    `
    &:hover {
      background-color: rgba(195, 155, 211, 0.05);
    }
  `}
`;

export const NavIcon = styled.span`
  font-size: 20px;
`;

export const NavLabel = styled.span`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent.gold : theme.colors.text.primary};
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '600' : 'normal')};
  transition: color 0.3s ease;
`;

export const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.accent.goldLight};
`;

export const FooterText = styled.p`
  color: #757575;
  font-size: 12px;
  text-align: center;
  margin: 0;
`;
