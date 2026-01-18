/**
 * Main App component
 */

import { Suspense, useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import LootSplitCalculator from './components/LootSplitCalculator/LootSplitCalculator';
import SoloHuntAnalyzer from './components/SoloHuntAnalyzer/SoloHuntAnalyzer';
import ImbuementCalculator from './components/ImbuementCalculator/ImbuementCalculator';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { STORAGE_KEYS } from './utils/huntUtils';
import './i18n/config'; // Initialize i18n
import { AppContainer, MainContent } from './App.styles';

function App() {
  const [activePage, setActivePage] = useState('loot-split');

  // Shared Gold Token Price state (used by both Solo Hunt Analyzer and Imbuement Calculator)
  // Load from localStorage on mount
  const loadGoldTokenPrice = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      if (saved) {
        const { goldTokenPrice } = JSON.parse(saved);
        return goldTokenPrice || 0;
      }
    } catch (error) {
      console.error('Error loading gold token price:', error);
    }
    return 0;
  };

  const [sharedGoldTokenPrice, setSharedGoldTokenPrice] = useState(loadGoldTokenPrice());

  // Save gold token price to localStorage whenever it changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      const prices = saved ? JSON.parse(saved) : {};
      prices.goldTokenPrice = sharedGoldTokenPrice;
      localStorage.setItem(STORAGE_KEYS.TOKEN_PRICES, JSON.stringify(prices));
    } catch (error) {
      console.error('Error saving gold token price:', error);
    }
  }, [sharedGoldTokenPrice]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContainer>
        <LanguageSelector />
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <MainContent>
          {/* Content based on active page from sidebar */}
          {activePage === 'loot-split' && <LootSplitCalculator />}
          {activePage === 'solo-hunt' && (
            <SoloHuntAnalyzer
              goldTokenPrice={sharedGoldTokenPrice}
              setGoldTokenPrice={setSharedGoldTokenPrice}
            />
          )}
          {activePage === 'imbuement-calc' && (
            <ImbuementCalculator
              goldTokenPrice={sharedGoldTokenPrice}
              setGoldTokenPrice={setSharedGoldTokenPrice}
            />
          )}
        </MainContent>
      </AppContainer>
    </Suspense>
  );
}

export default App;
