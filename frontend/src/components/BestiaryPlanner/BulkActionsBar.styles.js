/**
 * BulkActionsBar Styles
 */

import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const BarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(to top, rgba(17, 24, 39, 0.98), rgba(17, 24, 39, 0.95));
  backdrop-filter: blur(8px);
  border-top: 2px solid #667eea;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const BarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const SelectedCount = styled.div`
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const ActionButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  ${(props) => {
    switch (props.$variant) {
      case 'complete':
        return `
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        `;
      case 'plan':
        return `
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #764ba2, #667eea);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        `;
      case 'remove':
        return `
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }
        `;
      case 'export':
        return `
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
        `;
      default:
        return `
          background: #374151;
          color: #e5e7eb;
          &:hover:not(:disabled) {
            background: #4b5563;
          }
        `;
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const CancelButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  border: 1px solid #4b5563;
  color: #9ca3af;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: #374151;
    border-color: #6b7280;
    color: #e5e7eb;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
