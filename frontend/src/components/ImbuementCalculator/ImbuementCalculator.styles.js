/**
 * Imbuement Effective Calculator Styled Components
 * Migrated to use theme tokens - Phase 4 ETAPA 31
 */

import styled, { keyframes } from 'styled-components';

// ETAPA 33-36: Migrated to shared Typography and Modal components
export { PageTitle, PageDescription, SectionTitle, SectionDescription } from '../common/styled';
export { ModalOverlay, ModalContent, ModalFooter as ModalActions } from '../common/styled';

/* Animations */
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* Main Container */
export const CalculatorContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// PageTitle and PageDescription removed - using shared components (imported above)

/* GT Price Section */
export const GTPriceSection = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const GTPriceLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const GTPriceInput = styled.input`
  width: 140px;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.bg.dark};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 8px;
  text-align: right;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.accentGold};
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* Service Fee Section */
export const ServiceFeeSection = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

// SectionTitle and SectionDescription removed - using shared components (imported above)

export const ServiceFeeInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const FeeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.bg.input};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const FeeLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.label};
  min-width: 80px;
`;

export const FeeInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.bg.darker};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: 6px;
  text-align: right;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.primaryDark};
    box-shadow: 0 0 0 3px rgba(195, 155, 211, 0.2);
  }
`;

/* Imbuements Grid */
export const ImbueingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

/* Copy/Paste Section */
export const CopyPasteSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const FeedbackSuccess = styled.span`
  color: ${({ theme }) => theme.colors.successAlt};
  font-weight: 600;
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease-in;
`;

/* Modal - specific components only (ModalOverlay and ModalContent imported from common/styled) */
export const ModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

/* Imbuements Selection (Modal) */
export const ImbuementsSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
`;

export const ImbuementSelectionBlock = styled.div`
  background: ${({ theme }) => theme.colors.bg.input};
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid ${({ theme }) => theme.colors.accent.primaryDark};

  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;

export const TierCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.bg.darker};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.border.medium};
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.accent.primaryDark};
  }

  .tier-name {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    min-width: 80px;
  }

  .tier-cost {
    color: ${({ theme }) => theme.colors.accent.primary};
    font-size: 14px;
    margin-left: auto;
  }
`;

/* Modal Actions - removed, now using shared ModalFooter (aliased as ModalActions above) */

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' && `
    background: ${props.theme.gradients.primary};
    color: ${props.theme.colors.bg.dark};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: ${props.theme.colors.bg.darker};
    color: ${props.theme.colors.text.primary};
    border: 1px solid ${props.theme.colors.border.medium};

    &:hover {
      background: ${props.theme.colors.bg.hover};
      border-color: ${props.theme.colors.accent.primaryDark};
    }
  `}
`;

/* Icons */
export const IconInline = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

export const IconSmall = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
`;

/* Export animation for use in child components */
export { slideDown, fadeIn };
