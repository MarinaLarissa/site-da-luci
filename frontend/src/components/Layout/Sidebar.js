/**
 * Sidebar navigation component
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  SidebarSubtitle,
  SidebarNav,
  SidebarNavItem,
  SidebarNavIcon,
  SidebarNavLabel,
  SidebarFooter,
  SidebarFooterText,
} from './Sidebar.styles';

export default function Sidebar({ activePage, onNavigate }) {
  const { t } = useTranslation();

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>{t('sidebar.title')}</SidebarTitle>
        <SidebarSubtitle>{t('sidebar.subtitle')}</SidebarSubtitle>
      </SidebarHeader>

      <SidebarNav>
        <SidebarNavItem
          $active={activePage === 'loot-split'}
          onClick={() => onNavigate('loot-split')}
          data-cy="sidebar-nav-loot-split"
        >
          <SidebarNavIcon>💰</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === 'loot-split'}>
            {t('sidebar.nav.lootSplit')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          $active={activePage === 'solo-hunt'}
          onClick={() => onNavigate('solo-hunt')}
          data-cy="sidebar-nav-solo-hunt"
        >
          <SidebarNavIcon>🎯</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === 'solo-hunt'}>
            {t('sidebar.nav.soloHunt')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          $active={activePage === 'imbuement-calc'}
          onClick={() => onNavigate('imbuement-calc')}
          data-cy="sidebar-nav-imbuement-calc"
        >
          <SidebarNavIcon>⚗️</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === 'imbuement-calc'}>
            {t('sidebar.nav.imbuementCalc')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          $active={activePage === 'bestiary-planner'}
          onClick={() => onNavigate('bestiary-planner')}
          data-cy="sidebar-nav-bestiary-planner"
        >
          <SidebarNavIcon>📖</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === 'bestiary-planner'}>
            {t('sidebar.nav.bestiaryPlanner')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem $disabled>
          <SidebarNavIcon>📊</SidebarNavIcon>
          <SidebarNavLabel>{t('sidebar.nav.statistics')}</SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem $disabled>
          <SidebarNavIcon>👥</SidebarNavIcon>
          <SidebarNavLabel>{t('sidebar.nav.partyAnalyzer')}</SidebarNavLabel>
        </SidebarNavItem>
      </SidebarNav>

      <SidebarFooter>
        <SidebarFooterText>{t('sidebar.footer')}</SidebarFooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
}
