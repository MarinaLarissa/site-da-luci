/**
 * Custom hook for managing loot split calculator state
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateLootSplit } from '../services/api';
import { saveHunt } from '../services/huntHistory';

export function useLootSplit() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  /**
   * Handle calculate button click
   */
  const handleCalculate = async () => {
    // Reset previous state
    setError(null);
    setResults(null);

    // Validate input
    if (!input.trim()) {
      setError(t('calculator.error.emptyInput'));
      return;
    }

    setLoading(true);

    try {
      // Call API
      const response = await calculateLootSplit(input);

      // Check if response is successful
      if (response.success) {
        setResults(response.data);
        // Save to hunt history
        saveHunt(response.data, input);
      } else {
        setError(response.error?.message || t('calculator.error.failedCalculation'));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset calculator state
   */
  const handleReset = () => {
    setInput('');
    setError(null);
    setResults(null);
  };

  /**
   * Load example data into input
   */
  const loadExampleData = () => {
    const exampleData = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 12,937,605
Supplies: 1,051,291
Balance: 11,886,314

Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018
  Damage: 17,660,082
  Healing: 785,634

Luciana Burks
  Loot: 277,020
  Supplies: 381,162
  Balance: -104,142
  Damage: 17,145,590
  Healing: 9,169,753

Young Vex
  Loot: 539,786
  Supplies: 490,348
  Balance: 49,438
  Damage: 18,737,566
  Healing: 2,666,860`;

    setInput(exampleData);
    setError(null);
    setResults(null);
  };

  return {
    input,
    setInput,
    loading,
    error,
    results,
    handleCalculate,
    handleReset,
    loadExampleData,
  };
}
