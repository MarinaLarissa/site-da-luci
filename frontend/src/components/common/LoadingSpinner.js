/**
 * Loading spinner component
 */

import React from 'react';
import { SpinnerContainer, Spinner, LoadingMessage } from './LoadingSpinner.styles';

export default function LoadingSpinner({ message = 'Calculating...' }) {
  return (
    <SpinnerContainer data-cy="loading-spinner">
      <Spinner />
      <LoadingMessage data-cy="loading-message">{message}</LoadingMessage>
    </SpinnerContainer>
  );
}
