/**
 * Damage and Healing section component
 * Displays damage and healing statistics for each player
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DamageHealingCard from './DamageHealingCard';
import './DamageHealingSection.css';

export default function DamageHealingSection({ players }) {
  const { t } = useTranslation();

  // Calculate total damage and healing for percentage calculation
  const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0);
  const totalHealing = players.reduce((sum, player) => sum + (player.healing || 0), 0);

  return (
    <div className="damage-healing-section">
      <h3 className="section-subtitle">{t('calculator.resultsSection.damageHealing.title')}</h3>
      <div className="damage-healing-grid">
        {players.map((player, index) => (
          <DamageHealingCard
            key={index}
            player={player}
            totalDamage={totalDamage}
            totalHealing={totalHealing}
          />
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
