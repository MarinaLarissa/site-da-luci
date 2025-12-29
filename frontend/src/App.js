/**
 * Main App component
 */

import React from 'react';
import Sidebar from './components/Layout/Sidebar';
import LootSplitCalculator from './components/LootSplitCalculator/LootSplitCalculator';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <LootSplitCalculator />
      </main>
    </div>
  );
}

export default App;
