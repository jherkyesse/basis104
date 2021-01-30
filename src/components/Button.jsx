import React from 'react';
import PropTypes from 'prop-types';

function Button({
  className, outline, color, disabled, label, icon, onClick,
}) {
  return (
    <button type="button" data-outline={outline} disabled={disabled} className={`${color} ${className}`} onClick={onClick} data-label={label}>
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
