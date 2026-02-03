import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SyncContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const SyncBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'blue':
        return theme.colors.accent.primary + '20';
      case 'green':
        return '#10b98120';
      case 'red':
        return '#ef444420';
      default:
        return theme.colors.bg.hover;
    }
  }};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const SyncIcon = styled.span`
  display: inline-block;
  animation: ${({ $spinning }) => ($spinning ? spin : 'none')} 1s linear infinite;
  font-size: 0.875rem;
`;

export const SyncLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SyncDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

export const SyncTime = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const OfflineQueue = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 2px ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.bg.hover};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: help;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 1000;

  ${OfflineQueue}:hover & {
    opacity: 1;
  }
`;

export const SyncButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $isOnline, theme }) =>
    $isOnline ? theme.colors.accent.primary : theme.colors.bg.hover};
  color: ${({ theme }) => theme.colors.bg.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.accent.secondary};
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;
