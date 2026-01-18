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
  CalculatorContainer,
  CalculatorHeader,
  CalculatorTitle,
  CalculatorDescription,
  FloatingButton,
  ButtonIcon,
  ButtonText,
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
    <CalculatorContainer>
      <CalculatorHeader>
        <CalculatorTitle>{t('calculator.title')}</CalculatorTitle>
        <CalculatorDescription>
          {t('calculator.subtitle')}
        </CalculatorDescription>
      </CalculatorHeader>

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
      <FloatingButton
        onClick={toggleDrawer}
        aria-label={t('huntHistory.openButton')}
        title={t('huntHistory.openButton')}
        data-cy="hunt-history-button-open"
      >
        <ButtonIcon>📜</ButtonIcon>
        <ButtonText>{t('huntHistory.title')}</ButtonText>
      </FloatingButton>

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
    </CalculatorContainer>
  );
}
