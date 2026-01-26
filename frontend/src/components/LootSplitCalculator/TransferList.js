/**
 * Transfer list component
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import {
  TransferListContainer,
  TransferListTitle,
  TransferListNoTransfers,
  TransferInstruction,
  TransferItems,
  TransferItem,
  TransferFrom,
  TransferArrow,
  TransferTo,
  TransferAmount,
  TransferCopiedIndicator,
  TransferCommands,
  TransferListCommandsTitle,
  TransferListCommandsText,
} from './TransferList.styles';

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
      <TransferListContainer data-cy="transfer-list">
        <TransferListTitle>{t('calculator.resultsSection.transferList.title')}</TransferListTitle>
        <TransferListNoTransfers>{t('calculator.resultsSection.transferList.noTransfers')}</TransferListNoTransfers>
      </TransferListContainer>
    );
  }

  return (
    <TransferListContainer data-cy="transfer-list">
      <TransferListTitle>{t('calculator.resultsSection.transferList.title')}</TransferListTitle>
      <TransferInstruction>{t('calculator.resultsSection.transferList.instruction')}</TransferInstruction>

      <TransferItems>
        {transfers.map((transfer, index) => (
          <TransferItem
            key={index}
            $copied={copiedIndex === index}
            onClick={() => handleCopyTransfer(transfer, index)}
            role="button"
            tabIndex={0}
            aria-label={`Copy transfer: ${transfer.from} to ${transfer.to} ${formatGold(transfer.amount)}`}
            data-cy={`transfer-item-${index}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopyTransfer(transfer, index);
              }
            }}
          >
            <TransferFrom data-cy="transfer-from">{transfer.from}</TransferFrom>
            <TransferArrow>→</TransferArrow>
            <TransferTo data-cy="transfer-to">{transfer.to}</TransferTo>
            <TransferAmount data-cy="transfer-amount">{formatGold(transfer.amount)}</TransferAmount>
            {copiedIndex === index && (
              <TransferCopiedIndicator data-cy="transfer-copied-indicator">{t('calculator.resultsSection.transferList.copiedButton')}</TransferCopiedIndicator>
            )}
          </TransferItem>
        ))}
      </TransferItems>

      <TransferCommands data-cy="transfer-commands">
        <TransferListCommandsTitle>TIBIA Commands:</TransferListCommandsTitle>
        <TransferListCommandsText>{copyableText}</TransferListCommandsText>
      </TransferCommands>
    </TransferListContainer>
  );
}

TransferList.propTypes = {
  transfers: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  })),
  copyableText: PropTypes.string.isRequired
};
