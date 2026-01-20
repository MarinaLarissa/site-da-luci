/**
 * Item Cost Manager Component
 * Allows user to add imbuement presets or custom items with costs (GP/GT/ST)
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGPValue } from '../../utils/formatters';
import { IMBUEMENTS, getAllCategories, getImbuementsByCategory } from '../../data/imbuements';
import Button from '../common/Button';
import { ModalOverlay, ModalContent } from '../common/styled';
import {
  ItemCostManagerContainer,
  TokenPricesSection,
  TokenPriceRow,
  TokenIconInline,
  CoinIconInline,
  ScreenReaderOnly,
  AddButtons,
  ItemsList,
  ItemsTable,
  ItemsHeader,
  ItemsRow,
  ItemName,
  ChildPriceLabel,
  PriceInput,
  PriceTypeSelect,
  RemoveButton,
  QuantityButton,
  CollapseButton,
  CollapsedHint,
  QuantityControls,
  PriceControls,
  QuantityDisplay,
  HybridPrice,
  TokenPrice,
  GPPrice,
  PriceSeparator,
  CostSummary,
  FormGroup,
  ImbuementItemsPreview,
  ModalActions,
  RingBISDescription,
  RingBISGrid,
  RingBISOption,
  RingBISIcon,
  RingBISName,
  RingBISVocation,
  RecalculationIndicator,
} from './ItemCostManager.styles';
import goldTokenIcon from '../../assets/tibia/gold_token.gif';
import silverTokenIcon from '../../assets/tibia/silver_token.gif';
import coinsIcon from '../../assets/tibia/coins.png';
import tibiaCoinIcon from '../../assets/tibia/tibia_coin.gif';
import arborealRingIcon from '../../assets/tibia/arboreal_ring.gif';
import alicornRingIcon from '../../assets/tibia/alicorn_ring.gif';
import arcanomancerSigilIcon from '../../assets/tibia/arcanomancer_sigil.gif';
import etherealRingIcon from '../../assets/tibia/ethereal_ring.gif';
import spiritthornRingIcon from '../../assets/tibia/spiritthorn_ring.gif';

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
 * Ring Bis icon mapping
 */
