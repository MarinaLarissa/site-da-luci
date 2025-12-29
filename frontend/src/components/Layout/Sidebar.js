/**
 * Sidebar navigation component
 */

import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Site da Luci</h1>
        <p className="sidebar-subtitle">TIBIA Player Tools</p>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item active">
          <span className="nav-icon">💰</span>
          <span className="nav-label">Loot Split Calculator</span>
        </div>
        <div className="nav-item disabled">
          <span className="nav-icon">📊</span>
          <span className="nav-label">Statistics (Coming Soon)</span>
        </div>
        <div className="nav-item disabled">
          <span className="nav-icon">👥</span>
          <span className="nav-label">Party Analyzer (Coming Soon)</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">Made for TIBIA players</p>
      </div>
    </div>
  );
}
