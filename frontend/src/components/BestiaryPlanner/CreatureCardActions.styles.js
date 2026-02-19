/**
 * Styled components for CreatureCardActions
 */

import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;

  /* At smaller resolutions (≤1199px), limit to 2 buttons per row so
     the Edit button wraps below the Add button instead of overflowing */
  @media (max-width: 1199px) {
    max-width: 96px; /* 2 × 44px buttons + 1 × 8px gap */
    align-items: flex-start;
  }
`;

// Tooltip component (defined before ActionButton to avoid use-before-define warning)
export const ActionTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #1f2937;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;

  /* Hidden by default */
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  /* Arrow */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #1f2937;
  }

  /* Shortcut key hint */
  .shortcut {
    margin-left: 0.5rem;
    padding: 0.125rem 0.375rem;
    background: #374151;
    border-radius: 0.25rem;
    font-size: 0.625rem;
    font-family: monospace;
  }

  /* Mobile: Hide tooltips (rely on aria-label instead) */
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ActionButton = styled.button`
  /* Accessibility: Minimum touch target 44x44px */
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  /* Reset button styles */
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;

  /* Ripple effect base */
  overflow: hidden;
  transition: all 0.2s ease;

  /* Variant styles */
  background: ${(props) => {
    if (props.$variant === 'success') return '#10b981'; // Green
    if (props.$variant === 'primary') return '#667eea'; // Purple
    return '#374151'; // Gray
  }};

  color: ${(props) => {
    if (props.$variant === 'success') return '#fff';
    if (props.$variant === 'primary') return '#fff';
    return '#9ca3af';
  }};

  border: ${(props) => {
    if (props.$variant === 'default') return '1px solid #4b5563';
    return 'none';
  }};

  /* Hover */
  &:hover:not(:disabled) {
    background: ${(props) => {
      if (props.$variant === 'success') return '#059669';
      if (props.$variant === 'primary') return '#5568d3';
      return '#4b5563';
    }};

    color: ${(props) => {
      if (props.$variant === 'default') return '#fff';
      return props.color;
    }};

    transform: scale(1.05);

    /* Show tooltip on hover */
    ${ActionTooltip} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-4px);
    }
  }

  /* Active (ripple effect) */
  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Focus visible (keyboard navigation) */
  &:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;

    ${ActionTooltip} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-4px);
    }
  }
`;
