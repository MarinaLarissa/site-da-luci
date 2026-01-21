/**
 * Damage and Healing section component
 * Displays damage and healing statistics for each player
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DamageHealingCard from './DamageHealingCard';
import { DamageHealingSectionContainer, DamageHealingSectionSubtitle, DamageHealingSectionGrid } from './DamageHealingSection.styles';

export default function DamageHealingSection({ players }) {
  const { t } = useTranslation();

  // Calculate total damage and healing for percentage calculation
  const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0);
  const totalHealing = players.reduce((sum, player) => sum + (player.healing || 0), 0);

  return (
    <DamageHealingSectionContainer data-cy="damage-healing-section">
      <DamageHealingSectionSubtitle>{t('calculator.resultsSection.damageHealing.title')}</DamageHealingSectionSubtitle>
      <DamageHealingSectionGrid>
        {players.map((player, index) => (
          <DamageHealingCard
            key={index}
            player={player}
            totalDamage={totalDamage}
            totalHealing={totalHealing}
          />
        ))}
      </DamageHealingSectionGrid>
    </DamageHealingSectionContainer>
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
