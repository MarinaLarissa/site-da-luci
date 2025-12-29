/**
 * Damage and Healing section component
 * Displays damage and healing statistics for each player
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import Tooltip from '../common/Tooltip';
import damageIcon from '../../assets/tibia/damage-icon.gif';
import healingIcon from '../../assets/tibia/healing-icon.gif';
import './DamageHealingSection.css';

export default function DamageHealingSection({ players }) {
  const { t } = useTranslation();

  // Calculate total damage and healing for percentage calculation
  const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0);
  const totalHealing = players.reduce((sum, player) => sum + (player.healing || 0), 0);

  // Calculate percentages for each player
  const playersWithPercentages = players.map(player => ({
    ...player,
    damagePercent: totalDamage > 0 ? ((player.damage / totalDamage) * 100).toFixed(1) : 0,
    healingPercent: totalHealing > 0 ? ((player.healing / totalHealing) * 100).toFixed(1) : 0
  }));

  return (
    <div className="damage-healing-section">
      <h3 className="section-subtitle">{t('calculator.resultsSection.damageHealing.title')}</h3>
      <div className="damage-healing-grid">
        {playersWithPercentages.map((player, index) => (
          <div key={index} className="damage-healing-card">
            <div className="player-name-header">
              {player.name}
              {player.isLeader && <span className="leader-indicator">★</span>}
            </div>

            <div className="stats-row">
              <Tooltip
                text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
                position="top"
              >
                <div className="stat-item damage">
                  <img src={damageIcon} alt="Damage" className="stat-icon" />
                  <span className="stat-label">{t('calculator.resultsSection.damageHealing.damage')}:</span>
                  <span className="stat-percent">{player.damagePercent}%</span>
                </div>
              </Tooltip>

              <Tooltip
                text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
                position="top"
              >
                <div className="stat-item healing">
                  <img src={healingIcon} alt="Healing" className="stat-icon" />
                  <span className="stat-label">{t('calculator.resultsSection.damageHealing.healing')}:</span>
                  <span className="stat-percent">{player.healingPercent}%</span>
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

DamageHealingSection.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    damage: PropTypes.number,
    healing: PropTypes.number
  })).isRequired
};
