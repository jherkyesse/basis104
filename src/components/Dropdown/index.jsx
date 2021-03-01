import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import RenderRequired from '../RenderRequired';
import OutsideClickHandler from 'react-outside-click-handler';
import DropdownMenu from './DropdownMenu';

function Dropdown({
  sm,
  md,
  lg,
  options,
  defaultValue,
  required,
  label,
  placeholder,
  itemText,
  itemValue,
}) {
  const inputRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const [verticalClassName, setVerticalClassName] = useState('');
  function onChange({ target: { value } }) {
    setValue(value);
  }
  function getFocus() {
    const { current } = inputRef || {};
    if (!current) return;
    const { innerHeight } = window;
    const { y } = current.getBoundingClientRect();
    if (y / innerHeight > 0.66) setVerticalClassName('bottom100');
    else setVerticalClassName('top100');
  }
  function onChangeValue(preValue) {
    setValue(preValue ?? value);
    setVerticalClassName(null);
    inputRef.current.blur();
  }
  function onOutsideClick() {
    if (!verticalClassName) return;
    setVerticalClassName(null);
    inputRef.current.blur();
    const option = options.find((option) => option.itemValue === value);
    if (!option) onChangeValue('');
  }
  return (
    <div className="inputContainer" sm={sm} md={md || sm} lg={lg || md || sm}>
      <div className="label">
        {label}
        <RenderRequired required={required} />
      </div>
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <div className={`input ${verticalClassName ? 'focus' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={getFocus}
          />
          {!!verticalClassName && (
            <DropdownMenu
              options={options}
              itemText={itemText}
              itemValue={itemValue}
              value={value}
              verticalClassName={verticalClassName}
              onChangeValue={onChangeValue}
            />
          )}
          {verticalClassName ? (
            <IoMdArrowDropup onClick={getFocus} />
          ) : (
            <IoMdArrowDropdown onClick={getFocus} />
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
}

Dropdown.propTypes = {
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape()),
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  itemText: PropTypes.string,
  itemValue: PropTypes.string,
};

Dropdown.defaultProps = {
  sm: 12,
  md: undefined,
  lg: undefined,
  options: [],
  defaultValue: '',
  required: false,
  label: '',
  placeholder: '',
  itemText: 'text',
  itemValue: 'value',
};

export default Dropdown;