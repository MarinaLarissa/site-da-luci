/**
 * Transfer list component
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import './TransferList.css';

export default function TransferList({ transfers, copyableText }) {
  const { t } = useTranslation();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyTransfer = (transfer, index) => {
    const command = `transfer ${transfer.amount} to ${transfer.to}`;
    navigator.clipboard.writeText(command).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div className="transfer-list">
        <h3 className="list-title">{t('calculator.resultsSection.transferList.title')}</h3>
        <p className="no-transfers">{t('calculator.resultsSection.transferList.noTransfers')}</p>
      </div>
    );
  }

  return (
    <div className="transfer-list">
      <h3 className="list-title">{t('calculator.resultsSection.transferList.title')}</h3>

      <div className="transfer-items">
        {transfers.map((transfer, index) => (
          <div
            key={index}
            className={`transfer-item ${copiedIndex === index ? 'copied' : ''}`}
            onClick={() => handleCopyTransfer(transfer, index)}
            role="button"
            tabIndex={0}
            aria-label={`Copy transfer: ${transfer.from} to ${transfer.to} ${formatGold(transfer.amount)}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopyTransfer(transfer, index);
              }
            }}
          >
            <div className="transfer-from">{transfer.from}</div>
            <div className="transfer-arrow">→</div>
            <div className="transfer-to">{transfer.to}</div>
            <div className="transfer-amount">{formatGold(transfer.amount)}</div>
            {copiedIndex === index && (
              <div className="transfer-copied-indicator">{t('calculator.resultsSection.transferList.copiedButton')}</div>
            )}
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
