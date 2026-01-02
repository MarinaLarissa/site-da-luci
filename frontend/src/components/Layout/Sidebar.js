/**
 * Sidebar navigation component
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

export default function Sidebar({ activePage, onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">{t('sidebar.title')}</h1>
        <p className="sidebar-subtitle">{t('sidebar.subtitle')}</p>
      </div>

      <nav className="sidebar-nav">
        <div
          className={`nav-item ${activePage === 'loot-split' ? 'active' : ''}`}
          onClick={() => onNavigate('loot-split')}
        >
          <span className="nav-icon">💰</span>
          <span className="nav-label">{t('sidebar.nav.lootSplit')}</span>
        </div>
        <div
          className={`nav-item ${activePage === 'solo-hunt' ? 'active' : ''}`}
          onClick={() => onNavigate('solo-hunt')}
        >
          <span className="nav-icon">🎯</span>
          <span className="nav-label">{t('sidebar.nav.soloHunt')}</span>
        </div>
        <div
          className={`nav-item ${activePage === 'imbuement-calc' ? 'active' : ''}`}
          onClick={() => onNavigate('imbuement-calc')}
        >
          <span className="nav-icon">⚗️</span>
          <span className="nav-label">{t('sidebar.nav.imbuementCalc')}</span>
        </div>
        <div className="nav-item disabled">
          <span className="nav-icon">📊</span>
          <span className="nav-label">{t('sidebar.nav.statistics')}</span>
        </div>
        <div className="nav-item disabled">
          <span className="nav-icon">👥</span>
          <span className="nav-label">{t('sidebar.nav.partyAnalyzer')}</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">{t('sidebar.footer')}</p>
      </div>
    </div>
  );
}
