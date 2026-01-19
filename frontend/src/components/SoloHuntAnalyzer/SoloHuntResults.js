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
  ResultsTitle,
  ResultsIcon,
  ResultCard,
  InfoGrid,
  InfoItem,
  AdditionalCostsLayout,
  CostsEquation,
  CostComponent,
  TotalCostComponent,
  CostLabel,
  CostValueText,
  CostOperator,
  CostPerHourSection,
  FinalBalance,
  FinalBalanceGrid,
  BalanceColumn,
  BalanceItem,
  BalanceLabel,
  BalanceValue,
  FinalBalanceHighlights,
  HighlightItem,
  HighlightLabel,
  HighlightValue,
} from './SoloHuntResults.styles';

export default function SoloHuntResults({ results }) {
  const { t } = useTranslation();
  const { session, costs, adjustedBalance, totalSupplies, profitPerHour, suppliesPerHour, tcTotal, tcPerHour, moneyMaked } = results;
  const { player } = session;

  return (
    <SoloHuntResultsContainer data-cy="solo-hunt-results">
      <ResultsTitle>
        <ResultsIcon>📊</ResultsIcon> {t('soloHuntAnalyzer.results.title')}
      </ResultsTitle>

      {/* Session Info Card */}
      <ResultCard>
        <h3>{t('soloHuntAnalyzer.results.sessionInfo.title')}</h3>
        <InfoGrid>
          <InfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.character')}:</span>
            <span className="value">{player.name}</span>
          </InfoItem>
          <InfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.duration')}:</span>
            <span className="value">{session.duration}</span>
          </InfoItem>
          <InfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.sessionInfo.sessionTime')}:</span>
            <span className="value">{session.sessionInfo}</span>
          </InfoItem>
          <InfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.loot')}:</span>
            {formatGPValue(player.loot).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.loot).full} position="top">
                <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value positive">+{formatGPValue(player.loot).formatted} GP</span>
            )}
          </InfoItem>
          <InfoItem>
            <span className="label">{t('soloHuntAnalyzer.results.lootStats.supplies')}:</span>
            {formatGPValue(player.supplies).formatted.includes('kk') ? (
              <Tooltip text={formatGPValue(player.supplies).full} position="top">
                <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
              </Tooltip>
            ) : (
              <span className="value negative">-{formatGPValue(player.supplies).formatted} GP</span>
            )}
          </InfoItem>
          <Tooltip text={t('soloHuntAnalyzer.results.lootStats.balanceTooltip')} position="top">
            <InfoItem>
              <span className="label">{t('soloHuntAnalyzer.results.lootStats.balance')}:</span>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
                </Tooltip>
              ) : (
                <span className="value neutral">{formatGPValue(player.balance).formatted} GP</span>
              )}
            </InfoItem>
          </Tooltip>
        </InfoGrid>
      </ResultCard>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <ResultCard>
          <h3>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCost')}</h3>
          <AdditionalCostsLayout>
            {/* First line: Cost in GP + GT proportional + ST proportional = total cost */}
            <CostsEquation>
              {costs.partialGP > 0 && (
                <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costInGPTooltip')} position="top">
                  <CostComponent>
                    <CostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.costInGP')}</CostLabel>
                    {formatGPValue(Math.floor(costs.partialGP)).formatted.includes('kk') ? (
                      <Tooltip text={formatGPValue(Math.floor(costs.partialGP)).full} position="top">
                        <CostValueText>-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</CostValueText>
                      </Tooltip>
                    ) : (
                      <CostValueText>-{formatGPValue(Math.floor(costs.partialGP)).formatted} GP</CostValueText>
                    )}
                  </CostComponent>
                </Tooltip>
              )}

              {costs.totalGT > 0 && (
                <>
                  {costs.partialGP > 0 && <CostOperator>+</CostOperator>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportionalTooltip')} position="top">
                    <CostComponent>
                      <CostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.gtProportional')}</CostLabel>
                      {formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).full} position="top">
                          <CostValueText>-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</CostValueText>
                        </Tooltip>
                      ) : (
                        <CostValueText>-{formatGPValue(Math.floor(costs.totalGT * costs.goldTokenPrice)).formatted} GP</CostValueText>
                      )}
                    </CostComponent>
                  </Tooltip>
                </>
              )}

              {costs.totalST > 0 && (
                <>
                  {(costs.partialGP > 0 || costs.totalGT > 0) && <CostOperator>+</CostOperator>}
                  <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.stProportionalTooltip')} position="top">
                    <CostComponent>
                      <CostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.stProportional')}</CostLabel>
                      {formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted.includes('kk') ? (
                        <Tooltip text={formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).full} position="top">
                          <CostValueText>-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</CostValueText>
                        </Tooltip>
                      ) : (
                        <CostValueText>-{formatGPValue(Math.floor(costs.totalST * costs.silverTokenPrice)).formatted} GP</CostValueText>
                      )}
                    </CostComponent>
                  </Tooltip>
                </>
              )}

              <CostOperator>=</CostOperator>

              <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostTooltip')} position="top">
                <TotalCostComponent>
                  <CostLabel>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalCostLabel')}</CostLabel>
                  {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                    <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                      <CostValueText $isTotal>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</CostValueText>
                    </Tooltip>
                  ) : (
                    <CostValueText $isTotal>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</CostValueText>
                  )}
                </TotalCostComponent>
              </Tooltip>
            </CostsEquation>

            {/* Second line: Cost per hour */}
            <Tooltip text={t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHourTooltip')} position="top">
              <CostPerHourSection>
                <span className="cost-label">{t('soloHuntAnalyzer.itemCostManager.costSummary.costPerHour')}</span>
                {formatGPValue(Math.floor(costs.gpPerHour)).formatted.includes('kk') ? (
                  <Tooltip text={formatGPValue(Math.floor(costs.gpPerHour)).full} position="top">
                    <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                  </Tooltip>
                ) : (
                  <span className="cost-value">-{formatGPValue(Math.floor(costs.gpPerHour)).formatted} GP/h</span>
                )}
              </CostPerHourSection>
            </Tooltip>
          </AdditionalCostsLayout>
        </ResultCard>
      )}

      {/* Final Balance Card */}
      <FinalBalance as={ResultCard} $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
        <h3 title={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')}>
          💰 {t('soloHuntAnalyzer.results.finalBalance.title')}
        </h3>

        {/* New Layout - Grid with 2 columns */}
        <FinalBalanceGrid>
          {/* Left Column */}
          <BalanceColumn>
            <BalanceItem>
              <BalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.suppliesUsed')}</BalanceLabel>
              {formatGPValue(player.supplies).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.supplies).full} position="top">
                  <BalanceValue>-{formatGPValue(player.supplies).formatted} GP</BalanceValue>
                </Tooltip>
              ) : (
                <BalanceValue>-{formatGPValue(player.supplies).formatted} GP</BalanceValue>
              )}
            </BalanceItem>
            <BalanceItem>
              <BalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.additionalCost')}</BalanceLabel>
              {formatGPValue(Math.floor(costs.additionalCost)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(costs.additionalCost)).full} position="top">
                  <BalanceValue>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</BalanceValue>
                </Tooltip>
              ) : (
                <BalanceValue>-{formatGPValue(Math.floor(costs.additionalCost)).formatted} GP</BalanceValue>
              )}
            </BalanceItem>
            <BalanceItem>
              <BalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.suppliesPerHour')}</BalanceLabel>
              {formatGPValue(Math.floor(suppliesPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(suppliesPerHour)).full} position="top">
                  <BalanceValue>-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</BalanceValue>
                </Tooltip>
              ) : (
                <BalanceValue>-{formatGPValue(Math.floor(suppliesPerHour)).formatted} GP/h</BalanceValue>
              )}
            </BalanceItem>
          </BalanceColumn>

          {/* Right Column */}
          <BalanceColumn>
            <BalanceItem>
              <BalanceLabel>{t('soloHuntAnalyzer.results.lootStats.balance')}</BalanceLabel>
              {formatGPValue(player.balance).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(player.balance).full} position="top">
                  <BalanceValue>{formatGPValue(player.balance).formatted} GP</BalanceValue>
                </Tooltip>
              ) : (
                <BalanceValue>{formatGPValue(player.balance).formatted} GP</BalanceValue>
              )}
            </BalanceItem>
            {costs.tibiaCoinPrice > 0 && (
              <BalanceItem>
                <BalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.tcPerHour')}</BalanceLabel>
                <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcPerHourTooltip')} position="top">
                  <BalanceValue>{tcPerHour.toFixed(2)} TC/h</BalanceValue>
                </Tooltip>
              </BalanceItem>
            )}
            <BalanceItem>
              <BalanceLabel>{t('soloHuntAnalyzer.results.finalBalance.profitPerHour')}</BalanceLabel>
              {formatGPValue(Math.floor(profitPerHour)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(profitPerHour)).full} position="top">
                  <BalanceValue>{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</BalanceValue>
                </Tooltip>
              ) : (
                <BalanceValue>{formatGPValue(Math.floor(profitPerHour)).formatted} GP/h</BalanceValue>
              )}
            </BalanceItem>
          </BalanceColumn>
        </FinalBalanceGrid>

        {/* Bottom Highlight - 3 main values */}
        <FinalBalanceHighlights>
          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.totalSuppliesTooltip')} position="top">
            <HighlightItem>
              <HighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.totalSupplies')}</HighlightLabel>
              {formatGPValue(Math.floor(totalSupplies)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(totalSupplies)).full} position="top">
                  <HighlightValue $variant="negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</HighlightValue>
                </Tooltip>
              ) : (
                <HighlightValue $variant="negative">-{formatGPValue(Math.floor(totalSupplies)).formatted} GP</HighlightValue>
              )}
            </HighlightItem>
          </Tooltip>

          <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.finalBalanceTooltip')} position="top">
            <HighlightItem $main>
              <HighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.finalBalanceValue')}</HighlightLabel>
              {formatGPValue(Math.floor(adjustedBalance)).formatted.includes('kk') ? (
                <Tooltip text={formatGPValue(Math.floor(adjustedBalance)).full} position="top">
                  <HighlightValue $main $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
                    {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                  </HighlightValue>
                </Tooltip>
              ) : (
                <HighlightValue $main $variant={adjustedBalance >= 0 ? 'positive' : 'negative'}>
                  {adjustedBalance >= 0 ? '+' : ''}{formatGPValue(Math.floor(adjustedBalance)).formatted} GP
                </HighlightValue>
              )}
            </HighlightItem>
          </Tooltip>

          {costs.tibiaCoinPrice > 0 && (
            <Tooltip text={t('soloHuntAnalyzer.results.finalBalance.tcTotalTooltip')} position="top">
              <HighlightItem>
                <HighlightLabel>{t('soloHuntAnalyzer.results.finalBalance.tcTotal')}</HighlightLabel>
                <HighlightValue $variant={tcTotal >= 0 ? 'positive' : 'negative'}>
                  {tcTotal.toFixed(2)} TC
                </HighlightValue>
              </HighlightItem>
            </Tooltip>
          )}

          {costs.tibiaCoinSellPrice > 0 && moneyMaked !== undefined && moneyMaked !== null && (
            <Tooltip text="Real money profit from selling Tibia Coins (TC Total × TC Sell Price)" position="top">
              <HighlightItem>
                <HighlightLabel>💵 Money Earned</HighlightLabel>
                <HighlightValue $variant={moneyMaked >= 0 ? 'positive' : 'negative'}>
                  ${moneyMaked.toFixed(2)}
                </HighlightValue>
              </HighlightItem>
            </Tooltip>
          )}
        </FinalBalanceHighlights>
      </FinalBalance>

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