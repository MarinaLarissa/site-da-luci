import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const TabContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Tab = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg.primary : theme.colors.text.secondary};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.accent.primary : theme.colors.bg.hover};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.input};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent.goldLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.bg.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SuccessMessage = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.bg.secondary};
  }

  span {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.bg.hover};
    border-color: ${({ theme }) => theme.colors.text.muted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GoogleIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  text-align: right;
  margin-top: -${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
