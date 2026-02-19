/**
 * Sidebar navigation component
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../routes';
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

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>{t('sidebar.title')}</SidebarTitle>
        <SidebarSubtitle>{t('sidebar.subtitle')}</SidebarSubtitle>
      </SidebarHeader>

      <SidebarNav>
        <SidebarNavItem
          as={Link}
          to={ROUTES.LOOT_SPLIT}
          $active={activePage === ROUTES.LOOT_SPLIT}
          data-cy="sidebar-nav-loot-split"
        >
          <SidebarNavIcon>💰</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.LOOT_SPLIT}>
            {t('sidebar.nav.lootSplit')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          as={Link}
          to={ROUTES.SOLO_HUNT}
          $active={activePage === ROUTES.SOLO_HUNT}
          data-cy="sidebar-nav-solo-hunt"
        >
          <SidebarNavIcon>🎯</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.SOLO_HUNT}>
            {t('sidebar.nav.soloHunt')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          as={Link}
          to={ROUTES.IMBUEMENT_CALC}
          $active={activePage === ROUTES.IMBUEMENT_CALC}
          data-cy="sidebar-nav-imbuement-calc"
        >
          <SidebarNavIcon>⚗️</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.IMBUEMENT_CALC}>
            {t('sidebar.nav.imbuementCalc')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          as={Link}
          to={ROUTES.BESTIARY_PLANNER}
          $active={activePage === ROUTES.BESTIARY_PLANNER}
          data-cy="sidebar-nav-bestiary-planner"
        >
          <SidebarNavIcon>📖</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.BESTIARY_PLANNER}>
            {t('sidebar.nav.bestiaryPlanner')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          as={Link}
          to={ROUTES.CHARACTER_SET_BUILDER}
          $active={activePage === ROUTES.CHARACTER_SET_BUILDER}
          data-cy="sidebar-nav-character-builder"
        >
          <SidebarNavIcon>🛡️</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.CHARACTER_SET_BUILDER}>
            {t('sidebar.nav.characterBuilder')}
          </SidebarNavLabel>
        </SidebarNavItem>
        <SidebarNavItem
          as={Link}
          to={ROUTES.WHEEL_PLANNER}
          $active={activePage === ROUTES.WHEEL_PLANNER}
          data-cy="sidebar-nav-wheel-planner"
        >
          <SidebarNavIcon>🎡</SidebarNavIcon>
          <SidebarNavLabel $active={activePage === ROUTES.WHEEL_PLANNER}>
            {t('sidebar.nav.wheelPlanner')}
          </SidebarNavLabel>
        </SidebarNavItem>
      </SidebarNav>

      <SidebarFooter>
        <SidebarFooterText>{t('sidebar.footer')}</SidebarFooterText>
      </SidebarFooter>
    </SidebarContainer>
  );
}
