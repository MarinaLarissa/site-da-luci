/**
 * SelectionCheckbox Component
 * Custom checkbox for bulk selection with smooth transitions and ripple effect
 */

import PropTypes from 'prop-types';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Checkmark } from './SelectionCheckbox.styles';

const SelectionCheckbox = ({ checked, onChange, disabled, ariaLabel }) => {
  return (
    <CheckboxContainer onClick={!disabled ? onChange : undefined}>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <StyledCheckbox $checked={checked} $disabled={disabled}>
        {checked && <Checkmark>✓</Checkmark>}
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

SelectionCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

SelectionCheckbox.defaultProps = {
  disabled: false,
  ariaLabel: 'Select creature',
};

export default SelectionCheckbox;
