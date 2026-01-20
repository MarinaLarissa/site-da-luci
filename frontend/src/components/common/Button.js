/**
 * Reusable Button component
 */

import React from 'react';
import { StyledButton } from './Button.styles';

export default function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button', dataCy }) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      onClick={onClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      {children}
    </StyledButton>
  );
}
