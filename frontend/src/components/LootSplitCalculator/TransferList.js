/**
 * Transfer list component
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { formatGold } from '../../utils/formatters';
import {
  TransferListContainer,
  ListTitle,
  NoTransfers,
  TransferInstruction,
  TransferItems,
  TransferItem,
  TransferFrom,
  TransferArrow,
  TransferTo,
  TransferAmount,
  TransferCopiedIndicator,
  TransferCommands,
  CommandsTitle,
  CommandsText,
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
        <ListTitle>{t('calculator.resultsSection.transferList.title')}</ListTitle>
        <NoTransfers>{t('calculator.resultsSection.transferList.noTransfers')}</NoTransfers>
      </TransferListContainer>
    );
  }

  return (
    <TransferListContainer data-cy="transfer-list">
      <ListTitle>{t('calculator.resultsSection.transferList.title')}</ListTitle>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopyTransfer(transfer, index);
              }
            }}
          >
            <TransferFrom>{transfer.from}</TransferFrom>
            <TransferArrow>→</TransferArrow>
            <TransferTo>{transfer.to}</TransferTo>
            <TransferAmount>{formatGold(transfer.amount)}</TransferAmount>
            {copiedIndex === index && (
              <TransferCopiedIndicator>{t('calculator.resultsSection.transferList.copiedButton')}</TransferCopiedIndicator>
            )}
          </TransferItem>
        ))}
      </TransferItems>

      <TransferCommands>
        <CommandsTitle>TIBIA Commands:</CommandsTitle>
        <CommandsText>{copyableText}</CommandsText>
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
