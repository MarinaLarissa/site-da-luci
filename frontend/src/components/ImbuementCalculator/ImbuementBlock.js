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
  copiedItem,
  onPriceChange,
  onCopyItemName,
  getBestOption,
}) {
  const { t } = useTranslation();

  // State to control which tiers are visible (powerful is default)
  const [showIntricate, setShowIntricate] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  const tiers = ['basic', 'intricate', 'powerful']; // Order: basic → intricate → powerful (top to bottom)

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
          return items.map(item => (
            <div key={item.name} className="price-input-row">
              <button
                className="btn-copy-item"
                onClick={() => onCopyItemName(item.name)}
                title={t('imbuementCalculator.copyItemName')}
                aria-label={t('imbuementCalculator.copyItemName')}
              >
                {copiedItem === item.name ? '✓' : '📋'}
              </button>
              <label>{item.name}:</label>
              <input
                type="number"
                min="0"
                value={itemPrices[item.name]}
                onChange={(e) => onPriceChange(item.name, e.target.value)}
                placeholder="0"
              />
              <span className="gp-label">GP</span>
            </div>
          ));
        })}
      </div>

      {/* Calculations per Tier */}
      <div className="calculations">
        {/* Powerful tier - always visible */}
        {(() => {
          const tier = 'powerful';
          const bestOption = getBestOption(imbuement.id, tier);
          const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              <div className="cost-comparison">
                <div className={`cost-option ${bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <span className="cost-value">
                    {bestOption.gtCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>

                <div className={`cost-option ${bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <span className="cost-value">
                    {bestOption.gpCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>
              </div>

              {bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {bestOption.method === 'gt' ? 'GT' : 'Market'}
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

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              <div className="cost-comparison">
                <div className={`cost-option ${bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <span className="cost-value">
                    {bestOption.gtCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>

                <div className={`cost-option ${bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <span className="cost-value">
                    {bestOption.gpCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>
              </div>

              {bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {bestOption.method === 'gt' ? 'GT' : 'Market'}
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

          return (
            <div key={tier} className="calculation-row">
              <h4 className="tier-name">{tierName}</h4>

              <div className="cost-comparison">
                <div className={`cost-option ${bestOption.method === 'gt' ? 'best' : ''}`}>
                  <img src={goldTokenIcon} alt="GT" className="icon-small" />
                  <span>{imbuement.gtCost[tier]} GT</span>
                  <span className="cost-value">
                    {bestOption.gtCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>

                <div className={`cost-option ${bestOption.method === 'gp' ? 'best' : ''}`}>
                  <img src={coinsIcon} alt="GP" className="icon-small" />
                  <span>Market Items</span>
                  <span className="cost-value">
                    {bestOption.gpCost.toLocaleString('pt-BR')} GP
                  </span>
                </div>
              </div>

              {bestOption.savings > 0 && (
                <div className="savings">
                  💰 Save {bestOption.savings.toLocaleString('pt-BR')} GP using {bestOption.method === 'gt' ? 'GT' : 'Market'}
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
  copiedItem: PropTypes.string,
  onPriceChange: PropTypes.func.isRequired,
  onCopyItemName: PropTypes.func.isRequired,
  getBestOption: PropTypes.func.isRequired,
};
