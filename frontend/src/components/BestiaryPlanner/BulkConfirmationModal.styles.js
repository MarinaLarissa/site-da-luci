/**
 * BulkConfirmationModal Styles
 */

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: #1f2937;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid #374151;
  animation: ${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #e5e7eb;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #374151;
    color: #e5e7eb;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`;

export const ModalDescription = styled.p`
  color: #d1d5db;
  font-size: 0.9375rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

export const CreaturePreview = styled.div`
  background: #111827;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #374151;
`;

export const CreaturePreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const CreaturePreviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #1f2937;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #e5e7eb;
  border: 1px solid #374151;

  span:first-child {
    font-weight: 500;
  }

  span:last-child {
    color: #fbbf24;
    font-weight: 600;
  }
`;

export const CreaturePreviewMore = styled.div`
  text-align: center;
  padding: 0.75rem;
  color: #9ca3af;
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 0.5rem;
  border-top: 1px solid #374151;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #374151;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid #4b5563;
  color: #9ca3af;

  &:hover {
    background: #374151;
    border-color: #6b7280;
    color: #e5e7eb;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ConfirmButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  color: white;

  ${(props) => {
    switch (props.$variant) {
      case 'complete':
        return `
          background: linear-gradient(135deg, #10b981, #059669);
          &:hover {
            background: linear-gradient(135deg, #059669, #047857);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        `;
      case 'plan':
        return `
          background: linear-gradient(135deg, #667eea, #764ba2);
          &:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'remove':
        return `
          background: linear-gradient(135deg, #ef4444, #dc2626);
          &:hover {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }
        `;
      case 'export':
        return `
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          &:hover {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #10b981, #059669);
          &:hover {
            background: linear-gradient(135deg, #059669, #047857);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        `;
    }
  }}

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
