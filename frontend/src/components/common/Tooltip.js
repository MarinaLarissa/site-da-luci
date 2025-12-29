/**
 * Tooltip component with formula display
 */

import { useId } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

export default function Tooltip({ children, text, position = 'top' }) {
  const tooltipId = useId();

  return (
    <div className="tooltip-container" aria-describedby={tooltipId}>
      {children}
      <div
        id={tooltipId}
        role="tooltip"
        className={`tooltip-content tooltip-${position}`}
      >
        {text}
        <div className="tooltip-arrow"></div>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

Tooltip.defaultProps = {
  position: 'top'
};
