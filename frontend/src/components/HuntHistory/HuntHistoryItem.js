/**
 * Hunt History Item component
 * Individual expandable hunt entry in history list
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, formatDuration } from '../../utils/formatters';
import Tooltip from '../common/Tooltip';
import damageIcon from '../../assets/tibia/damage-icon.gif';
import healingIcon from '../../assets/tibia/healing-icon.gif';
import './HuntHistoryItem.css';

export default function HuntHistoryItem({ hunt, onDelete }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent expand/collapse
    if (window.confirm(t('huntHistory.confirmDelete'))) {
      onDelete(hunt.id);
    }
  };

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  // Format date/time
  const huntDate = new Date(hunt.timestamp);
  const dateStr = huntDate.toLocaleDateString();
  const timeStr = huntDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="hunt-history-item">
      <div className="hunt-item-header" onClick={toggleExpand}>
        <div className="hunt-item-main">
          <div className="hunt-date">
            <span className="date">{dateStr}</span>
            <span className="time">{timeStr}</span>
          </div>
          <div className="hunt-summary">
            <span className="total-balance">{hunt.summary.totalBalanceFormatted}</span>
            <span className="duration">{formatDuration(hunt.summary.duration)}</span>
          </div>
        </div>
        <div className="hunt-item-actions">
          <button
            className="btn-delete"
            onClick={handleDelete}
            aria-label={t('huntHistory.deleteButton')}
          >
            🗑️
          </button>
          <button
            className="btn-expand"
            aria-label={expanded ? t('huntHistory.collapseButton') : t('huntHistory.expandButton')}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="hunt-item-details">
          <div className="details-section">
            <h4 className="details-title">{t('huntHistory.details.summary')}</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">{t('calculator.resultsSection.summary.fairShare')}:</span>
                <span className="detail-value">{hunt.summary.fairShareFormatted}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('calculator.resultsSection.summary.profitPerHour')}:</span>
                <span className="detail-value">{hunt.summary.profitPerHourFormatted}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{t('calculator.resultsSection.summary.activePlayers')}:</span>
                <span className="detail-value">{hunt.summary.activePlayers}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h4 className="details-title">{t('huntHistory.details.players')}</h4>
            <div className="players-list">
              {hunt.players.map((player, index) => (
                <div key={index} className="player-detail-card">
                  <div className="player-name">
                    {player.name}
                    {player.isLeader && <span className="leader-badge">👑</span>}
                  </div>
                  <div className="player-stats-grid">
                    <div className="player-stat">
                      <span className="stat-label">{t('calculator.resultsSection.playerList.balance')}:</span>
                      <span className="stat-value">{formatGold(player.balance)}</span>
                    </div>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
                      position="top"
                    >
                      <div className="player-stat damage">
                        <span className="stat-label">
                          <img src={damageIcon} alt="Damage" className="stat-icon-inline" /> {t('calculator.resultsSection.damageHealing.damage')}:
                        </span>
                        <span className="stat-value">{player.damagePercent}%</span>
                      </div>
                    </Tooltip>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
                      position="top"
                    >
                      <div className="player-stat healing">
                        <span className="stat-label">
                          <img src={healingIcon} alt="Healing" className="stat-icon-inline" /> {t('calculator.resultsSection.damageHealing.healing')}:
                        </span>
                        <span className="stat-value">{player.healingPercent}%</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

HuntHistoryItem.propTypes = {
  hunt: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    summary: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};
