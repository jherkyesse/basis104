import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineBorder, AiFillCheckSquare } from 'react-icons/ai';

function CheckIcon({ checked }) {
  if (checked)
    return <AiFillCheckSquare color="var(--tint-color)" size="1.5em" />;
  return <AiOutlineBorder size="1.5em" />;
}

CheckIcon.propTypes = {
  checked: PropTypes.bool.isRequired,
};

function Checkbox({ disabled, label, checked, onChange }) {
  function onChecked() {
    if (onChange) onChange(!checked);
  }
  return (
    <div
      role="presentation"
      disabled={disabled}
      className="checkbox"
      onClick={onChecked}
    >
      <CheckIcon checked={checked} />
      {!!label && <span>{label}</span>}
    </div>
  );
}

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  disabled: false,
  label: null,
  checked: false,
  onChange: null,
};

export default Checkbox;
