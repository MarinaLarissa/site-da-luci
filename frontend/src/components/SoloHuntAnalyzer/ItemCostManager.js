/**
 * Item Cost Manager Component
 * Allows user to add imbuement presets or custom items with costs (GP/GT/ST)
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IMBUEMENTS, getAllCategories, getImbuementsByCategory } from '../../data/imbuements';
import './ItemCostManager.css';
import goldTokenIcon from '../../assets/tibia/gold_token.gif';
import silverTokenIcon from '../../assets/tibia/silver_token.gif';
import coinsIcon from '../../assets/tibia/coins.png';
import arborealRingIcon from '../../assets/tibia/arboreal_ring.gif';
import alicornRingIcon from '../../assets/tibia/alicorn_ring.gif';
import arcanomancerSigilIcon from '../../assets/tibia/Arcanomancer_Sigil.gif';
import etherealRingIcon from '../../assets/tibia/Ethereal_Ring.gif';
import spiritthornRingIcon from '../../assets/tibia/Spiritthorn_Ring.gif';

// Only these imbuements can be paid with GT
const GT_ELIGIBLE_IMBUEMENTS = ['void', 'vampirism', 'strike'];

/**
 * Item duration constants (in hours)
 * Used for proportional cost calculation
 */
const DURATION = {
  IMBUEMENT: 20,  // Imbuements last 20 hours
  RING_BIS: 3,    // Ring Bis lasts 3 hours
};

/**
 * Fixed imbuement service costs by tier (as of December 2024)
 * These are the NPC costs for applying imbuements in Tibia
 * Source: https://tibia.fandom.com/wiki/Imbuements
 */
const IMBUEMENT_FIXED_COSTS = {
  basic: 7500,      // Basic tier service cost (7.5k GP)
  intricate: 60000,  // Intricate tier service cost (60k GP)
  powerful: 250000,  // Powerful tier service cost (250k GP)
};

