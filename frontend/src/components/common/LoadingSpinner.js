/**
 * Loading spinner component
 */

import React from 'react';
import { SpinnerContainer, Spinner, LoadingMessage } from './LoadingSpinner.styles';

export default function LoadingSpinner({ message = 'Calculating...' }) {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingMessage>{message}</LoadingMessage>
    </SpinnerContainer>
  );
}
