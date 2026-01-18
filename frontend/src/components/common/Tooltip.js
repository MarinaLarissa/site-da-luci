/**
 * Tooltip component with formula display
 */

import { useId } from 'react';
import PropTypes from 'prop-types';
import { TooltipContainer, TooltipContent, TooltipArrow } from './Tooltip.styles';

export default function Tooltip({ children, text, position = 'top' }) {
  const tooltipId = useId();

  return (
    <TooltipContainer aria-describedby={tooltipId}>
      {children}
      <TooltipContent
        id={tooltipId}
        role="tooltip"
        $position={position}
      >
        {text}
        <TooltipArrow $position={position} />
      </TooltipContent>
    </TooltipContainer>
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
