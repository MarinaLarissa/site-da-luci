/**
 * Results section component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold, formatDuration } from '../../utils/formatters';
import PlayerList from './PlayerList';
import TransferList from './TransferList';
import Tooltip from '../common/Tooltip';
import './ResultsSection.css';

export default function ResultsSection({ results }) {
  const { t } = useTranslation();

  if (!results) return null;

  const { summary, players, transfers, copyableText } = results;

  return (
    <div className="results-section">
      <h2 className="section-title">{t('calculator.resultsSection.title')}</h2>

      {/* Transfer list - First priority for user action */}
      <TransferList transfers={transfers} copyableText={copyableText} />

      {/* Summary cards */}
      <div className="summary-grid">
        <Tooltip text={t('calculator.resultsSection.summary.tooltips.totalBalance')} position="top">
          <div className="summary-card">
            <div className="summary-label">{t('calculator.resultsSection.summary.totalBalance')}</div>
            <div className="summary-value">{summary.totalBalanceFormatted}</div>
          </div>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.fairShare')} position="top">
          <div className="summary-card">
            <div className="summary-label">{t('calculator.resultsSection.summary.fairShare')}</div>
            <div className="summary-value">{summary.fairShareFormatted}</div>
          </div>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.profitPerHour')} position="top">
          <div className="summary-card">
            <div className="summary-label">{t('calculator.resultsSection.summary.profitPerHour')}</div>
            <div className="summary-value">{summary.profitPerHourFormatted}</div>
          </div>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.duration')} position="top">
          <div className="summary-card">
            <div className="summary-label">{t('calculator.resultsSection.summary.duration')}</div>
            <div className="summary-value">{formatDuration(summary.duration)}</div>
          </div>
        </Tooltip>

        <Tooltip text={t('calculator.resultsSection.summary.tooltips.activePlayers')} position="top">
          <div className="summary-card">
            <div className="summary-label">{t('calculator.resultsSection.summary.activePlayers')}</div>
            <div className="summary-value">{summary.activePlayers}</div>
          </div>
        </Tooltip>
      </div>

      {/* Player list */}
      <PlayerList players={players} />
    </div>
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
