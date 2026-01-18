/**
 * Error message component
 */

import React from 'react';
import { ErrorContainer, ErrorIcon, ErrorText } from './ErrorMessage.styles';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
}
