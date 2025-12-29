/**
 * Results section component
 */

import React from 'react';
import { formatGold, formatDuration } from '../../utils/formatters';
import PlayerList from './PlayerList';
import TransferList from './TransferList';
import './ResultsSection.css';

export default function ResultsSection({ results }) {
  if (!results) return null;

  const { summary, players, transfers, copyableText } = results;

  return (
    <div className="results-section">
      <h2 className="section-title">Results</h2>

      {/* Summary cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Balance</div>
          <div className="summary-value">{summary.totalBalanceFormatted}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Fair Share</div>
          <div className="summary-value">{summary.fairShareFormatted}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Profit/Hour</div>
          <div className="summary-value">{summary.profitPerHourFormatted}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Duration</div>
          <div className="summary-value">{formatDuration(summary.duration)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Active Players</div>
          <div className="summary-value">{summary.activePlayers}</div>
        </div>
      </div>

      {/* Player list */}
      <PlayerList players={players} />

      {/* Transfer list */}
      <TransferList transfers={transfers} copyableText={copyableText} />
    </div>
  );
}
