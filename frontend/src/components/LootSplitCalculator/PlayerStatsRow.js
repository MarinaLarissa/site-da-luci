/**
 * Player stats row component - Combines player card and damage/healing card
 * Used for desktop side-by-side layout
 */

import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from './PlayerCard';
import DamageHealingCard from './DamageHealingCard';
import {
  PlayerStatsRowContainer,
  PlayerStatsRowPlayerCardWrapper,
  PlayerStatsRowDamageHealingCardWrapper,
} from './PlayerStatsRow.styles';

export default function PlayerStatsRow({ player, totalDamage, totalHealing }) {
  return (
    <PlayerStatsRowContainer data-cy="player-stats-row">
      <PlayerStatsRowPlayerCardWrapper>
        <PlayerCard player={player} />
      </PlayerStatsRowPlayerCardWrapper>
      <PlayerStatsRowDamageHealingCardWrapper>
        <DamageHealingCard
          player={player}
          totalDamage={totalDamage}
          totalHealing={totalHealing}
        />
      </PlayerStatsRowDamageHealingCardWrapper>
    </PlayerStatsRowContainer>
  );
}

PlayerStatsRow.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    role: PropTypes.string,
    balance: PropTypes.number.isRequired,
    netBalance: PropTypes.number.isRequired,
    difference: PropTypes.number.isRequired,
    damage: PropTypes.number,
    healing: PropTypes.number
  }).isRequired,
  totalDamage: PropTypes.number.isRequired,
  totalHealing: PropTypes.number.isRequired
};
