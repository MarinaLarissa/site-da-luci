/**
 * Player list component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PlayerCard from './PlayerCard';
import { PlayerListContainer, PlayerListTitle, PlayerListCards } from './PlayerList.styles';

export default function PlayerList({ players }) {
  const { t } = useTranslation();

  return (
    <PlayerListContainer data-cy="player-list">
      <PlayerListTitle>{t('calculator.resultsSection.playerList.title')}</PlayerListTitle>
      <PlayerListCards>
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </PlayerListCards>
    </PlayerListContainer>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    role: PropTypes.string,
    balance: PropTypes.number.isRequired,
    netBalance: PropTypes.number.isRequired,
    difference: PropTypes.number.isRequired
  })).isRequired
};
