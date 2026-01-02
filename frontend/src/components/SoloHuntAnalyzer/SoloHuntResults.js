/**
 * Solo Hunt Results Component
 * Displays the final results with adjusted balance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Tooltip from '../common/Tooltip';
import './SoloHuntResults.css';

export default function SoloHuntResults({ results }) {
  const { t } = useTranslation();
  const { session, costs, adjustedBalance, totalSupplies, profitPerHour, suppliesPerHour } = results;
  const { player } = session;

  return (
    <div className="solo-hunt-results" data-cy="solo-hunt-results">
      <h2 className="results-title">
        <span className="results-icon">📊</span> {t('soloHuntAnalyzer.results.title')}
      </h2>

      {/* Session Info Card */}
      <div className="result-card">
        <h3>{t('soloHuntAnalyzer.results.sessionInfo.title')}</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.character')}:</span>
            <span className="value">{player.name}</span>
          </div>
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.duration')}:</span>
            <span className="value">{session.duration}</span>
          </div>
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.sessionTime')}:</span>
            <span className="value">{session.sessionInfo}</span>
          </div>
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.loot')}:</span>
            <span className="value positive">+{player.loot.toLocaleString('pt-BR')} GP</span>
          </div>
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
            <span className="value negative">-{player.supplies.toLocaleString('pt-BR')} GP</span>
          </div>
          <Tooltip text={t('soloHuntAnalyzer.results.lootStats.balanceTooltip')} position="top">
            <div className="info-item">
              <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
              <span className="value neutral">{player.balance.toLocaleString('pt-BR')} GP</span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <div className="result-card">
          <h3>{t('soloHuntAnalyzer.results.costsBreakdown.title')}</h3>
          <div className="stats-grid">
            {costs.partialGP > 0 && (
              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.partialGPTooltip')} position="top">
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.partialGP')}</div>
                  <div className="stat-value">-{costs.partialGP.toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            {costs.totalGT > 0 && (
              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.gtConvertedTooltip')} position="top">
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.gtConverted')}</div>
                  <div className="stat-value">-{(costs.totalGT * costs.goldTokenPrice).toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            {costs.totalST > 0 && (
              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.stConvertedTooltip')} position="top">
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.stConverted')}</div>
                  <div className="stat-value">-{(costs.totalST * costs.silverTokenPrice).toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.gpPerHourTooltip')} position="top">
              <div className="stat-item negative">
                <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.gpPerHour')}</div>
                <div className="stat-value">-{costs.gpPerHour.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} GP/h</div>
              </div>
            </Tooltip>

            <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.additionalCostTooltip')} position="top">
              <div className="stat-item negative">
                <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.additionalCost')}</div>
                <div className="stat-value">-{costs.additionalCost.toLocaleString('pt-BR')} GP</div>
              </div>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Final Balance Card */}
      <div className={`result-card final-balance ${adjustedBalance >= 0 ? 'positive' : 'negative'}`}>
        <h3 title={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')}>
          💰 {t('soloHuntAnalyzer.results.finalBalance.title')}
        </h3>
        <div className="profit-per-hour" title={t('soloHuntAnalyzer.results.finalBalance.totalSuppliesTooltip')}>
          📦 {t('soloHuntAnalyzer.results.finalBalance.totalSupplies')}: -{totalSupplies.toLocaleString('pt-BR')} GP
        </div>
        <div className="profit-per-hour">
          {adjustedBalance >= 0 ? '📈' : '📉'} {t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}: {profitPerHour.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} GP/h
        </div>
        <div className="profit-per-hour">
          📦 {t('soloHuntAnalyzer.results.finalBalance.suppliesPerHour')}: -{suppliesPerHour.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} GP/h
        </div>
        <div className="final-balance-value">
          {adjustedBalance >= 0 ? '+' : ''}{adjustedBalance.toLocaleString('pt-BR')} GP
        </div>
      </div>

    </div>
  );
}

// PropTypes validation
SoloHuntResults.propTypes = {
  results: PropTypes.shape({
    session: PropTypes.shape({
      sessionInfo: PropTypes.string,
      duration: PropTypes.string,
      player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        loot: PropTypes.number.isRequired,
        supplies: PropTypes.number.isRequired,
        balance: PropTypes.number.isRequired,
        damage: PropTypes.number,
        healing: PropTypes.number,
      }).isRequired,
    }).isRequired,
    costs: PropTypes.shape({
      totalGP: PropTypes.number.isRequired,
      totalGT: PropTypes.number.isRequired,
      totalST: PropTypes.number.isRequired,
      goldTokenPrice: PropTypes.number.isRequired,
      silverTokenPrice: PropTypes.number.isRequired,
      gpPerHour: PropTypes.number.isRequired,
      additionalCost: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string.isRequired,
          unitPrice: PropTypes.number.isRequired,
          quantity: PropTypes.number.isRequired,
          priceType: PropTypes.oneOf(['GP', 'GT', 'ST']).isRequired,
          itemDuration: PropTypes.number,
        })
      ).isRequired,
    }).isRequired,
    totalSupplies: PropTypes.number.isRequired,
    adjustedBalance: PropTypes.number.isRequired,
    profitPerHour: PropTypes.number.isRequired,
    suppliesPerHour: PropTypes.number.isRequired,
  }).isRequired,
};