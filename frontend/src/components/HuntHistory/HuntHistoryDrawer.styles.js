/**
 * Styled components for HuntHistoryDrawer
 * Migrated from HuntHistoryDrawer.css
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

export const HuntHistoryDrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease;
`;

export const HuntHistoryDrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-480px')};
  width: 480px;
  height: 100%;
  background: #0f1620;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  /* Responsive */
  @media (max-width: 600px) {
    width: 100%;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  }
`;

export const HuntHistoryDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #16213e;
  color: #c39bd3;
  border-bottom: 1px solid rgba(195, 155, 211, 0.2);
  flex-shrink: 0;

  /* Responsive */
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const HuntHistoryDrawerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #c39bd3;

  /* Responsive */
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const HuntHistoryDrawerCloseButton = styled.button`
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #c39bd3;
    transform: rotate(90deg);
  }
`;

export const HuntHistoryDrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0f1620;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(195, 155, 211, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(195, 155, 211, 0.5);
  }

  /* Responsive */
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const HuntHistoryDrawerHuntCountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(195, 155, 211, 0.1);
  border-radius: 6px;
  border-left: 4px solid #c39bd3;
`;

export const HuntHistoryDrawerCountText = styled.span`
  font-size: 0.95rem;
  color: #e0e0e0;
  font-weight: 600;
`;

export const HuntHistoryDrawerLimitWarning = styled.span`
  font-size: 0.85rem;
  color: #ff9800;
  font-weight: 500;
`;

export const HuntHistoryDrawerHuntListSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HuntHistoryDrawerListSectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #e0e0e0;
`;

export const HuntHistoryDrawerHuntList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HuntHistoryDrawerEmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #9e9e9e;
  font-size: 0.95rem;
  background: rgba(195, 155, 211, 0.05);
  border-radius: 8px;
  border: 1px dashed rgba(195, 155, 211, 0.3);
`;
