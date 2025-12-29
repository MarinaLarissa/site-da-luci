/**
 * Error message component
 */

import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
    </div>
  );
}
