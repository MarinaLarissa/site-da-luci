/**
 * Styled components for UndoToast
 */

import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;

  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);

  min-width: 320px;
  max-width: 500px;

  overflow: hidden;

  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.3s ease-out;

  /* Mobile: Full width */
  @media (max-width: 640px) {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    min-width: auto;
  }
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

export const ToastIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const ToastMessage = styled.div`
  flex: 1;
  min-width: 0; /* Allow text truncation */
`;

export const ToastTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
`;

export const ToastText = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  line-height: 1.4;

  /* Truncate long text */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UndoButton = styled.button`
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #5568d3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Mobile: Smaller padding */
  @media (max-width: 640px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.1s linear;
  width: ${(props) => props.$progress}%;
`;
