/**
 * Reusable Button component
 */

import React from 'react';
import './Button.css';

export default function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
