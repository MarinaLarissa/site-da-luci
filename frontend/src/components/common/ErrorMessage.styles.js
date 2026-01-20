/**
 * Styled components for ErrorMessage
 * Migrated from ErrorMessage.css
 */

import styled from 'styled-components';

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.errorLight};
  border: 2px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 20px;
`;

export const ErrorMessageIcon = styled.span`
  font-size: 24px;
`;

export const ErrorMessageText = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  font-weight: 500;
`;
