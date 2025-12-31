/**
 * Solo Hunt Analyzer - Main component
 * Analyzes solo hunt sessions with custom item costs (GP/GT)
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SessionDataInput from './SessionDataInput';
import ItemCostManager from './ItemCostManager';
import ConfigurationManager from './ConfigurationManager';
import SoloHuntResults from './SoloHuntResults';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './SoloHuntAnalyzer.css';

export default function SoloHuntAnalyzer() {
  const { t } = useTranslation();

  // Session data state
  const [sessionData, setSessionData] = useState('');
  const [parsedSession, setParsedSession] = useState(null);

  // Item costs state
  const [customItems, setCustomItems] = useState([]);
  const [goldTokenPrice, setGoldTokenPrice] = useState(0);
  const [silverTokenPrice, setSilverTokenPrice] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [silverTokenError, setSilverTokenError] = useState(false);

  /**
   * Parse session data (single player only)
   */
  const handleParseSession = () => {
    try {
      setError(null);

      if (!sessionData.trim()) {
        setError('Por favor, insira os dados da sessão.');
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
        setError(`Detectados ${playerBlocks.length} jogadores. Este analisador aceita apenas 1 jogador.`);
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
      setError('Erro ao processar dados da sessão: ' + err.message);
      setParsedSession(null);
    }
  };

  /**
   * Parse hunt duration to hours (decimal)
   * Formats: "HH:MMh" (e.g. "03:31h") or "MM:SS" (e.g. "45:30")
   */
  const parseDurationToHours = (durationStr) => {
    if (!durationStr) return 0;

    // Format "HH:MMh" (hours)
    if (durationStr.includes('h')) {
      const parts = durationStr.split(':');
      const hours = parseInt(parts[0], 10) || 0;
      const minutes = parts[1] ? parseInt(parts[1].replace('h', ''), 10) : 0;
      return hours + minutes / 60;
    }

    // Format "MM:SS" (minutes:seconds)
    const parts = durationStr.split(':');
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parts[1] ? parseInt(parts[1], 10) : 0;
    return (minutes + seconds / 60) / 60;
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
        setError('Você adicionou itens com custo em GT, mas não definiu o preço do Gold Token.');
        setLoading(false);
        return;
      }

      // Convert ST to GP if ST price is defined
      if (totalCostST > 0 && silverTokenPrice > 0) {
        totalCostGP += totalCostST * silverTokenPrice;
      } else if (totalCostST > 0 && silverTokenPrice === 0) {
        setError('Você adicionou itens com custo em ST, mas não definiu o preço do Silver Token.');
        setLoading(false);
        return;
      }

      // Calculate adjusted balance
      const adjustedBalance = parsedSession.player.balance - totalCostGP;

      setResults({
        session: parsedSession,
        costs: {
          totalGP: totalCostGP,
          totalGT: totalCostGT,
          totalST: totalCostST,
          goldTokenPrice,
          silverTokenPrice,
          items: customItems,
        },
        adjustedBalance,
      });

      setError(null);
    } catch (err) {
      setError('Erro ao calcular resultado: ' + err.message);
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
  };

  return (
    <div className="solo-hunt-analyzer">
      <div className="calculator-header">
        <h1 className="calculator-title">{t('soloHuntAnalyzer.title')}</h1>
        <p className="calculator-description">
          {t('soloHuntAnalyzer.subtitle')}
        </p>
      </div>

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
            disabled={loading}
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
      {loading && <LoadingSpinner message="Calculando..." />}

      {/* Results section */}
      {!loading && results && <SoloHuntResults results={results} />}
    </div>
  );
}
