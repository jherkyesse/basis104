import React from 'react'

export default function Segment({ className = '', children }) {
	return (
		<div className={`relative boxShadow segment ${className}`}>
			<div>
				{children}
			</div>
		</div>
	);
}
