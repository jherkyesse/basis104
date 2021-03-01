import React from 'react';
import PropTypes from 'prop-types';

function Input({ onChangeValue, value }) {
  function onChange({ target: { value } }) {
    onChangeValue(value);
  }
  return <input value={value} onChange={onChange} />;
}

Input.propTypes = {
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  onChangeValue: null,
};

export default Input;