/**
 * Error message component
 */

import React from 'react';
import { ErrorMessageContainer, ErrorMessageIcon, ErrorMessageText } from './ErrorMessage.styles';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <ErrorMessageContainer data-cy="error-message">
      <ErrorMessageIcon>⚠️</ErrorMessageIcon>
      <ErrorMessageText data-cy="error-message-text">{message}</ErrorMessageText>
    </ErrorMessageContainer>
  );
}
