/**
 * Damage and Healing card component - Reusable card for displaying damage/healing stats
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import Tooltip from '../common/Tooltip';
import damageIcon from '../../assets/tibia/damage-icon.gif';
import healingIcon from '../../assets/tibia/healing-icon.gif';
import './DamageHealingCard.css';

export default function DamageHealingCard({ player, totalDamage, totalHealing }) {
  const { t } = useTranslation();

  // Calculate percentages
  const damagePercent = totalDamage > 0 ? ((player.damage / totalDamage) * 100).toFixed(1) : 0;
  const healingPercent = totalHealing > 0 ? ((player.healing / totalHealing) * 100).toFixed(1) : 0;

  return (
    <div className="damage-healing-card">
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
            <span className="stat-percent">{damagePercent}%</span>
          </div>
        </Tooltip>

        <Tooltip
          text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
          position="top"
        >
          <div className="stat-item healing">
            <img src={healingIcon} alt="Healing" className="stat-icon" />
            <span className="stat-label">{t('calculator.resultsSection.damageHealing.healing')}:</span>
            <span className="stat-percent">{healingPercent}%</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

DamageHealingCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    damage: PropTypes.number,
    healing: PropTypes.number
  }).isRequired,
  totalDamage: PropTypes.number.isRequired,
  totalHealing: PropTypes.number.isRequired
};
