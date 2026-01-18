/**
 * Player stats row component - Combines player card and damage/healing card
 * Used for desktop side-by-side layout
 */

import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from './PlayerCard';
import DamageHealingCard from './DamageHealingCard';
import {
  StatsRowContainer,
  PlayerCardWrapper,
  DamageHealingCardWrapper,
} from './PlayerStatsRow.styles';

export default function PlayerStatsRow({ player, totalDamage, totalHealing }) {
  return (
    <StatsRowContainer>
      <PlayerCardWrapper>
        <PlayerCard player={player} />
      </PlayerCardWrapper>
      <DamageHealingCardWrapper>
        <DamageHealingCard
          player={player}
          totalDamage={totalDamage}
          totalHealing={totalHealing}
        />
      </DamageHealingCardWrapper>
    </StatsRowContainer>
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
