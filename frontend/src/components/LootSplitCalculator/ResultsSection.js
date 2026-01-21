/**
 * Results section component
 */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatDuration } from '../../utils/formatters';
import PlayerList from './PlayerList';
import TransferList from './TransferList';
import DamageHealingSection from './DamageHealingSection';
import PlayerStatsRow from './PlayerStatsRow';
import Tooltip from '../common/Tooltip';
import { SectionTitle } from '../common/styled';
import {
  ResultsSectionContainer,
  ResultsSectionSummaryGrid,
  ResultsSectionSummaryCard,
  ResultsSectionSummaryLabel,
  ResultsSectionSummaryValue,
  ResultsSectionDesktopLayout,
  ResultsSectionMobileLayout,
  ResultsSectionStatsSectionTitle,
} from './ResultsSection.styles';

export default function ResultsSection({ results }) {
  const { t } = useTranslation();
  const transferListRef = useRef(null);

  // Scroll to transfer list when results are calculated
  useEffect(() => {
    if (results && results.transfers && results.transfers.length > 0 && transferListRef.current) {
      transferListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [results]);

  if (!results) return null;

  const { summary, players, transfers, copyableText } = results;

  // Calculate total damage and healing for percentage calculation
  const totalDamage = players.reduce((sum, player) => sum + (player.damage || 0), 0);
  const totalHealing = players.reduce((sum, player) => sum + (player.healing || 0), 0);

  return (
    <ResultsSectionContainer data-cy="loot-calculator-results">
      <SectionTitle>{t('calculator.resultsSection.title')}</SectionTitle>

      {/* Summary cards - Overview first */}
      <ResultsSectionSummaryGrid>
        <Tooltip text={t('calculator.resultsSection.summary.tooltips.totalBalance')} position="top">
          <ResultsSectionSummaryCard data-cy="summary-total-balance">
            <ResultsSectionSummaryLabel>{t('calculator.resultsSection.summary.totalBalance')}</ResultsSectionSummaryLabel>
            <ResultsSectionSummaryValue>{summary.totalBalanceFormatted}</ResultsSectionSummaryValue>
          </ResultsSectionSummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.fairShare')} position="top">
          <ResultsSectionSummaryCard data-cy="summary-fair-share">
            <ResultsSectionSummaryLabel>{t('calculator.resultsSection.summary.fairShare')}</ResultsSectionSummaryLabel>
            <ResultsSectionSummaryValue>{summary.fairShareFormatted}</ResultsSectionSummaryValue>
          </ResultsSectionSummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.profitPerHour')} position="top">
          <ResultsSectionSummaryCard data-cy="summary-profit-per-hour">
            <ResultsSectionSummaryLabel>{t('calculator.resultsSection.summary.profitPerHour')}</ResultsSectionSummaryLabel>
            <ResultsSectionSummaryValue>{summary.profitPerHourFormatted}</ResultsSectionSummaryValue>
          </ResultsSectionSummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.duration')} position="top">
          <ResultsSectionSummaryCard data-cy="summary-duration">
            <ResultsSectionSummaryLabel>{t('calculator.resultsSection.summary.duration')}</ResultsSectionSummaryLabel>
            <ResultsSectionSummaryValue>{formatDuration(summary.duration)}</ResultsSectionSummaryValue>
          </ResultsSectionSummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.activePlayers')} position="top">
          <ResultsSectionSummaryCard data-cy="summary-active-players">
            <ResultsSectionSummaryLabel>{t('calculator.resultsSection.summary.activePlayers')}</ResultsSectionSummaryLabel>
            <ResultsSectionSummaryValue>{summary.activePlayers}</ResultsSectionSummaryValue>
          </ResultsSectionSummaryCard>
        </Tooltip>
      </ResultsSectionSummaryGrid>

      {/* Transfer list - Action items */}
      <div ref={transferListRef}>
        <TransferList transfers={transfers} copyableText={copyableText} />
      </div>

      {/* Desktop layout: side-by-side rows (Player card | Damage/Healing card) */}
      <ResultsSectionDesktopLayout>
        <ResultsSectionStatsSectionTitle>{t('calculator.resultsSection.playerList.title')}</ResultsSectionStatsSectionTitle>
        {players.map((player, index) => (
          <PlayerStatsRow
            key={index}
            player={player}
            totalDamage={totalDamage}
            totalHealing={totalHealing}
          />
        ))}
      </ResultsSectionDesktopLayout>

      {/* Mobile layout: separate sections (preserve current stacking) */}
      <ResultsSectionMobileLayout>
        <PlayerList players={players} />
        <DamageHealingSection players={players} />
      </ResultsSectionMobileLayout>
    </ResultsSectionContainer>
  );
}

ResultsSection.propTypes = {
  results: PropTypes.shape({
    summary: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    transfers: PropTypes.array.isRequired,
    copyableText: PropTypes.string.isRequired
  })
};
