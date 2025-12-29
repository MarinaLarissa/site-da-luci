/**
 * Player list component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PlayerCard from './PlayerCard';
import './PlayerList.css';

export default function PlayerList({ players }) {
  const { t } = useTranslation();

  return (
    <div className="player-list">
      <h3 className="list-title">{t('calculator.resultsSection.playerList.title')}</h3>
      <div className="player-cards">
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </div>
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
