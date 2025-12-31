/**
 * Solo Hunt Analyzer - Main component
 * Analyzes solo hunt sessions with custom item costs (GP/GT)
 */

import React, { useState, useEffect, useRef } from 'react';
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

export default function SoloHuntAnalyzer() {
  const { t } = useTranslation();

  // Session data state
  const [sessionData, setSessionData] = useState('');
  const [parsedSession, setParsedSession] = useState(null);

  // Load token prices from localStorage
  const loadTokenPrices = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      if (saved) {
        const { goldTokenPrice, silverTokenPrice } = JSON.parse(saved);
        return { goldTokenPrice: goldTokenPrice || 0, silverTokenPrice: silverTokenPrice || 0 };
      }
    } catch (error) {
      console.error('Error loading token prices:', error);
    }
    return { goldTokenPrice: 0, silverTokenPrice: 0 };
  };

  const initialPrices = loadTokenPrices();

  // Item costs state
  const [customItems, setCustomItems] = useState([]);
  const [goldTokenPrice, setGoldTokenPrice] = useState(initialPrices.goldTokenPrice);
  const [silverTokenPrice, setSilverTokenPrice] = useState(initialPrices.silverTokenPrice);

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

  // Save token prices to localStorage whenever they change
  // Optimization: Skip saving during initial load
  const [hasLoadedPrices, setHasLoadedPrices] = useState(false);

  useEffect(() => {
    // Skip saving during initial load
    if (!hasLoadedPrices) {
      setHasLoadedPrices(true);
      return;
    }

    try {
      const prices = { goldTokenPrice, silverTokenPrice };
      localStorage.setItem(STORAGE_KEYS.TOKEN_PRICES, JSON.stringify(prices));
    } catch (error) {
      console.error('Error saving token prices:', error);
    }
  }, [goldTokenPrice, silverTokenPrice, hasLoadedPrices]);

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
      let totalCostGP = 0;
      let totalCostGT = 0;
      let totalCostST = 0;

      customItems.forEach(item => {
        // Calculate proportional cost based on item duration
        // If item has itemDuration (e.g., 20hrs for imbuements, 3hrs for Ring Bis):
        //   cost = (hunt_duration / item_duration) * item_cost
        //   Examples:
        //   - Hunt 2hrs, Ring Bis 3hrs → 2/3 = 0.67 = 67% of cost
        //   - Hunt 6hrs, Ring Bis 3hrs → 6/3 = 2.0 = 200% of cost (used 2x Ring Bis)
        //   - Hunt 3hrs, Imbuement 20hrs → 3/20 = 0.15 = 15% of cost
        // If no itemDuration (custom items): use full cost (1.0 multiplier)
        // Round UP to avoid fractional GP (always charge at least 1 GP if hunt used any portion)
        let costMultiplier = 1.0;
        if (item.itemDuration && huntDurationHours > 0) {
          costMultiplier = huntDurationHours / item.itemDuration;
          // NO CAP: If hunt is 6hrs and Ring Bis lasts 3hrs, charge 2x (used 2 rings)
        }

        // Calculate item cost and round UP (Math.ceil) to avoid decimal GP values
        const itemCost = Math.ceil(item.unitPrice * item.quantity * costMultiplier);

        if (item.priceType === 'GP') {
          totalCostGP += itemCost;
        } else if (item.priceType === 'GT') {
          totalCostGT += itemCost;
        } else if (item.priceType === 'ST') {
          totalCostST += itemCost;
        }
      });

      // Convert GT to GP if GT price is defined
      if (totalCostGT > 0 && goldTokenPrice > 0) {
        totalCostGP += totalCostGT * goldTokenPrice;
      } else if (totalCostGT > 0 && goldTokenPrice === 0) {
        setError(t('soloHuntAnalyzer.errors.missingGoldTokenPrice'));
        setLoading(false);
        return;
      }

      // Convert ST to GP if ST price is defined
      if (totalCostST > 0 && silverTokenPrice > 0) {
        totalCostGP += totalCostST * silverTokenPrice;
      } else if (totalCostST > 0 && silverTokenPrice === 0) {
        setError(t('soloHuntAnalyzer.errors.missingSilverTokenPriceForItems'));
        setLoading(false);
        return;
      }

      // Calculate additional metrics
      const totalSupplies = parsedSession.player.supplies + totalCostGP;
      const adjustedBalance = parsedSession.player.balance - totalCostGP;
      const gpPerHour = huntDurationHours > 0 ? totalCostGP / huntDurationHours : 0;
      const profitPerHour = huntDurationHours > 0 ? adjustedBalance / huntDurationHours : 0;
      const suppliesPerHour = huntDurationHours > 0 ? totalSupplies / huntDurationHours : 0;

      setResults({
        session: parsedSession,
        costs: {
          totalGP: totalCostGP,
          totalGT: totalCostGT,
          totalST: totalCostST,
          goldTokenPrice,
          silverTokenPrice,
          items: customItems,
          gpPerHour,
          additionalCost: totalCostGP,
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
          totalCost: totalCostGP,
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
