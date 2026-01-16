/**
 * Solo Hunt Results Component
 * Displays the final results with adjusted balance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Tooltip from '../common/Tooltip';
import { formatGPValue } from '../../utils/formatters';
import './SoloHuntResults.css';

export default function SoloHuntResults({ results }) {
  const { t } = useTranslation();
  const { session, costs, adjustedBalance, totalSupplies, profitPerHour, suppliesPerHour, tcTotal, tcPerHour, moneyMaked } = results;
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
            {formatGPValue(player.loot).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.loot).full} position="top">
                <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
            )}
          </div>
          <div className="info-item">
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
            {formatGPValue(player.supplies).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.supplies).full} position="top">
                <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
            )}
          </div>
          <Tooltip text={t('soloHuntAnalyzer.results.lootStats.balanceTooltip')} position="top">
            <div className="info-item">
              <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
              )}
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <div className="result-card">
          <h3>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCost')}</h3>
          <div className="additional-costs-layout">
            {/* First line: Cost in GP + GT proportional + ST proportional = total cost */}
            <div className="costs-equation">
              {costs.partialGP > 0 && (
                <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costInGPTooltip')} position="top">
                  <div className="cost-component">
                    <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.costInGP')}</span>
                    {formatGPValue(Math.floor(costs.partialGP)).formatted.includes('kk') ? (
                      <Tooltip text={formatGPValue(Math.floor(costs.partialGP)).full} position="top">
                        <span className="cost-value">-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</span>
                      </Tooltip>
                    ) : (
                      <span className="cost-value">-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</span>
                    )}
                  </div>
                </Tooltip>
              )}

              {costs.totalGT > 0 && (
                <>
                  {costs.partialGP > 0 && <span className="cost-operator">+</span>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportionalTooltip')} position="top">
                    <div className="cost-component">
                      <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportional')}</span>
                      {formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).full} position="top">
                          <span className="cost-value">-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</span>
                        </Tooltip>
                      ) : (
                        <span className="cost-value">-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</span>
                      )}
                    </div>
                  </Tooltip>
                </>
              )}

              {costs.totalST > 0 && (
                <>
                  {(costs.partialGP > 0 || costs.totalGT > 0) && <span className="cost-operator">+</span>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.stProportionalTooltip')} position="top">
                    <div className="cost-component">
                      <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.stProportional')}</span>
                      {formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).full} position="top">
                          <span className="cost-value">-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</span>
                        </Tooltip>
                      ) : (
                        <span className="cost-value">-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</span>
                      )}
                    </div>
                  </Tooltip>
                </>
              )}

              <span className="cost-operator">=</span>

              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostTooltip')} position="top">
                <div className="cost-component total-cost-component">
                  <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostLabel')}</span>
                  {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                    <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                      <span className="cost-value cost-total">-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</span>
                    </Tooltip>
                  ) : (
                    <span className="cost-value cost-total">-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</span>
                  )}
                </div>
              </Tooltip>
            </div>

            {/* Second line: Cost per hour */}
            <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHourTooltip')} position="top">
              <div className="cost-per-hour-section">
                <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHour')}</span>
                {formatGPValue(Math.floor(costs.gpPerHour)).formatted.includes('kk') ? (
                  <Tooltip text={formatGPValue(Math.floor(costs.gpPerHour)).full} position="top">
                    <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                  </Tooltip>
                ) : (
                  <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                )}
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

        {/* New Layout - Grid with 2 columns */}
        <div className="final-balance-grid">
          {/* Left Column */}
          <div className="balance-column">
            <div className="balance-item">
              <span className="balance-label">{t('soloHuntAnalyzer.results.finalBalance.suppliesUsed')}</span>
              {formatGPValue(player.supplies).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.supplies).full} position="top">
                  <span className="balance-value">-{formatGPValue(player.supplies).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="balance-value">-{formatGPValue(player.supplies).formatted} GP</span>
              )}
            </div>
            <div className="balance-item">
              <span className="balance-label">{t('soloHuntAnalyzer.results.finalBalance.additionalCost')}</span>
              {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                  <span className="balance-value">-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="balance-value">-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</span>
              )}
            </div>
            <div className="balance-item">
              <span className="balance-label">{t('soloHuntAnalyzer.results.finalBalance.suppliesPerHour')}</span>
              {formatGPValue(Math.floor(suppliesPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(suppliesPerHour)).full} position="top">
                  <span className="balance-value">-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</span>
                </Tooltip>
              ) : (
                <span className="balance-value">-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</span>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="balance-column">
            <div className="balance-item">
              <span className="balance-label">{t('soloHuntAnalyzer.results.lootStats.balance')}</span>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <span className="balance-value">{formatGPValue(player.balance).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="balance-value">{formatGPValue(player.balance).formatted} GP</span>
              )}
            </div>
            {costs.tibiaCoinPrice > 0 && (
              <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcPerHourTooltip')} position="top">
                <div className="balance-item">
                  <span className="balance-label">{t('soloHuntAnalyzer.results.finalBalance.tcPerHour')}</span>
                  <span className="balance-value">{tcPerHour.toFixed(2)} TC/h</span>
                </div>
              </Tooltip>
            )}
            <div className="balance-item">
              <span className="balance-label">{t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}</span>
              {formatGPValue(Math.floor(profitPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(profitPerHour)).full} position="top">
                  <span className="balance-value">{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</span>
                </Tooltip>
              ) : (
                <span className="balance-value">{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Highlight - 3 main values */}
        <div className="final-balance-highlights">
          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.totalSuppliesTooltip')} position="top">
            <div className="highlight-item">
              <span className="highlight-label">{t('soloHuntAnalyzer.results.finalBalance.totalSupplies')}</span>
              {formatGPValue(Math.floor(totalSupplies)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(totalSupplies)).full} position="top">
                  <span className="highlight-value negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="highlight-value negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</span>
              )}
            </div>
          </Tooltip>

          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')} position="top">
            <div className="highlight-item main">
              <span className="highlight-label">{t('soloHuntAnalyzer.results.finalBalance.finalBalanceValue')}</span>
              {formatGPValue(Math.floor(adjustedBalance)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(adjustedBalance)).full} position="top">
                  <span className={`highlight-value ${adjustedBalance >= 0 ? 'positive' : 'negative'}`}>
                    {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                  </span>
                </Tooltip>
              ) : (
                <span className={`highlight-value ${adjustedBalance >= 0 ? 'positive' : 'negative'}`}>
                  {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                </span>
              )}
            </div>
          </Tooltip>

          {costs.tibiaCoinPrice > 0 && (
            <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcTotalTooltip')} position="top">
              <div className="highlight-item">
                <span className="highlight-label">{t('soloHuntAnalyzer.results.finalBalance.tcTotal')}</span>
                <span className={`highlight-value ${tcTotal >= 0 ? 'positive' : 'negative'}`}>
                  {tcTotal.toFixed(2)} TC
                </span>
              </div>
            </Tooltip>
          )}

          {costs.tibiaCoinSellPrice > 0 && moneyMaked !== undefined && moneyMaked !== null && (
            <Tooltip text="Real money profit from selling Tibia Coins (TC Total × TC Sell Price)" position="top">
              <div className="highlight-item">
                <span className="highlight-label">💵 Money Earned</span>
                <span className={`highlight-value ${moneyMaked >= 0 ? 'positive' : 'negative'}`}>
                  ${moneyMaked.toFixed(2)}
                </span>
              </div>
            </Tooltip>
          )}
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
      partialGP: PropTypes.number.isRequired,
      totalGT: PropTypes.number.isRequired,
      totalST: PropTypes.number.isRequired,
      goldTokenPrice: PropTypes.number.isRequired,
      silverTokenPrice: PropTypes.number.isRequired,
      tibiaCoinPrice: PropTypes.number.isRequired,
      tibiaCoinSellPrice: PropTypes.number,
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
    tcTotal: PropTypes.number.isRequired,
    tcPerHour: PropTypes.number.isRequired,
    moneyMaked: PropTypes.number,
  }).isRequired,
};