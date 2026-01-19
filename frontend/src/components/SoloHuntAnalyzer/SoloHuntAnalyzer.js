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
import { STORAGE_KEYS } from '../../utils/huntUtils';
import { calculateSoloHunt } from '../../services/api';
import {
  AnalyzerContainer,
  CalculatorHeader,
  CalculatorTitle,
  CalculatorDescription,
  HistoryButton,
  ButtonIcon,
  ButtonText,
  ActionButtons,
  Button,
} from './SoloHuntAnalyzer.styles';

// Ring Bis item names for validation
const RING_BIS_NAMES = [
  'Arboreal Ring',
  'Alicorn Ring',
  'Arcanomancer Sigil',
  'Ethereal Ring',
  'Spiritthorn Ring'
];

export default function SoloHuntAnalyzer({ goldTokenPrice, setGoldTokenPrice }) {
  const { t } = useTranslation();

  // Session data state
  const [sessionData, setSessionData] = useState('');
  const [parsedSession, setParsedSession] = useState(null);

  // Load silver token and tibia coin prices from localStorage (gold token is now shared via props)
  const loadTokenPrices = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      if (saved) {
        const prices = JSON.parse(saved);
        return {
          silverTokenPrice: prices.silverTokenPrice || 0,
          tibiaCoinPrice: prices.tibiaCoinPrice || 0,
          tibiaCoinSellPrice: prices.tibiaCoinSellPrice || 0
        };
      }
    } catch (error) {
      console.error('Error loading token prices:', error);
    }
    return { silverTokenPrice: 0, tibiaCoinPrice: 0, tibiaCoinSellPrice: 0 };
  };

  // Item costs state (gold token price is now shared via props)
  const [customItems, setCustomItems] = useState([]);
  const loadedPrices = loadTokenPrices();
  const [silverTokenPrice, setSilverTokenPrice] = useState(loadedPrices.silverTokenPrice);
  const [tibiaCoinPrice, setTibiaCoinPrice] = useState(loadedPrices.tibiaCoinPrice);
  const [tibiaCoinSellPrice, setTibiaCoinSellPrice] = useState(loadedPrices.tibiaCoinSellPrice);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [silverTokenError, setSilverTokenError] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [needsRecalculation, setNeedsRecalculation] = useState(false);

  // Use ref instead of state to avoid React functional update issues
  const saveHuntToHistoryRef = useRef(null);
  const resultsRef = useRef(null);
  const hasCalculatedRef = useRef(hasCalculated);

  // Save silver token, tibia coin, and tibia coin sell prices to localStorage whenever they change
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
      prices.tibiaCoinPrice = tibiaCoinPrice;
      prices.tibiaCoinSellPrice = tibiaCoinSellPrice;
      localStorage.setItem(STORAGE_KEYS.TOKEN_PRICES, JSON.stringify(prices));
    } catch (error) {
      console.error('Error saving token prices:', error);
    }
  }, [silverTokenPrice, tibiaCoinPrice, tibiaCoinSellPrice, hasLoadedPrices]);

  // Scroll to top when error appears
  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  // Keep refs in sync with state
  useEffect(() => {
    hasCalculatedRef.current = hasCalculated;
  }, [hasCalculated]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  // Clear results and re-enable calculate button when items are modified after calculation
  // This prevents stale results and prompts user to recalculate
  useEffect(() => {
    if (resultsRef.current && customItems.length > 0) {
      setResults(null);
    }
    // Re-enable calculate button when items are edited/added
    if (hasCalculatedRef.current) {
      setHasCalculated(false);
      setNeedsRecalculation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customItems]); // Only customItems in dependencies - using refs for hasCalculated and results

  // Detect price changes and set needsRecalculation
  useEffect(() => {
    if (hasCalculatedRef.current) {
      setNeedsRecalculation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goldTokenPrice, silverTokenPrice, tibiaCoinPrice, tibiaCoinSellPrice]); // Only prices in dependencies - using ref for hasCalculated

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
   * Calculate final results with item costs (Backend API)
   * Uses centralized API service following Loot Split Calculator pattern
   */
  const handleCalculate = async () => {
    if (!parsedSession) {
      setError(t('soloHuntAnalyzer.errors.noSessionData'));
      return;
    }

    // Validate Silver Token price if Ring Bis is added
    const hasRingBis = customItems.some(item => RING_BIS_NAMES.includes(item.name));
    if (hasRingBis && silverTokenPrice === 0) {
      setError(t('soloHuntAnalyzer.errors.missingSilverTokenPrice'));
      setSilverTokenError(true);
      return;
    }

    setSilverTokenError(false);
    setLoading(true);
    setHasCalculated(true);
    setNeedsRecalculation(false);

    try {
      // Call centralized API service (handles all error cases internally)
      const data = await calculateSoloHunt(parsedSession, customItems, {
        goldTokenPrice,
        silverTokenPrice,
        tibiaCoinPrice,
        tibiaCoinSellPrice,
      });

      if (!data.success) {
        throw new Error(data.error || 'Invalid response from server');
      }

      // Set results from backend
      setResults(data.data);

      // Save to hunt history
      if (saveHuntToHistoryRef.current && data.data.huntData) {
        saveHuntToHistoryRef.current(data.data.huntData);
      }

      setError(null);

      // Scroll to results section
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Calculation error:', err);
      setError(t('soloHuntAnalyzer.errors.calculationError', { message: err.message }));
      setHasCalculated(false); // Allow retry on error
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
    setTibiaCoinPrice(0);
    setTibiaCoinSellPrice(0);
    setResults(null);
    setError(null);
    setHasCalculated(false);
    setNeedsRecalculation(false);
  };

  return (
    <AnalyzerContainer>
      <CalculatorHeader>
        <CalculatorTitle>{t('soloHuntAnalyzer.title')}</CalculatorTitle>
        <CalculatorDescription>
          {t('soloHuntAnalyzer.subtitle')}
        </CalculatorDescription>
      </CalculatorHeader>

      {/* Fixed History Button */}
      <HistoryButton
        onClick={() => setIsHistoryOpen(true)}
        title={t('huntHistory.openButton')}
        data-cy="hunt-history-button-open"
      >
        <ButtonIcon>📜</ButtonIcon>
        <ButtonText>{t('huntHistory.title')}</ButtonText>
      </HistoryButton>

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
          tibiaCoinPrice={tibiaCoinPrice}
          setTibiaCoinPrice={setTibiaCoinPrice}
          tibiaCoinSellPrice={tibiaCoinSellPrice}
          setTibiaCoinSellPrice={setTibiaCoinSellPrice}
          silverTokenError={silverTokenError}
          needsRecalculation={needsRecalculation}
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
        <ActionButtons>
          <Button
            variant="primary"
            onClick={handleCalculate}
            disabled={loading || hasCalculated}
            data-cy="solo-hunt-button-calculate"
          >
            {t('soloHuntAnalyzer.calculateButton')}
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
          >
            {t('soloHuntAnalyzer.resetButton')}
          </Button>
        </ActionButtons>
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
    </AnalyzerContainer>
  );
}

SoloHuntAnalyzer.propTypes = {
  goldTokenPrice: PropTypes.number.isRequired,
  setGoldTokenPrice: PropTypes.func.isRequired,
};
