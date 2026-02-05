/**
 * Main App component
 *
 * Performance: Uses code splitting with React.lazy for heavy components
 * to reduce initial bundle size and improve load time
 */

import { Suspense, useState, useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { UserMenu } from './components/Auth';
import { useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { STORAGE_KEYS } from './utils/huntUtils';
import { ROUTES, DEFAULT_ROUTE } from './routes';
import './i18n/config'; // Initialize i18n
import { AppContainer, MainContent, TopControls, Footer } from './App.styles';

// Lazy load heavy components for better performance
const LootSplitCalculator = lazy(() => import('./components/LootSplitCalculator/LootSplitCalculator'));
const SoloHuntAnalyzer = lazy(() => import('./components/SoloHuntAnalyzer/SoloHuntAnalyzer'));
const ImbuementCalculator = lazy(() => import('./components/ImbuementCalculator/ImbuementCalculator'));
const BestiaryPlanner = lazy(() => import('./components/BestiaryPlanner').then(module => ({ default: module.BestiaryPlanner })));
const LoginModal = lazy(() => import('./components/Auth').then(module => ({ default: module.LoginModal })));

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { saveRedirectPath } = useAuth();

  // Handle login click - save current path before opening modal
  const handleLoginClick = () => {
    saveRedirectPath();
    setIsLoginModalOpen(true);
  };

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
        <UserMenu onLoginClick={handleLoginClick} />
        <LanguageSelector />
      </TopControls>
      <Sidebar />

      <Suspense fallback={<LoadingFallback />}>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </Suspense>

      <MainContent>
        {/* Content based on routes - lazy loaded */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Default route redirects to loot-split */}
              <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />

              <Route path={ROUTES.LOOT_SPLIT} element={<LootSplitCalculator />} />

              <Route
                path={ROUTES.SOLO_HUNT}
                element={
                  <SoloHuntAnalyzer
                    goldTokenPrice={sharedGoldTokenPrice}
                    setGoldTokenPrice={setSharedGoldTokenPrice}
                  />
                }
              />

              <Route
                path={ROUTES.IMBUEMENT_CALC}
                element={
                  <ImbuementCalculator
                    goldTokenPrice={sharedGoldTokenPrice}
                    setGoldTokenPrice={setSharedGoldTokenPrice}
                  />
                }
              />

              <Route path={ROUTES.BESTIARY_PLANNER} element={<BestiaryPlanner />} />

              {/* Catch-all 404 - redirect to default */}
              <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>

        <Footer>
          O jogo Tibia e todas as imagens contidas nesse site são propriedades de CipSoft.{' '}
          O site oficial de Tibia é <a href="https://www.tibia.com" target="_blank" rel="noopener noreferrer">www.tibia.com</a>.{' '}
          Imagens de Items, Outfits e Monstros obtidos do TibiaWiki BR.{' '}
          <a href="https://www.tibiawiki.com.br" target="_blank" rel="noopener noreferrer">www.tibiawiki.com.br</a>
        </Footer>
      </MainContent>
    </AppContainer>
  );
}

export default App;
