/**
 * Player card component - Reusable card for displaying player information
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, getRoleColor, getRoleLabel } from '../../utils/formatters';
import {
  CardContainer,
  PlayerHeader,
  PlayerName,
  LeaderBadge,
  PlayerRole,
  PlayerStats,
  Stat,
  StatLabel,
  StatValue,
} from './PlayerCard.styles';

export default function PlayerCard({ player }) {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <PlayerHeader>
        <PlayerName>
          {player.name}
          {player.isLeader && <LeaderBadge>{t('calculator.resultsSection.playerList.leaderBadge')}</LeaderBadge>}
        </PlayerName>
        <PlayerRole style={{ color: getRoleColor(player.role) }}>
          {getRoleLabel(player.role, t)}
        </PlayerRole>
      </PlayerHeader>
      <PlayerStats>
        <Stat>
          <StatLabel>{t('calculator.resultsSection.playerList.balance')}:</StatLabel>
          <StatValue>{formatGold(player.balance)}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>{t('calculator.resultsSection.playerList.netBalance')}:</StatLabel>
          <StatValue>{formatGold(player.netBalance)}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>{t('calculator.resultsSection.playerList.difference')}:</StatLabel>
          <StatValue $variant={player.difference >= 0 ? 'positive' : 'negative'}>
            {player.difference >= 0 ? '+' : ''}
            {formatGold(Math.abs(player.difference))}
          </StatValue>
        </Stat>
      </PlayerStats>
    </CardContainer>
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
