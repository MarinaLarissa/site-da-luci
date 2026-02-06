/**
 * SelectionCheckbox Styles
 */

import styled from 'styled-components';

export const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

export const StyledCheckbox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) =>
    props.$disabled ? '#4b5563' : props.$checked ? '#667eea' : '#6b7280'};
  border-radius: 6px;
  background: ${(props) => (props.$checked ? '#667eea' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  /* Ripple effect on hover */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: ${(props) => (props.$checked ? '#667eea' : '#6b7280')};
    opacity: 0;
    transition: opacity 0.2s;
  }

  ${CheckboxContainer}:hover &::before {
    opacity: ${(props) => (props.$disabled ? 0 : 0.1)};
  }

  /* Focus visible */
  ${HiddenCheckbox}:focus-visible + & {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Scale animation on check */
  ${(props) =>
    props.$checked &&
    `
    animation: checkboxScale 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  `}

  @keyframes checkboxScale {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const Checkmark = styled.span`
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  user-select: none;
`;
