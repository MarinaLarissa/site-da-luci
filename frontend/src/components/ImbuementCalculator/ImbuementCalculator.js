/**
 * Imbuement Effective Calculator Component
 * Calculates if it's more efficient to buy GT and exchange for items
 * OR buy items directly from market for GP
 */

import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGPValue } from '../../utils/formatters';
import goldTokenIcon from '../../assets/tibia/gold_token.gif';
import ImbuementBlock from './ImbuementBlock';
import {
  ImbuementCalculatorContainer,
  PageTitle,
  PageDescription,
  ImbuementCalculatorGTPriceSection,
  ImbuementCalculatorGTPriceLabel,
  ImbuementCalculatorGTPriceInput,
  ImbuementCalculatorCopyPasteSection,
  ImbuementCalculatorFeedbackSuccess,
  ImbuementCalculatorGrid,
  ImbuementCalculatorButton,
  ImbuementCalculatorIconInline,
} from './ImbuementCalculator.styles';

// GT-eligible imbuements data (from imbuements.js)
const GT_IMBUEMENTS = {
  vampirism: {
    id: 'vampirism',
    name: 'Vampirism',
    description: 'Life Leech',
    items: {
      basic: [{ name: 'Vampire Teeth', quantity: 25 }],
      intricate: [{ name: 'Bloody Pincers', quantity: 15 }],
      powerful: [{ name: 'Piece of Dead Brain', quantity: 5 }],
    },
    gtCost: { basic: 2, intricate: 4, powerful: 6 },
  },
  void: {
    id: 'void',
    name: 'Void',
    description: 'Mana Leech',
    items: {
      basic: [{ name: 'Rope Belt', quantity: 25 }],
      intricate: [{ name: 'Silencer Claws', quantity: 25 }],
      powerful: [{ name: 'Some Grimeleech Wings', quantity: 5 }],
    },
    gtCost: { basic: 2, intricate: 4, powerful: 6 },
  },
  strike: {
    id: 'strike',
    name: 'Strike',
    description: 'Critical Hit',
    items: {
      basic: [{ name: 'Protective Charm', quantity: 20 }],
      intricate: [{ name: 'Sabretooth', quantity: 25 }],
      powerful: [{ name: 'Vexclaw Talon', quantity: 5 }],
    },
    gtCost: { basic: 2, intricate: 4, powerful: 6 },
  },
};

// Tier order constant (used throughout calculations)
const TIER_ORDER = ['basic', 'intricate', 'powerful'];

// Fixed service fees - NPC fees charged by Imbuing Shrines (NOT customizable)
// These are official Tibia values and cannot be changed by the user
const SERVICE_FEES = {
  basic: 7500,      // 7.5k GP
  intricate: 60000, // 60k GP
  powerful: 250000, // 250k GP
};

// LocalStorage key for item prices persistence
const STORAGE_KEY = 'imbuementCalculator_itemPrices';

