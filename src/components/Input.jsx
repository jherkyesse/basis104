import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import RenderRequired from './RenderRequired';
import { validate } from '../utils/validator';

function InputErrorMessage({ errorMessage }) {
  return (
    <div className="inputErrorMessage" hidden={!errorMessage} data-label={errorMessage} />
  );
}

InputErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

InputErrorMessage.defaultProps = {
  errorMessage: '',
};

function ControlledInput({
  value,
  autoFocus,
  placeholder = '',
  onChange,
  type,
  keyboardType, // default, numeric, number, alphabet, uppercase, lowercase, custom
  regular,
}) {
  const [focus, setFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const getFocus = () => setFocus(true);
  const getBlur = () => setFocus(false);
  const onChangeValue = (event) => {
    const { target: { value } } = event;
    const errorMessage = validate({ type: keyboardType, value });
    setErrorMessage(errorMessage);
    if (errorMessage) return;
    if (onChange) onChange(value);
  };
  const clearValue = () => onChange && onChange('');
  return (
    <div className={`input ${focus ? 'focus' : ''}`}>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value || ''}
        onChange={onChangeValue}
        placeholder={placeholder}
        onFocus={getFocus}
        onBlur={getBlur}
      />
      <IoIosCloseCircleOutline onClick={clearValue} />
      <InputErrorMessage errorMessage={errorMessage} />
    </div>
  );
}

ControlledInput.propTypes = {
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  keyboardType: PropTypes.string,
};

ControlledInput.defaultProps = {
  value: null,
  autoFocus: false,
  placeholder: '',
  onChange: null,
  type: '',
  keyboardType: '',
};

function UncontrolledInput({ value = '', autoFocus, type }) {
  return <input autoFocus={autoFocus} type={type} defaultValue={value} />;
}

UncontrolledInput.propTypes = {
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
};

UncontrolledInput.defaultProps = {
  value: null,
  autoFocus: false,
  type: 'text',
};

export default function Input({
  sm = 12,
  md,
  lg,
  label,
  required,
  className,
  controlled,
  value,
  autoFocus,
  placeholder,
  onChange,
  type,
  keyboardType,
  regular,
}) {
  return (
    <div
      className={`inputContainer ${className}`}
      sm={sm}
      md={md || sm}
      lg={lg || md || sm}
    >
      <div className="label">
        {label}
        <RenderRequired required={required} />
      </div>
      {
        [
          <UncontrolledInput
            value={value}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            keyboardType={keyboardType}
          />,
          <ControlledInput
            value={value}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            keyboardType={keyboardType}
            regular={regular}
          />,
        ][+controlled]
      }
    </div>
  );
}

Input.propTypes = {
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  controlled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
  regular: PropTypes.string,
};

Input.defaultProps = {
  sm: 12,
  md: null,
  lg: null,
  type: 'text',
  label: null,
  required: false,
  className: '',
  value: null,
  placeholder: null,
  controlled: true,
  autoFocus: false,
  onChange: null,
  keyboardType: 'default',
  regular: null,
};
