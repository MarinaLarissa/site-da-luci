/**
 * Main App component
 */

import React, { Suspense } from 'react';
import Sidebar from './components/Layout/Sidebar';
import LootSplitCalculator from './components/LootSplitCalculator/LootSplitCalculator';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './i18n/config'; // Initialize i18n
import './App.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app">
        <LanguageSelector />
        <Sidebar />
        <main className="main-content">
          <LootSplitCalculator />
        </main>
      </div>
    </Suspense>
  );
}

export default App;
