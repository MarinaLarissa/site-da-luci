import styled from 'styled-components';

export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.bg.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const OnlineStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $online, theme }) =>
    $online ? theme.colors.success : theme.colors.error};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  right: 0;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.text.muted : theme.colors.text.primary};
  font-size: 0.875rem;
  text-align: left;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $disabled, theme }) =>
      $disabled ? 'transparent' : theme.colors.bg.hover};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.bg.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;
