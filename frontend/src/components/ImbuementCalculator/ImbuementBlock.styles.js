/**
 * Styled components for ImbuementBlock
 * Migrated to use theme tokens - Phase 4 ETAPA 31
 */

import styled from 'styled-components';

export const ImbuementBlockContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg.darker};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(195, 155, 211, 0.2);
  }
`;

export const ImbuementBlockTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent.primaryDark};
  padding-bottom: 12px;
`;

export const ImbuementBlockDescription = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-style: italic;
`;

export const ImbuementBlockItemPrices = styled.div`
  margin-top: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImbuementBlockPriceInputRow = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 120px 40px;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bg.input};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.hover};
    border: 1px solid ${({ theme }) => theme.colors.border.medium};
  }

  label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.label};
  }

  input {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    background: ${({ theme }) => theme.colors.bg.darker};
    border: 1px solid ${({ theme }) => theme.colors.border.medium};
    border-radius: 6px;
    text-align: right;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent.primaryDark};
      box-shadow: 0 0 0 3px rgba(195, 155, 211, 0.2);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 32px 1fr;
    gap: 8px;

    input {
      grid-column: 1 / -1;
    }
  }
`;

export const ImbuementBlockCopyButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${({ theme }) => theme.colors.accent.primaryDark};
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.accent.primaryDarker};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ImbuementBlockGPLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const ImbuementBlockCalculations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImbuementBlockCalculationRow = styled.div`
  background: ${({ theme }) => theme.colors.bg.input};
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid ${({ theme }) => theme.colors.accent.primaryDark};
`;

export const ImbuementBlockTierName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ImbuementBlockCostComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ImbuementBlockCostOption = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bg.darker};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  ${props => props.$isBest && `
    border-color: ${({ theme }) => theme.colors.successAlt};
    background: ${({ theme }) => theme.colors.successBg};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);

    &::after {
      content: '✓ Best';
      font-size: 12px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.successAlt};
      margin-top: 4px;
    }
  `}

  > span:first-of-type {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ImbuementBlockCostValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primaryDark};
`;

export const ImbuementBlockCostBreakdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

export const ImbuementBlockBreakdownLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bg.input};

  ${props => props.$isTotal && `
    font-weight: 700;
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.border.medium};
    background: transparent;
  `}
`;

export const ImbuementBlockBreakdownLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 11px;
`;

export const ImbuementBlockBreakdownValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  font-size: 12px;
`;

export const ImbuementBlockSavings = styled.div`
  background: ${({ theme }) => theme.colors.warningBg};
  border: 1px solid ${({ theme }) => theme.colors.warningBorder};
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warningText};
  text-align: center;
  margin-bottom: 12px;
`;

export const ImbuementBlockBestOptionHighlight = styled.div`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%);
  border: 2px solid ${({ theme }) => theme.colors.successAlt};
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ImbuementBlockBestBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.successAlt};
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ImbuementBlockBestOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  strong {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.successAlt};
  }
`;

export const ImbuementBlockBestOptionDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
  font-style: italic;
`;

export const ImbuementBlockBestOptionCost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.bg.darker};
  border-radius: 6px;
  margin-top: 4px;

  .cost-label {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  .cost-value {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.successAlt};
  }
`;

export const ImbuementBlockCopyToAnalyzerButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.bg.dark};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ImbuementBlockTierToggles = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: center;
`;

export const ImbuementBlockToggleTierButton = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.bg.darker};
  color: ${({ theme }) => theme.colors.accent.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.accent.primaryDark};
    transform: translateY(-1px);
  }

  ${props => props.$active && `
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.bg.dark};
    border-color: transparent;
  `}
`;
