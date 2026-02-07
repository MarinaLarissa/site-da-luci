/**
 * Shared Floating History Button Components
 * Used by all main pages with history functionality
 * to ensure 100% identical styling and behavior
 */

import styled from 'styled-components';

export const FloatingHistoryButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  min-width: 60px;
  height: 60px;
  padding: 0 1.2rem;
  background: linear-gradient(135deg, #c39bd3, #b388c7);
  color: #1a1a2e;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #b388c7, #9d6fb0);
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(195, 155, 211, 0.4);
  }

  &:active {
    transform: scale(1.05);
  }

  /* Responsive */
  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    padding: 0;
    border-radius: 50%;
  }
`;

export const FloatingHistoryButtonIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;

export const FloatingHistoryButtonText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;

  /* Responsive - Hide text on mobile, show icon only */
  @media (max-width: 768px) {
    display: none;
  }
`;
