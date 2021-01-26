import React, { useState, useRef, useEffect } from 'react';
import { useMouse } from 'react-use';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import RenderRequired from './RenderRequired';

function Selection({
  options = [], verticalClassName, itemValue, itemText, setValue,
}) {
  return (
    <div className={`selectionContainer absolute left0 w100 ${verticalClassName}`}>
      {options.map((option) => (
        <div
          key={option[itemValue]}
          className="selection"
          onClick={(e) => {
					  e.stopPropagation();
					  e.preventDefault();
					  console.log('option[itemValue]', option[itemValue]);
					  setValue(option[itemValue]);
          }}
        >
          {option[itemText]}
        </div>
      ))}
    </div>
  );
}

export default function Dropdown({
  sm = 12, md, lg, options = [], defaultValue = '', required = false, label = '', placeholder = '', itemText = 'text', itemValue = 'value',
}) {
  const inputRef = useRef();
  const [value, setValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const [verticalClassName, setVerticalClassName] = useState();
  const getFocus = () => setFocus(true);
  const getBlur = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // setFocus(false)
  };
  const clearValue = () => setValue('');
  useEffect(() => {
    if (focus) {
      const { current } = inputRef || {};
      if (!current) return;
      const { innerHeight } = window;
      const { y } = current.getBoundingClientRect();
      if (y / innerHeight > 0.66) setVerticalClassName('bottom100');
      else setVerticalClassName('top100');
    }
  }, [focus]);
  useEffect(() => {
    if (value) setFocus(false);
  }, [value]);
  return (
    <div className="inputContainer" sm={sm} md={md || sm} lg={lg || md || sm}>
      <div className="label">
        {label}
        <RenderRequired required={required} />
      </div>
      <div className={`input ${focus ? 'focus' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          placeholder={placeholder}
          onFocus={getFocus}
        />
        {focus
					&& (
<Selection
  options={options}
  itemText={itemText}
  itemValue={itemValue}
  verticalClassName={verticalClassName}
  setValue={setValue}
/>
					)}
        {focus ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
    </div>
  );
}
