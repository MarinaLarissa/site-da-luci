/**
 * Player card component - Reusable card for displaying player information
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, getRoleColor, getRoleLabel } from '../../utils/formatters';
import './PlayerCard.css';

export default function PlayerCard({ player }) {
  const { t } = useTranslation();

  return (
    <div className="player-card">
      <div className="player-header">
        <span className="player-name">
          {player.name}
          {player.isLeader && <span className="leader-badge">{t('calculator.resultsSection.playerList.leaderBadge')}</span>}
        </span>
        <span
          className="player-role"
          style={{ color: getRoleColor(player.role) }}
        >
          {getRoleLabel(player.role, t)}
        </span>
      </div>
      <div className="player-stats">
        <div className="stat">
          <span className="stat-label">{t('calculator.resultsSection.playerList.balance')}:</span>
          <span className="stat-value">{formatGold(player.balance)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t('calculator.resultsSection.playerList.netBalance')}:</span>
          <span className="stat-value">{formatGold(player.netBalance)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t('calculator.resultsSection.playerList.difference')}:</span>
          <span
            className="stat-value"
            style={{ color: player.difference >= 0 ? '#4CAF50' : '#f44336' }}
          >
            {player.difference >= 0 ? '+' : ''}
            {formatGold(Math.abs(player.difference))}
          </span>
        </div>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    role: PropTypes.string,
    balance: PropTypes.number.isRequired,
    netBalance: PropTypes.number.isRequired,
    difference: PropTypes.number.isRequired
  }).isRequired
};
