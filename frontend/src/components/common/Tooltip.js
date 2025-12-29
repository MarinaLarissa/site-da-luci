/**
 * Tooltip component with formula display
 */

import React from 'react';
import './Tooltip.css';

export default function Tooltip({ children, text, position = 'top' }) {
  return (
    <div className="tooltip-container">
      {children}
      <div className={`tooltip-content tooltip-${position}`}>
        {text}
        <div className="tooltip-arrow"></div>
      </div>
    </div>
  );
}
