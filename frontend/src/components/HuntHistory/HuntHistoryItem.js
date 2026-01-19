/**
 * Hunt History Item component
 * Individual expandable hunt entry in history list
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, formatDuration } from '../../utils/formatters';
import Tooltip from '../common/Tooltip';
import damageIcon from '../../assets/tibia/damage-icon.gif';
import healingIcon from '../../assets/tibia/healing-icon.gif';
import {
  HuntItemContainer,
  HuntItemHeader,
  HuntItemMain,
  HuntDate,
  DateText,
  TimeText,
  HuntSummary,
  TotalBalance,
  Duration,
  HuntItemActions,
  DeleteButton,
  ExpandButton,
  HuntItemDetails,
  DetailsSection,
  DetailsTitle,
  DetailsGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  PlayersList,
  PlayerDetailCard,
  PlayerName,
  LeaderBadge,
  PlayerStatsGrid,
  PlayerStat,
  StatLabel,
  StatIconInline,
  StatValue,
} from './HuntHistoryItem.styles';

export default function HuntHistoryItem({ hunt, onDelete }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent expand/collapse
    if (window.confirm(t('huntHistory.confirmDelete'))) {
      onDelete(hunt.id);
    }
  };

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  // Format date/time
  const huntDate = new Date(hunt.timestamp);
  const dateStr = huntDate.toLocaleDateString();
  const timeStr = huntDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <HuntItemContainer>
      <HuntItemHeader onClick={toggleExpand}>
        <HuntItemMain>
          <HuntDate>
            <DateText>{dateStr}</DateText>
            <TimeText>{timeStr}</TimeText>
          </HuntDate>
          <HuntSummary>
            <TotalBalance>{hunt.summary.totalBalanceFormatted}</TotalBalance>
            <Duration>{formatDuration(hunt.summary.duration)}</Duration>
          </HuntSummary>
        </HuntItemMain>
        <HuntItemActions>
          <DeleteButton
            onClick={handleDelete}
            aria-label={t('huntHistory.deleteButton')}
          >
            🗑️
          </DeleteButton>
          <ExpandButton
            aria-label={expanded ? t('huntHistory.collapseButton') : t('huntHistory.expandButton')}
          >
            {expanded ? '−' : '+'}
          </ExpandButton>
        </HuntItemActions>
      </HuntItemHeader>

      {expanded && (
        <HuntItemDetails>
          <DetailsSection>
            <DetailsTitle>{t('huntHistory.details.summary')}</DetailsTitle>
            <DetailsGrid>
              <DetailItem>
                <DetailLabel>{t('calculator.resultsSection.summary.fairShare')}:</DetailLabel>
                <DetailValue>{hunt.summary.fairShareFormatted}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>{t('calculator.resultsSection.summary.profitPerHour')}:</DetailLabel>
                <DetailValue>{hunt.summary.profitPerHourFormatted}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>{t('calculator.resultsSection.summary.activePlayers')}:</DetailLabel>
                <DetailValue>{hunt.summary.activePlayers}</DetailValue>
              </DetailItem>
            </DetailsGrid>
          </DetailsSection>

          <DetailsSection>
            <DetailsTitle>{t('huntHistory.details.players')}</DetailsTitle>
            <PlayersList>
              {hunt.players.map((player, index) => (
                <PlayerDetailCard key={index}>
                  <PlayerName>
                    {player.name}
                    {player.isLeader && <LeaderBadge>👑</LeaderBadge>}
                  </PlayerName>
                  <PlayerStatsGrid>
                    <PlayerStat>
                      <StatLabel>{t('calculator.resultsSection.playerList.balance')}:</StatLabel>
                      <StatValue>{formatGold(player.balance)}</StatValue>
                    </PlayerStat>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
                      position="top"
                    >
                      <PlayerStat>
                        <StatLabel>
                          <StatIconInline src={damageIcon} alt="Damage" /> {t('calculator.resultsSection.damageHealing.damage')}:
                        </StatLabel>
                        <StatValue>{player.damagePercent}%</StatValue>
                      </PlayerStat>
                    </Tooltip>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
                      position="top"
                    >
                      <PlayerStat>
                        <StatLabel>
                          <StatIconInline src={healingIcon} alt="Healing" /> {t('calculator.resultsSection.damageHealing.healing')}:
                        </StatLabel>
                        <StatValue>{player.healingPercent}%</StatValue>
                      </PlayerStat>
                    </Tooltip>
                  </PlayerStatsGrid>
                </PlayerDetailCard>
              ))}
            </PlayersList>
          </DetailsSection>
        </HuntItemDetails>
      )}
    </HuntItemContainer>
  );
}

HuntHistoryItem.propTypes = {
  hunt: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    summary: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};
