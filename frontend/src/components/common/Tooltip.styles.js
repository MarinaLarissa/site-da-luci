/**
 * Styled components for Tooltip
 * Migrated from Tooltip.css
 */

import styled, { css } from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const getPositionStyles = (position) => {
  switch (position) {
    case 'bottom':
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px;
      `;
    case 'left':
      return css`
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 8px;
      `;
    case 'right':
      return css`
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 8px;
      `;
    case 'top':
    default:
      return css`
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
      `;
  }
};

const getArrowStyles = (position) => {
  switch (position) {
    case 'bottom':
      return css`
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 6px 6px 6px;
        border-color: transparent transparent #2c3e50 transparent;
      `;
    case 'left':
      return css`
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent #2c3e50;
      `;
    case 'right':
      return css`
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 6px 6px 6px 0;
        border-color: transparent #2c3e50 transparent transparent;
      `;
    case 'top':
    default:
      return css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px 6px 0 6px;
        border-color: #2c3e50 transparent transparent transparent;
      `;
  }
};

export const TooltipContent = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 9999;
  background-color: #2c3e50;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  ${({ $position }) => getPositionStyles($position)}

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
    white-space: normal;
    max-width: 200px;
  }
`;

export const TooltipArrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  ${({ $position }) => getArrowStyles($position)}
`;
