/**
 * Main Loot Split Calculator component
 */

import React from 'react';
import { useLootSplit } from '../../hooks/useLootSplit';
import InputSection from './InputSection';
import ResultsSection from './ResultsSection';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './LootSplitCalculator.css';

export default function LootSplitCalculator() {
  const {
    input,
    setInput,
    loading,
    error,
    results,
    handleCalculate,
    handleReset,
    loadExampleData,
  } = useLootSplit();

  return (
    <div className="loot-split-calculator">
      <div className="calculator-header">
        <h1 className="calculator-title">Loot Split Calculator</h1>
        <p className="calculator-description">
          Calculate fair loot distribution for your TIBIA party hunts
        </p>
      </div>

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Input section */}
      <InputSection
        input={input}
        setInput={setInput}
        onCalculate={handleCalculate}
        onLoadExample={loadExampleData}
        loading={loading}
      />

      {/* Loading state */}
      {loading && <LoadingSpinner message="Calculating loot split..." />}

      {/* Results section */}
      {!loading && results && <ResultsSection results={results} />}
    </div>
  );
}
