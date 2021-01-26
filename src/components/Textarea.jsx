import React, { useState } from 'react';
import RenderRequired from './RenderRequired';

export default function Textarea({
  sm = 12, md, lg, label = '', required = false, defaultValue = '', placeholder = '', rows = 3,
}) {
  const [value, setValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const getFocus = () => setFocus(true);
  const getBlur = () => setFocus(false);
  const clearValue = () => setValue('');
  return (
    <div className="inputContainer" sm={sm} md={md || sm} lg={lg || md || sm}>
      <div className="label">
        {label}
        <RenderRequired required={required} />
      </div>
      <div className={`textarea ${focus ? 'focus' : ''}`}>
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={({ target: { value } }) => setValue(value)}
          onFocus={getFocus}
          onBlur={getBlur}
        />
      </div>
    </div>
  );
}
