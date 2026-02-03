/**
 * Main App component
 *
 * Performance: Uses code splitting with React.lazy for heavy components
 * to reduce initial bundle size and improve load time
 */

import { Suspense, useState, useEffect, lazy } from 'react';
import Sidebar from './components/Layout/Sidebar';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { UserMenu } from './components/Auth';
import ErrorBoundary from './components/common/ErrorBoundary';
import { STORAGE_KEYS } from './utils/huntUtils';
import './i18n/config'; // Initialize i18n
import { AppContainer, MainContent, TopControls } from './App.styles';

// Lazy load heavy components for better performance
const LootSplitCalculator = lazy(() => import('./components/LootSplitCalculator/LootSplitCalculator'));
const SoloHuntAnalyzer = lazy(() => import('./components/SoloHuntAnalyzer/SoloHuntAnalyzer'));
const ImbuementCalculator = lazy(() => import('./components/ImbuementCalculator/ImbuementCalculator'));
const BestiaryPlanner = lazy(() => import('./components/BestiaryPlanner').then(module => ({ default: module.BestiaryPlanner })));
const LoginModal = lazy(() => import('./components/Auth').then(module => ({ default: module.LoginModal })));

function App() {
  const [activePage, setActivePage] = useState('loot-split');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Shared Gold Token Price state (used by both Solo Hunt Analyzer and Imbuement Calculator)
  // Load from localStorage on mount
  const loadGoldTokenPrice = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOKEN_PRICES);
      if (saved) {
        const { goldTokenPrice } = JSON.parse(saved);
        // Return empty string if not set or zero (UX: empty input fields)
        return goldTokenPrice || '';
      }
    } catch (error) {
      console.error('Error loading gold token price:', error);
    }
    return '';
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

  // Loading fallback component
  const LoadingFallback = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Loading...
    </div>
  );

  return (
    <AppContainer>
      <TopControls>
        <UserMenu onLoginClick={() => setIsLoginModalOpen(true)} />
        <LanguageSelector />
      </TopControls>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <Suspense fallback={<LoadingFallback />}>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </Suspense>

      <MainContent>
        {/* Content based on active page from sidebar - lazy loaded */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
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
            {activePage === 'bestiary-planner' && <BestiaryPlanner />}
          </Suspense>
        </ErrorBoundary>
      </MainContent>
    </AppContainer>
  );
}

export default App;
