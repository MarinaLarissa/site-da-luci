/**
 * Imbuement Effective Calculator Styled Components
 * Following site color scheme with purple gradients
 */

import styled, { keyframes } from 'styled-components';

/* Theme Colors */
const colors = {
  primaryLight: '#c39bd3',
  primaryDark: '#b388c7',
  primaryDarker: '#9d6fb0',
  bgMain: '#0f0e17',
  bgDark: '#1a1a2e',
  bgDarker: '#16213e',
  bgCard: '#16213e',
  bgInput: '#0f0e17',
  bgHover: 'rgba(195, 155, 211, 0.1)',
  textPrimary: '#f0f0f0',
  textSecondary: '#c39bd3',
  textMuted: '#9E9E9E',
  textLabel: '#b8b8b8',
  borderLight: 'rgba(195, 155, 211, 0.2)',
  borderMedium: 'rgba(195, 155, 211, 0.3)',
  success: '#10b981',
  successBg: 'rgba(16, 185, 129, 0.1)',
  warningBg: 'rgba(251, 191, 36, 0.1)',
  warningBorder: '#fbbf24',
  warningText: '#fbbf24',
  accentGold: '#ffd700',
};

const gradientPrimary = `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primaryDark} 100%)`;

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

export const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  background: ${gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const PageDescription = styled.p`
  font-size: 18px;
  color: ${colors.textMuted};
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

/* GT Price Section */
export const GTPriceSection = styled.div`
  background: ${colors.bgCard};
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors.borderLight};

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
  color: ${colors.textPrimary};
`;

export const GTPriceInput = styled.input`
  width: 140px;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 600;
  background: ${colors.bgDark};
  color: ${colors.textPrimary};
  border: 2px solid ${colors.borderMedium};
  border-radius: 8px;
  text-align: right;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.accentGold};
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* Service Fee Section */
export const ServiceFeeSection = styled.div`
  background: ${colors.bgCard};
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors.borderLight};
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin: 0 0 8px 0;
`;

export const SectionDescription = styled.p`
  font-size: 14px;
  color: ${colors.textMuted};
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

export const ServiceFeeInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const FeeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${colors.bgInput};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
`;

export const FeeLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textLabel};
  min-width: 80px;
`;

export const FeeInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  background: ${colors.bgDarker};
  color: ${colors.textPrimary};
  border: 1px solid ${colors.borderMedium};
  border-radius: 6px;
  text-align: right;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primaryDark};
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
  background: ${colors.bgCard};
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
`;

export const FeedbackSuccess = styled.span`
  color: ${colors.success};
  font-weight: 600;
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease-in;
`;

/* Modal */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: ${colors.bgCard};
  border-radius: 12px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid ${colors.borderMedium};

  h3 {
    color: ${colors.textPrimary};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

export const ModalDescription = styled.p`
  color: ${colors.textMuted};
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
  background: ${colors.bgInput};
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid ${colors.primaryDark};

  h4 {
    color: ${colors.textPrimary};
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
  background: ${colors.bgDarker};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: ${colors.bgHover};
    border-color: ${colors.borderMedium};
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${colors.primaryDark};
  }

  .tier-name {
    font-weight: 600;
    color: ${colors.textPrimary};
    min-width: 80px;
  }

  .tier-cost {
    color: ${colors.textSecondary};
    font-size: 14px;
    margin-left: auto;
  }
`;

/* Modal Actions */
export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' && `
    background: ${gradientPrimary};
    color: ${colors.bgDark};
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
    background: ${colors.bgDarker};
    color: ${colors.textPrimary};
    border: 1px solid ${colors.borderMedium};

    &:hover {
      background: ${colors.bgHover};
      border-color: ${colors.primaryDark};
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
