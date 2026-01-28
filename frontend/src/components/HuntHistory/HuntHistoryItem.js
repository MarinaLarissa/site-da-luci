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
  HuntHistoryItemContainer,
  HuntHistoryItemHeader,
  HuntHistoryItemMain,
  HuntHistoryItemDate,
  HuntHistoryItemDateText,
  HuntHistoryItemTimeText,
  HuntHistoryItemSummary,
  HuntHistoryItemTotalBalance,
  HuntHistoryItemDuration,
  HuntHistoryItemActions,
  HuntHistoryItemDeleteButton,
  HuntHistoryItemExpandButton,
  HuntHistoryItemDetails,
  HuntHistoryItemDetailsSection,
  HuntHistoryItemDetailsTitle,
  HuntHistoryItemDetailsGrid,
  HuntHistoryItemDetailItem,
  HuntHistoryItemDetailLabel,
  HuntHistoryItemDetailValue,
  HuntHistoryItemPlayersList,
  HuntHistoryItemPlayerDetailCard,
  HuntHistoryItemPlayerName,
  HuntHistoryItemLeaderBadge,
  HuntHistoryItemPlayerStatsGrid,
  HuntHistoryItemPlayerStat,
  HuntHistoryItemStatLabel,
  HuntHistoryItemStatIconInline,
  HuntHistoryItemStatValue,
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
    <HuntHistoryItemContainer data-cy="hunt-history-item">
      <HuntHistoryItemHeader onClick={toggleExpand} data-cy="hunt-history-item-header">
        <HuntHistoryItemMain>
          <HuntHistoryItemDate>
            <HuntHistoryItemDateText>{dateStr}</HuntHistoryItemDateText>
            <HuntHistoryItemTimeText>{timeStr}</HuntHistoryItemTimeText>
          </HuntHistoryItemDate>
          <HuntHistoryItemSummary>
            <HuntHistoryItemTotalBalance>{hunt.summary.totalBalanceFormatted}</HuntHistoryItemTotalBalance>
            <HuntHistoryItemDuration>{formatDuration(hunt.summary.duration)}</HuntHistoryItemDuration>
          </HuntHistoryItemSummary>
        </HuntHistoryItemMain>
        <HuntHistoryItemActions>
          <HuntHistoryItemDeleteButton
            onClick={handleDelete}
            aria-label={t('huntHistory.deleteButton')}
            data-cy="hunt-history-item-delete-button"
          >
            🗑️
          </HuntHistoryItemDeleteButton>
          <HuntHistoryItemExpandButton
            aria-label={expanded ? t('huntHistory.collapseButton') : t('huntHistory.expandButton')}
            data-cy="hunt-history-expand-button"
          >
            {expanded ? '−' : '+'}
          </HuntHistoryItemExpandButton>
        </HuntHistoryItemActions>
      </HuntHistoryItemHeader>

      {expanded && (
        <HuntHistoryItemDetails>
          <HuntHistoryItemDetailsSection>
            <HuntHistoryItemDetailsTitle>{t('huntHistory.details.summary')}</HuntHistoryItemDetailsTitle>
            <HuntHistoryItemDetailsGrid>
              <HuntHistoryItemDetailItem>
                <HuntHistoryItemDetailLabel>{t('calculator.resultsSection.summary.fairShare')}:</HuntHistoryItemDetailLabel>
                <HuntHistoryItemDetailValue>{hunt.summary.fairShareFormatted}</HuntHistoryItemDetailValue>
              </HuntHistoryItemDetailItem>
              <HuntHistoryItemDetailItem>
                <HuntHistoryItemDetailLabel>{t('calculator.resultsSection.summary.profitPerHour')}:</HuntHistoryItemDetailLabel>
                <HuntHistoryItemDetailValue>{hunt.summary.profitPerHourFormatted}</HuntHistoryItemDetailValue>
              </HuntHistoryItemDetailItem>
              <HuntHistoryItemDetailItem>
                <HuntHistoryItemDetailLabel>{t('calculator.resultsSection.summary.activePlayers')}:</HuntHistoryItemDetailLabel>
                <HuntHistoryItemDetailValue>{hunt.summary.activePlayers}</HuntHistoryItemDetailValue>
              </HuntHistoryItemDetailItem>
            </HuntHistoryItemDetailsGrid>
          </HuntHistoryItemDetailsSection>

          <HuntHistoryItemDetailsSection>
            <HuntHistoryItemDetailsTitle>{t('huntHistory.details.players')}</HuntHistoryItemDetailsTitle>
            <HuntHistoryItemPlayersList>
              {hunt.players.map((player, index) => (
                <HuntHistoryItemPlayerDetailCard key={index}>
                  <HuntHistoryItemPlayerName>
                    {player.name}
                    {player.isLeader && <HuntHistoryItemLeaderBadge>👑</HuntHistoryItemLeaderBadge>}
                  </HuntHistoryItemPlayerName>
                  <HuntHistoryItemPlayerStatsGrid>
                    <HuntHistoryItemPlayerStat>
                      <HuntHistoryItemStatLabel>{t('calculator.resultsSection.playerList.balance')}:</HuntHistoryItemStatLabel>
                      <HuntHistoryItemStatValue>{formatGold(player.balance)}</HuntHistoryItemStatValue>
                    </HuntHistoryItemPlayerStat>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualDamage')}: ${formatGold(player.damage || 0)}`}
                      position="top"
                    >
                      <HuntHistoryItemPlayerStat>
                        <HuntHistoryItemStatLabel>
                          <HuntHistoryItemStatIconInline src={damageIcon} alt="Damage" /> {t('calculator.resultsSection.damageHealing.damage')}:
                        </HuntHistoryItemStatLabel>
                        <HuntHistoryItemStatValue>{player.damagePercent}%</HuntHistoryItemStatValue>
                      </HuntHistoryItemPlayerStat>
                    </Tooltip>
                    <Tooltip
                      text={`${t('calculator.resultsSection.damageHealing.tooltips.actualHealing')}: ${formatGold(player.healing || 0)}`}
                      position="top"
                    >
                      <HuntHistoryItemPlayerStat>
                        <HuntHistoryItemStatLabel>
                          <HuntHistoryItemStatIconInline src={healingIcon} alt="Healing" /> {t('calculator.resultsSection.damageHealing.healing')}:
                        </HuntHistoryItemStatLabel>
                        <HuntHistoryItemStatValue>{player.healingPercent}%</HuntHistoryItemStatValue>
                      </HuntHistoryItemPlayerStat>
                    </Tooltip>
                  </HuntHistoryItemPlayerStatsGrid>
                </HuntHistoryItemPlayerDetailCard>
              ))}
            </HuntHistoryItemPlayersList>
          </HuntHistoryItemDetailsSection>
        </HuntHistoryItemDetails>
      )}
    </HuntHistoryItemContainer>
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
