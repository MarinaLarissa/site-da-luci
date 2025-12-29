/**
 * Player list component
 */

import React from 'react';
import { formatGold, getRoleColor, getRoleLabel } from '../../utils/formatters';
import './PlayerList.css';

export default function PlayerList({ players }) {
  return (
    <div className="player-list">
      <h3 className="list-title">Players</h3>
      <div className="player-cards">
        {players.map((player, index) => (
          <div key={index} className="player-card">
            <div className="player-header">
              <span className="player-name">
                {player.name}
                {player.isLeader && <span className="leader-badge">👑 Leader</span>}
              </span>
              <span
                className="player-role"
                style={{ color: getRoleColor(player.role) }}
              >
                {getRoleLabel(player.role)}
              </span>
            </div>
            <div className="player-stats">
              <div className="stat">
                <span className="stat-label">Balance:</span>
                <span className="stat-value">{formatGold(player.balance)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Net Balance:</span>
                <span className="stat-value">{formatGold(player.netBalance)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Difference:</span>
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
        ))}
      </div>
    </div>
  );
}
