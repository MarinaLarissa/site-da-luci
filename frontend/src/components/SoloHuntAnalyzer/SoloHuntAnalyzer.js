/**
 * Solo Hunt Analyzer - Main component
 * Analyzes solo hunt sessions with custom item costs (GP/GT)
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SessionDataInput from './SessionDataInput';
import ItemCostManager from './ItemCostManager';
import ConfigurationManager from './ConfigurationManager';
import SoloHuntResults from './SoloHuntResults';
import HuntHistory from './HuntHistory';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { STORAGE_KEYS, parseDurationToHours } from '../../utils/huntUtils';
import './SoloHuntAnalyzer.css';

export default function SoloHuntAnalyzer({ goldTokenPrice, setGoldTokenPrice }) {
  const { t } = useTranslation();

  // Session data state
  const [sessionData, setSessionData] = useState('');
  const [parsedSession, setParsedSession] = useState(null);

  // Load silver token price from localStorage (gold token is now shared via props)
  const loadSilverTokenPrice = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      if (saved) {
        const { silverTokenPrice } = JSON.parse(saved);
        return silverTokenPrice || 0;
      }
    } catch (error) {
      console.error('Error loading silver token price:', error);
    }
    return 0;
  };

  // Item costs state (gold token price is now shared via props)
  const [customItems, setCustomItems] = useState([]);
  const [silverTokenPrice, setSilverTokenPrice] = useState(loadSilverTokenPrice());

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [silverTokenError, setSilverTokenError] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Use ref instead of state to avoid React functional update issues
  const saveHuntToHistoryRef = useRef(null);
  const resultsRef = useRef(null);

  // Save silver token price to localStorage whenever it changes
  // (Gold token price is saved by App.js)
  const [hasLoadedPrices, setHasLoadedPrices] = useState(false);

  useEffect(() => {
    // Skip saving during initial load
    if (!hasLoadedPrices) {
      setHasLoadedPrices(true);
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      const prices = saved ? JSON.parse(saved) : {};
      prices.silverTokenPrice = silverTokenPrice;
      localStorage.setItem(STORAGE_KEYS.TOKEN_PRICES, JSON.stringify(prices));
    } catch (error) {
      console.error('Error saving silver token price:', error);
    }
  }, [silverTokenPrice, hasLoadedPrices]);

  // Scroll to top when error appears
  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  // Clear results and re-enable calculate button when items are modified after calculation
  // This prevents stale results and prompts user to recalculate
  useEffect(() => {
    if (results && customItems.length > 0) {
      setResults(null);
    }
    // Re-enable calculate button when items are edited/added
    if (hasCalculated) {
      setHasCalculated(false);
    }
  }, [customItems]);

  /**
   * Parse session data (single player only)
   */
  const handleParseSession = () => {
    try {
      setError(null);

      if (!sessionData.trim()) {
        setError(t('soloHuntAnalyzer.errors.emptySessionData'));
        return;
      }

      // Parse session data (simplified version)
      const lines = sessionData.split('\n');

      // Extract session info
      const sessionLine = lines.find(line => line.includes('Session data:'));
      const sessionDuration = lines.find(line => line.includes('Session:'));

      // Find player name (line before first indented stats)
      let playerName = 'Unknown';
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('\tLoot:') && i > 0) {
          playerName = lines[i - 1].trim();
          break;
        }
      }

      // Validate single player
      const playerBlocks = sessionData.split('\n\n').filter(block =>
        block.includes('\tLoot:') && block.includes('\tSupplies:')
      );

      if (playerBlocks.length !== 1) {
        setError(t('soloHuntAnalyzer.errors.multiplePlayersDetected', { count: playerBlocks.length }));
        return;
      }

      // Extract numeric values
      const extractNumber = (str) => {
        if (!str) return 0;
        const match = str.match(/([-\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
      };

      // Parse player stats from indented lines
      const playerBlock = playerBlocks[0];
      const playerLines = playerBlock.split('\n');

      const playerLoot = extractNumber(playerLines.find(l => l.includes('\tLoot:')));
      const playerSupplies = extractNumber(playerLines.find(l => l.includes('\tSupplies:')));
      const playerBalance = extractNumber(playerLines.find(l => l.includes('\tBalance:')));
      const playerDamage = extractNumber(playerLines.find(l => l.includes('\tDamage:')));
      const playerHealing = extractNumber(playerLines.find(l => l.includes('\tHealing:')));

      const parsed = {
        sessionInfo: sessionLine ? sessionLine.replace('Session data:', '').trim() : '',
        duration: sessionDuration ? sessionDuration.replace('Session:', '').trim() : '',
        player: {
          name: playerName,
          loot: playerLoot,
          supplies: playerSupplies,
          balance: playerBalance,
          damage: playerDamage,
          healing: playerHealing,
        },
      };

      setParsedSession(parsed);
      setError(null);
    } catch (err) {
      setError(t('soloHuntAnalyzer.errors.parseError') + ': ' + err.message);
      setParsedSession(null);
    }
  };

  /**
   * Calculate final results with item costs
   */
  const handleCalculate = () => {
    if (!parsedSession) {
      setError(t('soloHuntAnalyzer.errors.noSessionData'));
      return;
    }

    // Validate Silver Token price if Ring Bis is added
    const hasRingBis = customItems.some(item => item.name === 'Ring Bis');
    if (hasRingBis && silverTokenPrice === 0) {
      setError(t('soloHuntAnalyzer.errors.missingSilverTokenPrice'));
      setSilverTokenError(true);
      return;
    }

    setSilverTokenError(false);
    setLoading(true);
    setHasCalculated(true);

    try {
      // Parse hunt duration
      const huntDurationHours = parseDurationToHours(parsedSession.duration);

      // Calculate total cost of custom items (with proportional cost based on item duration)
      let totalCostGP = 0; // Total proportional cost for this hunt
      let totalGpPerHour = 0; // GP per hour (for items with itemDuration only)
      let totalCostGP_nonProportional = 0; // For items without itemDuration
      let proportionalCostOnly = 0; // Only items with duration (for history)
      let partialGP = 0; // Direct GP costs (not from token conversion)
      let totalGT = 0; // Total GT used
      let totalST = 0; // Total ST used

      customItems.forEach(item => {
        // Calculate base cost in the item's currency (before GP conversion)
        const baseCost = item.unitPrice * item.quantity;

        if (item.itemDuration && huntDurationHours > 0) {
          // For items with duration (Ring Bis, Imbuements):
          // 1. Convert to GP first (if needed)
          // 2. Calculate cost per hour: (baseCost in GP) / itemDuration
          // 3. Calculate proportional cost: costPerHour * huntDurationHours

          let baseCostGP = baseCost;
          if (item.priceType === 'GT') {
            if (goldTokenPrice === 0) {
              setError(t('soloHuntAnalyzer.errors.missingGoldTokenPrice'));
              setLoading(false);
              return;
            }
            baseCostGP = baseCost * goldTokenPrice;
            totalGT += baseCost; // Store original GT amount for display
          } else if (item.priceType === 'ST') {
            if (silverTokenPrice === 0) {
              setError(t('soloHuntAnalyzer.errors.missingSilverTokenPriceForItems'));
              setLoading(false);
              return;
            }
            baseCostGP = baseCost * silverTokenPrice;
            totalST += baseCost; // Store original ST amount for display
          } else if (item.priceType === 'GP') {
            partialGP += Math.ceil((baseCost / item.itemDuration) * huntDurationHours);
          }

          // Calculate GP per hour and proportional cost
          const costPerHourGP = baseCostGP / item.itemDuration;
          const proportionalCost = Math.ceil(costPerHourGP * huntDurationHours);

          totalGpPerHour += costPerHourGP;
          totalCostGP += proportionalCost;
          proportionalCostOnly += proportionalCost; // Track proportional costs separately
        } else {
          // For custom items without duration: use full cost
          if (item.priceType === 'GP') {
            totalCostGP_nonProportional += baseCost;
            partialGP += baseCost;
          } else if (item.priceType === 'GT') {
            if (goldTokenPrice === 0) {
              setError(t('soloHuntAnalyzer.errors.missingGoldTokenPrice'));
              setLoading(false);
              return;
            }
            totalCostGP_nonProportional += baseCost * goldTokenPrice;
            totalGT += baseCost;
          } else if (item.priceType === 'ST') {
            if (silverTokenPrice === 0) {
              setError(t('soloHuntAnalyzer.errors.missingSilverTokenPriceForItems'));
              setLoading(false);
              return;
            }
            totalCostGP_nonProportional += baseCost * silverTokenPrice;
            totalST += baseCost;
          }
        }
      });

      // Add non-proportional costs to total
      totalCostGP += totalCostGP_nonProportional;

      // Calculate additional metrics
      const totalSupplies = parsedSession.player.supplies + totalCostGP;
      const adjustedBalance = parsedSession.player.balance - totalCostGP;
      const profitPerHour = huntDurationHours > 0 ? adjustedBalance / huntDurationHours : 0;
      const suppliesPerHour = huntDurationHours > 0 ? totalSupplies / huntDurationHours : 0;

      setResults({
        session: parsedSession,
        costs: {
          partialGP, // Direct GP costs (without token conversion)
          totalGT, // Total GT used (in GT, not converted)
          totalST, // Total ST used (in ST, not converted)
          goldTokenPrice: goldTokenPrice,
          silverTokenPrice,
          items: customItems,
          gpPerHour: totalGpPerHour, // GP per hour (only for items with itemDuration)
          additionalCost: totalCostGP, // Total proportional cost for this hunt
        },
        totalSupplies,
        adjustedBalance,
        profitPerHour,
        suppliesPerHour,
      });

      // Save to hunt history
      if (saveHuntToHistoryRef.current) {
        const huntData = {
          playerName: parsedSession.player.name,
          duration: parsedSession.duration,
          loot: parsedSession.player.loot,
          supplies: parsedSession.player.supplies,
          balance: parsedSession.player.balance,
          totalCost: proportionalCostOnly, // Only proportional costs (items with duration)
          adjustedBalance,
          profitPerHour: huntDurationHours > 0 ? Math.round(adjustedBalance / huntDurationHours) : 0,
        };
        saveHuntToHistoryRef.current(huntData);
      }

      setError(null);

      // Scroll to results section
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError(t('soloHuntAnalyzer.errors.calculationError', { message: err.message }));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset calculator
   */
  const handleReset = () => {
    setSessionData('');
    setParsedSession(null);
    setCustomItems([]);
    setGoldTokenPrice(0);
    setSilverTokenPrice(0);
    setResults(null);
    setError(null);
    setHasCalculated(false);
  };

  return (
    <div className="solo-hunt-analyzer">
      <div className="calculator-header">
        <h1 className="calculator-title">{t('soloHuntAnalyzer.title')}</h1>
        <p className="calculator-description">
          {t('soloHuntAnalyzer.subtitle')}
        </p>
      </div>

      {/* Fixed History Button */}
      <button
        className="btn-open-history"
        onClick={() => setIsHistoryOpen(true)}
        title={t('huntHistory.openButton')}
        data-cy="hunt-history-button-open"
      >
        <span className="btn-icon">📜</span>
        <span className="btn-text">{t('huntHistory.title')}</span>
      </button>

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Session Data Input */}
      <SessionDataInput
        sessionData={sessionData}
        setSessionData={setSessionData}
        onParse={handleParseSession}
        parsedSession={parsedSession}
      />

      {/* Item Cost Manager (only show if session is parsed) */}
      {parsedSession && (
        <ItemCostManager
          customItems={customItems}
          setCustomItems={setCustomItems}
          goldTokenPrice={goldTokenPrice}
          setGoldTokenPrice={setGoldTokenPrice}
          silverTokenPrice={silverTokenPrice}
          setSilverTokenPrice={setSilverTokenPrice}
          silverTokenError={silverTokenError}
        />
      )}

      {/* Configuration Manager (save/load configurations) */}
      {parsedSession && (
        <ConfigurationManager
          customItems={customItems}
          setCustomItems={setCustomItems}
          goldTokenPrice={goldTokenPrice}
          setGoldTokenPrice={setGoldTokenPrice}
          silverTokenPrice={silverTokenPrice}
          setSilverTokenPrice={setSilverTokenPrice}
        />
      )}

      {/* Calculate button */}
      {parsedSession && (
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={handleCalculate}
            disabled={loading || hasCalculated}
            data-cy="solo-hunt-button-calculate"
          >
            {t('soloHuntAnalyzer.calculateButton')}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
          >
            {t('soloHuntAnalyzer.resetButton')}
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && <LoadingSpinner message={t('soloHuntAnalyzer.calculating')} />}

      {/* Results section */}
      {!loading && results && (
        <div ref={resultsRef}>
          <SoloHuntResults results={results} />
        </div>
      )}

      {/* Hunt History */}
      <HuntHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onAddHunt={(fn) => { saveHuntToHistoryRef.current = fn; }}
      />
    </div>
  );
}

SoloHuntAnalyzer.propTypes = {
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
};
