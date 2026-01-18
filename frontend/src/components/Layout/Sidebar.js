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
  NavItem,
  NavIcon,
  NavLabel,
  SidebarFooter,
  FooterText,
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
        <NavItem
          $active={activePage === 'loot-split'}
          onClick={() => onNavigate('loot-split')}
        >
          <NavIcon>💰</NavIcon>
          <NavLabel $active={activePage === 'loot-split'}>
            {t('sidebar.nav.lootSplit')}
          </NavLabel>
        </NavItem>
        <NavItem
          $active={activePage === 'solo-hunt'}
          onClick={() => onNavigate('solo-hunt')}
        >
          <NavIcon>🎯</NavIcon>
          <NavLabel $active={activePage === 'solo-hunt'}>
            {t('sidebar.nav.soloHunt')}
          </NavLabel>
        </NavItem>
        <NavItem
          $active={activePage === 'imbuement-calc'}
          onClick={() => onNavigate('imbuement-calc')}
        >
          <NavIcon>⚗️</NavIcon>
          <NavLabel $active={activePage === 'imbuement-calc'}>
            {t('sidebar.nav.imbuementCalc')}
          </NavLabel>
        </NavItem>
        <NavItem $disabled>
          <NavIcon>📊</NavIcon>
          <NavLabel>{t('sidebar.nav.statistics')}</NavLabel>
        </NavItem>
        <NavItem $disabled>
          <NavIcon>👥</NavIcon>
          <NavLabel>{t('sidebar.nav.partyAnalyzer')}</NavLabel>
        </NavItem>
      </SidebarNav>

      <SidebarFooter>
        <FooterText>{t('sidebar.footer')}</FooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
}