export default function ImbuementCalculator({ goldTokenPrice, setGoldTokenPrice }) {
  const { t } = useTranslation();

  // Load item prices from localStorage on initial mount
  const loadItemPrices = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading item prices from localStorage:', error);
    }
    // Default values if nothing saved (empty strings for better UX)
    return {
      // Vampirism
      'Vampire Teeth': '',
      'Bloody Pincers': '',
      'Piece of Dead Brain': '',
      // Void
      'Rope Belt': '',
      'Silencer Claws': '',
      'Some Grimeleech Wings': '',
      // Strike
      'Protective Charm': '',
      'Sabretooth': '',
      'Vexclaw Talon': '',
    };
  };

  // Item prices state (GP per unit) - initialized from localStorage
  const [itemPrices, setItemPrices] = useState(loadItemPrices);

  // Clipboard feedback state
  // eslint-disable-next-line no-unused-vars
  const [copiedItem, setCopiedItem] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [copiedConfig, setCopiedConfig] = useState(null);

  // Feature 2: Copy/Paste imbuements state
  const [copyFeedback, setCopyFeedback] = useState(null);
  const [pasteFeedback, setPasteFeedback] = useState(null);

  // Save item prices to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemPrices));
    } catch (error) {
      console.error('Error saving item prices to localStorage:', error);
    }
  }, [itemPrices]);

  // Calculate cost via GT (in GP equivalent + service fee) - memoized for performance
  const calculateGTCost = useMemo(() => {
    return (imbuementId, tier) => {
      const gtAmount = GT_IMBUEMENTS[imbuementId].gtCost[tier];
      const gtCostInGP = gtAmount * goldTokenPrice;
      const serviceFee = SERVICE_FEES[tier];
      return gtCostInGP + serviceFee;
    };
  }, [goldTokenPrice]);

  // Calculate cost via GP (items + service fee) - memoized for performance
  const calculateGPCost = useMemo(() => {
    return (imbuementId, tier) => {
      const imbuement = GT_IMBUEMENTS[imbuementId];
      let totalItemCost = 0;

      // Calculate cumulative items cost (basic, basic+intricate, basic+intricate+powerful)
      const tiers = TIER_ORDER;
      const tierIndex = tiers.indexOf(tier);

      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];
        const items = imbuement.items[currentTier];

        for (const item of items) {
          totalItemCost += item.quantity * (itemPrices[item.name] || 0);
        }
      }

      // Add service fee (same fee applies to both GT and Market options)
      const serviceFee = SERVICE_FEES[tier];
      return totalItemCost + serviceFee;
    };
  }, [itemPrices]);

  // Calculate hybrid cost (some tiers GT, some tiers Market) - memoized for performance
  const calculateHybridCost = useMemo(() => {
    return (imbuementId, tier, gtTiers) => {
      const imbuement = GT_IMBUEMENTS[imbuementId];
      const tiers = TIER_ORDER;
      const tierIndex = tiers.indexOf(tier);

      let totalGTCost = 0;
      let totalItemCost = 0;

      // Calculate cost for each tier
      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];

        if (gtTiers.includes(currentTier)) {
          // Buy this tier with GT
          const gtAmount = imbuement.gtCost[currentTier];
          totalGTCost += gtAmount * goldTokenPrice;
        } else {
          // Buy this tier items on market
          const items = imbuement.items[currentTier];
          for (const item of items) {
            totalItemCost += item.quantity * (itemPrices[item.name] || 0);
          }
        }
      }

      // Add service fee (applied to final tier only)
      const serviceFee = SERVICE_FEES[tier];
      return totalGTCost + totalItemCost + serviceFee;
    };
  }, [goldTokenPrice, itemPrices]);

  // Check if all market items for a tier are filled (required for BEST comparison)
  const areAllItemsFilled = useMemo(() => {
    return (imbuementId, tier) => {
      const imbuement = GT_IMBUEMENTS[imbuementId];
      const tiers = TIER_ORDER;
      const tierIndex = tiers.indexOf(tier);

      // Check all items up to selected tier
      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];
        const items = imbuement.items[currentTier];

        // If any item has price = 0, return false
        for (const item of items) {
          if (!itemPrices[item.name] || itemPrices[item.name] === 0) {
            return false;
          }
        }
      }

      return true;
    };
  }, [itemPrices]);

  // Determine which method is cheaper (comparing 4 options: Full GT, Full Market, 2 Hybrids) - memoized for performance
  const getBestOption = useMemo(() => {
    return (imbuementId, tier) => {
      const tiers = TIER_ORDER;
      const tierIndex = tiers.indexOf(tier);

      // If not all market items are filled, don't show BEST highlight
      const allItemsFilled = areAllItemsFilled(imbuementId, tier);

      // Option 1: Full GT (all tiers bought with GT)
      const fullGTCost = calculateGTCost(imbuementId, tier);

      // Option 2: Full Market (all tiers bought on market)
      const fullMarketCost = calculateGPCost(imbuementId, tier);

      // Option 3: Hybrid 1 - Basic with GT + rest on market
      const hybrid1Cost = tierIndex >= 1 ? calculateHybridCost(imbuementId, tier, ['basic']) : Infinity;

      // Option 4: Hybrid 2 - Basic + Intricate with GT + Powerful on market (only for Powerful tier)
      const hybrid2Cost = tier === 'powerful' ? calculateHybridCost(imbuementId, tier, ['basic', 'intricate']) : Infinity;

      // Create options array with all valid options
      const options = [
        { method: 'gt', name: 'Full GT', cost: fullGTCost, description: 'All tiers with GT' },
        { method: 'gp', name: 'Full Market', cost: fullMarketCost, description: 'All tiers on market' },
      ];

      // Add hybrid options if applicable
      if (tierIndex >= 1) {
        options.push({
          method: 'hybrid1',
          name: 'Hybrid Basic GT',
          cost: hybrid1Cost,
          description: 'Basic with GT + rest on market'
        });
      }

      if (tier === 'powerful') {
        options.push({
          method: 'hybrid2',
          name: 'Hybrid Basic+Intricate GT',
          cost: hybrid2Cost,
          description: 'Basic+Intricate with GT + Powerful on market'
        });
      }

      // Handle edge cases
      if (fullGTCost === 0 && fullMarketCost === 0) {
        return { method: 'none', cost: 0, gtCost: 0, gpCost: 0, savings: 0, allOptions: options };
      }

      if (fullGTCost === 0) {
        return {
          method: allItemsFilled ? 'gp' : 'none',
          cost: fullMarketCost,
          gtCost: fullGTCost,
          gpCost: fullMarketCost,
          savings: 0,
          allOptions: options
        };
      }

      if (fullMarketCost === 0 || !allItemsFilled) {
        return {
          method: 'gt',
          cost: fullGTCost,
          gtCost: fullGTCost,
          gpCost: fullMarketCost,
          savings: 0,
          allOptions: options
        };
      }

      // Find the cheapest option among all valid options
      const validOptions = options.filter(opt => opt.cost > 0 && opt.cost !== Infinity);
      const cheapestOption = validOptions.reduce((min, opt) => opt.cost < min.cost ? opt : min, validOptions[0]);

      // Calculate savings compared to the most expensive option
      const maxCost = Math.max(...validOptions.map(opt => opt.cost));
      const savings = maxCost - cheapestOption.cost;

      return {
        method: cheapestOption.method,
        name: cheapestOption.name,
        description: cheapestOption.description,
        cost: cheapestOption.cost,
        gtCost: fullGTCost,
        gpCost: fullMarketCost,
        savings: savings,
        allOptions: options,
      };
    };
  }, [calculateGTCost, calculateGPCost, calculateHybridCost, areAllItemsFilled]);

  // Copy item name to clipboard with error handling
  const copyItemName = async (itemName) => {
    try {
      await navigator.clipboard.writeText(itemName);
      // Show success feedback
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy item name:', error);
      // Fallback for non-HTTPS contexts or older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = itemName;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(null), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        alert(`Failed to copy "${itemName}". Please copy manually.`);
      }
    }
  };

  // Copy optimal configuration to use in Solo Hunt Analyzer with error handling
  const copyToAnalyzer = async (imbuementId, tier) => {
    const imbuement = GT_IMBUEMENTS[imbuementId];
    const bestOption = getBestOption(imbuementId, tier);

    // Build configuration text
    const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
    let config = `${tierName} ${imbuement.name} Imbuement:\n`;

    if (bestOption.method === 'gt') {
      config += `- Use ${imbuement.gtCost[tier]} GT (${formatGPValue(bestOption.gtCost).formatted} GP equivalent)\n`;
    } else {
      config += `- Buy items directly (market prices only):\n`;
      const tiers = TIER_ORDER;
      const tierIndex = tiers.indexOf(tier);

      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];
        const items = imbuement.items[currentTier];

        for (const item of items) {
          const itemCost = item.quantity * (itemPrices[item.name] || 0);
          config += `  - ${item.quantity}x ${item.name}: ${formatGPValue(itemCost).formatted} GP\n`;
        }
      }
      // Service fee is NOT included in calculation
    }

    config += `Total: ${formatGPValue(Math.min(bestOption.gtCost, bestOption.gpCost)).formatted} GP`;

    try {
      await navigator.clipboard.writeText(config);
      // Show success feedback
      setCopiedConfig(`${imbuementId}-${tier}`);
      setTimeout(() => setCopiedConfig(null), 2000);
    } catch (error) {
      console.error('Failed to copy configuration:', error);
      // Fallback for non-HTTPS contexts or older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = config;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedConfig(`${imbuementId}-${tier}`);
        setTimeout(() => setCopiedConfig(null), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        alert('Failed to copy configuration. Please copy manually.');
      }
    }
  };

  const handlePriceChange = (itemName, value) => {
    setItemPrices({
      ...itemPrices,
      [itemName]: parseFloat(value) || 0,
    });
  };

  /**
   * Feature 2: Copy selected imbuements to clipboard
   * Asks user for each imbuement (Vampirism, Void, Strike) with best option explanation
   */
  const handleCopyImbuements = async () => {
    const imbuementsToCopy = [];
    const tier = 'powerful'; // Always use powerful tier for Solo Hunt Analyzer

    // Ask for each imbuement
    for (const [imbuementId, imbuement] of Object.entries(GT_IMBUEMENTS)) {
      const bestOption = getBestOption(imbuementId, tier);

      // Determine best method description
      let bestMethodText = '';
      if (bestOption.method === 'gt') {
        bestMethodText = `${imbuement.gtCost[tier]} GT (${formatGPValue(bestOption.gtCost).formatted} GP)`;
      } else if (bestOption.method === 'gp') {
        bestMethodText = `Market Items (${formatGPValue(bestOption.gpCost).formatted} GP)`;
      } else {
        bestMethodText = 'Preencha os valores dos items primeiro';
      }

      // Ask user if they want to copy this imbuement
      const userConfirmed = window.confirm(
        `Copiar ${imbuement.name}?\n\nMelhor opção: ${bestMethodText}`
      );

      if (userConfirmed) {
        // Calculate item cost WITHOUT service fee for Solo Hunt Analyzer compatibility
        const imbuementData = GT_IMBUEMENTS[imbuementId];
        let itemsOnlyGPCost = 0;
        const tiers = TIER_ORDER;
        const tierIndex = tiers.indexOf(tier);

        for (let i = 0; i <= tierIndex; i++) {
          const currentTier = tiers[i];
          const items = imbuementData.items[currentTier];
          for (const item of items) {
            itemsOnlyGPCost += item.quantity * (itemPrices[item.name] || 0);
          }
        }

        imbuementsToCopy.push({
          category: imbuement.name,
          imbuement: `${imbuement.name} (${imbuement.description})`,
          tier: tier,
          duration: 20,
          itemCost: itemsOnlyGPCost, // Items only (no fee)
          feeCost: SERVICE_FEES[tier], // Fee separate
          method: bestOption.method,
          gtAmount: imbuement.gtCost[tier],
          gtCost: bestOption.gtCost - SERVICE_FEES[tier], // GT cost without fee
        });
      }
    }

    if (imbuementsToCopy.length === 0) {
      alert('Nenhum imbuement selecionado para copiar.');
      return;
    }

    const clipboardData = {
      type: 'tibia_imbuements',
      version: '1.0',
      imbuements: imbuementsToCopy,
    };

    const jsonString = JSON.stringify(clipboardData, null, 2);

    try {
      await navigator.clipboard.writeText(jsonString);
      setCopyFeedback(`${imbuementsToCopy.length} imbuement(s) copiado(s) com sucesso!`);
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch (error) {
      console.error('Failed to copy imbuements:', error);
      // Fallback for non-HTTPS contexts or older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = jsonString;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyFeedback(`${imbuementsToCopy.length} imbuement(s) copiado(s) com sucesso!`);
        setTimeout(() => setCopyFeedback(null), 3000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        alert('Falha ao copiar. Por favor, tente novamente.');
      }
    }
  };

  /**
   * Feature 2: Paste imbuements from clipboard
   * Reads JSON from Solo Hunt Analyzer and applies item prices + GT price
   */
  const handlePasteImbuements = async () => {
    let clipboardText = '';

    try {
      clipboardText = await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      // Fallback: Ask user to paste manually
      clipboardText = window.prompt(
        'Clipboard API not available. Please paste the JSON data here:'
      );

      if (!clipboardText) {
        return; // User cancelled
      }
    }

    try {
      const data = JSON.parse(clipboardText);

      // Check if data is from Solo Hunt Analyzer (new format)
      if (data.type === 'tibia_imbuement_prices' && data.source === 'solo_hunt_analyzer') {
        // Apply item prices from Solo Hunt Analyzer
        const newItemPrices = { ...itemPrices };

        // Copy all item prices
        Object.keys(data.itemPrices).forEach(itemName => {
          if (newItemPrices.hasOwnProperty(itemName)) {
            newItemPrices[itemName] = data.itemPrices[itemName] || 0;
          }
        });

        // Update state
        setItemPrices(newItemPrices);
        if (data.goldTokenPrice && data.goldTokenPrice > 0) {
          setGoldTokenPrice(data.goldTokenPrice);
        }

        setPasteFeedback('Valores colados do Solo Hunt Analyzer com sucesso!');
        setTimeout(() => setPasteFeedback(null), 3000);

        alert('Valores dos imbuements importados do Solo Hunt Analyzer!');
        return;
      }

      // Old format validation (for backwards compatibility)
      if (data.type !== 'tibia_imbuements' || !Array.isArray(data.imbuements)) {
        alert('Formato inválido. Cole dados do Solo Hunt Analyzer ou Imbuement Calculator.');
        return;
      }

      // Apply imbuement data from old format (kept for backwards compatibility)
      let appliedCount = 0;
      const newItemPrices = { ...itemPrices };

      data.imbuements.forEach(imb => {
        const imbuement = Object.values(GT_IMBUEMENTS).find(
          gtImb => gtImb.name === imb.category
        );

        if (!imbuement) return;

        if (imb.method === 'gp' && imb.itemCost > 0) {
          const tiers = TIER_ORDER;
          const tierIndex = tiers.indexOf(imb.tier);

          for (let i = 0; i <= tierIndex; i++) {
            const currentTier = tiers[i];
            const items = imbuement.items[currentTier];

            if (!items || items.length === 0) continue;

            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            const unitPrice = totalQuantity > 0 ? imb.itemCost / totalQuantity : 0;

            items.forEach(item => {
              newItemPrices[item.name] = Math.round(unitPrice);
            });
          }
        }

        appliedCount++;
      });

      setItemPrices(newItemPrices);
      setPasteFeedback(`${appliedCount} imbuement(s) colado(s) com sucesso!`);
      setTimeout(() => setPasteFeedback(null), 5000);

      alert(
        `Imbuements importados:\n\n` +
        data.imbuements.map(
          imb => `• ${imb.imbuement} (${imb.tier}): ${imb.method === 'gt' ? `${imb.gtAmount} GT` : `${formatGPValue(imb.itemCost).formatted} GP`}`
        ).join('\n')
      );

    } catch (error) {
      console.error('Failed to paste imbuements:', error);
      alert('Falha ao colar. Verifique o formato dos dados.');
    }
  };


  return (
    <ImbuementCalculatorContainer data-cy="imbuement-calc-container">
      <PageTitle data-cy="imbuement-calc-title">{t('imbuementCalculator.title')}</PageTitle>
      <PageDescription data-cy="imbuement-calc-description">{t('imbuementCalculator.description')}</PageDescription>

      {/* Shared GT Price Input */}
      <ImbuementCalculatorGTPriceSection data-cy="imbuement-calc-gt-price-section">
        <ImbuementCalculatorGTPriceLabel data-cy="imbuement-calc-gt-price-label">
          <ImbuementCalculatorIconInline src={goldTokenIcon} alt="GT" />
          {t('imbuementCalculator.goldTokenPrice')}:
        </ImbuementCalculatorGTPriceLabel>
        <ImbuementCalculatorGTPriceInput
          type="number"
          min="0"
          value={goldTokenPrice}
          onChange={(e) => setGoldTokenPrice(parseFloat(e.target.value) || 0)}
          placeholder="0"
          data-cy="imbuement-calc-input-gt-price"
        />
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#9E9E9E' }}>GP</span>
      </ImbuementCalculatorGTPriceSection>

      {/* Copy/Paste Buttons */}
      <ImbuementCalculatorCopyPasteSection data-cy="imbuement-calc-copy-paste-section">
        <ImbuementCalculatorButton
          variant="secondary"
          onClick={handleCopyImbuements}
          title={t('imbuementCalculator.copyPaste.copyButtonTitle')}
          data-cy="imbuement-calc-button-copy"
        >
          📋 {t('imbuementCalculator.copyPaste.copyButton')}
        </ImbuementCalculatorButton>
        <ImbuementCalculatorButton
          variant="secondary"
          onClick={handlePasteImbuements}
          title={t('imbuementCalculator.copyPaste.pasteButtonTitle')}
          data-cy="imbuement-calc-button-paste"
        >
          📥 {t('imbuementCalculator.copyPaste.pasteButton')}
        </ImbuementCalculatorButton>
        {copyFeedback && <ImbuementCalculatorFeedbackSuccess data-cy="imbuement-calc-feedback-copy">{copyFeedback}</ImbuementCalculatorFeedbackSuccess>}
        {pasteFeedback && <ImbuementCalculatorFeedbackSuccess data-cy="imbuement-calc-feedback-paste">{pasteFeedback}</ImbuementCalculatorFeedbackSuccess>}
      </ImbuementCalculatorCopyPasteSection>

      {/* Imbuement Blocks */}
      <ImbuementCalculatorGrid data-cy="imbuement-calc-grid">
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.vampirism}
          itemPrices={itemPrices}
          serviceFees={SERVICE_FEES}
          goldTokenPrice={goldTokenPrice}
          copiedItem={copiedItem}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          getBestOption={getBestOption}
          calculateGPCost={calculateGPCost}
          data-cy="imbuement-calc-block-vampirism"
        />
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.void}
          itemPrices={itemPrices}
          serviceFees={SERVICE_FEES}
          goldTokenPrice={goldTokenPrice}
          copiedItem={copiedItem}
          copiedConfig={copiedConfig}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          onCopyToAnalyzer={copyToAnalyzer}
          calculateGPCost={calculateGPCost}
          getBestOption={getBestOption}
          data-cy="imbuement-calc-block-void"
        />
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.strike}
          itemPrices={itemPrices}
          serviceFees={SERVICE_FEES}
          goldTokenPrice={goldTokenPrice}
          copiedItem={copiedItem}
          copiedConfig={copiedConfig}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          onCopyToAnalyzer={copyToAnalyzer}
          calculateGPCost={calculateGPCost}
          getBestOption={getBestOption}
          data-cy="imbuement-calc-block-strike"
        />
      </ImbuementCalculatorGrid>

    </ImbuementCalculatorContainer>
  );
}

ImbuementCalculator.propTypes = {
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
};
