import React, { useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import RenderRequired from './RenderRequired'

function ControlledInput({ defaultValue = '', autoFocus, placeholder = '', type }) {
	const [value, setValue] = useState(defaultValue)
	const [focus, setFocus] = useState(false)
	const getFocus = () => setFocus(true)
	const getBlur = () => setFocus(false)
	const clearValue = () => setValue('')
  return (
		<div className={`input ${focus ? 'focus' : ''}`}>
			<input
				autoFocus={autoFocus}
				type={type}
				value={value}
				onChange={({ target: { value } }) => setValue(value)}
				placeholder={placeholder}
				onFocus={getFocus}
				onBlur={getBlur}
			/>
			<IoIosCloseCircleOutline onClick={clearValue} />
		</div>
  )
}

function UncontrolledInput({ defaultValue = '', autoFocus, type }) {
  return <input autoFocus type={type} defaultValue={defaultValue} />
}

export default function Input({ type = 'text', label = '', required = false, className = '', defaultValue = '', placeholder = '', controlled = true, autoFocus }) {
	return (
		<div className={`inputContainer ${className}`}>
			<div className="label">{label}<RenderRequired required={required}/></div>
				{[
					<UncontrolledInput type={type} autoFocus={autoFocus} defaultValue={defaultValue} placeholder={placeholder} />,
					<ControlledInput type={type} autoFocus={autoFocus} defaultValue={defaultValue} placeholder={placeholder} />
				][+controlled]
				}
		</div>
	)
}
