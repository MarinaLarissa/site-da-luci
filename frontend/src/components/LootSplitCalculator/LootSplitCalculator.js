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
import {
  LootSplitCalculatorContainer,
  LootSplitCalculatorHeader,
  LootSplitCalculatorTitle,
  LootSplitCalculatorDescription,
  LootSplitCalculatorFloatingButton,
  LootSplitCalculatorButtonIcon,
  LootSplitCalculatorButtonText,
} from './LootSplitCalculator.styles';

export default function LootSplitCalculator() {
  const { t } = useTranslation();

  const {
    hunts,
    drawerOpen,
    exportOptions,
    toggleDrawer,
    deleteHunt,
    clearHistory,
    handleExportJSON,
    updateExportOptions,
    loadHunts
  } = useHuntHistory();

  const {
    input,
    setInput,
    loading,
    error,
    results,
    handleCalculate,
    loadExampleData,
  } = useLootSplit(loadHunts);

  return (
    <LootSplitCalculatorContainer data-cy="loot-calculator">
      <LootSplitCalculatorHeader>
        <LootSplitCalculatorTitle>{t('calculator.title')}</LootSplitCalculatorTitle>
        <LootSplitCalculatorDescription>
          {t('calculator.subtitle')}
        </LootSplitCalculatorDescription>
      </LootSplitCalculatorHeader>

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
      <LootSplitCalculatorFloatingButton
        onClick={toggleDrawer}
        aria-label={t('huntHistory.openButton')}
        title={t('huntHistory.openButton')}
        data-cy="hunt-history-button-open"
      >
        <LootSplitCalculatorButtonIcon>📜</LootSplitCalculatorButtonIcon>
        <LootSplitCalculatorButtonText>{t('huntHistory.title')}</LootSplitCalculatorButtonText>
      </LootSplitCalculatorFloatingButton>

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
    </LootSplitCalculatorContainer>
  );
}
