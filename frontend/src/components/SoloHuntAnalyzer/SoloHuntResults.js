/**
 * Solo Hunt Results Component
 * Displays the final results with adjusted balance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Tooltip from '../common/Tooltip';
import { formatGPValue } from '../../utils/formatters';
import {
  SoloHuntResultsContainer,
  SoloHuntResultsTitle,
  SoloHuntResultsIcon,
  SoloHuntResultCard,
  SoloHuntResultsInfoGrid,
  SoloHuntResultsInfoItem,
  SoloHuntResultsAdditionalCostsLayout,
  SoloHuntResultsCostsEquation,
  SoloHuntResultsCostComponent,
  SoloHuntResultsTotalCostComponent,
  SoloHuntResultsCostLabel,
  SoloHuntResultsCostValueText,
  SoloHuntResultsCostOperator,
  SoloHuntResultsCostPerHourSection,
  SoloHuntResultsFinalBalance,
  SoloHuntResultsFinalBalanceGrid,
  SoloHuntResultsBalanceColumn,
  SoloHuntResultsBalanceItem,
  SoloHuntResultsBalanceLabel,
  SoloHuntResultsBalanceValue,
  SoloHuntResultsFinalBalanceHighlights,
  SoloHuntResultsHighlightItem,
  SoloHuntResultsHighlightLabel,
  SoloHuntResultsHighlightValue,
} from './SoloHuntResults.styles';

export default function SoloHuntResults({ results }) {
  const { t } = useTranslation();
  const { session, costs, adjustedBalance, totalSupplies, profitPerHour, suppliesPerHour, tcTotal, tcPerHour, moneyMaked } = results;
  const { player } = session;

  return (
    <SoloHuntResultsContainer data-cy="solo-hunt-results">
      <SoloHuntResultsTitle>
        <SoloHuntResultsIcon>📊</SoloHuntResultsIcon> {t('soloHuntAnalyzer.results.title')}
      </SoloHuntResultsTitle>

      {/* Session Info Card */}
      <SoloHuntResultCard>
        <h3>{t('soloHuntAnalyzer.results.sessionInfo.title')}</h3>
        <SoloHuntResultsInfoGrid>
          <SoloHuntResultsInfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.character')}:</span>
            <span className="value">{player.name}</span>
          </SoloHuntResultsInfoItem>
          <SoloHuntResultsInfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.duration')}:</span>
            <span className="value">{session.duration}</span>
          </SoloHuntResultsInfoItem>
          <SoloHuntResultsInfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.sessionTime')}:</span>
            <span className="value">{session.sessionInfo}</span>
          </SoloHuntResultsInfoItem>
          <SoloHuntResultsInfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.loot')}:</span>
            {formatGPValue(player.loot).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.loot).full} position="top">
                <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
            )}
          </SoloHuntResultsInfoItem>
          <SoloHuntResultsInfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
            {formatGPValue(player.supplies).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.supplies).full} position="top">
                <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
            )}
          </SoloHuntResultsInfoItem>
          <Tooltip text={t('soloHuntAnalyzer.results.lootStats.balanceTooltip')} position="top">
            <SoloHuntResultsInfoItem>
              <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
              )}
            </SoloHuntResultsInfoItem>
          </Tooltip>
        </SoloHuntResultsInfoGrid>
      </SoloHuntResultCard>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <SoloHuntResultCard>
          <h3>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCost')}</h3>
          <SoloHuntResultsAdditionalCostsLayout>
            {/* First line: Cost in GP + GT proportional + ST proportional = total cost */}
            <SoloHuntResultsCostsEquation>
              {costs.partialGP > 0 && (
                <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costInGPTooltip')} position="top">
                  <SoloHuntResultsCostComponent>
                    <SoloHuntResultsCostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.costInGP')}</SoloHuntResultsCostLabel>
                    {formatGPValue(Math.floor(costs.partialGP)).formatted.includes('kk') ? (
                      <Tooltip text={formatGPValue(Math.floor(costs.partialGP)).full} position="top">
                        <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</SoloHuntResultsCostValueText>
                      </Tooltip>
                    ) : (
                      <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</SoloHuntResultsCostValueText>
                    )}
                  </SoloHuntResultsCostComponent>
                </Tooltip>
              )}

              {costs.totalGT > 0 && (
                <>
                  {costs.partialGP > 0 && <SoloHuntResultsCostOperator>+</SoloHuntResultsCostOperator>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportionalTooltip')} position="top">
                    <SoloHuntResultsCostComponent>
                      <SoloHuntResultsCostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportional')}</SoloHuntResultsCostLabel>
                      {formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).full} position="top">
                          <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</SoloHuntResultsCostValueText>
                        </Tooltip>
                      ) : (
                        <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</SoloHuntResultsCostValueText>
                      )}
                    </SoloHuntResultsCostComponent>
                  </Tooltip>
                </>
              )}

              {costs.totalST > 0 && (
                <>
                  {(costs.partialGP > 0 || costs.totalGT > 0) && <SoloHuntResultsCostOperator>+</SoloHuntResultsCostOperator>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.stProportionalTooltip')} position="top">
                    <SoloHuntResultsCostComponent>
                      <SoloHuntResultsCostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.stProportional')}</SoloHuntResultsCostLabel>
                      {formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).full} position="top">
                          <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</SoloHuntResultsCostValueText>
                        </Tooltip>
                      ) : (
                        <SoloHuntResultsCostValueText>-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</SoloHuntResultsCostValueText>
                      )}
                    </SoloHuntResultsCostComponent>
                  </Tooltip>
                </>
              )}

              <SoloHuntResultsCostOperator>=</SoloHuntResultsCostOperator>

              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostTooltip')} position="top">
                <SoloHuntResultsTotalCostComponent>
                  <SoloHuntResultsCostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostLabel')}</SoloHuntResultsCostLabel>
                  {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                    <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                      <SoloHuntResultsCostValueText $isTotal>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</SoloHuntResultsCostValueText>
                    </Tooltip>
                  ) : (
                    <SoloHuntResultsCostValueText $isTotal>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</SoloHuntResultsCostValueText>
                  )}
                </SoloHuntResultsTotalCostComponent>
              </Tooltip>
            </SoloHuntResultsCostsEquation>

            {/* Second line: Cost per hour */}
            <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHourTooltip')} position="top">
              <SoloHuntResultsCostPerHourSection>
                <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHour')}</span>
                {formatGPValue(Math.floor(costs.gpPerHour)).formatted.includes('kk') ? (
                  <Tooltip text={formatGPValue(Math.floor(costs.gpPerHour)).full} position="top">
                    <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                  </Tooltip>
                ) : (
                  <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                )}
              </SoloHuntResultsCostPerHourSection>
            </Tooltip>
          </SoloHuntResultsAdditionalCostsLayout>
        </SoloHuntResultCard>
      )}

      {/* Final Balance Card */}
      <SoloHuntResultsFinalBalance as={SoloHuntResultCard} $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
        <h3 title={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')}>
          💰 {t('soloHuntAnalyzer.results.finalBalance.title')}
        </h3>

        {/* New Layout - Grid with 2 columns */}
        <SoloHuntResultsFinalBalanceGrid>
          {/* Left Column */}
          <SoloHuntResultsBalanceColumn>
            <SoloHuntResultsBalanceItem>
              <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.suppliesUsed')}</SoloHuntResultsBalanceLabel>
              {formatGPValue(player.supplies).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.supplies).full} position="top">
                  <SoloHuntResultsBalanceValue>-{formatGPValue(player.supplies).formatted} GP</SoloHuntResultsBalanceValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsBalanceValue>-{formatGPValue(player.supplies).formatted} GP</SoloHuntResultsBalanceValue>
              )}
            </SoloHuntResultsBalanceItem>
            <SoloHuntResultsBalanceItem>
              <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.additionalCost')}</SoloHuntResultsBalanceLabel>
              {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                  <SoloHuntResultsBalanceValue>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</SoloHuntResultsBalanceValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsBalanceValue>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</SoloHuntResultsBalanceValue>
              )}
            </SoloHuntResultsBalanceItem>
            <SoloHuntResultsBalanceItem>
              <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.suppliesPerHour')}</SoloHuntResultsBalanceLabel>
              {formatGPValue(Math.floor(suppliesPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(suppliesPerHour)).full} position="top">
                  <SoloHuntResultsBalanceValue>-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</SoloHuntResultsBalanceValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsBalanceValue>-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</SoloHuntResultsBalanceValue>
              )}
            </SoloHuntResultsBalanceItem>
          </SoloHuntResultsBalanceColumn>

          {/* Right Column */}
          <SoloHuntResultsBalanceColumn>
            <SoloHuntResultsBalanceItem>
              <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.lootStats.balance')}</SoloHuntResultsBalanceLabel>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <SoloHuntResultsBalanceValue>{formatGPValue(player.balance).formatted} GP</SoloHuntResultsBalanceValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsBalanceValue>{formatGPValue(player.balance).formatted} GP</SoloHuntResultsBalanceValue>
              )}
            </SoloHuntResultsBalanceItem>
            {costs.tibiaCoinPrice > 0 && (
              <SoloHuntResultsBalanceItem>
                <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.tcPerHour')}</SoloHuntResultsBalanceLabel>
                <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcPerHourTooltip')} position="top">
                  <SoloHuntResultsBalanceValue>{tcPerHour.toFixed(2)} TC/h</SoloHuntResultsBalanceValue>
                </Tooltip>
              </SoloHuntResultsBalanceItem>
            )}
            <SoloHuntResultsBalanceItem>
              <SoloHuntResultsBalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}</SoloHuntResultsBalanceLabel>
              {formatGPValue(Math.floor(profitPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(profitPerHour)).full} position="top">
                  <SoloHuntResultsBalanceValue>{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</SoloHuntResultsBalanceValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsBalanceValue>{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</SoloHuntResultsBalanceValue>
              )}
            </SoloHuntResultsBalanceItem>
          </SoloHuntResultsBalanceColumn>
        </SoloHuntResultsFinalBalanceGrid>

        {/* Bottom Highlight - 3 main values */}
        <SoloHuntResultsFinalBalanceHighlights>
          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.totalSuppliesTooltip')} position="top">
            <SoloHuntResultsHighlightItem>
              <SoloHuntResultsHighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.totalSupplies')}</SoloHuntResultsHighlightLabel>
              {formatGPValue(Math.floor(totalSupplies)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(totalSupplies)).full} position="top">
                  <SoloHuntResultsHighlightValue $variant="negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</SoloHuntResultsHighlightValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsHighlightValue $variant="negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</SoloHuntResultsHighlightValue>
              )}
            </SoloHuntResultsHighlightItem>
          </Tooltip>

          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')} position="top">
            <SoloHuntResultsHighlightItem $main>
              <SoloHuntResultsHighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.finalBalanceValue')}</SoloHuntResultsHighlightLabel>
              {formatGPValue(Math.floor(adjustedBalance)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(adjustedBalance)).full} position="top">
                  <SoloHuntResultsHighlightValue $main $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
                    {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                  </SoloHuntResultsHighlightValue>
                </Tooltip>
              ) : (
                <SoloHuntResultsHighlightValue $main $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
                  {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                </SoloHuntResultsHighlightValue>
              )}
            </SoloHuntResultsHighlightItem>
          </Tooltip>

          {costs.tibiaCoinPrice > 0 && (
            <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcTotalTooltip')} position="top">
              <SoloHuntResultsHighlightItem>
                <SoloHuntResultsHighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.tcTotal')}</SoloHuntResultsHighlightLabel>
                <SoloHuntResultsHighlightValue $variant={tcTotal >= 0 ? 'positive' : 'negative'}>
                  {tcTotal.toFixed(2)} TC
                </SoloHuntResultsHighlightValue>
              </SoloHuntResultsHighlightItem>
            </Tooltip>
          )}

          {costs.tibiaCoinSellPrice > 0 && moneyMaked !== undefined && moneyMaked !== null && (
            <Tooltip text="Real money profit from selling Tibia Coins (TC Total × TC Sell Price)" position="top">
              <SoloHuntResultsHighlightItem>
                <SoloHuntResultsHighlightLabel>💵 Money Earned</SoloHuntResultsHighlightLabel>
                <SoloHuntResultsHighlightValue $variant={moneyMaked >= 0 ? 'positive' : 'negative'}>
                  ${moneyMaked.toFixed(2)}
                </SoloHuntResultsHighlightValue>
              </SoloHuntResultsHighlightItem>
            </Tooltip>
          )}
        </SoloHuntResultsFinalBalanceHighlights>
      </SoloHuntResultsFinalBalance>

    </SoloHuntResultsContainer>
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