/**
 * Imbuement Effective Calculator Component
 * Calculates if it's more efficient to buy GT and exchange for items
 * OR buy items directly from market for GP
 */

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ImbuementCalculator.css';
import goldTokenIcon from '../../assets/tibia/gold_token.gif';
import ImbuementBlock from './ImbuementBlock';

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

// Fixed imbuement service costs - NPC fees charged by Imbuing Shrines
// Basic: 7,500 GP | Intricate: 60,000 GP | Powerful: 250,000 GP
const SERVICE_COSTS = {
  basic: 7500,
  intricate: 60000,
  powerful: 250000,
};

export default function ImbuementCalculator({ goldTokenPrice, setGoldTokenPrice }) {
  const { t } = useTranslation();

  // Item prices state (GP per unit)
  const [itemPrices, setItemPrices] = useState({
    // Vampirism
    'Vampire Teeth': 0,
    'Bloody Pincers': 0,
    'Piece of Dead Brain': 0,
    // Void
    'Rope Belt': 0,
    'Silencer Claws': 0,
    'Some Grimeleech Wings': 0,
    // Strike
    'Protective Charm': 0,
    'Sabretooth': 0,
    'Vexclaw Talon': 0,
  });

  // Clipboard feedback state
  // eslint-disable-next-line no-unused-vars
  const [copiedItem, setCopiedItem] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [copiedConfig, setCopiedConfig] = useState(null);

  // Feature 2: Copy/Paste imbuements state
  const [copyFeedback, setCopyFeedback] = useState(null);
  const [pasteFeedback, setPasteFeedback] = useState(null);

  // Calculate cost via GT (in GP equivalent) - memoized for performance
  const calculateGTCost = useMemo(() => {
    return (imbuementId, tier) => {
      const gtAmount = GT_IMBUEMENTS[imbuementId].gtCost[tier];
      return gtAmount * goldTokenPrice;
    };
  }, [goldTokenPrice]);

  // Calculate cost via GP (items only, no service fee) - memoized for performance
  const calculateGPCost = useMemo(() => {
    return (imbuementId, tier) => {
      const imbuement = GT_IMBUEMENTS[imbuementId];
      let totalItemCost = 0;

      // Calculate cumulative items cost (basic, basic+intricate, basic+intricate+powerful)
      const tiers = ['basic', 'intricate', 'powerful'];
      const tierIndex = tiers.indexOf(tier);

      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];
        const items = imbuement.items[currentTier];

        // eslint-disable-next-line no-loop-func
        items.forEach(item => {
          totalItemCost += item.quantity * (itemPrices[item.name] || 0);
        });
      }

      // Service fee is NOT included - only item costs from market
      return totalItemCost;
    };
  }, [itemPrices]);

  // Check if all market items for a tier are filled (required for BEST comparison)
  const areAllItemsFilled = useMemo(() => {
    return (imbuementId, tier) => {
      const imbuement = GT_IMBUEMENTS[imbuementId];
      const tiers = ['basic', 'intricate', 'powerful'];
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

  // Determine which method is cheaper - memoized for performance
  const getBestOption = useMemo(() => {
    return (imbuementId, tier) => {
      const gtCost = calculateGTCost(imbuementId, tier);
      const gpCost = calculateGPCost(imbuementId, tier);

      // If not all market items are filled, don't show BEST highlight
      const allItemsFilled = areAllItemsFilled(imbuementId, tier);

      if (gtCost === 0 && gpCost === 0) {
        return { method: 'none', gtCost, gpCost, savings: 0 };
      }

      if (gtCost === 0) {
        return { method: allItemsFilled ? 'gp' : 'none', gtCost, gpCost, savings: 0 };
      }

      if (gpCost === 0 || !allItemsFilled) {
        return { method: 'gt', gtCost, gpCost, savings: 0 };
      }

      if (gtCost < gpCost) {
        return { method: 'gt', gtCost, gpCost, savings: gpCost - gtCost };
      } else {
        return { method: 'gp', gtCost, gpCost, savings: gtCost - gpCost };
      }
    };
  }, [calculateGTCost, calculateGPCost, areAllItemsFilled]);

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
      config += `- Use ${imbuement.gtCost[tier]} GT (${bestOption.gtCost.toLocaleString('pt-BR')} GP equivalent)\n`;
    } else {
      config += `- Buy items directly (market prices only):\n`;
      const tiers = ['basic', 'intricate', 'powerful'];
      const tierIndex = tiers.indexOf(tier);

      for (let i = 0; i <= tierIndex; i++) {
        const currentTier = tiers[i];
        const items = imbuement.items[currentTier];

        // eslint-disable-next-line no-loop-func
        items.forEach(item => {
          const itemCost = item.quantity * (itemPrices[item.name] || 0);
          config += `  - ${item.quantity}x ${item.name}: ${itemCost.toLocaleString('pt-BR')} GP\n`;
        });
      }
      // Service fee is NOT included in calculation
    }

    config += `Total: ${Math.min(bestOption.gtCost, bestOption.gpCost).toLocaleString('pt-BR')} GP`;

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
        bestMethodText = `${imbuement.gtCost[tier]} GT (${bestOption.gtCost.toLocaleString('pt-BR')} GP)`;
      } else if (bestOption.method === 'gp') {
        bestMethodText = `Market Items (${bestOption.gpCost.toLocaleString('pt-BR')} GP)`;
      } else {
        bestMethodText = 'Preencha os valores dos items primeiro';
      }

      // Ask user if they want to copy this imbuement
      const userConfirmed = window.confirm(
        `Copiar ${imbuement.name}?\n\nMelhor opção: ${bestMethodText}`
      );

      if (userConfirmed) {
        imbuementsToCopy.push({
          category: imbuement.name,
          imbuement: `${imbuement.name} (${imbuement.description})`,
          tier: tier,
          duration: 20,
          itemCost: bestOption.gpCost,
          feeCost: SERVICE_COSTS[tier],
          method: bestOption.method,
          gtAmount: imbuement.gtCost[tier],
          gtCost: bestOption.gtCost,
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
          const tiers = ['basic', 'intricate', 'powerful'];
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
          imb => `• ${imb.imbuement} (${imb.tier}): ${imb.method === 'gt' ? `${imb.gtAmount} GT` : `${imb.itemCost.toLocaleString('pt-BR')} GP`}`
        ).join('\n')
      );

    } catch (error) {
      console.error('Failed to paste imbuements:', error);
      alert('Falha ao colar. Verifique o formato dos dados.');
    }
  };


  return (
    <div className="imbuement-calculator">
      <h1 className="page-title">{t('imbuementCalculator.title')}</h1>
      <p className="page-description">{t('imbuementCalculator.description')}</p>

      {/* Shared GT Price Input */}
      <div className="gt-price-section">
        <label className="gt-price-label">
          <img src={goldTokenIcon} alt="GT" className="icon-inline" />
          {t('imbuementCalculator.goldTokenPrice')}:
        </label>
        <input
          type="number"
          min="0"
          value={goldTokenPrice}
          onChange={(e) => setGoldTokenPrice(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="gt-price-input"
        />
        <span className="gp-label">GP</span>
      </div>

      {/* Copy/Paste Buttons */}
      <div className="copy-paste-section">
        <button
          className="btn btn-secondary"
          onClick={handleCopyImbuements}
          title={t('imbuementCalculator.copyPaste.copyButtonTitle')}
        >
          📋 {t('imbuementCalculator.copyPaste.copyButton')}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handlePasteImbuements}
          title={t('imbuementCalculator.copyPaste.pasteButtonTitle')}
        >
          📥 {t('imbuementCalculator.copyPaste.pasteButton')}
        </button>
        {copyFeedback && <span className="feedback-success">{copyFeedback}</span>}
        {pasteFeedback && <span className="feedback-success">{pasteFeedback}</span>}
      </div>

      {/* Imbuement Blocks */}
      <div className="imbuements-grid">
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.vampirism}
          itemPrices={itemPrices}
          copiedItem={copiedItem}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          getBestOption={getBestOption}
        />
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.void}
          itemPrices={itemPrices}
          copiedItem={copiedItem}
          copiedConfig={copiedConfig}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          onCopyToAnalyzer={copyToAnalyzer}
          calculateGTCost={calculateGTCost}
          calculateGPCost={calculateGPCost}
          getBestOption={getBestOption}
        />
        <ImbuementBlock
          imbuement={GT_IMBUEMENTS.strike}
          itemPrices={itemPrices}
          copiedItem={copiedItem}
          copiedConfig={copiedConfig}
          onPriceChange={handlePriceChange}
          onCopyItemName={copyItemName}
          onCopyToAnalyzer={copyToAnalyzer}
          calculateGTCost={calculateGTCost}
          calculateGPCost={calculateGPCost}
          getBestOption={getBestOption}
        />
      </div>

    </div>
  );
}

ImbuementCalculator.propTypes = {
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
};
