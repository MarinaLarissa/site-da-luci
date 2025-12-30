/**
 * Solo Hunt Analyzer - Main component
 * Analyzes solo hunt sessions with custom item costs (GP/GT)
 */

import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next'; // TODO: Add i18n support
import SessionDataInput from './SessionDataInput';
import ItemCostManager from './ItemCostManager';
import SoloHuntResults from './SoloHuntResults';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './SoloHuntAnalyzer.css';

export default function SoloHuntAnalyzer() {
  // const { t } = useTranslation(); // TODO: Add i18n support later

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
   * Calculate final results with item costs
   */
  const handleCalculate = () => {
    if (!parsedSession) {
      setError('Primeiro processe os dados da sessão.');
      return;
    }

    setLoading(true);

    try {
      // Calculate total cost of custom items
      let totalCostGP = 0;
      let totalCostGT = 0;
      let totalCostST = 0;

      customItems.forEach(item => {
        if (item.priceType === 'GP') {
          totalCostGP += item.unitPrice * item.quantity;
        } else if (item.priceType === 'GT') {
          totalCostGT += item.unitPrice * item.quantity;
        } else if (item.priceType === 'ST') {
          totalCostST += item.unitPrice * item.quantity;
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
        <h1 className="calculator-title">Solo Hunt Analyzer</h1>
        <p className="calculator-description">
          Analise suas hunts solo e calcule o balance real considerando custos de imbuements e outros itens.
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
            Calcular Balance Ajustado
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Limpar
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
