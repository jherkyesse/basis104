import React from 'react';
import PropTypes from 'prop-types';

const outlineMap = ['', 'outline'];

function Button({
  className, outline = false, color, disabled, label, icon, onClick,
}) {
  return (
    <button type="button" disabled={disabled} className={`${color} ${outlineMap[+outline]} ${className}`} onClick={onClick} data-label={label}>
      {icon}
      {label}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  outline: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  outline: false,
  color: 'blue',
  disabled: false,
  label: '',
  icon: '',
  onClick: null,
};

export default Button;
