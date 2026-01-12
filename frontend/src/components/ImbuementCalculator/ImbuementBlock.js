/**
 * ImbuementBlock Component
 * Displays a single imbuement with price inputs and tier calculations
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import goldTokenIcon from '../../assets/tibia/gold_token.gif';
import coinsIcon from '../../assets/tibia/coins.png';

export default function ImbuementBlock({
  imbuement,
  itemPrices,
  serviceFees,
  goldTokenPrice,
  copiedItem,
  onPriceChange,
  onCopyItemName,
  getBestOption,
  calculateGTCost,
  calculateGPCost,
}) {
  const { t } = useTranslation();

  // State to control which tiers are visible (powerful is default)
  const [showIntricate, setShowIntricate] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  const tiers = ['basic', 'intricate', 'powerful']; // Order: basic → intricate → powerful (top to bottom)

  // Validation: Check if GT price AND all required item prices are filled for a tier
  const isValidForBestComparison = (tier) => {
    // GT price must be filled and > 0
    if (!goldTokenPrice || goldTokenPrice === 0) {
      return false;
    }

    // All items for this tier must be filled and > 0
    const tierIndex = tiers.indexOf(tier);
    for (let i = 0; i <= tierIndex; i++) {
      const currentTier = tiers[i];
      const items = imbuement.items[currentTier];

      for (const item of items) {
        if (!itemPrices[item.name] || itemPrices[item.name] === 0) {
          return false;
        }
      }
    }

    return true;
  };

  // Helper function to calculate cumulative item quantities for tooltip
  const getCumulativeQuantity = (itemName, tier) => {
    const tierIndex = tiers.indexOf(tier);
    let total = 0;

    for (let i = 0; i <= tierIndex; i++) {
      const currentTier = tiers[i];
      const items = imbuement.items[currentTier];
      const item = items.find(it => it.name === itemName);
      if (item) {
        total += item.quantity;
      }
    }

    return total;
  };

  // Helper function to get items cost breakdown (without service fee)
  const getItemsCostBreakdown = (tier) => {
    const tierIndex = tiers.indexOf(tier);
    let totalCost = 0;
    const breakdown = [];

    for (let i = 0; i <= tierIndex; i++) {
      const currentTier = tiers[i];
      const items = imbuement.items[currentTier];

      // eslint-disable-next-line no-loop-func
      items.forEach(item => {
        const itemCost = item.quantity * (itemPrices[item.name] || 0);
        totalCost += itemCost;
        breakdown.push({
          name: item.name,
          quantity: item.quantity,
          unitPrice: itemPrices[item.name] || 0,
          totalCost: itemCost,
        });
      });
    }

    return { totalCost, breakdown };
  };

  return (
    <div className="imbuement-block">
      <h3 className="imbuement-title">
        {imbuement.name}
        <span className="imbuement-description">{imbuement.description}</span>
      </h3>

      {/* Item Price Inputs */}
      <div className="item-prices">
        {tiers.map(tier => {
          const items = imbuement.items[tier];
          return items.map(item => {
            const cumulativeQty = getCumulativeQuantity(item.name, 'powerful');
            const tooltipText = `${item.name}\n\nQuantities needed:\n• Basic: ${getCumulativeQuantity(item.name, 'basic')}\n• Intricate: ${getCumulativeQuantity(item.name, 'intricate')}\n• Powerful: ${getCumulativeQuantity(item.name, 'powerful')}`;

            return (
              <div key={item.name} className="price-input-row" title={tooltipText}>
                <button
                  className="btn-copy-item"
                  onClick={() => onCopyItemName(item.name)}
                  title={t('imbuementCalculator.copyItemName')}
                  aria-label={t('imbuementCalculator.copyItemName')}
                >
                  {copiedItem === item.name ? '✓' : '📋'}
                </button>
                <label>
                  {item.name} ({cumulativeQty}x):
                </label>
                <input
                  type="number"
                  min="0"
                  value={itemPrices[item.name]}
                  onChange={(e) => onPriceChange(item.name, e.target.value)}
                  placeholder="0"
                />
                <span className="gp-label">GP</span>
              </div>
            );
          });
        })}
      </div>

      {/* Calculations per Tier */}
      <div className="calculations">
        {/* Powerful tier - always visible */}
        {(() => {
          const tier = 'powerful';
          const bestOption = getBestOption(imbuement.id, tier);
          const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
          const itemsBreakdown = getItemsCostBreakdown(tier);
          const serviceFee = serviceFees[tier] || 0;
          const gtCostWithoutFee = (imbuement.gtCost[tier] * (calculateGTCost(imbuement.id, tier) - serviceFee)) / imbuement.gtCost[tier] || 0;
          const isValid = isValidForBestComparison(tier);

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              {/* Best Option Highlight (Hybrid scenarios) */}
              {isValid && (bestOption.method === 'hybrid1' || bestOption.method === 'hybrid2') && (
                <div className="best-option-highlight">
                  <div className="best-badge">⭐ Best Option</div>
                  <div className="best-option-content">
                    <strong>{bestOption.name}</strong>
                    <p className="best-option-description">{bestOption.description}</p>
                    <div className="best-option-cost">
                      <span className="cost-label">Total Cost:</span>
                      <span className="cost-value">{bestOption.cost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="cost-comparison">
                <div className={`cost-option ${isValid && bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">GT Cost:</span>
                      <span className="breakdown-value">{gtCostWithoutFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gtCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>

                <div className={`cost-option ${isValid && bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">Items Cost:</span>
                      <span className="breakdown-value">{itemsBreakdown.totalCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gpCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              </div>

              {isValid && bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {
                    bestOption.method === 'gt' ? 'Full GT' :
                    bestOption.method === 'gp' ? 'Full Market' :
                    bestOption.method === 'hybrid1' ? 'Hybrid (Basic GT + rest Market)' :
                    bestOption.method === 'hybrid2' ? 'Hybrid (Basic+Intricate GT + Powerful Market)' :
                    bestOption.name || 'Best Option'
                  }
                </div>
              )}
            </div>
          );
        })()}

        {/* Intricate tier - collapsible */}
        {showIntricate && (() => {
          const tier = 'intricate';
          const bestOption = getBestOption(imbuement.id, tier);
          const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
          const itemsBreakdown = getItemsCostBreakdown(tier);
          const serviceFee = serviceFees[tier] || 0;
          const gtCostWithoutFee = (imbuement.gtCost[tier] * (calculateGTCost(imbuement.id, tier) - serviceFee)) / imbuement.gtCost[tier] || 0;
          const isValid = isValidForBestComparison(tier);

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              {/* Best Option Highlight (Hybrid scenarios) */}
              {isValid && (bestOption.method === 'hybrid1' || bestOption.method === 'hybrid2') && (
                <div className="best-option-highlight">
                  <div className="best-badge">⭐ Best Option</div>
                  <div className="best-option-content">
                    <strong>{bestOption.name}</strong>
                    <p className="best-option-description">{bestOption.description}</p>
                    <div className="best-option-cost">
                      <span className="cost-label">Total Cost:</span>
                      <span className="cost-value">{bestOption.cost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="cost-comparison">
                <div className={`cost-option ${isValid && bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">GT Cost:</span>
                      <span className="breakdown-value">{gtCostWithoutFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gtCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>

                <div className={`cost-option ${isValid && bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">Items Cost:</span>
                      <span className="breakdown-value">{itemsBreakdown.totalCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gpCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              </div>

              {isValid && bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {
                    bestOption.method === 'gt' ? 'Full GT' :
                    bestOption.method === 'gp' ? 'Full Market' :
                    bestOption.method === 'hybrid1' ? 'Hybrid (Basic GT + rest Market)' :
                    bestOption.method === 'hybrid2' ? 'Hybrid (Basic+Intricate GT + Powerful Market)' :
                    bestOption.name || 'Best Option'
                  }
                </div>
              )}
            </div>
          );
        })()}

        {/* Basic tier - collapsible */}
        {showBasic && (() => {
          const tier = 'basic';
          const bestOption = getBestOption(imbuement.id, tier);
          const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
          const itemsBreakdown = getItemsCostBreakdown(tier);
          const serviceFee = serviceFees[tier] || 0;
          const gtCostWithoutFee = (imbuement.gtCost[tier] * (calculateGTCost(imbuement.id, tier) - serviceFee)) / imbuement.gtCost[tier] || 0;
          const isValid = isValidForBestComparison(tier);

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              {/* Best Option Highlight (Hybrid scenarios) */}
              {isValid && (bestOption.method === 'hybrid1' || bestOption.method === 'hybrid2') && (
                <div className="best-option-highlight">
                  <div className="best-badge">⭐ Best Option</div>
                  <div className="best-option-content">
                    <strong>{bestOption.name}</strong>
                    <p className="best-option-description">{bestOption.description}</p>
                    <div className="best-option-cost">
                      <span className="cost-label">Total Cost:</span>
                      <span className="cost-value">{bestOption.cost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="cost-comparison">
                <div className={`cost-option ${isValid && bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">GT Cost:</span>
                      <span className="breakdown-value">{gtCostWithoutFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gtCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>

                <div className={`cost-option ${isValid && bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <div className="cost-breakdown">
                    <div className="breakdown-line">
                      <span className="breakdown-label">Items Cost:</span>
                      <span className="breakdown-value">{itemsBreakdown.totalCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line">
                      <span className="breakdown-label">+ Service Fee:</span>
                      <span className="breakdown-value">{serviceFee.toLocaleString('pt-BR')} GP</span>
                    </div>
                    <div className="breakdown-line total">
                      <span className="breakdown-label">Total:</span>
                      <span className="cost-value">{bestOption.gpCost.toLocaleString('pt-BR')} GP</span>
                    </div>
                  </div>
                </div>
              </div>

              {isValid && bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {
                    bestOption.method === 'gt' ? 'Full GT' :
                    bestOption.method === 'gp' ? 'Full Market' :
                    bestOption.method === 'hybrid1' ? 'Hybrid (Basic GT + rest Market)' :
                    bestOption.method === 'hybrid2' ? 'Hybrid (Basic+Intricate GT + Powerful Market)' :
                    bestOption.name || 'Best Option'
                  }
                </div>
              )}
            </div>
          );
        })()}

        {/* Toggle buttons for additional tiers */}
        <div className="tier-toggles">
          <button
            className={`btn-toggle-tier ${showIntricate ? 'active' : ''}`}
            onClick={() => setShowIntricate(!showIntricate)}
          >
            {showIntricate ? t('imbuementCalculator.hideIntricate') : t('imbuementCalculator.showIntricate')}
          </button>
          <button
            className={`btn-toggle-tier ${showBasic ? 'active' : ''}`}
            onClick={() => setShowBasic(!showBasic)}
          >
            {showBasic ? t('imbuementCalculator.hideBasic') : t('imbuementCalculator.showBasic')}
          </button>
        </div>
      </div>
    </div>
  );
}

ImbuementBlock.propTypes = {
  imbuement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    gtCost: PropTypes.object.isRequired,
  }).isRequired,
  itemPrices: PropTypes.object.isRequired,
  serviceFees: PropTypes.object.isRequired,
  goldTokenPrice: PropTypes.number.isRequired,
  copiedItem: PropTypes.string,
  onPriceChange: PropTypes.func.isRequired,
  onCopyItemName: PropTypes.func.isRequired,
  getBestOption: PropTypes.func.isRequired,
  calculateGTCost: PropTypes.func.isRequired,
  calculateGPCost: PropTypes.func.isRequired,
};
