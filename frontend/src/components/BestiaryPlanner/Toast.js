/**
 * Toast Component
 * Simple notification component for user feedback
 */

import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
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
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'error':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      case 'warning':
        return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      default:
        return theme.gradients.primary;
    }
  }};
  color: white;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s ease-out;
  min-width: 300px;
  max-width: 500px;
`;

const ToastIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

const ToastTitle = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
`;

const ToastMessage = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
`;

const Toast = ({ title, message, type = 'info', icon, isClosing }) => {
  const defaultIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <ToastContainer $type={type} $isClosing={isClosing}>
      <ToastIcon>{icon || defaultIcons[type]}</ToastIcon>
      <ToastContent>
        <ToastTitle>{title}</ToastTitle>
        {message && <ToastMessage>{message}</ToastMessage>}
      </ToastContent>
    </ToastContainer>
  );
};

export default memo(Toast);
