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
  const { session, costs, adjustedBalance } = results;
  const { player } = session;

  // Parse hunt duration to hours
  const parseDurationToHours = () => {
    const durationStr = session.duration;
    let hours = 0;

    if (durationStr.includes('h')) {
      const parts = durationStr.split(':');
      const hourPart = parseInt(parts[0], 10);
      const minPart = parts[1] ? parseInt(parts[1].replace('h', ''), 10) : 0;
      hours = hourPart + minPart / 60;
    } else {
      // Format "MM:SS" (minutes:seconds)
      const parts = durationStr.split(':');
      const minutes = parseInt(parts[0], 10) || 0;
      const seconds = parts[1] ? parseInt(parts[1], 10) : 0;
      hours = (minutes + seconds / 60) / 60;
    }

    return hours;
  };

  const huntHours = parseDurationToHours();

  const profitPerHour = () => {
    return huntHours > 0 ? (adjustedBalance / huntHours).toFixed(0) : 0;
  };

  return (
    <div className="solo-hunt-results">
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
        </div>
      </div>

      {/* Loot & Supplies Card */}
      <div className="result-card">
        <h3>{t('soloHuntAnalyzer.results.lootStats.title')}</h3>
        <div className="stats-grid">
          <div className="stat-item positive">
            <div className="stat-label">{t('soloHuntAnalyzer.results.lootStats.loot')}</div>
            <div className="stat-value">+{player.loot.toLocaleString('pt-BR')} GP</div>
          </div>
          <div className="stat-item negative">
            <div className="stat-label">{t('soloHuntAnalyzer.results.lootStats.supplies')}</div>
            <div className="stat-value">-{player.supplies.toLocaleString('pt-BR')} GP</div>
          </div>
          <div className="stat-item neutral">
            <div className="stat-label">{t('soloHuntAnalyzer.results.lootStats.balance')}</div>
            <div className="stat-value">{player.balance.toLocaleString('pt-BR')} GP</div>
          </div>
        </div>
      </div>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <div className="result-card">
          <h3>{t('soloHuntAnalyzer.results.costsBreakdown.title')}</h3>
          <div className="stats-grid">
            {costs.totalGP > 0 && (
              <Tooltip text={t('soloHuntAnalyzer.results.costsBreakdown.tooltips.gpCosts')} position="top">
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.gpCosts')}</div>
                  <div className="stat-value">-{costs.totalGP.toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            {costs.totalGT > 0 && (
              <Tooltip
                text={t('soloHuntAnalyzer.results.costsBreakdown.tooltips.gtCosts', {
                  total: costs.totalGT,
                  price: costs.goldTokenPrice,
                  result: (costs.totalGT * costs.goldTokenPrice)
                })}
                position="top"
              >
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.gtConverted')}</div>
                  <div className="stat-value">-{(costs.totalGT * costs.goldTokenPrice).toLocaleString('pt-BR')} GP</div>
                  <div className="stat-detail">{costs.totalGT} GT × {costs.goldTokenPrice.toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            {costs.totalST > 0 && (
              <Tooltip
                text={t('soloHuntAnalyzer.results.costsBreakdown.tooltips.stCosts', {
                  total: costs.totalST,
                  price: costs.silverTokenPrice,
                  result: (costs.totalST * costs.silverTokenPrice),
                  huntHours: huntHours.toFixed(2)
                })}
                position="top"
              >
                <div className="stat-item negative">
                  <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.stConverted')}</div>
                  <div className="stat-value">-{(costs.totalST * costs.silverTokenPrice).toLocaleString('pt-BR')} GP</div>
                  <div className="stat-detail">{costs.totalST} ST × {costs.silverTokenPrice.toLocaleString('pt-BR')} GP</div>
                </div>
              </Tooltip>
            )}

            <Tooltip
              text={t('soloHuntAnalyzer.results.costsBreakdown.tooltips.totalCosts', {
                gpTotal: costs.totalGP,
                gtTotal: costs.totalGT * costs.goldTokenPrice,
                stTotal: costs.totalST * costs.silverTokenPrice,
                finalTotal: (costs.totalGP + (costs.totalGT * costs.goldTokenPrice) + (costs.totalST * costs.silverTokenPrice))
              })}
              position="top"
            >
              <div className="stat-item total-cost">
                <div className="stat-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCost')}</div>
                <div className="stat-value">-{(costs.totalGP + (costs.totalGT * costs.goldTokenPrice) + (costs.totalST * costs.silverTokenPrice)).toLocaleString('pt-BR')} GP</div>
              </div>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Final Balance Card */}
      <div className={`result-card final-balance ${adjustedBalance >= 0 ? 'positive' : 'negative'}`}>
        <h3>💰 {t('soloHuntAnalyzer.results.finalBalance.title')}</h3>
        <div className="final-balance-value">
          {adjustedBalance >= 0 ? '+' : ''}{adjustedBalance.toLocaleString('pt-BR')} GP
        </div>
        <div className="profit-per-hour">
          {adjustedBalance >= 0 ? '📈' : '📉'} {profitPerHour().toLocaleString('pt-BR')} GP/h
        </div>
      </div>

      {/* Combat Stats Card */}
      {(player.damage || player.healing) && (
        <div className="result-card">
          <h3>{t('soloHuntAnalyzer.results.combatStats.title')}</h3>
          <div className="combat-stats">
            {player.damage > 0 && (
              <div className="combat-stat">
                <span className="label">{t('soloHuntAnalyzer.results.combatStats.damage')}:</span>
                <span className="value">{player.damage.toLocaleString('pt-BR')}</span>
              </div>
            )}
            {player.healing > 0 && (
              <div className="combat-stat">
                <span className="label">{t('soloHuntAnalyzer.results.combatStats.healing')}:</span>
                <span className="value">{player.healing.toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>
        </div>
      )}
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
      items: PropTypes.array.isRequired,
    }).isRequired,
    adjustedBalance: PropTypes.number.isRequired,
  }).isRequired,
};