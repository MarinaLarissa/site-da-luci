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

// Only these imbuements can be paid with GT
const GT_ELIGIBLE_IMBUEMENTS = ['void', 'vampirism', 'strike'];

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
  setSilverTokenPrice
}) {
  const { t } = useTranslation();
  const [showImbuementModal, setShowImbuementModal] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);

  // Collapse state - track which parent items are collapsed (start all collapsed)
  const [collapsedItems, setCollapsedItems] = useState(new Set());

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
              itemDuration: 20, // Imbuement materials last 20 hours (same as imbuement)
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
        itemDuration: 20, // Imbuement service cost lasts 20 hours
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
      itemDuration: 20, // Imbuements last 20 hours
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
   * Add Ring Bis preset
   * Ring Bis costs 5 ST to recharge and lasts 3 hours
   */
  const handleAddRingBis = () => {
    const newItem = {
      id: Date.now(),
      name: 'Ring Bis',
      quantity: 1,
      unitPrice: 5,
      priceType: 'ST',
      itemDuration: 3, // Ring Bis lasts 3 hours
      isParent: true,
      hasChildren: false,
    };

    setCustomItems([...customItems, newItem]);
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
      <h2 className="section-title">Custos Adicionais</h2>
      <p className="section-description">
        Adicione imbuements ou itens customizados que você gastou durante a hunt.
      </p>

      {/* Token Prices */}
      <div className="token-prices-section">
        <div className="token-price-row">
          <img src={goldTokenIcon} alt="Gold Token" className="token-icon" />
          <label htmlFor="gold-token-price-input">Gold Token:</label>
          <input
            id="gold-token-price-input"
            type="number"
            value={goldTokenPrice}
            onChange={(e) => setGoldTokenPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 45000"
            min="0"
            aria-label="Preço do Gold Token em GP"
          />
          <img src={coinsIcon} alt="GP" className="coin-icon-small" />
          <span className="unit">GP</span>
        </div>

        <div className="token-price-row">
          <img src={silverTokenIcon} alt="Silver Token" className="token-icon" />
          <label htmlFor="silver-token-price-input">Silver Token:</label>
          <input
            id="silver-token-price-input"
            type="number"
            value={silverTokenPrice}
            onChange={(e) => setSilverTokenPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 15000"
            min="0"
            aria-label="Preço do Silver Token em GP"
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
        >
          + {t('soloHuntAnalyzer.itemCostManager.addImbuementButton')}
        </button>
        <button
          className="btn btn-primary"
          onClick={handleAddRingBis}
          title="Ring Bis (5 ST, dura 3hrs)"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addRingBisButton')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowCustomItemModal(true)}
        >
          + {t('soloHuntAnalyzer.itemCostManager.addCustomItemButton')}
        </button>
      </div>

      {/* Items list */}
      {customItems.length > 0 && (
        <div className="items-list">
          <h3>Itens Adicionados</h3>
          <div className="items-table">
            <div className="items-header">
              <div>Item</div>
              <div>Qtd</div>
              <div>Preço Unit.</div>
              <div>Tipo</div>
              <div>Total</div>
              <div></div>
            </div>
            {customItems.map(item => {
              // Skip child items - they'll be rendered under their parent
              if (item.isChild) return null;

              // Render parent item
              const childrenGPCost = item.isParent ? calculateChildrenGPCost(item.id) : 0;

              // Convert token prices to GP
              let itemCostInGP = 0;
              if (item.priceType === 'GP') {
                itemCostInGP = item.unitPrice * item.quantity;
              } else if (item.priceType === 'GT') {
                itemCostInGP = item.unitPrice * goldTokenPrice * item.quantity;
              } else if (item.priceType === 'ST') {
                itemCostInGP = item.unitPrice * silverTokenPrice * item.quantity;
              }

              const totalCostGP = item.isParent ? childrenGPCost + itemCostInGP : itemCostInGP;

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
                          aria-label={isCollapsed ? 'Expandir itens' : 'Recolher itens'}
                          title={isCollapsed ? 'Clique para expandir e editar preços dos itens' : 'Recolher itens'}
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
                          title="Clique para expandir e editar preços dos itens"
                        >
                          {' '}(clique para expandir)
                        </span>
                      )}
                    </div>
                    <div>
                      {item.isParent ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            className="btn-quantity"
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Diminuir quantidade"
                            title="Diminuir quantidade"
                          >
                            -
                          </button>
                          <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            className="btn-quantity"
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                            title="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        item.quantity
                      )}
                    </div>
                    <div>
                      {item.isParent ? '-' : (
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItemPrice(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          min="0"
                          className="price-input"
                        />
                      )}
                    </div>
                    <div>
                      {item.isParent ? '-' : (
                        <select
                          value={item.priceType}
                          onChange={(e) => handleUpdateItemPrice(item.id, 'priceType', e.target.value)}
                          className="price-type-select"
                        >
                          <option value="GP">GP</option>
                          <option value="GT">GT</option>
                          <option value="ST">ST</option>
                        </select>
                      )}
                    </div>
                    <div className="item-total">
                      <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
                      {totalCostGP.toLocaleString('pt-BR')} GP
                      {item.isParent && item.unitPrice > 0 && (
                        <span style={{ fontSize: '0.85em', color: '#c39bd3', display: 'block' }}>
                          ({item.unitPrice} {item.priceType})
                        </span>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remover ${item.name}`}
                        title={`Remover ${item.name}`}
                      >
                        <span aria-hidden="true">🗑️</span>
                        <span className="sr-only">Remover</span>
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
                          <input
                            type="number"
                            value={child.unitPrice}
                            onChange={(e) => handleUpdateItemPrice(child.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            min="0"
                            className="price-input"
                          />
                        </div>
                        <div>GP</div>
                        <div className="item-total">
                          {(child.unitPrice * child.quantity).toLocaleString('pt-BR')} GP
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
            <p>
              <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
              <strong>Total em GP:</strong> {totalGP.toLocaleString('pt-BR')} GP
            </p>
            <p>
              <img src={goldTokenIcon} alt="GT" className="token-icon-inline" />
              <strong>Total em GT:</strong> {totalGT.toLocaleString('pt-BR')} GT
            </p>
            {goldTokenPrice > 0 && totalGT > 0 && (
              <p>
                <strong>GT convertido para GP:</strong> {(totalGT * goldTokenPrice).toLocaleString('pt-BR')} GP
              </p>
            )}
            <p>
              <img src={silverTokenIcon} alt="ST" className="token-icon-inline" />
              <strong>Total em ST:</strong> {totalST.toLocaleString('pt-BR')} ST
            </p>
            {silverTokenPrice > 0 && totalST > 0 && (
              <p>
                <strong>ST convertido para GP:</strong> {(totalST * silverTokenPrice).toLocaleString('pt-BR')} GP
              </p>
            )}
            <p className="total-final">
              <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
              <strong>Custo Total:</strong> {(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).toLocaleString('pt-BR')} GP
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
          aria-label="Fechar modal"
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
              <label>Categoria:</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedImbuement('');
                }}
              >
                <option value="">Selecione uma categoria</option>
                {getAllCategories().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="form-group">
                <label>Imbuement:</label>
                <select
                  value={selectedImbuement}
                  onChange={(e) => setSelectedImbuement(e.target.value)}
                >
                  <option value="">Selecione um imbuement</option>
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
                <label>Tier:</label>
                <select
                  value={selectedTier}
                  onChange={(e) => {
                    setSelectedTier(e.target.value);
                    setGtPayment(0); // Reset GT payment when tier changes
                  }}
                >
                  <option value="basic">Basic</option>
                  <option value="intricate">Intricate</option>
                  <option value="powerful">Powerful</option>
                </select>
              </div>
            )}

            {selectedImbuement && GT_ELIGIBLE_IMBUEMENTS.includes(selectedImbuement) && (
              <div className="form-group">
                <label>Pagar com Gold Token (GT):</label>
                <select
                  value={gtPayment}
                  onChange={(e) => setGtPayment(parseInt(e.target.value))}
                >
                  <option value={0}>0 GT (todos os itens em GP)</option>
                  {(selectedTier === 'basic' || selectedTier === 'intricate' || selectedTier === 'powerful') && (
                    <option value={2}>2 GT (cobre tier basic)</option>
                  )}
                  {(selectedTier === 'intricate' || selectedTier === 'powerful') && (
                    <option value={4}>4 GT (cobre basic + intricate)</option>
                  )}
                  {selectedTier === 'powerful' && (
                    <option value={6}>6 GT (cobre todos os itens)</option>
                  )}
                </select>
              </div>
            )}

            {selectedImbuement && (
              <div className="imbuement-items-preview">
                <h4>Itens necessários:</h4>
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
                          • {gtPayment} GT (pagamento do imbuement)
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
                            {isCoveredByGT && ' - coberto por GT'}
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
                Adicionar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowImbuementModal(false)}
              >
                Cancelar
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
          aria-label="Fechar modal"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="custom-item-modal-title"
            aria-modal="true"
          >
            <h3 id="custom-item-modal-title">Adicionar Item Custom</h3>

            <div className="form-group">
              <label>Nome do Item:</label>
              <input
                type="text"
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                placeholder="Ex: Exercise Rod"
              />
            </div>

            <div className="form-group">
              <label>Quantidade:</label>
              <input
                type="number"
                value={customItemQuantity}
                onChange={(e) => setCustomItemQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Preço Unitário:</label>
              <input
                type="number"
                value={customItemPrice}
                onChange={(e) => setCustomItemPrice(parseFloat(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Tipo de Moeda:</label>
              <select
                value={customItemPriceType}
                onChange={(e) => setCustomItemPriceType(e.target.value)}
              >
                <option value="GP">GP (Gold Pieces)</option>
                <option value="GT">GT (Gold Token)</option>
                <option value="ST">ST (Silver Token)</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddCustomItem}
                disabled={!customItemName.trim()}
              >
                Adicionar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCustomItemModal(false)}
              >
                Cancelar
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
};