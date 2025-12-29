/**
 * Main Loot Split Calculator component
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLootSplit } from '../../hooks/useLootSplit';
import { useHuntHistory } from '../../hooks/useHuntHistory';
import InputSection from './InputSection';
import ResultsSection from './ResultsSection';
import HuntHistoryDrawer from '../HuntHistory/HuntHistoryDrawer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './LootSplitCalculator.css';

export default function LootSplitCalculator() {
  const { t } = useTranslation();
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

  const {
    hunts,
    drawerOpen,
    exportOptions,
    toggleDrawer,
    deleteHunt,
    clearHistory,
    handleExportJSON,
    updateExportOptions
  } = useHuntHistory();

  return (
    <div className="loot-split-calculator">
      <div className="calculator-header">
        <h1 className="calculator-title">{t('calculator.title')}</h1>
        <p className="calculator-description">
          {t('calculator.subtitle')}
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
      {loading && <LoadingSpinner message={t('calculator.loading')} />}

      {/* Results section */}
      {!loading && results && <ResultsSection results={results} />}

      {/* Floating button to open hunt history */}
      <button
        className="btn-open-history"
        onClick={toggleDrawer}
        aria-label={t('huntHistory.openButton')}
        title={t('huntHistory.openButton')}
      >
        📜
      </button>

      {/* Hunt History Drawer */}
      <HuntHistoryDrawer
        isOpen={drawerOpen}
        onClose={toggleDrawer}
        hunts={hunts}
        exportOptions={exportOptions}
        onUpdateExportOptions={updateExportOptions}
        onExport={handleExportJSON}
        onDeleteHunt={deleteHunt}
        onClearHistory={clearHistory}
      />
    </div>
  );
}