export default function ItemCostManager({
  customItems,
  setCustomItems,
  goldTokenPrice,
  setGoldTokenPrice,
  silverTokenPrice,
  setSilverTokenPrice,
  silverTokenError = false
}) {
  const { t } = useTranslation();
  const [showImbuementModal, setShowImbuementModal] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [showRingBisModal, setShowRingBisModal] = useState(false);

  // Collapse state - track which parent items are collapsed (start all collapsed)
  const [collapsedItems, setCollapsedItems] = useState(new Set());

  // Ring Bis selection state
  const [selectedRing, setSelectedRing] = useState('');

  // Imbuement selection state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImbuement, setSelectedImbuement] = useState('');
  const [selectedTier, setSelectedTier] = useState('powerful');
  const [gtPayment, setGtPayment] = useState(0); // How many GT to pay (0, 2, 4, or 6)

  // Custom item state
  const [customItemName, setCustomItemName] = useState('');
  const [customItemQuantity, setCustomItemQuantity] = useState(1);
  const [customItemPrice, setCustomItemPrice] = useState(0);
  const [customItemPriceType, setCustomItemPriceType] = useState('GP');

  /**
   * Add imbuement preset to custom items
   * Logic: Each tier includes ALL items from previous tiers (cumulative)
   * GT payment covers tiers: 2 GT = basic, 4 GT = basic+intricate, 6 GT = all
   * Creates hierarchical structure: parent imbuement item with nested material items
   */
  const handleAddImbuement = () => {
    if (!selectedImbuement) return;

    const imbuement = IMBUEMENTS.find(imb => imb.id === selectedImbuement);
    if (!imbuement) return;

    const parentId = Date.now() + Math.random();
    const newItems = [];

    // Determine which tiers to include based on selected tier (cumulative)
    const tierOrder = ['basic', 'intricate', 'powerful'];
    const selectedTierIndex = tierOrder.indexOf(selectedTier);
    const tiersToInclude = tierOrder.slice(0, selectedTierIndex + 1);

    // Determine which tiers are covered by GT payment
    let tiersCoveredByGT = [];
    if (gtPayment >= 2) tiersCoveredByGT.push('basic');
    if (gtPayment >= 4) tiersCoveredByGT.push('intricate');
    if (gtPayment >= 6) tiersCoveredByGT.push('powerful');

    // Collect child items (materials to pay in GP)
    const childItems = [];
    tiersToInclude.forEach(tierName => {
      if (!tiersCoveredByGT.includes(tierName)) {
        const tier = imbuement.tiers[tierName];
        if (tier && tier.items) {
          tier.items.forEach(item => {
            childItems.push({
              id: Date.now() + Math.random(),
              name: item.name,
              quantity: item.quantity,
              baseQuantity: item.quantity, // Store base quantity for multiplying when parent quantity changes
              unitPrice: 0,
              priceType: 'GP',
              parentId: parentId,
              isChild: true,
              itemDuration: DURATION.IMBUEMENT,
            });
          });
        }
      }
    });

    // Add fixed imbuement cost as a child item
    const fixedCost = IMBUEMENT_FIXED_COSTS[selectedTier];
    if (fixedCost) {
      childItems.push({
        id: Date.now() + Math.random(),
        name: `${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Imbuement Service`,
        quantity: 1,
        baseQuantity: 1, // Store base quantity for multiplying when parent quantity changes
        unitPrice: fixedCost,
        priceType: 'GP',
        parentId: parentId,
        isChild: true,
        isFixedCost: true,
        itemDuration: DURATION.IMBUEMENT,
      });
    }

    // Create parent imbuement item
    const tierName = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
    const parentItem = {
      id: parentId,
      name: `${tierName} ${imbuement.name} Imbuement`,
      quantity: 1,
      unitPrice: gtPayment,
      priceType: 'GT',
      isParent: true,
      hasChildren: childItems.length > 0,
      itemDuration: DURATION.IMBUEMENT,
    };

    // Add parent first, then children
    newItems.push(parentItem);
    newItems.push(...childItems);

    setCustomItems([...customItems, ...newItems]);

    // Auto-collapse new parent item (start collapsed)
    if (childItems.length > 0) {
      setCollapsedItems(prev => new Set([...prev, parentId]));
    }

    // Reset selection
    setSelectedImbuement('');
    setSelectedTier('powerful');
    setGtPayment(0);
    setShowImbuementModal(false);
  };

  /**
   * Add Ring Bis preset with selected vocation
   * Ring Bis costs 5 ST to recharge and lasts 3 hours
   */
  const handleAddRingBis = () => {
    if (!selectedRing) return;

    const newItem = {
      id: Date.now(),
      name: selectedRing,
      quantity: 1,
      unitPrice: 5,
      priceType: 'ST',
      itemDuration: DURATION.RING_BIS,
      isParent: true,
      hasChildren: false,
    };

    setCustomItems([...customItems, newItem]);
    setSelectedRing('');
    setShowRingBisModal(false);
  };

  /**
   * Paste configuration from Imbuement Calculator
   * Parses clipboard content and adds items automatically
   */
  const handlePasteFromImbuementCalc = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      // Parse the configuration text
      // Format: "Powerful Vampirism Imbuement:\n- Use 6 GT (X GP equivalent)\n" or
      // "Powerful Vampirism Imbuement:\n- Buy items directly (market prices only):\n  - 5x Item: X GP\nTotal: X GP"

      const lines = clipboardText.split('\n');
      if (lines.length === 0) return;

      // Extract imbuement name from first line
      const titleMatch = lines[0].match(/^(Basic|Intricate|Powerful)\s+(.+)\s+Imbuement:$/);
      if (!titleMatch) {
        alert('Invalid format. Please copy from Imbuement Calculator.');
        return;
      }

      const tier = titleMatch[1];
      const imbuementName = titleMatch[2];
      const parentId = Date.now() + Math.random();

      // Check if it's GT payment or item purchase
      const isGTPayment = lines[1]?.includes('Use') && lines[1]?.includes('GT');

      if (isGTPayment) {
        // GT payment method
        const gtMatch = lines[1].match(/Use (\d+) GT \(([\d,.]+) GP equivalent\)/);
        if (!gtMatch) return;

        const gtAmount = parseInt(gtMatch[1]);

        // Add as single item with GT payment
        const newItem = {
          id: parentId,
          name: `${tier} ${imbuementName} Imbuement`,
          quantity: 1,
          unitPrice: gtAmount,
          priceType: 'GT',
          proportionalDuration: DURATION.IMBUEMENT,
        };

        setCustomItems([...customItems, newItem]);
      } else {
        // Market items payment
        const childItems = [];

        for (let i = 2; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith('Total:') || line.startsWith('- Buy')) continue;

          // Match pattern: "  - 5x Item Name: 1.000 GP"
          const itemMatch = line.match(/^\s*-\s*(\d+)x\s+(.+?):\s+([\d,.]+)\s+GP$/);
          if (itemMatch) {
            const quantity = parseInt(itemMatch[1]);
            const itemName = itemMatch[2];
            const totalCost = parseFloat(itemMatch[3].replace(/\./g, '').replace(',', '.'));
            const unitPrice = totalCost / quantity;

            childItems.push({
              id: Date.now() + Math.random(),
              name: itemName,
              quantity: quantity,
              baseQuantity: quantity,
              unitPrice: unitPrice,
              priceType: 'GP',
              proportionalDuration: DURATION.IMBUEMENT,
              parentId: parentId,
            });
          }
        }

        if (childItems.length > 0) {
          // Add parent item
          const parentItem = {
            id: parentId,
            name: `${tier} ${imbuementName} Imbuement`,
            quantity: 1,
            unitPrice: 0,
            priceType: 'GP',
            proportionalDuration: DURATION.IMBUEMENT,
            isParent: true,
            hasChildren: true,
          };

          setCustomItems([...customItems, parentItem, ...childItems]);
        }
      }

      alert('Items pasted successfully from Imbuement Calculator!');
    } catch (error) {
      console.error('Failed to paste from clipboard:', error);
      alert('Failed to paste. Make sure you copied from Imbuement Calculator first.');
    }
  };

  /**
   * Add custom item
   */
  const handleAddCustomItem = () => {
    if (!customItemName.trim() || customItemQuantity <= 0) return;

    const newItem = {
      id: Date.now(),
      name: customItemName,
      quantity: customItemQuantity,
      unitPrice: customItemPrice,
      priceType: customItemPriceType,
    };

    setCustomItems([...customItems, newItem]);

    // Reset form
    setCustomItemName('');
    setCustomItemQuantity(1);
    setCustomItemPrice(0);
    setCustomItemPriceType('GP');
    setShowCustomItemModal(false);
  };

  /**
   * Update item price
   */
  const handleUpdateItemPrice = (itemId, field, value) => {
    setCustomItems(
      customItems.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  /**
   * Remove item (and its children if it's a parent)
   */
  const handleRemoveItem = (itemId) => {
    setCustomItems(customItems.filter(item =>
      item.id !== itemId && item.parentId !== itemId
    ));
    // Remove from collapsed items if it exists
    setCollapsedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  /**
   * Toggle collapse state for a parent item
   */
  const toggleItemCollapse = (parentId) => {
    setCollapsedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(parentId)) {
        newSet.delete(parentId); // Expand
      } else {
        newSet.add(parentId); // Collapse
      }
      return newSet;
    });
  };

  /**
   * Update parent imbuement quantity and propagate to children
   */
  const handleUpdateParentQuantity = (parentId, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow quantity < 1

    setCustomItems(customItems.map(item => {
      // Update parent quantity
      if (item.id === parentId) {
        return { ...item, quantity: newQuantity };
      }
      // Update children quantities (multiply baseQuantity by parent quantity)
      if (item.parentId === parentId && item.baseQuantity !== undefined) {
        return { ...item, quantity: item.baseQuantity * newQuantity };
      }
      return item;
    }));
  };

  /**
   * Calculate total cost
   */
  const calculateTotalCost = () => {
    let totalGP = 0;
    let totalGT = 0;
    let totalST = 0;

    customItems.forEach(item => {
      // Calculate costs for all items (parent GT/ST costs + child GP costs)
      if (item.priceType === 'GP') {
        totalGP += item.unitPrice * item.quantity;
      } else if (item.priceType === 'GT') {
        totalGT += item.unitPrice * item.quantity;
      } else if (item.priceType === 'ST') {
        totalST += item.unitPrice * item.quantity;
      }
    });

    return { totalGP, totalGT, totalST };
  };

  /**
   * Calculate total GP cost for a parent's children
   */
  const calculateChildrenGPCost = (parentId) => {
    let total = 0;
    customItems.forEach(item => {
      if (item.parentId === parentId && item.priceType === 'GP') {
        total += item.unitPrice * item.quantity;
      }
    });
    return total;
  };

  const { totalGP, totalGT, totalST } = calculateTotalCost();

  // Get imbuements for selected category
  const availableImbuements = selectedCategory
    ? getImbuementsByCategory(selectedCategory)
    : [];

  return (
    <div className="item-cost-manager">
      <h2 className="section-title">{t('soloHuntAnalyzer.itemCostManager.title')}</h2>

      <p className="section-description">
        {t('soloHuntAnalyzer.itemCostManager.sectionDescription')}
      </p>

          {/* Token Prices */}
          <div className="token-prices-section">
        <div className="token-price-row">
          <img src={goldTokenIcon} alt="Gold Token" className="token-icon" />
          <label htmlFor="gold-token-price-input">{t('soloHuntAnalyzer.itemCostManager.goldTokenLabel')}</label>
          <input
            id="gold-token-price-input"
            type="number"
            value={goldTokenPrice}
            onChange={(e) => setGoldTokenPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 45000"
            min="0"
            aria-label={t('soloHuntAnalyzer.itemCostManager.goldTokenAriaLabel')}
            data-cy="solo-hunt-input-gt-price"
          />
          <img src={coinsIcon} alt="GP" className="coin-icon-small" />
          <span className="unit">GP</span>
        </div>

        <div className={`token-price-row ${silverTokenError ? 'error' : ''}`}>
          <img src={silverTokenIcon} alt="Silver Token" className="token-icon" />
          <label htmlFor="silver-token-price-input">{t('soloHuntAnalyzer.itemCostManager.silverTokenLabel')}</label>
          <input
            id="silver-token-price-input"
            type="number"
            value={silverTokenPrice}
            onChange={(e) => setSilverTokenPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 15000"
            min="0"
            aria-label={t('soloHuntAnalyzer.itemCostManager.silverTokenAriaLabel')}
            className={silverTokenError ? 'error' : ''}
            data-cy="solo-hunt-input-st-price"
          />
          <img src={coinsIcon} alt="GP" className="coin-icon-small" />
          <span className="unit">GP</span>
        </div>
      </div>

      {/* Add buttons */}
      <div className="add-buttons">
        <button
          className="btn btn-primary"
          onClick={() => setShowImbuementModal(true)}
          data-cy="solo-hunt-button-add-imbuement"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addImbuementButton')}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowRingBisModal(true)}
          title={t('soloHuntAnalyzer.itemCostManager.ringBisTooltip')}
          data-cy="solo-hunt-button-add-ringbis"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addRingBisButton')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowCustomItemModal(true)}
          data-cy="solo-hunt-button-add-custom-item"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addCustomItemButton')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handlePasteFromImbuementCalc}
          title="Paste configuration from Imbuement Calculator"
          data-cy="solo-hunt-button-paste-imbuement"
        >
          📋 Paste from Imbuement Calc
        </button>
      </div>

      {/* Items list */}
      {customItems.length > 0 && (
        <div className="items-list">
          <h3>{t('soloHuntAnalyzer.itemCostManager.itemsListTitle')}</h3>
          <div className="items-table">
            <div className="items-header">
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.item')}</div>
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.quantity')}</div>
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.unitPrice')}</div>
              <div></div>
            </div>
            {customItems.map(item => {
              // Skip child items - they'll be rendered under their parent
              if (item.isChild) return null;

              // Render parent item
              const childrenGPCost = item.isParent ? calculateChildrenGPCost(item.id) : 0;

              const isCollapsed = collapsedItems.has(item.id);

              return (
                <React.Fragment key={item.id}>
                  {/* Parent or standalone item row */}
                  <div className={`items-row ${item.isParent ? 'parent-row' : ''}`}>
                    <div className="item-name">
                      {item.isParent && item.hasChildren && (
                        <button
                          className="btn-collapse"
                          onClick={() => toggleItemCollapse(item.id)}
                          aria-label={isCollapsed ? t('soloHuntAnalyzer.itemCostManager.itemsList.expandItems') : t('soloHuntAnalyzer.itemCostManager.itemsList.collapseItems')}
                          title={isCollapsed ? t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit') : t('soloHuntAnalyzer.itemCostManager.itemsList.collapseItems')}
                        >
                          {isCollapsed ? '▶' : '▼'}
                        </button>
                      )}
                      <span>{item.name}</span>
                      {item.isParent && item.hasChildren && isCollapsed && (
                        <span
                          className="collapsed-hint"
                          onClick={() => toggleItemCollapse(item.id)}
                          style={{ cursor: 'pointer' }}
                          title={t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit')}
                        >
                          {' '}{t('soloHuntAnalyzer.itemCostManager.itemsList.clickToExpand')}
                        </span>
                      )}
                    </div>
                    <div>
                      {item.isParent ? (
                        <div className="quantity-controls">
                          <button
                            className="btn-quantity"
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.decreaseQuantity')}
                            title={t('soloHuntAnalyzer.itemCostManager.itemsList.decreaseQuantity')}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="btn-quantity"
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity + 1)}
                            aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.increaseQuantity')}
                            title={t('soloHuntAnalyzer.itemCostManager.itemsList.increaseQuantity')}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        item.quantity
                      )}
                    </div>
                    <div>
                      {item.isParent ? (
                        <div className="hybrid-price">
                          {item.unitPrice > 0 && (
                            <span className="token-price">
                              <img
                                src={item.priceType === 'GT' ? goldTokenIcon : silverTokenIcon}
                                alt={item.priceType}
                                className="token-icon-inline"
                              />
                              {item.unitPrice} {item.priceType}
                            </span>
                          )}
                          {childrenGPCost > 0 && (
                            <>
                              {item.unitPrice > 0 && <span className="price-separator"> + </span>}
                              <span className="gp-price">
                                <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
                                {(childrenGPCost / item.quantity).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} GP
                              </span>
                            </>
                          )}
                          {item.unitPrice === 0 && childrenGPCost === 0 && <span>-</span>}
                        </div>
                      ) : (
                        <div className="price-controls">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItemPrice(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            min="0"
                            className="price-input"
                          />
                          <select
                            value={item.priceType}
                            onChange={(e) => handleUpdateItemPrice(item.id, 'priceType', e.target.value)}
                            className="price-type-select"
                          >
                            <option value="GP">GP</option>
                            <option value="GT">GT</option>
                            <option value="ST">ST</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.removeItemAria', { itemName: item.name })}
                        title={t('soloHuntAnalyzer.itemCostManager.itemsList.removeItemAria', { itemName: item.name })}
                      >
                        <span aria-hidden="true">🗑️</span>
                        <span className="sr-only">{t('soloHuntAnalyzer.itemCostManager.itemsList.removeItem')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Render children if this is a parent and it's expanded */}
                  {item.isParent && !isCollapsed && customItems
                    .filter(child => child.parentId === item.id)
                    .map(child => (
                      <div key={child.id} className="items-row child-row">
                        <div className="item-name child-item-name">↳ {child.name}</div>
                        <div>{child.quantity}</div>
                        <div>
                          <div className="price-controls">
                            <input
                              type="number"
                              value={child.unitPrice}
                              onChange={(e) => handleUpdateItemPrice(child.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              min="0"
                              className="price-input"
                            />
                            <span className="child-price-label">GP</span>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    ))
                  }
                </React.Fragment>
              );
            })}
          </div>

          {/* Total cost summary */}
          <div className="cost-summary">
            {/* Partial GP - Only show if there are direct GP costs */}
            {totalGP > 0 && (
              <p title={t('soloHuntAnalyzer.itemCostManager.costSummary.partialGPTooltip')}>
                <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.partialGP')}:</strong> {totalGP.toLocaleString('pt-BR')} GP
              </p>
            )}

            {/* GT Costs */}
            {totalGT > 0 && (
              <p>
                <img src={goldTokenIcon} alt="GT" className="token-icon-inline" />
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.gtCosts')}:</strong> {totalGT} GT
              </p>
            )}

            {/* ST Costs */}
            {totalST > 0 && (
              <p>
                <img src={silverTokenIcon} alt="ST" className="token-icon-inline" />
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.stCosts')}:</strong> {totalST} ST
              </p>
            )}

            {/* GT Converted */}
            {goldTokenPrice > 0 && totalGT > 0 && (
              <p>
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.gtConverted')}:</strong> {(totalGT * goldTokenPrice).toLocaleString('pt-BR')} GP
              </p>
            )}

            {/* ST Converted */}
            {silverTokenPrice > 0 && totalST > 0 && (
              <p>
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.stConverted')}:</strong> {(totalST * silverTokenPrice).toLocaleString('pt-BR')} GP
              </p>
            )}

            {/* Total (GP) */}
            <p className="total-final" title={t('soloHuntAnalyzer.itemCostManager.costSummary.totalGPTooltip')}>
              <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
              <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalGP')}:</strong> {(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).toLocaleString('pt-BR')} GP
            </p>
          </div>
        </div>
      )}

      {/* Imbuement Modal */}
      {showImbuementModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowImbuementModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.itemCostManager.addImbuementModal.closeModal')}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="imbuement-modal-title"
            aria-modal="true"
          >
            <h3 id="imbuement-modal-title">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.title')}</h3>

            <div className="form-group">
              <label>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.categoryLabel')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedImbuement('');
                }}
              >
                <option value="">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.selectCategory')}</option>
                {getAllCategories().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="form-group">
                <label>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.imbuementLabel')}</label>
                <select
                  value={selectedImbuement}
                  onChange={(e) => setSelectedImbuement(e.target.value)}
                >
                  <option value="">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.selectImbuement')}</option>
                  {availableImbuements.map(imb => (
                    <option key={imb.id} value={imb.id}>
                      {imb.name} - {imb.description}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedImbuement && (
              <div className="form-group">
                <label>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tierLabel')}</label>
                <select
                  value={selectedTier}
                  onChange={(e) => {
                    setSelectedTier(e.target.value);
                    setGtPayment(0); // Reset GT payment when tier changes
                  }}
                >
                  <option value="basic">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tiers.basic')}</option>
                  <option value="intricate">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tiers.intricate')}</option>
                  <option value="powerful">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.tiers.powerful')}</option>
                </select>
              </div>
            )}

            {selectedImbuement && GT_ELIGIBLE_IMBUEMENTS.includes(selectedImbuement) && (
              <div className="form-group">
                <label>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.gtPaymentLabel')}</label>
                <select
                  value={gtPayment}
                  onChange={(e) => setGtPayment(parseInt(e.target.value))}
                >
                  <option value={0}>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.gtPaymentOptions.none')}</option>
                  {(selectedTier === 'basic' || selectedTier === 'intricate' || selectedTier === 'powerful') && (
                    <option value={2}>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.gtPaymentOptions.basic')}</option>
                  )}
                  {(selectedTier === 'intricate' || selectedTier === 'powerful') && (
                    <option value={4}>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.gtPaymentOptions.basicIntricate')}</option>
                  )}
                  {selectedTier === 'powerful' && (
                    <option value={6}>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.gtPaymentOptions.all')}</option>
                  )}
                </select>
              </div>
            )}

            {selectedImbuement && (
              <div className="imbuement-items-preview">
                <h4>{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.itemsPreviewTitle')}</h4>
                {(() => {
                  const imbuement = IMBUEMENTS.find(imb => imb.id === selectedImbuement);
                  if (!imbuement) return null;

                  const tierOrder = ['basic', 'intricate', 'powerful'];
                  const selectedTierIndex = tierOrder.indexOf(selectedTier);
                  const tiersToShow = tierOrder.slice(0, selectedTierIndex + 1);

                  let tiersCoveredByGT = [];
                  if (gtPayment >= 2) tiersCoveredByGT.push('basic');
                  if (gtPayment >= 4) tiersCoveredByGT.push('intricate');
                  if (gtPayment >= 6) tiersCoveredByGT.push('powerful');

                  return (
                    <>
                      {gtPayment > 0 && (
                        <p key="gt-payment" style={{ color: '#c39bd3', fontWeight: 'bold' }}>
                          • {gtPayment} GT ({t('soloHuntAnalyzer.itemCostManager.addImbuementModal.itemsPreviewPayment')})
                        </p>
                      )}
                      {tiersToShow.map(tierName => {
                        const tier = imbuement.tiers[tierName];
                        const isCoveredByGT = tiersCoveredByGT.includes(tierName);

                        return tier?.items?.map((item, idx) => (
                          <p
                            key={`${tierName}-${idx}`}
                            style={{
                              textDecoration: isCoveredByGT ? 'line-through' : 'none',
                              opacity: isCoveredByGT ? 0.5 : 1
                            }}
                          >
                            • {item.quantity}x {item.name} ({tierName})
                            {isCoveredByGT && ` - ${t('soloHuntAnalyzer.itemCostManager.addImbuementModal.coveredByGT')}`}
                          </p>
                        ));
                      })}
                    </>
                  );
                })()}
              </div>
            )}

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddImbuement}
                disabled={!selectedImbuement}
              >
                {t('soloHuntAnalyzer.itemCostManager.addImbuementModal.addButton')}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowImbuementModal(false)}
              >
                {t('soloHuntAnalyzer.itemCostManager.addImbuementModal.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Item Modal */}
      {showCustomItemModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCustomItemModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.closeModal')}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="custom-item-modal-title"
            aria-modal="true"
          >
            <h3 id="custom-item-modal-title">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.title')}</h3>

            <div className="form-group">
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNameLabel')}</label>
              <input
                type="text"
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                placeholder={t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNamePlaceholder')}
              />
            </div>

            <div className="form-group">
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.quantityLabel')}</label>
              <input
                type="number"
                value={customItemQuantity}
                onChange={(e) => setCustomItemQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.unitPriceLabel')}</label>
              <input
                type="number"
                value={customItemPrice}
                onChange={(e) => setCustomItemPrice(parseFloat(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypeLabel')}</label>
              <select
                value={customItemPriceType}
                onChange={(e) => setCustomItemPriceType(e.target.value)}
              >
                <option value="GP">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.gp')}</option>
                <option value="GT">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.gt')}</option>
                <option value="ST">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.st')}</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddCustomItem}
                disabled={!customItemName.trim()}
              >
                {t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.addButton')}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCustomItemModal(false)}
              >
                {t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.cancelButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ring Bis Selection Modal */}
      {showRingBisModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRingBisModal(false)}
          role="presentation"
          aria-label="Close Ring Bis selection modal"
        >
          <div
            className="modal-content ring-bis-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="ring-bis-modal-title"
            aria-modal="true"
          >
            <h3 id="ring-bis-modal-title">Select your Bis Ring</h3>
            <p className="modal-description">Choose the Bis Ring for your vocation</p>

            <div className="ring-selection-grid">
              <div
                className={`ring-option ${selectedRing === 'Arboreal Ring' ? 'selected' : ''}`}
                onClick={() => setSelectedRing('Arboreal Ring')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedRing('Arboreal Ring')}
              >
                <img src={arborealRingIcon} alt="Arboreal Ring" className="ring-icon" />
                <span className="ring-name">Arboreal Ring</span>
                <span className="ring-vocation">Druid</span>
              </div>

              <div
                className={`ring-option ${selectedRing === 'Alicorn Ring' ? 'selected' : ''}`}
                onClick={() => setSelectedRing('Alicorn Ring')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedRing('Alicorn Ring')}
              >
                <img src={alicornRingIcon} alt="Alicorn Ring" className="ring-icon" />
                <span className="ring-name">Alicorn Ring</span>
                <span className="ring-vocation">Paladin</span>
              </div>

              <div
                className={`ring-option ${selectedRing === 'Arcanomancer Sigil' ? 'selected' : ''}`}
                onClick={() => setSelectedRing('Arcanomancer Sigil')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedRing('Arcanomancer Sigil')}
              >
                <img src={arcanomancerSigilIcon} alt="Arcanomancer Sigil" className="ring-icon" />
                <span className="ring-name">Arcanomancer Sigil</span>
                <span className="ring-vocation">Sorcerer</span>
              </div>

              <div
                className={`ring-option ${selectedRing === 'Ethereal Ring' ? 'selected' : ''}`}
                onClick={() => setSelectedRing('Ethereal Ring')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedRing('Ethereal Ring')}
              >
                <img src={etherealRingIcon} alt="Ethereal Ring" className="ring-icon" />
                <span className="ring-name">Ethereal Ring</span>
                <span className="ring-vocation">Knight</span>
              </div>

              <div
                className={`ring-option ${selectedRing === 'Spiritthorn Ring' ? 'selected' : ''}`}
                onClick={() => setSelectedRing('Spiritthorn Ring')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedRing('Spiritthorn Ring')}
              >
                <img src={spiritthornRingIcon} alt="Spiritthorn Ring" className="ring-icon" />
                <span className="ring-name">Spiritthorn Ring</span>
                <span className="ring-vocation">All Vocations</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddRingBis}
                disabled={!selectedRing}
              >
                Add Ring
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowRingBisModal(false);
                  setSelectedRing('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PropTypes validation
ItemCostManager.propTypes = {
  customItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unitPrice: PropTypes.number.isRequired,
      priceType: PropTypes.oneOf(['GP', 'GT', 'ST']).isRequired,
      parentId: PropTypes.number,
      isChild: PropTypes.bool,
      isParent: PropTypes.bool,
      hasChildren: PropTypes.bool,
      isFixedCost: PropTypes.bool,
      itemDuration: PropTypes.number, // Duration in hours (20 for imbuements, 3 for Ring Bis, null for custom items)
      baseQuantity: PropTypes.number, // Base quantity per 1 parent item (used for child items to calculate total when parent quantity changes)
    })
  ).isRequired,
  setCustomItems: PropTypes.func.isRequired,
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
  silverTokenPrice: PropTypes.number.isRequired,
  setSilverTokenPrice: PropTypes.func.isRequired,
  silverTokenError: PropTypes.bool
};