/**
 * Shared Modal Components
 * Phase 4 ETAPA 36 - Consolidates duplicate modal implementations
 */

import styled from 'styled-components';

/**
 * ModalOverlay Component
 * Semi-transparent backdrop for modals
 * Props:
 *   - $zIndex: Z-index (default: 1000)
 */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ $zIndex }) => $zIndex || 1000};
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/**
 * ModalContent Component
 * Main modal container
 * Props:
 *   - $width: Modal width (default: 500px)
 *   - $maxWidth: Max width (default: 90%)
 *   - $padding: Content padding (default: 24px)
 */
export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ $padding }) => $padding || '24px'};
  width: ${({ $width }) => $width || '500px'};
  max-width: ${({ $maxWidth }) => $maxWidth || '90%'};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease-out;
  position: relative;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
    max-height: 95vh;
  }
`;

/**
 * ModalHeader Component
 * Modal header with title and close button
 * Props:
 *   - $marginBottom: Bottom margin (default: 16px)
 */
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '16px'};
  padding-bottom: ${({ $marginBottom }) => $marginBottom || '16px'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

/**
 * ModalTitle Component
 * Modal title text
 */
export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.gold};
  margin: 0;
`;

/**
 * ModalBody Component
 * Modal main content area
 * Props:
 *   - $padding: Body padding (default: 0)
 */
export const ModalBody = styled.div`
  padding: ${({ $padding }) => $padding || '0'};
  color: ${({ theme }) => theme.colors.text.primary};
`;

/**
 * ModalFooter Component
 * Modal footer with action buttons
 * Props:
 *   - $marginTop: Top margin (default: 16px)
 *   - $justify: Justify content (default: flex-end)
 */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => $justify || 'flex-end'};
  gap: 12px;
  margin-top: ${({ $marginTop }) => $marginTop || '16px'};
  padding-top: ${({ $marginTop }) => $marginTop || '16px'};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;

    > button {
      width: 100%;
    }
  }
`;

/**
 * ModalCloseButton Component
 * Close button for modals
 */
export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export default {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton
};
