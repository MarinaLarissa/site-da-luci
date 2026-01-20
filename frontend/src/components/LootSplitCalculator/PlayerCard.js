/**
 * Player card component - Reusable card for displaying player information
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, getRoleColor, getRoleLabel } from '../../utils/formatters';
import {
  PlayerCardContainer,
  PlayerCardHeader,
  PlayerCardName,
  PlayerCardLeaderBadge,
  PlayerCardRole,
  PlayerCardStats,
  PlayerCardStat,
  PlayerCardStatLabel,
  PlayerCardStatValue,
} from './PlayerCard.styles';

export default function PlayerCard({ player }) {
  const { t } = useTranslation();

  return (
    <PlayerCardContainer data-cy="player-card">
      <PlayerCardHeader>
        <PlayerCardName>
          {player.name}
          {player.isLeader && <PlayerCardLeaderBadge>{t('calculator.resultsSection.playerList.leaderBadge')}</PlayerCardLeaderBadge>}
        </PlayerCardName>
        <PlayerCardRole style={{ color: getRoleColor(player.role) }}>
          {getRoleLabel(player.role, t)}
        </PlayerCardRole>
      </PlayerCardHeader>
      <PlayerCardStats>
        <PlayerCardStat>
          <PlayerCardStatLabel>{t('calculator.resultsSection.playerList.balance')}:</PlayerCardStatLabel>
          <PlayerCardStatValue>{formatGold(player.balance)}</PlayerCardStatValue>
        </PlayerCardStat>
        <PlayerCardStat>
          <PlayerCardStatLabel>{t('calculator.resultsSection.playerList.netBalance')}:</PlayerCardStatLabel>
          <PlayerCardStatValue>{formatGold(player.netBalance)}</PlayerCardStatValue>
        </PlayerCardStat>
        <PlayerCardStat>
          <PlayerCardStatLabel>{t('calculator.resultsSection.playerList.difference')}:</PlayerCardStatLabel>
          <PlayerCardStatValue $variant={player.difference >= 0 ? 'positive' : 'negative'}>
            {player.difference >= 0 ? '+' : ''}
            {formatGold(Math.abs(player.difference))}
          </PlayerCardStatValue>
        </PlayerCardStat>
      </PlayerCardStats>
    </PlayerCardContainer>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isLeader: PropTypes.bool,
    role: PropTypes.string,
    balance: PropTypes.number.isRequired,
    netBalance: PropTypes.number.isRequired,
    difference: PropTypes.number.isRequired
  }).isRequired
};
