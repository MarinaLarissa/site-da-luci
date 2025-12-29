/**
 * Input section for loot data
 */

import React from 'react';
import Button from '../common/Button';
import './InputSection.css';

export default function InputSection({ input, setInput, onCalculate, onLoadExample, loading }) {
  return (
    <div className="input-section">
      <h2 className="section-title">Enter Loot Data</h2>
      <p className="section-description">
        Paste your TIBIA loot session data below (copy from Party Hunt Analyzer)
      </p>

      <textarea
        className="loot-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your loot data here..."
        rows={15}
        disabled={loading}
      />

      <div className="button-group">
        <Button onClick={onCalculate} disabled={loading || !input.trim()}>
          {loading ? 'Calculating...' : 'Calculate Split'}
        </Button>
        <Button variant="secondary" onClick={onLoadExample} disabled={loading}>
          Load Example
        </Button>
      </div>
    </div>
  );
}
