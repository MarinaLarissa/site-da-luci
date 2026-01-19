/**
 * Styled components for ItemCostManager
 * Migrated from ItemCostManager.css
 * Following LootSplitCalculator design system
 */

import styled, { css, keyframes } from 'styled-components';

/* Grid configuration constants */
const GRID_COLUMNS_DESKTOP = '2fr 0.5fr 1fr 0.5fr';
const GRID_COLUMNS_TABLET = '1.5fr 0.5fr 1fr 0.5fr';

export const ItemCostManagerContainer = styled.div`
  background-color: #16213e;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(195, 155, 211, 0.2);

  /* Responsive */
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* Token Prices Section */
export const TokenPricesSection = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: rgba(195, 155, 211, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(195, 155, 211, 0.3);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  /* Layout: 2x2 grid
     Row 1: GT (left) | TC (right)
     Row 2: ST (left) | TC Sell Price (right)
  */

  /* Responsive: stack on mobile */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TokenPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  label {
    font-weight: 600;
    color: #c39bd3;
    min-width: 100px;
  }

  input {
    padding: 8px 12px;
    border: 2px solid rgba(195, 155, 211, 0.3);
    border-radius: 6px;
    font-size: 14px;
    width: 150px;
    background-color: #0f1620;
    color: #e0e0e0;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c39bd3;
    }

    &.error {
      border-color: #f44336;
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
    }
  }

  .unit {
    color: #9e9e9e;
    font-weight: 600;
  }

  ${({ $error }) =>
    $error &&
    css`
      background-color: rgba(244, 67, 54, 0.1);
      border: 1px solid rgba(244, 67, 54, 0.3);
      padding: 12px;
      border-radius: 6px;
    `}
`;

/* Icons */
export const TokenIcon = styled.img`
  width: 20px;
  height: 20px;
  image-rendering: pixelated;
`;

export const TokenIconInline = styled.img`
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 6px;
  image-rendering: pixelated;
`;

export const CoinIconSmall = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

export const CoinIconInline = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 4px;
  image-rendering: pixelated;
`;

/* Screen Reader Only */
export const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

/* Add Buttons */
export const AddButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  /* Responsive */
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

/* Items List */
export const ItemsList = styled.div`
  margin-top: 24px;

  h3 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #c39bd3;
    font-weight: 600;
  }
`;

export const ItemsTable = styled.div`
  background-color: #0f1620;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(195, 155, 211, 0.2);

  /* Responsive */
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const ItemsGridBase = css`
  display: grid;
  grid-template-columns: ${GRID_COLUMNS_DESKTOP};
  gap: 8px;
  padding: 12px 16px;
  align-items: center;

  /* Responsive */
  @media (max-width: 968px) {
    grid-template-columns: ${GRID_COLUMNS_TABLET};
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 600px;
    font-size: 12px;
  }
`;

export const ItemsHeader = styled.div`
  ${ItemsGridBase}
  background-color: rgba(195, 155, 211, 0.2);
  color: #c39bd3;
  font-weight: 600;
  font-size: 14px;
`;

export const ItemsRow = styled.div`
  ${ItemsGridBase}
  background-color: #16213e;
  border-bottom: 1px solid rgba(195, 155, 211, 0.1);

  &:hover {
    background-color: rgba(195, 155, 211, 0.05);
  }

  ${({ $parent }) =>
    $parent &&
    css`
      background-color: rgba(195, 155, 211, 0.15);
      border-left: 3px solid #c39bd3;
      font-weight: 600;

      &:hover {
        background-color: rgba(195, 155, 211, 0.2);
      }
    `}

  ${({ $child }) =>
    $child &&
    css`
      background-color: rgba(195, 155, 211, 0.05);
      border-left: 3px solid rgba(195, 155, 211, 0.3);
      margin-left: 20px;
      font-size: 13px;

      &:hover {
        background-color: rgba(195, 155, 211, 0.08);
      }
    `}
`;

export const ItemName = styled.div`
  font-weight: 500;
  color: #e0e0e0;
  display: flex;
  align-items: center;

  ${({ $child }) =>
    $child &&
    css`
      padding-left: 20px;
      color: #b0b0b0;
      font-weight: 400;
    `}
`;

export const ChildPriceLabel = styled.span`
  font-size: 0.85em;
  color: #888;
`;

/* Form Controls */
export const PriceInput = styled.input`
  padding: 6px 8px;
  border: 1px solid rgba(195, 155, 211, 0.3);
  border-radius: 4px;
  font-size: 14px;
  background-color: #0f1620;
  color: #e0e0e0;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c39bd3;
  }
`;