const RING_ICONS = {
  'Arboreal Ring': arborealRingIcon,
  'Alicorn Ring': alicornRingIcon,
  'Arcanomancer Sigil': arcanomancerSigilIcon,
  'Ethereal Ring': etherealRingIcon,
  'Spiritthorn Ring': spiritthornRingIcon,
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

/**
 * Item Cost Manager Component
 * @param {Object} props - Component props
 * @param {boolean} props.needsRecalculation - Boolean flag indicating if user modified prices/items after calculation.
 *                                             When true, shows warning banner to recalculate balance.
 */
export default function ItemCostManager({
  customItems,
  setCustomItems,
  goldTokenPrice,
  setGoldTokenPrice,
  silverTokenPrice,
  setSilverTokenPrice,
  tibiaCoinPrice,
  setTibiaCoinPrice,
  tibiaCoinSellPrice,
  setTibiaCoinSellPrice,
  silverTokenError = false,
  needsRecalculation = false
}) {
  const { t } = useTranslation();
  const [showImbuementModal, setShowImbuementModal] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [showRingBisModal, setShowRingBisModal] = useState(false);

  // Collapse state - track which parent items are collapsed (start all collapsed)
  const [collapsedItems, setCollapsedItems] = useState(new Set());

  /**
   * Feature 1: Collapse all parent items when configuration is loaded
   * When customItems changes (e.g., from loading a saved configuration),
   * automatically collapse all parent items to save visual space
   */
  React.useEffect(() => {
    if (customItems.length > 0) {
      // Identify all parent items (items that have children)
      const parentIds = customItems
        .filter(item => item.isParent && item.hasChildren)
        .map(item => item.id);

      // Set all parent items as collapsed
      if (parentIds.length > 0) {
        setCollapsedItems(new Set(parentIds));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customItems.length]); // Only trigger when items array length changes (new config loaded)
  // Known limitation: If config is overwritten with same item count, this won't trigger.
  // This is an acceptable edge case - manual collapse/expand still works.
  // Alternative: Use deep comparison or hash, but adds complexity for minimal UX gain.

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
  const [customItemPrice, setCustomItemPrice] = useState(''); // Empty string for better UX
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
   * @param {string} ringName - Optional ring name. If provided, adds directly. Otherwise uses selectedRing state.
   */
  const handleAddRingBis = (ringName = null) => {
    const ring = ringName || selectedRing;
    if (!ring) return;

    const newItem = {
      id: Date.now(),
      name: ring,
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
   * Copy imbuement item prices to clipboard for Efficiency Calculator
   * Exports values of Vampirism, Void, Strike items to JSON
   */
  const handleCopyToEfficiencyCalc = async () => {
    try {
      // Extract item prices from customItems for GT-eligible imbuements
      const imbuementItems = {
        'Vampire Teeth': 0,
        'Bloody Pincers': 0,
        'Piece of Dead Brain': 0,
        'Rope Belt': 0,
        'Silencer Claws': 0,
        'Some Grimeleech Wings': 0,
        'Protective Charm': 0,
        'Sabretooth': 0,
        'Vexclaw Talon': 0,
      };

      // Find items in customItems and extract their unitPrice
      customItems.forEach(item => {
        if (imbuementItems.hasOwnProperty(item.name)) {
          imbuementItems[item.name] = item.unitPrice || 0;
        }
      });

      const clipboardData = {
        type: 'tibia_imbuement_prices',
        version: '1.0',
        source: 'solo_hunt_analyzer',
        goldTokenPrice: goldTokenPrice,
        itemPrices: imbuementItems,
      };

      const jsonString = JSON.stringify(clipboardData, null, 2);
      await navigator.clipboard.writeText(jsonString);

      alert('Valores dos imbuements copiados! Cole no Imbuement Efficiency Calculator.');
    } catch (error) {
      console.error('Failed to copy imbuement prices:', error);
      alert('Falha ao copiar valores. Verifique as permissões do navegador.');
    }
  };

  /**
   * Paste configuration from Imbuement Calculator
   * Accepts JSON format from Imbuement Efficiency Calculator
   */
  const handlePasteFromImbuementCalc = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      // Try to parse as JSON first (new format)
      try {
        const data = JSON.parse(clipboardText);

        // Check if it's from Imbuement Calculator
        if (data.type === 'tibia_imbuements' && Array.isArray(data.imbuements)) {
          // Process each imbuement
          const newItems = [];

          data.imbuements.forEach(imb => {
            const parentId = Date.now() + Math.random();

            if (imb.method === 'gt') {
              // GT payment method
              const newItem = {
                id: parentId,
                name: `${imb.tier.charAt(0).toUpperCase() + imb.tier.slice(1)} ${imb.category} Imbuement`,
                quantity: 1,
                unitPrice: imb.gtAmount,
                priceType: 'GT',
                itemDuration: imb.duration || 20,
                isParent: true,
                hasChildren: false,
              };
              newItems.push(newItem);
            } else if (imb.method === 'gp') {
              // Market items method - add as parent with service cost as child
              const parentItem = {
                id: parentId,
                name: `${imb.tier.charAt(0).toUpperCase() + imb.tier.slice(1)} ${imb.category} Imbuement`,
                quantity: 1,
                unitPrice: 0,
                priceType: 'GP',
                itemDuration: imb.duration || 20,
                isParent: true,
                hasChildren: true,
              };

              // Find imbuement in IMBUEMENTS array to extract material items
              const imbuementData = IMBUEMENTS.find(
                gtImb => gtImb.name.toLowerCase() === imb.category.toLowerCase()
              );

              const childItems = [];

              // Add material items as children
              if (imbuementData && imbuementData.tiers) {
                const tierOrder = ['basic', 'intricate', 'powerful'];
                const selectedTierIndex = tierOrder.indexOf(imb.tier.toLowerCase());

                // Cumulative tiers (basic for basic, basic+intricate for intricate, all for powerful)
                const tiersToInclude = tierOrder.slice(0, selectedTierIndex + 1);

                // Calculate total quantity of all items to distribute itemCost proportionally
                let totalItemQuantity = 0;
                tiersToInclude.forEach(tierName => {
                  const tier = imbuementData.tiers[tierName];
                  if (tier && tier.items) {
                    tier.items.forEach(item => {
                      totalItemQuantity += item.quantity;
                    });
                  }
                });

                // Create child items with proportional unit prices
                tiersToInclude.forEach(tierName => {
                  const tier = imbuementData.tiers[tierName];
                  if (tier && tier.items) {
                    tier.items.forEach(item => {
                      // Calculate unit price proportionally based on total itemCost
                      const unitPrice = totalItemQuantity > 0
                        ? (imb.itemCost * item.quantity) / totalItemQuantity / item.quantity
                        : 0;

                      childItems.push({
                        id: Date.now() + Math.random(),
                        name: item.name,
                        quantity: item.quantity,
                        baseQuantity: item.quantity,
                        unitPrice: unitPrice,
                        priceType: 'GP',
                        parentId: parentId,
                        isChild: true,
                        itemDuration: imb.duration || 20,
                      });
                    });
                  }
                });
              }

              // Add fixed service cost as child
              const serviceCostItem = {
                id: Date.now() + Math.random() + 0.1,
                name: `${imb.tier.charAt(0).toUpperCase() + imb.tier.slice(1)} Imbuement Service`,
                quantity: 1,
                baseQuantity: 1,
                unitPrice: imb.feeCost,
                priceType: 'GP',
                parentId: parentId,
                isChild: true,
                isFixedCost: true,
                itemDuration: imb.duration || 20,
              };

              newItems.push(parentItem, ...childItems, serviceCostItem);
            }
          });

          if (newItems.length > 0) {
            setCustomItems([...customItems, ...newItems]);
            alert(`${data.imbuements.length} imbuement(s) adicionado(s) do Imbuement Calculator!`);
          }
          return;
        }
      } catch (jsonError) {
        // Not JSON, try old text format
      }

      // Old text format parsing (backwards compatibility)
      const lines = clipboardText.split('\n');
      if (lines.length === 0) return;

      const titleMatch = lines[0].match(/^(Basic|Intricate|Powerful)\s+(.+)\s+Imbuement:$/);
      if (!titleMatch) {
        alert('Formato inválido. Cole dados do Imbuement Calculator (JSON ou texto).');
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
    <ItemCostManagerContainer>
      <h2 className="section-title">{t('soloHuntAnalyzer.itemCostManager.title')}</h2>

      <p className="section-description">
        {t('soloHuntAnalyzer.itemCostManager.sectionDescription')}
      </p>

          {/* Token Prices */}
          <TokenPricesSection>
        <TokenPriceRow>
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
        </TokenPriceRow>

        <TokenPriceRow $error={silverTokenError}>
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
        </TokenPriceRow>

        <TokenPriceRow>
          <img src={tibiaCoinIcon} alt="Tibia Coin" className="token-icon" />
          <label htmlFor="tibia-coin-price-input">{t('soloHuntAnalyzer.itemCostManager.tibiaCoinLabel')}</label>
          <input
            id="tibia-coin-price-input"
            type="number"
            value={tibiaCoinPrice}
            onChange={(e) => setTibiaCoinPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 45000"
            min="0"
            aria-label={t('soloHuntAnalyzer.itemCostManager.tibiaCoinAriaLabel')}
            data-cy="solo-hunt-input-tc-price"
          />
          <img src={coinsIcon} alt="GP" className="coin-icon-small" />
          <span className="unit">GP</span>
        </TokenPriceRow>

        <TokenPriceRow title="Valor de venda da Tibia Coin por dinheiro real">
          <span className="token-icon">💵</span>
          <label htmlFor="tibia-coin-sell-price-input">TC Sell Price</label>
          <input
            id="tibia-coin-sell-price-input"
            type="number"
            value={tibiaCoinSellPrice}
            onChange={(e) => setTibiaCoinSellPrice(parseFloat(e.target.value) || 0)}
            placeholder="Ex: 0.04"
            min="0"
            step="0.01"
            aria-label="Tibia Coin Sell Price (real money per TC)"
            data-cy="solo-hunt-input-tc-sell-price"
          />
          <span className="unit">$ / TC</span>
        </TokenPriceRow>
      </TokenPricesSection>

      {/* Recalculation indicator */}
      {needsRecalculation && (
        <RecalculationIndicator>
          {t('soloHuntAnalyzer.itemCostManager.recalculationWarning')}
        </RecalculationIndicator>
      )}

      {/* Add buttons */}
      <AddButtons>
        <Button
          variant="primary"
          onClick={() => setShowImbuementModal(true)}
          data-cy="solo-hunt-button-add-imbuement"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addImbuementButton')}
        </Button>
        <Button
          variant="primary"
          onClick={() => setShowRingBisModal(true)}
          title={t('soloHuntAnalyzer.itemCostManager.ringBisTooltip')}
          data-cy="solo-hunt-button-add-ringbis"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addRingBisButton')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowCustomItemModal(true)}
          data-cy="solo-hunt-button-add-custom-item"
        >
          + {t('soloHuntAnalyzer.itemCostManager.addCustomItemButton')}
        </Button>
        <Button
          variant="secondary"
          onClick={handleCopyToEfficiencyCalc}
          title="Copiar valores dos imbuements para o Efficiency Calculator"
          data-cy="solo-hunt-button-copy-to-efficiency"
        >
          📋 Copiar Imbuements
        </Button>
        <Button
          variant="secondary"
          onClick={handlePasteFromImbuementCalc}
          title="Paste configuration from Imbuement Calculator"
          data-cy="solo-hunt-button-paste-imbuement"
        >
          {t('soloHuntAnalyzer.itemCostManager.pasteFromImbuementCalcButton')}
        </Button>
      </AddButtons>

      {/* Items list */}
      {customItems.length > 0 && (
        <ItemsList>
          <h3>{t('soloHuntAnalyzer.itemCostManager.itemsListTitle')}</h3>
          <ItemsTable>
            <ItemsHeader>
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.item')}</div>
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.quantity')}</div>
              <div>{t('soloHuntAnalyzer.itemCostManager.tableHeaders.unitPrice')}</div>
              <div></div>
            </ItemsHeader>
            {customItems.map(item => {
              // Skip child items - they'll be rendered under their parent
              if (item.isChild) return null;

              // Render parent item
              const childrenGPCost = item.isParent ? calculateChildrenGPCost(item.id) : 0;

              const isCollapsed = collapsedItems.has(item.id);

              return (
                <React.Fragment key={item.id}>
                  {/* Parent or standalone item row */}
                  <ItemsRow $parent={item.isParent}>
                    <ItemName>
                      {item.isParent && item.hasChildren && (
                        <CollapseButton
                          onClick={() => toggleItemCollapse(item.id)}
                          aria-label={isCollapsed ? t('soloHuntAnalyzer.itemCostManager.itemsList.expandItems') : t('soloHuntAnalyzer.itemCostManager.itemsList.collapseItems')}
                          title={isCollapsed ? t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit') : t('soloHuntAnalyzer.itemCostManager.itemsList.collapseItems')}
                        >
                          {isCollapsed ? '▶' : '▼'}
                        </CollapseButton>
                      )}
                      <span>{item.name}</span>
                      {RING_ICONS[item.name] && (
                        <TokenIconInline
                          src={RING_ICONS[item.name]}
                          alt={item.name}
                          style={{ marginLeft: '8px' }}
                        />
                      )}
                      {item.isParent && item.hasChildren && isCollapsed && (
                        <CollapsedHint
                          onClick={() => toggleItemCollapse(item.id)}
                          style={{ cursor: 'pointer' }}
                          title={t('soloHuntAnalyzer.itemCostManager.itemsList.expandToEdit')}
                        >
                          {' '}{t('soloHuntAnalyzer.itemCostManager.itemsList.clickToExpand')}
                        </CollapsedHint>
                      )}
                    </ItemName>
                    <div>
                      {item.isParent ? (
                        <QuantityControls>
                          <QuantityButton
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.decreaseQuantity')}
                            title={t('soloHuntAnalyzer.itemCostManager.itemsList.decreaseQuantity')}
                          >
                            -
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton
                            onClick={() => handleUpdateParentQuantity(item.id, item.quantity + 1)}
                            aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.increaseQuantity')}
                            title={t('soloHuntAnalyzer.itemCostManager.itemsList.increaseQuantity')}
                          >
                            +
                          </QuantityButton>
                        </QuantityControls>
                      ) : (
                        item.quantity
                      )}
                    </div>
                    <div>
                      {item.isParent ? (
                        <HybridPrice>
                          {item.unitPrice > 0 && (
                            <TokenPrice>
                              <TokenIconInline
                                src={item.priceType === 'GT' ? goldTokenIcon : silverTokenIcon}
                                alt={item.priceType}
                              />
                              {item.unitPrice} {item.priceType}
                            </TokenPrice>
                          )}
                          {childrenGPCost > 0 && (
                            <>
                              {item.unitPrice > 0 && <PriceSeparator> + </PriceSeparator>}
                              <GPPrice>
                                <CoinIconInline src={coinsIcon} alt="GP" />
                                {formatGPValue(childrenGPCost / item.quantity).formatted.includes('kk') ? (
                                  <span title={formatGPValue(childrenGPCost / item.quantity).full}>
                                    {formatGPValue(childrenGPCost / item.quantity).formatted} GP
                                  </span>
                                ) : (
                                  `${formatGPValue(childrenGPCost / item.quantity).formatted} GP`
                                )}
                              </GPPrice>
                            </>
                          )}
                          {item.unitPrice === 0 && childrenGPCost === 0 && <span>-</span>}
                        </HybridPrice>
                      ) : (
                        <PriceControls>
                          <PriceInput
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItemPrice(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            min="0"
                          />
                          <PriceTypeSelect
                            value={item.priceType}
                            onChange={(e) => handleUpdateItemPrice(item.id, 'priceType', e.target.value)}
                          >
                            <option value="GP">GP</option>
                            <option value="GT">GT</option>
                            <option value="ST">ST</option>
                          </PriceTypeSelect>
                        </PriceControls>
                      )}
                    </div>
                    <div>
                      <RemoveButton
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={t('soloHuntAnalyzer.itemCostManager.itemsList.removeItemAria', { itemName: item.name })}
                        title={t('soloHuntAnalyzer.itemCostManager.itemsList.removeItemAria', { itemName: item.name })}
                      >
                        <span aria-hidden="true">🗑️</span>
                        <ScreenReaderOnly>{t('soloHuntAnalyzer.itemCostManager.itemsList.removeItem')}</ScreenReaderOnly>
                      </RemoveButton>
                    </div>
                  </ItemsRow>

                  {/* Render children if this is a parent and it's expanded */}
                  {item.isParent && !isCollapsed && customItems
                    .filter(child => child.parentId === item.id)
                    .map(child => (
                      <ItemsRow key={child.id} $child>
                        <ItemName $child>↳ {child.name}</ItemName>
                        <div>{child.quantity}</div>
                        <div>
                          <PriceControls>
                            <PriceInput
                              type="number"
                              value={child.unitPrice}
                              onChange={(e) => handleUpdateItemPrice(child.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              min="0"
                            />
                            <ChildPriceLabel>GP</ChildPriceLabel>
                          </PriceControls>
                        </div>
                        <div></div>
                      </ItemsRow>
                    ))
                  }
                </React.Fragment>
              );
            })}
          </ItemsTable>

          {/* Total cost summary */}
          <CostSummary>
            {/* Partial GP - Only show if there are direct GP costs */}
            {totalGP > 0 && (
              <p title={t('soloHuntAnalyzer.itemCostManager.costSummary.partialGPTooltip')}>
                <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.partialGP')}:</strong> {
                  formatGPValue(totalGP).formatted.includes('kk') ? (
                    <span title={formatGPValue(totalGP).full}>
                      {formatGPValue(totalGP).formatted} GP
                    </span>
                  ) : (
                    `${formatGPValue(totalGP).formatted} GP`
                  )
                }
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
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.gtConverted')}:</strong> {
                  formatGPValue(totalGT * goldTokenPrice).formatted.includes('kk') ? (
                    <span title={formatGPValue(totalGT * goldTokenPrice).full}>
                      {formatGPValue(totalGT * goldTokenPrice).formatted} GP
                    </span>
                  ) : (
                    `${formatGPValue(totalGT * goldTokenPrice).formatted} GP`
                  )
                }
              </p>
            )}

            {/* ST Converted */}
            {silverTokenPrice > 0 && totalST > 0 && (
              <p>
                <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.stConverted')}:</strong> {
                  formatGPValue(totalST * silverTokenPrice).formatted.includes('kk') ? (
                    <span title={formatGPValue(totalST * silverTokenPrice).full}>
                      {formatGPValue(totalST * silverTokenPrice).formatted} GP
                    </span>
                  ) : (
                    `${formatGPValue(totalST * silverTokenPrice).formatted} GP`
                  )
                }
              </p>
            )}

            {/* Total (GP) */}
            <p className="total-final" title={t('soloHuntAnalyzer.itemCostManager.costSummary.totalGPTooltip')}>
              <img src={coinsIcon} alt="GP" className="coin-icon-inline" />
              <strong>{t('soloHuntAnalyzer.itemCostManager.costSummary.totalGP')}:</strong> {
                formatGPValue(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).formatted.includes('kk') ? (
                  <span title={formatGPValue(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).full}>
                    {formatGPValue(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).formatted} GP
                  </span>
                ) : (
                  `${formatGPValue(totalGP + (totalGT * goldTokenPrice) + (totalST * silverTokenPrice)).formatted} GP`
                )
              }
            </p>
          </CostSummary>
        </ItemsList>
      )}

      {/* Imbuement Modal */}
      {showImbuementModal && (
        <ModalOverlay
          onClick={() => setShowImbuementModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.itemCostManager.addImbuementModal.closeModal')}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="imbuement-modal-title"
            aria-modal="true"
          >
            <h3 id="imbuement-modal-title">{t('soloHuntAnalyzer.itemCostManager.addImbuementModal.title')}</h3>

            <FormGroup>
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
            </FormGroup>

            {selectedCategory && (
              <FormGroup>
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
              </FormGroup>
            )}

            {selectedImbuement && (
              <FormGroup>
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
              </FormGroup>
            )}

            {selectedImbuement && GT_ELIGIBLE_IMBUEMENTS.includes(selectedImbuement) && (
              <FormGroup>
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
              </FormGroup>
            )}

            {selectedImbuement && (
              <ImbuementItemsPreview>
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
              </ImbuementItemsPreview>
            )}

            <ModalActions>
              <Button
                variant="primary"
                onClick={handleAddImbuement}
                disabled={!selectedImbuement}
                dataCy="solo-hunt-button-add-imbuement-confirm"
              >
                {t('soloHuntAnalyzer.itemCostManager.addImbuementModal.addButton')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowImbuementModal(false)}
                dataCy="solo-hunt-button-add-imbuement-cancel"
              >
                {t('soloHuntAnalyzer.itemCostManager.addImbuementModal.cancelButton')}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Custom Item Modal */}
      {showCustomItemModal && (
        <ModalOverlay
          onClick={() => setShowCustomItemModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.closeModal')}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="custom-item-modal-title"
            aria-modal="true"
          >
            <h3 id="custom-item-modal-title">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.title')}</h3>

            <FormGroup>
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNameLabel')}</label>
              <input
                type="text"
                value={customItemName}
                onChange={(e) => setCustomItemName(e.target.value)}
                placeholder={t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.itemNamePlaceholder')}
              />
            </FormGroup>

            <FormGroup>
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.quantityLabel')}</label>
              <input
                type="number"
                value={customItemQuantity}
                onChange={(e) => setCustomItemQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
            </FormGroup>

            <FormGroup>
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.unitPriceLabel')}</label>
              <input
                type="number"
                value={customItemPrice}
                onChange={(e) => setCustomItemPrice(parseFloat(e.target.value) || 0)}
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <label>{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypeLabel')}</label>
              <select
                value={customItemPriceType}
                onChange={(e) => setCustomItemPriceType(e.target.value)}
              >
                <option value="GP">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.gp')}</option>
                <option value="GT">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.gt')}</option>
                <option value="ST">{t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.priceTypes.st')}</option>
              </select>
            </FormGroup>

            <ModalActions>
              <Button
                variant="primary"
                onClick={handleAddCustomItem}
                disabled={!customItemName.trim()}
                dataCy="solo-hunt-button-add-custom-item-confirm"
              >
                {t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.addButton')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCustomItemModal(false)}
                dataCy="solo-hunt-button-add-custom-item-cancel"
              >
                {t('soloHuntAnalyzer.itemCostManager.addCustomItemModal.cancelButton')}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Ring Bis Selection Modal */}
      {showRingBisModal && (
        <ModalOverlay
          onClick={() => setShowRingBisModal(false)}
          role="presentation"
          aria-label={t('soloHuntAnalyzer.itemCostManager.ringBisModal.closeModal')}
        >
          <ModalContent
            $wide
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="ring-bis-modal-title"
            aria-modal="true"
          >
            <h3 id="ring-bis-modal-title">{t('soloHuntAnalyzer.itemCostManager.ringBisModal.title')}</h3>
            <RingBISDescription>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.description')}</RingBISDescription>

            <RingBISGrid>
              <RingBISOption
                $selected={selectedRing === t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arborealRing')}
                onClick={() => handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arborealRing'))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arborealRing'));
                  }
                }}
              >
                <RingBISIcon src={arborealRingIcon} alt={t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arborealRing')} />
                <RingBISName>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arborealRing')}</RingBISName>
                <RingBISVocation>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.vocations.druid')}</RingBISVocation>
              </RingBISOption>

              <RingBISOption
                $selected={selectedRing === t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.alicornRing')}
                onClick={() => handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.alicornRing'))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.alicornRing'));
                  }
                }}
              >
                <RingBISIcon src={alicornRingIcon} alt={t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.alicornRing')} />
                <RingBISName>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.alicornRing')}</RingBISName>
                <RingBISVocation>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.vocations.paladin')}</RingBISVocation>
              </RingBISOption>

              <RingBISOption
                $selected={selectedRing === t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arcanomancerSigil')}
                onClick={() => handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arcanomancerSigil'))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arcanomancerSigil'));
                  }
                }}
              >
                <RingBISIcon src={arcanomancerSigilIcon} alt={t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arcanomancerSigil')} />
                <RingBISName>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.arcanomancerSigil')}</RingBISName>
                <RingBISVocation>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.vocations.sorcerer')}</RingBISVocation>
              </RingBISOption>

              <RingBISOption
                $selected={selectedRing === t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.etherealRing')}
                onClick={() => handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.etherealRing'))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.etherealRing'));
                  }
                }}
              >
                <RingBISIcon src={etherealRingIcon} alt={t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.etherealRing')} />
                <RingBISName>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.etherealRing')}</RingBISName>
                <RingBISVocation>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.vocations.monk')}</RingBISVocation>
              </RingBISOption>

              <RingBISOption
                $selected={selectedRing === t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.spiritthornRing')}
                onClick={() => handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.spiritthornRing'))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAddRingBis(t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.spiritthornRing'));
                  }
                }}
              >
                <RingBISIcon src={spiritthornRingIcon} alt={t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.spiritthornRing')} />
                <RingBISName>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.rings.spiritthornRing')}</RingBISName>
                <RingBISVocation>{t('soloHuntAnalyzer.itemCostManager.ringBisModal.vocations.knight')}</RingBISVocation>
              </RingBISOption>
            </RingBISGrid>

            <ModalActions>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowRingBisModal(false);
                  setSelectedRing('');
                }}
                dataCy="solo-hunt-button-add-ringbis-cancel"
              >
                {t('soloHuntAnalyzer.itemCostManager.ringBisModal.cancelButton')}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </ItemCostManagerContainer>
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
  tibiaCoinPrice: PropTypes.number.isRequired,
  setTibiaCoinPrice: PropTypes.func.isRequired,
  tibiaCoinSellPrice: PropTypes.number.isRequired,
  setTibiaCoinSellPrice: PropTypes.func.isRequired,
  silverTokenError: PropTypes.bool,
  needsRecalculation: PropTypes.bool
};