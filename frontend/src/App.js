/**
 * Main App component
 */

import { Suspense, useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import LootSplitCalculator from './components/LootSplitCalculator/LootSplitCalculator';
import SoloHuntAnalyzer from './components/SoloHuntAnalyzer/SoloHuntAnalyzer';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './i18n/config'; // Initialize i18n
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('loot-split');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app">
        <LanguageSelector />
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <main className="main-content">
          {/* Content based on active page from sidebar */}
          {activePage === 'loot-split' && <LootSplitCalculator />}
          {activePage === 'solo-hunt' && <SoloHuntAnalyzer />}
        </main>
      </div>
    </Suspense>
  );
}

export default App;
