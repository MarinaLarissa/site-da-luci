/**
 * Transfer list component
 */

import React, { useState } from 'react';
import { formatGold } from '../../utils/formatters';
import Button from '../common/Button';
import './TransferList.css';

export default function TransferList({ transfers, copyableText }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyableText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div className="transfer-list">
        <h3 className="list-title">Transfers</h3>
        <p className="no-transfers">No transfers needed - loot is already balanced!</p>
      </div>
    );
  }

  return (
    <div className="transfer-list">
      <div className="transfer-header">
        <h3 className="list-title">Transfers</h3>
        <Button variant="secondary" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '📋 Copy Commands'}
        </Button>
      </div>

      <div className="transfer-items">
        {transfers.map((transfer, index) => (
          <div key={index} className="transfer-item">
            <div className="transfer-from">{transfer.from}</div>
            <div className="transfer-arrow">→</div>
            <div className="transfer-to">{transfer.to}</div>
            <div className="transfer-amount">{formatGold(transfer.amount)}</div>
          </div>
        ))}
      </div>

      <div className="transfer-commands">
        <h4 className="commands-title">TIBIA Commands:</h4>
        <pre className="commands-text">{copyableText}</pre>
      </div>
    </div>
  );
}