export const PriceTypeSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid rgba(195, 155, 211, 0.3);
  border-radius: 4px;
  font-size: 14px;
  width: 60px;
  background-color: #0f1620;
  color: #e0e0e0;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #c39bd3;
  }
`;

export const ItemTotal = styled.div`
  font-weight: 600;
  color: #c39bd3;
`;

export const ItemSource = styled.div`
  font-size: 12px;
  color: #9e9e9e;
  font-style: italic;
`;

/* Buttons */
export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  transition: transform 0.2s ease;
  color: #9e9e9e;

  &:hover {
    transform: scale(1.2);
    color: #f44336;
  }
`;

export const QuantityButton = styled.button`
  background-color: rgba(195, 155, 211, 0.2);
  border: 1px solid rgba(195, 155, 211, 0.4);
  border-radius: 4px;
  color: #c39bd3;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  transition: all 0.2s ease;
  min-width: 28px;

  &:hover:not(:disabled) {
    background-color: rgba(195, 155, 211, 0.3);
    border-color: #c39bd3;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  color: #c39bd3;
  cursor: pointer;
  font-size: 12px;
  padding: 0 8px 0 0;
  transition: transform 0.2s ease;
  display: inline-block;

  &:hover {
    transform: scale(1.2);
    color: #b388c7;
  }
`;

export const CollapsedHint = styled.span`
  font-size: 0.85em;
  color: #9e9e9e;
  font-style: italic;
  margin-left: 8px;
`;

/* Utility Controls */
export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PriceControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const QuantityDisplay = styled.div`
  min-width: 30px;
  text-align: center;
`;

/* Hybrid Price Display */
export const HybridPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`;

export const TokenPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const GPPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const PriceSeparator = styled.span`
  color: #9e9e9e;
  font-weight: 500;
`;

/* Cost Summary */
export const CostSummary = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(195, 155, 211, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(195, 155, 211, 0.3);

  p {
    margin: 8px 0;
    font-size: 16px;
    color: #e0e0e0;
  }

  strong {
    color: #c39bd3;
  }

  .total-final {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(195, 155, 211, 0.3);
    font-size: 20px;
    color: #c39bd3;
  }
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 14, 23, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #16213e;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(195, 155, 211, 0.3);

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #c39bd3;
    font-weight: 600;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0f1620;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c39bd3;
    border-radius: 4px;

    &:hover {
      background: #b388c7;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: 20px;
  }

  ${({ $wide }) =>
    $wide &&
    css`
      max-width: 800px;
    `}
`;

/* Form Groups */
export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #c39bd3;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid rgba(195, 155, 211, 0.3);
    border-radius: 6px;
    font-size: 14px;
    background-color: #0f1620;
    color: #e0e0e0;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #c39bd3;
    }
  }
`;

export const ImbuementItemsPreview = styled.div`
  background-color: rgba(195, 155, 211, 0.05);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid rgba(195, 155, 211, 0.2);

  h4 {
    margin-bottom: 8px;
    color: #c39bd3;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 4px 0;
    color: #9e9e9e;
    font-size: 14px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

/* Ring BIS Modal */
export const RingBISDescription = styled.p`
  color: #9e9e9e;
  margin-bottom: 24px;
  font-size: 14px;
`;

export const RingBISGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const RingBISOption = styled.div`
  background-color: rgba(195, 155, 211, 0.1);
  border: 2px solid rgba(195, 155, 211, 0.3);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(195, 155, 211, 0.2);
    border-color: rgba(195, 155, 211, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(195, 155, 211, 0.3);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: rgba(195, 155, 211, 0.3);
      border-color: #c39bd3;
      box-shadow: 0 0 0 3px rgba(195, 155, 211, 0.2);
    `}
`;

export const RingBISIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const RingBISName = styled.div`
  font-weight: 600;
  color: #c39bd3;
  text-align: center;
  font-size: 14px;
`;

export const RingBISVocation = styled.div`
  font-size: 12px;
  color: #9e9e9e;
  text-align: center;
`;

/* Recalculation Indicator */
const pulseWarning = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 193, 7, 0);
  }
`;

export const RecalculationIndicator = styled.div`
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.1) 100%);
  border: 2px solid rgba(255, 193, 7, 0.5);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffc107;
  font-weight: 600;
  font-size: 14px;
  animation: ${pulseWarning} 2s ease-in-out infinite;
`;
