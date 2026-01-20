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
  ResultsContainer,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  DesktopLayout,
  MobileLayout,
  StatsSectionTitle,
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
    <ResultsContainer data-cy="loot-calculator-results">
      <SectionTitle>{t('calculator.resultsSection.title')}</SectionTitle>

      {/* Summary cards - Overview first */}
      <SummaryGrid>
        <Tooltip text={t('calculator.resultsSection.summary.tooltips.totalBalance')} position="top">
          <SummaryCard>
            <SummaryLabel>{t('calculator.resultsSection.summary.totalBalance')}</SummaryLabel>
            <SummaryValue>{summary.totalBalanceFormatted}</SummaryValue>
          </SummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.fairShare')} position="top">
          <SummaryCard>
            <SummaryLabel>{t('calculator.resultsSection.summary.fairShare')}</SummaryLabel>
            <SummaryValue>{summary.fairShareFormatted}</SummaryValue>
          </SummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.profitPerHour')} position="top">
          <SummaryCard>
            <SummaryLabel>{t('calculator.resultsSection.summary.profitPerHour')}</SummaryLabel>
            <SummaryValue>{summary.profitPerHourFormatted}</SummaryValue>
          </SummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.duration')} position="top">
          <SummaryCard>
            <SummaryLabel>{t('calculator.resultsSection.summary.duration')}</SummaryLabel>
            <SummaryValue>{formatDuration(summary.duration)}</SummaryValue>
          </SummaryCard>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.activePlayers')} position="top">
          <SummaryCard>
            <SummaryLabel>{t('calculator.resultsSection.summary.activePlayers')}</SummaryLabel>
            <SummaryValue>{summary.activePlayers}</SummaryValue>
          </SummaryCard>
        </Tooltip>
      </SummaryGrid>

      {/* Transfer list - Action items */}
      <div ref={transferListRef}>
        <TransferList transfers={transfers} copyableText={copyableText} />
      </div>

      {/* Desktop layout: side-by-side rows (Player card | Damage/Healing card) */}
      <DesktopLayout>
        <StatsSectionTitle>{t('calculator.resultsSection.playerList.title')}</StatsSectionTitle>
        {players.map((player, index) => (
          <PlayerStatsRow
            key={index}
            player={player}
            totalDamage={totalDamage}
            totalHealing={totalHealing}
          />
        ))}
      </DesktopLayout>

      {/* Mobile layout: separate sections (preserve current stacking) */}
      <MobileLayout>
        <PlayerList players={players} />
        <DamageHealingSection players={players} />
      </MobileLayout>
    </ResultsContainer>
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
